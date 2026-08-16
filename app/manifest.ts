import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "WCS",
    description:
      "Domestic builders in Axminster, East Devon — extensions, conversions, kitchens and driveways.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c1d3d",
    theme_color: "#0c1d3d",
    icons: [{ src: "/logo.png", sizes: "any", type: "image/png" }],
  };
}
