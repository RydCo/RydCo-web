"use client";

import { useEffect, useRef } from "react";
import { interludeSeenClass, interludeWasSeen, rememberInterlude } from "@/lib/interlude";

const settle = 200;

// The motion graphic between the hero and the page, once each time the site is opened fresh. It's only a longer scroll:
// the stage stays pinned while the video plays, and the next section rises over it as a rounded sheet, however fast
// someone scrolls. Once it has been passed, the extra length goes, so the way back up is just the page.
// Styles: styles/motion/ride-interlude.css, which keeps it away without JavaScript and with reduced motion.
export function RideInterlude() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const page = document.documentElement;
    if (!section || !video) return;
    if (interludeWasSeen()) {
      page.classList.add(interludeSeenClass);
      return;
    }
    if (getComputedStyle(section).display === "none" || !("IntersectionObserver" in window)) return;

    let started = false;
    let timer = 0;

    // Only fetched once it's really scrolling into view, so it costs nothing for someone who stays on the first screen.
    const fetchSoon = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        fetchSoon.disconnect();
        video.preload = "auto";
        video.load();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    const start = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        start.disconnect();
        started = true;
        rememberInterlude();
        // If the browser refuses to autoplay, the finished picture shows instead.
        video.play().catch(() => {
          video.poster = "/motion/ride-interlude-poster.jpg";
        });
      },
      { rootMargin: "0px 0px -60% 0px" },
    );

    // Once the sheet has fully covered it and scrolling has stopped, take the length out without anything moving on screen.
    const finish = () => {
      if (!started || section.getBoundingClientRect().bottom > window.innerHeight) return;
      window.removeEventListener("scroll", onScroll);
      const next = section.nextElementSibling;
      const before = next?.getBoundingClientRect().top ?? 0;
      page.classList.add(interludeSeenClass);
      const after = next?.getBoundingClientRect().top ?? 0;
      // Even a scroll of nothing would stop a smooth scroll that's under way.
      if (after !== before) window.scrollBy({ top: after - before, behavior: "instant" });
    };
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(finish, settle);
    };

    fetchSoon.observe(section);
    start.observe(section);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      fetchSoon.disconnect();
      start.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} data-interlude aria-hidden="true">
      <div className="sticky top-0 h-svh overflow-hidden rounded-t-[40px] bg-[color-mix(in_srgb,var(--color-ink-deep)_72%,black)]">
        <video ref={videoRef} muted playsInline preload="none" className="absolute inset-0 h-full w-full object-cover">
          <source src="/motion/ride-interlude.webm" type="video/webm" />
          <source src="/motion/ride-interlude.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
