import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { site, person } from "@/lib/data";
import { buildGraph } from "@/lib/schema";
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
  authors: [{ name: person.name, url: site.url }],
  creator: person.name,
  keywords: [
    "Sayan Maity",
    "frontend engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Zamp",
    "Bengaluru",
  ],
  openGraph: {
    type: "profile",
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.title,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
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
    <html lang="en" className={jetbrains.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildGraph()) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
