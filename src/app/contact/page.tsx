import Link from "next/link";
import TrustBar from "../../components/TrustBar";
import ContactFormClient from "../../components/contact/ContactFormClient";

export default function ContactPage() {

  const whatsappLink =
    "https://wa.me/919458321209?text=Hi%20Succulent%20Sphere,%20I%20need%20help%20regarding%20your%20plants.";

  return (
    <main id="contact" className="min-h-screen bg-[var(--color-bg)]">
      <section className="container mx-auto px-4 py-8 md:py-15 pt-24 lg:py-16">

        {/* HERO WITH OVERLAY */}
        <div className="relative max-w-3xl mx-auto mb-8">

          <div className="rounded overflow-hidden shadow-sm">
            <div className="relative h-56 md:h-72 bg-[url('/images/contact-hero.jpg')] bg-center bg-cover" />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-black/20">
              <h1 className="text-2xl md:text-4xl font-serif text-white mb-2">
                Get in Touch
              </h1>
              <p className="text-sm md:text-base text-white/90 max-w-md">
                We're here to help with any questions, comments, or support you need.
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT OPTIONS */}
        <div className="max-w-3xl mx-auto space-y-3">

          {/* WhatsApp Chat */}
          <a
            href={whatsappLink}
            target="_blank"
            className="block bg-white rounded-lg p-4 shadow-sm flex items-start justify-between"
          >
            <div>
              <div className="text-base font-medium">Chat with Us</div>
              <div className="text-xs text-muted">
                Quick WhatsApp support
              </div>
            </div>
            <div className="text-muted">›</div>
          </a>

          {/* Email */}
          <a
            href="mailto:SucculentSphere@gmail.com"
            className="block bg-white rounded-lg p-4 shadow-sm flex items-start justify-between"
          >
            <div>
              <div className="text-base font-medium">Email Us</div>
              <div className="text-xs text-muted">
                SucculentSphere@gmail.com
              </div>
            </div>
            <div className="text-muted">›</div>
          </a>

          {/* Call */}
          <a
            href="tel:+919458321209"
            className="block bg-white rounded-lg p-4 shadow-sm flex items-start justify-between"
          >
            <div>
              <div className="text-base font-medium">Call Us</div>
              <div className="text-xs text-muted">
                +91 94583 21209
              </div>
            </div>
            <div className="text-muted">›</div>
          </a>

        </div>

        {/* SEND MESSAGE BUTTON (WhatsApp) */}
        <div className="text-center mt-6">
          <a
            href={whatsappLink}
            target="_blank"
            className="inline-block bg-[var(--color-brand)] text-white px-6 py-3 rounded shadow-sm"
          >
            Send a Message
          </a>
        </div>

        {/* SOCIAL */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <a
            href="https://www.instagram.com/succulentsphere/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2 rounded-full bg-white shadow hover:shadow-md transition"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-[#577a66]" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="3.2" />
              <circle cx="17.5" cy="6.5" r="1" />
            </svg>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61586867373040"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-2 rounded-full bg-white shadow hover:shadow-md transition"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#577a66]" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12H20l-1.5 3.9h-2.5v7A10 10 0 0022 12z" />
            </svg>
          </a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="p-2 rounded-full bg-white shadow hover:shadow-md transition"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#25D366]" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M20.5 3.5A11 11 0 0012 1a11 11 0 00-9.8 6.9A11 11 0 0012 23a11 11 0 008.5-20.3zM12 21c-1.8 0-3.5-.5-5-1.4l-3.1.8.8-3.1A9 9 0 113 12a9 9 0 009 9zm4.1-6.9c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.6.1-.2.2-.8.7-1 1-.2.2-.4.3-.7.1-.3-.2-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.7.1-.1.2-.4.3-.6.1-.2 0-.4-.1-.5-.1-.1-1.4-3-1.9-4.1-.5-1-.9-.9-1.3-.9-.3 0-.6 0-.9 0-.3 0-.6.1-.9.4s-1.2 1.3-1.2 3.1c0 1.8 1.3 3.6 1.5 3.9.2.4 2.6 4 6.4 5.5 3 .9 3.3.6 3.9.5.6-.1 1.5-.6 1.7-1.2.2-.6.2-1 .2-1.2 0-.2-.2-.3-.4-.4z" />
            </svg>
          </a>

          <a
            href="https://www.threads.net/@succulentsphere"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Threads"
            className="p-2 rounded-full bg-white shadow hover:shadow-md transition"
          >
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-5 h-5 text-[#525252]">
              <path d="M32 4C19.85 4 10 13.85 10 26c0 12.15 13 24 22 32 9-8 22-19.85 22-32C54 13.85 44.15 4 32 4zm0 12a6 6 0 110 12 6 6 0 010-12z" fill="currentColor" />
              <path d="M32 28a10 10 0 00-7 3.1c1.2 0 2.6-.3 4-.9 2.4-1 3.9-2.2 3.9-4.2 0-.2 0-.4-.1-.6z" fill="#ffffff" opacity="0" />
            </svg>
          </a>
        </div>

        <TrustBar />

        {/* CONTACT FORM (client) */}
        <ContactFormClient />

      </section>
    </main>
  );
}
