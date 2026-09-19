"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { person } from "@/lib/data";
import { applyTheme, getTheme, nextTheme } from "@/lib/theme";

type Item = { label: string; hint: string; run: () => void };

const jump = (id: string) => () =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const open = (url: string) => () => window.open(url, "_blank", "noopener");

const ITEMS: Item[] = [
  { label: "Experience", hint: "Section", run: jump("experience") },
  { label: "Stack", hint: "Section", run: jump("stack") },
  { label: "Contact", hint: "Section", run: jump("contact") },
  {
    label: "Copy email",
    hint: person.email,
    run: () => navigator.clipboard?.writeText(person.email),
  },
  { label: "GitHub", hint: "External", run: open(person.links.github) },
  { label: "LinkedIn", hint: "External", run: open(person.links.linkedin) },
  {
    label: "Résumé",
    hint: "PDF",
    run: () => window.open(person.links.resume, "_blank", "noopener"),
  },
  {
    label: "Toggle theme",
    hint: "T",
    run: () => applyTheme(nextTheme(getTheme())),
  },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = ITEMS.filter((i) =>
    i.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  // ⌘K opens the palette. Theme uses a plain "t" rather than a ⌘ chord:
  // every ⌘/⇧⌘ combination around T is reserved by the browser for tab
  // management and cannot be reliably intercepted. Plain keys are ignored
  // while typing in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // e.code is layout- and modifier-independent, unlike e.key which
      // becomes "T" when shift is held.
      if (e.code === "KeyK" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((v) => !v);
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.isContentEditable)) return;
      if (e.code === "KeyT") {
        e.preventDefault();
        applyTheme(nextTheme(getTheme()));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => setActive(0), [query]);

  if (!isOpen) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return close();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    }
    if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      results[active].run();
      close();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-fg/15 px-4 pt-[18vh] backdrop-blur-[2px]"
      onClick={close}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-md border border-rule bg-bg"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Jump to…"
          aria-label="Search commands"
          aria-controls="cmdk-list"
          className="w-full border-b border-rule bg-transparent px-4 py-3 text-fg outline-none focus-visible:outline-none placeholder:text-faint"
        />
        <ul id="cmdk-list" role="listbox" className="max-h-72 overflow-y-auto py-1">
          {results.length === 0 && (
            <li className="px-4 py-3 text-faint">No matches.</li>
          )}
          {results.map((item, i) => (
            <li key={item.label}>
              <button
                type="button"
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  item.run();
                  close();
                }}
                className={`flex w-full items-baseline justify-between px-4 py-2 text-left ${
                  i === active ? "bg-rule/60 text-fg" : "text-muted"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-faint">{item.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
