import type { NextConfig } from "next";

// `npm run motion` builds the motion graphics scenes (page.motion.tsx) into their own folder. The real site never sees them.
const motion = process.env.MOTION_RENDER === "1";

const nextConfig: NextConfig = {
  output: "export",
  ...(motion ? { distDir: ".motion-build", pageExtensions: ["motion.tsx", "tsx", "ts"] } : {}),
  // Every page exports as <page>/index.html, so any static host serves it without special rules.
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
