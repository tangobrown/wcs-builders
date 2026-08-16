import Image from "next/image";

/** Interior page banner: title, 170px gold rule, optional subtitle. */
export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative bg-navy">
      <Image
        src="/images/page-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_60%]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(95deg, rgba(12,29,61,.82) 0%, rgba(12,29,61,.5) 60%, rgba(12,29,61,.4) 100%)",
        }}
      />
      <div className="relative">
        <div className="container-1200 pb-[clamp(48px,8vw,104px)] pt-[calc(var(--header-h,124px)+clamp(40px,7vw,90px))]">
          <h1 className="font-heading text-[clamp(35px,4.8vw,54px)] font-bold leading-[1.1] text-white">
            {title}
          </h1>
          <div className="gold-rule mt-[18px] w-[170px]" />
          {subtitle && (
            <p className="mt-[22px] max-w-[60ch] text-[clamp(17px,1.4vw,19px)] leading-[1.7] text-white/90">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
