import { site } from "@/config/site";

export type Cta = { label: string; href: string; external: boolean };

// Whether the app can be downloaded yet. Everything that changes at launch reads this, never `site.playStoreUrl`.
export const appLive = Boolean(site.playStoreUrl);
export const waitlistLabel = "Join the waitlist";

// Before launch the button goes to a waitlist form: the home page's, unless a page has its own (`waitlistHref`).
export function riderCta(waitlistHref = "/#waitlist"): Cta {
  if (site.playStoreUrl) {
    return { label: "Get the app", href: site.playStoreUrl, external: true };
  }
  return { label: waitlistLabel, href: waitlistHref, external: false };
}

export function driverCta(): Cta {
  if (site.playStoreUrl) {
    return { label: "Get the app and drive", href: site.playStoreUrl, external: true };
  }
  return { label: "Sign up to drive", href: "/drivers/#driver-signup", external: false };
}
