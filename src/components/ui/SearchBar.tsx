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
      <div className="flex items-center bg-white rounded-lg" style={{ height: 48 }}>
        <svg className="ml-3 mr-2 opacity-60" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <input
          ref={inputRef}
          aria-label="Search plants"
          role="combobox"
          aria-expanded={open}
          aria-controls="search-listbox"
          placeholder="Search plants, succulents, care tips…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
          }}
          onKeyDown={onKeyDown}
          className="flex-1 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none"
          style={{ minHeight: 44 }}
        />
        {query.length > 0 && (
          <button onClick={clear} aria-label="Clear search" className="p-2 mr-2">
            ❌
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {open && (
        <div
          id="search-listbox"
          role="listbox"
          className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 max-h-72 overflow-auto"
          style={{ borderRadius: 14 }}
        >
          {loading && (
            <div className="p-4 space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="p-4 text-sm text-gray-600">No plants found 🌱</div>
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
                    <span className="text-[var(--color-secondary)]">{r.title.slice(idx, idx + q.length)}</span>
                    {r.title.slice(idx + q.length)}
                  </>
                );
              })();
              return (
                <Link key={r.id} href={`/collections/succulents/${r.handle}`} onClick={() => setOpen(false)}>
                  <div
                    role="option"
                    aria-selected={active === idx}
                    className={`flex items-center gap-3 p-3 hover:bg-[var(--color-bg)] ${active === idx ? "bg-[var(--color-bg)]" : ""}`}
                  >
                    <div className="w-12 h-12 relative rounded" style={{ overflow: "hidden", borderRadius: 8 }}>
                      {r.image ? (
                        <Image src={r.image} alt={`${r.title} thumbnail`} width={48} height={48} style={{ objectFit: "cover" }} />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 text-sm">{highlighted}</div>
                    <div className="text-sm font-medium">{r.price ? `$${r.price}` : ""}</div>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}

