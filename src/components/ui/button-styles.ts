// The one set of button looks, for links and real buttons alike, on any ground: `primary` is the action, `secondary`
// sits beside it, `ghost` is a text link with a button's height. Don't add a variant for a new background; these work
// on all of them. Sizes: `md` everywhere, `sm` in the header bar, `lg` where it sits in a tall field row.
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-tight transition-[transform,background-color,background-position,box-shadow,color] duration-200 ease-out active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100";

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-[44px] text-[16px]",
  md: "min-h-[52px] text-[17px]",
  lg: "min-h-[56px] text-[17px]",
};

const variants: Record<ButtonVariant, string> = {
  primary: "action disabled:bg-ink-soft disabled:bg-none disabled:shadow-none",
  secondary: "bg-screen text-ink shadow-edge hover:bg-brand",
  ghost: "t-link hover:decoration-accent", // Takes the text colour of the ground it sits on
};

// Filled buttons get side padding; a ghost is only its text.
const pad = (variant: ButtonVariant, size: ButtonSize) => (variant === "ghost" ? "" : size === "sm" ? "px-5" : "px-7");

// A round icon-only button (menu, pause): 48px, the same hover to ink everywhere. A `floating` one sits over a picture,
// such as the map, so it is white with the panel shadow rather than panel-coloured.
export const iconButtonClasses = (floating = false) =>
  `grid h-12 w-12 flex-none place-items-center rounded-full transition-colors duration-150 hover:bg-ink hover:text-surface ${floating ? "bg-screen text-ink shadow-panel" : "bg-panel"}`;

export const buttonClasses = (variant: ButtonVariant = "primary", size: ButtonSize = "md") =>
  `${base} ${sizes[size]} ${pad(variant, size)} ${variants[variant]}`;
