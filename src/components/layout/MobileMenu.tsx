"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { iconButtonClasses } from "@/components/ui/button-styles";
import { Close, Menu } from "@/components/ui/icons";
import type { Cta } from "@/config/cta";
import type { NavItem } from "@/config/navigation";
import { useIsCurrent } from "./NavLinks";

// On phones the links open in a sheet that drops from the header bar, floating over the page. It eases in from just
// above, its links following one after another, and closes with Escape, a tap outside or a choice.
export function MobileMenu({ items, cta }: { items: NavItem[]; cta: Cta }) {
  const [open, setOpen] = useState(false);
  const isCurrent = useIsCurrent();
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <MotionConfig reducedMotion="user">
      <div ref={root} className="lg:hidden">
        <button
          ref={toggle}
          type="button"
          aria-expanded={open}
          aria-controls={open ? "mobile-menu" : undefined}
          onClick={() => setOpen((o) => !o)}
          className={iconButtonClasses()}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <Close /> : <Menu />}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.18 } }}
              transition={{ type: "spring", bounce: 0, duration: 0.45 }}
              className="absolute inset-x-0 top-full mt-2 origin-top rounded-surface bg-screen p-3 pb-4 shadow-float"
            >
              <nav aria-label="Main">
                <ul className="grid">
                  {items.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.4, delay: 0.04 + i * 0.035 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isCurrent(item.href) ? "page" : undefined}
                        className="block rounded-2xl px-3 py-3 font-display text-[24px] font-bold transition-colors duration-200 hover:bg-panel aria-[current=page]:bg-panel"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <Button href={cta.href} external={cta.external} className="mt-3 w-full">
                  {cta.label}
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
