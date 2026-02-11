"use client";
import React, { useMemo, useState } from "react";
import FilterDrawer from "./FilterDrawer";
import SortDropdown from "./SortDropdown";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import type { Product } from "../../data/mockProducts";

export default function CollectionGridClient({ products }: { products: Product[] }) {
  const [sort, setSort] = useState("featured");

  const sorted = useMemo(() => {
    const copy = [...products];
    switch (sort) {
      case "price_asc":
        return copy.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "price_desc":
        return copy.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case "best_selling":
        return copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      case "newest":
        return copy.sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0));
      default:
        return copy;
    }
  }, [products, sort]);

  return (
    <>
      <div className="sticky bg-[var(--color-bg)] py-5 z-20" style={{ top: "60px" }}>
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <FilterDrawer />
          </div>
          <div className="ml-auto">
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 px-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <Pagination page={1} total={2} />
    </>
  );
}
