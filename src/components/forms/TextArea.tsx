import { control, Described, describedBy, type Base } from "./field-base";

export function TextArea({ id, label, error, hint, value, onChange, ...rest }: Base & { value: string; onChange: (v: string) => void; name: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        rows={5}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${control} mt-2 block min-h-[150px] resize-y rounded-[28px] py-4 ${error ? "outline-3 outline-offset-2 outline-apricot-deep" : ""}`}
        {...rest}
      />
      <Described id={id} error={error} hint={hint} />
    </div>
  );
}
