import type { ReactNode } from "react";
import { Tick } from "./icons";

// One line in a list of things RydCo does.
export function TickItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <Tick className="mt-[0.3em] text-accent-deep" />
      {children}
    </li>
  );
}
