This is an EmDash site -- a CMS built on Astro with a full admin UI.

## Commands

```bash
pnpm dev              # Start the Astro dev server
npx emdash types      # Regenerate TypeScript types from a running site
```

The admin UI is at `http://localhost:4321/_emdash/admin`.

## Key Files

| File                     | Purpose                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `astro.config.mjs`       | Astro config with `emdash()` integration, database, and storage                    |
| `src/live.config.ts`     | EmDash loader registration (boilerplate -- don't modify)                           |
| `seed/seed.json`         | Schema definition + demo content (collections, fields, taxonomies, menus, widgets) |
| `emdash-env.d.ts`        | Generated types for collections (auto-regenerated on dev server start)             |
| `src/layouts/Base.astro` | Base layout with EmDash wiring (menus, search, page contributions)                 |
| `src/pages/`             | Astro pages -- all server-rendered                                                 |

## Skills

Agent skills are in `.agents/skills/`. Load them when working on specific tasks:

- **building-emdash-site** -- Querying content, rendering Portable Text, schema design, seed files, site features (menus, widgets, search, SEO, comments, bylines). Start here.
- **creating-plugins** -- Building EmDash plugins with hooks, storage, admin UI, API routes, and Portable Text block types.
- **emdash-cli** -- CLI commands for content management, seeding, type generation, and visual editing flow.

## Documentation

The EmDash docs are available as an MCP server at `https://docs.emdashcms.com/mcp`. When you need to verify an API, hook, config option, field type, or pattern, call `search_docs` against the live documentation rather than relying on training-data recall. The docs reflect current behaviour; assumptions may not.

This template ships with `.mcp.json`, `.cursor/mcp.json`, and `.vscode/mcp.json` so Claude Code, Cursor, and VS Code auto-discover the docs server. Other tools (OpenCode, Windsurf, etc.) need a manual one-time setup -- see [docs.emdashcms.com/docs-mcp](https://docs.emdashcms.com/docs-mcp).

## Rules

- All content pages must be server-rendered (`output: "server"`). No `getStaticPaths()` for CMS content.
- Image fields are objects (`{ src, alt }`), not strings. Use `<Image image={...} />` from `"emdash/ui"`.
- `entry.id` is the slug (for URLs). `entry.data.id` is the database ULID (for API calls like `getEntryTerms`).
- When Astro's cache is enabled, pass content-query hints to `Astro.cache.set(cacheHint)`. Use the `WithCacheHint` variants for site settings, menus, taxonomies, and widget areas rendered by cached routes.
- Taxonomy names in queries must match the seed's `"name"` field exactly (e.g., `"category"` not `"categories"`).

## This Site

NV0J QTH -- the amateur radio station site for NV0J (EN41ew, Cedar Rapids, Iowa). A station landing page plus a field log of POTA activations and antenna notes. Ported from a Hugo site using the **NV0J Beacon** theme (dark operating-console readout, SDR spectrum-scope signature). Licence: GPL v2 or later.

## Pages

| Page        | Path                          | What it shows                                                                  |
| ----------- | ----------------------------- | ------------------------------------------------------------------------------ |
| Station     | `/`                           | Callsign hero, spectrum scope SVG, station readout, link into the log. No masthead/footer. |
| Log         | `/log`                        | Logbook list: date rail, title, excerpt, tag chips                             |
| Log entry   | `/YYYY/MM/DD/slug/`           | Eyebrow, title, date byline, hero image, body, tags, prev/next                 |
| Short link  | `/log/[slug]`                 | 301 to the dated permalink                                                     |
| Tags        | `/tags/`, `/tags/[slug]/`     | Tag index by count; entries for one tag                                        |
| Page        | `/pages/[slug]`               | Static page content (Portable Text)                                            |
| RSS         | `/rss.xml`                    | Feed. `/index.xml` and `/log/index.xml` (old Hugo feeds) 301 here.             |

Log entry URLs keep the Hugo permalinks and are built from the UTC publish date. `src/utils/log.ts` (`entryPath`) and the posts collection's `urlPattern` (`/{year}/{month}/{day}/{slug}`) must agree. A request with a stale date 301s to the canonical URL.

EmDash redirect rules skip paths with a file extension, so `.xml` aliases are Astro endpoints, not seed redirects.

## Schema

- `posts` collection (admin label "Log"): `title`, `featured_image` (hero), `content` (Portable Text), `excerpt` (text). Comments are off.
- `pages` collection: `title`, `content`.
- Taxonomy: `tag` only (band, rig, park reference -- e.g. `20m`, `hf-010`, `us-1449`).
- `primary` menu: Station (`/`), Log (`/log`). Drives the masthead and footer links.
- The station readout (grid, QTH, rig, bands) is hard-coded in `src/pages/index.astro`.

Seeds always publish at "now". To backdate an imported entry, publish it with `publishedAt` (`POST /_emdash/api/content/posts/{id}/publish`, needs `content:publish_any`) or set the date in the admin.

## Visual character

Dark console on a faint scope-graticule grid. All styles are in `src/styles/nv0j.css` (the ported theme stylesheet). `tokens.css`/`theme.css` from the blog template are no longer used.

- Colours: `--ink` background, `--panel`/`--panel-2` surfaces, `--line`/`--line-2` hairlines, `--text`, `--muted`/`--muted-2`. Two accents with fixed jobs: `--phosphor` (amber: the lit "0", active nav, hot values, hover rails) and `--signal` (teal: links, scope trace, band chips). Don't add a third.
- Type: **Chakra Petch** (`--font-display`, 600/700) for callsign and headings, **IBM Plex Mono** (`--font-mono`) for UI, labels and meta, **IBM Plex Sans** (`--font-body`) for article prose. Loaded in `astro.config.mjs` under `fonts:`; the stylesheet aliases them as `--f-display`, `--f-mono`, `--f-body`.
- The callsign always renders as `NV<span class="z">0</span>J` so the zero glows amber.
- Motion (scope sweep, pulse tick) is disabled under `prefers-reduced-motion`.

## What not to do

- Don't add a light mode or coloured section backgrounds; the site is deliberately dark.
- Don't replace Chakra Petch / IBM Plex with generic sans faces.
- Don't change the log permalink shape; existing links from the Hugo site depend on it.
- Don't put the masthead or footer on the station landing page (`front` prop on `Base`).
