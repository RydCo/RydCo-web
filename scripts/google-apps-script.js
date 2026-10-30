/**
 * RydCo website forms → Google Sheet + email.
 *
 * This runs inside Google, not on the website. Setup (about 10 minutes, see README → "Connect the forms"):
 *   1. In the rydcoapp@gmail.com Google Drive, create a Google Sheet called "RydCo sign-ups".
 *   2. In the sheet: Extensions → Apps Script. Replace the code there with this whole file. Save.
 *   3. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone. Deploy, and allow access.
 *   4. Copy the Web app URL (ends in /exec), put it in formEndpoint in lib/site.ts, then redeploy.
 *
 * Each form gets its own tab (waitlist, driver, contact), created on the first submission.
 * After editing this file later, use Deploy → Manage deployments → Edit → New version, so the URL stays the same.
 */

const NOTIFY = "rydcoapp@gmail.com";

const FORMS = {
  waitlist: { title: "Waitlist", fields: ["name", "phone", "role", "from", "to", "covered"] },
  driver: { title: "Driver sign-up", fields: ["name", "phone", "car", "from", "to", "leave"] },
  contact: { title: "Message", fields: ["topic", "name", "reply", "organization", "message"] },
};

function doPost(e) {
  const p = (e && e.parameter) || {};

  // The honeypot: people never see this field, bots fill it in.
  if (p.website) return done();

  const kind = FORMS[p.kind] ? p.kind : "contact";
  const form = FORMS[kind];
  const values = form.fields.map((f) => clean(p[f]));
  if (!values.some((v) => v)) return done();

  // One submission at a time, so two people signing up together can't overwrite each other's row.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(kind) || book.insertSheet(kind);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Received", ...form.fields, "Page"]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([new Date(), ...values, clean(p.page)]);
  } finally {
    lock.releaseLock();
  }

  const lines = form.fields.map((f, i) => `${f}: ${values[i] || "-"}`).join("\n");
  const reply = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.reply || "") ? p.reply : undefined;
  MailApp.sendEmail({
    to: NOTIFY,
    subject: `RydCo ${form.title}: ${clean(p.name) || "new"}`,
    body: `${lines}\n\nFrom ${clean(p.page) || "the website"}`,
    replyTo: reply,
  });

  return done();
}

// Plain text only, capped in length, and never a spreadsheet formula.
function clean(value) {
  const text = String(value || "").trim().slice(0, 2000);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function done() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
