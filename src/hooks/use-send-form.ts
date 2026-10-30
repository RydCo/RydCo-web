import { useState } from "react";
import { sendForm, type Fields, type FormKind, type SendState } from "@/lib/send-form";

// Sends a form and tracks how it went. `labels` names the fields in the email fallback.
export function useSendForm(kind: FormKind, labels: Record<string, string>) {
  const [state, setState] = useState<SendState>("idle");

  async function send(fields: Fields) {
    setState("sending");
    try {
      setState(await sendForm(kind, fields, labels));
    } catch {
      setState("error");
    }
  }

  return { state, send };
}
