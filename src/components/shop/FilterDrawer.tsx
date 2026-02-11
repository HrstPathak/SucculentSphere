"use client";
import { useEffect, useState } from "react";

export default function FilterDrawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium bg-white dark:bg-[#0a1420] text-[var(--color-text)] hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md dark:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:ring-offset-1 dark:focus:ring-offset-[#071018]"
        aria-expanded={open}
        aria-controls="filters-drawer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 6h18M7 12h10M9 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Filter</span>
      </button>

      {open && (
        <div
          id="filters-drawer"
          className="fixed left-0 right-0 z-50 bg-black/40 flex"
          style={{ top: "60px", height: "calc(100% - 60px)" }}
          role="dialog"
          aria-modal="true"
        >
          <aside className="bg-white dark:bg-[#071018] w-80 max-w-full p-6 overflow-auto h-full border-r border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold text-lg text-[var(--color-text)]">Filters</h4>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close filters" className="text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#0a1420] text-[var(--color-text)] transition-colors font-medium">
                Close
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h5 className="text-sm font-semibold mb-3 text-[var(--color-text)] uppercase tracking-wide text-opacity-70">Plant Type</h5>
                <label className="block text-sm text-[var(--color-text)] mb-2 hover:text-[var(--color-brand)] transition-colors cursor-pointer"><input type="checkbox" className="mr-2 rounded" /> Echeveria</label>
                <label className="block text-sm text-[var(--color-text)] hover:text-[var(--color-brand)] transition-colors cursor-pointer"><input type="checkbox" className="mr-2 rounded" /> Haworthia</label>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                <h5 className="text-sm font-semibold mb-3 text-[var(--color-text)] uppercase tracking-wide text-opacity-70">Care Level</h5>
                <label className="block text-sm text-[var(--color-text)] mb-2 hover:text-[var(--color-brand)] transition-colors cursor-pointer"><input type="checkbox" className="mr-2 rounded" /> Beginner</label>
                <label className="block text-sm text-[var(--color-text)] hover:text-[var(--color-brand)] transition-colors cursor-pointer"><input type="checkbox" className="mr-2 rounded" /> Intermediate</label>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                <h5 className="text-sm font-semibold mb-3 text-[var(--color-text)] uppercase tracking-wide text-opacity-70">Availability</h5>
                <label className="block text-sm text-[var(--color-text)] hover:text-[var(--color-brand)] transition-colors cursor-pointer"><input type="checkbox" className="mr-2 rounded" /> In Stock</label>
              </div>
            </div>
          </aside>
          <div className="flex-1" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}

