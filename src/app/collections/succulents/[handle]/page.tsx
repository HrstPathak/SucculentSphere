import { notFound } from "next/navigation";
import { mockProducts } from "../../../../data/mockProducts";
import ImageGallery from "../../../../components/product/ImageGallery";
import ProductInfo from "../../../../components/product/ProductInfo";
import ProductTabs from "../../../../components/product/ProductTabs";
import RecommendedProducts from "../../../../components/product/RecommendedProducts";
import TrustBar from "../../../../components/TrustBar";
import { fetchProductByHandle } from "../../../../lib/shopify";

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
        <link rel="canonical" href={`https://succulentsphere.com/collections/succulents/${product.handle}`} />
        <meta property="og:title" content={`${product.title} — Succulent Sphere`} />
        <meta property="og:description" content={`Buy ${product.title} — premium succulent from Succulent Sphere.`} />
        <meta property="og:image" content={product.image} />
      </head>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJson) }} />

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ImageGallery images={[product.image]} altPrefix={product.title} />
          </div>
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        <div className="mt-12">
          <ProductTabs care={`Light: Bright indirect light. Water: Every 2 weeks.`} description={product?.description || "<p>No description</p>"} shipping={"Shipping within 3-5 business days."} />
        </div>

        <div className="mt-12">
          <RecommendedProducts currentId={product.id} />
        </div>

        <div className="mt-8">
          <TrustBar />
        </div>
      </section>
    </>
  );
}

