"use client";

import { useId, useState } from "react";
import { Choice } from "@/components/forms/Choice";
import { FormActions } from "@/components/forms/FormActions";
import { Honeypot } from "@/components/forms/Honeypot";
import { EmailField, NameField, PhoneField } from "@/components/forms/PersonFields";
import { Sent } from "@/components/forms/Sent";
import { TextField } from "@/components/forms/TextField";
import { Button } from "@/components/ui/Button";
import { appLive, riderCta, waitlistLabel } from "@/config/cta";
import { commuteEnds } from "@/config/pilot";
import { useCommute } from "@/features/commute/commute-store";
import { RoutePicker } from "@/features/commute/RoutePicker";
import { useForm } from "@/hooks/use-form";
import { useSendForm } from "@/hooks/use-send-form";
import { emailError, firstName, nameError, phoneError } from "@/lib/person";
import { normalizePhone } from "@/lib/phone";

const labels = { name: "Name", phone: "Phone", email: "Email", role: "I want to", from: commuteEnds.from.label, to: commuteEnds.to.label, car: "Car", leave: "I usually leave at" };
const roles = { ride: "Ride", drive: "Drive", both: "Ride and drive" } as const;
type WaitlistRole = keyof typeof roles;

// The site's one sign-up form, for riders and drivers alike: the app's commute step joined to the waitlist.
// The route is shared with the hero's route check, so a route picked up there is already filled in here. Anyone who
// wants to drive is also asked about their car and when they leave. The Drivers page opens it on "Drive".
export function WaitlistForm({ startAs = "ride" }: { startAs?: WaitlistRole }) {
  const id = useId();
  const { from, to } = useCommute();
  const { fields: f, set, errors, check } = useForm({ name: "", phone: "", email: "", car: "", leave: "", website: "" });
  const [role, setRole] = useState<WaitlistRole>(startAs);
  const { state, send } = useSendForm("waitlist", labels);

  const cta = riderCta();
  const drives = role !== "ride";

  function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!check({ name: nameError(f.name), phone: phoneError(f.phone), email: emailError(f.email) })) return;
    send({
      name: f.name.trim(),
      phone: normalizePhone(f.phone)!,
      email: f.email.trim(),
      role: roles[role],
      from,
      to,
      car: drives ? f.car.trim() : "",
      leave: drives ? f.leave.trim() : "",
      website: f.website,
    });
  }

  if (state === "sent") {
    return (
      <Sent title={`You're on the list, ${firstName(f.name)}.`}>
        {drives ? (
          <p>
            We&rsquo;ll call or message you on {normalizePhone(f.phone)} to get you set up as a driver on the Lahore pilot, and email {f.email.trim()} when the app
            opens.
          </p>
        ) : (
          <p>
            We&rsquo;ll message you on {normalizePhone(f.phone)} and email {f.email.trim()} when RydCo opens.
          </p>
        )}
      </Sent>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative">
      <p className="t-title">Your daily commute</p>
      <div className="mt-4">
        <RoutePicker me={id} />
      </div>

      {appLive ? (
        <div className="mt-6">
          <Button href={cta.href} external={cta.external}>
            {cta.label}
          </Button>
        </div>
      ) : (
        <>
          <p className="mt-6 t-title">{waitlistLabel}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <NameField id={id} value={f.name} onChange={set("name")} error={errors.name} />
            <PhoneField id={id} value={f.phone} onChange={set("phone")} error={errors.phone} />
            <div className="sm:col-span-2">
              <EmailField id={id} value={f.email} onChange={set("email")} error={errors.email} hint="We'll email your sign-up link when the app opens." />
            </div>
          </div>
          <div className="mt-5">
            <Choice
              legend="I want to"
              name="role"
              value={role}
              onChange={(v) => setRole(v as WaitlistRole)}
              options={[
                { value: "ride", label: "Ride" },
                { value: "drive", label: "Drive" },
                { value: "both", label: "Both" },
              ]}
            />
          </div>
          {drives && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <TextField id={`${id}-car`} name="car" label="Your car" placeholder="e.g. Honda City 2019" value={f.car} onChange={set("car")} />
              <TextField id={`${id}-leave`} name="leave" label="I usually leave at" placeholder="e.g. 7:45 am" value={f.leave} onChange={set("leave")} />
            </div>
          )}
          <Honeypot value={f.website} onChange={set("website")} />
          <FormActions state={state} label={waitlistLabel} note="We only use your details to tell you about RydCo." />
        </>
      )}
    </form>
  );
}
