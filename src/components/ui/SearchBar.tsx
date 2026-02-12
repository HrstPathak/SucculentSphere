"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Result = { id: string; title: string; handle: string; price: string | null; image: string | null };

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const controllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cacheRef = useRef<Record<string, Result[]>>({});

  const doSearch = useCallback(
    async (q: string) => {
      if (q.length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }
      if (cacheRef.current[q]) {
        setResults(cacheRef.current[q]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      controllerRef.current?.abort();
      const c = new AbortController();
      controllerRef.current = c;
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: c.signal });
        if (!res.ok) throw new Error("Search failed");
        const json = await res.json();
        cacheRef.current[q] = json.results;
        setResults(json.results);
      } catch (err) {
        if ((err as any).name !== "AbortError") setError("Search failed");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // debounce
  useEffect(() => {
    const id = setTimeout(() => {
      if (query.length >= 2) {
        doSearch(query);
        setOpen(true);
      } else {
        setResults([]);
        setOpen(false);
      }
    }, 300);
    return () => clearTimeout(id);
  }, [query, doSearch]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest(".ss-search-wrapper")) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      if (active >= 0 && results[active]) {
        const r = results[active];
        window.location.href = `/collections/succulents/${r.handle}`;
      } else if (query.length >= 2) {
        // go to search results page (not implemented)
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const clear = () => {
    setQuery("");
    setResults([]);
    setOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="ss-search-wrapper relative">
      <div className="flex items-center bg-white dark:bg-[#0a1420] border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 focus-within:border-[var(--color-brand)] focus-within:shadow-md" style={{ height: 48 }}>
        <svg className="ml-4 mr-3 text-gray-400 dark:text-gray-500 flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <input
          ref={inputRef}
          aria-label="Search plants"
          role="combobox"
          aria-expanded={open}
          aria-controls="search-listbox"
          placeholder="Search plants, succulents…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
          }}
          onKeyDown={onKeyDown}
          className="flex-1 px-1 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none bg-transparent text-[var(--color-text)]"
          style={{ minHeight: 44 }}
        />
        {query.length > 0 && (
          <button onClick={clear} aria-label="Clear search" className="p-2 mr-2 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-[#0f1f2e] transition-colors flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" stroke="var(--icon-color, #2B2B2B)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {open && (
        <div
          id="search-listbox"
          role="listbox"
          className="absolute left-0 right-0 mt-3 bg-white dark:bg-[#0a1420] rounded-xl shadow-xl dark:shadow-2xl z-50 max-h-80 overflow-auto border border-gray-100 dark:border-gray-700"
          style={{ borderRadius: 14 }}
        >
          {loading && (
            <div className="p-5 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 animate-pulse">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded w-3/4" />
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="p-6 text-center">
              <div className="text-4xl mb-2">🌱</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">No plants found</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try searching for a different plant</div>
            </div>
          )}

          {!loading &&
            results.map((r, idx) => {
              const highlighted = (() => {
                const q = query.trim();
                if (!q) return r.title;
                const idx = r.title.toLowerCase().indexOf(q.toLowerCase());
                if (idx === -1) return r.title;
                return (
                  <>
                    {r.title.slice(0, idx)}
                    <span className="font-semibold text-[var(--color-brand)]">{r.title.slice(idx, idx + q.length)}</span>
                    {r.title.slice(idx + q.length)}
                  </>
                );
              })();
              return (
                <Link key={r.id} href={`/collections/succulents/${r.handle}`} onClick={() => setOpen(false)}>
                  <div
                    role="option"
                    aria-selected={active === idx}
                    className={`flex items-center gap-4 px-5 py-4 transition-colors border-b border-gray-50 dark:border-gray-700 last:border-b-0 ${
                      active === idx 
                        ? "bg-[var(--color-bg)] dark:bg-[#0f1f2e]" 
                        : "hover:bg-gray-50 dark:hover:bg-[#0f1f2e]"
                    }`}
                  >
                    <div className="w-14 h-14 relative rounded-lg flex-shrink-0 overflow-hidden border border-gray-100 dark:border-gray-600">
                      {r.image ? (
                        <Image src={r.image} alt={`${r.title} thumbnail`} width={56} height={56} style={{ objectFit: "cover" }} />
                      ) : (
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[var(--color-text)]">{highlighted}</div>
                    </div>
                    <div className={`text-sm font-semibold flex-shrink-0 ${r.price ? "text-[var(--color-brand)]" : "text-gray-400 dark:text-gray-500"}`}>
                      {r.price ? `₹${r.price}` : "—"}
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}

