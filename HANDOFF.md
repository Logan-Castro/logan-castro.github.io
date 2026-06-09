# Session Handoff — Logan Castro Portfolio

Context for the next session. The site is built on top of `SPEC.md` (treat that as the source of truth for design intent). This document covers what was actually built, the reasoning behind judgment calls, quirks worth knowing, and possible next steps.

---

## Quick context

- **What:** Astro 6 static site, personal portfolio for Logan Castro (mechanical engineering student at SRJC).
- **Repo:** `c:\Users\super\logan-castro.github.io` — published target is GitHub Pages at `logan-castro.github.io`.
- **Run dev:** `npm run dev` from the repo root → http://localhost:4321/. Astro is set to `output: 'static'`.
- **Stack:** Astro + plain CSS with custom properties (spec explicitly forbids Tailwind). No client framework; vanilla JS for the catalog filters and the theme toggle.

---

## What's built

### Foundation
- [src/styles/global.css](src/styles/global.css) — CSS custom property tokens (light + dark) directly from the spec. Google Fonts imported at the top: Libre Baskerville (headings) + Source Sans 3 (body). Minimal reset, base typography, `.eyebrow` / `.muted` / `.container` helpers.
- [src/layouts/Base.astro](src/layouts/Base.astro) — HTML shell, accepts `title` / `description` props. The spec's theme script is inlined in `<head>` with `is:inline` so it runs before any CSS loads and avoids the flash-of-wrong-theme.
- [src/components/Nav.astro](src/components/Nav.astro) — name on the left; Work / Photos / About / Resume↗ on the right; sun/moon toggle that flips `data-theme` and writes to `localStorage`.
- [src/components/Footer.astro](src/components/Footer.astro) — name, GitHub link, email link, year. **Footer email and GitHub URL are still placeholders** (`mailto:logan@example.com`, `github.com/logan-castro`).

### Content collections
- [src/content.config.ts](src/content.config.ts) — defines `projects` and `photos` collections with Zod schemas. Both use the `glob()` loader against `src/content/<name>/`.
- **Schema deviation from SPEC.md:** `cover` is `z.string().optional()` (a path to a `public/` image) instead of the spec's `image()` helper with relative paths. Reason: only the Wildfire project has real images right now, and they already live in `public/images/projects/wildfire/`. Migrating to `image()` later is a one-day refactor when there are enough images to justify reorganizing.
- Added `coverAlt` field (not in spec) for accessibility.

### Pages
- [src/pages/index.astro](src/pages/index.astro) — homepage. Hero → 3 featured projects → About teaser → photo teaser. Footer comes from Base. **The hero text was edited directly by the user after Claude wrote it** — respect those edits; don't rewrite them on a whim.
- [src/pages/projects/index.astro](src/pages/projects/index.astro) — catalog with stat cards, category pills, status pills, search input, live count. Filter logic is vanilla JS in a single `<script>` block at the bottom of the file.
- [src/pages/projects/[slug].astro](src/pages/projects/[slug].astro) — project detail page. Two-column header (meta left, cover right) → markdown body → back link. The alternating-image-per-section layout from the spec is **not yet implemented** because no project except Wildfire has inline images.
- [src/pages/about.astro](src/pages/about.astro) — about page with workshop photo.
- [src/pages/photos.astro](src/pages/photos.astro) — photo gallery (currently 3 placeholder entries with no cover images).

### Project content
- 26 markdown files in [src/content/projects/](src/content/projects/) across 6 categories. See "Category reasoning" below for the journey.
- 3 placeholder photo entries in [src/content/photos/](src/content/photos/).

---

## Categories: 6 total, and why

The spec's original enum was `machining | baja | electronics | software | other`. We iterated to a 6-category set that better fits the actual project mix.

| Category | enum value | Count | Why this exists |
|---|---|---|---|
| Vehicles | `vehicles` | 2 | Anchors the Baja work; Bike of Theseus is a future bike. |
| Fabrication | `fabrication` | 7 | "I made this with shop tools" — covers laser, waterjet, CNC, sticker print. |
| Mechatronics | `mechatronics` | 3 | Kept against pressure to dissolve. The user asked if it was worth keeping; argument was that "Mechatronics" is a category recognizable to other engineers and recruiters and signals interdisciplinary work, even with only 3 projects. |
| Class Projects | `class` | 6 | Academic context, regardless of discipline. Distinguishes "for a grade" from "for me." |
| Dorm Builds | `dorm` | 5 | Originally dorm-only, now stretches to current SRJC desk/Skadis projects — same spirit. |
| Fun | `fun` | 3 | Where the engineering isn't the point — personality stuff. |

**Category history (so you don't unintentionally undo a decision):**
- Spec started at 5 categories.
- We added `fun` when the user said "some are just for fun."
- We added `class` when the user explicitly listed 6 projects as class projects.
- We had `design` briefly (Folding Nap Pod + Pool Hoop) but dissolved it after Nap Pod moved to Class. Pool Hoop went to Fun.
- We dropped `software`, `electronics`, `machining`, `baja`, `other` from the spec's original enum during the reevaluation pass — these are reachable via tags if needed.

**Pool Basketball Hoop is in Fun, not Mechatronics**, because the engineering is real but the project's purpose is the user's brother's hangout. The Fun framing controls.

**Bomb Disarming Robot is in Class Projects**, not Fun or Mechatronics. The user originally framed it as a "fun class project," and during the recategorization we initially kept it in Fun, then moved it to Class when the user listed it among class projects. Content-wise it could defensibly live in Mechatronics; defer to the user if they want to move it.

---

## Featured projects (homepage)

Per spec: exactly 3 marked `featured: true`. Currently featured:
- Baja SAE Vehicle (current SRJC flagship, in-progress)
- Wildfire Topographic Map (award winner, has real cover image)
- Folding Nap Pod (2nd place popular vote, has team)

Rabbit Cage Accessible Latches got a Tier-1-quality writeup but `featured: false` because the user listed 4 Tier 1 projects and the homepage only fits 3. Easy to swap.

The homepage uses `.slice(0, 3)` after sorting by date — so if you mark a 4th project featured, the 3 most recent featured win.

---

## All-caps was removed everywhere

The spec originally specified `Eyebrow / label | Small, wide tracking, uppercase`. The user said they don't like the all-caps look. Result:
- `.eyebrow` no longer uses `text-transform: uppercase`.
- Wide letter-spacing was dropped (it only made sense paired with uppercase).
- Font size bumped 0.75rem → 0.85rem to compensate for lowercase reading smaller.
- This applies sitewide: hero eyebrow, card eyebrows, project header eyebrows.

If the spec gets re-read in the future, ignore the "uppercase" instruction for `.eyebrow`. The catalog page section of the spec also says "no all-caps typography" — consistent with the user's preference.

---

## Dates were inferred, not given

User confirmed: **BC = 2024–2025, High School = 2020–2024, SRJC = 2025–present.** Folding Nap Pod = Fall 2024 (the only specific BC date the user gave).

Everything else uses plausible dates that sort the catalog sensibly. Specifics in each project's frontmatter. The user can correct any individual date by editing one file.

Notable inferred dates: Wildfire = Spring 2025 (MakeBC), Rabbit Cage = Spring 2025 (BC client project), Foam Boat = Spring 2025, Adaptive Joystick = Spring 2025, Silverware/Trashcan/TV Holder/Hanging Pouch = Fall 2024 (BC dorm). Pool Hoop = current (Summer 2026). Bomb Robot = ~2023 (mid-HS).

---

## Team fields

Spec says omit `team` for solo projects. Current state:
- Baja SAE Vehicle: omitted, user said "too many students."
- Rabbit Cage Latches: `["Emma-Claire Quinn", "Avery Nash"]`
- Folding Nap Pod: `["John Slidell", "Alexander Dudgeon"]`
- Bomb Disarming Robot: `["Joe Skubic"]`
- Everything else: solo, no `team` field.

---

## Spec compliance: what we honored vs. deferred

**Honored:**
- Light/dark palettes (verbatim from spec).
- Typography (Libre Baskerville for h1-h3, Source Sans 3 elsewhere).
- Inline blocking theme script in `<head>`.
- `output: 'static'` + `site` URL in astro.config.
- Catalog page layout: stat cards + filter pills + search + live count + 3-col card grid.
- Photo and project schemas (with the deviations called out above).

**Deferred (intentionally, per spec "add these last" guidance):**
- Animations (scroll fade-up, sticky nav, hero parallax, card image hover).
- Lightbox library (spec suggests GLightbox) — needed once project detail pages have inline images.
- The alternating-image-per-section layout in `/projects/[slug]` — needs inline images first.
- `.github/workflows/deploy.yml` for GitHub Pages.

**Not built yet but ready to be:**
- A dedicated `ProjectLayout.astro` to extract the [slug].astro template. Currently `[slug].astro` IS the layout — fine for now, factor out when there's a second project-shaped page.

---

## Quirks worth knowing

### Content config changes need careful ordering
Astro 6 reloads content config in-process and re-validates every existing project file against the new schema. If you tighten an enum or remove a value while a project file still uses the old value, the sync errors out and the dev server stays in a half-broken state until restart.

**Always update the file frontmatter BEFORE updating the schema** when changing enums. We hit this once and had to restart the dev server.

### Port 4321 can be held by a stale `astro dev`
At session start, port 4321 was occupied by an `astro dev` from before our session for the same project. Symptom: Astro silently falls back to 4322 with a "Port 4321 is in use" log line. Use the PowerShell snippet to find the holder:

```powershell
Get-NetTCPConnection -LocalPort 4321 -State Listen
```

Then `Stop-Process -Id <pid> -Force`. Safe to kill if it's our own `astro dev` for this project.

### Git Bash curl `-w` format strings render as garbage on this Windows setup
Output like `C:/Program Files/Git/ HTTP 200/n` is Git Bash mangling the format string. The HTTP codes are still correct — read them; ignore the prefix/suffix garbage. PowerShell `Invoke-WebRequest` works correctly if cleaner output matters.

### The hero text is user-edited
[src/pages/index.astro](src/pages/index.astro) lines 25–29 were edited directly by the user after Claude wrote the initial version. Their current text:
> "I build things. Sometimes they win awards." + "Mechanical engineering student at Santa Rosa Junior College. Co-founded the Baja SAE program and lead vehicle dynamics. I make things work, then make them better."

Don't regenerate this on a whim. If the user asks for hero changes, edit incrementally.

### Body content has Claude-extrapolated reasoning
Where the user gave bullet points, Claude wrote 100–500-word writeups that extrapolate engineering reasoning around those bullets. Anywhere a specific claim isn't in the user's original bullets (e.g., "kinematic targets like camber curves" in the Baja writeup, "60° tipping behavior" in the Foam Boat writeup), it's plausible but not user-confirmed. The user has been clear about wanting to push back on overreach — don't double-down on extrapolated claims if they're questioned.

---

## Suggested next steps (in priority order, none required)

1. **Real cover images for featured projects** — Baja and Folding Nap Pod especially. Currently they render as terracotta/sage gradient placeholders. The Wildfire cover image (the only real one) is at `/images/projects/wildfire/Laser-Cut-Map.jpg`. New images can land in `/public/images/projects/<slug>/` and the cover frontmatter just points at them.

2. **Project detail page inline images + lightbox** — once any project has inline images, the spec's alternating left/right layout per process section and the lightbox kick in. Suggested: GLightbox per spec.

3. **Filter by tools/tags** — the user "might suggest" this. Most projects have 3–6 tags with consistent vocabulary (Fusion 360, 3D Printing, Laser Cutter, Illustrator, CNC, Arduino, etc.). Implementation options: second pill row, multiselect dropdown, or chips that pull from a derived set of distinct tag values across the collection.

4. **Footer placeholders** — `mailto:logan@example.com` and `github.com/logan-castro` need real values.

5. **`.github/workflows/deploy.yml`** for GitHub Pages, per the workflow in `SPEC.md`. Also set the Pages source to "GitHub Actions" (not branch) in repo settings.

6. **Animations pass** — once content and layout are stable. Scroll fade-up is the cheapest win; sticky nav next. All must respect `prefers-reduced-motion`.

7. **Photos collection has real cover images** — currently 3 placeholder entries with no covers, so the homepage photo teaser and `/photos` render as gradient placeholders.

8. **Reading pass on extrapolated project bodies** — the user can spot overreach; offer to revise any project body where the claims feel off.

---

## File map

```
src/
  content.config.ts          schema for projects + photos
  styles/
    global.css               tokens, type, helpers
  layouts/
    Base.astro               HTML shell + theme script
  components/
    Nav.astro                top nav + theme toggle
    Footer.astro             footer
    ProjectCard.astro        card for grids
    PhotoCard.astro          photo grid item
  pages/
    index.astro              homepage
    about.astro
    photos.astro
    projects/
      index.astro            catalog with filters
      [slug].astro           project detail
  content/
    projects/                26 markdown files
    photos/                  3 placeholder markdown files
public/
  Logan_Castro_Resume_10-10-25_5.pdf   linked from nav
  favicon.ico
  favicon.svg
  images/
    about/about-workshop.jpg
    projects/wildfire/...    real cover images for Wildfire
```

`_archive/` at repo root holds the prior Vite + React SPA the user replaced. Don't touch it; it's preserved for reference.
