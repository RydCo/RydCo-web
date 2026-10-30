# RydCo website — design system

The public website for RydCo: carpooling for daily commuters in Pakistan, starting with a pilot in Lahore.
This file is the rulebook for every page. When something here disagrees with a reference or a skill,
this file wins. When this file is silent, the order is: RydCo brand rules → BlaBlaCar (carpool patterns)
→ Airbnb (feel) → Uber (structure).

---

## 1. What the site must do

| Audience | Their question | The page answers with | Goal |
| --- | --- | --- | --- |
| Riders | Can I use this, is it safe, what does it cost? | Home, How it works, Safety | Download the app or join the waitlist |
| Drivers | Can I earn back my fuel cost safely? | Drivers | Sign up as a driver |
| Organizations | Can this solve our employees' commute? | Organizations (part a) | Contact us for a pilot |
| Sponsors and partners | Is this team worth backing? | Organizations (part b) | Contact us |

The homepage serves riders first. Every other audience is one click away from it.

**Positioning in one line:** affordable, friendly shared commuting, with safety as a strong supporting promise.

---

## 2. The idea

> On this site, **RydCo's own route line with the small car** becomes **the one shape that runs the whole system.**

The route line is RydCo's logo: a ink line with round ends that travels, turns, and finishes as the
underline of the wordmark, with the car parked at its end. A daily commute is a line you draw again every morning,
and carpooling means two lines becoming one. So the line is the only motif, used at four scales:

1. **Large:** the hero. The line draws itself across the brand field, passes behind the phone and ends under "Starting with a pilot in Lahore" (the signature moment).
2. **Section scale:** one full-width band where the line crosses the page once, between the rider half and the
   "who it's for" half of the homepage. It also drives the "How it works" diagram, where scattered dots join into one line.
3. **Component scale:** every button is a pill (a short piece of road with round ends). Image and screen crops use
   the same rounded-capsule shape. List bullets are a small dot with a short line.
4. **Text scale:** a dot with a short line marks pickup and drop-off in trip cards, the same mark the app uses.

No other decorative shape appears anywhere: no blobs, circles or patterns.

**The live thing:** *"Is my commute covered?"* Pick where you start and where you're headed from the pilot
areas, and the page answers "Covered" or "Not covered yet". The CTA then links to the waitlist. This comes straight
from the app's own "Check your commute?" screen. Without JavaScript it falls back to a plain list of pilot areas.
*(Needs the real pilot area list. See §11.)*

---

## 3. Colour

The site uses the app's palette, taken from its Sky Sheet mockup, so the two read as one product. All colours live in one
file, `src/config/theme.mjs`, and are named for their job, not their look. To change the theme, edit that file or point
`activeTheme` at another theme. The site's colours and gradients, the favicon and the link-preview image all follow
(`scripts/build-theme.mjs` generates them), and the build stops if a theme's text wouldn't be readable.

| Role | Value | App token | Job |
| --- | --- | --- | --- |
| `surface` | #FFF6EE | `--ground` | Page background, light cards, light text on ink. |
| `brand` | #FFE3CF | `--cyan` | Hero and big colour blocks, where the gradient ends up. |
| `panel` | #FBE3D4 | `--accent-wash` | Soft sections, cards, chips. |
| `screen` | #FFFFFF | `--surface` | Form fields, secondary buttons, the inside of phone mockups. |
| `line` | #E3C6AF | `--line-2` | The edge of a secondary button. |
| `accent` | #DB6A33 | `--accent` | The app's orange: the top of the button gradient, bullets, stars, map routes. |
| `accent-strong` | #C2551F | none | Where button labels start sitting. Route lines on brand or panel, selected states. |
| `accent-deep` | #A8430F | none | The foot of the button gradient, text links, ticks. |
| `on-accent` | #FFFFFF | `--on-accent` | Text on the button gradient. |
| `ink` | #3A2A22 | `--ink` | All text, the wordmark and car, dark sections. |
| `ink-deep` | #2A201A | `--device` | Where dark sections deepen to, and the phone mockup's body. |
| `ink-soft` | #7A6151 | `--ink-2` | Secondary text only. |
| `trust` | #1F7A4A | `--ok` | Only for "verified" or "confirmed" signals. Never decoration or buttons. |
| `sos` | #C8362E | `--sos` | Only for SOS. |

**Why two extra oranges.** The app's button is white text on #DB6A33, which is 3.43:1, and readable text needs 4.5:1. So the
site's button keeps that exact orange along its top edge and deepens to `accent-strong` and `accent-deep`, and the label sits
on those. The same fix would help the app.

### Gradients

Defined once in `src/styles/gradients.css`, with every stop a theme colour.

- `action`: every primary button and selected state.
- `field-brand`: hero and big colour blocks, from surface into brand.
- `field-panel`: soft sections.
- `field-ink`: dark sections and the footer.
- `text-sun`: orange headline words, display size only.

### Buttons

One set, in `src/components/ui/button-styles.ts`, used on every ground. Don't add a variant for a new background.

- `primary`: the `action` gradient with white text. One per group.
- `secondary`: white with a thin `line` edge and ink text, beside a primary.
- `ghost`: an underlined text link.

### Contrast (the current theme)

The build checks these for whichever theme is active.

| Pair | Ratio | Use |
| --- | --- | --- |
| ink on surface / brand / panel | 12.8 / 11.2 / 11.1:1 | All body text |
| surface or brand on ink | 12.8 / 11.2:1 | Text and highlights on dark sections |
| on-accent on accent-strong / accent-deep | 4.55 / 6.04:1 | Button labels (measured at 4.64:1 or better on the real gradient) |
| accent-deep on surface | 5.66:1 | Text links |
| accent on surface / ink | 3.21 / 3.99:1 | Marks only (3:1 for graphics). Never small text. |
| accent-strong on brand | 3.72:1 | Route lines, and `text-sun` headlines at display size |
| ink-soft on surface / panel | 5.38 / 4.66:1 | Secondary text |
| on-trust on trust / on-sos on sos | 5.33 / 5.22:1 | Badges and SOS |

### Rules
- Proportions on a typical page: surface about 50%, brand 25% (in big blocks), ink 15% (dark sections, footer), panel 10%.
- **No opacity tints of the theme colours as flat fills.** Use the theme's colours, or a gradient from `gradients.css`.
- **Only one primary look.** A brand field gets the same orange button as everywhere else.
- **`accent` is too light for small text** and for marks on brand or panel. Use `accent-deep` for text and `accent-strong` for marks.
- Only the theme's colours exist: Tailwind's default palette is removed. No black and no pure white page grounds.
- Surfaces are separated by a step in tone (surface → brand → panel → ink), never by lines.

---

## 4. Type

Two families, the same ones the app uses, so site and app feel like one product. Self-hosted through
`next/font/google`, so no request goes to Google at runtime.

- **Urbanist** (display): the wordmark, headings and big numbers. Weights 700 and 800.
- **Figtree** (text): body, buttons, labels. Weights 400, 500 and 600.

Five sizes, no more:

| Step | Size | Face / weight | Leading | Tracking |
| --- | --- | --- | --- | --- |
| Display (h1) | clamp(44px, 7.5vw, 112px) | Urbanist 800 | 0.95 | -0.035em |
| Heading (h2) | clamp(32px, 4.2vw, 60px) | Urbanist 800 | 1.02 | -0.025em |
| Title (h3, card titles) | clamp(20px, 1.6vw, 24px) | Urbanist 700 | 1.2 | -0.01em |
| Body | 18px (17px under 400px) | Figtree 400 | 1.55 | 0 |
| Small | 14px | Figtree 500 | 1.45 | 0 |

- Headlines fit in **two lines or fewer at every width**. About 32 characters is safe.
- Left-aligned. At most one centred moment per page.
- Body text is full ink at 17px or more. `ink-soft` is only for secondary notes.
- No uppercase letter-spaced labels, no monospace, no italic or coloured "accent word" inside a headline.

---

## 5. Shape, space, depth

- **Buttons and chips:** fully round pills (from the route line). Height 52px for main buttons and 44px minimum for any tap target.
- **Surfaces** (cards, phone screens, image crops): one radius, **28px**, the same family as the app's 24–30px sheets.
  Small chips and badges are pills.
- **Phone frame:** ink body, 44px outer radius, the screen inside at 34px. No notch drawing, no reflections.
- **Grid:** 12 columns, max width 1200px, outer margins 16px on phones and 32px on desktop. The two margins always match.
- **Section gap:** 96px on phones, 160px on desktop. The gap inside a section is always smaller than the gap between sections.
- **Depth:** mostly flat. Primary buttons carry one soft shadow in their own colour. Things that truly float (mobile
  menu, dropdown) get one soft shadow. Nothing else.
- Gradients only from `gradients.css`. No glass or blur. No hairline dividers or 1px outlined boxes (secondary buttons and
  form fields excepted).

---

## 6. Motion (motion level 4 of 10)

One loud moment, everything else quiet.

**The signature: the route line (homepage hero only).**
- The line enters from the right edge of the brand field, passes behind the phone, loops round the pilot label and
  underlines it, as the logo's line underlines the wordmark. The car rides its tip and parks at the end. The label is
  visible from the first paint.
- Hero phone: leans back in space and rises in once (0.9s), then steps through a rider's whole journey as an app tour
  (see below), 2.2s a screen: from the splash and sign-up to paying the driver, 15 screens rebuilt from the app mock in
  its order and used nowhere else on the site (`src/features/app-preview/screens/journey`). Each acts out its one
  moment when it comes up: a route draws, the code's digits fill in, the "accepted" notification drops in. The tour
  has a thin progress bar with back, next and pause buttons, since 15 dots wouldn't fit.
- Total about **1.7s**, starting about 120ms after first paint. Easing: cubic in-out.
- Built as one inline SVG driven by a tiny inline script (`stroke-dashoffset` for the line, `getPointAtLength` for the
  car) that runs while the page is still parsing. No animation library, no wait for the app's JavaScript.
- The h1, supporting line and button are **visible from the first paint**. They never wait for the animation.
- It plays once per visit, never loops, and never replays on scroll.

**Everything else:**
- Section entrance: heading, then text, then picture, each rising 16px with a fade, staggered about 70ms, once,
  triggered by `IntersectionObserver`. If JavaScript fails, content is visible (it is hidden only when the script has added a class).
- Hover, press and focus feedback on every button, link and card: about 150ms, transform and colour only.
- "Who it's for" list: pointing at or focusing a row swaps the phone preview beside it (240ms crossfade, pure CSS
  with `:has()`). On phones the rows show without previews.
- "Many into one" (home, How RydCo works): the motif's second, quieter telling. Once half of it is on screen it plays
  once, about 2.2s: the homes appear, each solo route draws to the meeting point, the shared line draws out, and the
  car drives off with its three riders trailing behind, ending on the still picture. Pure CSS started by the same
  observer (`data-play`); the page loads with the finished picture and only holds it back once the observer runs.
- Safety board (home): each tile marked `play` acts its feature out once when half of it is on screen (same
  `data-play` observer): the four driver checks go from pending to trust green one by one, the women-only switch
  slides on, the five stars pop in, "Sharing live" sends out one ring.
- App tour (How it works hero, wide screens): one phone steps through the app's screens every 3.6s with a 500ms slide. The active dot fills as a progress bar. Pauses on hover, off screen and
  with its pause button (WCAG 2.2.2); dots jump to a screen.
- How it works rail: tied to scrolling (scroll-driven CSS). The line fills down to the middle of the screen and each
  stop fills as it's reached. Without scroll-driven animations the rail is drawn in full.
- Route band: the car rides the band's own path (`offset-path`) from left to right while the band crosses the screen,
  tilting with the curve. Without scroll-driven animations it stays parked in the middle.
- Sent: after any form is sent, a short route draws from a dot, the car parks at its end, and the thank-you rises in
  (about 1s).
- No parallax, cursor effects, auto-playing video, scroll-jacking or looping background motion.

**`prefers-reduced-motion: reduce`:** the hero shows the finished line, underline and car, and the phone with its
finished screen, with no drawing. "Many into one", the safety board, the rail and the Sent route show their finished state, the band's car
stays parked, and the app tour starts paused (its screens swap without sliding). Entrances become instant.
Crossfades become cuts.

---

## 7. Density and layout variance

- **Visual density 3 of 10 (airy):** one idea per section, one strong headline, lots of surface around it. A section that
  needs a long explanation gets cut, not squeezed.
- **Design variance 6 of 10:** neighbouring sections never share a layout. Asymmetric splits (5/7, 7/5) are inside the
  grid, never in the frame. No rows of identical icon cards.

---

## 8. Components (in `components/`)

| Component | What it is |
| --- | --- |
| `Navbar` | Surface bar, sticky with a solid background (no blur). Ink wordmark left; links: How it works · Safety · Drivers · Organizations; one pill action: "Join the waitlist" or "Get the app". On phones a menu button opens a full-width sheet. |
| `Footer` | Ink field. The full logo lockup (route line + car + wordmark) set large in brand and surface, then link columns, contact line, "Lahore pilot", copyright, legal links. |
| `Button` | Pill. Variants: `primary` (the `action` gradient), `secondary` (white with a thin edge), `ghost` (underlined text). The same three on every ground. |
| `Section` | Sets the ground (`surface`, `tint`, `brand`, `ink`), section padding, max width, and the entrance motion for its children. |
| `PhoneFrame` | Ink device frame holding an app screen built in HTML/CSS at real size, or a real screenshot later. Screen contents follow the app's real screens. |
| `RouteLine` | The SVG motif. Modes: `hero` (animated signature), `lockup` (static logo for the footer and OG image), `band` (full-width crossing), `mark` (small pickup-to-drop-off dot-and-line). |
| `TripCard` | The BlaBlaCar-pattern trip summary: driver first name, rating, specific badges, pickup → drop-off with the route mark, times, seats left, Rs per seat. Used only as a clearly labelled example. |
| `Dropdown` | The one dropdown, used by the hero and every form (`src/components/forms/Dropdown.tsx`). Replaces the native select so it looks the same everywhere: a white floating list with rows that highlight in `panel` (as in the app's place list) and a tick on the chosen one. Area lists are grouped into "In the pilot" and "Not covered yet". Works with the keyboard, including typing a name to jump to it, and opens upward when there's no room below. |
| `Badge` | Trust-green pill with a tick for checks that really happen ("Phone verified", "CNIC reviewed", "Licence checked", "Vehicle checked"). Neutral tint pill for everything else. |
| `HeroRouteCheck` | The live thing (§2) as the hero's main action: "I start in" and "I'm headed to" in one surface pill joined by the route (start dot → line → car; on phones the line runs down the left), the main button, and the "Covered / Not covered yet" answer underneath. The chosen route is shared with `WaitlistForm` (`src/features/commute/commute-store.ts`), and the button scrolls to the waitlist with the cursor in the name field. |
| `WaitlistForm` | The live thing (§2) joined to the waitlist: start and destination with a live "Covered / Not covered yet" answer, then name, mobile number and ride / drive / both. A route picked in the hero is already filled in. |
| `DriverForm`, `ContactForm` | Driver sign-up and the contact form (topic picker, preselected from `?topic=`). All three forms post to a Google Sheet (see `infra/google-apps-script/forms.js`) and fall back to a pre-filled email if `formEndpoint` is null. Visible labels, inline errors tied with `aria-describedby`, a honeypot against spam, surface pill fields on a tint panel. |

---

## 9. Page plans

### Home (riders first)
1. **Hero:** brand field, full width, in two columns. Left: h1 "Your commute, in good company.", one line saying what
   RydCo is, then the route check (`HeroRouteCheck`) with the primary action (waitlist or app) and a secondary "Driving
   to work? Offer a ride" link to Drivers. The task comes first, as on Uber and Airbnb. Right: a tilted phone touring
   a rider's journey from sign-up to settling up (`AppTour` with the `journey` screens, in the app's Sky Sheet layout),
   with "Names and prices are examples" under it. Under both, the route line ends beneath "Starting with a pilot in Lahore". On phones
   the columns stack, with the phone after the check.
2. **What it is:** one statement on surface: RydCo matches people going the same way every day so they share the car and
   split the fuel cost. Small app fragments sit inline in the sentence (a seat chip, a Rs-per-seat chip, a
   "Phone verified" badge).
3. **How it works:** "Many into one". Scattered dots (everyone driving alone) are pulled into one route line (one shared car).
   Under it, three steps in an `<ol>`, each named by its verb: *Request · Ride · Split*. They follow the app's real flow:
   request a seat, the driver confirms; meet at the pickup point; pay your share to the driver directly.
4. **Is my commute covered?** The live thing, on an panel field, with a phone showing the app's coverage screen.
5. **Safety:** a board of enlarged real app elements on flat tiles: verified badges, the women-only rides toggle, "Numbers stay hidden",
   trip sharing with a trusted contact, "Report anytime". Each has a one-line caption. Links to the Safety page.
6. **Route band:** the line crosses the page once, from riders to everyone else.
7. **Who it's for:** four rows (Riders · Drivers · Organizations · Partners), each a question and a link, with a phone or
   picture preview that changes as you point at a row.
8. **Get the app / waitlist:** a 50/50 split. A phone frame with the app's welcome screen ("Assalam o alaikum. I'm RydCo.")
   on one side; on the other the heading, one line, and two actions (rider and driver).
9. **Footer.**

### Organizations and partners (structure from Uber's business pages)
- (a) **For companies:** the problem in their words (commute cost, parking, late arrivals, employee safety) → what RydCo
  does about each, one line per problem → how a pilot works with them (an `<ol>` of 4 steps) → what we need from them →
  "Talk to us about a pilot" (mailto with subject filled in).
- (b) **For sponsors and partners:** the daily-commute problem in Pakistan (with sources, or no numbers at all) → what
  RydCo is doing → the Lahore pilot (only real facts) → "Partner with us" (contact form). The team section is left
  out for now, at the founders' request.

### Safety · Drivers · How it works · Contact · Privacy · Terms
- **Safety:** each check named exactly as the app names it, and what it does and doesn't mean (taken from the app's "Why?" sheets).
- **Drivers:** "Earn back your fuel cost." What you need (CNIC, live selfie, licence, vehicle, reviewed within 24 hours),
  how the share is worked out, how you get paid (directly, by Cash, JazzCash, NayaPay or bank), sign-up action.
- **How it works:** the full rider flow as phone screens: choose a role → check coverage → phone number → request → ride → settle up.
- **Contact:** "Assalam o alaikum. Let's talk." mailto links by audience. No form.
- **Privacy and Terms:** a simple heading structure with a banner: "Draft, to be reviewed by a lawyer."

---

## 10. Words

- Warm, simple, friendly English. Short sentences. One idea at a time, like the app.
- Headings 6 words or fewer where possible. One supporting line.
- No buzzwords: no "revolutionize", "seamless", "solutions", "empower", "next-gen" or "ecosystem".
- Copy bank (from the app): "Assalam o alaikum. I'm RydCo." · "Your commute, in good company." · "Lahore pilot" ·
  "Request, don't book." · "Numbers stay hidden." · "Split the cost." · "Report anytime." · "Riders pay you directly."

### Honesty rules (carried over from the app's own rules)
- **Never invent** user numbers, ride counts, savings figures, testimonials, reviews, partner logos, awards or press.
- Only describe features you confirm exist (§11). Anything unconfirmed shows a visible placeholder like `[Add real screenshot]`.
- Say "Phone verified", **never** "Identity verified". Say "CNIC reviewed", **never** "NADRA verified".
- RydCo **suggests** the share and **never processes payments**. Riders pay the driver directly.
- RydCo is **cost-sharing**. Never "taxi", "fare" or "earn money". Drivers *earn back their fuel cost*.
- Women-only rides use **self-declared** gender. Never call it verified.
- Price examples (e.g. "Rs 245 alone · Rs 180 with two") appear only labelled "Example" and only once you confirm the formula.

### SEO and accessibility
- Every page: its own `title` ("Page · RydCo") and description, one `h1`, Open Graph image (the logo lockup on brand),
  canonical URL. `sitemap.xml` and `robots.txt` are generated at build.
- Meaningful `alt` text. Decorative SVG is `aria-hidden`.
- Keyboard: skip link, logical order, menu and live thing fully usable without a mouse.
- Focus: 3px ink outline with a 3px offset on light grounds; surface outline on ink; ink outline on brand.
- Tested at 375px first. Target Lighthouse mobile performance 90+: no animation libraries, self-hosted fonts, no images
  above about 150KB, everything below the fold lazy-loaded.

---

## 11. Open items (needed before or while building)

1. **App status:** live on Play Store (link?) or a waitlist (form link?). This decides every main button.
2. **Real features:** which of these exist today? Phone verification · CNIC review · live selfie check · licence check ·
   vehicle check · women-only rides · trusted contact / trip sharing · hidden phone numbers + in-app chat · report button ·
   SOS · fuel-cost split · repeating weekday rides · payment methods (Cash, JazzCash, NayaPay, Bank/Raast).
3. **Pilot areas:** the real list for the coverage check (the mock uses Johar Town, DHA Phase 5, Gulberg III, Model Town,
   Garden Town, Faisal Town → Arfa Technology Park, Gulberg Main Boulevard, Mall Road, Liberty Market).
4. **Contact email**, and the **domain**, for canonical URLs, sitemap and OG.
5. **Team** for the partners section: names, roles, one line each (or a placeholder).
6. **Photos:** we have none. Options: (a) your own photos (best), (b) a few credited photos of Lahore streets and commutes from
   open collections, shown only as the city, never as RydCo users, or (c) none, only app screens and the route line.
   Recommended: (b) now, swapped for (a) later.
7. Approval of the derived `ink-soft` text tone and the ink button on brand fields (§3).

---

## 12. What we took from each reference

### RydCo app mocks (`app-mocks/v8.html`)
| Took | Left behind |
| --- | --- |
| The wordmark "RydCo" (Urbanist 800, tight tracking, ink) and the splash route line that becomes its underline, with the car at the end | Dusty lavender (#EADBD0), honey (#C98A12 and its tints), peach mist #FFF0E6, SOS red |
| Urbanist + Figtree, so the site matches the app | The app's dark theme (the site is light, with ink sections) |
| The idea of an brand field with ink ink (the splash) | The small orange circle on beige (brand is used in big blocks instead) |
| Copy and tone: "Assalam o alaikum. I'm RydCo.", "Your commute, in good company.", one short idea per line | The chat-bubble layout (fine in the app, wrong for a website) |
| The real flow: choose a role → pilot coverage → phone sign-up → request → driver confirms → ride → settle up | Mock names, phone numbers and prices as if they were real |
| Specific badge names and the "never say" wording rules | — |
| Screens to rebuild inside `PhoneFrame` | — |

### BlaBlaCar (`DESIGN.md` in design-reference) — carpool patterns only
- **Took:** how a trip is shown: pickup → drop-off on a small route rail, times beside places, **seats left**, **price per seat**
  as the one big figure, driver first name + rating in the title line, and small specific verification badges on the profile.
  "One question per screen" for the How it works steps.
- **Left:** all of its blues, cyan and lime green, GT Eesti, its logo, 12px "soft-technical" radius, its white/navy look, its layouts.

### Uber (`uber.design.md`) — clarity and structure only
- **Took:** short, direct, declarative sentences; the order "problem → what we do → how it works → act"; the business-pitch
  structure for the Organizations page (pain points named, a plain explanation, one clear contact action); pricing shown as an
  explanation, not a pricing table; touch targets of 44px or more; the trip planner as the hero, and the idea of the
  pickup/dropoff rail, drawn in RydCo's own motif (ink dot, route line, car).
- **Left:** black-and-white monochrome, black nav and footer bars, UberMove, square-ish black buttons, grey input fills,
  its exact rail styling and its photography style.

### Airbnb (`airbnb.design.md`) — warmth only
- **Took:** rounded, friendly components (pills, generous radius), soft spacing, flat cards with no outlines, trust signals
  placed right next to the thing they describe, photo-led sections where a real picture exists; the segmented search pill
  (two segments and a button in one rounded bar) as the shape of the hero's route check, without its shadow.
- **Left:** #FF385C and all its reds and greys, Cereal font, the drop shadows, listing grids, hearts and wishlist patterns, logo.

### design-taste-frontend skill (direction "One motif", seed 1864242604)
- **Took:** the one-motif idea (the route line), "Many into one" for How it works, the board of enlarged app elements for Safety,
  "index with preview" for Who it's for, a 50/50 split for the app section, no eyebrows,
  no 01/02/03 numbering, no icon-card rows, two-line headlines, equal margins.
- **Overridden by the brand brief:**
  - The dealt "tabbed folder" hero is replaced by the route-line hero you asked for.
  - The skill bans "surface + orange" palettes as an AI tell; RydCo's real brand is surface + brand, so the brand wins.
  - The skill bans gradients; the team asked for them to match the app, so they're allowed, from `gradients.css` only.
  - The skill dislikes device frames; you asked for `PhoneFrame`, so we use it.
  - The skill wants a busier motion layer; motion stays at your level 4.
  - The skill's "sentence with a blank" email form needs a backend; it becomes a link to the waitlist or a mailto.
  - Its stock fog-and-sea photos don't fit a Lahore commute; they are not used.
