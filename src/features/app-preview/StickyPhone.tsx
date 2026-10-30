import type { ReactNode } from "react";
import { PhoneFrame } from "./PhoneFrame";

// A phone that stays in view beside a long column of text on wide screens.
export function StickyPhone({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="lg:sticky lg:top-32">
      <PhoneFrame label={label}>{children}</PhoneFrame>
    </div>
  );
}
