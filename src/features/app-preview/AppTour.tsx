"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { PhoneFrame } from "./PhoneFrame";

// One phone that steps through the app's real screens on its own. A marker fills while its screen shows and the tour
// moves on when it's full (CSS in styles/motion/app-tour.css). It pauses while the phone is pointed at, while it's off
// screen, and with the pause button. With reduced motion it starts paused and screens swap without sliding.
// `bare` is for a phone that speaks for itself: only the pause button under it, a quick change between screens, the
// marker kept out of sight as the timer, and only the screens next to the current one in the page.

type Slide = { title: string; screen: ReactNode };

export function AppTour({
  slides,
  seconds = 3.6,
  bare = false,
  label = "A tour of the RydCo app",
  phoneClassName = "",
}: {
  slides: Slide[];
  seconds?: number;
  bare?: boolean;
  label?: string;
  phoneClassName?: string;
}) {
  const [index, setIndex] = useState(0);
  // The visitor's own play or pause, once they press the button. Until then it plays unless motion is reduced.
  const [chosen, setChosen] = useState<boolean | null>(null);
  const [onScreen, setOnScreen] = useState(false);
  const reduced = useReducedMotion();
  const playing = chosen ?? !reduced;
  const ref = useRef<HTMLDivElement>(null);

  const count = slides.length;
  const inPage = (i: number) => !bare || i === index || i === (index + 1) % count || i === (index - 1 + count) % count;

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fill = (
    <span
      key={index}
      className="tour-fill absolute inset-0 rounded-full bg-ink"
      style={{ animationDuration: `${seconds}s` }}
      onAnimationEnd={() => setIndex((index + 1) % count)}
    />
  );

  const pause = (
    <button
      type="button"
      onClick={() => setChosen(!playing)}
      aria-label={playing ? "Pause the tour" : "Play the tour"}
      className={`grid h-11 w-11 place-items-center rounded-full transition-colors duration-150 hover:bg-ink hover:text-surface ${bare ? "" : "bg-panel"}`}
    >
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-current">
        {playing ? (
          <>
            <rect x="4" y="3" width="4" height="14" rx="1.5" />
            <rect x="12" y="3" width="4" height="14" rx="1.5" />
          </>
        ) : (
          <path d="M6 3.8v12.4c0 .8.9 1.3 1.6.8l9.3-6.2c.6-.4.6-1.2 0-1.6L7.6 3c-.7-.5-1.6 0-1.6.8Z" />
        )}
      </svg>
    </button>
  );

  return (
    <div ref={ref} className="tour" data-running={playing && onScreen}>
      <div className={`tour-phone ${phoneClassName}`}>
        <PhoneFrame label={label}>
          <div className="relative min-h-0 flex-1">
            {slides.map(
              (s, i) =>
                inPage(i) && (
                  <div
                    key={s.title}
                    aria-hidden={i !== index}
                    inert={i !== index}
                    className={`absolute inset-0 flex flex-col transition-[opacity,translate] ease-out motion-reduce:transition-none ${bare ? "duration-150" : "duration-500"} ${
                      i === index ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                    }`}
                  >
                    {s.screen}
                  </div>
                ),
            )}
          </div>
        </PhoneFrame>
      </div>

      {bare ? (
        <div className="mt-3 flex justify-center">
          <span aria-hidden="true" className="relative block h-0 w-0 overflow-hidden">
            {fill}
          </span>
          {pause}
        </div>
      ) : (
        <>
          <p aria-hidden="true" className="mt-5 text-center font-display text-[20px] font-bold">
            {slides[index].title}
          </p>
          <div className="mt-1 flex items-center justify-center gap-2">
            <ol aria-label="App tour" className="flex items-center">
              {slides.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={s.title}
                    aria-current={i === index ? "step" : undefined}
                    className="grid h-11 place-items-center px-2"
                  >
                    <span
                      className={`relative block h-2 overflow-hidden rounded-full bg-ink-soft transition-[width] duration-300 motion-reduce:transition-none ${i === index ? "w-10" : "w-2"}`}
                    >
                      {i === index && fill}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            {pause}
          </div>
        </>
      )}
    </div>
  );
}
