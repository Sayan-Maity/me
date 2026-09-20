# sayanmaity.in

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

Everything lives in
[`src/shared/constants/content.constants.ts`](src/shared/constants/content.constants.ts).
The rendered page, the JSON-LD graph, `/resume.json` and `/llms.txt` all derive
from it, so they cannot drift apart. Edit that one file and rebuild.

Colours are the same story: every token is defined in
[`src/app/globals.css`](src/app/globals.css) and nothing else contains a literal
hex value.

## Structure

```
src/
  app/                      routing only — layout, page, robots, sitemap, css
  modules/
    palette/                ⌘K command palette (component + hook + constants)
    theme/                  light / dark / system toggle
    console/                console easter egg
  shared/
    components/             Key, DeferredClient
    constants/              content.constants.ts — all site content
    utils/                  schema (JSON-LD), click (Web Audio)
scripts/generate.mjs        emits public/resume.json and public/llms.txt
```

## Machine-readable endpoints

| Path | What it is |
|---|---|
| `/llms.txt` | Full content as markdown, llms.txt v2 format |
| `/resume.json` | JSON Resume schema v1.0.0 |
| `/robots.txt` | Explicitly allows the major AI crawlers |
| `/sitemap.xml` | Generated at build time |

JSON-LD (`Person` + `WebSite`) is embedded in the page head.

## The acceptance test

The previous site returned an empty `<div id="root">`. This one must not:

```sh
curl -s https://sayanmaity.in | grep -o "Sayan" | wc -l    # > 0
curl -iL -A 'Claude-User/1.0' https://sayanmaity.in        # full content, no JS
```

## TODO

- Add `public/resume.pdf` — linked from Contact and the ⌘K palette, currently 404s.
- Point the `sayanmaity.in` domain at the Vercel deployment.
