import { site } from "@/config/site";

// Every link to RydCo's inbox. With a subject (and body) the mail app opens pre-filled.
export function mailto(subject?: string, body?: string) {
  if (!subject) return `mailto:${site.email}`;
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail apps show literally.
  return `mailto:${site.email}?${params.toString().replace(/\+/g, "%20")}`;
}
