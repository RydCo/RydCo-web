import Link from "next/link";
import type { ReactNode } from "react";
import { buttonClasses, type ButtonVariant } from "./button-styles";

type Props = {
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({ href, variant = "primary", external, className = "", children }: Props) {
  const classes = `${buttonClasses(variant)} ${className}`;
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
