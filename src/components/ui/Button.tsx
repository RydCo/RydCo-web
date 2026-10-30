import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "onApricot" | "secondary" | "cream" | "apricot" | "ghost";

const base =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full text-[17px] font-semibold leading-tight transition-[transform,background-color,color] duration-150 ease-out active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "px-7 bg-apricot-deep text-white hover:bg-cocoa",
  onApricot: "px-7 bg-cocoa text-cream hover:bg-cream hover:text-cocoa",
  secondary: "px-7 bg-apricot-tint text-cocoa hover:bg-cocoa hover:text-cream",
  // For apricot and cocoa grounds.
  cream: "px-7 bg-cream text-cocoa hover:bg-apricot-tint",
  // For cocoa grounds only (cocoa text on apricot, never white).
  apricot: "px-7 bg-apricot text-cocoa hover:bg-cream",
  ghost: "text-cocoa underline decoration-2 underline-offset-[6px] hover:decoration-apricot-deep",
};

type Props = {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({ href, variant = "primary", external, className = "", children }: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (external || href.startsWith("mailto:")) {
    const opensTab = external && !href.startsWith("mailto:");
    return (
      <a href={href} className={classes} {...(opensTab ? { target: "_blank", rel: "noopener" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
