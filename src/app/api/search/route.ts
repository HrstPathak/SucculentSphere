import { NextResponse } from "next/server";
import { fetchProductsByQuery } from "../../../lib/products";
import { mockProducts } from "../../../data/mockProducts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await fetchProductsByQuery(q, 6);
    if (results.length > 0) {
      return NextResponse.json({
        results: results.map((p) => ({
          id: p.id,
          title: p.title,
          handle: p.handle,
          price: p.price,
          image: p.image,
        })),
      });
    }
  } catch {
    // Fall through to mock fallback
  }

  const ql = q.toLowerCase();
  const results = mockProducts
    .filter((p) => p.title.toLowerCase().includes(ql) || (p.handle || "").toLowerCase().includes(ql))
    .slice(0, 6)
    .map((p) => ({ id: p.id, title: p.title, handle: p.handle, price: p.price, image: p.image }));

  return NextResponse.json({ results });
}
