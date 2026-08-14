import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Extensions, loft conversions, kitchens, barn conversions, driveways, bespoke and pre-historic builds. Expert craftsmanship across Axminster and East Devon.",
};

type Service = {
  id: string;
  title: string;
  src: string;
  alt: string;
  paragraphs: string[];
};

const services: Service[] = [
  {
    id: "extensions",
    title: "Extensions",
    src: "/images/extensions.jpg",
    alt: "Timber-clad rear extension",
    paragraphs: [
      "Family expanding? Need a home office? Want more room for activities? Extensions let you live your life on a grander scale: they’re a brilliant option for adding both space and value to your property.",
      "Depending on factors including your existing layout, project goals and regulatory requirements we can offer a range of extension options including front, rear, side, two-storey, wrap-around and over-garage extensions to upgrade your home.",
    ],
  },
  {
    id: "loft-conversions",
    title: "Loft Conversions",
    src: "/images/loft-conversions.jpg",
    alt: "Loft conversion with glass balustrade",
    paragraphs: [
      "Ever wanted a room of requirement in your own house? That’s exactly what your loft conversion can be. Just think what can be done with all that pre-existing space in your property that’s currently housing a few dusty DVDs and ‘antiques’.",
      "Loft conversions make amazing bedrooms, creative studios, entertainment rooms/hangouts or even gyms. The possibilities are almost endless. Whatever you’re picturing right now can be above your head in a matter of months once we’ve prepared your loft to accommodate it.",
    ],
  },
  {
    id: "kitchens",
    title: "Kitchens",
    src: "/images/kitchens.jpg",
    alt: "Fitted kitchen",
    paragraphs: [
      "The heartbeat of a home, the fulcrum of family life, the focal point of a party… your kitchen needs to seamlessly blend style with functionality for you to live your best life.",
      "From layout and storage to aesthetics and lighting, ventilation and safety, we’ll build the optimum kitchen to suit your budget.",
    ],
  },
  {
    id: "barn-conversions",
    title: "Barn Conversions",
    src: "/images/barn-conversions.jpg",
    alt: "Converted barn exterior",
    paragraphs: [
      "Barn conversions combine historical charm and character with a spacious, contemporary living environment. The large open floor plan of your barn offers an inviting blank canvas for you to express total creative freedom and personalise your home.",
      "When working on your barn conversion, we’ll ensure full compliance with the local building regulations and codes related to turning an agricultural building into your home. Key considerations including utility installation, drainage and access will be front of mind for us throughout your project, guaranteeing a smooth construction process.",
    ],
  },
  {
    id: "driveways",
    title: "Driveways",
    src: "/images/driveways.jpg",
    alt: "Block paved driveway",
    paragraphs: [
      "A well kept driveway is like your own personal red carpet, always rolled out to welcome you home. It’s also one of the first spaces that guests will have access to when visiting you, so why not make an impactful first impression?",
      "A new driveway will boost your property’s curb appeal and potentially enhance its resale value. But we’ll go above and beyond aesthetic benefits, reconfiguring the layout if required to build a functional and long-lasting driveway that improves accessibility to your home.",
    ],
  },
  {
    id: "bespoke",
    title: "Bespoke Projects",
    src: "/images/bespoke.jpg",
    alt: "Bespoke build project",
    paragraphs: [
      "Need a job doing that doesn’t fit neatly into the above categories? No problem at all. Whatever the construction requirements of your specific project, we’d relish the opportunity to take them on. After all, the most unique and unusual builds are often the most rewarding ones…",
      "Get in touch with us today to tell us more about what you need and discuss how we can help.",
    ],
  },
  {
    id: "pre-historic",
    title: "Pre-Historic Builds",
    src: "/images/pre-historic.jpg",
    alt: "Pre-historic build restoration",
    paragraphs: [
      "Here at WCS we now specialise in bespoke pre-historic builds. We were contacted in regards to a 15th century building that was left abandoned, and worked with various trades to bring the building back to life.",
      "We can happily say the finished result is fantastic, and hopefully we can land another one similar to this. Pictures soon incoming…",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        subtitle="From repairs and renovations to extensions and remodelling, our expert craftsmanship is second to none."
        active="services"
      />

      <section className="bg-white px-6 pt-[clamp(40px,6vw,80px)] pb-[clamp(48px,7vw,92px)]">
        <div className="container-1200 !px-0 flex flex-col gap-[clamp(40px,5vw,72px)]">
          {services.map((s, i) => {
            const imageRight = i % 2 === 1;
            return (
              <div
                key={s.id}
                id={s.id}
                className="grid scroll-mt-[90px] gap-[clamp(26px,4vw,60px)] min-[900px]:grid-cols-2 min-[900px]:items-center"
              >
                {/* Image is always first in the DOM, so on mobile every row
                    stacks image-above-text. On desktop even rows flip it right. */}
                <div
                  className={`relative aspect-[4/3] w-full bg-img-placeholder ${
                    imageRight ? "min-[900px]:order-2" : ""
                  }`}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="mb-[18px] font-heading text-[clamp(26px,3vw,35px)] font-bold text-navy">
                    {s.title}
                  </h2>
                  {s.paragraphs.map((p, pi) => (
                    <p
                      key={pi}
                      className={`text-[18px] leading-[1.8] text-body ${
                        pi === s.paragraphs.length - 1 ? "mb-[26px]" : "mb-4"
                      }`}
                    >
                      {p}
                    </p>
                  ))}
                  <Button href="/contact" size="sm" className="!px-[26px]">
                    Free quote
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
