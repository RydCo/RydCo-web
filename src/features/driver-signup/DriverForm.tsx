"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { FormError, MailNote } from "@/components/forms/FormMessages";
import { Honeypot } from "@/components/forms/Honeypot";
import { SelectField } from "@/components/forms/SelectField";
import { Sent } from "@/components/forms/Sent";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { TextField } from "@/components/forms/TextField";
import { pilot } from "@/config/pilot";
import { normalizePhone } from "@/lib/phone";
import { sendForm } from "@/lib/send-form";

const OTHER = "Another area";
const labels = { name: "Name", phone: "Phone", car: "Car", from: "I start in", to: "I'm headed to", leave: "I usually leave at" };

// Sign-up for the first drivers on the Lahore pilot, before the app is in the store.
export function DriverForm() {
  const id = useId();
  const [f, setF] = useState({ name: "", phone: "", car: "", from: "", to: "", leave: "" });
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "mailed" | "error">("idle");
  const set = (k: keyof typeof f) => (v: string) => setF((prev) => ({ ...prev, [k]: v }));

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    const tel = normalizePhone(f.phone);
    const next = {
      name: f.name.trim() ? undefined : "Add your name.",
      phone: tel ? undefined : "Enter a Pakistani mobile number, like 0300-1234567.",
    };
    setErrors(next);
    if (next.name || next.phone) return;
    setState("sending");
    try {
      setState(await sendForm("driver", { ...f, name: f.name.trim(), phone: tel!, website: trap }, labels));
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <Sent title={`Thanks, ${f.name.trim().split(" ")[0]}.`}>
        <p>We&rsquo;ll call or message you on {normalizePhone(f.phone)} to get you set up as a driver on the Lahore pilot.</p>
      </Sent>
    );
  }

  const area = (list: { name: string }[]) => [...list.map((p) => ({ value: p.name, label: p.name })), { value: OTHER, label: OTHER }];

  return (
    <form onSubmit={submit} noValidate className="relative">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id={`${id}-name`} name="name" label="Your name" autoComplete="name" value={f.name} onChange={set("name")} error={errors.name} required />
        <TextField
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          label="Mobile number"
          autoComplete="tel"
          placeholder="0300-1234567"
          value={f.phone}
          onChange={set("phone")}
          error={errors.phone}
          required
        />
        <SelectField id={`${id}-from`} name="from" label="I start in" value={f.from} onChange={set("from")} placeholder="Choose an area" options={area(pilot.starts)} />
        <SelectField id={`${id}-to`} name="to" label="I'm headed to" value={f.to} onChange={set("to")} placeholder="Choose an area" options={area(pilot.destinations)} />
        <TextField id={`${id}-car`} name="car" label="Your car" placeholder="e.g. Honda City 2019" value={f.car} onChange={set("car")} />
        <TextField id={`${id}-leave`} name="leave" label="I usually leave at" placeholder="e.g. 7:45 am" value={f.leave} onChange={set("leave")} />
      </div>
      <Honeypot value={trap} onChange={setTrap} />
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <SubmitButton sending={state === "sending"}>Sign up to drive</SubmitButton>
        <p className="max-w-[34ch] text-[15px]">
          We only use your details to set you up on RydCo.{" "}
          <Link href="/privacy/" className="underline underline-offset-4">
            Privacy
          </Link>
        </p>
      </div>
      <FormError show={state === "error"} />
      <MailNote show={state === "mailed"} />
    </form>
  );
}
