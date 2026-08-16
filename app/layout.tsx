import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import { globalGraph, JsonLd } from "@/lib/seo";
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
    default:
      "WCS Building Services | Builders in Axminster & East Devon",
    template: "%s | WCS Building Services",
  },
  description:
    "Domestic builders in Axminster, East Devon. Extensions, loft & barn conversions, kitchens, driveways and bespoke projects from a trusted father-and-son team. Get a free quote.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "construction",
  keywords: [
    "builders Axminster",
    "builders East Devon",
    "home extensions Devon",
    "loft conversions Devon",
    "barn conversions Devon",
    "kitchen fitters Devon",
    "driveways Axminster",
    "domestic building services",
    "WCS Building Services",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: site.url,
    title: "WCS Building Services | Builders in Axminster & East Devon",
    description:
      "Domestic builders in Axminster, East Devon — extensions, loft & barn conversions, kitchens, driveways and bespoke projects.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WCS Building Services | Builders in Axminster & East Devon",
    description:
      "Domestic builders in Axminster, East Devon — extensions, loft & barn conversions, kitchens, driveways and bespoke projects.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1d3d",
};

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
        <JsonLd data={globalGraph()} />
      </body>
    </html>
  );
}
