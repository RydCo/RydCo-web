import { Badge } from "@/components/ui/Badge";
import { Header, Body, PrimaryButton } from "./parts";

export function ChecklistScreen() {
  const steps: [string, "done" | "now" | "todo"][] = [
    ["Identity", "done"],
    ["Live selfie", "done"],
    ["Driving licence", "now"],
    ["Vehicle", "todo"],
    ["Submit", "todo"],
  ];
  return (
    <>
      <Header title="Become a driver" />
      <Body>
        <div className="rounded-[20px] bg-screen p-4">
          <p className="flex justify-between font-semibold">
            <span>Your checks</span>
            <span className="tabular-nums">2 of 5</span>
          </p>
          <span className="mt-2 block h-2 overflow-hidden rounded-full bg-panel">
            <span className="block h-full w-2/5 rounded-full bg-accent" />
          </span>
        </div>
        <ol className="grid gap-1.5">
          {steps.map(([s, state]) => (
            <li key={s} className={`flex items-center justify-between rounded-[14px] px-3 py-2.5 ${state === "now" ? "bg-panel" : "bg-screen"}`}>
              <span className="font-semibold">{s}</span>
              {state === "done" ? <Badge>Done</Badge> : state === "now" ? <span className="text-[12px] font-semibold">Next</span> : null}
            </li>
          ))}
        </ol>
        <p className="text-[12px]">Prepare your commute while we review. Publish rides after approval.</p>
        <PrimaryButton>Continue</PrimaryButton>
      </Body>
    </>
  );
}
