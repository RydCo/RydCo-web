"use client";

import { inView } from "motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Adds .is-in to [data-reveal] elements as they come into view, and .is-playing to [data-play] drawings once half of
// one is on screen, so it plays where people can see it. Anything the page passed in one jump (a fast flick or an
// anchor link) never crosses the viewport, so each time one arrives, those above it are marked too: content
// is never left hidden behind the reader. Re-scans on every page change.
function watch(selector: string, done: string, amount: number) {
  const pending = `${selector}:not(.${done})`;
  // Everything earlier in the page than what just arrived is above it, by document order: no layout reads needed.
  const passed = (arrived: Element) => {
    for (const el of document.querySelectorAll(pending)) {
      if (el.compareDocumentPosition(arrived) & Node.DOCUMENT_POSITION_FOLLOWING) el.classList.add(done);
    }
  };
  return inView(
    pending,
    (el) => {
      el.classList.add(done);
      passed(el);
    },
    { amount },
  );
}

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const stopReveal = watch("[data-reveal]", "is-in", 0);
    const stopPlay = watch("[data-play]", "is-playing", 0.5);
    return () => {
      stopReveal();
      stopPlay();
    };
  }, [pathname]);

  return null;
}
