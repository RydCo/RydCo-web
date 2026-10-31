"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Turns the safety board into a deck of cards that moves on by itself: one card large in the middle, its neighbours fanned
// out behind it, looping. Each card's own animation plays as it first arrives. It waits while it's off screen or has
// keyboard focus, but not for the mouse: the section nearly fills the screen, so the mouse is almost always over it. The
// cards are the board's own, so with reduced motion the section simply stays the board (styles/motion/safety-deck.css).

const hold = 3500;

const clamp = (t: number) => Math.min(1, Math.max(0, t));

export function SafetyDeck({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      root.classList.add("deck-off");
      return;
    }

    const cards = [...root.querySelectorAll<HTMLElement>("[data-deck-card]")];
    // The deck decides when each card's animation plays, not the page's scroll observer, and cards don't fade in on their own.
    const playable = cards.map((card) => {
      const plays = card.hasAttribute("data-play");
      card.removeAttribute("data-play");
      card.removeAttribute("data-reveal");
      card.classList.add("is-in");
      return plays;
    });
    root.querySelector("[data-deck-head]")?.removeAttribute("data-reveal");

    let index = 0;
    let wide = false;
    let spread = 0;
    let spreadLeft = 0;

    const played = new Set<number>();
    const play = (i: number) => {
      if (played.has(i)) return;
      played.add(i);
      if (!playable[i]) return;
      cards[i].setAttribute("data-play", "");
      cards[i].classList.add("is-playing");
    };

    const pose = (card: HTMLElement, away: number) => {
      const far = Math.abs(away);
      const side = Math.sign(away);
      const near = Math.min(far, 1);
      const shown = wide && away < 0 ? clamp((1.5 - far) * 2) : clamp(2.1 - far);
      card.style.opacity = String(shown);
      card.style.visibility = shown === 0 ? "hidden" : "visible";
      card.style.zIndex = String(10 - far * 2);
      card.style.transform = `perspective(1300px) translateX(${side * Math.min(far, 1.6) * (away < 0 ? spreadLeft : spread)}px) rotateY(${-side * near * 40}deg) scale(${1 - 0.16 * near})`;
    };

    // Round the loop by the shorter way, so the last card sits next to the first.
    const arrange = () => {
      const count = cards.length;
      cards.forEach((card, i) => {
        let away = i - index;
        if (away > count / 2) away -= count;
        if (away < -count / 2) away += count;
        pose(card, away);
      });
    };

    const measure = () => {
      const width = root.clientWidth;
      const card = cards[0];
      wide = width >= 1024;
      spread = card.offsetWidth * (width < 640 ? 0.95 : 0.62);
      // On wide screens the heading is to the left, so cards don't fan as far that way.
      spreadLeft = wide ? card.offsetWidth * 0.4 : spread;
      arrange();
    };

    let timer = 0;
    let onScreen = false;
    let focused = false;
    const keepTime = () => {
      window.clearInterval(timer);
      if (!onScreen || focused) return;
      timer = window.setInterval(() => {
        index = (index + 1) % cards.length;
        arrange();
        play(index);
      }, hold);
    };

    const watch = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) play(index);
        keepTime();
      },
      { threshold: 0.4 },
    );
    const focusIn = () => {
      focused = true;
      keepTime();
    };
    const focusOut = () => {
      focused = false;
      keepTime();
    };

    measure();
    watch.observe(root);
    root.addEventListener("focusin", focusIn);
    root.addEventListener("focusout", focusOut);
    window.addEventListener("resize", measure);
    return () => {
      window.clearInterval(timer);
      watch.disconnect();
      root.removeEventListener("focusin", focusIn);
      root.removeEventListener("focusout", focusOut);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={rootRef} data-deck>
      {children}
    </div>
  );
}
