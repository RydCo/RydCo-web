import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { securityHeaders } from "./src/config/security.mjs";

// `pnpm motion` builds the motion graphics scenes (page.motion.tsx) into their own folder. The real site never sees them.
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

// The live site gets its headers from vercel.json (a static export can't send any). The dev server sends the same
// ones, from the same config, so a source the live site would block is blocked here too.
export default function config(phase: string): NextConfig {
  if (phase !== PHASE_DEVELOPMENT_SERVER) return nextConfig;
  return { ...nextConfig, headers: async () => [{ source: "/:path*", headers: securityHeaders(true) }] };
}
