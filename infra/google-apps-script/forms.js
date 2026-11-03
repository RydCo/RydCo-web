/** @OnlyCurrentDoc */
// The line above limits this script to the one Sheet it lives in, rather than every Sheet in the Google account.

/**
 * RydCo website forms → Google Sheet + email.
 *
 * This runs inside Google, not on the website. Setup (about 10 minutes):
 *   1. In the rydcoapp@gmail.com Google Drive, create a Google Sheet called "RydCo sign-ups".
 *   2. In the sheet: Extensions → Apps Script. Replace the code there with this whole file. Save.
 *   3. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone. Deploy, and allow access.
 *   4. Copy the Web app URL (ends in /exec), put it in formEndpoint in src/config/forms.mjs, then redeploy.
 *
 * Each form gets its own tab (waitlist, contact), created on the first submission. Drivers sign up on the waitlist too.
 * The old "driver" tab, from when drivers had a form of their own, is left as it was.
 * After editing this file later, use Deploy → Manage deployments → Edit → New version, so the URL stays the same.
 *
 * Anyone can post to a web app, so it checks each submission the way the website's forms do, drops exact repeats, caps
 * how many it saves in an hour, and stops sending notification emails before the account's daily email allowance runs
 * out. Real sign-ups during the pilot are far below these limits, so they only bite when something floods the form.
 */

const NOTIFY = "rydcoapp@gmail.com";

const MAX_PER_HOUR = 200; // submissions saved in an hour; any more are dropped
const REPEAT_MINUTES = 10; // the exact same submission again within this time is dropped
const KEEP_EMAILS = 10; // notification emails stop when the daily allowance falls to this

const EMAIL = /^[^@\s]+@[^@\s.]+(\.[^@\s.]+)+$/;
const filled = (v) => String(v || "").trim() !== "";

// The same checks the website's forms make before sending.
const FORMS = {
  waitlist: {
    title: "Waitlist",
    fields: ["name", "phone", "email", "role", "from", "to", "car", "leave"],
    valid: (p) => filled(p.name) && /^03\d{2}-\d{7}$/.test(p.phone || "") && EMAIL.test(p.email || ""),
  },
  contact: {
    title: "Message",
    fields: ["topic", "name", "reply", "organization", "message"],
    valid: (p) => filled(p.name) && filled(p.reply) && filled(p.message),
  },
};

function doPost(e) {
  const p = (e && e.parameter) || {};

  // The honeypot: people never see this field, bots fill it in.
  if (p.website) return done();

  const form = FORMS[p.kind];
  if (!form || !form.valid(p)) return done();
  const kind = p.kind;
  const values = form.fields.map((f) => clean(p[f]));

  // One submission at a time, so two people signing up together can't overwrite each other's row.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const cache = CacheService.getScriptCache();
    const hour = `count:${Math.floor(Date.now() / 3600000)}`;
    const count = Number(cache.get(hour) || 0);
    const repeat = `seen:${digest([kind, ...values].join("\n"))}`;
    if (count >= MAX_PER_HOUR || cache.get(repeat)) return done();

    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(kind) || book.insertSheet(kind);
    // Rows are written by column name, so a field added later (like the waitlist's email) gets a new column at the end
    // and the rows already in the sheet stay in line.
    const header = sheet.getLastRow() === 0 ? [] : sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
    const missing = ["Received", ...form.fields, "Page"].filter((name) => !header.includes(name));
    if (missing.length) {
      sheet.getRange(1, header.length + 1, 1, missing.length).setValues([missing]);
      header.push(...missing);
      sheet.setFrozenRows(1);
    }
    const row = { Received: new Date(), Page: clean(p.page) };
    form.fields.forEach((f, i) => (row[f] = values[i]));
    sheet.appendRow(header.map((name) => (name in row ? row[name] : "")));

    cache.put(hour, String(count + 1), 3600);
    cache.put(repeat, "1", REPEAT_MINUTES * 60);
  } finally {
    lock.releaseLock();
  }

  // The row is saved either way. Notifications pause before the allowance runs out, so a flood can't use it all up.
  if (MailApp.getRemainingDailyQuota() > KEEP_EMAILS) {
    const lines = form.fields.map((f, i) => `${f}: ${values[i] || "-"}`).join("\n");
    MailApp.sendEmail({
      to: NOTIFY,
      // The role in the subject ("Waitlist (Drive)"), so drivers to call stand out in the inbox.
      subject: `RydCo ${form.title}${p.role ? ` (${oneLine(p.role)})` : ""}: ${oneLine(p.name) || "new"}`,
      body: `${lines}\n\nFrom ${clean(p.page) || "the website"}`,
      replyTo: [p.reply, p.email].find((v) => EMAIL.test(v || "")),
    });
  }

  return done();
}

// Plain text only, capped in length, without control characters, and never a spreadsheet formula.
function clean(value) {
  const text = String(value || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, 2000);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

// For the email subject, which must be a single line.
function oneLine(value) {
  return clean(value).replace(/\s+/g, " ").slice(0, 120);
}

function digest(text) {
  return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text));
}

function done() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
