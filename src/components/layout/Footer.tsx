import Link from "next/link";
import { Lockup } from "@/components/brand/Lockup";
import { footerNav } from "@/config/navigation";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="on-cocoa bg-cocoa text-cream">
      <div className="wrap pt-24 pb-10 lg:pt-32">
        <Lockup on="cocoa" title="RydCo" className="w-full max-w-[880px]" />
        <p className="mt-8 font-display text-[clamp(24px,2.6vw,36px)] leading-tight font-bold">
          Your commute, <span className="whitespace-nowrap">in good company.</span>
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-12 lg:mt-24">
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 md:col-span-8">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="font-display text-[18px] font-bold text-apricot">{group.title}</h2>
                <ul className="mt-3 grid gap-1">
                  {group.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="inline-block py-1.5 text-[16px] underline-offset-4 hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="md:col-span-4">
            <h2 className="font-display text-[18px] font-bold text-apricot">Say hello</h2>
            <ul className="mt-3 grid gap-1 text-[16px]">
              <li>
                <a href={`mailto:${site.email}`} className="inline-block py-1.5 underline underline-offset-4">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener" className="inline-block py-1.5 underline underline-offset-4">
                  Instagram {site.instagramHandle}
                </a>
              </li>
              <li className="py-1.5">Starting with a pilot in {site.city}</li>
            </ul>
          </div>
        </div>

        <p className="mt-16 text-[14px]">© {new Date().getFullYear()} RydCo.</p>
      </div>
    </footer>
  );
}
