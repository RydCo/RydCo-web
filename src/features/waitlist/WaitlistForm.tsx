"use client";

import { useId, useState } from "react";
import { Choice } from "@/components/forms/Choice";
import { FormActions } from "@/components/forms/FormActions";
import { Honeypot } from "@/components/forms/Honeypot";
import { EmailField, NameField, PhoneField } from "@/components/forms/PersonFields";
import { Sent } from "@/components/forms/Sent";
import { TextField } from "@/components/forms/TextField";
import { Button } from "@/components/ui/Button";
import { riderCta } from "@/config/cta";
import { site } from "@/config/site";
import { AreaField } from "@/features/commute/AreaField";
import { setCommute, useCommute } from "@/features/commute/commute-store";
import { coverage } from "@/features/commute/coverage";
import { CoverageAnswer } from "@/features/commute/CoverageAnswer";
import { useSendForm } from "@/hooks/use-send-form";
import { emailError, firstName, nameError, phoneError } from "@/lib/person";
import { normalizePhone } from "@/lib/phone";

const labels = { name: "Name", phone: "Phone", email: "Email", role: "I want to", from: "I start in", to: "I'm headed to", car: "Car", leave: "I usually leave at" };
const roles = { ride: "Ride", drive: "Drive", both: "Ride and drive" } as const;
export type WaitlistRole = keyof typeof roles;

// The site's one sign-up form, for riders and drivers alike: the app's "Check your commute?" step joined to the waitlist.
// The route is shared with the hero's route check, so a route picked up there is already filled in here. Anyone who
// wants to drive is also asked about their car and when they leave. The Drivers page opens it on "Drive".
export function WaitlistForm({ startAs = "ride" }: { startAs?: WaitlistRole }) {
  const id = useId();
  const { from, to } = useCommute();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<WaitlistRole>(startAs);
  const [car, setCar] = useState("");
  const [leave, setLeave] = useState("");
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const { state, send } = useSendForm("waitlist", labels);

  const { picked, covered } = coverage(from, to);
  const live = Boolean(site.playStoreUrl);
  const drives = role !== "ride";

  function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    const next = { name: nameError(name), phone: phoneError(phone), email: emailError(email) };
    setErrors(next);
    if (next.name || next.phone || next.email) return;
    send({
      name: name.trim(),
      phone: normalizePhone(phone)!,
      email: email.trim(),
      role: roles[role],
      from,
      to,
      covered: picked ? String(covered) : "",
      car: drives ? car.trim() : "",
      leave: drives ? leave.trim() : "",
      website: trap,
    });
  }

  if (state === "sent") {
    return (
      <Sent title={`You're on the list, ${firstName(name)}.`}>
        {drives ? (
          <p>
            We&rsquo;ll call or message you on {normalizePhone(phone)} to get you set up as a driver on the Lahore pilot, and email {email.trim()} when the app
            opens.
          </p>
        ) : (
          <p>
            We&rsquo;ll message you on {normalizePhone(phone)} and email {email.trim()} when RydCo opens{picked && covered ? ` on ${from} to ${to}` : ""}.
          </p>
        )}
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
            <div className="sm:col-span-2">
              <EmailField id={id} value={email} onChange={setEmail} error={errors.email} hint="We'll email your sign-up link when the app opens." />
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
              <TextField id={`${id}-car`} name="car" label="Your car" placeholder="e.g. Honda City 2019" value={car} onChange={setCar} />
              <TextField id={`${id}-leave`} name="leave" label="I usually leave at" placeholder="e.g. 7:45 am" value={leave} onChange={setLeave} />
            </div>
          )}
          <Honeypot value={trap} onChange={setTrap} />
          <FormActions state={state} label="Join the waitlist" note="We only use your details to tell you about RydCo." />
        </>
      )}
    </form>
  );
}
