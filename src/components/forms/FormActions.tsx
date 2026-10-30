import Link from "next/link";
import type { SendState } from "@/lib/send-form";
import { FormStatus } from "./FormMessages";
import { SubmitButton } from "./SubmitButton";

// The end of a sign-up form: the button, what we do with the details, and how the send went.
export function FormActions({ state, label, note }: { state: SendState; label: string; note: string }) {
  return (
    <>
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <SubmitButton sending={state === "sending"}>{label}</SubmitButton>
        <p className="max-w-[34ch] text-[15px]">
          {note}{" "}
          <Link href="/privacy/" className="underline underline-offset-4">
            Privacy
          </Link>
        </p>
      </div>
      <FormStatus state={state} />
    </>
  );
}
