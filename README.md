# My Personal Site

Hosted on GitHub Pages at <https://siddharth-bhargava.com>.

## Local development

```bash
bun install
bun run dev       # http://localhost:8080
bun run build     # production build → dist/
bun run preview   # preview built site
```

Content lives in typed constants at the top of `src/App.tsx`
(`PROFILE`, `EXPERIENCES`, `PROJECTS`, `RESEARCH`, `SKILLS`, `NEWS`, …).


## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds
the site and publishes `dist/` to GitHub Pages.

## Stack

- Vite 8, React 19, TypeScript
- Tailwind CSS v4 (design tokens in `src/styles.css`)
- shadcn/ui primitives in `src/components/ui/`
