"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/config/navigation";

const trim = (path: string) => path.replace(/\/+$/, "") || "/";

// Whether a nav link is the page being read, or a page inside it.
export function useIsCurrent() {
  const here = trim(usePathname());
  return (href: string) => {
    const page = trim(href);
    return page === "/" ? here === "/" : here === page || here.startsWith(`${page}/`);
  };
}

// The header bar's links. The page you're on is marked for screen readers (aria-current) and, on screen, with a short
// stretch of route drawn under its name.
export function NavLinks({ items }: { items: NavItem[] }) {
  const isCurrent = useIsCurrent();
  return (
    <ul className="flex items-center">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={isCurrent(item.href) ? "page" : undefined}
            className="relative block rounded-full px-3.5 py-2.5 text-[16px] font-semibold transition-colors duration-200 after:absolute after:inset-x-3.5 after:bottom-1 after:h-[3px] after:origin-left after:scale-x-0 after:rounded-full after:bg-accent-strong after:transition-transform after:duration-300 after:ease-out-soft hover:bg-panel aria-[current=page]:after:scale-x-100 motion-reduce:after:transition-none"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
