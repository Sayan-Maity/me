import type { MetadataRoute } from "next";
import { site } from "@/shared/constants/content.constants";

/**
 * Absence of a rule already permits crawling — `Allow:` is permissive-only.
 * This file is documentation of intent for AI crawlers, not a functional
 * unlock. It is cheap and unambiguous, which is the point.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

// Required for `output: export`: emit at build time, not per request.
export const dynamic = "force-static";
