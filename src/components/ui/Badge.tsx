import type { CSSProperties, ReactNode } from "react";
import { Tick } from "@/components/ui/icons";

// Trust green is only for checks that really happen ("Phone verified", "CNIC reviewed"…). Everything else is neutral.
// Size follows the surrounding font size (0.8125em), so set it on a wrapper rather than here.
export function Badge({
  children,
  tone = "trust",
  className = "",
  style,
}: {
  children: ReactNode;
  tone?: "trust" | "neutral" | "cream";
  className?: string;
  style?: CSSProperties;
}) {
  const tones = {
    trust: "bg-trust text-white",
    neutral: "bg-apricot-tint text-cocoa",
    cream: "bg-cream text-cocoa",
  };
  return (
    <span style={style} className={`inline-flex items-center gap-[0.35em] whitespace-nowrap rounded-full px-[0.7em] py-[0.3em] text-[0.8125em] font-semibold leading-none ${tones[tone]} ${className}`}>
      {tone === "trust" && <Tick />}
      {children}
    </span>
  );
}
