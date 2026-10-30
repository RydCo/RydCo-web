import { SelectField } from "@/components/forms/SelectField";
import { destinationAreas, startAreas } from "@/config/pilot";

const ends = {
  from: { label: "I start in", areas: startAreas },
  to: { label: "I'm headed to", areas: destinationAreas },
};

// One end of a commute, as a form field. `id` is the form's own id; the field adds its name to it.
export function AreaField({ id, name, value, onChange }: { id: string; name: keyof typeof ends; value: string; onChange: (v: string) => void }) {
  const { label, areas } = ends[name];
  return <SelectField id={`${id}-${name}`} name={name} label={label} value={value} onChange={onChange} placeholder="Choose an area" options={areas} />;
}
