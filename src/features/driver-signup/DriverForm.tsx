"use client";

import { useId, useState } from "react";
import { FormActions } from "@/components/forms/FormActions";
import { Honeypot } from "@/components/forms/Honeypot";
import { NameField, PhoneField } from "@/components/forms/PersonFields";
import { Sent } from "@/components/forms/Sent";
import { TextField } from "@/components/forms/TextField";
import { AreaField } from "@/features/commute/AreaField";
import { useFields } from "@/hooks/use-fields";
import { useSendForm } from "@/hooks/use-send-form";
import { firstName, nameError, phoneError } from "@/lib/person";
import { normalizePhone } from "@/lib/phone";

const labels = { name: "Name", phone: "Phone", car: "Car", from: "I start in", to: "I'm headed to", leave: "I usually leave at" };

// Sign-up for the first drivers on the Lahore pilot, before the app is in the store.
export function DriverForm() {
  const id = useId();
  const [f, set] = useFields({ name: "", phone: "", car: "", from: "", to: "", leave: "" });
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const { state, send } = useSendForm("driver", labels);

  function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    const next = { name: nameError(f.name), phone: phoneError(f.phone) };
    setErrors(next);
    if (next.name || next.phone) return;
    send({ ...f, name: f.name.trim(), phone: normalizePhone(f.phone)!, website: trap });
  }

  if (state === "sent") {
    return (
      <Sent title={`Thanks, ${firstName(f.name)}.`}>
        <p>We&rsquo;ll call or message you on {normalizePhone(f.phone)} to get you set up as a driver on the Lahore pilot.</p>
      </Sent>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative">
      <div className="grid gap-4 sm:grid-cols-2">
        <NameField id={id} value={f.name} onChange={set("name")} error={errors.name} />
        <PhoneField id={id} value={f.phone} onChange={set("phone")} error={errors.phone} />
        <AreaField id={id} name="from" value={f.from} onChange={set("from")} />
        <AreaField id={id} name="to" value={f.to} onChange={set("to")} />
        <TextField id={`${id}-car`} name="car" label="Your car" placeholder="e.g. Honda City 2019" value={f.car} onChange={set("car")} />
        <TextField id={`${id}-leave`} name="leave" label="I usually leave at" placeholder="e.g. 7:45 am" value={f.leave} onChange={set("leave")} />
      </div>
      <Honeypot value={trap} onChange={setTrap} />
      <FormActions state={state} label="Sign up to drive" note="We only use your details to set you up on RydCo." />
    </form>
  );
}
