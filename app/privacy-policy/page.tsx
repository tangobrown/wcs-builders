import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How WCS Building Services collects, uses and protects your personal information.",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />

      <section className="bg-white px-6 pt-[clamp(44px,6vw,88px)] pb-[clamp(56px,8vw,100px)]">
        <div className="container-1200 !px-0">
          <div className="max-w-[76ch]">
            <p className="mb-[30px] font-heading text-[16.5px] font-bold tracking-[0.02em] text-gold">
              Last updated: March 2024
            </p>
            <p className="mb-9 text-[18px] leading-[1.8] text-body">
              WCS Building Services (“us”, “we”, or “our”) operates
              https://wcsbuildingservices.co.uk/ (the “Site”). This page informs
              you of our policies regarding the collection, use and disclosure of
              Personal Information we receive from users of the Site. We use your
              Personal Information only for providing and improving the Site. By
              using the Site, you agree to the collection and use of information
              in accordance with this policy.
            </p>

            <h2 className="mb-[14px] font-heading text-[22px] font-bold text-navy">
              Information collection and use
            </h2>
            <p className="mb-4 text-[18px] leading-[1.8] text-body">
              While using our Site, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you. Personally identifiable information may include, but
              is not limited to your name, email, contact phone number and
              address.
            </p>
            <h3 className="mb-3 font-heading text-[19px] font-bold text-navy">
              Log data
            </h3>
            <p className="mb-9 text-[18px] leading-[1.8] text-body">
              Like many site operators, we collect information that your browser
              sends whenever you visit our Site (“Log Data”). This Log Data may
              include information such as your computer’s Internet Protocol
              (“IP”) address, browser type, browser version, the pages of our
              Site that you visit, the time and date of your visit, the time
              spent on those pages and other statistics. In addition, we may use
              third party services such as Google Analytics that collect, monitor
              and analyse this.
            </p>

            <h2 className="mb-[14px] font-heading text-[22px] font-bold text-navy">
              Communications
            </h2>
            <p className="mb-9 text-[18px] leading-[1.8] text-body">
              We may use your Personal Information to contact you with
              newsletters, marketing or promotional materials and other
              information that keep you up-to-date with our latest offers,
              services and news.
            </p>

            <h2 className="mb-[14px] font-heading text-[22px] font-bold text-navy">
              Cookies
            </h2>
            <p className="mb-9 text-[18px] leading-[1.8] text-body">
              Cookies are files with a small amount of data, which may include an
              anonymous unique identifier. Cookies are sent to your browser from a
              web site and stored on your computer’s hard drive. Like many sites,
              we use cookies to collect information. You can instruct your browser
              to refuse all cookies or to indicate when a cookie is being sent.
              However, if you do not accept cookies, you may not be able to use
              some portions of our Site. To change your cookie preferences, please
              click on the cookie banner in the bottom left hand corner of this
              site.
            </p>

            <h2 className="mb-[14px] font-heading text-[22px] font-bold text-navy">
              Security
            </h2>
            <p className="mb-9 text-[18px] leading-[1.8] text-body">
              The security of your Personal Information is important to us, but
              remember that no method of transmission over the Internet, or method
              of electronic storage, is 100% secure. While we strive to use
              commercially acceptable means to protect your Personal Information,
              we cannot guarantee its absolute security.
            </p>

            <h2 className="mb-[14px] font-heading text-[22px] font-bold text-navy">
              Changes to this privacy policy
            </h2>
            <p className="mb-9 text-[18px] leading-[1.8] text-body">
              This Privacy Policy is effective as of 1 March 2024 and will remain
              in effect except with respect to any changes in its provisions in
              the future, which will be in effect immediately after being posted
              on this page. We reserve the right to update or change our Privacy
              Policy at any time and you should check this Privacy Policy
              periodically. Your continued use of the Service after we post any
              modifications to the Privacy Policy on this page will constitute
              your acknowledgment of the modifications and your consent to abide
              and be bound by the modified Privacy Policy. If we make any material
              changes to this Privacy Policy, we will notify you either through the
              email address you have provided us, or by placing a prominent notice
              on our website.
            </p>

            <h2 className="mb-[14px] font-heading text-[22px] font-bold text-navy">
              Contact us
            </h2>
            <p className="text-[18px] leading-[1.8] text-body">
              If you have any questions about this Privacy Policy, please{" "}
              <Link
                href="/contact"
                className="text-gold transition-colors hover:text-gold-deep"
              >
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
