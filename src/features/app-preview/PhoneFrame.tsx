import type { ReactNode } from "react";

// A plain ink-coloured device holding one of the app's real screens, rebuilt in HTML.
// Swap the children for an <img> of a real screenshot once one exists.
export function PhoneFrame({ children, label, className = "" }: { children: ReactNode; label: string; className?: string }) {
  return (
    <figure className={`mx-auto w-[300px] max-w-full ${className}`}>
      <div className="rounded-[44px] bg-ink-deep p-[10px]">
        <div data-ui className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[34px] bg-surface text-[13px] leading-snug text-ink">
          <StatusBar />
          {children}
        </div>
      </div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}

function StatusBar() {
  return (
    <div aria-hidden="true" className="relative z-10 flex flex-none items-center justify-between px-6 pt-4 pb-2 text-[12.5px] font-semibold tabular-nums">
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <svg viewBox="0 0 18 12" className="h-3 w-[18px] fill-ink">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2" width="3" height="10" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 26 12" className="h-3 w-[26px]">
          <rect x="0.75" y="0.75" width="21.5" height="10.5" rx="3" className="fill-none stroke-ink" strokeWidth="1.5" />
          <rect x="3" y="3" width="15" height="6" rx="1.5" className="fill-ink" />
          <rect x="23.5" y="4" width="2" height="4" rx="1" className="fill-ink" />
        </svg>
      </span>
    </div>
  );
}
