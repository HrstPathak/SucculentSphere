"use client";
import TrustBar from "../TrustBar";
import { useMemo } from "react";

export default function CartSummary({
  items,
  onApplyCoupon
}: {
  items: { price: string; quantity: number }[];
  onApplyCoupon?: (code: string) => void;
}) {
  const subtotal = useMemo(
    () => items.reduce((s, it) => s + Number(it.price) * it.quantity, 0),
    [items]
  );

  return (
    <aside className="bg-white rounded-lg p-6 shadow-sm w-full md:w-96">
      <div className="text-sm mb-4">
        <div className="font-semibold text-lg">Cart Totals</div>
      </div>
      <div className="flex justify-between mb-2">
        <div className="text-sm">Subtotal</div>
        <div className="text-sm font-medium">${subtotal.toFixed(2)}</div>
      </div>

      <div className="mt-4">
        <label className="sr-only" htmlFor="coupon">Coupon code</label>
        <div className="flex gap-2">
          <input id="coupon" name="coupon" placeholder="Enter coupon code" className="flex-1 border rounded px-3 py-2 text-sm" />
          <button className="bg-[var(--color-brand)] text-white px-3 py-2 rounded text-sm" onClick={() => onApplyCoupon?.("DISCOUNT")}>Apply</button>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-sm text-gray-600 mb-2">Shipping</div>
        <div className="text-sm">Calculated at checkout</div>
      </div>

      <div className="mt-6">
        <button className="w-full bg-[var(--color-brand)] text-white py-3 rounded text-sm">Proceed to Checkout</button>
      </div>

      <div className="mt-6">
        <TrustBar />
      </div>
    </aside>
  );
}

