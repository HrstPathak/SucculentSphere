 "use client";
import Image from "next/image";
import { Product } from "../../data/mockProducts";
import { motion } from "framer-motion";

export default function BestSellerGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((p) => (
        <motion.article key={p.id} className="bg-white rounded-lg p-4 shadow-sm" whileHover={{ scale: 1.02 }}>
          <div className="relative h-40 mb-4 rounded overflow-hidden">
            <Image src={p.image || "/assets/product-1.jpg"} alt={p.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 25vw" />
          </div>
          <h3 className="font-semibold text-sm mb-1">{p.title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">${p.price}</span>
            <button className="bg-[var(--color-brand)] text-white px-3 py-1 rounded text-sm">Add to Cart</button>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
