import type { CSSProperties, ReactNode } from "react";
import { Tick } from "@/components/ui/icons";

const tones = {
  trust: "bg-trust text-on-trust",
  neutral: "bg-panel text-ink",
  surface: "bg-surface text-ink",
  ink: "bg-ink text-surface",
};

// `text` badges are 0.8125em of the text around them; `inline` ones sit inside a display-size sentence at half its size.
const sizes = {
  text: "text-[0.8125em]",
  inline: "align-[0.2em] font-sans text-[0.5em]",
};

// Trust green is only for checks that really happen ("Phone verified", "CNIC reviewed"…). Everything else is neutral.
// Size follows the surrounding font size, so set it on a wrapper rather than here.
export function Badge({
  children,
  tone = "trust",
  size = "text",
  className = "",
  style,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span style={style} className={`inline-flex items-center gap-[0.35em] whitespace-nowrap rounded-full px-[0.7em] py-[0.3em] font-semibold leading-none ${sizes[size]} ${tones[tone]} ${className}`}>
      {tone === "trust" && <Tick />}
      {children}
    </span>
  );
}
