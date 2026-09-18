# Portfolio

Statically-exported Next.js site. Content is baked into HTML at build time so
that AI crawlers — none of which execute JavaScript — can read it.

## Develop

```sh
npm install
npm run dev      # http://localhost:3000
```

## Build

```sh
npm run build    # generates artifacts, then exports static HTML to out/
npm start        # serve the built output locally
```

## Editing content

Everything lives in [`lib/data.ts`](lib/data.ts). The rendered page, the JSON-LD
graph, `/resume.json` and `/llms.txt` all derive from it, so they cannot drift
apart. Edit that one file and rebuild.

## Structure

| Path | Purpose |
|---|---|
| `lib/data.ts` | Single source of truth for all content |
| `lib/schema.ts` | JSON-LD `@graph` (Person + WebSite) |
| `app/page.tsx` | The page — server-rendered, ships no JS |
| `app/command-palette.tsx` | ⌘K palette — the only client component |
| `app/robots.ts`, `app/sitemap.ts` | Generated at build time |
| `scripts/generate.mjs` | Emits `public/resume.json` and `public/llms.txt` |

## The acceptance test

The previous site returned an empty `<div id="root">`. This one must not:

```sh
curl -s https://<site> | grep -o "Sayan" | wc -l    # > 0
curl -iL -A 'Claude-User/1.0' https://<site>        # full content, no JS needed
```

## TODO

- Add `public/resume.pdf` (linked from Contact and the ⌘K palette).
- Set the real domain in `site.url` in `lib/data.ts` before deploying.
