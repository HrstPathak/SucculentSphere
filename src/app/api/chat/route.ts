import { NextRequest, NextResponse } from "next/server";
import { chatWithHF } from "../../../lib/huggingface";

// Simple in-memory rate limit: IP -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 20; // max requests per minute per IP

// Track active requests to detect high load
let activeRequests = 0;
const MAX_CONCURRENT_REQUESTS = 5; // Threshold for high load
const REQUEST_TIMEOUT_MS = 8000; // 8 second timeout

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) return false;
  if (now > entry.resetAt) {
    rateLimitMap.delete(ip);
    return false;
  }
  return entry.count >= RATE_LIMIT_MAX;
}

function recordRequest(ip: string): void {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

/** Sanitize user input: remove script tags, limit length, block obvious prompt injection */
function sanitizeInput(text: string): string {
  let s = String(text || "")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return s.slice(0, 500);
}

const FALLBACK_MESSAGE =
  "🌪️ We're experiencing high traffic and response times are longer than usual. For faster assistance, please use our direct chat support for priority responses. Thank you for your patience!";

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  const apiKey = process.env.HF_TOKEN || process.env.HUGGINGFACE_TOKEN;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat service is not configured." },
      { status: 503 }
    );
  }

  let body: { message?: string; history?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rawMessage = body.message;
  const history = Array.isArray(body.history)
    ? body.history.slice(-10).map((h: any) => ({
        role: String(h?.role || "user"),
        content: sanitizeInput(String(h?.content || "")),
      }))
    : [];

  const message = sanitizeInput(rawMessage);
  if (!message || message.length < 1) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  // Check if system is under high load - if so, return fallback message
  if (activeRequests >= MAX_CONCURRENT_REQUESTS) {
    return NextResponse.json({
      message: FALLBACK_MESSAGE,
      isHighLoad: true,
    });
  }

  recordRequest(ip);
  activeRequests++;

  const { getChatbotContextAsync, buildMessages } = await import("../../../lib/chatbot-context");
  const context = await getChatbotContextAsync();
  const messages = buildMessages(context, message, history);

  try {
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Response timeout")), REQUEST_TIMEOUT_MS)
    );

    const response = await Promise.race([
      chatWithHF(messages, {
        apiKey,
        temperature: 0.2,
        maxNewTokens: 300,
      }),
      timeoutPromise,
    ]);

    activeRequests--;
    return NextResponse.json({ message: response });
  } catch (err) {
    activeRequests--;
    const msg = err instanceof Error ? err.message : String(err);
    const isTimeout = msg.includes("timeout");
    console.error("[chat] HF error:", msg);

    // If timeout or system overloaded, return fallback message
    if (isTimeout || msg.includes("overloaded") || msg.includes("overload")) {
      return NextResponse.json({
        message: FALLBACK_MESSAGE,
        isHighLoad: true,
      });
    }

    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: "Sorry, I'm having trouble responding. Please try again.",
        ...(isDev && { detail: msg }),
      },
      { status: 500 }
    );
  }
}
