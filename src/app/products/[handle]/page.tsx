import { notFound } from "next/navigation";
import Link from "next/link";
import { mockProducts } from "../../../data/mockProducts";
import ImageGallery from "../../../components/product/ImageGallery";
import ProductInfo from "../../../components/product/ProductInfo";
import ProductTabs from "../../../components/product/ProductTabs";
import RecommendedProducts from "../../../components/product/RecommendedProducts";
import TrustBar from "../../../components/TrustBar";
import { fetchProductByHandle } from "../../../lib/shopify";

export const revalidate = 86400;

function buildProductJson(p: any) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": p.title,
    "image": [p.image],
    "description": p.title,
    "sku": p.id,
    "brand": { "@type": "Brand", "name": "Succulent Sphere" },
    "offers": { "@type": "Offer", "priceCurrency": p.currency, "price": p.price, "availability": "https://schema.org/InStock" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": p.rating, "reviewCount": Math.round(p.rating * 10) }
  };
}

export default async function ProductPage({ params }: { params: { handle?: string } | Promise<{ handle?: string }> }) {
  const resolvedParams = await Promise.resolve(params);
  const handle = resolvedParams?.handle ?? "";
  let product = null;

  try {
    product = await fetchProductByHandle(handle);
  } catch (error) {
    console.error("Failed to fetch Shopify product by handle:", error);
  }

  if (!product) {
    product = mockProducts.find((p) => p.handle === handle) ?? null;
  }

  if (!product) {
    notFound();
  }

  const productJson = buildProductJson(product);

  return (
    <>
      <head>
        <title>{product.title} — Succulent Sphere</title>
        <meta name="description" content={`Buy ${product.title} — premium succulent from Succulent Sphere.`} />
        <link rel="canonical" href={`https://succulentsphere.com/products/${product.handle}`} />
        <meta property="og:title" content={`${product.title} — Succulent Sphere`} />
        <meta property="og:description" content={`Buy ${product.title} — premium succulent from Succulent Sphere.`} />
        <meta property="og:image" content={product.image} />
      </head>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJson) }} />

      <section className="relative overflow-hidden py-10 md:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_15%_10%,rgba(16,185,129,0.12),transparent_60%),radial-gradient(65%_65%_at_85%_0%,rgba(245,158,11,0.10),transparent_60%)]" />
        <div className="container relative mx-auto px-4">
          <nav className="mb-6 text-xs text-gray-600" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/collections/succulents" className="hover:text-[var(--color-brand)] transition-colors">Succulents</Link>
              </li>
              <li>/</li>
              <li className="font-medium text-[var(--color-text)] truncate max-w-[160px] md:max-w-[280px]">{product.title}</li>
            </ol>
          </nav>

          <div className="rounded-3xl border border-white/40 bg-white/75 backdrop-blur-sm shadow-[0_10px_40px_rgba(15,23,42,0.08)] p-4 md:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
                <ImageGallery images={[product.image]} altPrefix={product.title} />
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm">
                <ProductInfo product={product} />
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm">
            <ProductTabs care={`Light: Bright indirect light. Water: Every 2 weeks.`} description={product.description || "<p>No description</p>"} shipping={"Shipping within 3-5 business days."} />
          </div>

          <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm">
            <RecommendedProducts currentId={product.id} />
          </div>

          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <TrustBar />
          </div>
        </div>
      </section>
    </>
  );
}

