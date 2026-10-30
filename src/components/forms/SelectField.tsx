import { Chevron } from "@/components/ui/icons";
import { Dropdown, type DropdownOption } from "./Dropdown";
import { control, Field, type Base } from "./field-base";

export function SelectField({
  value,
  onChange,
  options,
  placeholder,
  name,
  ...base
}: Base & { value: string; onChange: (v: string) => void; options: DropdownOption[]; placeholder?: string; name: string }) {
  const chosen = options.find((o) => o.value === value)?.label;
  return (
    <Field {...base}>
      <Dropdown
        id={base.id}
        name={name}
        label={base.label}
        value={value}
        onChange={onChange}
        options={options}
        className="mt-2"
        triggerClassName={`${control} flex h-[56px] items-center justify-between gap-3 rounded-full text-left transition-shadow duration-150 hover:shadow-[inset_0_0_0_1.5px_var(--color-line)] aria-expanded:shadow-[inset_0_0_0_1.5px_var(--color-accent-strong)]`}
      >
        <span className={`min-w-0 truncate ${chosen ? "" : "text-ink-soft"}`}>{chosen ?? placeholder}</span>
        <Chevron className="h-5 w-5 flex-none transition-transform duration-150 group-aria-expanded:rotate-180" />
      </Dropdown>
    </Field>
  );
}
