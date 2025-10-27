# Logan Castro Portfolio

Vite + React site for a personal engineering portfolio with a dark, retro-aerospace palette. Uses a hash router for GitHub Pages-friendly routing.

## Local Development

Prereqs: Node 18+ and npm.

1. `npm install`
2. `npm run dev`
3. Open the printed URL (defaults to `http://localhost:5173`)

Notes:
- Static assets live in `public/` (favicons, images, PDFs). Project imagery is under `public/images/`.
- Some small UI assets live in `src/assets/` and are bundled by Vite.

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - build to `dist/`
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint

## App Structure

- `src/main.jsx` - React root
- `src/App.jsx` - Hash router and route table
- `src/components/Layout.jsx` - shared shell (sticky nav and routed main content)
- `src/components/Nav.jsx` - sticky navigation with mobile menu toggle
- `src/components/Hero.jsx` - typewriter intro with reduced-motion fallback and topo overlay
- `src/components/ProjectCard.jsx` - cards wired to internal project routes
- `src/components/ProjectDetail.jsx` - shared detail section utilities for project pages
- `src/components/BeforeAfterSlider.jsx` - before/after image comparison widget
- `src/components/VictorySection.jsx` - project callouts/summary visuals
- `src/data/projects.js` - project metadata feeding cards and detail headers
- `src/routes/Home.jsx` - landing page (Hero, project teaser, etc.)
- `src/routes/Projects.jsx` - all projects index
- `src/routes/Collaborate.jsx` - contact/collaboration page
- `src/routes/Resume.jsx` - in-app resume viewer (PDF under `public/`)
- `src/routes/projects/*.jsx` - case-study pages per project
- `src/routes/NotFound.jsx` - 404 catch-all

## Routes

Top-level:
- `/` - Home
- `/projects` - Projects index
- `/collaborate` - Collaboration/contact
- `/resume` - Resume viewer

Project detail routes (examples):
- `/project/wildfire-topographic-map`
- `/project/bike-of-theseus`
- `/project/3d-printed-joystick`
- `/project/robotic-arm`
...and many more under `/project/<slug>` as defined in `src/App.jsx`.

## Viewing Changes (git status)

Quick commands:
- `git status` - verbose status
- `git status -s` - short status (two-letter codes)
- `git status -sb` - short status plus branch/upstream info

Short format codes (examples):
- `M` modified, `A` added, `D` deleted, `R` renamed, `C` copied, `??` untracked
- Two columns show staged vs. unstaged, e.g. `M.` means staged modified, `.M` means unstaged modified, `MM` means both

Branch line (with `-b`):
- Shows the current branch and upstream tracking, e.g. `## main...origin/main [ahead 1, behind 2]`

## Pushing Changes

Standard branch + PR workflow is recommended. If you push directly to `main`, you can skip the PR steps.

First-time setup (if remote not configured):
1. Check remotes: `git remote -v`
2. If needed, add GitHub remote: `git remote add origin <your-repo-url>`

Create a branch and commit:
1. Update code and run locally: `npm run dev`
2. Create a branch: `git checkout -b feat/<short-description>`
3. Stage changes: `git add -A`
4. Commit: `git commit -m "feat: <short description>"`

Sync with `main` and push:
1. Fetch latest: `git fetch origin`
2. Rebase onto main (preferred) or merge: `git rebase origin/main`
3. Push the branch: `git push -u origin HEAD`

Open a PR:
- Open a pull request to `main` on GitHub, request review if needed, and merge when checks pass.

Push directly to main (if that is your flow):
1. Ensure you are on main: `git checkout main`
2. Pull latest: `git pull --rebase`
3. Stage and commit: `git add -A && git commit -m "<message>"`
4. Push: `git push`

## Build and Deploy

- Build locally: `npm run build` (outputs to `dist/`)
- Preview prod build: `npm run preview`
- The app uses a hash router (`HashRouter`) so it can be hosted on static hosts like GitHub Pages without server-side routing.

## Upcoming Work

1. Case-study depth - Add image galleries, spec sheets, and embedded media per project.
2. Content pipeline - Move long-form copy and step lists into a CMS-friendly data shape so the routes can hydrate from content files.
3. Topo overlay refinement - Consider replacing the CSS radial pattern (`.hero__topo`) with an exported SVG height map for sharper contour lines while keeping reduced-motion fallbacks.
4. Polish - Replace placeholder contact links, compress hero + project imagery, and double-check contrast with real assets.

