"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
        onClick={onClose}
        style={{ background: "rgba(0,0,0,0.4)" }}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white transform transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-4">
          <nav className="flex flex-col">
            {[
              { href: "/shop", label: "Shop" },
              { href: "/collections/succulents", label: "Collections" },
              { href: "/plant-care", label: "Plant Care" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" }
            ].map((item) => (
              <Link key={item.href} href={item.href} className="py-4 text-lg border-b border-gray-100" onClick={onClose}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

