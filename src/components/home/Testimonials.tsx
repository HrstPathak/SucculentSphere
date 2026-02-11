"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { id: 1, name: "Emily R.", quote: "Absolutely in love with my new plants! Exceptional quality and service.", rating: 5 },
  { id: 2, name: "Mark D.", quote: "Beautiful pots and healthy succulents — arrived perfectly packaged.", rating: 5 },
  { id: 3, name: "Ava S.", quote: "Luxury feel and fast delivery. Highly recommend.", rating: 4 }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.children[0]?.clientWidth || 0;
    const newIndex = Math.round(scrollLeft / itemWidth);
    setIndex(Math.min(newIndex, items.length - 1));
  };

  const scrollToIndex = (i: number) => {
    setIndex(i);
    if (scrollContainerRef.current && scrollContainerRef.current.children[i]) {
      scrollContainerRef.current.children[i].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  };

  return (
    <section aria-labelledby="testimonials" className="text-center">
      <h3 id="testimonials" className="text-3xl md:text-4xl font-serif mb-4 text-[var(--color-text)]">What Our Customers Say</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">Join thousands of happy plant lovers</p>
      
      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden -mx-4 px-4">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`
            [style*="scrollbar-width"] {
              -ms-overflow-style: none;
            }
            [style*="scrollbar-width"]::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-full snap-start bg-gradient-to-br from-[var(--color-bg)] to-transparent dark:from-[#0a1420] dark:to-transparent rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-2xl ${
                    i < item.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                  }`}>★</span>
                ))}
              </div>
              <blockquote>
                <p className="text-lg italic mb-6 text-[var(--color-text)] leading-relaxed">{item.quote}</p>
                <cite className="text-base font-semibold text-[var(--color-text)] not-italic block">— {item.name}</cite>
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Animated Single Card */}
      <div className="hidden md:block max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div 
            key={items[index].id} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[var(--color-bg)] to-transparent dark:from-[#0a1420] dark:to-transparent rounded-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700 shadow-lg"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-2xl ${
                  i < items[index].rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                }`}>★</span>
              ))}
            </div>
            <blockquote>
              <p className="text-xl md:text-2xl italic mb-6 text-[var(--color-text)] leading-relaxed">{items[index].quote}</p>
              <cite className="text-base md:text-lg font-semibold text-[var(--color-text)] not-italic block">— {items[index].name}</cite>
            </blockquote>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Navigation */}
      <div className="mt-8 flex justify-center gap-3">
        {items.map((_, i) => (
          <button 
            key={i} 
            onClick={() => scrollToIndex(i)} 
            aria-label={`Show testimonial ${i + 1}`} 
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index 
                ? "bg-[var(--color-brand)] w-8" 
                : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
