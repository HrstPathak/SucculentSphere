 "use client";
import { useEffect, useState, useRef } from "react";

export default function DarkModeToggle() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("ss_theme") : null;
    if (stored === "dark") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function createRippleAndToggle(nextMode: "light" | "dark") {
    const btn = btnRef.current;
    if (!btn) {
      applyMode(nextMode);
      return;
    }
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // compute max distance to corners
    const w = Math.max(cx, window.innerWidth - cx);
    const h = Math.max(cy, window.innerHeight - cy);
    const radius = Math.sqrt(w * w + h * h);
    const size = radius * 2;

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.left = `${cx - size / 2}px`;
    overlay.style.top = `${cy - size / 2}px`;
    overlay.style.width = `${size}px`;
    overlay.style.height = `${size}px`;
    overlay.style.borderRadius = "50%";
    overlay.style.transform = "scale(0)";
    overlay.style.background = nextMode === "dark" ? "#0b0b0b" : "#ffffff";
    overlay.style.zIndex = "9999";
    overlay.style.transition = "transform 420ms ease-out, opacity 300ms ease-out";
    document.body.appendChild(overlay);

    // trigger expand
    requestAnimationFrame(() => {
      overlay.style.transform = "scale(1)";
    });

    // after expand, toggle mode
    const onEnd = () => {
      overlay.removeEventListener("transitionend", onEnd);
      applyMode(nextMode);
      // fade out
      overlay.style.opacity = "0";
      setTimeout(() => {
        try {
          document.body.removeChild(overlay);
        } catch {}
      }, 300);
    };
    overlay.addEventListener("transitionend", onEnd);
  }

  function applyMode(next: "light" | "dark") {
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("ss_theme", next);
    } catch {}
    setMode(next);
  }

  function toggle() {
    const next = mode === "dark" ? "light" : "dark";
    createRippleAndToggle(next);
  }

  return (
    <button
      ref={btnRef}
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      onClick={toggle}
      className="p-2 rounded-full focus:outline-none"
      title="Toggle theme"
      style={{ width: 36, height: 36 }}
    >
      {mode === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3v2" stroke="#2B2B2B" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 19v2" stroke="#2B2B2B" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4.2 4.2l1.4 1.4" stroke="#2B2B2B" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18.4 18.4l1.4 1.4" stroke="#2B2B2B" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4" stroke="#2B2B2B" strokeWidth="1.6" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="#2B2B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

