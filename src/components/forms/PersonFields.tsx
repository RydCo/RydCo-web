import { TextField } from "./TextField";

type Props = { id: string; value: string; onChange: (v: string) => void; error?: string };

// The two fields most forms ask for. `id` is the form's own id; each field adds its name to it.
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
