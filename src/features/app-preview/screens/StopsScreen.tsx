import { Badge } from "@/components/ui/Badge";
import { Header, Body, PrimaryButton } from "./parts";

export function StopsScreen() {
  const stops = [
    { place: "Model Town", time: "7:40", who: "Hamza starts" },
    { place: "Garden Town", time: "7:52", who: "Bilal gets in" },
    { place: "Faisal Town", time: "8:01", who: "Ayesha gets in" },
    { place: "Arfa Software Technology Park", time: "8:20", who: "Everyone arrives" },
  ];
  return (
    <>
      <Header title="Trip detail" />
      <Body>
        <div className="flex items-center gap-2">
          <Badge>Confirmed</Badge>
          <span className="font-semibold">Mon 2 Nov</span>
        </div>
        <ol className="relative mt-2 space-y-4 rounded-[20px] bg-white py-4 pr-4 pl-10 before:absolute before:top-[26px] before:bottom-[26px] before:left-[19px] before:w-[3px] before:bg-cocoa">
          {stops.map((s, i) => (
            <li key={s.place} className="relative">
              <span
                aria-hidden="true"
                className={`absolute top-[3px] -left-[27px] h-[13px] w-[13px] rounded-full ${i === stops.length - 1 ? "border-[3px] border-cocoa bg-white" : "bg-cocoa"}`}
              />
              <span className="flex justify-between gap-2">
                <b className="leading-tight">{s.place}</b>
                <span className="tabular-nums">{s.time}</span>
              </span>
              <span className="text-[12px] text-cocoa-soft">{s.who}</span>
            </li>
          ))}
        </ol>
        <p className="font-semibold">2 of 3 seats filled</p>
        <p className="text-[12px] text-cocoa-soft">Pickup order follows the road.</p>
        <PrimaryButton>Start trip</PrimaryButton>
      </Body>
    </>
  );
}
