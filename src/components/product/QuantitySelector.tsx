"use client";
import { useState } from "react";

export default function QuantitySelector({ value = 1, onChange }: { value?: number; onChange?: (n: number) => void }) {
  const [count, setCount] = useState(value);

  function update(n: number) {
    const next = Math.max(1, n);
    setCount(next);
    onChange?.(next);
  }

  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label="Quantity selector">
      <button
        onClick={() => update(count - 1)}
        aria-label="Decrease quantity"
        className="w-10 h-10 flex items-center justify-center border rounded"
      >
        −
      </button>
      <input
        aria-label="Quantity"
        value={count}
        onChange={(e) => update(Number(e.target.value || 1))}
        className="w-16 text-center border rounded py-2"
      />
      <button
        onClick={() => update(count + 1)}
        aria-label="Increase quantity"
        className="w-10 h-10 flex items-center justify-center border rounded"
      >
        +
      </button>
    </div>
  );
}

