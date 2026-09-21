import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { site, person } from "@/shared/constants/content.constants";
import { buildGraph } from "@/shared/utils/schema.utils";
import "./globals.css";

// Self-hosted at build time by next/font: no render-blocking request to
// Google, no layout shift, no third-party connection.
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  // Only 400 (body) and 500 (headings) are used; the default variable range
  // ships weights this page never renders.
  weight: ["400", "500"],
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/icon-180.jpg", sizes: "180x180" }],
  },
  authors: [{ name: person.name, url: site.url }],
  creator: person.name,
  keywords: [
    "Sayan Maity",
    "software engineer",
    "frontend engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Bengaluru",
  ],
  openGraph: {
    type: "profile",
    title: site.headline,
    description: site.description,
    url: site.url,
    siteName: person.name,
    locale: "en_US",
    images: [
      // 1200x630 is what Slack, LinkedIn and X expect; a square renders as
      // a small thumbnail instead of a full-width card.
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${person.name} — ${person.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.headline,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The inline script below adds a "light"/"dark" class to <html> before
    // React hydrates, so the server markup and the live DOM differ by design.
    // Without this, React reports a mismatch and may strip the class, which
    // would flash the wrong theme.
    <html
      lang="en"
      className={jetbrains.variable}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint so the saved theme is applied with no
            flash of the wrong palette. Must stay inline and blocking. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");document.documentElement.classList.add(t==="light"||t==="dark"||t==="system"?t:"dark")}catch(e){document.documentElement.classList.add("dark")}})()`,
          }}
        />
        {/* Sets reveal-ready before first paint so sections are never
            painted visible and then hidden — that flash was the glitch.
            Mirrors the guards in ScrollReveal: no JS, reduced motion or a
            missing IntersectionObserver all leave content visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&"IntersectionObserver" in window){document.documentElement.classList.add("reveal-ready")}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildGraph()) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
