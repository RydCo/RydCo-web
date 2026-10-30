"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { FormStatus } from "@/components/forms/FormMessages";
import { Honeypot } from "@/components/forms/Honeypot";
import { NameField } from "@/components/forms/PersonFields";
import { SelectField } from "@/components/forms/SelectField";
import { Sent } from "@/components/forms/Sent";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { TextArea } from "@/components/forms/TextArea";
import { TextField } from "@/components/forms/TextField";
import { contactTopics, type ContactTopic } from "@/config/contact";
import { useFields } from "@/hooks/use-fields";
import { useSendForm } from "@/hooks/use-send-form";
import { firstName, nameError } from "@/lib/person";

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
  const [f, set] = useFields({ name: "", reply: "", organization: "", message: "" });
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<{ name?: string; reply?: string; message?: string }>({});
  const { state, send } = useSendForm("contact", labels);

  const topicId = chosenTopic ?? urlTopic ?? "riding";
  const needsOrg = topicId === "company" || topicId === "partner";

  function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    const next = {
      name: nameError(f.name),
      reply: f.reply.trim() ? undefined : "Add an email or phone number so we can reply.",
      message: f.message.trim() ? undefined : "Write a short message.",
    };
    setErrors(next);
    if (next.name || next.reply || next.message) return;
    const topic = contactTopics.find((t) => t.id === topicId)?.label ?? topicId;
    send({ topic, name: f.name.trim(), reply: f.reply.trim(), organization: needsOrg ? f.organization.trim() : "", message: f.message.trim(), website: trap });
  }

  if (state === "sent") {
    return (
      <Sent title={`Thanks, ${firstName(f.name)}. We've got it.`}>
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
        <NameField id={id} value={f.name} onChange={set("name")} error={errors.name} />
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
        <FormStatus state={state} />
      </div>
    </form>
  );
}
