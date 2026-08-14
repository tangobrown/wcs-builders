import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import { Footer } from "@/components/Footer";
import "./globals.css";

// Fonts are self-hosted (latin subset) so the build never depends on a
// network fetch to Google Fonts. Poppins ships one file per weight; Public
// Sans is a variable font whose single file covers the whole 400–700 range.
const poppins = localFont({
  src: [
    { path: "./fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["sans-serif"],
});

const publicSans = localFont({
  src: "./fonts/public-sans.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-public-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "WCS Building Services | Domestic building project specialists",
    template: "%s | WCS",
  },
  description:
    "Building services based in Devon – we do extensions, loft conversions, kitchens, barn conversions, driveways and much more. Get in touch for a free quote now.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: site.url,
    images: [{ url: "/images/hero-banner.jpg", width: 1920, height: 1200 }],
  },
  icons: {
    icon: "/logo.png",
  },
};

/** LocalBusiness structured data — helps local search surface the business. */
function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    url: site.url,
    telephone: "+447739084929",
    image: `${site.url}/logo.png`,
    areaServed: site.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Axminster",
      addressRegion: "Devon",
      addressCountry: "GB",
    },
    sameAs: [site.facebook],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${poppins.variable} ${publicSans.variable}`}>
      <body className="overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <main id="main">{children}</main>
        <Footer />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
