import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Gold CTA button. Renders a Next <Link> when `href` is given, otherwise a
 * native <button>. Square corners, uppercase label, gold → gold-dark on hover.
 */
const base =
  "inline-block bg-gold text-white font-body font-bold uppercase tracking-[0.1em] " +
  "transition-colors duration-200 hover:bg-gold-dark focus-visible:bg-gold-dark " +
  "min-h-[44px]";

const sizes = {
  md: "text-[14px] px-[30px] py-4",
  sm: "text-[14px] px-[26px] py-[15px]",
} as const;

type Size = keyof typeof sizes;

type LinkButtonProps = {
  href: string;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

type NativeButtonProps = {
  href?: undefined;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({
  href,
  size = "md",
  className = "",
  children,
  ...rest
}: LinkButtonProps | NativeButtonProps) {
  const classes = `${base} ${sizes[size]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as object)}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
