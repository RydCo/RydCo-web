import type { ReactNode } from "react";

type Ground = "apricot" | "cocoa" | "tint" | "cream";

const grounds: Record<Ground, string> = {
  apricot: "bg-apricot text-cocoa",
  cocoa: "on-cocoa bg-cocoa text-cream",
  tint: "bg-apricot-tint text-cocoa",
  cream: "bg-cream text-cocoa",
};

// The first screen of every inner page: one h1, one line, the actions, and an optional picture beside them.
export function PageHero({
  ground = "apricot",
  title,
  lead,
  actions,
  aside,
  asideClassName = "",
}: {
  ground?: Ground;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  asideClassName?: string;
}) {
  return (
    <section aria-labelledby="page-title" className={`overflow-x-clip ${grounds[ground]}`}>
      <div className="wrap pt-14 pb-20 md:pt-20 lg:pt-24 lg:pb-28">
        <div className={aside ? "grid items-center gap-14 lg:grid-cols-12 lg:gap-10" : ""}>
          <div className={aside ? "lg:col-span-7" : ""}>
            <h1 id="page-title" className={`t-display ${aside ? "lg:[--display-size:80px]" : ""}`}>
              {title}
            </h1>
            {lead && <p className="mt-7 max-w-[42ch] text-[19px] md:text-[21px]">{lead}</p>}
            {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside && <div className={`lg:col-span-5 ${asideClassName}`}>{aside}</div>}
        </div>
      </div>
    </section>
  );
}
