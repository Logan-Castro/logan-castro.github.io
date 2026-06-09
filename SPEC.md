# Portfolio Spec — Logan Castro

This file is the source of truth for the site. Reference it when building any component or page. Typography and palette are locked in. Implementation details like specific pixel values, library choices, and animation durations are suggestions — use good judgment.

---

## Site overview

Personal portfolio for Logan Castro, mechanical engineering student at Santa Rosa Junior College. The goal is to communicate technical seriousness while feeling like a real person — not a CS nerd's portfolio. Photography and outdoor interests are part of the identity, not an afterthought.

Hosted on GitHub Pages at `logan-castro.github.io`. Built with Astro (static output). Deployed via GitHub Actions on every push to `main`.

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, 3 featured projects, brief about blurb, photo teaser |
| `/projects` | Full catalog — filterable grid of all projects |
| `/projects/[slug]` | Individual project page |
| `/photos` | Photography gallery |
| `/about` | Bio page |
| Nav link | Resume PDF download (opens in new tab) |

---

## Color tokens

Define these as CSS custom properties on `:root` and `[data-theme="dark"]`.

### Light mode (default)

```css
:root {
  --bg-primary:   #F7F3EF;
  --bg-secondary: #EDE8E3;
  --text-primary: #3D3A42;
  --text-muted:   #9E97A8;
  --accent:       #B56B4A;  /* terracotta — primary CTAs, eyebrows, hover states */
  --accent-green: #7A9E8A;  /* sage — secondary tags, subtle highlights */
  --border:       rgba(61, 58, 66, 0.12);
}
```

### Dark mode

```css
[data-theme="dark"] {
  --bg-primary:   #0F1626;
  --bg-secondary: #1C2640;
  --text-primary: #F5DEC8;
  --text-muted:   #7B7A9E;
  --accent:       #E8C4A0;  /* warm peach replaces terracotta in dark mode */
  --accent-green: #7A9E8A;  /* sage works in both modes unchanged */
  --border:       rgba(245, 222, 200, 0.10);
}
```

### Dark mode toggle behavior

1. On first visit: read `prefers-color-scheme`. Apply `data-theme="dark"` to `<html>` if the system is set to dark.
2. When user manually toggles: write choice to `localStorage` as `"dark"` or `"light"`.
3. On subsequent visits: read `localStorage` first, fall back to system preference if nothing is stored.
4. Apply the theme class via a blocking inline `<script>` in `<head>` before any CSS loads — this prevents a flash of the wrong theme on page load. This script must be inline, not deferred or in an external file.

```js
(function() {
  const stored = localStorage.getItem('theme');
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', stored || system);
})();
```

---

## Typography

Both fonts are free on Google Fonts.

| Font | Role |
|---|---|
| Libre Baskerville | All headings (h1–h3) |
| Source Sans 3 | Body text, UI labels, nav, captions, tags |

| Role | Suggested size | Weight |
|---|---|---|
| Hero heading | Large display, ~3–4rem | 700 (Libre Baskerville) |
| Section heading | ~1.75rem | 700 (Libre Baskerville) |
| Card title | ~1.1rem | 700 (Libre Baskerville) |
| Body | 1rem | 400 (Source Sans 3) |
| Eyebrow / label | Small, wide tracking, uppercase | 600 (Source Sans 3) |
| Muted / meta | ~0.85rem | 400 (Source Sans 3) |
| Nav links | ~0.95rem | 400 (Source Sans 3) |

Libre Baskerville can use 700 at display sizes — that's appropriate for a serif. Source Sans 3 should stay at 400–600.

---

## Content collections

### Projects (`src/content/projects/`)

Each project is a `.md` file. Frontmatter schema:

```yaml
---
title: "Project Title"
description: "One sentence shown on catalog cards and in meta tags."
date: 2025-11-01
category: "machining"       # machining | baja | electronics | software | other
status: "completed"         # completed | in-progress | on-horizon
tags: ["waterjet", "milling", "6061 aluminum"]
featured: false             # true for the 3 shown on homepage
cover: "./images/cover.webp"
team: ["Name One", "Name Two"]   # omit field entirely if solo project
context: "ME 101 — Santa Rosa Junior College, Fall 2025"  # class, competition, or personal
---

Long-form markdown content goes here.
```

### Photos (`src/content/photos/`)

```yaml
---
title: "Two birds at dusk"
date: 2025-10-15
camera: "iPhone 15 Pro"     # or "Nikon D3100"
location: "Bodega Bay, CA"
cover: "./images/birds.webp"
---
```

---

## Image format

Use **WebP** for all images across the site. It offers the best file size to quality ratio and is supported by all modern browsers. Astro's built-in `<Image />` component can handle optimization at build time.

---

## Project page structure (`/projects/[slug]`)

### 1. Page header
Two-column layout: left side has title, context (class/competition/personal), optional team members listed with bullet separators (omit the field entirely if solo), and a flat row of skill/tool tags as pills. Right side has the cover image. This mirrors the layout on joeskubic.com's project pages and works well.

### 2. Overview
A few sentences on what the project is and why it was made. This is the most recruiter-visible section — lead with the most technically interesting or impressive aspect, not just background context.

### 3. Process sections
One section per major build phase, following the actual chronological sequence. Each section has:
- A heading (e.g. "Waterjet Cutting and Milling")
- 1–3 paragraphs of honest process writing
- 1–3 images

Image layout per section varies intentionally:
- **1 image:** sits opposite the text, text left / image right or flipped, alternating per section
- **2 images:** pair them together on one side opposite the text
- **3 images:** use an asymmetric grid — two stacked on one side, one larger on the other. This avoids three equally narrow landscape images in a row.

All image containers should use a consistent fixed height with `object-fit: cover` so portrait and landscape photos don't cause uneven section heights. The alternating left/right pattern should flip between sections.

Images should be clickable to expand to full size. Use a lightweight lightbox library for this — GLightbox is a good option but defer the specific choice to implementation.

### 4. Challenges and learnings
Honest reflection on what went wrong, what was harder than expected, and what was learned. This is what experienced engineers and recruiters look for more than polished outcomes.

### 5. Outcome
What the project produced, and what would be done differently with more time or resources.

---

## Projects catalog page (`/projects`)

- Stat cards at top: Total projects, In progress, Completed
- Filter row: Category pills + Status pills + Search input (all three visible together)
- Live count: "Showing X of Y projects" updates as filters change
- Project card grid: 3 columns desktop, 2 tablet, 1 mobile
- Each card: cover image, eyebrow (category | status), title, short description
- Filtering is client-side JS, no page reload

Visual direction: clean cards with subtle borders. No all-caps typography, no decorative background textures. The old topo map background is dropped.

---

## Homepage sections

1. **Nav** — name on left, links on right (Work, Photos, About, Resume↗), dark mode toggle
2. **Hero** — large Libre Baskerville heading, subheading in Source Sans 3, skill tags, no full-screen background image
3. **Featured projects** — exactly 3 cards marked `featured: true` in frontmatter, link to full catalog
4. **About teaser** — 2–3 sentences, link to `/about`
5. **Photo teaser** — 3 photos from the gallery, link to `/photos`
6. **Footer** — name, GitHub, email

---

## Animations

Add these last, after layout and content are solid. All animations must be wrapped in `prefers-reduced-motion: no-preference` so they're opt-out by default.

- **Scroll fade-up** on section entry — Intersection Observer, opacity + slight translateY, ease-out
- **Image hover** on project cards — subtle scale on cover image, overflow hidden on container
- **Sticky nav** — becomes sticky on scroll, consider a subtle background blur or solid fill so it remains readable over content
- **Parallax on hero** — optional, light offset on a background element only, never on text
- **Hero parallax** and **sticky sections** are nice-to-haves, not required for first ship

---

## GitHub Actions deployment

Create `.github/workflows/deploy.yml`. Also set `output: 'static'` in `astro.config.mjs`. In GitHub repo settings, set Pages source to "GitHub Actions" not a branch.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
      - uses: actions/deploy-pages@v4
```

---

## File structure (target)

```
src/
  components/
    Nav.astro
    Footer.astro
    ProjectCard.astro
    PhotoCard.astro
    ThemeToggle.astro
  content/
    projects/
      baja-suspension.md
      ...
    photos/
      birds-dusk.md
      ...
  layouts/
    Base.astro          ← HTML shell, head, nav, footer, theme script
    ProjectLayout.astro
  pages/
    index.astro
    about.astro
    photos.astro
    projects/
      index.astro
      [slug].astro
  styles/
    global.css          ← CSS tokens, reset, base typography
public/
  resume.pdf
```

---

## Notes for Claude Code

- Build in this order: `global.css` and `Base.astro` first, then `index.astro`, then `/projects/index.astro`, then `/projects/[slug].astro`, then remaining pages.
- The theme toggle script must be an inline blocking script in `<head>` — not deferred, not external — to prevent flash of wrong theme.
- Do not use Tailwind. Plain CSS with custom properties only.
- Image heights in project page sections should be consistent across sections so aspect ratio never affects layout. Use `object-fit: cover`.
- Filter logic on `/projects` is vanilla JS — no framework needed.
- When in doubt on implementation specifics (exact pixel values, library versions, animation durations), use good judgment rather than asking. The spec covers design intent, not every implementation detail.