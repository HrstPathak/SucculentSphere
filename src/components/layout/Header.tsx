 "use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CartCountBadge from "./CartCountBadge";
import SearchBar from "../ui/SearchBar";
import MobileDrawer from "./MobileDrawer";
// Inline SVG icons to avoid external dependency during development
import DarkModeToggle from "../ui/DarkModeToggle";
import { color } from "framer-motion";

function MenuIcon({ size = 22, color = "#2B2B2B" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--icon-color, #2B2B2B)" }} />
    </svg>
  );
}
function SearchIcon({ size = 22, color = "#2B2B2B" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 21l-4.35-4.35" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--icon-color, #2B2B2B)" }} />
      <circle cx="11" cy="11" r="6" strokeWidth="1.6" style={{ stroke: "var(--icon-color, #2B2B2B)" }} />
    </svg>
  );
}
function CartIcon({ size = 22, color = "#2B2B2B" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6h15l-1.5 9h-11z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--icon-color, #2B2B2B)" }} />
      <circle cx="9" cy="20" r="1" style={{ fill: "var(--icon-color, #2B2B2B)" }} />
      <circle cx="18" cy="20" r="1" style={{ fill: "var(--icon-color, #2B2B2B)" }} />
    </svg>
  );
}
function UserIcon({ size = 22, color = "#2B2B2B" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--icon-color, #2B2B2B)" }} />
      <circle cx="12" cy="7" r="4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--icon-color, #2B2B2B)" }} />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between" style={{ height: 64 }}>
        <Link href="/" aria-label="Succulent Sphere home" className="flex items-center">
          <span className="hidden md:flex text-lg font-serif text-brand-900" style={{ color: "#002704" }} >Succulent Sphere</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex gap-6 text-sm items-center">
            {[
            { href: "/shop", label: "Shop" },
            { href: "/collections/succulents", label: "Collections" },
            { href: "/plant-care", label: "Plant Care" },
            { href: "/about", label: "About Us" },
            { href: "/contact#contact", label: "Contact" }
          ].map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group inline-flex flex-col items-center gap-1 px-1 py-2 transition-transform transform hover:-translate-y-0.5 focus:-translate-y-0.5`}
                aria-current={active ? "page" : undefined}
              >
                <span className={`text-sm ${active ? "font-semibold text-[var(--color-brand)]" : "text-[var(--color-text)]"}`}>
                  {item.label}
                </span>
                <span
                  className={`block h-0.5 bg-[var(--color-brand)] transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop nav and search */}
        <div className="hidden md:flex items-center gap-4">
            <div className="w-80">
            <SearchBar />
          </div>
          <div className="flex items-center gap-3 ml-4">
            <button
              aria-label="Open search"
              className="p-2 rounded hover:bg-gray-50"
              onClick={() => setMobileSearchOpen(true)}
            >
              <SearchIcon />
            </button>
            <Link href="/cart" className="relative p-2" aria-label="Open cart">
              <CartIcon />
              <CartCountBadge />
            </Link>
            <Link href="/account" className="p-2" aria-label="Account">
              <UserIcon />
            </Link>
            {/* Dark mode toggle */}
            <div className="p-2">
              <DarkModeToggle />
            </div>
          </div>
        </div>

        {/* Mobile header layout */}
        <div className="flex md:hidden items-center w-full justify-between px-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="p-2"
              style={{ padding: 8 }}
            >
              <MenuIcon />
            </button>
            <button
              onClick={() => setMobileSearchOpen(true)}
              aria-label="Open search"
              className="p-2"
              style={{ padding: 8 }}
            >
              <SearchIcon />
            </button>
          </div>

          <div className="text-center flex-1">
            <Link href="/" className="text-lg font-serif" style={{ letterSpacing: "0.6px" }}>
              Succulent Sphere
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative p-2" aria-label="Open cart">
              <CartIcon />
              <CartCountBadge />
            </Link>
            <Link href="/account" className="p-2" aria-label="Account">
              <UserIcon />
            </Link>
          </div>
        </div>
        {/* Desktop end */}
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        {/* Mobile search panel */}
        {mobileSearchOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSearchOpen(false)} />
            <div className="absolute top-0 left-0 right-0 bg-white dark:bg-[#071018] p-4 transform transition-transform duration-300" style={{ transform: "translateY(0)" }}>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1">
                  <SearchBar />
                </div>
                <button className="p-2 flex-shrink-0" aria-label="Close search" onClick={() => setMobileSearchOpen(false)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M18 6L6 18M6 6l12 12" stroke="var(--icon-color, #2B2B2B)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
