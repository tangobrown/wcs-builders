import Image from "next/image";
import { Button } from "./Button";
import { SiteHeader } from "./SiteHeader";

/**
 * Home hero — full-bleed photo, navy gradient overlay, angled bottom edge.
 * Holds the top bar + header, then the headline, sub-paragraph and CTA.
 */
export function HomeHero() {
  return (
    <section className="clip-home-hero relative bg-navy">
      <Image
        src="/images/hero-banner.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(12,29,61,.86) 0%, rgba(12,29,61,.58) 55%, rgba(12,29,61,.42) 100%)",
        }}
      />
      <div className="relative">
        <SiteHeader active="home" />
        <div className="container-1200 pt-[clamp(48px,9vw,120px)] pb-[clamp(110px,14vw,190px)]">
          <h1
            className="max-w-[24ch] font-heading text-[clamp(35px,5.4vw,56px)] font-bold leading-[1.14] text-white"
            style={{ textWrap: "balance" }}
          >
            We&rsquo;ll make your dream home a reality, hassle-free
          </h1>
          <p className="mt-[22px] mb-[34px] max-w-[46ch] text-[clamp(17px,1.4vw,19px)] leading-[1.6] text-white/90">
            Building services based in Devon &ndash; we do loft and barn
            conversions, extensions, kitchens, driveways and much more.
          </p>
          <Button href="/gallery">Show me</Button>
        </div>
      </div>
    </section>
  );
}
