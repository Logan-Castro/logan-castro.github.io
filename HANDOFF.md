# Session Handoff — Logan Castro Portfolio

Context for the next session. The site is built on top of `SPEC.md` (treat that as the source of truth for design intent). This document covers what was actually built, the reasoning behind judgment calls, quirks worth knowing, and possible next steps.

The sections below are organized newest-first. **Session 3** is the most recent state; earlier sections remain accurate as foundational context — read them too.

---

## Session 3 — 2026-06-11 update

This session was focused entirely on [src/pages/about.astro](src/pages/about.astro): a small alignment fix, diagnosing a dev-server failure that masqueraded as a code bug, a full rebuild of the carousel into a draggable 3D coverflow, and final centering of the page header/body. Everything else on the site is untouched.

### About page — header & body column
- The body paragraphs were previously centered as a block but had `max-width` on the same element that carried `.container`'s `margin-inline: auto`, so the 720px block was centering in the viewport instead of aligning under the header. Fixed by nesting a `.body-copy` (constrained) inside a plain `.container`.
- Final layout (after user iteration: tried full-center, then left-aligned-but-centered-column): the **eyebrow + h1 live in `.head-copy`** and the **paragraphs in `.body-copy`**, both `max-width: 780px; margin-inline: auto`. So header, eyebrow, and body all share the same centered 780px column with left-aligned text. Paragraph measure widened 720 → 780px.

### About page — carousel rebuilt: treadmill → 3D coverflow
The Session 2 "treadmill" carousel was fully replaced with a full-bleed 3D coverflow (reference: Clément Grellier's Infinite Gradient 3D Carousel). GSAP is **not** in the project, so this is plain CSS transitions + a JS position tracker. Same `carouselImages` array (6 src/alt entries) preserved; only presentation/interaction changed.

Key implementation in [about.astro](src/pages/about.astro):
- **Full-bleed:** the carousel section dropped its `.container`. `.coverflow` is `width: 100%` inside the unconstrained `<main>`, `overflow: hidden`, `perspective: 1600px`. `.coverflow-track` is `transform-style: preserve-3d`.
- **Cards size to each image (no crop):** `.cf-card` has fixed height (`clamp(190px, 21vw, 360px)`), `width: auto`; the `<img>` is `height: 100%; width: auto`. No `object-fit: cover` — portrait and landscape photos show whole (the earlier cover version cropped faces). 16px radius, drop shadow on `.is-active` only, no border.
- **Geometry — `STOPS` table** keyed by distance from center (0/1/2 + hidden far stop 3): `{ x, z, ry, s, o }`. Defined in **both** the frontmatter (for SSR) and the client `<script>` (for runtime) — **keep the two copies in sync.** `z`=translateZ px, `ry`=rotateY deg (applied as `dir*ry` so side cards face center), `s`=scale, `o`=opacity. Side cards recede via perspective + opacity falloff (0.82 / 0.5), **no dark overlay**.
- **`x` is special:** in the frontmatter it's a viewport-fraction used only for the **SSR initial paint** (rendered as `vw`). At runtime the script **ignores `x`** and computes horizontal positions from the cards' **real measured widths** — see below.
- **Even spacing from real widths (`buildPositions`):** walks outward from the active card, accumulating `half-width + constant gap + half-width` per step (gap ≈ `max(14px, 1.2% of width)`), using each card's actual `offsetWidth × scale`. This gives a **constant edge-to-edge gap regardless of orientation** — fixing the earlier "narrow portrait floats with big gaps" problem. `posOf()` lerps the integer-offset table for fractional (drag) positions.
- **Drag/swipe = scrub:** Pointer Events. During drag each card interpolates continuously to its fractional offset (`dragRender`), so it feels like spinning the wheel (an earlier version translated the whole track as a flat layer — felt like dragging only the front photo; rejected). One card-step of drag = the active card's real neighbor distance (1:1 feel). On release it rounds to the nearest card and animate-snaps (660ms). Auto-advance (4.5s) pauses during drag/hover/focus.
- **Infinite loop:** offset is the shortest signed distance; the wrap (sign flip) happens at distance 3 where opacity is 0, so the wrapping card never sweeps across the viewport. Multi-step jumps (dots / clicking a far card) chain single steps (`STEP_MS` 360) so cards travel through the flow rather than teleporting.
- **Lifecycle:** `init` on `astro:page-load`, cleanup on `astro:before-swap` (the standard ClientRouter contract — carries over from Session 2).
- **SSR correctness:** cards render with their coverflow transforms inline (vw-based nominal positions) so the layout looks right before JS and degrades gracefully without JS; the script re-lays-out from real widths on load and on every `img` `load`.

**Tuning knobs (all single-number):** the `STOPS` `x` / `s` / `ry` / `z` / `o` columns; the `0.012` gap factor in `buildPositions`; card height `clamp` for overall size.

### New quirk — stale dev server breaks `astro:page-load` site-wide
Mid-session the hero fade-up, lightbox, **and** carousel all broke at once while CSS-only changes still worked. Root cause was **not** a code change — it was a stale `astro dev` whose Vite dependency-optimization cache for the **ClientRouter transitions runtime** had gone bad, so `astro:page-load` stopped firing (every JS feature that inits on that event dies together; styling is unaffected). Fix: kill the dev server and restart — on the fresh start Vite re-optimizes `transitions-router.js` / `transitions-events.js` / `transitions-swap-functions.js` and it works again. Signature to recognize it: **multiple unrelated JS features dead simultaneously + CSS fine** → suspect the dev server, not the diff. (Related to the Session 2 "ClientRouter resets html attributes" note and the original "stale astro dev on port 4321" quirk.)

### Updated next steps
The about-carousel rework and "about paragraph polish" items from Session 2's list are now **done**. Still standing (unchanged): Baja SAE + remaining project cover images/detail pages, tags filter on /projects, sticky nav on scroll, scroll fade-up on section entry, inline-link underlines, reading pass on project bodies, lightbox preload, mobile testing pass (the new coverflow has a `max-width: 600px` breakpoint but hasn't been phone-tested), workflow once-over before push.

---

## Session 2 — 2026-06-09 update

This session put substantial polish on the site: full project detail layouts with inline imagery, sitewide page transitions, a custom photo lightbox, real photos in the photo collection, a real cover image and technical brief for the Nap Pod project, a treadmill-style infinite carousel on /about, footer rewrites, and a content edit pass. Detailed below.

### What was built this session

#### Page transitions (sitewide)
- `<ClientRouter />` mounted in [src/layouts/Base.astro](src/layouts/Base.astro), wrapped in clearly delimited `/* PAGE TRANSITION - remove this block to disable */` comment markers (frontmatter import, `<head>` mount, and `<style is:global>` block). Removing those three blocks reverts to the no-transition state.
- Curtain-wipe: a solid `var(--accent)` bar sweeps in from the left over 240ms, covering the outgoing page, then sweeps off to the right over 240ms revealing the incoming page. Total 480ms, comfortably under 500ms.
- Implementation: `clip-path: inset()` keyframes on `::view-transition-old(root)` and `::view-transition-new(root)`, with the `::view-transition` background set to `var(--accent)` as the curtain color. So curtain reads as **terracotta `#B56B4A`** in light mode, **warm peach `#E8C4A0`** in dark mode automatically.
- Wrapped in `prefers-reduced-motion: reduce` to disable.

#### Theme persistence across transitions
- Astro's default swap copies html attributes from the new (server-rendered) document over the current html element. Because pages SSR without `data-theme`, every navigation would wipe `data-theme="dark"`, breaking the curtain color and theme styling for a frame.
- Fix in [Base.astro](src/layouts/Base.astro) inline head script: an `astro:before-swap` handler copies the current `data-theme` onto `e.newDocument.documentElement` before the swap runs, so the attribute survives.
- Belt-and-suspenders: `astro:after-swap` re-runs `applyStoredTheme()` in case anything ever does reset it.

#### ClientRouter-aware component lifecycle (the new contract)
Module scripts in Astro components run **once** on initial hard load — they do NOT re-execute on SPA navigations. Listeners bound to specific DOM nodes become orphaned when those nodes are replaced during a swap. The fix that's now used across all stateful scripts:

1. Wrap binding logic in a named `init()` function
2. Register it on `document.addEventListener('astro:page-load', init)` (fires on both initial load and every SPA navigation)
3. If the init binds document-level listeners or starts timers, store a module-scoped `cleanup` handle and call it on `astro:before-swap`

This pattern is in:
- [src/components/Nav.astro](src/components/Nav.astro) — theme toggle click handler
- [src/components/PhotoLightbox.astro](src/components/PhotoLightbox.astro) — full reinit + cleanup with `lightboxCleanup` handle
- [src/pages/index.astro](src/pages/index.astro) — hero fade-up `.is-ready` class trigger (used to be `DOMContentLoaded`, which doesn't fire during SPA navs)
- [src/pages/about.astro](src/pages/about.astro) — carousel auto-advance timer + resize debouncer

**Any new stateful component going forward should use this pattern.**

#### Prefetch tuning
- Started session with `defaultStrategy: 'hover'` — missed touch users and quick clickers.
- Then `'viewport'` so every link in view gets prefetched on every page load via IntersectionObserver. Nav links are always in viewport, so they get warmed on every page entry.
- Added a re-warming script in [Base.astro](src/layouts/Base.astro) inline head: runs on `visibilitychange` (tab regains focus) and on a 4-minute heartbeat. Filters out anchor-only links and file extensions so it only re-fetches page routes. Keeps cached HTML fresh during long idle periods.

#### Photos collection — 9 real photos, custom lightbox
- 9 photos converted from JPG/HEIC to WebP via ffmpeg, max 2400px wide, quality 85. **~40MB → ~7.4MB**.
- Photo schema in [src/content.config.ts](src/content.config.ts) extended with optional `featured`, `lens`, `exposure` fields. Three photos marked `featured: true`: Mt St Helena Sunrise, Point Reyes Two Pelicans, Point Reyes Two Elk.
- Homepage [photos teaser](src/pages/index.astro) filters to `featured: true` only (was sorting by date — same result coincidentally because the featured photos are also the most recent, but the intent is now explicit).
- `PhotoCard` aspect ratio changed from 3:4 → 2:3. The card body now wraps the cover image in a `<button data-photo-trigger>` carrying full metadata as `data-*` attributes (title, location, date, camera, lens, exposure).
- New [src/components/PhotoLightbox.astro](src/components/PhotoLightbox.astro) — a sitewide focus-mode lightbox:
  - `position: fixed; inset: 0; height: 100dvh; min-height: 100dvh` (the `dvh` units handle mobile Firefox's URL bar correctly)
  - `rgba(15, 22, 38, 0.92)` dark overlay with backdrop blur
  - Image centered with `object-fit: contain`; caption below showing title, `location · date · camera`, and a smaller line with `lens · exposure`
  - ESC key closes, click-outside closes, focus returns to trigger on close
  - Body scroll locked while open; restored on close
  - Replaces an earlier `<dialog>`-based version that had centering quirks
- Lightbox is mounted on `/photos`, `/`, and project detail pages — same component, fed different metadata depending on context.
- The lede on `/photos` reads: "Mostly shot on an iPhone 15 Pro, occasionally on a Nikon D5100 I'm still figuring out. All of it taken somewhere worth being."

#### Project detail pages — full template rebuild
- Body rendering in [src/pages/projects/[slug].astro](src/pages/projects/[slug].astro) rewritten to parse the markdown body into structured sections server-side.
- New dependency: **`marked`** (~25KB). Renders each section's body markdown to HTML independently. Astro's `<Content />` couldn't be used because we split the body into per-section blocks with different layouts.
- Per-section image attachment via an HTML comment placed directly under a `## Heading`:
  ```markdown
  ## Process step
  <!-- images: file1.webp, file2.webp -->

  Body paragraph here.
  ```
  Up to 3 images per section. No comment = text-only section.
- Layout: sections with images render as a 2-column grid (text + image grid) that alternates left/right per imaged section. Sections without images render as a centered text-only block at max-width 720px.
- Image grid layouts inside the image column:
  - **1 image** — fills the column at fixed height (420px desktop, 320px mobile)
  - **2 images** — stacked vertically inside the column (an earlier side-by-side version cropped landscape photos too aggressively)
  - **3 images** — 2×2 grid, with the second image positioned to span both rows in column 2 at `align-self: center` and `height: calc(50% - 0.375rem)`. Creates a triangle silhouette with all three images at equal size (the user iterated to this from an earlier "large + 2 stacked" rectangle layout)
- Each image is a clickable lightbox trigger via the shared `PhotoLightbox`. Lightbox title = section heading.
- Hero header polish (after user iteration):
  - Eyebrow line removed (category/status only on catalog cards now)
  - h1 `margin: 0 0 1rem` (top margin zeroed since no eyebrow above)
  - `.project-head { padding-block: 4rem }` symmetric, so the row centers within the hero
  - `align-items: center` on `.head-grid` + `align-self: center` on `.head-cover` for vertical centering
  - `.tags { margin-top: 1.25rem }` gives a clear gap between context line and tag pills
- New optional schema field: `imageDir: z.string().optional()`. Defaults to project slug; only needed when the project's image folder is named differently than the slug (Wildfire's folder is `wildfire/`, so its MD has `imageDir: "wildfire"`).
- Markdown links in body text are processed by `marked` and rendered as `<a>`. For `target="_blank"`, use raw HTML inline since markdown's `[text](url)` syntax can't add target/rel: `<a href="..." target="_blank" rel="noopener noreferrer">text</a>`.

#### Wildfire project — fully populated
- All 16 images converted to WebP (**51M → 6.2M**, 88% reduction).
- [src/content/projects/wildfire-topographic-map.md](src/content/projects/wildfire-topographic-map.md) has image comments per section exercising all layout cases (1-image, 2-image, 3-image, and text-only).
- Outcome section links the Nap Pod via standard markdown link.

#### Folding Nap Pod project — fully populated
- 11 PNGs converted to WebP + 1 animated GIF kept as GIF (animated WebP came out 5–15× the GIF size for this content; not worth it).
- Cover image is the team photo (`Cover_Team_Picture.webp`).
- Section image comments populated. Image distribution alternates well across the 6 sections.
- New: research-backed design report link in the Outcome section pointing to `/documents/projects/folding-nap-pod/Nap_Pod_Technical_Brief.pdf`. Uses raw `<a target="_blank">` so it opens in a new tab.

#### Documents folder convention
- New: `public/documents/projects/<slug>/` for PDFs, specs, reports per project.
- Mirrors the existing `public/images/projects/<slug>/` pattern (one root per asset type, projects grouped by slug below).
- Filenames are sanitized to use underscores or hyphens (no spaces) to avoid URL encoding noise.

#### About page — new copy + treadmill carousel
- Body copy fully rewritten (3 paragraphs: Sonoma County roots → being outside → what they want to build). User iterated the copy directly several times mid-session — don't regenerate.
- Old layout was text column left + single image right. Replaced with text column on top, full-width carousel below — gives the carousel real horizontal space to show neighbor slides.
- Carousel went through three implementations this session:
  1. Crossfade between slides in a 4:5 portrait slot (cropping landscape photos badly)
  2. Slide-track with clones at edges for peek + snap-back wrap (visible right-edge discontinuity on wrap)
  3. **Final: treadmill** — JS detaches all SSR slides as templates, populates the track with a rolling window of 5 clones (active center + 2 buffer slides each side). After each advance animation, the leftmost slide is removed from DOM and a new one appended on the right; transform is reset without animation to compensate for the layout shift so the visible position never jumps. Continuous infinite scroll, no snap discontinuity. Mirror operation for backward.
- Auto-advance every 4.5s, hover/focus pauses, prev/next arrows + dot indicators for manual nav. Dots take shortest-path chained steps (each step takes 620ms). Respects `prefers-reduced-motion`.
- 6 images in the rotation after cutting basketball (Bali bike, Mt St Helena summit, Cache Creek whitewater, Bodega Marine Lab urchin, Portland street, SRJC halloween).
- The old `about-workshop.jpg` placeholder was removed mid-session.

#### Footer rewrite
- Real contact info: email displays the full address (`loganacastro@gmail.com`) as the link text, LinkedIn at `www.linkedin.com/in/loganacastro`. GitHub link removed.
- Email click copies the address to clipboard via `navigator.clipboard.writeText()` (with `execCommand('copy')` fallback) and shows a small "Copied!" toast pill above the button for 1.5s.
- Layout: name on left, links cluster + © clustered on the right (was previously evenly spread via space-between).

#### Hero & homepage
- Eyebrow line ("Mechanical engineering student · Santa Rosa, CA") removed.
- h1 margin-top zeroed (no eyebrow to space from).
- Hero subhead text was edited down by the user.
- **Fade-up animation on initial entry**: `.hero-inner` starts at `opacity: 0; translateY(8px)`, transitions to `1; 0` over 400ms ease-out. Triggered by adding `.is-ready` class on `astro:page-load`. Wrapped in `prefers-reduced-motion: no-preference` so reduced-motion users see the final state immediately with no animation.

#### Project tags content edit
- All occurrences of "Fusion 360" → "Fusion" (Autodesk renamed the software). One intentional exception: "Slicer for Fusion 360" stays as the historical product name — that's what the software was called when it was discontinued.

### New quirks worth knowing

#### ClientRouter resets html attributes by default
The `<html>` element survives across SPA navigations but its **attributes** get reset from the SSR'd new document (only `lang` is preserved automatically). This wiped `data-theme="dark"` mid-transition. Any other state stored on the html element will need the same `astro:before-swap` copy treatment.

#### `marked` is now a dependency
Used in [[slug].astro](src/pages/projects/[slug].astro) to render per-section markdown to HTML. The project page bypasses Astro's standard `<Content />` because sections need to be individually wrapped in custom layout grids.

#### ffmpeg image format gaps
- **Apple ProRAW DNG** (iPhone 15 Pro raw, ~16MB files) is NOT decoded — ffmpeg's TIFF decoder errors with "bpp=30 bppcount=3 not supported". User has to re-export as JPEG from Lightroom first.
- **HEIC** works but the `-vf "scale=..."` filter causes a "complex filtergraph" conflict error. Drop `-vf` and HEIC converts fine.
- **Animated GIF → animated WebP** comes out 5–15× **larger** than the source GIF for screen-recording-style content (GIFs are already palette-optimized). Keep such GIFs as GIFs; modern browsers all support animated GIF inline.

#### IDE formatter races with Edit
When `about.astro` was open in VSCode during heavy iteration, the formatter modified the file between Read and Edit, causing repeated "file has been modified since read" errors from the Edit tool. Workarounds: use `Write` to atomically rewrite the file, use Bash `sed` for single-line changes, or close the file in the IDE before multi-edit sequences.

#### Carousel SSR-to-JS flash
There's a brief (~50–150ms) moment on initial page load where the SSR shows all 6 carousel slides in a flex row before JS rebuilds the track as the 5-slot treadmill window. Imperceptible to most users. If it ever becomes distracting, the fix is to give `.carousel-track` `opacity: 0; transition: opacity 200ms` and remove it after `positionToSlot(BUFFER, false)` runs in init.

### Updated next steps

These already happened (struck through from the original list):
- ~~Real cover images for featured projects~~ — Wildfire and Nap Pod done. Baja SAE still pending.
- ~~Project detail page inline images + lightbox~~ — done; layout, alternation, lightbox all working.
- ~~Footer placeholders~~ — done.
- ~~Photos collection real cover images~~ — done.
- ~~Hero animation (initial fade-up)~~ — done.

Still standing, reordered:

1. **Populate remaining 24 project detail pages** with `<!-- images: ... -->` comments and image folders. Pattern is documented in [[slug].astro](src/pages/projects/[slug].astro) — drop images in `public/images/projects/<slug>/`, add `imageDir` to frontmatter only if folder name differs from slug, add image comments under section headings. Baja SAE is the most-visible next target (featured on homepage, currently renders as a gradient placeholder).

2. **Tags filter on /projects** — still flagged from prior session. Tag vocabulary is consistent across projects. Implementation options: second pill row of distinct tags, multiselect dropdown, or chips that pull from a derived set.

3. **Sticky nav on scroll** — spec polish item. Subtle background blur or solid fill once scrolled past the hero. Currently the nav is fully static.

4. **Scroll fade-up on section entry** — IntersectionObserver-based opacity + translateY on featured cards, process sections, etc. as they enter viewport. Wrap in `prefers-reduced-motion: no-preference`.

5. **Inline-link visibility in body prose** — internal markdown links (Wildfire → Nap Pod, Nap Pod → technical brief) render in terracotta accent without underline. They can be hard to spot in prose. Consider scoped `text-decoration: underline; text-underline-offset: 3px` on `.project-body :global(a)` so it doesn't change global link styling.

6. **Reading pass on extrapolated project bodies** — still flagged from prior session. User has been editing some bodies directly; worth a focused pass before public publishing.

7. **About page paragraph 2 polish** — was mid-edited at one point in this session. Final state looks readable but it ended with "before discovering PB&J burritos" which the user added in a quick edit; might want a final read.

8. **Lightbox preload** — current lightbox sets `img.src` on click with no prev/next preload. For snappier browse through a project's images, preload adjacent images when the lightbox opens.

9. **Mobile testing pass** — most layout work was verified at desktop. Project detail image grids, the about carousel treadmill, and the photos masonry have mobile breakpoints in CSS but haven't been thoroughly tested on a phone-sized viewport.

10. **Workflow check before next push** — `.github/workflows/deploy.yml` exists; commit log shows Node version pin updates. New `marked` dependency should be picked up by `npm ci` in the workflow automatically, but worth a once-over before pushing.

11. **Carousel SSR-to-JS flash** (low priority) — the brief unstyled-carousel moment on initial load described in quirks above. Only worth fixing if it bothers anyone.

12. **Hero parallax + other lower-priority animations** — spec polish items, still untouched.

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

3. **Filter by tools/tags** — the user "might suggest" this. Most projects have 3–6 tags with consistent vocabulary (Fusion, 3D Printing, Laser Cutter, Illustrator, CNC, Arduino, etc.). Implementation options: second pill row, multiselect dropdown, or chips that pull from a derived set of distinct tag values across the collection.

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
