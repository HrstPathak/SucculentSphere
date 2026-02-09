import Image from "next/image";
import Link from "next/link";
import { mockProducts } from "../../../data/mockProducts";
import ProductCard from "../../../components/shop/ProductCard.tsx";
import FilterDrawer from "../../../components/shop/FilterDrawer";
import SortDropdown from "../../../components/shop/SortDropdown";
import Pagination from "../../../components/shop/Pagination";
import TrustBar from "../../../components/TrustBar";

export const revalidate = 86400;

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
      "offers": { "@type": "Offer", "price": p.price, "priceCurrency": p.currency, "availability": "https://schema.org/InStock" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": p.rating, "reviewCount": Math.round(p.rating * 10) }
    }))
  };
}

export default function SucculentsPage() {
  const products = mockProducts;

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
          <h1 className="text-4xl font-serif text-center mb-2">Succulent Plants</h1>
          <p className="text-center max-w-2xl mx-auto mb-6">Handpicked premium succulents to enrich your home and workspace.</p>
          <p className="text-sm text-center max-w-3xl mx-auto mb-6">Succulents are low-maintenance, drought-tolerant plants perfect for modern interiors. Browse a curated selection of premium varieties and elegant planters.</p>

          {/* Breadcrumb */}
          <nav className="text-sm mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[var(--color-text)]">
              <li><Link href="/">Home</Link></li>
              <li>›</li>
              <li><Link href="/collections/succulents" aria-current="page" className="font-medium">Succulent Plants</Link></li>
              <li>›</li>
              <li>All Succulents</li>
            </ol>
          </nav>

          {/* Toolbar */}
          <div className="sticky top-24 bg-[var(--color-bg)] py-4 z-20">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FilterDrawer />
              </div>
              <div className="ml-auto">
                <SortDropdown />
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 px-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <Pagination page={1} total={2} />

          <TrustBar />
        </div>
      </section>
    </>
  );
}

