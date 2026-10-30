// The one clock a motion graphics scene runs on. Every animation in a scene is a Web Animation placed on one timeline
// by its delay, so setting them all to a time shows exactly that moment. In a browser the scene plays in a loop, to
// preview it. scripts/motion/render.mjs takes over the clock and steps it frame by frame.

declare global {
  interface Window {
    __motion?: { ready: boolean; capture: () => number; seek: (ms: number) => void };
  }
}

const seek = (ms: number) => {
  document.getAnimations().forEach((animation) => {
    animation.pause();
    animation.currentTime = ms;
  });
};

// Starts the scene's loop. Returns the function that stops it.
export function runClock(duration: number) {
  let raf = 0;
  const preview = (now: number) => {
    seek(now % duration);
    raf = requestAnimationFrame(preview);
  };
  raf = requestAnimationFrame(preview);
  window.__motion = {
    ready: true,
    capture: () => {
      cancelAnimationFrame(raf);
      return duration;
    },
    seek,
  };
  return () => {
    cancelAnimationFrame(raf);
    delete window.__motion;
  };
}
