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
2. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL`: the site's address, e.g. `https://rydco.vercel.app`
   - `NEXT_PUBLIC_FORM_ENDPOINT`: the Google Apps Script URL from "Connect the forms" below
3. Deploy. After changing a variable, redeploy so the site picks it up.

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
rydcoapp@gmail.com. Until this is set up, the forms still work: they open the visitor's email app with their
details filled in.

1. Signed in as rydcoapp@gmail.com, create a Google Sheet named **RydCo sign-ups**.
2. In the sheet, open **Extensions → Apps Script**. Delete the sample code, paste in all of
   [scripts/google-apps-script.js](scripts/google-apps-script.js), and save.
3. Click **Deploy → New deployment**. Choose the type **Web app**. Set **Execute as: Me** and
   **Who has access: Anyone**. Click **Deploy** and allow the permissions Google asks for.
4. Copy the **Web app URL** (it ends in `/exec`).
5. In Vercel, set `NEXT_PUBLIC_FORM_ENDPOINT` to that URL and redeploy.
6. Submit each form once on the live site. You should see a row in the `waitlist`, `driver` and `contact` tabs and
   an email for each.

If you edit the script later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

## Before launch

Search the code for `[FILL]` to find every placeholder: the site address, app store link, pilot areas,
example prices, team photos and roles, and the legal pages, which must be reviewed by a lawyer.
