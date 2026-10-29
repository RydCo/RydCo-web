import type { CSSProperties, ReactNode } from "react";

type Ground = "cream" | "tint" | "apricot" | "cocoa";

const grounds: Record<Ground, string> = {
  cream: "bg-cream text-cocoa",
  tint: "bg-apricot-tint text-cocoa",
  apricot: "bg-apricot text-cocoa",
  cocoa: "on-cocoa bg-cocoa text-cream",
};

type Props = {
  ground?: Ground;
  id?: string;
  labelledBy?: string;
  className?: string;
  inner?: string;
  children: ReactNode;
};

export function Section({ ground = "cream", id, labelledBy, className = "", inner = "", children }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${grounds[ground]} py-24 lg:py-40 ${className}`}>
      <div className={`wrap ${inner}`}>{children}</div>
    </section>
  );
}

// Staggered entrance: heading, then text, then picture (DESIGN.md §6).
export function reveal(step = 0) {
  return {
    "data-reveal": "",
    style: { "--reveal-delay": `${step * 70}ms` } as CSSProperties,
  };
}
