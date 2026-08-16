import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ZoomImage } from "@/components/ZoomImage";
import { JsonLd, pageGraph, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Recent Work",
  description:
    "See recent WCS projects — barn conversions, extensions and driveways — plus a gallery of brickwork, cladding and porches across Axminster, Lyme Regis and East Devon.",
  path: "/gallery",
});

const categories = [
  {
    title: "Brickwork",
    ruleWidth: 110,
    images: [
      { src: "/images/brickwork-1.jpg", alt: "Brickwork by WCS Building Services in East Devon"},
      { src: "/images/brickwork-2.jpg", alt: "Brickwork by WCS Building Services in East Devon"},
      { src: "/images/brickwork-3.jpg", alt: "Brickwork by WCS Building Services in East Devon"},
    ],
  },
  {
    title: "Cladding",
    ruleWidth: 110,
    images: [
      { src: "/images/cladding-1.jpg", alt: "Timber cladding by WCS Building Services in East Devon" },
      { src: "/images/cladding-2.jpg", alt: "Timber cladding by WCS Building Services in East Devon" },
      { src: "/images/cladding-3.jpg", alt: "Timber cladding by WCS Building Services in East Devon" },
    ],
  },
  {
    title: "Extension",
    ruleWidth: 110,
    images: [
      { src: "/images/extension-cat-1.jpg", alt: "Home extension by WCS Building Services in East Devon" },
      { src: "/images/extension-cat-2.jpg", alt: "Home extension by WCS Building Services in East Devon" },
      { src: "/images/extension-cat-3.jpg", alt: "Home extension by WCS Building Services in East Devon" },
    ],
  },
  {
    title: "Porch & Driveway",
    ruleWidth: 190,
    images: [
      { src: "/images/driveway-cat-1.jpg", alt: "Porch and driveway by WCS Building Services in East Devon" },
      { src: "/images/driveway-cat-2.jpg", alt: "Porch and driveway by WCS Building Services in East Devon" },
      { src: "/images/driveway-cat-3.jpg", alt: "Porch and driveway by WCS Building Services in East Devon" },
    ],
  },
];

function BeforeAfter({
  before,
  after,
}: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
}) {
  return (
    <div className="grid min-w-[280px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[clamp(16px,2vw,24px)] min-[900px]:col-span-2">
      <figure className="m-0">
        <ZoomImage src={before.src} alt={before.alt} aspect="4/3" />
        <figcaption className="mt-[10px] text-center text-[15px] italic text-muted">
          Before
        </figcaption>
      </figure>
      <figure className="m-0">
        <ZoomImage src={after.src} alt={after.alt} aspect="4/3" />
        <figcaption className="mt-[10px] text-center text-[15px] italic text-muted">
          After
        </figcaption>
      </figure>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/gallery",
          type: "ImageGallery",
          name: "Project Gallery — WCS Building Services",
          description:
            "Recent building, conversion and driveway projects across East Devon.",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ],
        })}
      />
      <PageHero title="Gallery" />

      {/* Recent projects */}
      <section className="bg-white px-6 pt-[clamp(44px,6vw,84px)] pb-[clamp(20px,3vw,32px)]">
        <div className="container-1200 !px-0">
          <SectionHeading ruleWidth={150} className="mb-[clamp(32px,4vw,52px)]">
            Recent projects
          </SectionHeading>

          {/* Barn Conversion – Broadclyst */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start gap-[clamp(24px,3.2vw,44px)] pb-[clamp(36px,5vw,60px)]">
            <div>
              <h3 className="mb-[14px] font-heading text-[20px] font-bold text-navy">
                Barn Conversion – Broadclyst
              </h3>
              <p className="text-[18px] leading-[1.8] text-body">
                We transformed this threshing barn on the side of our client’s
                property from a disused garage into a bright and open space for
                them to relax and socialise – putting smiles on faces all round.
              </p>
            </div>
            <BeforeAfter
              before={{ src: "/images/barn-before.jpg", alt: "Barn before conversion" }}
              after={{ src: "/images/barn-after.jpg", alt: "Barn after conversion" }}
            />
          </div>

          {/* Extension – Lyme Regis */}
          <div className="pb-[clamp(36px,5vw,60px)]">
            <h3 className="mb-5 font-heading text-[20px] font-bold text-navy">
              Extension – Lyme Regis
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[clamp(16px,2vw,24px)]">
              <ZoomImage
                src="/images/ext-lyme-1.jpg"
                alt="Lyme Regis extension exterior"
              />
              <ZoomImage
                src="/images/ext-lyme-2.jpg"
                alt="Lyme Regis extension kitchen"
              />
              <ZoomImage
                src="/images/ext-lyme-3.jpg"
                alt="Lyme Regis extension living space"
              />
            </div>
          </div>

          {/* Driveway – Lyme Regis */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start gap-[clamp(24px,3.2vw,44px)] pb-[clamp(40px,6vw,72px)]">
            <div>
              <h3 className="mb-[14px] font-heading text-[20px] font-bold text-navy">
                Driveway – Lyme Regis
              </h3>
              <p className="text-[18px] leading-[1.8] text-body">
                From all over the place to perfectly put together: we turned our
                client’s unsafe, unsightly and cracked concrete driveway into a
                beautiful block paved entrance, providing style and safety for
                many years to come.
              </p>
            </div>
            <BeforeAfter
              before={{ src: "/images/driveway-before.jpg", alt: "Driveway before" }}
              after={{ src: "/images/driveway-after.jpg", alt: "Driveway after" }}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="clip-gallery-categories bg-mist px-6 pt-[clamp(48px,7vw,88px)] pb-[clamp(56px,8vw,100px)]">
        <div className="container-1200 !px-0 flex flex-col gap-[clamp(40px,5vw,68px)]">
          {categories.map((cat) => (
            <div key={cat.title}>
              <SectionHeading
                ruleWidth={cat.ruleWidth}
                className="mb-[26px]"
                headingClassName="!text-[clamp(26px,3.1vw,35px)]"
              >
                {cat.title}
              </SectionHeading>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[clamp(16px,2vw,24px)]">
                {cat.images.map((img, i) => (
                  <ZoomImage key={i} src={img.src} alt={img.alt} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
