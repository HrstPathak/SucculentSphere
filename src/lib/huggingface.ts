/**
 * Hugging Face Inference API via router.huggingface.co (Chat Completions)
 * Uses: meta-llama/Llama-3.1-8B-Instruct, Qwen/Qwen2.5-7B-Instruct, or similar
 * Old api-inference.huggingface.co is deprecated (410)
 */

const ROUTER_URL = "https://router.huggingface.co/v1/chat/completions";
const DEFAULT_MODEL = "meta-llama/Llama-3.1-8B-Instruct";
const getModel = () => process.env.HF_MODEL || DEFAULT_MODEL;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function chatWithHF(
  messages: { role: string; content: string }[],
  options: {
    apiKey: string;
    temperature?: number;
    maxNewTokens?: number;
  }
): Promise<string> {
  const { apiKey, temperature = 0.2, maxNewTokens = 300 } = options;

  let lastError: Error | null = null;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(ROUTER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: getModel(),
          messages,
          temperature,
          max_tokens: maxNewTokens,
        }),
      });

      const text = await response.text();
      let data: unknown;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }

      if (!response.ok) {
        if (response.status === 503 && data && typeof data === "object" && "estimated_time" in data) {
          const waitSec = Math.min((data as { estimated_time?: number }).estimated_time || 20, 60);
          if (attempt < MAX_RETRIES - 1) {
            await new Promise((r) => setTimeout(r, waitSec * 1000));
            continue;
          }
        }
        throw new Error(`HF API ${response.status}: ${text || response.statusText}`);
      }

      const content = (data as { choices?: { message?: { content?: string } }[] })?.choices?.[0]?.message?.content;
      if (content != null) return String(content).trim();
      throw new Error(`Unexpected HF response: ${text?.slice(0, 200)}`);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < MAX_RETRIES - 1) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }
    }
  }
  throw lastError || new Error("Hugging Face API failed");
}
