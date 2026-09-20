"use client";

import dynamic from "next/dynamic";

/**
 * Loads the command palette and console easter egg outside the initial
 * bundle. Neither renders anything on first paint — the palette is hidden
 * until ⌘K and the console egg returns null — so their code has no reason
 * to be in the critical path.
 */
const CommandPalette = dynamic(
  () =>
    import("@/modules/palette/components/CommandPalette").then(
      (m) => m.CommandPalette,
    ),
  { ssr: false },
);

const ScrollReveal = dynamic(
  () => import("@/modules/reveal/ScrollReveal").then((m) => m.ScrollReveal),
  { ssr: false },
);

const ConsoleEgg = dynamic(
  () => import("@/modules/console/ConsoleEgg").then((m) => m.ConsoleEgg),
  { ssr: false },
);

export function DeferredClient() {
  return (
    <>
      <CommandPalette />
      <ConsoleEgg />
      <ScrollReveal />
    </>
  );
}
