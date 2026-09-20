"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { applyTheme, getTheme, nextTheme } from "@/modules/theme/theme.utils";
import { click } from "@/shared/utils/click.utils";
import { PALETTE_ITEMS } from "../constants/palette.constants";

/** All palette state and keyboard handling, kept out of the view. */
export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PALETTE_ITEMS.filter((i) => i.label.toLowerCase().includes(q));
  }, [query]);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const select = useCallback(
    (index: number) => {
      const item = results[index];
      if (!item) return;
      click();
      item.run();
      close();
    },
    [results, close],
  );

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
        click();
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

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (i + 1) % Math.max(results.length, 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        select(active);
      }
    },
    [close, results.length, select, active],
  );

  return {
    isOpen,
    query,
    setQuery,
    active,
    setActive,
    results,
    inputRef,
    close,
    select,
    onKeyDown,
  };
}
