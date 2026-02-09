"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function ImageGallery({ images, altPrefix }: { images: string[]; altPrefix: string }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full">
      <div className="relative rounded overflow-hidden" ref={containerRef} style={{ paddingTop: "100%" }}>
        <motion.div key={images[index]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Image
            src={images[index]}
            alt={`${altPrefix} ${index + 1} indoor succulent`}
            fill
            style={{ objectFit: "cover", transformOrigin: "center" }}
            sizes="(max-width: 640px) 100vw, 50vw"
            priority={index === 0}
          />
        </motion.div>
        {/* Arrows */}
        <button
          aria-label="Previous image"
          onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-sm"
        >
          ‹
        </button>
        <button
          aria-label="Next image"
          onClick={() => setIndex((i) => (i + 1) % images.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-sm"
        >
          ›
        </button>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex gap-3">
        {images.map((img, i) => (
          <button
            key={img + i}
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}`}
            className={`relative w-20 h-20 rounded overflow-hidden flex-shrink-0 border ${i === index ? "ring-2 ring-[var(--color-brand)]" : ""}`}
          >
            <Image src={img} alt={`${altPrefix} thumb ${i + 1}`} fill style={{ objectFit: "cover" }} sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}

