// Form controls shared by the waitlist, driver and contact forms. Every control has a visible label,
// and any error or hint is tied to it with aria-describedby.

// One-line fields are pills, like the buttons; the message box keeps the surface radius.
export const control = "w-full bg-surface px-5 text-[17px] text-ink placeholder:text-ink-soft";

export type Base = { id: string; label: string; error?: string; hint?: string };

export function Described({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  return (
    <>
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
    </>
  );
}

export const describedBy = (id: string, error?: string, hint?: string) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);
