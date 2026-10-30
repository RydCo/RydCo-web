import type { ReactNode } from "react";

type Ground = "surface" | "panel" | "brand" | "ink";

const grounds: Record<Ground, string> = {
  surface: "bg-surface text-ink",
  panel: "bg-panel text-ink",
  brand: "bg-brand text-ink",
  ink: "on-ink bg-ink text-surface",
};

type Props = {
  ground?: Ground;
  id?: string;
  labelledBy?: string;
  className?: string;
  inner?: string;
  children: ReactNode;
};

export function Section({ ground = "surface", id, labelledBy, className = "", inner = "", children }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${grounds[ground]} py-24 lg:py-40 ${className}`}>
      <div className={`wrap ${inner}`}>{children}</div>
    </section>
  );
}
