import { site } from "@/config/site";

export type Cta = { label: string; href: string; external: boolean };

export function riderCta(): Cta {
  if (site.playStoreUrl) {
    return { label: "Get the app", href: site.playStoreUrl, external: true };
  }
  return { label: "Join the waitlist", href: "/#waitlist", external: false };
}

export function driverCta(): Cta {
  if (site.playStoreUrl) {
    return { label: "Get the app and drive", href: site.playStoreUrl, external: true };
  }
  return { label: "Sign up to drive", href: "/drivers/#driver-signup", external: false };
}
