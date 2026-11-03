import Link from "next/link";
import { Lockup } from "@/components/brand/Lockup";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { footerNav, legalNav } from "@/config/navigation";
import { site } from "@/config/site";

const link = "inline-block py-1.5 underline-offset-4 hover:underline";

export function Footer() {
  return (
    <footer className="on-ink field-ink text-surface">
      <div className="wrap grid gap-10 py-14 lg:grid-cols-12 lg:items-end lg:py-20">
        <div className="lg:col-span-5">
          <Link href="/" aria-label="RydCo home" className="inline-block rounded-xl">
            <Lockup on="ink" className="w-[168px]" />
          </Link>
          <p className="mt-6 t-title">{site.tagline.text}</p>
          <p className="mt-1">{site.pilotLine}</p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-7 lg:justify-self-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 font-semibold">
            {footerNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:col-span-12">
          <ContactLinks look="icons" />
          <ul className="flex flex-wrap items-center gap-x-6 t-small">
            <li>© {new Date().getFullYear()} RydCo.</li>
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
