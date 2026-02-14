"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage, type Message } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

const QUICK_REPLIES = [
  "Plant Care Tips",
  "Shipping Info",
  "Recommend a Plant",
  "Contact / About",
];

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isLoading: boolean;
  onSend: (text: string) => void;
  onQuickReply?: (text: string) => void;
}

export function ChatWindow({
  isOpen,
  onClose,
  messages,
  isLoading,
  onSend,
  onQuickReply,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-4 md:bottom-24 md:right-6 w-[calc(100vw-2rem)] md:w-[380px] max-h-[calc(100vh-10rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl z-50 bg-[var(--color-bg)]/95 backdrop-blur-xl border border-white/30 dark:border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/50 dark:bg-white/5 border-b border-white/20">
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden="true">🌿</span>
                <h2 className="font-serif text-base font-semibold text-[var(--color-text)]">
                  Succulent Sphere Assistant
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 text-[var(--color-text)] transition-colors"
                aria-label="Close chat"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[320px]"
            >
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Hi! I can help with plant care, products, and shopping. Ask me anything 🌱
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {QUICK_REPLIES.map((text) => (
                      <button
                        key={text}
                        type="button"
                        onClick={() => onQuickReply?.(text)}
                        className="px-3 py-1.5 text-xs rounded-full bg-white/80 dark:bg-white/10 border border-white/30 text-[var(--color-text)] hover:bg-[var(--color-brand)] hover:text-white hover:border-transparent transition-colors"
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/20">
              <ChatInput onSend={onSend} disabled={isLoading} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
