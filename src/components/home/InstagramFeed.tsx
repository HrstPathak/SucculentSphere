import Image from "next/image";

const posts = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  img: `/assets/ig-${i + 1}.jpg`,
  alt: `Instagram ${i + 1}`
}));

export default function InstagramFeed() {
  return (
    <section aria-labelledby="instagram" className="overflow-x-auto">
      <h3 id="instagram" className="text-lg font-serif mb-4 text-center">Follow Us @succulentsphere</h3>
      <div className="flex gap-4 px-4">
        {posts.map((p) => (
          <div key={p.id} className="w-36 h-36 flex-shrink-0 rounded overflow-hidden bg-white shadow-sm">
            <Image src={p.img} alt={p.alt} width={144} height={144} style={{ objectFit: "cover" }} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
