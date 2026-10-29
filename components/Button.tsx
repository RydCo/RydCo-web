import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "onApricot" | "secondary" | "ghost";

const base =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full text-[17px] font-semibold leading-tight transition-[transform,background-color,color] duration-150 ease-out active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "px-7 bg-apricot-deep text-white hover:bg-cocoa",
  onApricot: "px-7 bg-cocoa text-cream hover:bg-cream hover:text-cocoa",
  secondary: "px-7 bg-apricot-tint text-cocoa hover:bg-cocoa hover:text-cream",
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

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-5 w-5 flex-none ${className}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}
