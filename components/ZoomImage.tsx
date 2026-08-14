"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "./icons";

/**
 * A gallery image tile that opens in a lightbox on tap/click.
 * Escape and backdrop click close it; focus returns to the trigger.
 */
export function ZoomImage({
  src,
  alt,
  aspect = "1/1",
  sizes = "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw",
  priority = false,
}: {
  src: string;
  alt: string;
  aspect?: "1/1" | "4/3";
  sizes?: string;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View image: ${alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden bg-img-placeholder"
        style={{ aspectRatio: aspect === "4/3" ? "4 / 3" : "1 / 1" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={priority ? undefined : "lazy"}
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-4"
          onClick={() => {
            setOpen(false);
            triggerRef.current?.focus();
          }}
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-white hover:text-gold"
          >
            <CloseIcon className="h-7 w-7" />
          </button>
          <div
            className="relative h-full max-h-[86vh] w-full max-w-[1100px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={src} alt={alt} fill sizes="90vw" className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
