 "use client";
import QuantitySelector from "./QuantitySelector";
import TrustBar from "../TrustBar";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { showSuccessToast } from "../../lib/toast";

export default function ProductInfo({ product }: { product: any }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const cartItem = {
    id: String(product?.id ?? ""),
    title: product?.title || "Untitled Product",
    price: String(product?.price ?? "0.00"),
    image: product?.image || "/assets/product-1.jpg",
    handle: product?.handle || ""
  };

  return (
    <div>
      <div className="mb-4">
        {product.badge && <span className="inline-block bg-[var(--color-accent)] text-white px-3 py-1 rounded text-xs mb-2">{product.badge}</span>}
        <h1 className="text-3xl font-serif mb-2">{product.title}</h1>
        <div className="text-2xl font-semibold mb-4">${product.price}</div>
        <p className="text-gray-700 mb-4">A beautiful rosette-shaped succulent perfect for modern interiors.</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-2"><span>☀</span><span className="text-sm">Bright Indirect Light</span></div>
          <div className="flex items-center gap-2"><span>💧</span><span className="text-sm">Water every 2 weeks</span></div>
        </div>
      </div>

      <div className="mb-4">
        <QuantitySelector value={qty} onChange={setQty} />
      </div>

      <div className="mb-4">
        <button
          className="w-full md:w-auto bg-[var(--color-brand)] text-white px-6 py-3 rounded text-sm"
          onClick={() => {
            addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, handle: product.handle }, qty);
            showSuccessToast(`${product.title} added to cart`);
          }}
        >
          Add to Cart
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4">Each plant is carefully selected and packed with love.</p>

      <TrustBar />
    </div>
  );
}
