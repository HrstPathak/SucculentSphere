import Image from "next/image";

export default function BrandStory() {
  return (
    <section aria-labelledby="our-story" className="bg-white rounded-lg p-6">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 id="our-story" className="text-2xl font-serif mb-4">Our Story</h2>
          <p className="mb-4">Cultivating Beauty, Inspiring Tranquility. At Succulent Sphere, we believe in the art of nature. Each plant is chosen with care and packaged with love.</p>
        </div>
        <div className="relative h-48 md:h-64 rounded overflow-hidden">
          <Image src="/assets/brand-lifestyle.jpg" alt="Our story lifestyle" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </div>
    </section>
  );
}
