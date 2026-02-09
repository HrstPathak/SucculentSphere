"use client";
import { useState } from "react";

export default function FilterDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-2 border rounded text-sm"
        aria-expanded={open}
        aria-controls="filters-drawer"
      >
        Filter
      </button>

      {open && (
        <div
          id="filters-drawer"
          className="fixed inset-0 z-50 bg-black/40 flex"
          role="dialog"
          aria-modal="true"
        >
          <aside className="bg-white w-80 max-w-full p-6 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Filters</h4>
              <button onClick={() => setOpen(false)} aria-label="Close filters">Close</button>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium mb-2">Plant Type</h5>
                <label className="block text-sm"><input type="checkbox" /> Echeveria</label>
                <label className="block text-sm"><input type="checkbox" /> Haworthia</label>
              </div>

              <div>
                <h5 className="text-sm font-medium mb-2">Care Level</h5>
                <label className="block text-sm"><input type="checkbox" /> Beginner</label>
                <label className="block text-sm"><input type="checkbox" /> Intermediate</label>
              </div>

              <div>
                <h5 className="text-sm font-medium mb-2">Availability</h5>
                <label className="block text-sm"><input type="checkbox" /> In Stock</label>
              </div>
            </div>
          </aside>
          <div className="flex-1" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}

