import { site } from "@/config/site";
import type { SendState } from "@/lib/send-form";

// What happened to a send: nothing to say while it's idle or sending, and "sent" gets the form's own thank-you.
export function FormStatus({ state }: { state: SendState }) {
  if (state === "error") {
    return (
      <p role="alert" className="mt-4 rounded-[20px] bg-surface p-4 font-semibold">
        That didn&rsquo;t send. Check your connection and try again, or email us at {site.email}.
      </p>
    );
  }
  // No form endpoint is set, so the visitor's email app opened with their details instead.
  if (state === "mailed") {
    return (
      <p role="status" className="mt-4 rounded-[20px] bg-surface p-4 font-semibold">
        Your email app should open with your details filled in. Press send and you&rsquo;re done.
      </p>
    );
  }
  return null;
}
