"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { normalizePhone, sendForm } from "@/lib/forms";
import { pilot, riderCta, site } from "@/lib/site";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Choice, FormError, Honeypot, MailNote, SelectField, Sent, SubmitButton, TextField } from "./FormFields";

const OTHER = "Another area";
const labels = { name: "Name", phone: "Phone", role: "I want to", from: "I start in", to: "I'm headed to" };
const roles = { ride: "Ride", drive: "Drive", both: "Ride and drive" } as const;

// The site's one live thing (the app's "Check your commute?" step), joined to the waitlist sign-up.
export function WaitlistForm() {
  const id = useId();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<keyof typeof roles>("ride");
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "mailed" | "error">("idle");

  const start = pilot.starts.find((p) => p.name === from);
  const dest = pilot.destinations.find((p) => p.name === to);
  const picked = Boolean(from && to);
  const covered = Boolean(start?.covered && dest?.covered);
  const live = Boolean(site.playStoreUrl);

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    const tel = normalizePhone(phone);
    const next = {
      name: name.trim() ? undefined : "Add your name.",
      phone: tel ? undefined : "Enter a Pakistani mobile number, like 0300-1234567.",
    };
    setErrors(next);
    if (next.name || next.phone) return;
    setState("sending");
    try {
      const how = await sendForm(
        "waitlist",
        { name: name.trim(), phone: tel!, role: roles[role], from, to, covered: picked ? String(covered) : "", website: trap },
        labels,
      );
      setState(how);
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <Sent title={`You're on the list, ${name.trim().split(" ")[0]}.`}>
        <p>
          We&rsquo;ll message you on {normalizePhone(phone)} when RydCo opens{picked && covered ? ` on ${from} to ${to}` : ""}.
        </p>
      </Sent>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative">
      <p className="font-display text-[22px] font-bold">Is your commute covered?</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <SelectField
          id={`${id}-from`}
          name="from"
          label="I start in"
          value={from}
          onChange={setFrom}
          placeholder="Choose an area"
          options={[...pilot.starts.map((p) => ({ value: p.name, label: p.name })), { value: OTHER, label: OTHER }]}
        />
        <SelectField
          id={`${id}-to`}
          name="to"
          label="I'm headed to"
          value={to}
          onChange={setTo}
          placeholder="Choose an area"
          options={[...pilot.destinations.map((p) => ({ value: p.name, label: p.name })), { value: OTHER, label: OTHER }]}
        />
      </div>

      <div aria-live="polite" className="mt-4 min-h-[40px]">
        {picked &&
          (covered ? (
            <p className="flex flex-wrap items-center gap-3">
              <span className="text-[20px]">
                <Badge>Covered</Badge>
              </span>
              <span>RydCo runs on this route in the pilot.</span>
            </p>
          ) : (
            <p className="flex flex-wrap items-center gap-3">
              <span className="text-[20px]">
                <Badge tone="cream">Not covered yet</Badge>
              </span>
              <span>Join anyway and we&rsquo;ll tell you when it opens.</span>
            </p>
          ))}
      </div>

      {live ? (
        <div className="mt-6">
          <Button href={riderCta().href} external>
            {riderCta().label}
          </Button>
        </div>
      ) : (
        <>
          <p className="mt-6 font-display text-[22px] font-bold">Join the waitlist</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <TextField id={`${id}-name`} name="name" label="Your name" autoComplete="name" value={name} onChange={setName} error={errors.name} required />
            <TextField
              id={`${id}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              label="Mobile number"
              autoComplete="tel"
              placeholder="0300-1234567"
              value={phone}
              onChange={setPhone}
              error={errors.phone}
              required
            />
          </div>
          <div className="mt-5">
            <Choice
              legend="I want to"
              name="role"
              value={role}
              onChange={(v) => setRole(v as keyof typeof roles)}
              options={[
                { value: "ride", label: "Ride" },
                { value: "drive", label: "Drive" },
                { value: "both", label: "Both" },
              ]}
            />
          </div>
          <Honeypot value={trap} onChange={setTrap} />
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <SubmitButton sending={state === "sending"}>Join the waitlist</SubmitButton>
            <p className="max-w-[34ch] text-[15px]">
              We only use your number to tell you about RydCo.{" "}
              <Link href="/privacy/" className="underline underline-offset-4">
                Privacy
              </Link>
            </p>
          </div>
          <FormError show={state === "error"} />
          <MailNote show={state === "mailed"} />
        </>
      )}
    </form>
  );
}
