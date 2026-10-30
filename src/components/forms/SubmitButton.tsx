import type { ReactNode } from "react";
import { buttonClasses } from "@/components/ui/button-styles";

export function SubmitButton({ sending, children }: { sending: boolean; children: ReactNode }) {
  return (
    <button type="submit" disabled={sending} className={`${buttonClasses("primary")} disabled:cursor-wait disabled:bg-ink-soft disabled:bg-none disabled:shadow-none`}>
      {sending ? "Sending…" : children}
    </button>
  );
}
