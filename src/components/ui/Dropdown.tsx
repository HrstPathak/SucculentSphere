"use client";
import { useEffect, useRef, useState } from "react";

type Option = { value: string; label: string };

export default function Dropdown({
  label,
  options,
  value,
  onChange
}: {
  label?: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!btnRef.current || !listRef.current) return;
      if (
        !btnRef.current.contains(e.target as Node) &&
        !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (open && listRef.current) {
      const active = listRef.current.querySelector('[aria-selected="true"]') as HTMLElement | null;
      (active ?? listRef.current.firstElementChild)?.scrollIntoView?.({ block: "nearest" });
    }
  }, [open]);

  function onKeyDown(e: React.KeyboardEvent) {
    const items = listRef.current?.querySelectorAll<HTMLLIElement>("li[role='menuitem']") ?? [];
    const currentIndex = Array.from(items).findIndex((n) => n.getAttribute("data-value") === value);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = items[Math.min(items.length - 1, Math.max(0, currentIndex + 1))];
      next?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = items[Math.max(0, currentIndex - 1)];
      prev?.focus();
    } else if (e.key === "Escape") {
      setOpen(false);
      btnRef.current?.focus();
    }
  }

  return (
    <div className="relative inline-block text-left">
      {label && <span className="sr-only">{label}</span>}
      <div>
        <button
          ref={btnRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="inline-flex justify-center items-center gap-2 rounded border px-3 py-2 bg-white text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
        >
          <span className="text-sm">{options.find((o) => o.value === value)?.label ?? "Sort"}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-70">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {open && (
        <ul
          ref={listRef}
          role="menu"
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li
                key={opt.value}
                role="menuitem"
                tabIndex={0}
                data-value={opt.value}
                aria-selected={active}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange(opt.value);
                    setOpen(false);
                  }
                }}
                className={`px-4 py-2 text-sm cursor-pointer ${active ? "bg-[var(--color-brand)] text-white" : "text-[var(--color-text)] hover:bg-gray-50"}`}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

