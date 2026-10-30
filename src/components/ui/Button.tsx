import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "onBrand" | "secondary" | "surface" | "brand" | "ghost";

const base =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full text-[17px] font-semibold leading-tight transition-[transform,background-color,color] duration-150 ease-out active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "px-7 bg-accent text-on-accent hover:bg-ink",
  onBrand: "px-7 bg-ink text-surface hover:bg-surface hover:text-ink",
  secondary: "px-7 bg-panel text-ink hover:bg-ink hover:text-surface",
  // For brand and ink grounds.
  surface: "px-7 bg-surface text-ink hover:bg-panel",
  // For ink grounds only.
  brand: "px-7 bg-brand text-ink hover:bg-surface",
  ghost: "text-ink t-link hover:decoration-accent",
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
