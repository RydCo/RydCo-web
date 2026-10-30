import { Header, Body, PrimaryButton } from "./parts";

export function SettleScreen() {
  return (
    <>
      <Header title="Settle up" back={false} />
      <Body>
        <div className="rounded-[20px] bg-screen p-4">
          <p className="font-display text-[16px] font-bold">Trip complete</p>
          <p className="text-[12px] text-ink-soft">Mon 2 Nov · Akbar Chowk → Arfa Tower gate</p>
          <p className="mt-3 text-[12px] text-ink-soft">Your final share</p>
          <p className="font-display text-[34px] leading-none font-extrabold tracking-tight">Rs 180</p>
        </div>
        <ul className="grid gap-1.5">
          {[
            ["JazzCash", "0300 1234567"],
            ["NayaPay", "0321 7654321"],
            ["Cash", "Pay Hamza in the car"],
          ].map(([m, v]) => (
            <li key={m} className="flex items-center justify-between rounded-[14px] bg-screen px-3 py-2">
              <span>
                <b className="block leading-tight">{m}</b>
                <span className="text-[12px] text-ink-soft tabular-nums">{v}</span>
              </span>
              {m !== "Cash" && <span className="rounded-full bg-panel px-2.5 py-1 text-[12px] font-semibold">Copy</span>}
            </li>
          ))}
        </ul>
        <p className="text-[11.5px] text-ink-soft">RydCo suggests the share but doesn&rsquo;t process payments.</p>
        <PrimaryButton>I sent the payment</PrimaryButton>
      </Body>
    </>
  );
}
