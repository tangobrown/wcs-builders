import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Button } from "./Button";
import { FacebookIcon, PhoneIcon } from "./icons";

/** CTA band + four-column footer, on every page. */
export function Footer() {
  return (
    <footer className="footer-dots px-6 pb-10 pt-16">
      <div className="container-1200 !px-0">
        {/* CTA band */}
        <div className="pb-14 text-center">
          <h2 className="font-heading text-[clamp(22px,2.6vw,29px)] font-bold text-white">
            Let us do your home-work
          </h2>
          <p className="mb-[26px] mt-3 text-[18px] text-white/[0.82]">
            Get a free quote for your next project with WCS
          </p>
          <Button href="/contact">Get my free quote</Button>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] items-start gap-8 pt-3">
          <Image
            src="/logo.png"
            alt={site.name}
            width={150}
            height={78}
            className="h-auto w-[150px]"
          />
          <div className="border-l-2 border-gold pl-5 text-[16.5px] leading-[1.7] text-white/[0.86]">
            Servicing:
            <br />
            {site.servicing}
          </div>
          <div className="flex flex-col gap-[14px] border-l-2 border-gold pl-5">
            <a
              href={site.phoneHref}
              className="flex items-center gap-[10px] text-[16.5px] text-white transition-colors hover:text-gold"
            >
              <PhoneIcon className="h-[15px] w-[15px]" />
              {site.phoneDisplay}
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[10px] text-[16.5px] text-white transition-colors hover:text-gold"
            >
              <FacebookIcon className="h-[15px] w-[15px]" />
              Facebook
            </a>
          </div>
          <div className="flex flex-col gap-3 border-l-2 border-gold pl-5">
            <Link
              href="/contact"
              className="text-[16.5px] text-white transition-colors hover:text-gold"
            >
              Contact Us
            </Link>
            <Link
              href="/gallery"
              className="text-[16.5px] text-white transition-colors hover:text-gold"
            >
              Gallery
            </Link>
            <Link
              href="/privacy-policy"
              className="text-[16.5px] text-white transition-colors hover:text-gold"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <p className="mt-16 text-center text-[14px] text-white/60">
          {site.copyright}
        </p>
      </div>
    </footer>
  );
}
