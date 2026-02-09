import "../styles/globals.css";
import type { ReactNode } from "react";
import Head from "next/head";
import Header from "../components/layout/Header";
import Providers from "../components/Providers";

export const metadata = {
  title: "Succulent Sphere — Elevate Your Space With Living Art",
  description:
    "Handpicked premium succulents & plant décor. Shop elegant pots, gifting collections, and beginner-friendly plants.",
  openGraph: {
    title: "Succulent Sphere",
    description:
      "Handpicked premium succulents & plant décor. Shop elegant pots, gifting collections, and beginner-friendly plants.",
    url: "https://succulentsphere.com",
    images: ["/og-image.jpg"]
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en"  data-theme="dark">
      <Head>
        {/* Preload fonts (replace with optimized font files or Next/font in next steps) */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#F5F3EF" />
      </Head>
      <body className="bg-[var(--background-color)]">
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
