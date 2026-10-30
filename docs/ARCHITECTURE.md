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
│   │   ├── app-preview/         Phone frame, app tour, the rebuilt app screens, motion graphics scenes
│   │   └── trips/               The trip card
│   ├── components/          Shared parts that know nothing about RydCo's features
│   │   ├── ui/                  Button, Badge, Section, PageHero, icons
│   │   ├── forms/               Text field, dropdown, submit button, thank-you panel
│   │   ├── layout/              Navbar, mobile menu, footer, scroll observer
│   │   └── brand/               Logo, route line, car, hero animation
│   ├── config/              Facts that change: the theme, site details, pilot areas, links, navigation
│   ├── hooks/               Shared React hooks
│   ├── lib/                 Plain helpers: sending forms, phone numbers, mailto
│   └── styles/              Generated theme, base styles, utilities, one file per animation
├── public/                  Files served as they are, including rendered motion graphics in motion/
├── scripts/                 Build steps: build-theme before, flatten-segments after `next build`; motion/render.mjs
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

## Changing the theme

Everything visual starts in `src/config/theme.mjs`. Change a colour, or point `activeTheme` at another theme, and run
`npm run dev` or `npm run build`. `scripts/build-theme.mjs` then regenerates:

- `src/styles/theme.generated.css`: the colour and radius tokens Tailwind uses
- `src/app/icon.svg`: the favicon
- `public/og.png`: the link-preview image

The browser bar colour reads the theme directly. The `apricot` theme is the app's own palette, so keep the two in step. The build fails with a clear message if a theme's text wouldn't be
readable. Gradients are in `src/styles/gradients.css`, built from the same colours, so they follow too. Don't edit the generated
files, and don't write a hex colour anywhere else: use a role such as `bg-brand` or `text-ink-soft`. Every button look is
in `src/components/ui/button-styles.ts`. Commit the generated files along with the theme change. Motion graphics are
videos, so they don't follow on their own: run `npm run motion` as well.

## Motion graphics

Motion graphics are real pages, filmed into video. Playwright opens a scene in a browser and steps its animations to the
exact time of each frame, then FFmpeg encodes the frames. Timing can't drift or drop frames, and the same scene gives the
same video every run. Because a scene uses the site's own components and colours, it matches the site.

The site itself needs none of this. It only plays the finished files in `public/motion/`, so Vercel doesn't need FFmpeg,
and only the person rendering needs the setup, once:

```bash
npm install
npx playwright install chromium
winget install Gyan.FFmpeg                      # macOS: brew install ffmpeg
code --install-extension ms-playwright.playwright   # optional, for VS Code
```

Then `npm run motion` renders every scene, `npm run motion -- two-rides` renders one, and `--no-build` reuses the last
scene build. Commit the files it writes to `public/motion/`: a WebM, an MP4 for browsers without VP9, and a poster. Re-render
whenever a scene, its screens or the theme change, because nothing else updates the video.

To add a scene:

1. Build it in `src/features/app-preview/motion/`. Put every animation on one timeline with `element.animate()` and a
   delay, then call `runClock(duration)` from `clock.ts`. Don't use CSS animations, timers or `Date.now()`: the clock can't
   step those.
2. Give it a route ending in `page.motion.tsx`. That ending keeps it out of the real site, since Next only sees it in
   the motion build.
3. Add it to `scenes` in `scripts/motion/render.mjs`.
4. Show the result with `<MotionVideo name="..." />`.

To preview a scene while working, build with `MOTION_RENDER=1` and open its route from `.motion-build`: it plays in a loop.

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
| A colour or theme | `src/config/theme.mjs` |
| An animation's CSS | `src/styles/motion/<name>.css`, imported in `globals.css` |
| A motion graphic | See [Motion graphics](#motion-graphics) |

Search for `[FILL]` to find every placeholder still waiting for a real value.

## Conventions

- **Files:** components are `PascalCase.tsx`, everything else is `kebab-case`. URL folders are `kebab-case`.
- **No barrel files.** Import from the file itself (`@/components/ui/Button`), so a client component can't accidentally
  pull in everything beside it.
- **Server by default.** Add `"use client"` only to the file that needs the browser, as low in the tree as possible.
- **CSS:** Tailwind classes in the markup. Custom CSS only for tokens and animations. The order in `globals.css` is
  deliberate, and Tailwind scans `src/` only.
- **Colour:** the palette is closed. Only the roles in `src/config/theme.mjs` exist.

## Before pushing

```bash
npm run lint
npm run typecheck
npm run build
```
