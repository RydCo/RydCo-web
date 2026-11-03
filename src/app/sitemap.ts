import type { MetadataRoute } from "next";
import { footerNav, legalNav } from "@/config/navigation";
import { site } from "@/config/site";

export const dynamic = "force-static";

// Every page is in the navigation config, so the sitemap reads it rather than keeping its own list.
const pages = [
  { href: "/", priority: 1 },
  ...footerNav.map((p) => ({ href: p.href, priority: 0.7 })),
  ...legalNav.map((p) => ({ href: p.href, priority: 0.3 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: new URL(p.href, site.url).toString(),
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
