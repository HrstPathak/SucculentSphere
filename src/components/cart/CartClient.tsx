"use client";
import { useState, useCallback } from "react";
import { mockProducts } from "../../data/mockProducts";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

type CartEntry = (typeof mockProducts)[number] & { quantity: number };

export default function CartClient({ initial }: { initial?: CartEntry[] }) {
  const [items, setItems] = useState<CartEntry[]>(
    initial ?? mockProducts.slice(0, 2).map((p) => ({ ...p, quantity: 1 }))
  );

  const changeQty = useCallback((id: string, qty: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, quantity: qty } : it)));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const applyCoupon = useCallback((code: string) => {
    // placeholder - integrate with Storefront API
    alert(`Apply coupon: ${code}`);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4">
        {items.map((it) => (
          <CartItem key={it.id} item={it} onChangeQty={changeQty} onRemove={remove} />
        ))}
      </div>

      <div className="mt-6">
        <CartSummary items={items.map((i) => ({ price: i.price, quantity: i.quantity }))} onApplyCoupon={applyCoupon} />
      </div>
    </div>
  );
}

