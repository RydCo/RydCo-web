import { Header, Body } from "./parts";

export function RequestScreen() {
  return (
    <>
      <Header title="Request a seat" />
      <Body>
        <div className="grid grid-cols-2 rounded-full bg-white p-1 text-center text-[12.5px] font-semibold">
          <span className="rounded-full py-2">This date</span>
          <span className="rounded-full bg-apricot-deep py-2 text-white">Repeating</span>
        </div>
        <div className="flex gap-1.5">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
            <span key={d} className="grid h-9 flex-1 place-items-center rounded-full bg-cocoa text-[12px] font-semibold text-cream">
              {d}
            </span>
          ))}
        </div>
        <div className="rounded-[18px] bg-white p-3.5">
          <p className="font-semibold">Leave home by 7:36</p>
          <p className="text-cocoa-soft">Walk 4 min to Akbar Chowk</p>
          <p className="mt-2 font-semibold">Arrive ~8:20</p>
          <p className="text-[11.5px] text-cocoa-soft">Estimated from road routing</p>
        </div>
        <div className="rounded-[18px] bg-apricot-tint p-3.5">
          <p className="font-display text-[16px] font-bold">Request pending</p>
          <p>Hamza replies by 6:30 pm.</p>
          <p className="mt-1 text-[12px] text-cocoa-soft">No seat is held until confirmed.</p>
        </div>
      </Body>
    </>
  );
}
