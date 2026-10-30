import type { ReactNode } from "react";

export function SubmitButton({ sending, children }: { sending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-accent px-7 text-[17px] font-semibold text-on-accent transition-[transform,background-color] duration-150 hover:bg-ink active:scale-[0.97] disabled:cursor-wait disabled:bg-ink-soft motion-reduce:transition-none"
    >
      {sending ? "Sending…" : children}
    </button>
  );
}
