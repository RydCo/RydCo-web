import { control, Described, describedBy, type Base } from "./field-base";

export function TextField({
  id,
  label,
  error,
  hint,
  value,
  onChange,
  type = "text",
  ...rest
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
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${control} mt-2 h-[56px] rounded-full ${error ? "outline-3 outline-offset-2 outline-apricot-deep" : ""}`}
        {...rest}
      />
      <Described id={id} error={error} hint={hint} />
    </div>
  );
}
