// Writes the security headers from src/config/security.mjs into vercel.json. Vercel reads vercel.json before it
// builds, so the file has to be committed up to date: `pnpm dev` rewrites it, and `pnpm build` (with --check)
// stops if it is out of step with the config.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { securityHeaders } from "../src/config/security.mjs";

const file = join(dirname(fileURLToPath(import.meta.url)), "..", "vercel.json");
const current = readFileSync(file, "utf8");
const config = JSON.parse(current);
const headers = [{ source: "/(.*)", headers: securityHeaders() }];
// The check compares the headers as data, not the file's text: Vercel rewrites vercel.json onto one line before it
// builds, and a Windows checkout ends its lines with \r\n.
const inStep = JSON.stringify(config.headers) === JSON.stringify(headers);
config.headers = headers;
const next = `${JSON.stringify(config, null, 2)}\n`;

if (process.argv.includes("--check")) {
  if (inStep) console.log("Security headers up to date.");
  else {
    console.error("vercel.json is out of step with src/config/security.mjs. Run `pnpm headers` and commit vercel.json.");
    process.exit(1);
  }
} else if (next === current) console.log("Security headers up to date.");
else {
  writeFileSync(file, next);
  console.log("Security headers written to vercel.json.");
}
