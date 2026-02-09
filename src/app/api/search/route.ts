import { NextResponse } from "next/server";
import { fetchProductsByQuery } from "../../../lib/shopify";
import { mockProducts } from "../../../data/mockProducts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    // If Shopify env is configured, attempt to fetch; otherwise fallback to mocks
    const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API;
    if (shopDomain && token) {
      const products = await fetchProductsByQuery(q, 6);
      // Normalize shape to { title, handle, price, image }
      const results = products.edges.map((e: any) => {
        const node = e.node;
        return {
          id: node.id,
          title: node.title,
          handle: node.handle,
          price: node.variants?.edges?.[0]?.node?.price ?? null,
          image: node.images?.edges?.[0]?.node?.url ?? null
        };
      });
      return NextResponse.json({ results });
    } else {
      // Fallback: filter mockProducts
      const ql = q.toLowerCase();
      const results = mockProducts
        .filter((p) => p.title.toLowerCase().includes(ql) || (p.handle || "").toLowerCase().includes(ql))
        .slice(0, 6)
        .map((p) => ({ id: p.id, title: p.title, handle: p.handle, price: p.price, image: p.image }));
      return NextResponse.json({ results });
    }
  } catch (err) {
    return NextResponse.json({ results: [], error: (err as Error).message }, { status: 500 });
  }
}

