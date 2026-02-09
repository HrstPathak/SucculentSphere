"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { id: 1, name: "Emily R.", quote: "Absolutely in love with my new plants! Exceptional quality and service.", rating: 5 },
  { id: 2, name: "Mark D.", quote: "Beautiful pots and healthy succulents — arrived perfectly packaged.", rating: 5 },
  { id: 3, name: "Ava S.", quote: "Luxury feel and fast delivery. Highly recommend.", rating: 4 }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  return (
    <section aria-labelledby="testimonials" className="text-center">
      <h3 id="testimonials" className="text-xl font-serif mb-6">Customer Testimonials</h3>
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.blockquote key={items[index].id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
            <p className="italic mb-3">“{items[index].quote}”</p>
            <cite className="font-semibold">— {items[index].name}</cite>
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-4 flex justify-center gap-2">
          {items.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} aria-label={`Show testimonial ${i + 1}`} className={`w-3 h-3 rounded-full ${i === index ? "bg-[var(--color-brand)]" : "bg-gray-300"}`}></button>
          ))}
        </div>
      </div>
    </section>
  );
}
