 "use client";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "../../data/mockProducts";
import { useState } from "react";
import Link from "next/link";
import QuickAddButton from "./QuickAddButton";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

export default function ProductCard({ product }: { product: Product }) {
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();

  return (
    <Link href={`/collections/succulents/${product.handle}`} aria-label={`View ${product.title} details`} className="group">
      <article
        className="bg-white rounded-lg overflow-hidden shadow-sm transform transition-transform duration-200 group-hover:scale-105"
        tabIndex={0}
        aria-labelledby={`product-${product.id}`}
      >
        <div className="relative w-full" style={{ paddingTop: "100%" }}>
          <Image
            src={product.image}
            alt={`${product.title} succulent plant, indoor succulent`}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[var(--color-accent)] text-white text-xs px-2 py-1 rounded">{product.badge}</span>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity bg-black/30 flex items-end p-4">
            <div className="w-full text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{product.rating}★</span>
                  <span className="text-xs">({Math.round((product.rating || 4.5) * 10)})</span>
                </div>
              </div>
              <QuickAddButton product={product} setAdding={setAdding} adding={adding} />
            </div>
          </div>
        </div>

        <div className="p-3">
          <h3 id={`product-${product.id}`} className="text-[13px] font-medium text-[var(--color-text)] mb-2 line-clamp-2">
            {product.title}
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-[var(--color-brand)]">${product.price}</div>
            </div>
            <button
              className="w-full bg-[var(--color-brand)] text-white py-2 rounded-[10px] text-sm transform transition-transform active:scale-95"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setAdding(true);
                addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, handle: product.handle }, 1);
                toast.success(`${product.title} added to cart`);
                setTimeout(() => setAdding(false), 800);
              }}
              style={{ height: 36 }}
              aria-label={`Add ${product.title} to cart`}
            >
              {adding ? "Adding…" : "Add to Cart"}
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}

