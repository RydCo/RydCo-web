import type { ReactNode } from "react";

type Ground = "surface" | "panel" | "brand" | "ink";

const grounds: Record<Ground, string> = {
  surface: "bg-surface text-ink",
  panel: "field-panel text-ink",
  brand: "field-brand text-ink",
  ink: "on-ink field-ink text-surface",
};

// `bottom` is for a section that carries straight on from the hero above it, on the same ground.
const pads = { full: "py-24 lg:py-40", bottom: "pb-24 lg:pb-40" };

type Props = {
  ground?: Ground;
  pad?: keyof typeof pads;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ ground = "surface", pad = "full", id, labelledBy, className = "", children }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${grounds[ground]} ${pads[pad]} ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}
