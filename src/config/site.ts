// Everything a person might need to change before launch lives in this folder.
// Items marked [FILL] are placeholders until the real value is confirmed.
import { formEndpoint } from "./forms.mjs";
import { tagline } from "./tagline.mjs";

const city = "Lahore";

export const site = {
  tagline,
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
  city,
  // Where RydCo is today: the badge over the hero headline and the footer.
  pilotLine: `Starting with a pilot in ${city}`,
  // [FILL] App status. While this is null, the main buttons take people to the waitlist form on the home page.
  playStoreUrl: null as string | null,
  // Where the forms are sent (config/forms.mjs, shared with the security headers).
  formEndpoint,
};
