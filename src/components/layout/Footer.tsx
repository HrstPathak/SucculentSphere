import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white mt-16 border-t">
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-serif mb-2">Succulent Sphere</h3>
          <p className="text-sm">Cultivating beauty, inspiring tranquility.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="text-sm space-y-1">
            <li><Link href="/plant-care">Plant Care Tips</Link></li>
            <li><Link href="/shipping">Shipping Info</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="text-sm space-y-1">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Newsletter</h4>
          <form>
            <label htmlFor="email" className="sr-only">Email</label>
            <input id="email" type="email" placeholder="you@domain.com" className="p-2 border rounded w-full text-sm" />
            <button className="mt-2 bg-[var(--color-brand)] text-white px-4 py-2 rounded text-sm">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="bg-[var(--color-bg)] py-4">
        <div className="container mx-auto px-4 text-sm text-center">
          © {new Date().getFullYear()} Succulent Sphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
