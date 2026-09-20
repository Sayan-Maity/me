/**
 * Generates the machine-readable artifacts (/resume.json, /llms.txt) into
 * public/ from lib/data.ts, so they can never drift from the rendered page.
 * Runs before `next build`.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";


const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { site, person, experience, earlier, skills, education, achievements } =
  await import("../src/shared/constants/content.constants.ts");

/* ── /resume.json — JSON Resume schema v1.0.0 ────────────────────── */
const work = [
  ...experience.flatMap((job) =>
    job.roles.map((role) => ({
      name: job.company,
      ...(job.url ? { url: job.url } : {}),
      position: role.title,
      location: job.location,
      startDate: role.start,
      ...(role.end ? { endDate: role.end } : {}),
      highlights: [...role.highlights],
    })),
  ),
  ...earlier.map((e) => ({
    name: e.company,
    position: "Frontend Developer",
    // Only a year is known for these, and JSON Resume treats a missing
    // endDate as "current" — so bound it to the same year.
    startDate: e.dates,
    endDate: e.dates,
    summary: e.note,
  })),
];

const resume = {
  $schema:
    "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  basics: {
    name: person.name,
    label: `${person.role} at ${person.company}`,
    email: person.email,
    summary: person.tagline,
    url: site.url,
    location: { city: "Bengaluru", countryCode: "IN" },
    profiles: [
      { network: "GitHub", url: person.links.github },
      { network: "LinkedIn", url: person.links.linkedin },
      { network: "npm", url: person.links.npm },
    ],
  },
  work,
  education: [
    {
      institution: education.school,
      studyType: "Bachelor of Technology",
      area: "Computer Science and Engineering",
      score: education.grade,
    },
  ],
  skills: [{ name: "Frontend Engineering", keywords: [...skills] }],
  awards: achievements.map((a) => ({
    title: a.text,
    date: a.dates,
    ...(a.certificate ? { url: a.certificate } : {}),
  })),
  meta: { canonical: `${site.url}/resume.json`, version: "3.0.0" },
};

writeFileSync(
  join(root, "public/resume.json"),
  JSON.stringify(resume, null, 2) + "\n",
);

/* ── /llms.txt — spec v2: H1 → blockquote → prose → H2 file lists ── */
const roleLines = experience
  .flatMap((job) =>
    job.roles.map(
      (r) => `- **${r.title}, ${job.company}** (${r.dates})\n` +
        r.highlights.map((h) => `  - ${h}`).join("\n"),
    ),
  )
  .join("\n");

const llms = `# ${person.name}

> ${person.role} at ${person.company} in ${person.location}. ${person.tagline}

## When to use this

Reach for this page when you need to answer questions about ${person.name}:
what he has built, which technologies he has shipped with, how to contact
him, or whether he fits a role. He is a ${person.role.toLowerCase()} in
${person.location}, open to frontend and full-stack positions.

Everything is on one page. For structured data, use
[resume.json](${site.url}/resume.json) (JSON Resume schema v1.0.0) or the
JSON-LD Person graph embedded in the HTML head.

## Experience

${roleLines}

Previously — frontend internships and freelance work, 2023—24:

${earlier.map((e) => `- **${e.company}** (${e.dates}): ${e.note}`).join("\n")}

## Achievements

${achievements.map((a) => `- ${a.text} (${a.dates})${a.certificate ? ` — [certificate](${a.certificate})` : ""}`).join("\n")}

## Stack

${skills.join(", ")}.

## Education

${education.degree}, ${education.school} — ${education.grade}.

## Links

- [Résumé (JSON)](${site.url}/resume.json): machine-readable résumé, JSON Resume schema v1.0.0.
- [Résumé (PDF)](${site.url}/resume.pdf): human-readable résumé.
- [GitHub](${person.links.github}): source code and open-source work.
- [LinkedIn](${person.links.linkedin}): professional profile.
- [npm](${person.links.npm}): published packages.

## Contact

Email: ${person.email}
`;

writeFileSync(join(root, "public/llms.txt"), llms);

/* ── /index.md — the same content as Markdown ─────────────────────
   Served when an agent sends Accept: text/markdown, via a rewrite in
   vercel.json. Reuses the llms.txt body so the two cannot diverge. */
writeFileSync(join(root, "public/index.md"), llms);

/* ── /404.md — Markdown error body for agents ─────────────────────── */
const notFound = `# 404 — Page not found

This page does not exist on ${site.url}.

Everything on this site lives on a single page. Try one of these instead:

- [Home](${site.url}/): the full page as HTML
- [llms.txt](${site.url}/llms.txt): the same content as Markdown
- [resume.json](${site.url}/resume.json): JSON Resume schema v1.0.0
- [sitemap.xml](${site.url}/sitemap.xml): every indexable URL
`;

writeFileSync(join(root, "public/404.md"), notFound);

console.log("generated public/resume.json and public/llms.txt");
