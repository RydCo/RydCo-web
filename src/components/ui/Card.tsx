import type { ComponentPropsWithoutRef, ElementType } from "react";

type Tone = "panel" | "surface" | "screen" | "ink";
type Pad = "sm" | "md" | "lg";

const tones: Record<Tone, string> = {
  panel: "bg-panel text-ink",
  surface: "bg-surface text-ink",
  screen: "bg-screen text-ink",
  ink: "on-ink field-ink text-surface",
};

const pads: Record<Pad, string> = {
  sm: "p-6",
  md: "p-6 md:p-8",
  lg: "p-7 md:p-9",
};

type Props<T extends ElementType> = { as?: T; tone?: Tone; pad?: Pad; className?: string } & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

// The one card: the theme's surface radius, a tone that steps away from the ground it sits on, and padding from a
// three-step scale. `as` picks the element when a card is a list item or a paragraph.
export function Card<T extends ElementType = "div">({ as, tone = "panel", pad = "md", className = "", ...rest }: Props<T>) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={`rounded-surface ${tones[tone]} ${pads[pad]} ${className}`} {...rest} />;
}
