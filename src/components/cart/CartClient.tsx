"use client";
import { useCallback } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { useCart } from "../../context/CartContext";

export default function CartClient() {
  const { items, updateQty, removeFromCart } = useCart();

  const changeQty = useCallback((id: string, qty: number) => {
    updateQty(id, qty);
  }, [updateQty]);

  const remove = useCallback((id: string) => {
    removeFromCart(id);
  }, [removeFromCart]);

  const applyCoupon = useCallback((code: string) => {
    // placeholder - integrate with Storefront API
    alert(`Apply coupon: ${code}`);
  }, []);

  return (
    <div>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <img src="/images/empty-cart.svg" alt="Empty cart" className="w-40 h-40 mb-6 object-contain" />
          <div className="text-lg font-semibold mb-2">Your cart is empty</div>
          <div className="text-sm text-muted mb-4">Add some beautiful succulents to get started.</div>
          <a href="/collections/succulents" className="bg-[var(--color-brand)] text-white px-5 py-2 rounded">Shop Succulents</a>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {items.map((it) => (
              <CartItem key={it.id} item={it} onChangeQty={changeQty} onRemove={remove} />
            ))}
          </div>

          <div className="mt-6">
            <CartSummary items={items.map((i) => ({ price: i.price, quantity: i.quantity }))} onApplyCoupon={applyCoupon} />
          </div>
        </>
      )}
    </div>
  );
}

