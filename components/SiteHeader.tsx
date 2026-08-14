"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { CloseIcon, MobileIcon } from "./icons";

/**
 * Top bar + logo + navigation, designed to overlay the hero photo.
 * On <900px the nav collapses into an accessible drawer:
 * focus trap, aria-expanded, Escape to close, body scroll lock,
 * and auto-close on route change / resize.
 */
export function SiteHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Body scroll lock + Escape handling while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    // Move focus into the panel.
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Minimal focus trap within the open drawer.
  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>("a, button");
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="relative z-10">
      {/* Top bar */}
      <div className="bg-navy px-6 py-[11px]">
        <div className="container-1200 !px-0 flex items-center justify-end gap-[9px]">
          <MobileIcon className="h-[13px] w-[13px] text-gold" />
          <span className="font-body text-[13px] font-bold uppercase tracking-[0.1em] text-white">
            Call or text{" "}
            <a
              href={site.phoneHref}
              className="text-white transition-colors hover:text-gold"
            >
              {site.phoneDisplay}
            </a>
          </span>
        </div>
      </div>

      {/* Logo + nav (transparent, sits over the hero) */}
      <div className="px-6 py-5">
        <div className="container-1200 !px-0 flex items-center justify-between gap-6">
          <Link href="/" className="block flex-none" aria-label={`${site.name} — home`}>
            <Image
              src="/logo.png"
              alt={site.name}
              width={177}
              height={46}
              priority
              className="h-[46px] w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-[34px] min-[900px]:flex">
            {nav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active === item.key ? "page" : undefined}
                className={`font-heading text-[16.5px] font-semibold text-white transition-colors hover:text-gold pb-1 border-b-2 ${
                  active === item.key ? "border-gold" : "border-transparent"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls={panelId}
            className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-[5px] p-[10px] min-[900px]:hidden"
          >
            <span className="block h-[2px] w-[26px] bg-white" />
            <span className="block h-[2px] w-[26px] bg-white" />
            <span className="block h-[2px] w-[26px] bg-white" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="fixed inset-0 z-0 cursor-default bg-navy/40 min-[900px]:hidden"
            tabIndex={-1}
          />
          <div
            id={panelId}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onKeyDown={onPanelKeyDown}
            className="relative z-10 flex flex-col bg-navy px-6 pb-[22px] pt-2 min-[900px]:hidden"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  close();
                  toggleRef.current?.focus();
                }}
                aria-label="Close menu"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-white"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            {nav.map((item, i) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active === item.key ? "page" : undefined}
                className={`font-heading text-[18px] font-semibold text-white py-[14px] ${
                  i < nav.length - 1 ? "border-b border-white/[0.14]" : ""
                } ${active === item.key ? "text-gold" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
