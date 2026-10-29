import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// Add each page here as it is built.
const routes = [{ path: "/", priority: 1 }];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: new URL(r.path, site.url).toString(),
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
