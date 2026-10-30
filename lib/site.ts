// Everything a person might need to change before launch lives here.
// Items marked [FILL] are placeholders until the real value is confirmed.

export const site = {
  name: "RydCo",
  tagline: "Your commute, in good company.",
  description:
    "RydCo is carpooling for daily commuters in Pakistan, starting with a pilot in Lahore. Share the car, split the fuel cost, and ride with checked drivers.",
  // The site's address, used for link previews, the sitemap and robots.txt. On Vercel it comes from the project's
  // production domain (and follows a custom domain once one is added). NEXT_PUBLIC_SITE_URL overrides it anywhere.
  // ".example" is a reserved placeholder so nothing points at someone else's site.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://rydco.example"),
  email: "rydcoapp@gmail.com",
  instagram: "https://www.instagram.com/rydco.app/",
  instagramHandle: "@rydco.app",
  city: "Lahore",
  // [FILL] App status. While this is null, the main buttons take people to the waitlist form on the home page.
  playStoreUrl: null as string | null,
  // The Google Apps Script web app that stores form submissions (README → "Connect the forms").
  // NEXT_PUBLIC_FORM_ENDPOINT on the host overrides it. Set this to null and forms open a pre-filled email instead.
  formEndpoint: (process.env.NEXT_PUBLIC_FORM_ENDPOINT ||
    "https://script.google.com/macros/s/AKfycby8TSQMwPv6Xc9nktMRtbVF-0TUOosnVbNQN4hbgOxIfn8ReEClj5k_NqaaZ2O5sCc/exec") as string | null,
};

export function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail apps show literally.
  return `mailto:${site.email}?${params.toString().replace(/\+/g, "%20")}`;
}

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

// Topics for the contact form. Links can open it with one chosen: /contact/?topic=company#message
export const contactTopics = [
  { id: "riding", label: "Riding with RydCo" },
  { id: "driving", label: "Driving with RydCo" },
  { id: "company", label: "A commute pilot for our company" },
  { id: "partner", label: "Partnering or sponsoring" },
  { id: "safety", label: "Safety, checks or my data" },
  { id: "other", label: "Something else" },
] as const;

export type ContactTopic = (typeof contactTopics)[number]["id"];

export const contactLink = (topic: ContactTopic) => `/contact/?topic=${topic}#message`;
export const pilotEnquiry = contactLink("company");
export const partnerEnquiry = contactLink("partner");
export const safetyEnquiry = contactLink("safety");

// Roles are left out on purpose for now. [FILL] Add photos and roles when ready.
export const team = ["Tehreem Tahir", "Manal Bukhari", "Ezza Abdullah", "Ahmad Butt"];

export const nav = [
  { label: "How it works", href: "/how-it-works/" },
  { label: "Safety", href: "/safety/" },
  { label: "Drivers", href: "/drivers/" },
  { label: "Organizations", href: "/organizations/" },
];

export const footerNav = [
  {
    title: "Ride",
    links: [
      { label: "How it works", href: "/how-it-works/" },
      { label: "Safety", href: "/safety/" },
    ],
  },
  {
    title: "Drive",
    links: [
      { label: "Drivers", href: "/drivers/" },
      { label: "Offer a ride", href: "/drivers/" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { label: "Organizations", href: "/organizations/" },
      { label: "Partners", href: "/organizations/#partners" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
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
