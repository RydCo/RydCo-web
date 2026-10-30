import { control, describedProps, Field, invalidRing, type Base } from "./field-base";

export function TextField({
  value,
  onChange,
  type = "text",
  name,
  required,
  autoComplete,
  inputMode,
  placeholder,
  ...base
}: Base & {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  name: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  placeholder?: string;
}) {
  return (
    <Field {...base}>
      <input
        id={base.id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...describedProps(base)}
        className={`${control} mt-2 h-[56px] rounded-full ${invalidRing(base.error)}`}
        name={name}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
      />
    </Field>
  );
}
