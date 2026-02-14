import Image from "next/image";

const categories = [
  { title: "Succulent Plants", href: "/collections/succulents", img: "/images/Category_SucculentPlant.png" },
  { title: "Elegant Pots", href: "/collections/pots", img: "/images/Category_ElegantPots.png" },
  { title: "Gifting Collection", href: "/collections/gifting", img: "/images/Category_GiftCollection.png" },
  { title: "Beginner Friendly", href: "/collections/beginner", img: "/images/Category_BeginnerFriendly.png" }
];

export default function CategoryGrid() {
  return (
    <section aria-labelledby="shop-by-category">
      <h2 id="shop-by-category" className="text-3xl md:text-4xl font-serif text-center mb-4 text-[var(--color-text)]">Shop by Category</h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">Discover our curated collections of premium plants and accessories</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((c) => (
          <a key={c.title} href={c.href} className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
            <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700">
              <Image src={c.img} alt={c.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 25vw" className="group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-5 bg-white dark:bg-[#0a1420] text-center border-t border-gray-50 dark:border-gray-700">
              <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)]">{c.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
