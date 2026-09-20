import type { Theme } from "../theme.utils";

/** Labels shown on the footer toggle. */
export const THEME_LABEL: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

/** The widest label, rendered invisibly to reserve the toggle's width so
    the footer does not shift when the theme resolves on mount. */
export const WIDEST_THEME_LABEL = "System";
