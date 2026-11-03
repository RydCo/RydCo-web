import { Instagram, Mail } from "@/components/ui/icons";
import { site } from "@/config/site";
import { mailto } from "@/lib/mailto";

// The ways to reach RydCo outside the forms, in one place for every page that lists them.
const channels = [
  { name: "Email", detail: site.email, href: mailto(), Icon: Mail, opensTab: false },
  { name: "Instagram", detail: site.instagramHandle, href: site.instagram, Icon: Instagram, opensTab: true },
];

// `icons` is the bare row of icons in the footer, warming to the route's orange on hover (44px to tap). `rows` names
// each channel beside its icon, with the address under it, for a card on a light ground.
const looks = {
  icons: {
    list: "flex gap-6",
    link: "-m-2.5 grid h-11 w-11 place-items-center rounded-full transition-colors duration-200 hover:text-accent",
  },
  rows: {
    list: "grid gap-1",
    link: "-mx-3 flex items-center gap-4 rounded-2xl px-3 py-2.5 transition-colors duration-150 hover:bg-screen",
  },
};

export function ContactLinks({ look, className = "" }: { look: keyof typeof looks; className?: string }) {
  const { list, link } = looks[look];
  return (
    <ul aria-label="Contact RydCo" className={`${list} ${className}`}>
      {channels.map(({ name, detail, href, Icon, opensTab }) => (
        <li key={name}>
          <a
            href={href}
            {...(opensTab ? { target: "_blank", rel: "noopener" } : {})}
            {...(look === "icons" ? { "aria-label": `${name} ${detail}`, title: detail } : {})}
            className={link}
          >
            {look === "icons" ? (
              <Icon size="h-6 w-6" />
            ) : (
              <>
                <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-screen">
                  <Icon />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold">{name}</span>
                  <span className="block truncate text-[15px] text-ink-soft">{detail}</span>
                </span>
              </>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
