import type { ReactNode } from "react";

// Marks a card's numbers as an example, in its top right corner. The card needs `relative` and the surface radius.
export function ExampleTag({ children }: { children: ReactNode }) {
  return <span className="absolute top-0 right-0 rounded-tr-surface rounded-bl-[18px] bg-ink px-4 py-2 text-[14px] font-semibold text-surface">{children}</span>;
}
