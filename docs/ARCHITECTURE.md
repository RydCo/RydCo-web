# Architecture

How the RydCo website's code is organised, and the rules that keep it that way. For how the site should look and
move, see [DESIGN.md](DESIGN.md).

The site is a static Next.js export (`output: "export"`): no server, no database. Pages are built ahead of time, and
the forms post to a Google Apps Script.

## Layout

```text
rydco-web/
├── src/
│   ├── app/                 Routes only: URLs, metadata, the root layout, sitemap, robots
│   ├── views/               One folder per page: its sections and page-only pieces
│   │   ├── home/
│   │   │   ├── HomeView.tsx     Lists the page's sections in order
│   │   │   ├── sections/        One file per section, with that section's copy and data
│   │   │   └── components/      Pieces only this page uses
│   │   ├── drivers/  safety/  organizations/  how-it-works/  contact/  legal/
│   ├── features/            What the site does, used on more than one page
│   │   ├── commute/             Route check, coverage answer, the shared chosen route
│   │   ├── waitlist/  driver-signup/  contact/    The three forms
│   │   ├── app-preview/         Phone frame, app tour, the rebuilt app screens
│   │   └── trips/               The trip card
│   ├── components/          Shared parts that know nothing about RydCo's features
│   │   ├── ui/                  Button, Badge, Section, PageHero, icons
│   │   ├── forms/               Text field, select, submit button, thank-you panel
│   │   ├── layout/              Navbar, mobile menu, footer, scroll observer
│   │   └── brand/               Logo, route line, car, hero animation
│   ├── config/              Facts that change: site details, pilot areas, links, navigation
│   ├── hooks/               Shared React hooks
│   ├── lib/                 Plain helpers: sending forms, phone numbers, mailto
│   └── styles/              Tokens, base styles, utilities, one file per animation
├── public/                  Files served as they are
├── scripts/                 Build steps (flatten-segments runs after `next build`)
├── infra/                   Code that runs elsewhere: the Google Apps Script behind the forms
└── docs/                    This file and DESIGN.md
```

## The one rule: imports only point down

```text
app  →  views  →  features  →  components  →  hooks / lib / config
```

A layer may import from layers to its right, never to its left. A shared `Button` can't depend on a page, so changing
one page can't break another. `npm run lint` fails if this is broken, and also rejects `../` imports: use `@/` across
folders and `./` for files in the same folder.

Two things ESLint doesn't check, so please keep to them in review:

- A view doesn't import from another view. If two pages need something, move it down to `features` or `components`.
- A feature may use another feature (the waitlist uses `commute`), but never in a circle.

## Where does this go?

| You're adding | Put it in |
| --- | --- |
| A new URL | `src/app/<route>/page.tsx`: metadata and one line rendering its view |
| A new page section | `src/views/<page>/sections/`, then list it in the page's view |
| Copy or data for one section | At the top of that section's file |
| Something one page needs | `src/views/<page>/components/` |
| Something two pages need, with RydCo logic | `src/features/<name>/` |
| A reusable part with no RydCo logic | `src/components/` |
| A new pilot area, link or email | `src/config/` |
| An animation's CSS | `src/styles/motion/<name>.css`, imported in `globals.css` |

Search for `[FILL]` to find every placeholder still waiting for a real value.

## Conventions

- **Files:** components are `PascalCase.tsx`, everything else is `kebab-case`. URL folders are `kebab-case`.
- **No barrel files.** Import from the file itself (`@/components/ui/Button`), so a client component can't accidentally
  pull in everything beside it.
- **Server by default.** Add `"use client"` only to the file that needs the browser, as low in the tree as possible.
- **CSS:** Tailwind classes in the markup. Custom CSS only for tokens and animations. The order in `globals.css` is
  deliberate, and Tailwind scans `src/` only.
- **Colour:** the palette is closed. New colours go through `src/styles/tokens.css` and DESIGN.md.

## Before pushing

```bash
npm run lint
npm run typecheck
npm run build
```
