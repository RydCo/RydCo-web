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

## Deploy on Vercel

1. Go to https://vercel.com/new and import the **RydCo/RydCo-web** repository. Vercel detects Next.js; the build
   command comes from `vercel.json`.
2. Deploy. No environment variables are needed: the site takes its address from the Vercel project (including a
   custom domain once you add one), and the forms are already connected (see "Connect the forms" below).
   To use a different address, set `NEXT_PUBLIC_SITE_URL`, e.g. `https://rydco.pk`, and redeploy.

The live site is https://rydco-web.vercel.app.

If Vercel won't import the private organization repository on the Hobby plan, deploy from this folder instead:

```bash
npx vercel        # first time: log in and link the project
npx vercel --prod # publish
```

Note: Vercel's Hobby plan is meant for personal, non-commercial projects. For the company's live site, check
Vercel's terms, or use Vercel Pro, Netlify or Cloudflare Pages (their free plans allow commercial use).
`netlify.toml` is included if you switch to Netlify.

## Connect the forms

The waitlist, driver sign-up and contact forms save each submission as a row in a Google Sheet and email
rydcoapp@gmail.com. This is already set up: the script's URL is `formEndpoint` in [lib/site.ts](lib/site.ts).
The steps below are for setting it up again, for example in a different Google account. If `formEndpoint` is
`null`, the forms open the visitor's email app with their details filled in instead.

1. Signed in as rydcoapp@gmail.com, create a Google Sheet named **RydCo sign-ups**.
2. In the sheet, open **Extensions → Apps Script**. Delete the sample code, paste in all of
   [scripts/google-apps-script.js](scripts/google-apps-script.js), and save.
3. Click **Deploy → New deployment**. Choose the type **Web app**. Set **Execute as: Me** and
   **Who has access: Anyone**. Click **Deploy** and allow the permissions Google asks for.
4. Copy the **Web app URL** (it ends in `/exec`).
5. Put that URL in `formEndpoint` in [lib/site.ts](lib/site.ts), or set it as `NEXT_PUBLIC_FORM_ENDPOINT` in
   Vercel, and redeploy.
6. Submit each form once on the live site. You should see a row in the `waitlist`, `driver` and `contact` tabs and
   an email for each.

If you edit the script later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

## Before launch

Search the code for `[FILL]` to find every placeholder: the site address, app store link, pilot areas,
example prices, team photos and roles, and the legal pages, which must be reviewed by a lawyer.
