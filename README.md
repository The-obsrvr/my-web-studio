# Personal site — Siddharth Bhargava

Single-page personal site built with **Vite + React + TypeScript + Tailwind v4**.
Hosted on GitHub Pages at <https://siddharth-bhargava.github.io>.

## Local development

```bash
bun install
bun run dev       # http://localhost:8080
bun run build     # production build → dist/
bun run preview   # preview built site
```

Content lives in typed constants at the top of `src/App.tsx`
(`PROFILE`, `EXPERIENCES`, `PROJECTS`, `RESEARCH`, `SKILLS`, `NEWS`, …).
Swap those and the images in `src/assets/` to update the site — no other
files need to change.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds
the site and publishes `dist/` to GitHub Pages.

One-time setup on the repo: **Settings → Pages → Build and deployment →
Source: GitHub Actions**.

Because this is a *user site* (`<username>.github.io`), Vite's `base` is
`/`. For a project repo, change `base` in `vite.config.ts` to
`/<repo-name>/`.

## Stack

- Vite 8, React 19, TypeScript
- Tailwind CSS v4 (design tokens in `src/styles.css`)
- shadcn/ui primitives in `src/components/ui/`
- No backend, no router — one page, hash-anchored sections
