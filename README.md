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

Vercel: **Add New → Project → import RydCo/RydCo-web**. Vercel detects Next.js. Add the same
`NEXT_PUBLIC_SITE_URL` environment variable.

## Before launch

Search the code for `[FILL]` to find every placeholder: the domain, app store link or waitlist form, pilot areas,
example prices, team photos and roles, and the legal pages, which must be reviewed by a lawyer.
