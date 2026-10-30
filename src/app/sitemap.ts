import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

const routes = [
  { path: "/", priority: 1 },
  { path: "/how-it-works/", priority: 0.9 },
  { path: "/safety/", priority: 0.8 },
  { path: "/drivers/", priority: 0.8 },
  { path: "/organizations/", priority: 0.8 },
  { path: "/contact/", priority: 0.6 },
  { path: "/privacy/", priority: 0.3 },
  { path: "/terms/", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: new URL(r.path, site.url).toString(),
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
