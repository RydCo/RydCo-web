"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Tick } from "@/components/ui/icons";

export type DropdownOption = { value: string; label: string; group?: string };

// How the list fits the window, in pixels. It opens downward unless that leaves too little room and there's more above.
const tallest = 440;
const shortest = 180;
const roomyEnough = 200;
const panelPadding = 12;
const headerClearance = 88;
const edgeClearance = 24;
const typingPause = 600;

const panelShadow = "shadow-[0_0_0_1px_var(--color-line),0_24px_48px_-20px_color-mix(in_srgb,var(--color-ink-deep)_40%,transparent)]";

// Options in a row that share a group sit together under its caption, keeping their place in the full list.
function grouped(options: DropdownOption[]) {
  const groups: { name?: string; rows: { option: DropdownOption; index: number }[] }[] = [];
  options.forEach((option, index) => {
    const last = groups[groups.length - 1];
    if (last && last.name === option.group) last.rows.push({ option, index });
    else groups.push({ name: option.group, rows: [{ option, index }] });
  });
  return groups;
}

// A styled replacement for the native select, following the WAI-ARIA select-only combobox pattern. Focus stays on the
// button and aria-activedescendant points at the highlighted row. The children are what the closed button shows.
export function Dropdown({
  id,
  name,
  label,
  value,
  onChange,
  options,
  className = "",
  triggerClassName,
  panelClassName = "",
  children,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: DropdownOption[];
  className?: string;
  triggerClassName: string;
  panelClassName?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [fit, setFit] = useState({ up: false, height: tallest });
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const typed = useRef({ text: "", at: 0 });
  const viaPointer = useRef(false);

  const groups = grouped(options);
  const selected = options.findIndex((o) => o.value === value);
  const optionId = (index: number) => `${id}-option-${index}`;

  function show(at = selected) {
    const box = root.current!.getBoundingClientRect();
    const below = window.innerHeight - box.bottom - edgeClearance;
    const above = box.top - headerClearance - edgeClearance;
    const up = below < roomyEnough && above > below;
    setFit({ up, height: Math.max(shortest, Math.min(tallest, up ? above : below)) });
    viaPointer.current = false;
    setActive(at);
    setOpen(true);
  }

  function choose(index: number) {
    if (options[index].value !== value) onChange(options[index].value);
    setOpen(false);
  }

  // Jump to the option starting with what's being typed. Returns -1 if there's none.
  function seek(key: string) {
    const now = Date.now();
    const text = (now - typed.current.at < typingPause ? typed.current.text : "") + key.toLowerCase();
    typed.current = { text, at: now };
    return options.findIndex((o) => o.label.toLowerCase().startsWith(text));
  }

  function onKeyDown(e: KeyboardEvent) {
    const last = options.length - 1;
    const midWord = Date.now() - typed.current.at < typingPause && typed.current.text !== "";
    const typing = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.key !== " " || midWord);
    viaPointer.current = false;

    if (typing) {
      e.preventDefault();
      const found = seek(e.key);
      if (!open) show(found >= 0 ? found : selected);
      else if (found >= 0) setActive(found);
      return;
    }
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        show();
      }
      return;
    }

    const moves: Record<string, number> = { ArrowDown: active + 1, ArrowUp: active - 1, PageDown: active + 5, PageUp: active - 5, Home: 0, End: last };
    if (e.key in moves) {
      e.preventDefault();
      setActive(Math.max(0, Math.min(last, moves[e.key])));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (active >= 0) choose(active);
      else setOpen(false);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "Tab") {
      if (active >= 0) choose(active);
      else setOpen(false);
    }
  }

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  // Keep the highlighted row in view, unless the pointer put it there.
  useEffect(() => {
    const box = panel.current;
    const row = document.getElementById(`${id}-option-${active}`);
    if (!open || !box || !row || viaPointer.current) return;
    const bottom = row.offsetTop + row.offsetHeight;
    if (active === 0) box.scrollTop = 0;
    else if (row.offsetTop < box.scrollTop) box.scrollTop = row.offsetTop - panelPadding / 2;
    else if (bottom > box.scrollTop + box.clientHeight) box.scrollTop = bottom - box.clientHeight + panelPadding / 2;
  }, [open, active, id]);

  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        ref={trigger}
        id={id}
        type="button"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${id}-list` : undefined}
        aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
        onClick={() => {
          trigger.current?.focus();
          if (open) setOpen(false);
          else show();
        }}
        onKeyDown={onKeyDown}
        onBlur={() => setOpen(false)}
        className={`group cursor-pointer ${triggerClassName}`}
      >
        {children}
      </button>
      <input type="hidden" name={name} value={value} />
      {open && (
        // Pressing on the list keeps focus on the button, so the list stays open while it's being scrolled.
        <div
          ref={panel}
          id={`${id}-list`}
          role="listbox"
          aria-label={label}
          data-up={fit.up || undefined}
          style={{ maxHeight: fit.height }}
          onMouseDown={(e) => e.preventDefault()}
          className={`dropdown-panel absolute left-0 z-30 min-w-full overflow-y-auto overscroll-contain rounded-[22px] bg-screen p-1.5 text-ink ${fit.up ? "bottom-full mb-2" : "top-full mt-2"} ${panelShadow} ${panelClassName}`}
        >
          {groups.map((group, g) => (
            <div key={group.name ?? g} role={group.name ? "group" : undefined} aria-labelledby={group.name ? `${id}-group-${g}` : undefined}>
              {group.name && (
                <p id={`${id}-group-${g}`} className="px-3.5 pt-2.5 pb-1 text-[13px] leading-snug font-semibold text-ink-soft">
                  {group.name}
                </p>
              )}
              {group.rows.map(({ option, index }) => (
                <div
                  key={option.value}
                  id={optionId(index)}
                  role="option"
                  aria-selected={index === selected}
                  onMouseMove={() => {
                    viaPointer.current = true;
                    setActive(index);
                  }}
                  onClick={() => choose(index)}
                  className={`flex min-h-[46px] cursor-pointer items-center md:min-h-[42px] justify-between gap-3 rounded-[16px] px-3.5 py-2 text-[16px] leading-snug transition-colors duration-100 aria-selected:font-semibold ${index === active ? "bg-panel" : ""}`}
                >
                  {option.label}
                  {index === selected && <Tick className="text-accent-deep" />}
                </div>
              ))}
            </div>
          ))}
          <div aria-hidden="true" className="dropdown-more" />
        </div>
      )}
    </div>
  );
}
