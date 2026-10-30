import { control, type Base } from "./field-base";

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  name,
}: Base & { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string; name: string }) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      <div className="relative mt-2">
        <select id={id} name={name} value={value} onChange={(e) => onChange(e.target.value)} className={`${control} h-[56px] cursor-pointer appearance-none rounded-full pr-12`}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute top-1/2 right-5 h-5 w-5 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 8 5 5 5-5" />
        </svg>
      </div>
    </div>
  );
}
