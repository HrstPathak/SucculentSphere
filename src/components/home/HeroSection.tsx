 "use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Use public assets (run scripts/import-assets.js to populate public/assets)
const slides = [
  { id: 1, src: "/assets/hero.png", alt: "Succulent hero" },
  { id: 2, src: "/assets/hero.png", alt: "Succulent lifestyle 2" }
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section aria-label="Hero" className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-4">Elevate Your Space With Living Art</h1>
          <p className="text-lg text-muted mb-6">Handpicked premium succulents &amp; plant décor</p>
          <div className="flex gap-4">
            <Link href="/collections/succulents" className="inline-block bg-[var(--color-brand)] text-white px-6 py-3 rounded shadow-sm">Shop Collection</Link>
            <Link href="/plant-care" className="inline-block border px-6 py-3 rounded">Explore Plant Care</Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative h-64 md:h-96 rounded overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image src={slides[index].src} alt={slides[index].alt} fill style={{ objectFit: "cover" }} priority sizes="(max-width: 768px) 100vw, 50vw" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
