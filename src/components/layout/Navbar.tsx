import Link from "next/link";
import { Lockup } from "@/components/brand/Lockup";
import { Button } from "@/components/ui/Button";
import { riderCta } from "@/config/cta";
import { nav } from "@/config/navigation";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { ShrinkBar } from "./ShrinkBar";

export function Navbar() {
  const cta = riderCta();
  return (
    <header className="sticky top-0 z-40 pt-3 md:pt-4">
      <a
        href="#main"
        className="absolute top-2 left-2 z-50 -translate-y-24 rounded-full bg-ink px-5 py-3 font-semibold text-surface focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="wrap">
        <ShrinkBar
          logo={
            <Link href="/" aria-label="RydCo home" className="-m-2 block rounded-xl p-2">
              <Lockup className="w-[92px] md:w-[104px]" />
            </Link>
          }
          nav={
            <nav aria-label="Main">
              <NavLinks items={nav} />
            </nav>
          }
          actions={
            <>
              {/* The hero already carries this action, so the bar shows it only once it has gathered on scroll. */}
              <span className="invisible hidden scale-95 opacity-0 transition-[opacity,scale,visibility] duration-300 ease-out-soft group-data-compact/bar:visible group-data-compact/bar:scale-100 group-data-compact/bar:opacity-100 motion-reduce:transition-none sm:block">
                <Button href={cta.href} external={cta.external} size="sm">
                  {cta.label}
                </Button>
              </span>
              <MobileMenu items={nav} cta={cta} />
            </>
          }
        />
      </div>
    </header>
  );
}
