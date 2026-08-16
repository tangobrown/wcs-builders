import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { FacebookIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { faqNode, JsonLd, pageGraph, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us — Free Quotes",
  description:
    "Get a free building quote from WCS Building Services in Axminster, East Devon. Call or text Charley on 07739 084929 or send us a message.",
  path: "/contact",
});

// Grounded in copy already published across the site.
const faqs = [
  {
    q: "Which areas do you cover?",
    a: "We're based in Axminster and cover East Devon and the surrounding areas, including Lyme Regis.",
  },
  {
    q: "Do you offer free quotes?",
    a: "Yes. Get in touch and we'll come back to you with a free, no-obligation estimate — usually within 5 working days.",
  },
  {
    q: "What kind of building work do you do?",
    a: "Extensions, loft and barn conversions, kitchens, driveways, bespoke projects and heritage (pre-historic) builds.",
  },
  {
    q: "Are you insured?",
    a: "Yes — WCS Building Services is fully insured, so you're in safe hands from start to finish.",
  },
  {
    q: "Who are WCS Building Services?",
    a: "A father-and-son team, Will and Charley Skilton, with over 40 years of experience in construction.",
  },
  {
    q: "How do I get started?",
    a: "Call or text Charley on 07739 084929, or send a message using the contact form — we'll get back to you, usually within one working day.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/contact",
          type: "ContactPage",
          name: "Contact WCS Building Services",
          description:
            "Contact WCS Building Services in Axminster, East Devon for a free building quote.",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ],
          extra: [faqNode(faqs.map(({ q, a }) => ({ q, a })))],
        })}
      />
      <PageHero title="Contact" />

      <section className="bg-white px-6 pt-[clamp(44px,6vw,88px)] pb-[clamp(56px,8vw,100px)]">
        <div className="container-1200 !px-0 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(36px,5vw,80px)]">
          {/* Get in touch */}
          <div>
            <h2 className="mb-[22px] font-heading text-[clamp(29px,3.5vw,40px)] font-bold text-navy">
              Get in touch
            </h2>
            <p className="mb-[30px] max-w-[44ch] text-[18px] leading-[1.8] text-body">
              Need to clarify something? Looking for a free project quote? Call
              Charley on the number below or use the contact form and we’ll get
              back to you ASAP.
            </p>
            <div className="flex flex-col gap-[18px]">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-[11px] font-heading text-[19px] font-semibold text-navy transition-colors hover:text-gold"
              >
                <PhoneIcon className="h-[17px] w-[17px] text-gold" />
                {site.phoneDisplay}
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[11px] font-heading text-[19px] font-semibold text-navy transition-colors hover:text-gold"
              >
                <FacebookIcon className="h-[17px] w-[17px] text-gold" />
                Facebook
              </a>
            </div>
            <div className="mt-9 border-l-[3px] border-gold pl-5">
              <p className="text-[16.5px] leading-[1.7] text-body">
                <strong className="font-heading text-navy">Servicing</strong>
                <br />
                {site.servicing}
              </p>
            </div>
          </div>

          {/* Send message */}
          <div>
            <h2 className="mb-[26px] font-heading text-[clamp(29px,3.5vw,40px)] font-bold text-navy">
              Send message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mist px-6 py-[clamp(48px,7vw,88px)]">
        <div className="container-1200 !px-0">
          <SectionHeading ruleWidth={150} className="mb-[clamp(28px,4vw,44px)]">
            Frequently asked questions
          </SectionHeading>
          <dl className="max-w-[820px]">
            {faqs.map((item, i) => (
              <div
                key={item.q}
                className={`py-6 ${i > 0 ? "border-t border-hairline" : ""}`}
              >
                <dt className="mb-[10px] font-heading text-[20px] font-bold text-navy">
                  {item.q}
                </dt>
                <dd className="text-[18px] leading-[1.8] text-body">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
