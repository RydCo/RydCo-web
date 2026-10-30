"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Cta } from "@/config/cta";

// The open menu floats over the page: the one place DESIGN.md allows a shadow.
const floatShadow = "shadow-[0_24px_60px_-24px_rgba(44,30,24,.38)]"; // taste-skill-ignore

export function MobileMenu({ items, cta }: { items: { label: string; href: string }[]; cta: Cta }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="grid h-12 w-12 place-items-center rounded-full bg-apricot-tint transition-colors duration-150 hover:bg-cocoa hover:text-cream"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
        </svg>
      </button>
      <div id="mobile-menu" hidden={!open} className={`absolute inset-x-0 top-full bg-cream pb-8 ${floatShadow}`}>
        <nav aria-label="Main" className="wrap">
          <ul className="grid">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="block rounded-2xl py-4 font-display text-[26px] font-bold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href={cta.href} external={cta.external} className="mt-4 w-full">
            {cta.label}
          </Button>
        </nav>
      </div>
    </div>
  );
}
