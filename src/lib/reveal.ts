import type { CSSProperties } from "react";

// Staggered entrance: heading, then text, then picture (docs/DESIGN.md §6).
export function reveal(step = 0) {
  return {
    "data-reveal": "",
    style: { "--reveal-delay": `${step * 70}ms` } as CSSProperties,
  };
}

// When a part of a [data-play] animation starts, and for parts that travel, how far back they start from.
export const playAt = (delay: number, from?: number) => ({ "--d": `${delay}ms`, ...(from ? { "--from": `${-from}px` } : {}) }) as CSSProperties;
