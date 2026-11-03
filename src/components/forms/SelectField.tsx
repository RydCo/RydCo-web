import { Chevron } from "@/components/ui/icons";
import { Dropdown, type DropdownOption } from "./Dropdown";
import { control, Field, fieldEdge, type Base } from "./field-base";

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
        triggerClassName={`${control} ${fieldEdge(base.error)} flex h-[56px] items-center justify-between gap-3 rounded-full text-left`}
      >
        <span className={`min-w-0 truncate ${chosen ? "" : "text-ink-soft"}`}>{chosen ?? placeholder}</span>
        <Chevron className="transition-transform duration-150 group-aria-expanded:rotate-180" />
      </Dropdown>
    </Field>
  );
}
