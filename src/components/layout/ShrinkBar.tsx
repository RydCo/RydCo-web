"use client";

import { MotionConfig, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState, type ReactNode } from "react";

// One spring for everything the bar does: it settles without bouncing, and picks up from wherever it is if the
// reader changes direction halfway.
const settle = { type: "spring", bounce: 0, duration: 0.6 } as const;

// The header's bar. At the top of the page there is no bar: the logo and links sit on the hero. Once the page moves
// they gather into a pill floating over the content. Size changes are layout animations (transforms, not reflow), so
// they stay smooth. A little hysteresis stops it flickering at the threshold.
export function ShrinkBar({ logo, nav, actions }: { logo: ReactNode; nav: ReactNode; actions: ReactNode }) {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setCompact((was) => (was ? y > 12 : y > 56)));

  return (
    <MotionConfig reducedMotion="user" transition={settle}>
      <motion.div
        layout
        style={{ borderRadius: 28 }}
        data-compact={compact || undefined}
        className="group/bar relative mx-auto flex h-16 items-center justify-between gap-4 transition-[background-color,box-shadow] duration-500 ease-out-soft data-compact:h-14 data-compact:bg-screen data-compact:pr-2 data-compact:pl-5 data-compact:shadow-float motion-reduce:transition-none md:data-compact:pl-6 lg:data-compact:max-w-[960px]"
      >
        <motion.div layout="position" className="flex-none">
          {logo}
        </motion.div>
        <motion.div layout="position" className="hidden lg:block">
          {nav}
        </motion.div>
        <motion.div layout="position" className="flex items-center gap-2">
          {actions}
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
