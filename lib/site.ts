// Everything a person might need to change before launch lives here.
// Items marked [FILL] are placeholders until the real value is confirmed.

export const site = {
  name: "RydCo",
  tagline: "Your commute, in good company.",
  description:
    "RydCo is carpooling for daily commuters in Pakistan, starting with a pilot in Lahore. Share the car, split the fuel cost, and ride with checked drivers.",
  // [FILL] Real domain. ".example" is a reserved placeholder so nothing points at someone else's site.
  url: "https://rydco.example",
  email: "rydcoapp@gmail.com",
  instagram: "https://www.instagram.com/rydco.app/",
  instagramHandle: "@rydco.app",
  city: "Lahore",
  // [FILL] App status. While these are null, the main buttons open an email to join the waitlist.
  playStoreUrl: null as string | null,
  waitlistUrl: null as string | null,
};

export function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail apps show literally.
  return `mailto:${site.email}?${params.toString().replace(/\+/g, "%20")}`;
}

export type Cta = { label: string; href: string; external: boolean };

export function riderCta(route?: { from: string; to: string }): Cta {
  if (site.playStoreUrl) {
    return { label: "Get the app", href: site.playStoreUrl, external: true };
  }
  if (site.waitlistUrl) {
    return { label: "Join the waitlist", href: site.waitlistUrl, external: true };
  }
  const routeLine = route ? `I start in ${route.from} and I'm headed to ${route.to}.\n` : "Where I start:\nWhere I'm headed:\n";
  return {
    label: "Join the waitlist",
    href: mailto("Join the RydCo waitlist", `Assalam o alaikum RydCo,\n\nPlease add me to the waitlist.\n\nName:\nPhone:\n${routeLine}`),
    external: true,
  };
}

export const nav = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Safety", href: "/safety" },
  { label: "Drivers", href: "/drivers" },
  { label: "Organizations", href: "/organizations" },
];

export const footerNav = [
  {
    title: "Ride",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Safety", href: "/safety" },
    ],
  },
  {
    title: "Drive",
    links: [
      { label: "Drivers", href: "/drivers" },
      { label: "Offer a ride", href: "/drivers" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { label: "Organizations", href: "/organizations" },
      { label: "Partners", href: "/organizations#partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

// Pilot coverage, taken from the app mocks. [FILL] Confirm against the real pilot.
export const pilot = {
  starts: [
    { name: "Johar Town", covered: true },
    { name: "DHA Phase 5", covered: true },
    { name: "Gulberg III", covered: true },
    { name: "Model Town", covered: true },
    { name: "Garden Town", covered: true },
    { name: "Faisal Town", covered: true },
    { name: "Bahria Town", covered: false },
    { name: "Township", covered: false },
  ],
  destinations: [
    { name: "Arfa Software Technology Park", covered: true },
    { name: "Gulberg Main Boulevard", covered: true },
    { name: "Mall Road", covered: true },
    { name: "Liberty Market", covered: true },
  ],
};
