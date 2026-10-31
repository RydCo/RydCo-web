"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// A silent, looping motion graphic from public/motion (rendered by `npm run motion`). It plays while it's on screen.
// Reduced motion or no JavaScript: its poster stays, and nothing moves.
export function MotionVideo({ name, className = "" }: { name: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // The browser may refuse to autoplay (battery saver, say), and then the poster simply stays.
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={`/motion/${name}-poster.jpg`}
      aria-hidden="true"
      className={className}
    >
      <source src={`/motion/${name}.webm`} type="video/webm" />
      <source src={`/motion/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
