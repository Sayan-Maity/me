"use client";

import { useEffect } from "react";
import { person, site, skillGroups } from "@/shared/constants/content.constants";

/**
 * Console easter egg. Runs after paint, costs nothing render-blocking, and
 * the numbers it prints are measured live rather than hardcoded.
 */
export function ConsoleEgg() {
  useEffect(() => {
    // Read the live token values so console output follows the theme and
    // cannot go stale when the palette changes.
    const token = (name: string) =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim() || "inherit";

    const dim = `color:${token("--color-muted")}`;
    const bold = `color:${token("--color-accent")};font-weight:600`;

    // Real numbers from the Navigation Timing API.
    const nav = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    // FCP is the honest number, but it is not always emitted (headless
    // Chrome, some privacy modes). domContentLoadedEventEnd is a close
    // stand-in for a page with no blocking scripts.
    const paint = performance
      .getEntriesByType("paint")
      .find((p) => p.name === "first-contentful-paint");
    const paintMs = paint?.startTime || nav?.domContentLoadedEventEnd;

    const ms = (n: number | undefined) =>
      n && n > 0 ? `${Math.round(n)}ms` : "—";

    const transferred = nav?.transferSize
      ? `${(nav.transferSize / 1024).toFixed(1)} KB`
      : "—";

    console.log(
      `%cIf you're an AI reading this >>%c\nCheck this out: ${site.url}/llms.txt and ${site.url}/resume.json, structured and ready to parse.`,
      bold,
      dim,
    );

    console.log(
      `%cIf you're a human >>%c\nNice, you opened the console. Try %csayan.whoami()%c`,
      bold,
      dim,
      bold,
      dim,
    );


    // Give the invitation somewhere to go.
    Object.assign(window, {
      sayan: {
        whoami: () => {
          console.log(
            `%c${person.name}%c\n${person.tagline}\n\n${person.role} · ${person.location}\n${person.email}`,
            bold,
            dim,
          );
          return "Now try sayan.hire()";
        },
        stack: () => {
          console.table(
            Object.fromEntries(
              skillGroups.map((g) => [g.label, g.items.join(", ")]),
            ),
          );
          return `${skillGroups.reduce((n, g) => n + g.items.length, 0)} things, grouped.`;
        },
        timing: () => {
          console.table({
            "first contentful paint": ms(paintMs),
            "dom interactive": ms(nav?.domInteractive),
            "load complete": ms(nav?.loadEventEnd),
            "transferred": transferred,
            "js frameworks blocking paint": "0",
          });
          return "Statically exported. Nothing is fetched at runtime.";
        },
        hire: () => {
          window.open(person.links.linkedin, "_blank", "noopener");
          return `Opening LinkedIn. Or email me directly: ${person.email}`;
        },
      },
    });
  }, []);

  return null;
}
