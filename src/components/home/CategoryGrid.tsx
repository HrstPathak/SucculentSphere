import Image from "next/image";

const categories = [
  { title: "Succulent Plants", href: "/collections/succulents", img: "/assets/category-1.jpg" },
  { title: "Elegant Pots", href: "/collections/pots", img: "/assets/category-2.jpg" },
  { title: "Gifting Collection", href: "/collections/gifting", img: "/assets/category-3.jpg" },
  { title: "Beginner Friendly", href: "/collections/beginner", img: "/assets/category-4.jpg" }
];

export default function CategoryGrid() {
  return (
    <section aria-labelledby="shop-by-category">
      <h2 id="shop-by-category" className="text-xl font-serif text-center mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((c) => (
          <a key={c.title} href={c.href} className="block rounded-lg overflow-hidden shadow-sm hover:scale-105 transition-transform duration-300">
            <div className="relative h-40">
              <Image src={c.img} alt={c.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-sm text-center">{c.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
