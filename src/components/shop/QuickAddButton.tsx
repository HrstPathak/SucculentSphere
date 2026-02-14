"use client";
import { useCart } from "../../context/CartContext";
import type { Product } from "../../data/mockProducts";
import { showSuccessToast } from "../../lib/toast";

export default function QuickAddButton({ product, setAdding, adding }: { product: Product; setAdding: (b: boolean) => void; adding: boolean }) {
  const { addToCart } = useCart();

  return (
    <button
      className="bg-white text-[var(--color-brand)] w-full py-2 rounded text-sm font-medium"
      onClick={(e) => {
        e.preventDefault();
        setAdding(true);
        addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, handle: product.handle }, 1);
        showSuccessToast(`${product.title} added to cart`);
        setTimeout(() => setAdding(false), 800);
      }}
      aria-label={`Add ${product.title} to cart`}
    >
      {adding ? "Adding…" : "Quick Add"}
    </button>
  );
}
