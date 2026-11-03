import { useState } from "react";

type Errors<T> = Partial<Record<keyof T, string | undefined>>;

// A form's text fields as one object, with a setter for each (`set("name")` is a field's onChange) and the errors from
// the last submit. Include the honeypot as `website: ""`. `check(errors)` shows them and is true when there are none.
export function useForm<T extends Record<string, string>>(initial: T) {
  const [fields, setFields] = useState(initial);
  const [errors, setErrors] = useState<Errors<T>>({});
  const set = (key: keyof T) => (value: string) => setFields((prev) => ({ ...prev, [key]: value }));
  const check = (next: Errors<T>) => {
    setErrors(next);
    return Object.values(next).every((e) => !e);
  };
  return { fields, set, errors, check };
}
