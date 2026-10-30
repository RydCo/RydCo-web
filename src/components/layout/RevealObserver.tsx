"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Adds .is-in to [data-reveal] elements as they scroll into view, and .is-playing to [data-play] drawings once
// half of one is on screen, so it plays where people can see it. Re-scans on every page change.
function watch(selector: string, done: string, options: IntersectionObserverInit) {
  const pending = document.querySelectorAll<HTMLElement>(`${selector}:not(.${done})`);
  if (!("IntersectionObserver" in window)) {
    pending.forEach((el) => el.classList.add(done));
    return () => {};
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add(done);
        io.unobserve(entry.target);
      }
    }
  }, options);
  pending.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const stopReveal = watch("[data-reveal]", "is-in", { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    const stopPlay = watch("[data-play]", "is-playing", { rootMargin: "0px 0px -10% 0px", threshold: 0.5 });
    return () => {
      stopReveal();
      stopPlay();
    };
  }, [pathname]);

  return null;
}
