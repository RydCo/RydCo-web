import { site } from "@/config/site";

export function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail apps show literally.
  return `mailto:${site.email}?${params.toString().replace(/\+/g, "%20")}`;
}
