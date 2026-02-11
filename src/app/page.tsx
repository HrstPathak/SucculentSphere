import HeroSection from "../components/home/HeroSection";
import CategoryGrid from "../components/home/CategoryGrid";
import BestSellerGrid from "../components/home/BestSellerGrid";
import BrandStory from "../components/home/BrandStory";
import InstagramFeed from "../components/home/InstagramFeed";
import Testimonials from "../components/home/Testimonials";
import { mockProducts } from "../data/mockProducts";

export const revalidate = 86400; // static regenerate daily

export default function Home() {
  return (
    <>
      <header />
      <HeroSection />
      
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-transparent via-[var(--color-bg)] to-transparent">
        <div className="container mx-auto px-4">
          <CategoryGrid />
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-center text-[var(--color-text)]">Best Sellers</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-2">Handpicked favorites loved by our customers</p>
          </div>
          <BestSellerGrid products={mockProducts} />
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-r from-[var(--color-bg)] to-transparent">
        <div className="container mx-auto px-4">
          <BrandStory />
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <InstagramFeed />
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-transparent to-[var(--color-bg)]">
        <div className="container mx-auto px-4">
          <Testimonials />
        </div>
      </section>
    </>
  );
}
