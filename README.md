# Logan Castro Portfolio

A Vite + React playground for a personal engineering portfolio with a dark retro-aerospace palette.

## Local Development

1. `npm install`
2. `npm run dev`
3. Open the printed URL (defaults to `http://localhost:5173`)

Static assets live in `public/`. Add `public/hero.jpg` for the hero background and drop project card images under `public/images/`.

## App Structure

- `src/App.jsx` – Hash router + route table
- `src/components/Layout.jsx` – shared shell (sticky nav + routed main content)
- `src/components/Nav.jsx` – sticky navigation with mobile menu toggle + in-page scrolling helpers
- `src/components/Hero.jsx` – fixed-background hero with typewriter intro and motion fallbacks
- `src/components/ProjectCard.jsx` – cards wired to internal project routes
- `src/data/projects.js` – project metadata feeding cards and detail headers
- `src/routes/Home.jsx` – landing page (Hero, Projects, About, Contact)
- `src/routes/projects/*.jsx` – drafted case-study pages per project
- `src/routes/NotFound.jsx` – 404 catch-all

## Routes

- `/` – Home
- `/project/wildfire-topo-map`
- `/project/adaptive-baja-drivetrain`
- `/project/accessible-flight-controller`

## Upcoming Work

1. **Case-study depth** – Layer in image galleries, spec sheets, and embedded media per project.
2. **Content pipeline** – Move long-form copy and step lists into a CMS-friendly data shape so the routes can hydrate from content files.
3. **Topo overlay refinement** – Swap the CSS radial pattern (`.hero__topo`) with an exported SVG height map for sharper contour lines while keeping reduced-motion fallbacks.
4. **Polish** – Replace placeholder contact links, drop compressed hero + project imagery, and double-check contrast with real assets.
