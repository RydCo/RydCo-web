import Link from "next/link";
import { Lockup } from "@/components/brand/Lockup";
import { Button } from "@/components/ui/Button";
import { riderCta } from "@/config/cta";
import { nav } from "@/config/navigation";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const cta = riderCta();
  return (
    <header className="sticky top-0 z-40 bg-cream">
      <a
        href="#main"
        className="absolute top-2 left-2 z-50 -translate-y-24 rounded-full bg-cocoa px-5 py-3 font-semibold text-cream focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="wrap flex h-[72px] items-center justify-between gap-6 md:h-[84px]">
        <Link href="/" aria-label="RydCo home" className="-m-2 rounded-xl p-2">
          <Lockup className="w-[104px] md:w-[120px]" />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-4 py-3 font-semibold transition-colors duration-150 hover:bg-apricot-tint"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <Button href={cta.href} external={cta.external} className="min-h-[48px]">
              {cta.label}
            </Button>
          </span>
          <MobileMenu items={nav} cta={cta} />
        </div>
      </div>
    </header>
  );
}
