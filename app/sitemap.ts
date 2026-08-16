import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-16");
  const abs = (p: string) => `${site.url}${p}`;

  return [
    {
      url: abs("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [abs("/og.jpg"), abs("/images/hero-banner.jpg")],
    },
    {
      url: abs("/about"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
      images: [abs("/images/team-on-site.jpg")],
    },
    {
      url: abs("/services"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [
        abs("/images/extensions.jpg"),
        abs("/images/loft-conversions.jpg"),
        abs("/images/kitchens.jpg"),
      ],
    },
    {
      url: abs("/gallery"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        abs("/images/barn-after.jpg"),
        abs("/images/ext-lyme-1.jpg"),
        abs("/images/driveway-after.jpg"),
      ],
    },
    {
      url: abs("/contact"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
