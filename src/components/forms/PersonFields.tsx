import { TextField } from "./TextField";

type Props = { id: string; value: string; onChange: (v: string) => void; error?: string };

// The fields forms ask for about a person. `id` is the form's own id; each field adds its name to it.
export function NameField({ id, value, onChange, error }: Props) {
  return <TextField id={`${id}-name`} name="name" label="Your name" autoComplete="name" value={value} onChange={onChange} error={error} required />;
}

export function PhoneField({ id, value, onChange, error }: Props) {
  return (
    <TextField
      id={`${id}-phone`}
      name="phone"
      type="tel"
      inputMode="tel"
      label="Mobile number"
      autoComplete="tel"
      placeholder="0300-1234567"
      value={value}
      onChange={onChange}
      error={error}
      required
    />
  );
}

export function EmailField({ id, value, onChange, error, hint }: Props & { hint?: string }) {
  return (
    <TextField
      id={`${id}-email`}
      name="email"
      type="email"
      inputMode="email"
      label="Email (optional)"
      autoComplete="email"
      placeholder="name@example.com"
      hint={hint}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
}
