# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing/product website for **Clear Tools**, built with Qwik + QwikRouter and
deployed to Vercel at **clear.tools**. This repo (`cleartools-website`) is the site only —
it does not contain the product itself.


## The product (for site copy/content)

**Clear Tools** — is a suite of propitiatory software products for the next phase of Web 3.0 .

- **ClearOPFS (https://clearopfs.com)**: a full Web Inspector panel on macOS, IOS, Safari, Chrome, Firefox and Edge (Tree and Finder-style Columns views,
  CRUD, drag-and-drop reparenting, upload/download with conflict resolution, storage-quota
  stats, keyboard shortcuts, VoiceOver support), and a reduced-capability toolbar popup on
  iOS/iPadOS (drill-down navigation, select mode, long-press action sheet, same CRUD/upload/
  download/quota feature set).

When in doubt about a product claim (pricing, feature availability, platform support),
ask the user rather than asserting it in site copy.

## Package manager

**npm**, via `package-lock.json`.

## Commands

```bash
npm start                    # dev server (vite --open --mode ssr)
npm run dev                  # dev server, SSR mode, no auto-open
npm run build                # full production build (client + server/Vercel Edge)
npm run build.client         # client-only build
npm run build.server         # qwik check-client + Vercel Edge SSR build
npm run build.types          # tsc --incremental --noEmit
npm run preview              # production build + local preview server
npm run lint                 # eslint "src/**/*.ts*"
npm run fmt                  # prettier --write .
npm run fmt.check            # prettier --check .
npm run test.unit            # vitest components (single test: vitest components -t "<name>", or point vitest at a file path)
npm run deploy               # vercel deploy
```

There is no aggregate `test`/`verify`/`typecheck` script — `build.types` is the type-check
command, and `npm run build` runs `qwik check-client` as part of `build.server`. Run
`npm run lint` before opening a PR (see Git
workflow below); there's no single script that bundles them here yet.

## Architecture

- **QwikRouter file-based routing**: `src/routes/` — `index.tsx` files are pages, `layout.tsx`
  files wrap them, `index.ts` files are endpoints. See the [routing docs](https://qwik.dev/docs/routing/).
- **`src/root.tsx`**: document root — renders `<head>`/`<body>`, wires up `DocumentHeadTags`
  and `RouterOutlet`, imports `global.css`.
- **Entry points** (one per target, do not merge): `entry.ssr.tsx` (SSR render function used by
  all adapters), `entry.preview.tsx` (local preview server), `entry.vercel-edge.tsx` (Vercel
  Edge Function handler — the actual deploy target, per `adapters/vercel-edge/vite.config.ts`
  and `vercel.json`).
- **`vite.config.ts`** is the base Vite config (qwikRouter, qwikVite, Tailwind v4 via
  `@tailwindcss/vite`, Partytown, `~/*` path alias). Adapter-specific configs under `adapters/`
  (currently just `vercel-edge/`) use `extendConfig` to layer deploy-target build settings on
  top of it — add new deploy targets the same way rather than branching inside the base config.
- **`~/*`** resolves to `src/*` (see `tsconfig.json` paths and `vite-tsconfig-paths`).
- **`src/components/`**: component directory; `example/` is the still-present starter example
  (component + Vitest spec) and is safe to delete once real components exist.
- Tailwind CSS v4 is configured via the Vite plugin, CSS-first — there is no `tailwind.config.js`.
  All theme tokens (brand colors, breakpoints, radii, font) live in `src/global.css`'s `@theme`
  block. This was ported from an old Tailwind v3 `tailwind.config.js` the user supplied
  (`darkMode: 'class'` → the `@custom-variant dark (&:where(.dark, .dark *));` line above
  `@theme`, so `dark:` variants work by toggling a `.dark` class rather than following
  `prefers-color-scheme`). Deliberately **not** ported: `clipPath`/`shapeOutside` (inert in the
  old config too — no plugin was installed to back them), and the one-off `borderWidth`,
  `maxWidth` fraction, `gridAutoRows`, and `transitionProperty` extensions (v4 covers these via
  inline arbitrary-value utilities, e.g. `border-[5px]`, `max-w-[16%]`, without pre-registering
  a token — add a named `@theme` token instead only once one of these is reused enough to
  justify it).
- **Site icon/favicon**: `public/icons/light/` and `public/icons/dark/` hold the real product
  icon at every size (`favicon.png`, `icon-16` through `icon-1024`), supplied by the user.
  `src/root.tsx` serves the light/dark favicon via `prefers-color-scheme` media-matched
  `<link rel="icon">` tags and uses the light `icon-256.png` as the `apple-touch-icon`. The old
  generic Qwik `public/favicon.svg` has been removed. PNG only — there's no vector source for
  the icon, so don't add an SVG favicon unless a real vector version shows up later.
  `public/manifest.json` references these same icons and real product name/description.
- Partytown is wired in (`src/components/partytown/partytown.tsx`, `partytownVite` in
  `vite.config.ts`) for offloading third-party scripts to a web worker, but nothing currently
  uses it.

## Conventions

- Prettier formats via `prettier-plugin-tailwindcss` (sorts Tailwind classes) — run `npm run
  fmt` rather than hand-ordering classes.
- ESLint: `eslint-plugin-qwik` recommended rules plus `typescript-eslint` recommended;
  `@typescript-eslint/no-explicit-any` is turned off.
- Component tests (`*.spec.tsx`) use `@qwik.dev/core/testing`'s `createDOM()` + Vitest, not
  Testing Library — see `src/components/example/example.spec.tsx` for the pattern
  (`render`, `screen`, `userEvent`).
- TypeScript `strict` is on (`tsconfig.json`).

## Git workflow

Adapted from  `docs/GIT-WORKFLOW.md`

- **`main` holds completed, verified work.** Do a unit of work (a feature, a page, a fix) on
  its own branch, open a PR, and squash-merge — one commit per PR on `main`, regardless of how
  many commits happened on the branch. The branch itself keeps the full history if that detail
  is ever needed.
- **Branch names**: `feat/<short-name>`, `fix/<short-name>`, `chore/<short-name>`, cut from
  `main`.
- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/). Scopes should
  reflect this site's structure, e.g. `pages`, `components`, `layout`, `seo`, `deploy`,
  `docs`, `deps` — not the extension repo's `bridge`/`panel`/`popup`/`ios`/`native` scopes,
  which don't apply here.

  ```
  feat(pages): add pricing section to landing page
  fix(layout): correct mobile nav overflow
  chore(deps): bump qwik to 2.0.0-beta.39
  ```
- **No AI attribution trailers.** Do not add `Co-Authored-By: Claude ...` or
  `Claude-Session: ...` lines to commit messages or PR descriptions — this is a solo repo and
  those trailers have no reader. Plain commit body, no trailer.
- **Before opening a PR**: `npm run lint` and
  `npm run build` should all pass clean.
- Only commit when explicitly asked to; don't amend published commits; never force-push
  without being asked.

## Common Enforced Behavior

- **DO NOT cd into pwd**: Never cd /.../PWD. Don't waste tokens into cd-ing into folders 
you already have access to
- **NEVER EVER run outside PWD**: Do not create `/tmp` outside the current PWD. Never run servers inside `/private/tmp`
- **NEVER EVER MERGE into main without approval**: Do not merge PR into main without approval
- **NEVER EVER DEPLOY without approval**: Do not deploy without approval

