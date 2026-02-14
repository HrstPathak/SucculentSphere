"use client";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "../../data/mockProducts";

export default function RecommendedProducts({ currentId, products }: { currentId?: string; products: Product[] }) {
  const recs = products.filter((p) => p.id !== currentId).slice(0, 4);

  return (
    <div>
      <h3 className="text-xl font-serif mb-4">Recommended Products</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {recs.map((r) => (
          <Link key={r.id} href={`/collections/succulents/${r.handle}`} className="block bg-white rounded p-3 text-center shadow-sm">
            <div className="relative w-full" style={{ paddingTop: "100%" }}>
              <Image src={r.image} alt={`${r.title} succulent`} fill style={{ objectFit: "cover" }} sizes="200px" loading="lazy" />
            </div>
            <div className="mt-2 text-sm font-medium">{r.title}</div>
            <div className="text-sm text-gray-700">${r.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
