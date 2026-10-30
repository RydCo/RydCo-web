// The one set of button looks, for links and real buttons alike, on any ground: `primary` is the action, `secondary`
// sits beside it, `ghost` is a text link with a button's height. Don't add a variant for a new background; these work
// on all of them.
export type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full text-[17px] font-semibold leading-tight transition-[transform,background-color,background-position,box-shadow,color] duration-200 ease-out active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100";

const variants: Record<ButtonVariant, string> = {
  primary: "px-7 action",
  secondary: "px-7 bg-screen text-ink shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:bg-brand",
  ghost: "text-ink t-link hover:decoration-accent-deep",
};

export const buttonClasses = (variant: ButtonVariant = "primary") => `${base} ${variants[variant]}`;
