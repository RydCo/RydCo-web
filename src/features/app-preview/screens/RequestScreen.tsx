import { Header, Body } from "./parts";

export function RequestScreen() {
  return (
    <>
      <Header title="Request a seat" />
      <Body>
        <div className="grid grid-cols-2 rounded-full bg-screen p-1 text-center text-[12.5px] font-semibold">
          <span className="rounded-full py-2">This date</span>
          <span className="rounded-full action py-2">Repeating</span>
        </div>
        <div className="flex gap-1.5">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
            <span key={d} className="grid h-9 flex-1 place-items-center rounded-full bg-accent-strong text-[12px] font-semibold text-on-accent">
              {d}
            </span>
          ))}
        </div>
        <div className="rounded-[18px] bg-screen p-3.5">
          <p className="font-semibold">Leave home by 7:36</p>
          <p className="text-ink-soft">Walk 4 min to Akbar Chowk</p>
          <p className="mt-2 font-semibold">Arrive ~8:20</p>
          <p className="text-[11.5px] text-ink-soft">Estimated from road routing</p>
        </div>
        <div className="rounded-[18px] bg-panel p-3.5">
          <p className="font-display text-[16px] font-bold">Request pending</p>
          <p>Hamza replies by 6:30 pm.</p>
          <p className="mt-1 text-[12px] text-ink-soft">No seat is held until confirmed.</p>
        </div>
      </Body>
    </>
  );
}
