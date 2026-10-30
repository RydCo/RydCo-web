import { Tick } from "@/components/ui/icons";
import { Bot, Body } from "./parts";

export function WelcomeScreen() {
  return (
    <>
      <div className="flex flex-none items-center justify-between px-4 pt-1 pb-3">
        <span className="font-display text-[18px] font-extrabold tracking-tight">RydCo</span>
        <span className="text-ink-soft">Lahore pilot</span>
      </div>
      <Body>
        <p className="self-center text-[11.5px] text-ink-soft">Today</p>
        <Bot>Assalam o alaikum. I&rsquo;m RydCo.</Bot>
        <Bot strong>How would you like to travel?</Bot>
        <div className="mt-1 grid gap-2">
          <RoleOption title="I want a ride" needs={["Phone number"]} />
          <RoleOption title="I'm offering a ride" needs={["CNIC", "Live selfie", "Licence", "Vehicle"]} note="Reviewed within 24 hours" />
        </div>
      </Body>
    </>
  );
}

function RoleOption({ title, needs, note }: { title: string; needs: string[]; note?: string }) {
  return (
    <div className="rounded-[20px] bg-panel p-3.5">
      <p className="font-display text-[15px] font-bold">{title}</p>
      <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
        {needs.map((n) => (
          <li key={n} className="flex items-center gap-1 text-[12px]">
            <Tick className="text-accent" />
            {n}
          </li>
        ))}
      </ul>
      {note && <p className="mt-1.5 text-[12px] text-ink-soft">{note}</p>}
    </div>
  );
}
