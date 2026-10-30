import type { CSSProperties } from "react";

// Staggered entrance: heading, then text, then picture (docs/DESIGN.md §6).
export function reveal(step = 0) {
  return {
    "data-reveal": "",
    style: { "--reveal-delay": `${step * 70}ms` } as CSSProperties,
  };
}
