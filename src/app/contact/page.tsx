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
        <div className="flex items-center justify-center gap-4 mt-4 text-xl text-muted">
          <a href="#" aria-label="Instagram">📷</a>
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Pinterest">P</a>
          <a href="#" aria-label="Twitter">t</a>
        </div>

        <TrustBar />

        {/* CONTACT FORM (client) */}
        <ContactFormClient />

      </section>
    </main>
  );
}
