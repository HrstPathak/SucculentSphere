import TrustBar from "../../components/TrustBar";
import Image from "next/image";

export const metadata = {
  title: "About Us — Succulent Sphere",
  description: "Cultivating beauty and calm with handpicked premium succulents.",
};

export default function AboutPage() {
  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-56 md:h-96 lg:h-[420px] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/about-hero.jpg')] bg-center bg-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />

          <div className="container mx-auto px-4 relative h-full flex items-center">
            <div className="max-w-3xl mx-auto text-center text-neutral-800">
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-2">About Us</h1>
              <p className="text-sm md:text-base text-muted max-w-2xl mx-auto">Cultivating beauty, inspiring tranquility — we handpick premium succulents and plant décor to bring calm and life into your home.</p>
            </div>
          </div>

          {/* overlapping text on mobile */}
          <div className="md:hidden absolute left-4 right-4 -bottom-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md">
              <p className="text-sm text-center">Handpicked premium succulents &amp; plant décor — crafted with care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-serif mb-4">Our Story</h2>
          <p className="text-muted text-base">Founded by nature enthusiasts, Succulent Sphere began from a love for succulents and a desire to share their calming presence. We curate each plant for health and beauty, helping you create serene green spaces in your home.</p>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <h3 className="text-center font-serif text-2xl mb-8">Our Philosophy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[var(--color-bg)] rounded-lg text-center">
              <div className="text-3xl text-[var(--color-brand)] mb-3">🌱</div>
              <h4 className="font-semibold mb-2">Nature First</h4>
              <p className="text-sm text-muted">We draw inspiration from nature to create harmonious, tranquil plant collections curated for longevity and beauty.</p>
            </div>

            <div className="p-6 bg-[var(--color-bg)] rounded-lg text-center">
              <div className="text-3xl text-[var(--color-brand)] mb-3">👌</div>
              <h4 className="font-semibold mb-2">Handpicked Quality</h4>
              <p className="text-sm text-muted">Each plant is hand-selected for health and form to ensure you receive only the very best.</p>
            </div>

            <div className="p-6 bg-[var(--color-bg)] rounded-lg text-center">
              <div className="text-3xl text-[var(--color-brand)] mb-3">♻️</div>
              <h4 className="font-semibold mb-2">Sustainable Practices</h4>
              <p className="text-sm text-muted">We use eco-conscious packaging and sustainable practices to minimize our impact on the environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-center font-serif text-2xl mb-8">Our Process</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-40 bg-[url('/images/process-sourced.jpg')] bg-cover bg-center" />
            <div className="p-6">
              <h4 className="font-semibold mb-2">Carefully Sourced</h4>
              <p className="text-sm text-muted">We source the healthiest succulents from trusted growers to ensure strong, resilient plants.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-40 bg-[url('/images/process-packaged.jpg')] bg-cover bg-center" />
            <div className="p-6">
              <h4 className="font-semibold mb-2">Custom Packaged</h4>
              <p className="text-sm text-muted">Plants are packaged thoughtfully with sustainable materials to arrive safe and sound.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-40 bg-[url('/images/process-delivered.jpg')] bg-cover bg-center" />
            <div className="p-6">
              <h4 className="font-semibold mb-2">Delivered Fresh</h4>
              <p className="text-sm text-muted">Each plant is prepared for shipping to ensure freshness upon arrival.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Love */}
      <section className="bg-[var(--color-bg)] py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-center font-serif text-2xl mb-8">Customer Love</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <blockquote className="bg-white p-6 rounded-lg shadow-sm">“Absolutely love the succulents — perfect condition and fast shipping.”<cite className="block mt-3 text-sm text-muted">— Suah M.</cite></blockquote>
            <blockquote className="bg-white p-6 rounded-lg shadow-sm">“Such a wonderful experience! The plants are healthy and the care tips were so helpful.”<cite className="block mt-3 text-sm text-muted">— Anan K.</cite></blockquote>
            <blockquote className="bg-white p-6 rounded-lg shadow-sm">“Exceptional quality and service — my plants brighten up my whole home.”<cite className="block mt-3 text-sm text-muted">— Page S.</cite></blockquote>
          </div>
        </div>
      </section>

      {/* Trust bar + footer-area */}
      <TrustBar />

      <footer className="py-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted">
          <p>© {new Date().getFullYear()} Succulent Sphere. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
