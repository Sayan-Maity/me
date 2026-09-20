"use client";

import { useEffect, useState } from "react";
import { applyTheme, getTheme, nextTheme, type Theme } from "@/lib/theme";
import { click } from "@/lib/click";

const LABEL: Record<Theme, string> = {
  light: "light",
  dark: "dark",
  system: "system",
};

export function ThemeToggle() {
  // Start as null so the server-rendered markup and the first client render
  // agree; the real value is read after mount.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(getTheme());
    const sync = () => setTheme(getTheme());
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        if (!theme) return;
        click();
        applyTheme(nextTheme(theme));
      }}
      className="text-faint transition-colors hover:text-accent"
      aria-label={
        theme ? `Theme: ${LABEL[theme]}. Click to change.` : "Change theme"
      }
    >
      {/* Stack the widest label under the real one so the footer reserves
          its width and does not shift when the theme resolves on mount. */}
      <span className="grid">
        <span className="invisible col-start-1 row-start-1" aria-hidden="true">
          system
        </span>
        <span className="col-start-1 row-start-1 text-left">
          {theme ? LABEL[theme] : ""}
        </span>
      </span>
    </button>
  );
}
