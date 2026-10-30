import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
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
