import Image from "next/image";

export default function BrandStory() {
  return (
    <section aria-labelledby="our-story" className="bg-gradient-to-r from-[var(--color-bg)] dark:from-[#0a1420] to-transparent rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h2 id="our-story" className="text-3xl md:text-4xl font-serif mb-6 text-[var(--color-text)]">Our Story</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
            Cultivating Beauty, Inspiring Tranquility. At Succulent Sphere, we believe in the art of nature. Each plant is chosen with care and packaged with love.
          </p>
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
            From collector to collector, we share your passion for premium plants and sustainable living.
          </p>
        </div>
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
          <Image src="/assets/brand-lifestyle.jpg" alt="Our story lifestyle" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" className="hover:scale-105 transition-transform duration-500" />
        </div>
      </div>
    </section>
  );
}
