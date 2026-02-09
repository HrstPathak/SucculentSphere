"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { id: 1, src: "/images/banner1.png", alt: "Succulent hero" },
  { id: 2, src: "/images/banner1.png", alt: "Succulent lifestyle 2" }
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);

    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] overflow-hidden">

      {/* Background Carousel */}
      {/* <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        > */}
          <Image
            src={slides[index].src}
            alt={slides[index].alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        {/* </motion.div>
      </AnimatePresence> */}

      {/* Overlay Gradient (Premium Feel) */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-xl text-[var(--color-text)]">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-4">
            Elevate Your Space With Living Art
          </h1>

          <p className="text-lg mb-6">
            Handpicked premium succulents & plant décor
          </p>

          <div className="flex gap-4">
            <Link
              href="/collections/succulents"
              className="bg-[var(--color-brand)] text-white px-6 py-3 rounded shadow"
            >
              Shop Collection
            </Link>

            <Link
              href="/plant-care"
              className="border border-gray-400 px-6 py-3 rounded backdrop-blur-sm bg-white/60"
            >
              Explore Plant Care
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
