import type { ReactNode } from "react";

// The app's real screens (from app-mocks/v8.html), rebuilt small enough to sit inside PhoneFrame.
// Names, places and amounts are the app's own examples.

export function Header({ title, back = true }: { title: string; back?: boolean }) {
  return (
    <div className="flex flex-none items-center gap-2 px-4 pt-1 pb-3">
      {back && (
        <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full bg-screen">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.5 4.5 7 10l5.5 5.5" />
          </svg>
        </span>
      )}
      <span className="font-display text-[16px] font-bold">{title}</span>
    </div>
  );
}

export function Bot({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return (
    <p className={`w-fit max-w-[92%] rounded-[18px] rounded-tl-[6px] bg-screen px-3.5 py-2.5 ${strong ? "font-display text-[17px] leading-tight font-bold" : ""}`}>
      {children}
    </p>
  );
}

export function Body({ children }: { children: ReactNode }) {
  return <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-4 pb-5">{children}</div>;
}

export function PrimaryButton({ children }: { children: ReactNode }) {
  return <span className="mt-auto grid h-11 flex-none place-items-center rounded-full action font-semibold">{children}</span>;
}
