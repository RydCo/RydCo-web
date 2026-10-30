import { Header, Bot, Body } from "./parts";

export function PhoneScreen() {
  return (
    <>
      <Header title="Sign up" />
      <Body>
        <Bot strong>What&rsquo;s your mobile number?</Bot>
        <div className="mt-1 flex h-12 items-center gap-2 rounded-full bg-white px-4">
          <span className="font-semibold">+92</span>
          <span className="tabular-nums">300-1234567</span>
        </div>
        <p className="text-[12px] text-cocoa-soft">Never shown to other users.</p>
        <div className="mt-1 grid gap-2">
          {["I accept the Terms", "I’ve read the Privacy Policy"].map((c) => (
            <span key={c} className="flex items-center gap-2.5">
              <span className="h-5 w-5 flex-none rounded-[6px] border-2 border-cocoa bg-white" />
              {c}
            </span>
          ))}
        </div>
        <span className="mt-auto grid h-11 flex-none place-items-center rounded-full bg-apricot-tint font-semibold text-cocoa-soft">Continue</span>
        <p className="text-center text-[12px] text-cocoa-soft">Next: a 6-digit code by SMS</p>
      </Body>
    </>
  );
}
