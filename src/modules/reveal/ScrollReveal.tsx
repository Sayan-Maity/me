"use client";

import { useEffect } from "react";

/**
 * Reveals [data-rise] sections as they scroll into view.
 *
 * Content is visible by default. This adds `reveal-ready` to <html> only
 * after confirming IntersectionObserver exists, so if JS never runs — every
 * AI crawler, and anyone with it disabled — nothing is hidden.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-rise]"),
    );
    if (!els.length) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    // Only hide once we know we can reveal again.
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      },
      // Start slightly before the section reaches the fold so it is settled
      // by the time it is properly in view.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    els.forEach((el) => io.observe(el));

    // Failsafe against a broken observer, not against slow scrolling: only
    // fires if nothing at all has been revealed, which would mean the
    // observer never worked. Sections further down are left alone so they
    // can still animate when they are actually reached.
    const failsafe = window.setTimeout(() => {
      const revealed = document.querySelector("[data-rise].is-visible");
      if (revealed) return;
      els.forEach((el) => el.classList.add("is-visible"));
      io.disconnect();
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
