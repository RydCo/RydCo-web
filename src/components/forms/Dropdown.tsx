"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { iconButtonClasses } from "@/components/ui/button-styles";
import { Close, Search, Tick } from "@/components/ui/icons";
import { fieldEdge, fieldSurface } from "./field-base";

// `hint` is a quieter second line under the label, `keywords` are other names a search finds it by, and an `always`
// option stays in view whatever is searched, so there is always a way on. An option with an `action` is a step rather
// than a value (like "Choose on map"): choosing it runs the action, and it stays pinned under the list, after its icon.
export type DropdownOption = {
  value: string;
  label: string;
  group?: string;
  hint?: string;
  keywords?: string[];
  always?: boolean;
  icon?: ReactNode;
  action?: () => void;
};

// The words a searchable list uses, from whoever owns the list. Passing them is what makes a dropdown searchable.
export type SearchCopy = {
  placeholder: string;
  noMatch: (typed: string) => string;
  found: (count: number) => string;
  useTyped: (typed: string) => string;
  typedHint: string;
};

// How the list fits the window, in pixels. It opens downward unless that leaves too little room and there's more above.
const tallest = 440;
const shortest = 180;
const roomyEnough = 200;
const panelPadding = 12;
const headerClearance = 88;
const edgeClearance = 24;
const typingPause = 600;
const longestTyped = 60;
// Searchable lists open as a sheet from the bottom on phones, so the keyboard never hides the results.
const sheetQuery = "(max-width: 639px)";

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

// Searches ignore case, spaces and punctuation, so "gulberg3", "Gulberg 3" and "M.M. Alam" all find their place.
const fold = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, "");
const finds = (option: DropdownOption, query: string) => option.always || [option.label, ...(option.keywords ?? [])].some((t) => fold(t).includes(query));

// The label with the part that was searched for in bold.
function Label({ text, query }: { text: string; query: string }) {
  const at = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <b className="font-bold">{text.slice(at, at + query.length)}</b>
      {text.slice(at + query.length)}
    </>
  );
}

// One row of the list: its icon if it has one, the label with what was searched in bold, the hint under it, and a
// tick on the chosen one.
function Row({
  id,
  index,
  option,
  query,
  active,
  selected,
  onHover,
  onChoose,
}: {
  id: string;
  index: number;
  option: DropdownOption;
  query: string;
  active: boolean;
  selected: boolean;
  onHover: (index: number) => void;
  onChoose: (index: number) => void;
}) {
  return (
    <div
      id={id}
      role="option"
      aria-selected={selected}
      onMouseMove={() => onHover(index)}
      onClick={() => onChoose(index)}
      className={`flex min-h-[46px] cursor-pointer items-center gap-3 rounded-[16px] px-3.5 py-2 text-[16px] leading-snug transition-colors duration-100 aria-selected:font-semibold md:min-h-[42px] ${active ? "bg-panel" : ""}`}
    >
      {option.icon && <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-brand text-accent-deep">{option.icon}</span>}
      <span className="min-w-0 flex-1">
        <span className={`block ${option.action ? "font-semibold" : ""}`}>
          <Label text={option.label} query={query} />
        </span>
        {option.hint && <span className="block text-[13px] font-normal text-ink-soft">{option.hint}</span>}
      </span>
      {selected && <Tick className="text-accent-deep" />}
    </div>
  );
}

// A styled replacement for the native select, following the WAI-ARIA select-only combobox pattern: focus stays on the
// button and aria-activedescendant points at the highlighted row. With `search`, opening it moves focus to a search
// field (an editable combobox over the same list) that filters as you type, and offers what was typed when nothing
// matches. The children are what the closed button shows.
export function Dropdown({
  id,
  name,
  label,
  value,
  onChange,
  options,
  search,
  className = "",
  triggerClassName,
  children,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: DropdownOption[];
  search?: SearchCopy;
  className?: string;
  triggerClassName: string;
  children: ReactNode;
}) {
  const searchable = search !== undefined;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [query, setQuery] = useState("");
  const [fit, setFit] = useState({ up: false, height: tallest, sheet: false });
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const typed = useRef({ text: "", at: 0 });
  const viaPointer = useRef(false);

  const searched = fold(query);
  const matched = searched ? options.filter((o) => finds(o, searched)) : options;
  const noMatch = searched !== "" && !matched.some((o) => !o.always);
  // When nothing on the list matches, what was typed becomes a choice of its own, so it reaches the form in the
  // person's own words instead of being lost behind "Another area".
  const ownWords = query.trim().slice(0, longestTyped);
  const shown = search && noMatch && ownWords ? [{ value: ownWords, label: search.useTyped(ownWords), hint: search.typedHint }, ...matched] : matched;
  const groups = grouped(shown.filter((o) => !o.action));
  const pinned = shown.flatMap((option, index) => (option.action ? [{ option, index }] : []));
  const selected = shown.findIndex((o) => !o.action && o.value === value);
  const optionId = (index: number) => `${id}-option-${index}`;
  const listId = `${id}-list`;

  function show(at = options.findIndex((o) => o.value === value)) {
    const box = root.current!.getBoundingClientRect();
    const below = window.innerHeight - box.bottom - edgeClearance;
    const above = box.top - headerClearance - edgeClearance;
    const up = below < roomyEnough && above > below;
    const sheet = searchable && window.matchMedia(sheetQuery).matches;
    setFit({ up, height: Math.max(shortest, Math.min(tallest, up ? above : below)), sheet });
    viaPointer.current = false;
    setQuery("");
    setActive(at);
    setOpen(true);
  }

  function close(refocus = false) {
    setOpen(false);
    if (refocus) trigger.current?.focus();
  }

  // The search field goes when the list closes, so focus returns to the button, except on Tab, where the browser is
  // already moving it on to the next field.
  // A step closes the list with focus back on the button, so whatever it opens returns focus there.
  function choose(index: number, refocus = searchable) {
    const option = shown[index];
    if (option.action) {
      close(true);
      option.action();
      return;
    }
    if (option.value !== value) onChange(option.value);
    close(refocus);
  }

  // Jump to the option starting with what's being typed. Returns -1 if there's none.
  function seek(key: string) {
    const now = Date.now();
    const text = (now - typed.current.at < typingPause ? typed.current.text : "") + key.toLowerCase();
    typed.current = { text, at: now };
    return options.findIndex((o) => o.label.toLowerCase().startsWith(text));
  }

  // Up, down, page and pick: the same in the button and in the search field.
  function move(e: KeyboardEvent, withHomeEnd: boolean) {
    const last = shown.length - 1;
    const moves: Record<string, number> = { ArrowDown: active + 1, ArrowUp: active - 1, PageDown: active + 5, PageUp: active - 5 };
    if (withHomeEnd) Object.assign(moves, { Home: 0, End: last });
    if (e.key in moves) {
      e.preventDefault();
      setActive(Math.max(0, Math.min(last, moves[e.key])));
      return true;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0) choose(active);
      else close(searchable);
      return true;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      close(searchable);
      return true;
    }
    if (e.key === "Tab" && active >= 0 && !shown[active].action) choose(active, false);
    else if (e.key === "Tab") close();
    return e.key === "Tab";
  }

  function onKeyDown(e: KeyboardEvent) {
    const midWord = Date.now() - typed.current.at < typingPause && typed.current.text !== "";
    const typing = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.key !== " " || midWord);
    viaPointer.current = false;

    if (typing && searchable) {
      // Start the search with the key that was pressed; the field takes over from there.
      e.preventDefault();
      show(0);
      setQuery(e.key);
      return;
    }
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
    if (e.key === " ") {
      e.preventDefault();
      if (active >= 0) choose(active);
      return;
    }
    move(e, true);
  }

  // Focus moving between the button and the search field keeps the list open; leaving both closes it.
  const leave = (next: EventTarget | null) => {
    if (!root.current?.contains(next as Node)) setOpen(false);
  };

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
    const box = list.current;
    const row = document.getElementById(`${id}-option-${active}`);
    if (!open || !box || !row || !box.contains(row) || viaPointer.current) return;
    const bottom = row.offsetTop + row.offsetHeight;
    if (active === 0) box.scrollTop = 0;
    else if (row.offsetTop < box.scrollTop) box.scrollTop = row.offsetTop - panelPadding / 2;
    else if (bottom > box.scrollTop + box.clientHeight) box.scrollTop = bottom - box.clientHeight + panelPadding / 2;
  }, [open, active, id, query]);

  function hover(index: number) {
    viaPointer.current = true;
    setActive(index);
  }

  const row = (option: DropdownOption, index: number) => (
    <Row
      key={option.value}
      id={optionId(index)}
      index={index}
      option={option}
      query={query.trim()}
      active={index === active}
      selected={index === selected}
      onHover={hover}
      onChoose={choose}
    />
  );

  const place = fit.sheet
    ? "fixed inset-x-0 bottom-0 top-[12svh] z-50 rounded-t-surface p-3 shadow-float"
    : `absolute left-0 z-30 min-w-full rounded-[22px] shadow-panel ${searchable ? "p-2" : "p-1.5"} ${fit.up ? "bottom-full mb-2" : "top-full mt-2"}`;

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
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open && !searchable && active >= 0 ? optionId(active) : undefined}
        onClick={() => {
          trigger.current?.focus();
          if (open) close();
          else show();
        }}
        onKeyDown={onKeyDown}
        onBlur={(e) => leave(e.relatedTarget)}
        className={`group cursor-pointer ${triggerClassName}`}
      >
        {children}
      </button>
      <input type="hidden" name={name} value={value} />
      {open && (
        <div
          data-up={fit.up || undefined}
          data-sheet={fit.sheet || undefined}
          style={fit.sheet ? undefined : { maxHeight: fit.height }}
          className={`dropdown-panel flex flex-col bg-screen text-ink ${place}`}
        >
          {search && (
            <div className="flex flex-none items-center gap-2 pb-2">
              {/* A text field, not type="search": the browser's own clear button would bring in colours outside the theme. */}
              <label className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-soft" />
                <input
                  type="text"
                  role="combobox"
                  aria-label={`Search: ${label}`}
                  aria-expanded="true"
                  aria-controls={listId}
                  aria-autocomplete="list"
                  aria-activedescendant={active >= 0 ? optionId(active) : undefined}
                  autoFocus
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={(e) => {
                    viaPointer.current = false;
                    move(e, false);
                  }}
                  onBlur={(e) => leave(e.relatedTarget)}
                  placeholder={search.placeholder}
                  inputMode="search"
                  enterKeyHint="done"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className={`${fieldSurface} ${fieldEdge()} h-12 rounded-full pr-4 pl-11`}
                />
              </label>
              {fit.sheet && (
                <button type="button" onClick={() => close(true)} className={iconButtonClasses()}>
                  <span className="sr-only">Close</span>
                  <Close />
                </button>
              )}
            </div>
          )}
          <p aria-live="polite" className={noMatch ? "px-3.5 pt-2 pb-1 text-[15px] text-ink-soft" : "sr-only"}>
            {search && (noMatch ? search.noMatch(ownWords) : searched ? search.found(shown.length) : "")}
          </p>
          {/* Pressing on the list keeps focus where it is, so the list stays open while it's being scrolled. */}
          <div id={listId} role="listbox" aria-label={label} onMouseDown={(e) => e.preventDefault()} className="flex min-h-0 flex-1 flex-col">
            <div ref={list} className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {groups.map((group, g) => (
                <div key={group.name ?? g} role={group.name ? "group" : undefined} aria-labelledby={group.name ? `${id}-group-${g}` : undefined}>
                  {group.name && (
                    <p id={`${id}-group-${g}`} className="px-3.5 pt-2.5 pb-1 text-[13px] leading-snug font-semibold text-ink-soft">
                      {group.name}
                    </p>
                  )}
                  {group.rows.map(({ option, index }) => row(option, index))}
                </div>
              ))}
              <div aria-hidden="true" className="dropdown-more" />
            </div>
            {pinned.length > 0 && (
              <div className="mt-1 flex-none border-t border-line pt-1">{pinned.map(({ option, index }) => row(option, index))}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
