import type { ReactNode } from "react";

// Trust green is only for checks that really happen ("Phone verified", "CNIC reviewed"…). Everything else is neutral.
// Size follows the surrounding font size (0.8125em), so set it on a wrapper rather than here.
export function Badge({ children, tone = "trust", className = "" }: { children: ReactNode; tone?: "trust" | "neutral" | "cream"; className?: string }) {
  const tones = {
    trust: "bg-trust text-white",
    neutral: "bg-apricot-tint text-cocoa",
    cream: "bg-cream text-cocoa",
  };
  return (
    <span className={`inline-flex items-center gap-[0.35em] whitespace-nowrap rounded-full px-[0.7em] py-[0.3em] text-[0.8125em] font-semibold leading-none ${tones[tone]} ${className}`}>
      {tone === "trust" && <Tick />}
      {children}
    </span>
  );
}

export function Tick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={`h-[1em] w-[1em] flex-none ${className}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}
