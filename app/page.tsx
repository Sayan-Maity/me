import {
  person,
  experience,
  earlier,
  skillGroups,
  education,
} from "@/lib/data";
import { CommandPalette } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-bg focus:px-3 focus:py-2 focus:text-accent"
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-[76ch] px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <main id="main">
          {/* ── Header ─────────────────────────────────────────────── */}
          <header>
            <h1 className="text-[24px] font-medium tracking-tight">
              {person.name}
            </h1>
            <p className="mt-5 text-muted">{person.tagline}</p>
            <p className="mt-4 text-faint">
              {person.role} · {person.location}
            </p>
          </header>

          {/* ── Experience ─────────────────────────────────────────── */}
          <Section title="Experience">
            {experience.map((job) => (
              <div key={job.company} className="mb-10 last:mb-0">
                <h3 className="text-[15px] font-medium">
                  {job.url ? (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                {job.roles.map((role) => (
                  <article key={role.title} className="mt-5">
                    <div className="flex flex-col gap-y-0.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                      <h4 className="text-muted">
                        {role.title}
                        <span className="text-faint"> · {role.type}</span>
                      </h4>
                      <span className="text-faint tabular-nums">
                        {role.dates}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {role.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-muted">
                          <span aria-hidden="true" className="text-faint">
                            —
                          </span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            ))}

            <h3 className="mt-12 text-[15px] font-medium">Earlier</h3>
            <p className="mt-2 text-faint">
              Frontend internships and freelance work, 2023—24.
            </p>
            <ul className="mt-4 space-y-2">
              {earlier.map((e) => (
                <li key={e.company} className="flex gap-x-4 text-muted">
                  {/* Notes are written to fit one line; truncate rather than
                      wrap if one ever runs long, so the year column holds. */}
                  <span className="min-w-0 flex-1 truncate">
                    {e.company}
                    <span className="text-[13px] text-faint"> · {e.note}</span>
                  </span>
                  <span className="shrink-0 text-[13px] text-faint tabular-nums">
                    {e.dates}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          {/* ── Skills ─────────────────────────────────────────────── */}
          <Section title="Stack">
            <ul className="space-y-2">
              {skillGroups.map((g) => (
                <li key={g.label} className="flex flex-wrap gap-x-4">
                  <span className="w-20 shrink-0 text-faint">{g.label}</span>
                  <span className="min-w-0 flex-1 text-muted">
                    {g.items.join(", ")}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          {/* ── Contact ────────────────────────────────────────────── */}
          <Section title="Contact">
            <ul className="space-y-1.5">
              <ContactLink href={`mailto:${person.email}`} label="Email">
                {person.email}
              </ContactLink>
              <ContactLink href={person.links.github} label="GitHub">
                Sayan-Maity
              </ContactLink>
              <ContactLink href={person.links.linkedin} label="LinkedIn">
                sayan-maity
              </ContactLink>
              <ContactLink href={person.links.resume} label="Résumé">
                resume.pdf
              </ContactLink>
            </ul>
            <p className="mt-6 text-faint">
              {education.degree}, {education.schoolShort} — {education.grade}.
            </p>
          </Section>
        </main>

        <footer className="mt-20 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-rule pt-6 text-faint">
          <p>
            Press{" "}
            <kbd className="text-[13px] text-muted">
              {/* JetBrains Mono's latin subset has no U+2318; fall back to the
                  system UI font for this one glyph rather than ship a subset. */}
              <span className="font-sans">⌘</span>K
            </kbd>{" "}
            to navigate.
          </p>
          <ThemeToggle />
        </footer>
      </div>

      <CommandPalette />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const id = title.toLowerCase();
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mt-16">
      <h2
        id={`${id}-heading`}
        className="mb-5 text-[13px] uppercase tracking-[0.2em] text-faint"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function ContactLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <li className="flex flex-wrap items-baseline gap-x-4">
      <span className="w-16 shrink-0 text-faint sm:w-20">{label}</span>
      <a
        href={href}
        {...(external ? { rel: "me noopener", target: "_blank" } : {})}
        className="text-faint transition-colors hover:text-accent"
      >
        {children}
      </a>
    </li>
  );
}
