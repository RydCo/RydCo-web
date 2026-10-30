import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./Button";

type Row = { title: string; line: string; href: string };

// "Index with preview": pointing at or focusing a row swaps the phone beside it (pure CSS, see .who in
// globals.css). Phones show the rows only.
export function WhoFor({ rows, previews }: { rows: Row[]; previews: ReactNode[] }) {
  return (
    <div className="who grid items-center gap-12 lg:grid-cols-12">
      <ul className="lg:col-span-7">
        {rows.map((row, i) => (
          <li key={row.href} data-row={i}>
            <Link
              href={row.href}
              className="group grid grid-cols-[28px_1fr_auto] items-center gap-x-4 rounded-[28px] py-5 transition-colors duration-150 sm:py-6 lg:-mx-6 lg:px-6 lg:hover:bg-apricot-tint"
            >
              <span aria-hidden="true" className="relative mt-[0.6em] h-4 w-7 self-start">
                <span className="who-dot absolute top-0 left-0 h-4 w-4 rounded-full bg-cocoa" />
                <span className="who-line absolute top-1/2 left-3 h-[4px] w-4 -translate-y-1/2 rounded-full bg-cocoa" />
              </span>
              <span>
                <span className="block font-display text-[clamp(28px,3.2vw,44px)] leading-[1.05] font-extrabold tracking-tight">{row.title}</span>
                <span className="mt-1 block">{row.line}</span>
              </span>
              <Arrow className="h-7 w-7 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="relative hidden lg:col-span-5 lg:block" aria-hidden="true">
        {previews.map((p, i) => (
          <div key={i} data-preview={i} className={`who-preview ${i === 0 ? "relative" : "absolute inset-0"}`}>
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}
