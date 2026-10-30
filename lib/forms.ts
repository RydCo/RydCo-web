import { mailto, site } from "./site";

// The site's forms (waitlist, driver sign-up, contact) post to a Google Apps Script web app that adds a row
// to RydCo's Google Sheet and emails rydcoapp@gmail.com. See scripts/google-apps-script.js and the README.
// If site.formEndpoint is null, submitting opens an email with the same details instead.

export type FormKind = "waitlist" | "driver" | "contact";

const subjects: Record<FormKind, string> = {
  waitlist: "Join the RydCo waitlist",
  driver: "I want to drive with RydCo",
  contact: "A message from the RydCo website",
};

export type Fields = Record<string, string>;

// "sent": stored by the form endpoint. "mailed": no endpoint yet, so the visitor's email app opened instead.
// The honeypot field ("website") is never put in the email.
export async function sendForm(kind: FormKind, fields: Fields, labels: Record<string, string>): Promise<"sent" | "mailed"> {
  if (!site.formEndpoint) {
    const lines = Object.entries(fields)
      .filter(([k, v]) => v && k in labels)
      .map(([k, v]) => `${labels[k] ?? k}: ${v}`)
      .join("\n");
    window.location.href = mailto(subjects[kind], `Assalam o alaikum RydCo,\n\n${lines}\n`);
    return "mailed";
  }
  // A form-encoded POST is a "simple" request, so the browser sends it without a CORS preflight.
  // Apps Script can't return CORS headers we can rely on, so the response is opaque: a resolved fetch means
  // it reached Google, and a network failure throws so the form can show an error.
  await fetch(site.formEndpoint, {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams({ kind, page: window.location.pathname, ...fields }),
  });
  return "sent";
}

// Accepts 03001234567, 0300-1234567, +92 300 1234567 and 923001234567; returns 0300-1234567, or null if it isn't a
// Pakistani mobile number.
export function normalizePhone(value: string): string | null {
  const digits = value.replace(/[^\d+]/g, "");
  const m = digits.match(/^(?:\+92|0092|92|0)?(3\d{9})$/);
  if (!m) return null;
  const local = `0${m[1]}`;
  return `${local.slice(0, 4)}-${local.slice(4)}`;
}
