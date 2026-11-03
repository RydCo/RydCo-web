import { Badge } from "@/components/ui/Badge";
import { allChecks } from "@/config/checks";
import { Header, Body } from "./parts";

export function DriverProfileScreen() {
  return (
    <>
      <Header title="Your driver" />
      <Body>
        <div className="flex flex-col items-center rounded-[20px] bg-screen px-4 pt-5 pb-4 text-center">
          <span aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-full bg-brand font-display text-[26px] font-extrabold">
            H
          </span>
          <p className="mt-2 font-display text-[18px] font-bold">Hamza</p>
          <p className="text-ink-soft">Honda City · White</p>
          <p className="mt-1 rounded-full bg-panel px-3 py-1 text-[12px] font-semibold tabular-nums">LEB-21-4417</p>
        </div>
        <p className="mt-1 font-semibold">Checks</p>
        <ul className="grid gap-1.5">
          {allChecks.map((c) => (
            <li key={c.name} className="flex items-center justify-between rounded-[14px] bg-screen px-3 py-2">
              <span>{c.name}</span>
              <Badge>{c.state}</Badge>
            </li>
          ))}
        </ul>
        <p className="mt-1 text-[12px] text-ink-soft">All approved before Hamza could publish rides.</p>
      </Body>
    </>
  );
}
