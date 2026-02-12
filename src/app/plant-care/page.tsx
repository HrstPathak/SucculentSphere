"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PlantCarePage() {
  // accordion single-open state
  const [openId, setOpenId] = useState<string | null>("overwatering");

  const toggle = (id: string) => setOpenId((curr) => (curr === id ? null : id));

  const blogs = [
    {
      id: "b1",
      title: "Best Succulents for Beginners",
      desc: "Low-maintenance varieties that thrive indoors.",
      img: "https://images.unsplash.com/photo-1524594154908-2f20d2a8f4a9?w=1200&q=80"
    },
    {
      id: "b2",
      title: "Indoor Styling with Plants",
      desc: "Simple arrangements to elevate calm spaces.",
      img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80"
    },
    {
      id: "b3",
      title: "Succulent Watering Myths",
      desc: "What to stop believing about watering schedules.",
      img: "https://images.unsplash.com/photo-1501004318640-3d68d7d0d6c6?w=1200&q=80"
    }
  ];

  return (
    <main className="bg-[#F7F4EF] text-[#2F3E34] min-h-screen">
      {/* HERO */}
      <header className="relative w-full h-[50vh] md:h-[60vh] min-h-[500px] overflow-hidden rounded-b-2xl">
        <Image src="/images/banner1.png" alt="Plant care hero" fill className="object-cover object-right" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 absolute left-0 top-16 md:top-20">
          <div className="max-w-3xl text-left text-[var(--color-text)]">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-4">Plant Care Guide</h1>
            <p className="mt-2 text-base md:text-lg text-gray-800 max-w-xl">Everything you need to keep your succulents healthy and thriving.</p>

            
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        {/* Quick Care Basics */}
        <h2 className="font-serif text-xl text-center mb-4">Quick Care Basics</h2>
        <div className="grid grid-cols-2 gap-4">
          <CareCard icon="🌞" title="Sunlight" desc="Bright, indirect light is best." href="#" />
          <CareCard icon="💧" title="Watering" desc="Deep but infrequent—let soil dry." href="#" />
          <CareCard icon="🌱" title="Soil & Potting" desc="Well-draining mix and breathable pots." href="#" />
          <CareCard icon="🌡" title="Temperature" desc="Keep above 50°F and avoid drafts." href="#" />
        </div>
      </section>

      <section className="container mx-auto px-4 py-6">
        {/* Beginner Friendly Guide */}
        <h2 className="font-serif text-xl text-center mb-4">Beginner Friendly Guide</h2>
        <article className="bg-white rounded-xl shadow-sm p-4">
          <img className="w-full rounded-lg mb-4 object-cover h-40" src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80" alt="beginner tray" />
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold">How Often to Water</h3>
              <p>Allow the soil to dry between deep waterings — usually every 2–4 weeks depending on light and season.</p>
            </div>
            <div>
              <h3 className="font-semibold">Where to Place Indoors</h3>
              <p>Near a bright window with indirect sunlight; avoid hot radiators and cold drafts.</p>
            </div>
            <div>
              <h3 className="font-semibold">Avoid These Mistakes</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Overwatering</li>
                <li>Poor drainage</li>
                <li>Using garden soil</li>
              </ul>
            </div>
          </div>
        </article>
      </section>

      <section className="container mx-auto px-4 py-6">
        {/* Common Problems - Accordion */}
        <h2 className="font-serif text-xl text-center mb-4">Common Problems & Solutions</h2>
        <div className="space-y-3">
          <Accordion id="overwatering" open={openId === "overwatering"} onToggle={() => toggle("overwatering")} title="Overwatering Symptoms">
            <p className="font-semibold">Signs:</p>
            <p className="text-sm">Mushy leaves, blackened trunks, and root rot.</p>
            <p className="font-semibold mt-2">Causes:</p>
            <p className="text-sm">Too frequent watering, poor drainage.</p>
            <p className="font-semibold mt-2">Solution:</p>
            <p className="text-sm">Allow soil to dry, repot into fresh, well-draining mix and trim damaged roots.</p>
          </Accordion>

          <Accordion id="yellow" open={openId === "yellow"} onToggle={() => toggle("yellow")} title="Yellow Leaves">
            <p className="text-sm">Often due to water stress or low light; adjust water and light exposure.</p>
          </Accordion>

          <Accordion id="pests" open={openId === "pests"} onToggle={() => toggle("pests")} title="Pest Issues">
            <p className="text-sm">Isolate the plant, remove pests by hand, and treat with neem oil if needed.</p>
          </Accordion>

          <Accordion id="root" open={openId === "root"} onToggle={() => toggle("root")} title="Root Rot">
            <p className="text-sm">Remove affected roots, let dry, repot into dry soil and reduce watering frequency.</p>
          </Accordion>

          <Accordion id="underwatering" open={openId === "underwatering"} onToggle={() => toggle("underwatering")} title="Underwatering Signs">
            <p className="text-sm">Wrinkled, shriveled leaves — increase watering slightly and monitor recovery.</p>
          </Accordion>
        </div>
      </section>

      <section className="container mx-auto px-4 py-6">
        {/* Seasonal Care - horizontal scroll */}
        <h2 className="font-serif text-xl text-center mb-4">Seasonal Care Tips</h2>
        <div className="flex gap-4 overflow-x-auto snap-x pb-3">
          <SeasonCard title="Summer Care" img="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=60" />
          <SeasonCard title="Winter Care" img="https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=800&q=60" />
          <SeasonCard title="Monsoon Care" img="https://images.unsplash.com/photo-1501004318640-3d68d7d0d6c6?w=800&q=60" />
          <SeasonCard title="Indoor Adjustments" img="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=60" />
        </div>
      </section>

      <section className="container mx-auto px-4 py-6">
        {/* Care Blog / Educational Articles */}
        <h2 className="font-serif text-xl text-center mb-4">Care Articles</h2>
        <div className="space-y-4">
          {blogs.map((b) => (
            <BlogCard key={b.id} title={b.title} desc={b.desc} img={b.img} />
          ))}
        </div>
      </section>

      <section className="py-8 px-4 bg-[#EEF3EE]">
        {/* Plant Care Promise / Brand Trust */}
        <div className="container mx-auto max-w-4xl">
          <h3 className="font-serif text-center text-lg mb-4">Plant Care Promise</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow-sm">
            <PromiseItem icon="📦" title="Care guidance included" desc="Expert care tips shipped with every plant." />
            <PromiseItem icon="🤝" title="Beginner friendly support" desc="We're here to help with any questions." />
            <PromiseItem icon="💚" title="Healthy plant guarantee" desc="Plants are inspected, healthy on dispatch." />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 text-center">
        {/* CTA */}
        <h2 className="font-serif text-xl mb-4">Ready to Start Your Plant Journey?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-3">
          <Link
              href="/collections/succulents"
              className="bg-[var(--color-brand)] text-white px-6 py-3 rounded shadow"
            >
              Shop Collection
            </Link>
          <Link href="/collection/beginner" className="border border-[#8FA68E] px-6 py-3 rounded-xl hover:bg-[#8FA68E] hover:text-white transition">Browse Beginner Collection</Link>
        </div>
      </section>
    </main>
  );
}

/* ---------------- Reusable Components ---------------- */

function CareCard({ icon, title, desc, href }: { icon: string; title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className="font-medium text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-600 mb-3">{desc}</p>
      <div className="inline-block text-sm text-[#577a66]">Learn More</div>
    </Link>
  );
}

function Accordion({ id, title, children, open, onToggle }: { id: string; title: string; children: React.ReactNode; open: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <button aria-expanded={open} aria-controls={id} onClick={onToggle} className="w-full flex justify-between items-center">
        <span className="font-medium text-left">{title}</span>
        <span className={`transform transition ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      {open && <div id={id} className="mt-3 text-sm text-gray-700">{children}</div>}
    </div>
  );
}

function SeasonCard({ title, img }: { title: string; img: string }) {
  return (
    <article className="min-w-[220px] snap-start bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }} />
      <div className="p-3">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-gray-600">Quick tips to adjust for the season.</p>
      </div>
    </article>
  );
}

function BlogCard({ title, desc, img }: { title: string; desc: string; img: string }) {
  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden">
      <img src={img} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm text-gray-600 mb-3">{desc}</p>
        <Link href="#" className="text-sm text-[#577a66]">Read Article →</Link>
      </div>
    </article>
  );
}

function PromiseItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-600">{desc}</div>
      </div>
    </div>
  );
}
