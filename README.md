# cleartools-website

The marketing site for **Clear Tools** — [clear.tools](https://clear.tools).

This repo is the site only; it does not contain the products themselves.

## Stack

- [Qwik](https://qwik.dev/) 2 + QwikRouter (file-based routing under `src/routes/`)
- [Tailwind CSS](https://tailwindcss.com/) v4, configured CSS-first — theme tokens live in the
  `@theme` block of `src/global.css`, there is no `tailwind.config.js`
- TypeScript (strict), ESLint + Prettier
- Deployed to [Vercel](https://vercel.com/) as an Edge Function (`adapters/vercel-edge/`,
  `src/entry.vercel-edge.tsx`, `vercel.json`)

## Getting started

```bash
npm install
npm start          # dev server, SSR mode, opens a browser
```

## Commands

| Command               | What it does                                        |
| --------------------- | --------------------------------------------------- |
| `npm start`           | Dev server (SSR mode), opens a browser              |
| `npm run dev`         | Dev server (SSR mode), no auto-open                 |
| `npm run build`       | Full production build (client + Vercel Edge server) |
| `npm run build.types` | Type-check only (`tsc --noEmit`)                    |
| `npm run preview`     | Production build + local preview server             |
| `npm run lint`        | ESLint over `src/**/*.ts*`                          |
| `npm run fmt`         | Prettier write (also sorts Tailwind classes)        |
| `npm run fmt.check`   | Prettier check                                      |
| `npm run deploy`      | `vercel deploy`                                     |

Run `npm run lint` and `npm run build` clean before opening a PR.

## Layout

```
src/
├── components/     # header, footer, theme toggle, shared UI
├── lib/
│   ├── site.ts     # single source of truth for site copy, nav and outbound links
│   └── head.ts     # <head>/meta helpers
├── routes/         # pages (index.tsx), layouts (layout.tsx), endpoints (index.ts)
├── global.css      # Tailwind v4 @theme tokens + base styles
└── root.tsx        # document root
public/             # static assets served as-is (fonts, manifest, robots.txt)
adapters/           # deploy-target Vite configs (currently vercel-edge)
```

`~/*` resolves to `src/*`.

Product claims (features, pricing, platform support) belong in `src/lib/site.ts` so they can be
changed in one place rather than hunted across pages.

## Contributing

See [`docs/GIT-WORKFLOW.md`](docs/GIT-WORKFLOW.md). Short version: branch from `main` as
`feat/…`, `fix/…` or `chore/…`, use [Conventional Commits](https://www.conventionalcommits.org/),
open a PR, squash-merge.
