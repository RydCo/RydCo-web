import { Header, Bot, Body, PrimaryButton } from "./parts";

export function SharesScreen() {
  return (
    <>
      <Header title="Offer a ride" />
      <Body>
        <Bot strong>Riders&rsquo; shares</Bot>
        <div className="rounded-[20px] bg-screen p-4">
          <p className="text-ink-soft">Worked out for you, 10 km.</p>
          <p className="mt-2 font-display text-[30px] leading-none font-extrabold tracking-tight">Rs 245</p>
          <p className="mt-1">with one rider</p>
          <p className="mt-3 font-display text-[22px] leading-none font-extrabold tracking-tight">Rs 180 each</p>
          <p className="mt-1">with two riders</p>
          <p className="mt-3 text-[11.5px] text-ink-soft">Fuel price locked when you publish.</p>
        </div>
        <Bot strong>How should riders pay you?</Bot>
        <div className="flex flex-wrap gap-1.5">
          {["Cash", "JazzCash", "NayaPay", "Bank / Raast"].map((m, i) => (
            <span key={m} className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ${i < 2 ? "bg-ink text-surface" : "bg-screen"}`}>
              {m}
            </span>
          ))}
        </div>
        <p className="text-[12px] text-ink-soft">Riders pay you directly.</p>
        <PrimaryButton>Publish ride</PrimaryButton>
      </Body>
    </>
  );
}
