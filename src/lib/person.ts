import { normalizePhone } from "./phone";

// Checks for the details people give us, and how we address them afterwards.
export const nameError = (name: string) => (name.trim() ? undefined : "Add your name.");

export const phoneError = (phone: string) => (normalizePhone(phone) ? undefined : "Enter a Pakistani mobile number, like 0300-1234567.");

// Email is optional, so an empty one is fine. A filled-in one must look like an address.
export const emailError = (email: string) =>
  !email.trim() || /^[^@\s]+@[^@\s.]+(\.[^@\s.]+)+$/.test(email.trim()) ? undefined : "Enter an email like name@example.com, or leave it empty.";

export const firstName = (name: string) => name.trim().split(" ")[0];
