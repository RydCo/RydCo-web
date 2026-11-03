// The security headers on every page, in one place. scripts/build-headers.mjs writes them into vercel.json for the
// live site, and next.config.ts sends the same ones from the dev server, so anything they block is blocked locally
// too. Allowing a new outside source (a font, an embed, analytics) means adding it here.
import { mapHost } from "./map.mjs";

// The form endpoint is Google Apps Script, which redirects to googleusercontent.com.
const forms = ["https://script.google.com", "https://script.googleusercontent.com"];

const policy = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  // The map draws tiles and icons from blob: and data: URLs it makes itself, and runs its worker from a blob.
  "img-src": ["'self'", "data:", "blob:"],
  "worker-src": ["'self'", "blob:"],
  "font-src": ["'self'"],
  "media-src": ["'self'"],
  "connect-src": ["'self'", ...forms, mapHost],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
  "base-uri": ["'self'"],
  "object-src": ["'none'"],
};

// The dev server also needs eval (React's error overlay) and its live-reload socket.
const devExtras = { "script-src": ["'unsafe-eval'"], "connect-src": ["ws:"] };

const csp = (extras = {}) =>
  Object.entries(policy)
    .map(([name, sources]) => [name, ...sources, ...(extras[name] ?? [])].join(" "))
    .join("; ");

const others = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Location only for this site's own pages: the map's "Go to my location".
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

export const securityHeaders = (dev = false) => [{ key: "Content-Security-Policy", value: csp(dev ? devExtras : {}) }, ...others];
