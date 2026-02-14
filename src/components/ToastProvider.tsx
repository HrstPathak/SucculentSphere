"use client";

import { useEffect, useState } from "react";

type AppToast = {
  id: number;
  message: string;
};

export default function ToastProvider() {
  const [toasts, setToasts] = useState<AppToast[]>([]);

  useEffect(() => {
    const onToast = (event: Event) => {
      const customEvent = event as CustomEvent<{ message?: string }>;
      const message = customEvent.detail?.message?.trim();
      if (!message) return;

      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((prev) => [...prev, { id, message }]);

      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2500);
    };

    window.addEventListener("app-toast", onToast);
    return () => {
      window.removeEventListener("app-toast", onToast);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[1000] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
