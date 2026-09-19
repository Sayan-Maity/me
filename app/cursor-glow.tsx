"use client";

import { useEffect } from "react";

/**
 * Lights the background grid faintly around the cursor.
 *
 * Writes two CSS custom properties and lets the compositor do the painting;
 * updates are coalesced into a single rAF per frame, so a burst of mousemove
 * events costs one style write rather than dozens. Disabled for touch
 * devices (no cursor) and for prefers-reduced-motion.
 */
export function CursorGlow() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    const root = document.documentElement;
    let x = 0;
    let y = 0;
    let queued = false;

    const paint = () => {
      queued = false;
      root.style.setProperty("--glow-x", `${x}px`);
      root.style.setProperty("--glow-y", `${y}px`);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
    };

    // Only fade the glow in once the cursor has actually moved, so it does
    // not sit in the top-left corner on load.
    const onFirstMove = () => root.classList.add("glow-ready");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousemove", onFirstMove, {
      passive: true,
      once: true,
    });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", onFirstMove);
    };
  }, []);

  return null;
}
