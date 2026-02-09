const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API;

async function storefrontFetch(query: string, variables = {}) {
  if (!SHOP_DOMAIN || !STOREFRONT_ACCESS_TOKEN) {
    throw new Error("Missing Shopify environment variables.");
  }

  const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN
    },
    body: JSON.stringify({ query, variables })
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }
  return json.data;
}

export async function fetchCollections(limit = 10) {
  const query = /* GraphQL */ `
    query Collections($limit: Int!) {
      collections(first: $limit) {
        edges {
          node {
            id
            title
            handle
            image { url altText }
          }
        }
      }
    }
  `;
  const data = await storefrontFetch(query, { limit });
  return data.collections;
}

export async function fetchFeaturedProducts(limit = 8) {
  const query = /* GraphQL */ `
    query Products($limit: Int!) {
      products(first: $limit) {
        edges {
          node {
            id
            title
            handle
            images(first:1) { edges { node { url altText } } }
            variants(first:1) { edges { node { price } } }
          }
        }
      }
    }
  `;
  const data = await storefrontFetch(query, { limit });
  return data.products;
}

export async function fetchProductByHandle(handle: string) {
  const query = /* GraphQL */ `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
      }
    }
  `;
  const data = await storefrontFetch(query, { handle });
  return data.productByHandle;
}

export async function fetchProductsByQuery(q: string, limit = 6) {
  const query = /* GraphQL */ `
    query SearchProducts($query: String!, $limit: Int!) {
      products(first: $limit, query: $query) {
        edges {
          node {
            id
            title
            handle
            tags
            images(first:1) { edges { node { url altText } } }
            variants(first:1) { edges { node { price } } }
          }
        }
      }
    }
  `;
  const data = await storefrontFetch(query, { query: q, limit });
  return data.products;
}
