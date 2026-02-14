"use client";

import { useState, useCallback, useRef } from "react";
import { ChatbotButton } from "./ChatbotButton";
import { ChatWindow } from "./ChatWindow";
import type { Message } from "./ChatMessage";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);

    const assistantId = `assistant-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", isLoading: true },
    ]);
    setIsLoading(true);

    abortRef.current = new AbortController();
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages
            .filter((m) => !m.isLoading)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: abortRef.current.signal,
      });

      const data = await res.json();
      const content = res.ok
        ? (data.message || "I couldn't generate a response.")
        : [data.error, data.detail].filter(Boolean).join(" — ");
      const isHighLoad = res.ok ? Boolean(data.isHighLoad) : false;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content, isLoading: false, isHighLoad }
            : m
        )
      );
    } catch (err: unknown) {
      if ((err as Error).name === "AbortError") return;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Sorry, I couldn't respond. Please try again.", isLoading: false }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [messages]);

  const handleQuickReply = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (abortRef.current) abortRef.current.abort();
  }, []);

  return (
    <>
      <ChatbotButton onClick={() => setIsOpen((o) => !o)} isOpen={isOpen} />
      <ChatWindow
        isOpen={isOpen}
        onClose={handleClose}
        messages={messages}
        isLoading={isLoading}
        onSend={sendMessage}
        onQuickReply={handleQuickReply}
      />
    </>
  );
}
