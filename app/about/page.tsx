import Image from "next/image";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { PhoneIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { JsonLd, pageGraph, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Meet WCS Building Services — a father-and-son building team, Will and Charley Skilton, based in Axminster with 40+ years' experience across East Devon.",
  path: "/about",
});

const directors = [
  {
    name: "William Skilton",
    src: "/images/will-portrait.jpg",
    bio: "Hi, I’m William – I’m a partner at WCS and the brains behind the projects. I specialise in on-site perfection, and making sure your job is completed to the highest standard possible. I run on tea and biscuits, so please keep them topped up.",
  },
  {
    name: "Charley Skilton",
    src: "/images/charley-portrait.jpg",
    bio: "Hi there, I’m Charley – I’m a partner and “The Boss” at WCS. My speciality is customer service, making sure all the ins and outs of your project are completed to the highest standard and on time. I love my football, specifically Arsenal F.C. and the mighty Beer Albion (please don’t tell me you support Tottenham)!",
  },
];

const steps = [
  {
    n: "Step 1:",
    body: "Give us a call or use our contact form to get in touch. We’ll ask for some key info about your project and get back to you with a free estimate within 5 working days.",
  },
  {
    n: "Step 2:",
    body: "If you decide to move ahead, we’ll arrange a site visit at a convenient time. We’ll then follow up with a final discussion before starting work to book your project in and confirm purchase of materials.",
  },
  {
    n: "Step 3:",
    body: "We’ll get to work on the agreed project start date and will liaise with you throughout the construction process, keeping you up to date with all of our progress.",
  },
  {
    n: "Step 4:",
    body: "Job done! You start to enjoy your new-look home, and we’ll check in with you after a few days to make sure everything’s perfect.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/about",
          type: "AboutPage",
          name: "About WCS Building Services",
          description:
            "A father-and-son domestic building team based in Axminster, East Devon.",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ],
        })}
      />
      <PageHero title="About WCS" active="about" />

      {/* Intro */}
      <section className="clip-about-intro bg-mist px-6 pt-[clamp(48px,7vw,92px)] pb-[clamp(56px,8vw,104px)]">
        <div className="container-1200 !px-0 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(32px,5vw,72px)]">
          <div>
            <h2 className="mb-[22px] font-heading text-[clamp(29px,3.5vw,40px)] font-bold leading-[1.2] text-navy">
              Your local community builders
            </h2>
            <p className="mb-[18px] text-[18px] leading-[1.8] text-body">
              Hi there, Will and Charley here! Thanks for taking the time to find
              out a bit more about our business. We’re a dynamic building duo – a
              father &amp; son construction team with complementary skill sets.
            </p>
            <p className="mb-[18px] text-[18px] leading-[1.8] text-body">
              Will brings his technical mastery and expert craftsmanship to the
              table, accrued over 40+ years in the industry. Charley provides
              top-notch project management skills, along with unparallelled
              energy and enthusiasm.
            </p>
            <p className="text-[18px] leading-[1.8] text-body">
              We founded WCS Building Services over two years ago, and we’ve never
              looked back. We see ourselves as being very much part of the local
              community, which is why meeting new people and helping them to
              realise their dream homes is our favourite part of the job.
            </p>
          </div>
          <div className="w-full max-w-[420px] justify-self-center bg-white p-[14px] shadow-frame">
            <div className="relative aspect-square w-full bg-img-placeholder">
              <Image
                src="/images/team-on-site.jpg"
                alt="The WCS team on site"
                fill
                sizes="(max-width: 900px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the directors */}
      <section className="bg-white px-6 py-[clamp(52px,7vw,96px)]">
        <div className="container-1200 !px-0">
          <SectionHeading ruleWidth={150} className="mb-[clamp(34px,4vw,52px)]">
            Meet the directors
          </SectionHeading>
          {directors.map((d, i) => (
            <div
              key={d.name}
              className={`grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(24px,3vw,44px)] border-b border-hairline ${
                i === 0
                  ? "pb-[clamp(32px,4vw,44px)]"
                  : "py-[clamp(32px,4vw,44px)]"
              }`}
            >
              <div className="relative aspect-[3/4] w-full max-w-[260px] bg-img-placeholder">
                <Image
                  src={d.src}
                  alt={d.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 260px"
                  className="object-cover"
                />
              </div>
              <div className="col-span-2 min-w-[260px]">
                <h3 className="mb-[6px] font-heading text-[22px] font-bold text-navy">
                  {d.name}
                </h3>
                <p className="mb-[18px] text-[16.5px] italic text-muted">
                  Director – WCS Building Services
                </p>
                <p className="mb-5 text-[18px] leading-[1.8] text-body">{d.bio}</p>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-[9px] font-heading text-[18px] font-bold text-gold transition-colors hover:text-navy"
                >
                  <PhoneIcon className="h-[15px] w-[15px]" />
                  {site.phoneDisplay}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white px-6 pt-[clamp(40px,6vw,80px)] pb-[clamp(56px,8vw,100px)]">
        <div className="container-1200 !px-0">
          <SectionHeading
            ruleWidth={220}
            className="mb-[clamp(32px,4vw,50px)]"
            headingClassName="!text-[clamp(27px,3.5vw,40px)]"
          >
            Getting started is as easy as 1, 2, 3, 4…
          </SectionHeading>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[clamp(24px,3vw,40px)]">
            {steps.map((s) => (
              <div key={s.n}>
                <h3 className="mb-3 font-heading text-[21px] font-bold text-navy">
                  {s.n}
                </h3>
                <p className="text-[18px] leading-[1.8] text-body">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-[clamp(36px,4.5vw,56px)] text-center">
            <Button href="/contact">Get started</Button>
          </div>
        </div>
      </section>
    </>
  );
}
