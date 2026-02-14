export type StoreProduct = {
  id: string;
  title: string;
  handle: string;
  price: string;
  currency: string;
  image: string;
  badge: string;
  rating: number;
  availability: string;
  description: string;
  createdAt?: string;
};

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

const PRODUCT_SELECT = "id,title,handle,price,currency,image,badge,rating,availability,description,created_at";

function assertSupabaseConfigured() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "[supabase] Missing env vars. Expected SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL and SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }
}

function normalizeProduct(row: Record<string, any>, idx: number): StoreProduct {
  return {
    id: String(row.id ?? `supabase-${idx}`),
    title: String(row.title ?? "Untitled"),
    handle: String(row.handle ?? ""),
    price: String(row.price ?? "0.00"),
    currency: String(row.currency ?? "USD"),
    image: String(row.image ?? "/assets/product-1.jpg"),
    badge: row.badge ? String(row.badge) : "",
    rating: typeof row.rating === "number" ? row.rating : 4.6,
    availability: row.availability ? String(row.availability) : "InStock",
    description: row.description ? String(row.description) : "",
    createdAt: row.created_at ? String(row.created_at) : undefined,
  };
}

async function supabaseFetch(path: string) {
  assertSupabaseConfigured();

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    method: "GET",
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const detail = data?.message || data?.error || response.statusText;
    throw new Error(`[supabaseFetch] ${detail}`);
  }

  return data;
}

export async function fetchProductsList(limit = 24): Promise<StoreProduct[]> {
  const rows = await supabaseFetch(
    `products?select=${PRODUCT_SELECT}&order=created_at.desc.nullslast&limit=${Math.max(1, limit)}`
  );

  return Array.isArray(rows) ? rows.map((row, idx) => normalizeProduct(row, idx)) : [];
}

export async function fetchProductsByQuery(searchQuery: string, first = 6): Promise<StoreProduct[]> {
  const q = searchQuery.trim();
  if (!q) return [];

  const encoded = `*${q.replace(/\*/g, "")}*`;
  const rows = await supabaseFetch(
    `products?select=${PRODUCT_SELECT}&or=(title.ilike.${encodeURIComponent(encoded)},handle.ilike.${encodeURIComponent(encoded)})&order=created_at.desc.nullslast&limit=${Math.max(1, first)}`
  );

  return Array.isArray(rows) ? rows.map((row, idx) => normalizeProduct(row, idx)) : [];
}

export async function fetchProductByHandle(handle: string): Promise<StoreProduct | null> {
  const rows = await supabaseFetch(
    `products?select=${PRODUCT_SELECT}&handle=eq.${encodeURIComponent(handle)}&limit=1`
  );

  if (!Array.isArray(rows) || rows.length === 0) return null;
  return normalizeProduct(rows[0], 0);
}

