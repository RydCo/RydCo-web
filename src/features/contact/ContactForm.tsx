"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { FormError, MailNote } from "@/components/forms/FormMessages";
import { Honeypot } from "@/components/forms/Honeypot";
import { SelectField } from "@/components/forms/SelectField";
import { Sent } from "@/components/forms/Sent";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { TextArea } from "@/components/forms/TextArea";
import { TextField } from "@/components/forms/TextField";
import { contactTopics, type ContactTopic } from "@/config/contact";
import { sendForm } from "@/lib/send-form";

const labels = { topic: "About", name: "Name", reply: "Reply to", organization: "Organization", message: "Message" };

// Links like /contact/?topic=company open the form with that topic chosen. The page is static, so the query is
// read in the browser; on the server (and during hydration) there is no query and the default topic shows.
const noSubscribe = () => () => {};
function useTopicFromUrl(): ContactTopic | null {
  const search = useSyncExternalStore(noSubscribe, () => window.location.search, () => "");
  const topic = new URLSearchParams(search).get("topic");
  return contactTopics.some((t) => t.id === topic) ? (topic as ContactTopic) : null;
}

export function ContactForm() {
  const id = useId();
  const urlTopic = useTopicFromUrl();
  const [chosenTopic, setChosenTopic] = useState<ContactTopic | null>(null);
  const [f, setF] = useState({ name: "", reply: "", organization: "", message: "" });
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<{ name?: string; reply?: string; message?: string }>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "mailed" | "error">("idle");
  const set = (k: keyof typeof f) => (v: string) => setF((prev) => ({ ...prev, [k]: v }));

  const topicId = chosenTopic ?? urlTopic ?? "riding";
  const needsOrg = topicId === "company" || topicId === "partner";

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    const next = {
      name: f.name.trim() ? undefined : "Add your name.",
      reply: f.reply.trim() ? undefined : "Add an email or phone number so we can reply.",
      message: f.message.trim() ? undefined : "Write a short message.",
    };
    setErrors(next);
    if (next.name || next.reply || next.message) return;
    setState("sending");
    const topic = contactTopics.find((t) => t.id === topicId)?.label ?? topicId;
    try {
      setState(
        await sendForm(
          "contact",
          { topic, name: f.name.trim(), reply: f.reply.trim(), organization: needsOrg ? f.organization.trim() : "", message: f.message.trim(), website: trap },
          labels,
        ),
      );
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <Sent title={`Thanks, ${f.name.trim().split(" ")[0]}. We've got it.`}>
        <p>Someone on the team will reply to {f.reply.trim()}.</p>
      </Sent>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative grid gap-5">
      <SelectField
        id={`${id}-topic`}
        name="topic"
        label="What's it about?"
        value={topicId}
        onChange={(v) => setChosenTopic(v as ContactTopic)}
        options={contactTopics.map((t) => ({ value: t.id, label: t.label }))}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id={`${id}-name`} name="name" label="Your name" autoComplete="name" value={f.name} onChange={set("name")} error={errors.name} required />
        <TextField
          id={`${id}-reply`}
          name="reply"
          label="Email or phone"
          autoComplete="email"
          hint="So we can reply."
          value={f.reply}
          onChange={set("reply")}
          error={errors.reply}
          required
        />
      </div>
      {needsOrg && <TextField id={`${id}-org`} name="organization" label="Company or organization" autoComplete="organization" value={f.organization} onChange={set("organization")} />}
      <TextArea id={`${id}-message`} name="message" label="Message" value={f.message} onChange={set("message")} error={errors.message} required />
      <Honeypot value={trap} onChange={setTrap} />
      <div>
        <SubmitButton sending={state === "sending"}>Send message</SubmitButton>
        <FormError show={state === "error"} />
        <MailNote show={state === "mailed"} />
      </div>
    </form>
  );
}
