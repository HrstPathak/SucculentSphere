"use client";
import Link from "next/link";

export default function Pagination({ page = 1, total = 2 }: { page?: number; total?: number }) {
  const pages = Array.from({ length: total }).map((_, i) => i + 1);
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-8">
      <Link href={`?page=${Math.max(1, page - 1)}`} className="px-3 py-1 border rounded text-sm">Previous</Link>
      {pages.map((p) => (
        <Link key={p} href={`?page=${p}`} className={`px-3 py-1 rounded text-sm ${p === page ? "bg-[var(--color-brand)] text-white" : "border"}`}>
          {p}
        </Link>
      ))}
      <Link href={`?page=${Math.min(total, page + 1)}`} className="px-3 py-1 border rounded text-sm">Next</Link>
    </nav>
  );
}

