 "use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../data/mockProducts";
import { motion } from "framer-motion";

export default function BestSellerGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {products.map((p) => (
        <motion.article 
          key={p.id} 
          className="bg-white dark:bg-[#0a1420] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700" 
          whileHover={{ y: -4 }}
        >
          <div className="relative h-48 md:h-56 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 overflow-hidden group">
            <Image src={p.image || "/assets/product-1.jpg"} alt={p.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 25vw" className="group-hover:scale-110 transition-transform duration-500" />
            {p.badge && (
              <div className="absolute top-3 right-3 bg-[var(--color-brand)] text-white px-3 py-1 rounded-full text-xs font-semibold">
                {p.badge}
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-sm md:text-base text-[var(--color-text)] mb-2 line-clamp-2">{p.title}</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-base md:text-lg font-bold text-[var(--color-brand)]">₹{p.price}</span>
              {p.rating && (
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xs ${i < Math.floor(p.rating ?? 0) ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                  ))}
                </div>
              )}
            </div>
            <Link href={`/products/${p.handle}`} className="w-full block text-center bg-[var(--color-brand)] hover:brightness-110 text-white px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200">
              View Details
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
