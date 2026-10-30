import { Chevron } from "@/components/ui/icons";
import { control, Field, type Base } from "./field-base";

export function SelectField({
  value,
  onChange,
  options,
  placeholder,
  name,
  ...base
}: Base & { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string; name: string }) {
  return (
    <Field {...base}>
      <div className="relative mt-2">
        <select id={base.id} name={name} value={value} onChange={(e) => onChange(e.target.value)} className={`${control} h-[56px] cursor-pointer appearance-none rounded-full pr-12`}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Chevron className="pointer-events-none absolute top-1/2 right-5 h-5 w-5 -translate-y-1/2" />
      </div>
    </Field>
  );
}
