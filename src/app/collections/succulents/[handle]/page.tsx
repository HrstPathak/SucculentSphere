import { mockProducts } from "../../../../data/mockProducts";
import ImageGallery from "../../../../components/product/ImageGallery";
import ProductInfo from "../../../../components/product/ProductInfo";
import ProductTabs from "../../../../components/product/ProductTabs";
import RecommendedProducts from "../../../../components/product/RecommendedProducts";
import TrustBar from "../../../../components/TrustBar";
import { fetchProductByHandle, fetchProductsList } from "../../../../lib/products";

export const revalidate = 86400;

function buildProductJson(p: any) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: p.title,
    image: [p.image],
    description: p.description || p.title,
    sku: p.id,
    brand: { "@type": "Brand", name: "Succulent Sphere" },
    offers: {
      "@type": "Offer",
      priceCurrency: p.currency || "USD",
      price: p.price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: p.rating || 4.5,
      reviewCount: Math.round((p.rating || 4.5) * 10),
    },
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  let product = mockProducts.find((p) => p.handle === params.handle) ?? mockProducts[0];
  let allProducts = mockProducts;

  try {
    const [supabaseProduct, supabaseProducts] = await Promise.all([
      fetchProductByHandle(params.handle),
      fetchProductsList(24),
    ]);

    if (supabaseProduct) {
      product = supabaseProduct;
    }

    if (supabaseProducts.length > 0) {
      allProducts = supabaseProducts;
    }
  } catch {
    // Keep mock fallback if Supabase is not configured or unavailable.
  }

  const productJson = buildProductJson(product);

  return (
    <>
      <head>
        <title>{product.title} - Succulent Sphere</title>
        <meta name="description" content={`Buy ${product.title} - premium succulent from Succulent Sphere.`} />
        <link rel="canonical" href={`https://succulentsphere.com/collections/succulents/${product.handle}`} />
        <meta property="og:title" content={`${product.title} - Succulent Sphere`} />
        <meta property="og:description" content={`Buy ${product.title} - premium succulent from Succulent Sphere.`} />
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
          <ProductTabs
            care={"Light: Bright indirect light. Water: Every 2 weeks."}
            description={product?.description || "<p>No description</p>"}
            shipping={"Shipping within 3-5 business days."}
          />
        </div>

        <div className="mt-12">
          <RecommendedProducts currentId={product.id} products={allProducts} />
        </div>

        <div className="mt-8">
          <TrustBar />
        </div>
      </section>
    </>
  );
}
