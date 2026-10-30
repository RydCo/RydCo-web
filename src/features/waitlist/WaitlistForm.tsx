"use client";

import { useId, useState } from "react";
import { Choice } from "@/components/forms/Choice";
import { FormActions } from "@/components/forms/FormActions";
import { Honeypot } from "@/components/forms/Honeypot";
import { NameField, PhoneField } from "@/components/forms/PersonFields";
import { Sent } from "@/components/forms/Sent";
import { Button } from "@/components/ui/Button";
import { riderCta } from "@/config/cta";
import { site } from "@/config/site";
import { AreaField } from "@/features/commute/AreaField";
import { setCommute, useCommute } from "@/features/commute/commute-store";
import { coverage } from "@/features/commute/coverage";
import { CoverageAnswer } from "@/features/commute/CoverageAnswer";
import { useSendForm } from "@/hooks/use-send-form";
import { firstName, nameError, phoneError } from "@/lib/person";
import { normalizePhone } from "@/lib/phone";

const labels = { name: "Name", phone: "Phone", role: "I want to", from: "I start in", to: "I'm headed to" };
const roles = { ride: "Ride", drive: "Drive", both: "Ride and drive" } as const;

// The app's "Check your commute?" step joined to the waitlist sign-up. The route is shared with the hero's
// route check, so a route picked up there is already filled in here.
export function WaitlistForm() {
  const id = useId();
  const { from, to } = useCommute();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<keyof typeof roles>("ride");
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const { state, send } = useSendForm("waitlist", labels);

  const { picked, covered } = coverage(from, to);
  const live = Boolean(site.playStoreUrl);

  function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    const next = { name: nameError(name), phone: phoneError(phone) };
    setErrors(next);
    if (next.name || next.phone) return;
    send({ name: name.trim(), phone: normalizePhone(phone)!, role: roles[role], from, to, covered: picked ? String(covered) : "", website: trap });
  }

  if (state === "sent") {
    return (
      <Sent title={`You're on the list, ${firstName(name)}.`}>
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
        <AreaField id={id} name="from" value={from} onChange={(v) => setCommute({ from: v, by: id })} />
        <AreaField id={id} name="to" value={to} onChange={(v) => setCommute({ to: v, by: id })} />
      </div>

      <CoverageAnswer me={id} className="mt-4 min-h-[40px]" />

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
            <NameField id={id} value={name} onChange={setName} error={errors.name} />
            <PhoneField id={id} value={phone} onChange={setPhone} error={errors.phone} />
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
          <FormActions state={state} label="Join the waitlist" note="We only use your number to tell you about RydCo." />
        </>
      )}
    </form>
  );
}
