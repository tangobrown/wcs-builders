import type { Metadata } from "next";
import { site } from "./site";

/**
 * Central SEO helpers: canonical/OpenGraph metadata builders and JSON-LD
 * structured data. The structured data is designed for both classic search
 * rich results and AI / answer engines that ground responses on schema.org
 * entities linked by @id.
 */

const BASE = site.url;
export const BUSINESS_ID = `${BASE}/#business`;
export const WEBSITE_ID = `${BASE}/#website`;

const BUSINESS_DESCRIPTION =
  "WCS Building Services is a father-and-son domestic building firm based in " +
  "Axminster, East Devon. We build extensions, loft and barn conversions, " +
  "kitchens, driveways, bespoke and heritage projects across East Devon.";

/** The services WCS offers, reused for on-page content and structured data. */
export const services = [
  {
    name: "Extensions",
    slug: "extensions",
    description:
      "Front, rear, side, two-storey, wrap-around and over-garage extensions that add space and value.",
  },
  {
    name: "Loft Conversions",
    slug: "loft-conversions",
    description:
      "Loft conversions creating bedrooms, studios, home offices, hangouts and gyms.",
  },
  {
    name: "Kitchens",
    slug: "kitchens",
    description:
      "Kitchen design and fitting that balances style, storage, lighting and functionality.",
  },
  {
    name: "Barn Conversions",
    slug: "barn-conversions",
    description:
      "Barn conversions turning agricultural buildings into homes, fully compliant with building regulations.",
  },
  {
    name: "Driveways",
    slug: "driveways",
    description:
      "New and reconfigured driveways, including block paving, for kerb appeal and accessibility.",
  },
  {
    name: "Bespoke Projects",
    slug: "bespoke",
    description:
      "Bespoke building projects that don't fit standard categories — unusual and one-off builds.",
  },
  {
    name: "Pre-Historic Builds",
    slug: "pre-historic",
    description:
      "Restoration of historic and heritage buildings, working with specialist trades.",
  },
] as const;

/** The primary business entity (LocalBusiness / GeneralContractor). */
export function businessNode() {
  return {
    "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
    "@id": BUSINESS_ID,
    name: site.name,
    alternateName: "WCS Builders",
    url: BASE,
    telephone: "+447739084929",
    image: `${BASE}/og.jpg`,
    logo: `${BASE}/logo.png`,
    description: BUSINESS_DESCRIPTION,
    slogan: "We'll make your dream home a reality, hassle-free",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Axminster",
      addressRegion: "Devon",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.7817,
      longitude: -2.9967,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "East Devon" },
      { "@type": "City", name: "Axminster" },
      { "@type": "City", name: "Lyme Regis" },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 50.7817,
        longitude: -2.9967,
      },
      geoRadius: "40000",
    },
    knowsAbout: [
      "Home extensions",
      "Loft conversions",
      "Kitchen fitting",
      "Barn conversions",
      "Driveways and block paving",
      "Bespoke building projects",
      "Heritage building restoration",
    ],
    founder: [
      { "@type": "Person", name: "William Skilton", jobTitle: "Director" },
      { "@type": "Person", name: "Charley Skilton", jobTitle: "Director" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+447739084929",
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: "English",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Building services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          url: `${BASE}/services#${s.slug}`,
          serviceType: s.name,
          provider: { "@id": BUSINESS_ID },
          areaServed: { "@type": "AdministrativeArea", name: "East Devon" },
        },
      })),
    },
    sameAs: [site.facebook],
  };
}

/** The website entity. */
export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: BASE,
    name: site.name,
    inLanguage: "en-GB",
    publisher: { "@id": BUSINESS_ID },
  };
}

/** Global graph rendered once (in the root layout) on every page. */
export function globalGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [businessNode(), websiteNode()],
  };
}

type Crumb = { name: string; path: string };

function breadcrumbNode(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE}${c.path === "/" ? "" : c.path}`,
    })),
  };
}

/**
 * Per-page graph: a WebPage (or subtype) node linked to the site + business,
 * a breadcrumb trail, and any extra nodes (Service list, FAQ, etc.).
 */
export function pageGraph({
  path,
  name,
  description,
  type = "WebPage",
  crumbs,
  extra = [],
}: {
  path: string;
  name: string;
  description: string;
  type?: string;
  crumbs: Crumb[];
  extra?: object[];
}) {
  const url = `${BASE}${path === "/" ? "" : path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "en-GB",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": BUSINESS_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      { "@id": `${url}#breadcrumb`, ...breadcrumbNode(crumbs) },
      ...extra,
    ],
  };
}

/** FAQPage node built from grounded question/answer pairs. */
export function faqNode(qa: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** ItemList of services, for the Services page. */
export function servicesListNode() {
  return {
    "@type": "ItemList",
    name: "Building services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        url: `${BASE}/services#${s.slug}`,
        serviceType: s.name,
        provider: { "@id": BUSINESS_ID },
        areaServed: { "@type": "AdministrativeArea", name: "East Devon" },
      },
    })),
  };
}

/** Build page Metadata with canonical + OpenGraph + Twitter in one place. */
export function pageMetadata({
  title,
  description,
  path,
  image = "/og.jpg",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const ogTitle = `${title} | WCS Building Services`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      type: "website",
      siteName: site.name,
      locale: "en_GB",
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
  };
}

/** Inline JSON-LD script. Data is our own trusted content. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
