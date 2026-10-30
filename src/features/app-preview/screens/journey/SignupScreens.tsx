import type { ReactNode } from "react";
import { Car } from "@/components/brand/Car";
import { toneOn } from "@/components/brand/tones";
import { Badge } from "@/components/ui/Badge";
import { Tick } from "@/components/ui/icons";
import { Card, Field, Heading, Label, MapBackdrop, Pin, Primary, RouteCard, Segments, SkySheet, TextAction } from "./SkySheet";

// Signing up, in the app's order. Text and example details are the app's own (app-mocks/index (1).html).

export function SplashScreen() {
  return (
    <>
      <MapBackdrop />
      <svg viewBox="0 0 390 790" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-x-0 -top-[41px] h-[calc(100%+41px)] w-full">
        <path d="M-10 404 C90 380 300 380 400 404 L400 844 L-10 844Z" className="fill-surface" opacity=".7" />
        <path d="M-10 470 C120 430 260 436 400 470 L400 844 L-10 844Z" className="fill-brand" opacity=".6" />
        <path d="M-20 418 C80 392 300 392 410 420" className="fill-none stroke-screen" strokeWidth="16" strokeLinecap="round" />
        <path d="M415 412 C300 388 110 392 64 452 C34 494 78 560 128 560 L312 560" pathLength={1} className="journey-draw fill-none stroke-accent-strong" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="195" y="536" textAnchor="middle" className="fill-ink font-display text-[66px] font-extrabold tracking-tight">
          RydCo
        </text>
        <g className="journey-fade">
          <Car tone={toneOn.brand} transform="translate(312 560) scale(1.35)" />
        </g>
        <text x="195" y="606" textAnchor="middle" className="fill-ink-soft text-[16px] font-medium">
          Starting with a pilot in Lahore
        </text>
      </svg>
    </>
  );
}

function Person() {
  return (
    <g transform="translate(50 84) scale(.85)">
      <circle cy="-34" r="7" className="fill-ink" />
      <path d="M-9 0v-16a9 9 0 0 1 18 0V0z" className="fill-accent" />
      <rect x="6" y="-16" width="7" height="11" rx="2" className="fill-screen" />
    </g>
  );
}

function RoleCard({ title, needs, chosen = false, picture }: { title: string; needs: string[]; chosen?: boolean; picture: ReactNode }) {
  return (
    <div className={`relative overflow-hidden rounded-[18px] ${chosen ? "bg-panel shadow-[inset_0_0_0_2px_var(--color-accent-strong)]" : "bg-screen"}`}>
      <svg viewBox="0 0 160 92" aria-hidden="true" className="block h-auto w-full">
        <rect width="160" height="92" className="fill-brand" />
        {picture}
      </svg>
      {chosen && (
        <span aria-hidden="true" className="absolute top-1.5 right-1.5 grid h-5 w-5 place-items-center rounded-full action text-[11px]">
          <Tick />
        </span>
      )}
      <div className="p-2.5">
        <p className="font-display text-[14px] leading-tight font-bold">{title}</p>
        <ul className="mt-1.5 grid gap-1 text-[11px] leading-tight text-ink-soft">
          {needs.map((n) => (
            <li key={n} className="flex items-start gap-1">
              <Tick className="mt-px text-accent-strong" />
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function RoleScreen() {
  return (
    <SkySheet
      step="Account · 01 / 05"
      progress={20}
      foot={
        <>
          <Primary>Continue</Primary>
          <TextAction>I already have an account</TextAction>
        </>
      }
    >
      <Heading lead="You can add the other later.">How would you like to travel?</Heading>
      <div className="grid grid-cols-2 gap-2">
        <RoleCard
          chosen
          title="I want a ride"
          needs={["Phone number", "No documents", "About 2 min"]}
          picture={
            <>
              <path d="M0 68 C40 56 90 70 160 60 V92 H0z" className="fill-panel" />
              <path d="M58 76 C72 62 84 54 94 44" className="fill-none stroke-accent" strokeWidth="2.2" strokeDasharray="3 5" strokeLinecap="round" />
              <Pin x={94} y={44} />
              <Person />
            </>
          }
        />
        <RoleCard
          title="I'm offering a ride"
          needs={["CNIC · Selfie", "Licence · Vehicle", "24h review"]}
          picture={
            <>
              <path d="M0 64 C50 56 110 68 160 60 V92 H0z" className="fill-panel" />
              <path d="M-10 84 C50 78 110 82 170 76" className="fill-none stroke-screen" strokeWidth="9" />
              <g transform="translate(66 80) scale(1.5)">
                <Car tone={toneOn.brand} />
              </g>
            </>
          }
        />
      </div>
      <p className="text-[11.5px] leading-snug text-ink-soft">This isn&rsquo;t sign-up or approval yet.</p>
    </SkySheet>
  );
}

const zones: [string, number, number, number, number, boolean][] = [
  ["Mall Road", 178, 42, 42, 20, true],
  ["Gulberg III", 200, 106, 44, 24, true],
  ["Arfa Tech", 124, 148, 38, 20, true],
  ["Model Town", 186, 198, 42, 22, true],
  ["DHA Ph 5", 288, 170, 44, 28, true],
  ["Johar Town", 56, 190, 44, 24, true],
  ["Township", 126, 240, 38, 18, false],
  ["Bahria Town", 44, 250, 44, 18, false],
];

export function PilotCoverageScreen() {
  return (
    <SkySheet step="Account · 02 / 05" progress={40} foot={<Primary>Continue</Primary>}>
      <Heading lead="Lahore pilot. Check your route first.">Where RydCo runs</Heading>
      <Card className="overflow-hidden">
        <svg viewBox="0 0 350 272" aria-hidden="true" className="block h-auto w-full">
          {zones.map(([name, x, y, rx, ry, ok]) => (
            <ellipse key={name} cx={x} cy={y} rx={rx} ry={ry} className={ok ? "fill-panel stroke-accent-strong" : "fill-none stroke-ink-soft"} strokeWidth="1.5" strokeDasharray={ok ? undefined : "4 4"} />
          ))}
          <path d="M288 182 Q206 196 124 156" pathLength={1} className="journey-draw fill-none stroke-accent-strong" strokeWidth="4" strokeLinecap="round" />
          <circle cx="288" cy="182" r="6" className="fill-screen stroke-ink" strokeWidth="3" />
          <circle cx="124" cy="156" r="6.5" className="fill-accent-strong stroke-screen" strokeWidth="2.5" />
          {zones.map(([name, x, y]) => (
            <text key={name} x={x} y={y - 4} textAnchor="middle" className="fill-ink text-[13px] font-semibold">
              {name}
            </text>
          ))}
        </svg>
        <div className="flex gap-3 px-2.5 pb-2 text-[11px] font-semibold text-ink-soft">
          <span className="flex items-center gap-1">
            <i className="h-2.5 w-2.5 rounded-full bg-panel shadow-[inset_0_0_0_1px_var(--color-accent-strong)]" /> In pilot
          </span>
          <span className="flex items-center gap-1">
            <i className="h-2.5 w-2.5 rounded-full shadow-[inset_0_0_0_1px_var(--color-ink-soft)]" /> Not yet
          </span>
        </div>
      </Card>
      <Card className="p-2.5 text-[12px] leading-snug">
        <Badge>In pilot</Badge>
        <p className="mt-1.5">
          <b>DHA Phase 5 → Arfa Tech Park</b> is covered.
        </p>
      </Card>
    </SkySheet>
  );
}

const keys = [
  ["1", ""],
  ["2", "ABC"],
  ["3", "DEF"],
  ["4", "GHI"],
  ["5", "JKL"],
  ["6", "MNO"],
  ["7", "PQRS"],
  ["8", "TUV"],
  ["9", "WXYZ"],
  ["", ""],
  ["0", "+"],
];

function Keypad() {
  return (
    <div aria-hidden="true" className="grid grid-cols-3 gap-1">
      {keys.map(([k, letters], i) =>
        k ? (
          <span key={k} className="grid h-[30px] place-items-center rounded-[10px] bg-screen text-[14px] leading-none font-semibold">
            <span className="text-center">
              {k}
              {letters && <small className="block text-[6.5px] leading-tight tracking-widest text-ink-soft">{letters}</small>}
            </span>
          </span>
        ) : (
          <span key={`blank${i}`} />
        ),
      )}
      <span className="grid h-[30px] place-items-center text-[13px] font-semibold">⌫</span>
    </div>
  );
}

export function MobileNumberScreen() {
  return (
    <SkySheet
      step="Account · 03 / 05"
      progress={60}
      foot={
        <>
          <Primary>Send code</Primary>
          <Keypad />
        </>
      }
    >
      <Heading lead="We'll text you a 6-digit code.">Your mobile number</Heading>
      <Card className="flex h-11 items-stretch overflow-hidden shadow-[inset_0_0_0_1.5px_var(--color-accent-strong)]">
        <span className="flex items-center px-3 text-[12.5px] font-semibold text-ink-soft">+92</span>
        <span className="flex items-center border-l border-line px-3 text-[16px] font-medium tabular-nums">0300-1234567</span>
      </Card>
      <p className="text-[11.5px] text-ink-soft">Never shown to other users.</p>
      {["I accept the Terms of Use", "I've read the Privacy Policy"].map((t) => (
        <p key={t} className="flex items-center gap-2 text-[12px] leading-tight">
          <span aria-hidden="true" className="grid h-4 w-4 flex-none place-items-center rounded-[5px] action text-[10px]">
            <Tick />
          </span>
          {t}
        </p>
      ))}
    </SkySheet>
  );
}

export function SmsCodeScreen() {
  return (
    <SkySheet step="Account · 04 / 05" progress={80} foot={<Keypad />}>
      <Heading
        lead={
          <>
            Sent to <b className="font-semibold text-ink tabular-nums">0300-1234567</b>. <span className="font-semibold text-accent-deep">Change number</span>
          </>
        }
      >
        Enter the 6-digit code
      </Heading>
      <div className="grid grid-cols-6 gap-1.5">
        {["4", "8", "2", "9", "1", "0"].map((d, i) => (
          <span key={i} className="grid h-11 place-items-center rounded-[10px] bg-screen text-[18px] font-semibold tabular-nums">
            <span className="journey-digit" style={{ animationDelay: `${0.2 + i * 0.13}s` }}>
              {d}
            </span>
          </span>
        ))}
      </div>
      <p className="flex justify-between text-[11.5px] text-ink-soft tabular-nums">
        <span>Expires in 4:52</span>
        <span>Resend in 0:52</span>
      </p>
      <p className="text-[11.5px] text-ink-soft">Code 1 of 5 this hour</p>
    </SkySheet>
  );
}

export function ProfileScreen() {
  return (
    <SkySheet step="Account · 05 / 05" progress={100} foot={<Primary>Continue</Primary>}>
      <Heading lead="Others see only your first name and area.">About you</Heading>
      <div className="flex items-center gap-2.5">
        <span aria-hidden="true" className="grid h-11 w-11 flex-none place-items-center rounded-full bg-brand font-display text-[14px] font-extrabold">
          AM
        </span>
        <span className="leading-tight">
          <b className="block text-[12.5px]">Profile photo</b>
          <span className="text-[11.5px] text-ink-soft">Helps at pickup.</span>
        </span>
      </div>
      <Field label="Full name" value="Ayesha Malik" />
      <div className="grid gap-1">
        <Label>Gender</Label>
        <Segments options={["Woman", "Man", "Rather not say"]} chosen="Woman" />
      </div>
      <Field label="Home or pickup area" value="DHA Phase 5" />
      <Field label="Usual destination" value="Arfa Software Technology Park" />
    </SkySheet>
  );
}

export function RiderReadyScreen() {
  return (
    <SkySheet step="Rider · 01 / 03" progress={33} foot={<Primary>See how rides work</Primary>}>
      <RouteCard height={130} />
      <div className="flex items-center gap-2.5">
        <span aria-hidden="true" className="grid h-8 w-8 flex-none place-items-center rounded-full bg-trust text-[15px] text-on-trust">
          <Tick />
        </span>
        <p className="font-display text-[19px] leading-[1.1] font-extrabold tracking-tight">Your rider profile is ready</p>
      </div>
      <Card className="flex items-center gap-2.5 p-2.5">
        <span aria-hidden="true" className="grid h-10 w-10 flex-none place-items-center rounded-full bg-brand font-display text-[14px] font-extrabold">
          AM
        </span>
        <span className="min-w-0 leading-tight">
          <b className="block font-display text-[14px]">Ayesha M.</b>
          <span className="block text-[11.5px] text-ink-soft">Near DHA Phase 5 → Arfa Tech Park</span>
          <span className="mt-1 block text-[11px]">
            <Badge>Phone verified</Badge>
          </span>
        </span>
      </Card>
      <p className="text-[12px] text-ink-soft">Every driver is document-checked.</p>
    </SkySheet>
  );
}

export function BeforeYouRideScreen() {
  return (
    <SkySheet step="Rider · 02 / 03" progress={66} foot={<Primary>Find a ride</Primary>}>
      <Heading>Before you ride</Heading>
      <Card className="p-3">
        <div className="flex items-center justify-center gap-1 rounded-[12px] bg-panel p-3 text-[10.5px] font-semibold">
          <span className="rounded-full bg-screen px-2 py-1">Request</span>
          <i className="h-0.5 w-2.5 bg-line" />
          <span className="rounded-full bg-screen px-2 py-1 text-accent-deep">Pending</span>
          <i className="h-0.5 w-2.5 bg-line" />
          <span className="rounded-full bg-trust px-2 py-1 text-on-trust">Confirmed</span>
        </div>
        <p className="mt-2 font-display text-[14px] font-bold">Requests</p>
        <p className="text-[12px] leading-snug text-ink-soft">Nothing is booked until the driver accepts.</p>
      </Card>
      <div aria-hidden="true" className="flex gap-1">
        <i className="h-1.5 w-4 rounded-full bg-accent-strong" />
        {[1, 2, 3].map((n) => (
          <i key={n} className="h-1.5 w-1.5 rounded-full bg-line" />
        ))}
      </div>
      <Card className="p-3">
        <p className="flex items-center gap-2 text-[13px] font-bold">
          Trusted contact <span className="rounded-full bg-panel px-2 py-0.5 text-[10.5px] font-semibold">Optional</span>
        </p>
        <p className="text-[12px] text-ink-soft">Shares your trips live.</p>
        <div className="mt-2 flex gap-1.5">
          <span className="grid h-9 flex-1 place-items-center rounded-full bg-panel text-[12.5px] font-semibold">Add contact</span>
          <span className="grid flex-1 place-items-center text-[12px] font-semibold text-accent-deep">Add later</span>
        </div>
      </Card>
    </SkySheet>
  );
}
