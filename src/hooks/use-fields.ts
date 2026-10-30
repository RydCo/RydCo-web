import { useState } from "react";

// A form's text fields as one object, plus a setter for each: `set("name")` gives a field its onChange.
export function useFields<T extends Record<string, string>>(initial: T) {
  const [fields, setFields] = useState(initial);
  const set = (key: keyof T) => (value: string) => setFields((prev) => ({ ...prev, [key]: value }));
  return [fields, set] as const;
}
