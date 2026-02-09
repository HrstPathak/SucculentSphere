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
      <section className="container mx-auto px-4 section-padding-mobile md:section-padding-tablet lg:section-padding-desktop">
        <CategoryGrid />
      </section>

      <section className="container mx-auto px-4 section-padding-mobile md:section-padding-tablet lg:section-padding-desktop">
        <h2 className="text-2xl font-serif text-center mb-8">Best Sellers</h2>
        <BestSellerGrid products={mockProducts} />
      </section>

      <section className="container mx-auto px-4 section-padding-mobile md:section-padding-tablet lg:section-padding-desktop">
        <BrandStory />
      </section>

      <section className="container mx-auto px-4 section-padding-mobile md:section-padding-tablet lg:section-padding-desktop">
        <InstagramFeed />
      </section>

      <section className="container mx-auto px-4 section-padding-mobile md:section-padding-tablet lg:section-padding-desktop">
        <Testimonials />
      </section>
    </>
  );
}
