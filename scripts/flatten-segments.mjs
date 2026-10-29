// Runs after `next build` (see "postbuild" in package.json).
//
// Next.js 16.4 static export writes route segment data as folders, e.g. out/drivers/__next.drivers/__PAGE__.txt,
// but the browser prefetches it as a flat file name, out/drivers/__next.drivers.__PAGE__.txt, and gets a 404.
// Copying each file to the flat name the client asks for fixes the prefetch on every static host.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const out = "out";
let copied = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (!statSync(path).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(path, dir, name);
    else walk(path);
  }
}

function flatten(segmentDir, parent, prefix) {
  for (const name of readdirSync(segmentDir)) {
    const path = join(segmentDir, name);
    if (statSync(path).isDirectory()) {
      flatten(path, parent, `${prefix}.${name}`);
    } else {
      const target = join(parent, `${prefix}.${name}`);
      if (!existsSync(target)) {
        copyFileSync(path, target);
        copied++;
      }
    }
  }
}

if (existsSync(out)) {
  walk(out);
  console.log(`flatten-segments: wrote ${copied} prefetch file(s)`);
}
