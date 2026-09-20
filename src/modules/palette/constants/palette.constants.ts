import { person } from "@/shared/constants/content.constants";
import { applyTheme, getTheme, nextTheme } from "@/modules/theme/theme.utils";
import { click } from "@/shared/utils/click.utils";

export type PaletteItem = {
  label: string;
  hint: string;
  /** Render the hint as a key cap rather than plain text. */
  isKey?: boolean;
  run: () => void;
};

const jump = (id: string) => () =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const open = (url: string) => () => window.open(url, "_blank", "noopener");

export const PALETTE_ITEMS: PaletteItem[] = [
  { label: "Experience", hint: "Section", run: jump("experience") },
  { label: "Previously", hint: "Section", run: jump("previously") },
  { label: "Achievements", hint: "Section", run: jump("achievements") },
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
    isKey: true,
    run: () => {
      click();
      applyTheme(nextTheme(getTheme()));
    },
  },
];
