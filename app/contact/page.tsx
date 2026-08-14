import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { FacebookIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with WCS Building Services for a free project quote. Call Charley on 07739 084929 or use our contact form.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" active="contact" />

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
    </>
  );
}
