import Image from "next/image";
import { Button } from "@/components/Button";
import { HomeHero } from "@/components/HomeHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServicesCarousel } from "@/components/ServicesCarousel";

const whyChoose: { title: string; body: React.ReactNode }[] = [
  {
    title: "Peace of mind",
    body: "At WCS, all of our projects run smoothly – just ask our previous clients. We’re also fully insured, so you can rest assured you’re in good hands.",
  },
  {
    title: "Value for money",
    body: "We do exceptional work for a fair price, so you’ll have room in your budget to show off your new-look home to friends and family with celebratory drinks once your project is complete.",
  },
  {
    title: "Super easy",
    body: "Dealing with multiple contractors is a headache you can do without. We’re versatile enough to handle almost any construction related task. Make one call to us, and your work is done.",
  },
  {
    title: "A tidy finish (and not just the end result)",
    body: "We work on building sites, not bomb sites. It’s a point of pride that we leave your property immaculate at the end of each working day.",
  },
  {
    title: "Set your watch by us",
    body: "We’ll be on site, on time and on schedule as agreed, to complete your project as quickly as possible.",
  },
  {
    title: "Minimal construction disruption",
    body: "No need to put your life on hold – we go out of our way to ensure that your daily routine can continue as usual.",
  },
  {
    title: "Stay on next-door’s Christmas card list",
    body: (
      <>
        We’ll minimise disruption for you <strong>and</strong> your neighbours.
      </>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Intro */}
      <section className="bg-white px-6 pt-[clamp(48px,7vw,90px)] pb-[clamp(56px,8vw,100px)]">
        <div className="container-1200 !px-0 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(32px,5vw,72px)]">
          <div>
            <h2 className="mb-[22px] max-w-[20ch] font-heading text-[clamp(29px,3.5vw,40px)] font-bold leading-[1.2] text-navy">
              Domestic building project specialists
            </h2>
            <p className="mb-[18px] text-[18px] leading-[1.8] text-body">
              You’ve pictured exactly how your home should look many times in
              your mind’s eye. With over 40 years of experience in construction,
              we have the expertise to bring your vision to life.
            </p>
            <p className="mb-[18px] text-[18px] leading-[1.8] text-body">
              We’re a father &amp; son team with a standout reputation, based in
              Axminster and covering the surrounding areas.
            </p>
            <p className="mb-[30px] text-[18px] leading-[1.8] text-body">
              Book a free consultation with us today to discuss your specific
              requirements and find out more about how we can help to make your
              house the perfect home.
            </p>
            <Button href="/contact" size="sm">
              Book my free consultation
            </Button>
          </div>
          <div className="w-full max-w-[420px] justify-self-center bg-white p-[14px] shadow-frame-strong">
            <div className="relative aspect-[4/5] w-full bg-img-placeholder">
              <Image
                src="/images/home-intro.jpg"
                alt="A WCS Building Services project"
                fill
                sizes="(max-width: 900px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Services carousel */}
      <section className="clip-home-services bg-mist px-6 pt-[clamp(56px,8vw,104px)] pb-[clamp(64px,9vw,120px)]">
        <div className="container-1200 !px-0">
          <SectionHeading ruleWidth={120} className="mb-[clamp(34px,4vw,54px)]">
            Our Services
          </SectionHeading>
          <ServicesCarousel />
          <div className="mt-[clamp(28px,3.6vw,44px)] text-center">
            <Button href="/services" size="sm">
              And more…
            </Button>
          </div>
        </div>
      </section>

      {/* Why choose WCS? */}
      <section className="bg-white px-6 py-[clamp(56px,8vw,100px)]">
        <div className="container-1200 !px-0">
          <SectionHeading ruleWidth={150} className="mb-[clamp(34px,4vw,52px)]">
            Why choose WCS?
          </SectionHeading>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(28px,4vw,64px)]">
            {[whyChoose.slice(0, 3), whyChoose.slice(3)].map((column, ci) => (
              <div key={ci} className="flex flex-col gap-[30px]">
                {column.map((item) => (
                  <div key={item.title}>
                    <h3 className="mb-[10px] font-heading text-[20px] font-bold text-navy">
                      {item.title}
                    </h3>
                    <p className="text-[18px] leading-[1.8] text-body">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
