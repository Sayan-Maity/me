/**
 * Theme state, shared by the footer toggle and the ⌘K palette.
 *
 * Three states: "light", "dark", and "system" (follow the OS). Dark is the
 * default on a first visit — the inline script in layout.tsx applies it
 * before first paint — but "system" remains selectable and genuinely
 * follows the OS preference once chosen.
 */

export type Theme = "light" | "dark" | "system";

export function getTheme(): Theme {
  if (typeof localStorage === "undefined") return "dark";
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  // Nothing stored yet: dark is the default.
  return "dark";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark", "system");
  root.classList.add(theme);
  localStorage.setItem("theme", theme);
  // Let listeners (footer toggle, palette) re-read the new value.
  window.dispatchEvent(new CustomEvent("themechange"));
}

/** Cycles dark → light → system → dark. */
export function nextTheme(current: Theme): Theme {
  return current === "dark" ? "light" : current === "light" ? "system" : "dark";
}
