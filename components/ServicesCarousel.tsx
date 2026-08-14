"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

type Card = { label: string; href: string; src: string };

const CARDS: Card[] = [
  { label: "Extensions", href: "/services#extensions", src: "/images/extensions.jpg" },
  {
    label: "Loft Conversions",
    href: "/services#loft-conversions",
    src: "/images/loft-conversions.jpg",
  },
  { label: "Kitchens", href: "/services#kitchens", src: "/images/kitchens.jpg" },
  {
    label: "Barn Conversions",
    href: "/services#barn-conversions",
    src: "/images/barn-conversions.jpg",
  },
  { label: "Driveways", href: "/services#driveways", src: "/images/driveways.jpg" },
  { label: "Bespoke Projects", href: "/services#bespoke", src: "/images/bespoke.jpg" },
];

const GAP = 28;
const TOTAL = CARDS.length;

function perView(width: number) {
  return width < 640 ? 1 : width < 1000 ? 2 : 3;
}

export function ServicesCarousel() {
  const [index, setIndex] = useState(0);
  const [per, setPer] = useState(3);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const max = Math.max(0, TOTAL - per);
  const clamped = Math.min(index, max);

  // Track viewport for cards-per-view; reset index on breakpoint change.
  useEffect(() => {
    const update = () => {
      setPer((prev) => {
        const next = perView(window.innerWidth);
        if (next !== prev) setIndex(0);
        return next;
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Respect reduced-motion preference (disables auto-advance).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // Auto-advance one card every 3s, looping. Paused on hover/focus.
  useEffect(() => {
    if (paused || reduced) return;
    const timer = setInterval(() => {
      setIndex((i) => (i >= max ? 0 : i + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [paused, reduced, max]);

  const go = useCallback(
    (n: number) => setIndex(Math.max(0, Math.min(max, n))),
    [max],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(clamped + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  const basis = `calc((100% - ${(per - 1) * GAP}px) / ${per})`;
  const shift = `translateX(calc(-1 * ${clamped} * ((100% + ${GAP}px) / ${per})))`;
  const dotCount = max + 1;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Our services"
      >
        <div
          className="flex ease-carousel"
          style={{
            gap: `${GAP}px`,
            transform: shift,
            transitionProperty: "transform",
            transitionDuration: reduced ? "0ms" : "450ms",
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {CARDS.map((card, i) => {
            const visible = i >= clamped && i < clamped + per;
            return (
              <Link
                key={card.label}
                href={card.href}
                aria-hidden={!visible}
                tabIndex={visible ? undefined : -1}
                className="group flex-none bg-white p-[10px] text-navy transition-colors duration-[250ms] hover:bg-navy focus-visible:bg-navy"
                style={{ flexBasis: basis }}
              >
                <div className="relative aspect-[4/3] w-full bg-img-placeholder">
                  <Image
                    src={card.src}
                    alt={card.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="my-3 mt-4 text-center font-heading text-[19px] font-bold text-navy transition-colors duration-[250ms] group-hover:text-gold group-focus-visible:text-gold">
                  {card.label}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-[clamp(26px,3.2vw,40px)] flex items-center justify-center gap-[18px]">
        <button
          type="button"
          onClick={() => go(clamped - 1)}
          aria-label="Previous services"
          className="flex h-[46px] w-[46px] items-center justify-center border-2 border-navy text-navy transition-colors hover:bg-navy hover:text-white"
        >
          <ChevronLeftIcon className="h-[18px] w-[18px]" />
        </button>
        <div className="flex items-center gap-[9px]">
          {Array.from({ length: dotCount }, (_, n) => (
            <button
              key={n}
              type="button"
              onClick={() => go(n)}
              aria-label={`Go to slide ${n + 1}`}
              aria-current={n === clamped ? "true" : undefined}
              className="flex h-[24px] w-[24px] items-center justify-center"
            >
              <span
                className="block h-[10px] w-[10px] rounded-full"
                style={{
                  background: n === clamped ? "#bd8f13" : "rgba(12,29,61,.24)",
                }}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(clamped + 1)}
          aria-label="Next services"
          className="flex h-[46px] w-[46px] items-center justify-center border-2 border-navy text-navy transition-colors hover:bg-navy hover:text-white"
        >
          <ChevronRightIcon className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}
