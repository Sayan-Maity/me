"use client";

import { useEffect, useState } from "react";
import { applyTheme, getTheme, nextTheme, type Theme } from "@/modules/theme/theme.utils";
import { click } from "@/shared/utils/click.utils";
import {
  THEME_LABEL,
  WIDEST_THEME_LABEL,
} from "@/modules/theme/constants/theme.constants";

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
        theme ? `Theme: ${THEME_LABEL[theme]}. Click to change.` : "Change theme"
      }
    >
      {/* Stack the widest label under the real one so the footer reserves
          its width and does not shift when the theme resolves on mount. */}
      <span className="grid">
        <span className="invisible col-start-1 row-start-1" aria-hidden="true">
          {WIDEST_THEME_LABEL}
        </span>
        <span className="col-start-1 row-start-1 text-left">
          {theme ? THEME_LABEL[theme] : ""}
        </span>
      </span>
    </button>
  );
}
