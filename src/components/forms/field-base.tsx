import type { ReactNode } from "react";

// Form controls shared by the waitlist, driver and contact forms. Every control has a visible label,
// and any error or hint is tied to it with aria-describedby.

// One-line fields are pills, like the buttons; the message box keeps the surface radius.
export const control = "w-full bg-surface px-5 text-[17px] text-ink placeholder:text-ink-soft";

export type Base = { id: string; label: string; error?: string; hint?: string };

const describedBy = (id: string, error?: string, hint?: string) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);

// What a text control needs so its error or hint is announced with it.
export const describedProps = ({ id, error, hint }: Base) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby": describedBy(id, error, hint),
});

export const invalidRing = (error?: string) => (error ? "outline-3 outline-offset-2 outline-accent" : "");

// The label above a control, and any error or hint below it.
export function Field({ id, label, error, hint, children }: Base & { children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[15px] font-semibold">
          <span aria-hidden="true">! </span>
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${id}-hint`} className="mt-2 text-[15px] text-ink-soft">
          {hint}
        </p>
      )}
    </div>
  );
}
