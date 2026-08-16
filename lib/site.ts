/** Single source of truth for business details and navigation. */

export const site = {
  name: "WCS Building Services",
  shortName: "WCS",
  url: "https://wcsbuildingservices.co.uk",
  phoneDisplay: "07739 084929",
  phoneHref: "tel:07739084929",
  facebook: "https://www.facebook.com/wcsbuildingservices/",
  servicing: "Axminster, East Devon & surrounding areas",
  areaServed: ["Axminster", "East Devon"],
  copyright: "© 2026 WCS Builders",
} as const;

export type NavItem = { label: string; href: string; key: string };

export const nav: NavItem[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "About WCS", href: "/about", key: "about" },
  { label: "Services", href: "/services", key: "services" },
  { label: "Gallery", href: "/gallery", key: "gallery" },
  { label: "Contact", href: "/contact", key: "contact" },
];
