# Personal Website — Single-Page Interactive Site on GitHub Pages

A single continuous webpage where each section (Home, About, Projects, Writing, Contact) lives on `/` and users navigate by smooth-scrolling between them. Feels fast and app-like — no full page reloads, transitions happen inline.

## Stack

- **Vite + React + TypeScript** — plain SPA, standard tooling, no SSR complexity
- **Tailwind CSS v4** — utility styling with semantic design tokens
- **shadcn/ui** — accessible React components you own and restyle
- **Framer Motion** — scroll-triggered animations, section transitions, hover/tap micro-interactions
- **GitHub Actions** — build on push, publish to Pages automatically

No router, no backend, no database. One HTML file, one bundle, static hosting.

## Page structure

One route (`/`) with stacked full-height sections:

```text
┌─────────────────────┐
│ Sticky nav (Home · About · Projects · Writing · Contact) │
├─────────────────────┤
│ #home     — hero / intro                                  │
│ #about    — bio                                           │
│ #projects — interactive project grid                      │
│ #writing  — notes list (optional)                         │
│ #contact  — email + socials                               │
└─────────────────────┘
```

## Interaction model ("AJAX-like feel")

Since there's no backend, "AJAX-like" means the UI feels dynamic and responsive without page reloads. Concretely:

- **Smooth-scroll nav** — clicking a nav link animates scroll to that section; URL updates to `/#projects` so links are shareable.
- **Scroll-spy nav highlight** — the active section is highlighted in the nav as you scroll (IntersectionObserver).
- **Reveal-on-scroll** — sections and cards fade/slide in as they enter the viewport (Framer Motion `whileInView`).
- **Interactive project cards** — hover states, expandable detail panels that open inline (no navigation), filterable by tag.
- **Sticky header with scroll-aware styling** — background blurs/darkens once scrolled past the hero.
- **Keyboard-friendly** — arrow keys or `j`/`k` jump between sections (optional).
- **Reduced-motion respected** — animations disabled when the OS setting is on.

## Implementation steps

1. **Scaffold swap** — Replace the current TanStack Start setup with a Vite + React + TS project. Keep Tailwind v4, shadcn/ui, and the semantic token system from `src/styles.css`.
2. **Layout** — Single `App.tsx` renders `<Header />` + stacked `<section id="...">` components for each part of the site.
3. **Design pass** — Pick a visual direction (color palette, typography, layout feel) via a design questions round before building final sections.
4. **Section components** — Build Hero, About, Projects, Writing, Contact with placeholder content you can replace.
5. **Interactivity layer** — Add Framer Motion reveal animations, smooth-scroll nav, scroll-spy, and hover/expand interactions on project cards.
6. **SEO** — Solid `<title>`, meta description, Open Graph + Twitter tags, JSON-LD `Person` schema, semantic HTML, alt text.
7. **GitHub Pages deploy** — Add `.github/workflows/deploy.yml` running `npm ci && npm run build` and publishing `dist/` via `actions/deploy-pages@v4`. Configure Vite `base` per repo type.
8. **README** — Document `npm install`, `npm run dev`, `npm run build`, and the deploy trigger.

## After setup — your workflow

1. Connect the project to GitHub (Lovable → GitHub → Create Repository).
2. `git clone` locally.
3. Edit in any editor, `npm run dev` to preview, `git push` to deploy.
4. Lovable stays optional.

## Technical details

- **Vite `base`:** `/` for `username.github.io` or a custom domain; `/<repo>/` for a project repo.
- **Smooth scroll:** CSS `scroll-behavior: smooth` + `scroll-margin-top` on section anchors to offset the sticky header. JS fallback for programmatic nav clicks.
- **Scroll-spy:** IntersectionObserver watching section visibility, updates active nav item and `history.replaceState` for the hash.
- **No SPA-fallback 404 needed** — only one route exists; deep links use hash fragments, which never hit the server.
- **Node 20** pinned in the deploy workflow.

## Open questions to resolve during build

- Repo name shape (`username.github.io` vs project repo) — affects Vite `base`.
- Include a writing/notes section now, or defer?
- Custom domain now or later?

Approve and I'll start with the scaffold swap, then run the design questions round before building sections.
