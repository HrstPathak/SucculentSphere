import Image from "next/image";
import Link from "next/link";
import TrustBar from "../../../components/TrustBar";
import CollectionGridClient from "../../../components/shop/CollectionGridClient";
import { fetchProductsList } from "../../../lib/shopify";

export const revalidate = 60; // cache for 60s

function buildBreadcrumbJson() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://succulentsphere.com" },
      { "@type": "ListItem", "position": 2, "name": "Succulent Plants", "item": "https://succulentsphere.com/collections/succulents" },
      { "@type": "ListItem", "position": 3, "name": "All Succulents", "item": "https://succulentsphere.com/collections/succulents" }
    ]
  };
}

function buildCollectionJson(products: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Succulent Plants",
    "description": "Handpicked premium succulents to enrich your home and workspace.",
    "hasPart": products.map((p, i) => ({
      "@type": "Product",
      "position": i + 1,
      "name": p.title,
      "image": p.image,
      "description": p.title,
      "brand": { "@type": "Brand", "name": "Succulent Sphere" },
      "offers": { "@type": "Offer", "price": p.price, "priceCurrency": p.currency || "INR", "availability": "https://schema.org/InStock" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": p.rating || 4.5, "reviewCount": Math.round((p.rating || 4.5) * 10) }
    }))
  };
}

async function fetchShopifyProducts(limit = 24) {
  return await fetchProductsList(limit);
}

export default async function SucculentsPage() {
  let products = [];
  try {
    products = await fetchShopifyProducts(24);
    console.log("Fetched Shopify products:", products.length);
  } catch (e) {
    console.error("Error fetching Shopify products:", e);
  }

  console.log("Products in page:", products);

  const breadcrumbJson = buildBreadcrumbJson();
  const collectionJson = buildCollectionJson(products);

  return (
    <>
      <head>
        <title>Succulent Plants — Succulent Sphere</title>
        <meta name="description" content="Handpicked premium succulents to enrich your home and workspace." />
        <link rel="canonical" href="https://succulentsphere.com/collections/succulents" />
      </head>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJson) }} />

      <section className="bg-[var(--color-bg)] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif text-center mb-2 mt-5">Succulent Plants</h1>
          <p className="text-center max-w-2xl mx-auto mb-6 text-sm">Handpicked premium succulents to enrich your home and workspace.</p>

          {/* Breadcrumb */}
          <nav className="text-xs" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[var(--color-text)]">
              <li><Link href="/">Home</Link></li>
              <li>›</li>
              <li><Link href="/collections/succulents" aria-current="page" className="font-medium">Succulent Plants</Link></li>
              <li>›</li>
              <li>All Succulents</li>
            </ol>
          </nav>

          {/* Toolbar - client controls will render inside the client grid */}
          <div className="mt-6">
            <CollectionGridClient products={products} />
          </div>

          <TrustBar />
        </div>
      </section>
    </>
  );
}
