"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createChromeStar, type ChromeStar } from "./chrome-star";

// Turns the safety board into a pinned deck that scrolling moves through: one card large in the middle, its neighbours
// fanned out behind it. Between cards a chrome star grows over everything, the cards swap behind it, and a star-shaped hole
// opens to show the next one, whose own animation then plays. It's only a longer scroll, never a locked one. The cards are
// the board's own, so with reduced motion or without WebGL2 the section simply stays the board (styles/motion/safety-deck.css).

// Of each card's stretch of scroll, this share is the star, and the rest is holding the card still to read.
const starShare = 0.62;

const ease = (t: number) => t * t * (3 - 2 * t);
const clamp = (t: number) => Math.min(1, Math.max(0, t));

export function SafetyDeck({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window) || !("WebGL2RenderingContext" in window)) {
      root.classList.add("deck-off");
      return;
    }
    // Only built as the section comes near, so it costs nothing at page load. If it can't be built, the cards still deal.
    let star: ChromeStar | null = null;
    let built = false;

    const cards = [...root.querySelectorAll<HTMLElement>("[data-deck-card]")];
    // The deck decides when each card's animation plays, not the page's scroll observer, and cards don't fade in on their own.
    const playable = cards.map((card) => {
      const plays = card.hasAttribute("data-play");
      card.removeAttribute("data-play");
      card.removeAttribute("data-reveal");
      card.classList.add("is-in");
      return plays;
    });
    const head = root.querySelector("[data-deck-head]");
    head?.removeAttribute("data-reveal");

    const played = new Set<number>();
    const play = (i: number) => {
      if (played.has(i)) return;
      played.add(i);
      if (!playable[i]) return;
      cards[i].setAttribute("data-play", "");
      cards[i].classList.add("is-playing");
    };

    let width = 0;
    let height = 0;
    let centreX = 0;
    let centreY = 0;
    let cover = 0;
    let spread = 0;
    let spreadLeft = 0;
    const measure = () => {
      width = root.clientWidth;
      height = window.innerHeight;
      star?.resize(width, height, Math.min(window.devicePixelRatio || 1, width < 640 ? 1.25 : 1.5));
      const box = canvas.getBoundingClientRect();
      const card = cards[0];
      const parent = card.offsetParent?.getBoundingClientRect();
      centreX = (parent?.left ?? 0) - box.left + card.offsetLeft + card.offsetWidth / 2;
      centreY = (parent?.top ?? 0) - box.top + card.offsetTop + card.offsetHeight / 2;
      spread = card.offsetWidth * (width < 640 ? 0.95 : 0.62);
      // On wide screens the heading is to the left, so cards don't fan as far that way.
      spreadLeft = width < 1024 ? spread : card.offsetWidth * 0.4;
      // How large the star must be for its sides to clear the far corner of the screen.
      const k = 0.55;
      const a = Math.max(centreX, width - centreX);
      const b = Math.max(centreY, height - centreY);
      cover = Math.pow(Math.pow(a, k) + Math.pow(b, k), 1 / k) * 1.05;
      last = NaN;
    };

    const pose = (card: HTMLElement, away: number) => {
      const far = Math.abs(away);
      const side = Math.sign(away);
      const near = Math.min(far, 1);
      const shown = away < 0 && width >= 1024 ? clamp((1.5 - far) * 2) : clamp(2.1 - far);
      card.style.opacity = String(shown);
      card.style.visibility = shown === 0 ? "hidden" : "visible";
      card.style.zIndex = String(10 - Math.round(far * 2));
      card.style.transform = `perspective(1300px) translateX(${side * Math.min(far, 1.6) * (away < 0 ? spreadLeft : spread)}px) rotateY(${-side * near * 40}deg) scale(${1 - 0.16 * near})`;
    };

    let last = NaN;
    let starShown = false;
    const start = performance.now();

    const frame = (now: number) => {
      const box = root.getBoundingClientRect();
      // The first star starts as the section arrives, and the stretch for each card is one equal share of the length.
      const arrival = height * 0.4;
      const progress = clamp((arrival - box.top) / (box.height - height + arrival));
      const position = Math.min(progress * cards.length, cards.length - 0.0001);
      const index = Math.floor(position);
      const t = clamp((position - index) / starShare);

      const place = index - 1 + ease(t);
      if (place !== last) {
        last = place;
        cards.forEach((card, i) => pose(card, i - place));
      }
      if (t >= 0.62) play(index);

      if (t > 0 && t < 1) {
        const grow = Math.pow(clamp(t / 0.6), 2.6) * cover;
        const open = Math.pow(clamp((t - 0.38) / 0.62), 2.6) * cover;
        const glint = Math.sin(clamp((t - 0.12) / 0.8) * Math.PI);
        star?.draw({ x: centreX, y: centreY, outer: grow, hole: open, sparkle: glint * Math.min(width, height) * 0.05, time: (now - start) / 1000 });
        starShown = true;
      } else if (starShown) {
        star?.clear();
        starShown = false;
      }
      raf = requestAnimationFrame(frame);
    };

    let raf = 0;
    const near = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);
        if (!entry.isIntersecting) return;
        if (!built) {
          built = true;
          star = createChromeStar(canvas);
          measure();
        }
        raf = requestAnimationFrame(frame);
      },
      { rootMargin: "100% 0px" },
    );
    measure();
    near.observe(root);
    window.addEventListener("resize", measure);
    return () => {
      near.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={rootRef} data-deck>
      <div data-deck-pin>
        <canvas ref={canvasRef} data-deck-star aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
