// Accepts 03001234567, 0300-1234567, +92 300 1234567 and 923001234567; returns 0300-1234567, or null if it isn't a
// Pakistani mobile number.
export function normalizePhone(value: string): string | null {
  const digits = value.replace(/[^\d+]/g, "");
  const m = digits.match(/^(?:\+92|0092|92|0)?(3\d{9})$/);
  if (!m) return null;
  const local = `0${m[1]}`;
  return `${local.slice(0, 4)}-${local.slice(4)}`;
}
