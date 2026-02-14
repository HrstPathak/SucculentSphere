"use client";
import Link from "next/link";
import { useEffect } from "react";
import DarkModeToggle from "../ui/DarkModeToggle";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.5" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14.5 8.5h2V5.2h-2.3c-2.5 0-4.2 1.8-4.2 4.4v2.1H8v3.3h2v5h3.4v-5h2.7l.4-3.3h-3.1V10c0-.9.4-1.5 1.1-1.5z" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20.2 12a8.2 8.2 0 01-12.1 7.2L4 20l.9-4A8.2 8.2 0 1112 20.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 8.8c.2-.4.4-.4.6-.4h.6c.2 0 .4.1.5.4l.5 1.4c.1.2 0 .5-.1.7l-.4.5c-.1.2-.1.4 0 .5.3.5.8 1.1 1.5 1.7.6.5 1.2.9 1.7 1.1.2.1.4.1.5 0l.5-.4c.2-.2.5-.2.7-.1l1.4.5c.3.1.4.3.4.5v.6c0 .2 0 .4-.4.6-.3.2-1 .3-1.6.2-1-.2-2.2-.8-3.5-2-1.3-1.1-2.1-2.2-2.5-3.2-.3-.6-.3-1.3-.2-1.6z" fill="currentColor" />
    </svg>
  );
}

function ThreadsIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14.8 10.1c-.2-2-1.7-3.2-4-3.2-2.4 0-4.3 1.8-4.3 4.5v1.4c0 2.8 1.9 4.6 4.7 4.6 2.3 0 4.1-1.3 4.1-3.5 0-1.9-1.3-3-3.8-3H9.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 9.9c1.3.2 2.9 1.1 2.9 3.3 0 2.8-2.3 4.9-5.9 4.9-3.7 0-6.6-2.3-6.6-6.4V11c0-4 2.8-6.3 6.2-6.3 3.6 0 5.8 2.2 5.9 5.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
        className={`fixed top-0 left-0 z-50 h-full w-72 overflow-y-auto bg-white dark:bg-[#071018] transform transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="relative h-full p-4 pb-44">
          <nav className="flex flex-col">
            {[
              { href: "/shop", label: "Shop" },
              { href: "/collections/succulents", label: "Collections" },
              { href: "/plant-care", label: "Plant Care" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" }
            ].map((item) => (
              <Link key={item.href} href={item.href} className="py-4 text-lg border-b border-gray-100 dark:border-gray-700 text-gray-900 dark:text-gray-100" onClick={onClose}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
              <DarkModeToggle />
            </div>
          </div>

          <div className="absolute left-4 right-4 bottom-4 pt-5 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-[#071018]">
            <div className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300">
              <a href="tel:+919458321209" className="hover:text-[var(--color-brand)] transition-colors">
                +91 94583 21209
              </a>
              <a href="mailto:SucculentSphere@gmail.com" className="hover:text-[var(--color-brand)] transition-colors break-all">
                SucculentSphere@gmail.com
              </a>
            </div>

            <div className="mt-4 flex items-center gap-3 text-gray-800 dark:text-gray-100">
              <a
                href="https://www.instagram.com/succulentsphere/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full border border-gray-200 dark:border-gray-600 hover:text-[var(--color-brand)] hover:border-[var(--color-brand)] transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61586867373040"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full border border-gray-200 dark:border-gray-600 hover:text-[var(--color-brand)] hover:border-[var(--color-brand)] transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://wa.me/919458321209?text=Hi%20Succulent%20Sphere,%20I%20need%20help%20regarding%20your%20plants."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2 rounded-full border border-gray-200 dark:border-gray-600 hover:text-[var(--color-brand)] hover:border-[var(--color-brand)] transition-colors"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="https://www.threads.net/@succulentsphere"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Threads"
                className="p-2 rounded-full border border-gray-200 dark:border-gray-600 hover:text-[var(--color-brand)] hover:border-[var(--color-brand)] transition-colors"
              >
                <ThreadsIcon />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
