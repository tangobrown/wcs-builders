import type { ReactNode } from "react";

/**
 * Section h2 with the gold rule beneath it. `ruleWidth` matches the heading
 * (110–220px per the design). `as` lets callers keep heading levels sensible.
 */
export function SectionHeading({
  children,
  ruleWidth = 150,
  className = "",
  headingClassName = "",
}: {
  children: ReactNode;
  ruleWidth?: number;
  className?: string;
  headingClassName?: string;
}) {
  return (
    <div className={className}>
      <h2
        className={`font-heading font-bold text-navy leading-[1.2] text-[clamp(29px,3.5vw,40px)] ${headingClassName}`}
      >
        {children}
      </h2>
      <div
        className="gold-rule mt-[14px]"
        style={{ width: `${ruleWidth}px`, maxWidth: "70%" }}
      />
    </div>
  );
}
