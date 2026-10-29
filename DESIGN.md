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

The route line is RydCo's logo: a cocoa line with round ends that travels, turns, and finishes as the
underline of the wordmark, with the car parked at its end. A daily commute is a line you draw again every morning,
and carpooling means two lines becoming one. So the line is the only motif, used at four scales:

1. **Huge:** the hero. The line draws itself across an apricot field and ends under the wordmark (the signature moment).
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

Six colours. Nothing else, except one derived text tone (marked below).

| Token | Hex | Job |
| --- | --- | --- |
| `apricot` | #EA6A2A | Brand colour. Hero field, big colour blocks, highlights. Used boldly, in whole sections. |
| `apricot-deep` | #C24E15 | Main buttons (white text) on light grounds. Links on cream. |
| `cocoa` | #2C1E18 | All text, the logo, dark sections, buttons on an apricot field. |
| `cream` | #FFF8F3 | Page background. |
| `apricot-tint` | #FCE3D3 | Soft section backgrounds, cards on cream, input fills. |
| `trust` | #1F7A5A | Only for "verified" or "confirmed" signals: badges, ticks. Never decoration or buttons. |
| `cocoa-soft` *(derived, needs your OK)* | #6B5A52 | Secondary text only (captions, footnotes). The same tone the app uses. |

**White (#FFFFFF)** is used only as text on deep apricot, cocoa or trust, and as the inside of a phone screen.

### Contrast (checked)

| Pair | Ratio | Use |
| --- | --- | --- |
| cocoa on cream | 15:1 | All body text |
| cocoa on apricot | 5.0:1 | Text on the hero and on apricot blocks (AA, any size) |
| white on apricot-deep | 4.8:1 | Button labels (AA) |
| apricot-deep on cream | 4.5:1 | Text links (AA, just) |
| trust on cream / white on trust | 5.0 / 5.3:1 | Verified badges |
| cocoa-soft on cream | 6.2:1 | Secondary text |
| apricot on cocoa | 5.0:1 | Highlights in dark sections |
| ~~white on apricot~~ | 3.2:1 | **Never.** Use cocoa text on apricot. |

### Rules
- Proportions on a typical page: cream about 50%, apricot 25% (in big blocks), cocoa 15% (dark sections, footer), tint 10%.
- **No opacity tints of the oranges.** A 20% apricot-deep over apricot is a new orange. Use the six colours flat.
- **On an apricot field,** the primary button is cocoa with cream text (deep apricot on apricot has too little edge contrast).
  Everywhere else the primary button is deep apricot with white text.
- No blue, purple, yellow, beige or any other orange. No black and no pure white page grounds.
- Surfaces are separated by a step in tone (cream → tint → apricot → cocoa), never by lines or shadows.

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
- Body text is full cocoa at 17px or more. `cocoa-soft` is only for secondary notes.
- No uppercase letter-spaced labels, no monospace, no italic or coloured "accent word" inside a headline.

---

## 5. Shape, space, depth

- **Buttons and chips:** fully round pills (from the route line). Height 52px for main buttons and 44px minimum for any tap target.
- **Surfaces** (cards, phone screens, image crops): one radius, **28px**, the same family as the app's 24–30px sheets.
  Small chips and badges are pills.
- **Phone frame:** cocoa body, 44px outer radius, the screen inside at 34px. No notch drawing, no reflections.
- **Grid:** 12 columns, max width 1200px, outer margins 16px on phones and 32px on desktop. The two margins always match.
- **Section gap:** 96px on phones, 160px on desktop. The gap inside a section is always smaller than the gap between sections.
- **Depth:** flat. No shadows on anything at rest. Only things that truly float (mobile menu, dropdown) get one soft
  shadow: `0 24px 60px -24px rgba(44,30,24,.38)`.
- No gradients, glass or blur. No hairline dividers or 1px outlined boxes (form fields excepted).

---

## 6. Motion (motion level 4 of 10)

One loud moment, everything else quiet.

**The signature: the route line (homepage hero only).**
- The cocoa line enters from the right edge of the apricot field, sweeps across, and turns into the underline under the
  wordmark. The car rides its tip and parks at the end. The wordmark letters fade in as the line arrives.
- Total about **1.8s**, starting about 200ms after first paint. Easing: cubic in-out for the line, ease-out for the letters.
- Built as one inline SVG: `stroke-dashoffset` in CSS for the line, CSS `offset-path` for the car. A tiny inline script
  with `getPointAtLength` is the fallback for browsers without `offset-path`. No animation library.
- The h1, supporting line and button are **visible from the first paint**. They never wait for the animation.
- It plays once per visit, never loops, and never replays on scroll.

**Everything else:**
- Section entrance: heading, then text, then picture, each rising 16px with a fade, staggered about 70ms, once,
  triggered by `IntersectionObserver`. If JavaScript fails, content is visible (it is hidden only when the script has added a class).
- Hover, press and focus feedback on every button, link and card: about 150ms, transform and colour only.
- "Who it's for" list: pointing at a row swaps the phone preview beside it (240ms crossfade). On touch screens each row shows its preview inline.
- No parallax, cursor effects, auto-playing video, scroll-jacking or looping background motion.

**`prefers-reduced-motion: reduce`:** the hero shows the finished logo lockup (line, underline, car, wordmark) with no
drawing. Entrances become instant. Crossfades become cuts.

---

## 7. Density and layout variance

- **Visual density 3 of 10 (airy):** one idea per section, one strong headline, lots of cream around it. A section that
  needs a long explanation gets cut, not squeezed.
- **Design variance 6 of 10:** neighbouring sections never share a layout. Asymmetric splits (5/7, 7/5) are inside the
  grid, never in the frame. No rows of identical icon cards.

---

## 8. Components (in `components/`)

| Component | What it is |
| --- | --- |
| `Navbar` | Cream bar, sticky with a solid background (no blur). Cocoa wordmark left; links: How it works · Safety · Drivers · Organizations; one pill action: "Join the waitlist" or "Get the app". On phones a menu button opens a full-width sheet. |
| `Footer` | Cocoa field. The full logo lockup (route line + car + wordmark) set large in apricot and cream, then link columns, contact line, "Lahore pilot", copyright, legal links. |
| `Button` | Pill. Variants: `primary` (deep apricot / white), `onApricot` (cocoa / cream), `secondary` (tint / cocoa), `ghost` (cocoa text, underline on hover). Renders as `<a>` or `<button>`. |
| `Section` | Sets the ground (`cream`, `tint`, `apricot`, `cocoa`), section padding, max width, and the entrance motion for its children. |
| `PhoneFrame` | Cocoa device frame holding an app screen built in HTML/CSS at real size, or a real screenshot later. Screen contents follow the app's real screens. |
| `RouteLine` | The SVG motif. Modes: `hero` (animated signature), `lockup` (static logo for the footer and OG image), `band` (full-width crossing), `mark` (small pickup-to-drop-off dot-and-line). |
| `TripCard` | The BlaBlaCar-pattern trip summary: driver first name, rating, specific badges, pickup → drop-off with the route mark, times, seats left, Rs per seat. Used only as a clearly labelled example. |
| `Badge` | Trust-green pill with a tick for checks that really happen ("Phone verified", "CNIC reviewed", "Licence checked", "Vehicle checked"). Neutral tint pill for everything else. |
| `CoverageCheck` | The live thing (§2). Two selects plus an answer, with a no-JS fallback list. |

---

## 9. Page plans

### Home (riders first)
1. **Hero:** apricot field, full width. The route line draws and ends under the wordmark. h1 "Your commute, in good company."
   One line saying what RydCo is, a primary action (waitlist or app), a secondary "Offer a ride" link to Drivers.
2. **What it is:** one statement on cream: RydCo matches people going the same way every day so they share the car and
   split the fuel cost. Small app fragments sit inline in the sentence (a seat chip, a Rs-per-seat chip, a
   "Phone verified" badge).
3. **How it works:** "Many into one". Scattered dots (everyone driving alone) are pulled into one route line (one shared car).
   Under it, three steps in an `<ol>`, each named by its verb: *Request · Ride · Split*. They follow the app's real flow:
   request a seat, the driver confirms; meet at the pickup point; pay your share to the driver directly.
4. **Is my commute covered?** The live thing, on an apricot-tint field, with a phone showing the app's coverage screen.
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
  RydCo is doing → the Lahore pilot (only real facts) → the team → "Partner with us" (mailto).

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
- Every page: its own `title` ("Page · RydCo") and description, one `h1`, Open Graph image (the logo lockup on apricot),
  canonical URL. `sitemap.xml` and `robots.txt` are generated at build.
- Meaningful `alt` text. Decorative SVG is `aria-hidden`.
- Keyboard: skip link, logical order, menu and live thing fully usable without a mouse.
- Focus: 3px cocoa outline with a 3px offset on light grounds; cream outline on cocoa; cocoa outline on apricot.
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
7. Approval of the derived `cocoa-soft` text tone and the cocoa button on apricot fields (§3).

---

## 12. What we took from each reference

### RydCo app mocks (`app-mocks/v8.html`)
| Took | Left behind |
| --- | --- |
| The wordmark "RydCo" (Urbanist 800, tight tracking, cocoa) and the splash route line that becomes its underline, with the car at the end | Dusty lavender (#EADBD0), honey (#C98A12 and its tints), peach mist #FFF0E6, SOS red |
| Urbanist + Figtree, so the site matches the app | The app's dark theme (the site is light, with cocoa sections) |
| The idea of an apricot field with cocoa ink (the splash) | The small orange circle on beige (apricot is used in big blocks instead) |
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
  explanation, not a pricing table; touch targets of 44px or more.
- **Left:** black-and-white monochrome, black nav and footer bars, UberMove, square-ish black buttons, grey input fills,
  its pickup/dropoff rail styling and its photography style.

### Airbnb (`airbnb.design.md`) — warmth only
- **Took:** rounded, friendly components (pills, generous radius), soft spacing, flat cards with no outlines, trust signals
  placed right next to the thing they describe, photo-led sections where a real picture exists.
- **Left:** #FF385C and all its reds and greys, Cereal font, the search-bar hero, listing grids, hearts and wishlist patterns, logo.

### design-taste-frontend skill (direction "One motif", seed 1864242604)
- **Took:** the one-motif idea (the route line), "Many into one" for How it works, the board of enlarged app elements for Safety,
  "index with preview" for Who it's for, a 50/50 split for the app section, no gradients, no shadows at rest, no eyebrows,
  no 01/02/03 numbering, no icon-card rows, two-line headlines, equal margins.
- **Overridden by the brand brief:**
  - The dealt "tabbed folder" hero is replaced by the route-line hero you asked for.
  - The skill bans "cream + orange" palettes as an AI tell; RydCo's real brand is cream + apricot, so the brand wins.
  - The skill dislikes device frames; you asked for `PhoneFrame`, so we use it.
  - The skill wants a busier motion layer; motion stays at your level 4.
  - The skill's "sentence with a blank" email form needs a backend; it becomes a link to the waitlist or a mailto.
  - Its stock fog-and-sea photos don't fit a Lahore commute; they are not used.
