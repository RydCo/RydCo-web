import type { ReactNode } from "react";

// Form controls shared by the waitlist, driver and contact forms. Every control has a visible label,
// and any error or hint is tied to it with aria-describedby.

// One-line fields are pills, like the buttons; the message box keeps the surface radius.
const control = "w-full bg-cream px-5 text-[17px] text-cocoa placeholder:text-cocoa-soft";

type Base = { id: string; label: string; error?: string; hint?: string };

function Described({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  return (
    <>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[15px] font-semibold">
          <span aria-hidden="true">! </span>
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${id}-hint`} className="mt-2 text-[15px] text-cocoa-soft">
          {hint}
        </p>
      )}
    </>
  );
}

const describedBy = (id: string, error?: string, hint?: string) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);

export function TextField({
  id,
  label,
  error,
  hint,
  value,
  onChange,
  type = "text",
  ...rest
}: Base & {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  name: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${control} mt-2 h-[56px] rounded-full ${error ? "outline-3 outline-offset-2 outline-apricot-deep" : ""}`}
        {...rest}
      />
      <Described id={id} error={error} hint={hint} />
    </div>
  );
}

export function TextArea({ id, label, error, hint, value, onChange, ...rest }: Base & { value: string; onChange: (v: string) => void; name: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        rows={5}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${control} mt-2 block min-h-[150px] resize-y rounded-[28px] py-4 ${error ? "outline-3 outline-offset-2 outline-apricot-deep" : ""}`}
        {...rest}
      />
      <Described id={id} error={error} hint={hint} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  name,
}: Base & { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string; name: string }) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      <div className="relative mt-2">
        <select id={id} name={name} value={value} onChange={(e) => onChange(e.target.value)} className={`${control} h-[56px] cursor-pointer appearance-none rounded-full pr-12`}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute top-1/2 right-5 h-5 w-5 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 8 5 5 5-5" />
        </svg>
      </div>
    </div>
  );
}

export function Choice({ legend, name, value, onChange, options }: { legend: string; name: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <fieldset>
      <legend className="font-semibold">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex min-h-[48px] cursor-pointer items-center rounded-full bg-cream px-5 font-semibold transition-colors duration-150 has-[:checked]:bg-cocoa has-[:checked]:text-cream has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-cocoa"
          >
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="sr-only" />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// Invisible to people, tempting to bots. Submissions with it filled are dropped by the Apps Script.
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

export function SubmitButton({ sending, children }: { sending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-apricot-deep px-7 text-[17px] font-semibold text-white transition-[transform,background-color] duration-150 hover:bg-cocoa active:scale-[0.97] disabled:cursor-wait disabled:bg-cocoa-soft motion-reduce:transition-none"
    >
      {sending ? "Sending…" : children}
    </button>
  );
}

export function FormError({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <p role="alert" className="mt-4 rounded-[20px] bg-cream p-4 font-semibold">
      That didn&rsquo;t send. Check your connection and try again, or email us at rydcoapp@gmail.com.
    </p>
  );
}

// Shown when no form endpoint is set yet and the visitor's email app opened with their details instead.
export function MailNote({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <p role="status" className="mt-4 rounded-[20px] bg-cream p-4 font-semibold">
      Your email app should open with your details filled in. Press send and you&rsquo;re done.
    </p>
  );
}

// The thank-you after a form is sent. A short route draws from the dot and the car parks at its end, then the
// message rises in (CSS in globals.css under "Sent"); with reduced motion it all simply appears.
export function Sent({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="rounded-[28px] bg-cream p-7 md:p-9">
      <svg viewBox="0 0 220 40" aria-hidden="true" className="block h-auto w-[176px]">
        <circle cx="8" cy="30" r="7" className="fill-cocoa" />
        <path d="M8 30 H184" pathLength={1} className="sent-line fill-none stroke-cocoa" strokeWidth="6" strokeLinecap="round" />
        <g className="sent-car">
          <g transform="translate(192 30) scale(1.7)">
            <rect className="fill-cocoa" x="-15" y="-10" width="30" height="8" rx="3" />
            <path className="fill-cocoa" d="M-9 -10 L-5 -16 H6 L10 -10Z" />
            <rect className="fill-cream" x="-4" y="-14.5" width="8" height="3.5" rx="1" />
            <circle className="fill-cocoa" cx="-8.5" cy="-1.5" r="3.2" />
            <circle className="fill-cocoa" cx="8.5" cy="-1.5" r="3.2" />
          </g>
        </g>
      </svg>
      <div className="sent-text mt-5">
        <p className="font-display text-[clamp(26px,2.6vw,36px)] leading-tight font-extrabold tracking-tight">{title}</p>
        <div className="mt-3 max-w-[48ch]">{children}</div>
      </div>
    </div>
  );
}
