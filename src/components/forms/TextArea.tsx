import { control, describedProps, Field, invalidRing, type Base } from "./field-base";

export function TextArea({
  value,
  onChange,
  name,
  required,
  placeholder,
  ...base
}: Base & { value: string; onChange: (v: string) => void; name: string; required?: boolean; placeholder?: string }) {
  return (
    <Field {...base}>
      <textarea
        id={base.id}
        value={value}
        rows={5}
        onChange={(e) => onChange(e.target.value)}
        {...describedProps(base)}
        className={`${control} mt-2 block min-h-[150px] resize-y rounded-surface py-4 ${invalidRing(base.error)}`}
        name={name}
        required={required}
        placeholder={placeholder}
      />
    </Field>
  );
}
