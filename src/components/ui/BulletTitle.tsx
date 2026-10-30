import type { ReactNode } from "react";

// A small heading led by a dot, for lists of features.
export function BulletTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="t-title flex items-start gap-3">
      <span aria-hidden="true" className="mt-[0.35em] h-3 w-3 flex-none rounded-full bg-accent" />
      {children}
    </h3>
  );
}
