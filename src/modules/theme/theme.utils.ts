/**
 * Theme state, shared by the footer toggle and the ⌘K palette.
 *
 * Three states: "light", "dark", and "system" (no stored preference, follow
 * the OS). The class on <html> is applied by the inline script in layout.tsx
 * before first paint; this module keeps it in sync afterwards.
 */

export type Theme = "light" | "dark" | "system";

export function getTheme(): Theme {
  if (typeof localStorage === "undefined") return "system";
  const stored = localStorage.getItem("theme");
  return stored === "light" || stored === "dark" ? stored : "system";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  if (theme === "system") {
    localStorage.removeItem("theme");
  } else {
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }
  // Let listeners (footer toggle, palette) re-read the new value.
  window.dispatchEvent(new CustomEvent("themechange"));
}

/** Cycles light → dark → system → light. */
export function nextTheme(current: Theme): Theme {
  return current === "light" ? "dark" : current === "dark" ? "system" : "light";
}
