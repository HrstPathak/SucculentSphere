"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductTabs({ care, description, shipping }: { care: string; description: string; shipping: string }) {
  const tabs = [
    { id: "care", label: "Care Tips" },
    { id: "desc", label: "Description" },
    { id: "ship", label: "Shipping" }
  ];
  const [active, setActive] = useState(tabs[0].id);

  return (
    <div>
      <div role="tablist" aria-label="Product tabs" className="flex gap-4 mb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`py-2 px-3 ${active === t.id ? "border-b-2 border-[var(--color-brand)] font-semibold" : "text-gray-600"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div>
        <AnimatePresence mode="wait">
          {active === "care" && (
            <motion.div key="care" id="panel-care" role="tabpanel" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              <div className="prose max-w-none text-sm">{care}</div>
            </motion.div>
          )}
          {active === "desc" && (
            <motion.div key="desc" id="panel-desc" role="tabpanel" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              <div className="prose max-w-none text-sm" dangerouslySetInnerHTML={{ __html: description }} />
            </motion.div>
          )}
          {active === "ship" && (
            <motion.div key="ship" id="panel-ship" role="tabpanel" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              <div className="prose max-w-none text-sm">{shipping}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

