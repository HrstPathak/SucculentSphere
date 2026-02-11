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
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md dark:shadow-xl transform transition-all duration-300 md:group-hover:scale-105 md:group-hover:shadow-xl dark:md:group-hover:shadow-emerald-900/50 border border-gray-100 dark:border-gray-700"
        tabIndex={0}
        aria-labelledby={`product-${product.id}`}
      >
        <div className="relative w-full bg-gray-100 dark:bg-gray-700 overflow-hidden" style={{ paddingTop: "100%" }}>
          <Image
            src={product.image}
            alt={`${product.title} succulent plant, indoor succulent`}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
            className="transition-transform duration-300"
          />
          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">{product.badge}</span>
          )}
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-lg px-2 py-1 shadow-md">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{product.rating}★</span>
            </div>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 bg-black/40 flex items-end p-4 backdrop-blur-sm">
            <div className="w-full text-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold">({Math.round((product.rating || 4.5) * 10)} reviews)</span>
              </div>
              <QuickAddButton product={product} setAdding={setAdding} adding={adding} />
            </div>
          </div>
        </div>

        <div className="p-4 dark:bg-gray-800/100">
          <h3 id={`product-${product.id}`} className="text-sm font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
            {product.title}
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">₹{product.price}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">In Stock</div>
            </div>
            <button
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-emerald-500 dark:to-emerald-600 dark:hover:from-emerald-600 dark:hover:to-emerald-700 text-white py-2.5 rounded-lg text-sm font-semibold transform transition-all active:scale-95 shadow-md dark:shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setAdding(true);
                addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, handle: product.handle }, 1);
                toast.success(`${product.title} added to cart`);
                setTimeout(() => setAdding(false), 800);
              }}
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

