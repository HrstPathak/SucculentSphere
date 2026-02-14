const domain =
  process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";

const token =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API ||
  "";

const apiVersion = process.env.SHOPIFY_API_VERSION || process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || "2026-01";

if (!domain || !token) {
  console.warn(
    "[shopify] Missing Shopify env vars. Checked SHOPIFY_STORE_DOMAIN / NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN / NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN / NEXT_PUBLIC_SHOPIFY_STOREFRONT_API"
  );
}

export async function shopifyFetch(query: string, variables: Record<string, any> = {}) {
  const response = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await response.json();
  if (!response.ok) {
    const msg = json?.errors ? JSON.stringify(json.errors) : response.statusText;
    throw new Error(`[shopifyFetch] ${msg}`);
  }
  return json;
}

export async function fetchProductsByQuery(searchQuery: string, first = 6) {
  const gql = `query ($q: String!, $first: Int!) {
    products(query: $q, first: $first) {
      edges {
        node {
          id
          title
          handle
          images(first: 1) {
            edges { node { url altText } }
          }
          variants(first: 1) {
            edges { node { priceV2 { amount currencyCode } } }
          }
        }
      }
    }
  }`;

  const res = await shopifyFetch(gql, { q: searchQuery, first });
  if (res.errors) {
    throw new Error(res.errors.map((e: any) => e.message).join(", "));
  }
  return res.data?.products ?? { edges: [] };
}

export async function fetchProductsList(limit = 24) {
  const gql = `query Products($limit: Int!) {
    products(first: $limit) {
      edges {
        node {
          id
          title
          handle
          images(first: 1) { edges { node { url altText } } }
          variants(first: 1) { edges { node { priceV2 { amount currencyCode } } } }
          tags
          createdAt
        }
      }
    }
  }`;

  const res = await shopifyFetch(gql, { limit });
  if (res.errors) {
    throw new Error(res.errors.map((e: any) => e.message).join(", "));
  }

  const edges = res.data?.products?.edges ?? [];
  return edges.map((e: any, idx: number) => {
    const node = e.node || {};
    const image = node.images?.edges?.[0]?.node?.url || "/assets/product-1.jpg";
    const variant = node.variants?.edges?.[0]?.node;
    const price = variant?.priceV2?.amount ?? "0.00";
    const currency = variant?.priceV2?.currencyCode ?? "INR";
    return {
      id: node.id || `shopify-${idx}`,
      title: node.title || "Untitled",
      handle: node.handle || "",
      image,
      price,
      currency,
      badge: "",
      rating: 4.6,
    };
  });
}

function normalizeHandle(input: unknown): string {
  const raw = Array.isArray(input) ? input[0] : input;
  if (typeof raw !== "string") return "";

  let value = raw.trim();
  if (!value) return "";

  try {
    value = decodeURIComponent(value);
  } catch {}

  value = value.replace(/^\/+|\/+$/g, "");
  if (value.includes("/")) {
    value = value.split("/").pop() || "";
  }

  return value.trim();
}

export async function fetchProductByHandle(handleInput: unknown) {
  const handle = normalizeHandle(handleInput);
  if (!handle) return null;

  const gql = `query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      images(first: 1) { edges { node { url altText } } }
      variants(first: 1) { edges { node { priceV2 { amount currencyCode } } } }
      tags
      createdAt
    }
  }`;

  const res = await shopifyFetch(gql, { handle });
  if (res.errors) {
    throw new Error(res.errors.map((e: any) => e.message).join(", "));
  }

  const node = res.data?.productByHandle;
  if (!node) return null;

  const image = node.images?.edges?.[0]?.node?.url || "/assets/product-1.jpg";
  const variant = node.variants?.edges?.[0]?.node;
  const price = variant?.priceV2?.amount ?? "0.00";
  const currency = variant?.priceV2?.currencyCode ?? "INR";

  return {
    id: node.id,
    title: node.title || "Untitled",
    handle: node.handle || handle,
    image,
    price,
    currency,
    badge: "",
    rating: 4.6,
    description: node.descriptionHtml || "",
  };
}
