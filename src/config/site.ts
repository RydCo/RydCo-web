// Everything a person might need to change before launch lives in this folder.
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
  // The Google Apps Script web app that stores form submissions (setup steps: infra/google-apps-script/forms.js).
  // NEXT_PUBLIC_FORM_ENDPOINT on the host overrides it. Set this to null and forms open a pre-filled email instead.
  formEndpoint: (process.env.NEXT_PUBLIC_FORM_ENDPOINT ||
    "https://script.google.com/macros/s/AKfycby8TSQMwPv6Xc9nktMRtbVF-0TUOosnVbNQN4hbgOxIfn8ReEClj5k_NqaaZ2O5sCc/exec") as string | null,
};
