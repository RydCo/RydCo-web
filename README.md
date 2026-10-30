# RydCo website

The public website for RydCo, carpooling for daily commuters in Pakistan, starting with a pilot in Lahore.
It is a static site (Next.js with `output: "export"`), so it can be hosted anywhere that serves files.

Design rules live in [DESIGN.md](DESIGN.md). Every link, email and placeholder lives in [lib/site.ts](lib/site.ts).

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

The finished site is written to the `out/` folder.

## Deploy

### Quickest: Netlify Drop (no Git needed)

1. Run `npm run build`.
2. Go to https://app.netlify.com/drop and sign in (a free account; "Sign up with GitHub" works).
3. Drag the `out` folder onto the page. Netlify gives you a link such as `https://something.netlify.app`.
4. In Netlify, open **Site configuration → Change site name** to get `https://rydco.netlify.app` (if the name is free).
5. Put that link in `lib/site.ts` (`url`), run `npm run build` again, and drag the new `out` folder onto
   **Deploys** in the same site. This makes search engines and link previews use the right address.

### From GitHub (redeploys on every push)

Netlify: **Add new site → Import an existing project → GitHub → RydCo/RydCo-web**. The build settings come from
`netlify.toml`. Add an environment variable `NEXT_PUBLIC_SITE_URL` set to the site's address.

Vercel: **Add New → Project → import RydCo/RydCo-web**. Vercel detects Next.js. Add the same
`NEXT_PUBLIC_SITE_URL` environment variable.

## Before launch

Search the code for `[FILL]` to find every placeholder: the domain, app store link or waitlist form, pilot areas,
example prices, team photos and roles, and the legal pages, which must be reviewed by a lawyer.
