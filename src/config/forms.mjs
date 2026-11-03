// The Google Apps Script web app that stores form submissions (setup steps: infra/google-apps-script/forms.js).
// NEXT_PUBLIC_FORM_ENDPOINT on the host overrides it. Set this to null and forms open a pre-filled email instead.
/** @type {string | null} */
export const formEndpoint =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT || "https://script.google.com/macros/s/AKfycby_3pE0DJs0HgZqnKJDvFVrKbcLF7DrZVxq3TXLnsqkqYjjH2bnyQGtQvCxLAPTwEM/exec";

// Where the browser sends a form, for the security headers: the endpoint's own host, and the host Apps Script
// redirects every reply to.
export const formHosts = formEndpoint ? [new URL(formEndpoint).origin, "https://script.googleusercontent.com"] : [];
