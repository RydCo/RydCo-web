import { Badge } from "@/components/ui/Badge";
import { Header, Body } from "./parts";

export function DriverProfileScreen() {
  const checks = ["Phone verified", "CNIC reviewed", "Live selfie checked", "Licence checked", "Vehicle checked"];
  return (
    <>
      <Header title="Your driver" />
      <Body>
        <div className="flex flex-col items-center rounded-[20px] bg-white px-4 pt-5 pb-4 text-center">
          <span aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-full bg-apricot font-display text-[26px] font-extrabold">
            H
          </span>
          <p className="mt-2 font-display text-[18px] font-bold">Hamza</p>
          <p className="text-cocoa-soft">Honda City · White</p>
          <p className="mt-1 rounded-full bg-apricot-tint px-3 py-1 text-[12px] font-semibold tabular-nums">LEB-21-4417</p>
        </div>
        <p className="mt-1 font-semibold">Checks</p>
        <ul className="grid gap-1.5">
          {checks.map((c) => (
            <li key={c} className="flex items-center justify-between rounded-[14px] bg-white px-3 py-2">
              <span>{c.replace(/ (verified|reviewed|checked)$/, "")}</span>
              <Badge>{c.replace(/^.* (\w)(\w+)$/, (_m, a: string, b: string) => a.toUpperCase() + b)}</Badge>
            </li>
          ))}
        </ul>
        <p className="mt-1 text-[12px] text-cocoa-soft">All approved before Hamza could publish rides.</p>
      </Body>
    </>
  );
}
