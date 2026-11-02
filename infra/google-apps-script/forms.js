/**
 * RydCo website forms → Google Sheet + email.
 *
 * This runs inside Google, not on the website. Setup (about 10 minutes):
 *   1. In the rydcoapp@gmail.com Google Drive, create a Google Sheet called "RydCo sign-ups".
 *   2. In the sheet: Extensions → Apps Script. Replace the code there with this whole file. Save.
 *   3. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone. Deploy, and allow access.
 *   4. Copy the Web app URL (ends in /exec), put it in formEndpoint in src/config/site.ts, then redeploy.
 *
 * Each form gets its own tab (waitlist, driver, contact), created on the first submission.
 * After editing this file later, use Deploy → Manage deployments → Edit → New version, so the URL stays the same.
 */

const NOTIFY = "rydcoapp@gmail.com";

const FORMS = {
  waitlist: { title: "Waitlist", fields: ["name", "phone", "email", "role", "from", "to", "covered"] },
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
  } finally {
    lock.releaseLock();
  }

  const lines = form.fields.map((f, i) => `${f}: ${values[i] || "-"}`).join("\n");
  const reply = [p.reply, p.email].find((v) => /^[^@\s]+@[^@\s.]+(\.[^@\s.]+)+$/.test(v || ""));
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
