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
    <section className="relative w-full h-[50vh] min-h-[500px] overflow-hidden">

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
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center t-35">
        <div className="max-w-2xl text-[var(--color-text)]">

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-6 tracking-tight" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            Elevate Your Space<br /> With Living Art
          </h1>

          <p className="text-lg md:text-xl mb-8 max-w-md leading-relaxed text-opacity-90" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            Handpicked premium succulents & plant décor for the modern home
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/collections/succulents"
              className="bg-[var(--color-brand)] hover:brightness-110 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl font-medium transition-all duration-200 transform hover:scale-105"
            >
              Shop Collection
            </Link>

            <Link
              href="/plant-care"
              className="border-2 border-[var(--color-text)] text-[var(--color-text)] px-8 py-3 rounded-xl hover:bg-[var(--color-text)] hover:text-white font-medium transition-all duration-200 backdrop-blur-sm bg-white/10"
            >
              Explore Plant Care
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}