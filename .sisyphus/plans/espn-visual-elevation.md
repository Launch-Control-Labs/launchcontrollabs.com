# ESPN Magazine Visual Elevation — Full Editorial Redesign

## TL;DR

> **Quick Summary**: Transform launchcontrollabs.com from a single-hero-3D + flat sections site into an ESPN Magazine-level editorial scroll experience with 6 narrative sections, each anchored by a different 3D asset, massive typography (Space Grotesk + Anton), bold color blocks, and annotation-style data callouts — all following a Pixar Story Spine narrative arc.
> 
> **Deliverables**:
> - 6 narrative scroll sections with 3D assets (single-canvas architecture)
> - Typography overhaul: Space Grotesk (display) + Anton (accent) + Inter (body) + IBM Plex Mono (data)
> - GSAP ScrollTrigger hybrid scroll (pinned 3D scenes + fluid content)
> - Mobile-optimized with progressive 3D loading
> - All existing content preserved and reframed through narrative
> - Performance: LCP <2.5s, 60fps desktop, 30fps+ mobile
> 
> **Estimated Effort**: XL (25+ tasks, 4-5 waves)
> **Parallel Execution**: YES — 5 waves
> **Critical Path**: Spike (GSAP+R3F pin) → Foundation (fonts, colors, canvas) → Sections (parallel per section) → Integration → Verification

---

## Context

### Original Request
"It does feel as visual as ESPN the Magazine especially given all the visual pieces we have" — User wants to elevate the site to editorial-magazine quality using their extensive 3D asset library (rockets, astronauts, planets, smoke, skybox). Multiple scroll sections, each featuring different assets. Must work on both web and mobile.

### Interview Summary
**Key Discussions**:
- **Scope**: Full editorial redesign, NOT just adding 3D elements to existing flat sections
- **Narrative**: Pixar Story Spine structure (Promise → Problem → Guide → Proof → Authority → Resolution)
- **Typography**: Space Grotesk (variable, display) + Anton (accent data callouts) replacing Bebas Neue
- **Scroll**: Hybrid — fluid + pinned for 3D scenes, snap for data/portfolio
- **Performance**: Both web and mobile, 2026 best practices (Draco, lazy-load, dispose)
- **Content**: All existing content preserved (Capabilities, MissionCards, TeamPedigree, Awards, Contact)
- **Existing hero**: 9/11 tasks done — fold remaining verification into this plan

**Research Findings**:
- 2026 mobile 3D budget: <50K faces, <50 draw calls, <1024px textures, DPR capped at 2
- iOS Safari limits: ~6 simultaneous WebGL contexts before killing them → SINGLE CANVAS architecture mandatory
- GSAP ScrollTrigger + R3F remains production pattern, but GSAP pin + CSS scroll-snap CONFLICT
- Space imagery psychology: aspiration, precision, vastness, overview effect
- ESPN DNA: massive condensed type, hero subjects at cinematic scale, bold monochromatic blocks, annotation callouts
- Pixar But/Therefore rule: every section must CAUSE the next (no "and then" sections)

### Metis Review
**Identified Gaps** (addressed):
- **Single vs Multi-Canvas**: RESOLVED — Single canvas with scene swapping (avoids iOS crash)
- **GSAP + R3F pin validation**: RESOLVED — Added as Wave 0 spike (blocks everything)
- **Font weight at 13vw**: RESOLVED — Added validation task; Anton is fallback if Space Grotesk too light
- **Scope creep on "ESPN Magazine"**: RESOLVED — Locked 6 sections max, no custom shaders, no new particles
- **Reverse scroll behavior**: RESOLVED — GSAP handles natively (smooth reverse)
- **Accessibility**: RESOLVED — prefers-reduced-motion kills all 3D animation, WCAG AA contrast required
- **GPU memory management**: RESOLVED — Max 2 models loaded, dispose on exit, create/destroy pattern

---

## Work Objectives

### Core Objective
Transform the site into a cinematic editorial scroll experience that tells Launch Control Labs' story through 6 narrative sections — each with a 3D asset at cinematic scale, ESPN-style massive typography, bold color theming, and annotation-style data callouts — while maintaining 60fps desktop / 30fps+ mobile performance.

### Concrete Deliverables
- Single-canvas scroll architecture with scene swapping
- 6 sections: Hero, Problem, Guide (Capabilities), Proof (Portfolio), Authority (Pedigree+Awards), Orbit (Contact)
- Typography system: Space Grotesk + Anton + Inter + IBM Plex Mono
- Color theme system: one dominant color per section
- Responsive mobile experience with 3D fallbacks
- All existing content preserved and enhanced

### Definition of Done
- [ ] `npm run build` passes with zero errors
- [ ] Lighthouse performance >70 on mobile (throttled 4G)
- [ ] LCP < 2.5s on desktop
- [ ] All 6 sections render correctly on Chrome + Safari (desktop + mobile)
- [ ] `prefers-reduced-motion` shows static version without 3D animation
- [ ] All existing content (stats, projects, team, awards, contact) is present

### Must Have
- Pixar narrative arc (each section causes the next)
- ESPN-scale typography (headlines at 13vw+)
- 3D asset per section at cinematic scale
- Bold monochromatic color per section
- Mobile-functional (not just "doesn't crash")
- Single-canvas architecture (not 6 WebGL contexts)
- Lazy-load secondary models (only hero preloaded)
- Dispose GPU resources when section exits viewport

### Must NOT Have (Guardrails)
- No custom shader work (use drei/R3F built-in materials only)
- No new particle systems beyond existing hero starfield
- No post-processing effects beyond existing hero bloom
- No horizontal scroll sections
- No scroll hijacking that breaks native momentum scroll
- No sound/audio
- No more than 6 total sections (locked)
- No custom 3D modeling (use existing assets only; if asset doesn't work, use static render)
- No CSS scroll-snap (conflicts with GSAP pin; GSAP controls ALL scroll)
- No exploration of additional fonts beyond the 4 declared
- No CMS or data layer (content stays hardcoded in components)

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (no test framework configured)
- **Automated tests**: NONE (visual/3D work — not unit-testable)
- **Framework**: N/A
- **Primary QA**: Agent-Executed via Playwright (screenshots) + Lighthouse CLI (performance) + build verification

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **3D Scenes**: Playwright opens page, waits for canvas paint, screenshots section
- **Typography**: Playwright validates computed font-family matches expected
- **Performance**: Lighthouse CLI with --throttling-method=simulate for mobile
- **Scroll**: Playwright scrolls programmatically, screenshots each pinned state
- **Mobile**: Playwright emulates iPhone 12, validates no overflow, screenshots

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 0 (Spike — MUST PASS before any section work):
├── Task 1: GSAP ScrollTrigger + R3F pin spike (proof of concept) [deep]
├── Task 2: Font validation — Space Grotesk at 13vw visual test [quick]
└── Task 3: 3D asset audit + compression pipeline [unspecified-high]

Wave 1 (Foundation — design system + infrastructure):
├── Task 4: Typography system swap (Space Grotesk + Anton via next/font) [quick]
├── Task 5: Color theme system (6 section palettes + CSS variables) [quick]
├── Task 6: Single-canvas scroll architecture scaffold [deep]
├── Task 7: Section loading skeleton + reduced-motion fallback [quick]
└── Task 8: Mobile detection + 3D tier system (full/simplified/static) [quick]

Wave 2 (Sections — MAX PARALLEL, each section is independent):
├── Task 9: Section 1 "THE PROMISE" — Hero enhancement [visual-engineering]
├── Task 10: Section 2 "THE PROBLEM" — Lost founders narrative [visual-engineering]
├── Task 11: Section 3 "THE GUIDE" — Capabilities with annotation callouts [visual-engineering]
├── Task 12: Section 4 "THE PROOF" — Portfolio as mission patches [visual-engineering]
├── Task 13: Section 5 "THE AUTHORITY" — Pedigree + Awards editorial [visual-engineering]
├── Task 14: Section 6 "THE ORBIT" — Contact with Earth overview effect [visual-engineering]
└── Task 15: Section navigation + progress indicator [quick]

Wave 3 (Integration + Polish):
├── Task 16: Scroll continuity — ensure But/Therefore causality between sections [deep]
├── Task 17: GPU memory management — dispose/create lifecycle [unspecified-high]
├── Task 18: Mobile optimization pass (all 6 sections) [unspecified-high]
├── Task 19: Performance audit + optimization (Lighthouse >70) [unspecified-high]
└── Task 20: Accessibility pass (contrast, reduced-motion, keyboard, screen reader) [unspecified-high]

Wave 4 (Deployment — after all code is complete):
└── Task 21: Deploy to Porkbun Static Hosting (GitHub Actions → deploy branch → GitHub Connect) [unspecified-high]

Wave FINAL (After ALL tasks — 4 parallel reviews, then user okay):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA — full scroll through on Chrome + Safari + mobile (unspecified-high)
└── Task F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 6, all Wave 2 | 0 |
| 2 | — | 4, 9-14 | 0 |
| 3 | — | 9-14 | 0 |
| 4 | 2 | 9-14 | 1 |
| 5 | — | 9-14 | 1 |
| 6 | 1 | 9-14 | 1 |
| 7 | — | 9-14 | 1 |
| 8 | — | 9-14, 18 | 1 |
| 9 | 4, 5, 6, 7, 8 | 16, 17 | 2 |
| 10 | 4, 5, 6, 7, 8 | 16, 17 | 2 |
| 11 | 4, 5, 6, 7, 8 | 16, 17 | 2 |
| 12 | 4, 5, 6, 7, 8 | 16, 17 | 2 |
| 13 | 4, 5, 6, 7, 8 | 16, 17 | 2 |
| 14 | 4, 5, 6, 7, 8 | 16, 17 | 2 |
| 15 | 6 | 16 | 2 |
| 16 | 9-15 | F1-F4 | 3 |
| 17 | 9-14 | 18, 19 | 3 |
| 18 | 8, 17 | F3 | 3 |
| 19 | 17, 18 | F1-F4 | 3 |
| 20 | 9-15 | F1-F4 | 3 |

### Agent Dispatch Summary

- **Wave 0**: 3 tasks — T1 → `deep`, T2 → `quick`, T3 → `unspecified-high`
- **Wave 1**: 5 tasks — T4-5,7-8 → `quick`, T6 → `deep`
- **Wave 2**: 7 tasks — T9-14 → `visual-engineering`, T15 → `quick`
- **Wave 3**: 5 tasks — T16 → `deep`, T17-20 → `unspecified-high`
- **FINAL**: 4 tasks — F1 → `oracle`, F2-F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

### Wave 0 — Spike (MUST PASS before any section work)

- [ ] 1. GSAP ScrollTrigger + R3F Pinned Scene Spike

  **What to do**:
  - Create a proof-of-concept at `src/components/spike/ScrollPinSpike.tsx`
  - Implement: one R3F Canvas (single WebGL context) with a rotating cube
  - GSAP ScrollTrigger pins the canvas container while a text overlay scrolls through
  - Validate: smooth pin/unpin, no jank, works on scroll reversal
  - Test on Chrome + Safari desktop + Chrome mobile emulation
  - If React 19 strict mode causes double-mount issues with GSAP, document the fix (useGSAP hook with cleanup)
  - SUCCESS CRITERIA: 60fps during pin, smooth reverse, no layout shift

  **Must NOT do**:
  - No production styling or real content
  - No multiple canvases — this validates single-canvas approach
  - No complex models — a colored cube is sufficient

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Architectural spike validating core technical bet — requires problem-solving
  - **Skills**: [`engineering`]
    - `engineering`: TDD-style validation of the pin behavior

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 2, 3)
  - **Parallel Group**: Wave 0
  - **Blocks**: Task 6 (scroll architecture), ALL Wave 2 tasks
  - **Blocked By**: None

  **References**:
  - `src/components/3d/ControlRoomScene.tsx` — Current R3F Canvas setup pattern
  - `src/components/3d/SceneWrapper.tsx` — Current GSAP ScrollTrigger usage (overlay fade)
  - Official: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ — pin configuration
  - Official: https://docs.pmnd.rs/react-three-fiber — Canvas + useFrame patterns

  **QA Scenarios**:
  ```
  Scenario: Pin holds during forward scroll
    Tool: Playwright
    Preconditions: Dev server running at localhost:3000/spike
    Steps:
      1. Navigate to localhost:3000/spike
      2. Wait for canvas to render (selector: `canvas`)
      3. Scroll down 500px programmatically
      4. Assert canvas container has `position: fixed` (or GSAP pin class)
      5. Screenshot pinned state
    Expected Result: Canvas stays fixed, text overlay scrolls over it
    Evidence: .sisyphus/evidence/task-1-pin-forward.png

  Scenario: Pin releases cleanly on reverse scroll
    Tool: Playwright
    Preconditions: Page scrolled past pin zone
    Steps:
      1. Scroll to bottom of spike page
      2. Scroll back up past pin trigger point
      3. Assert canvas container returns to normal flow
      4. No layout jump (compare Y position before/after)
    Expected Result: Smooth unpin without visual jump
    Evidence: .sisyphus/evidence/task-1-pin-reverse.png

  Scenario: Performance stays at 60fps during pin
    Tool: Bash (Chrome DevTools Protocol)
    Steps:
      1. Launch Chrome with --enable-devtools-experiments
      2. Record Performance trace during scroll through pin zone
      3. Parse trace for frame durations > 16.67ms
    Expected Result: <5% of frames exceed 16.67ms budget
    Evidence: .sisyphus/evidence/task-1-perf-trace.json
  ```

  **Commit**: YES
  - Message: `spike(scroll): validate GSAP ScrollTrigger + R3F pin architecture`
  - Files: `src/components/spike/ScrollPinSpike.tsx`, `src/app/spike/page.tsx`

- [ ] 2. Font Validation — Space Grotesk at 13vw Display Scale

  **What to do**:
  - Create test page at `src/app/spike/fonts/page.tsx`
  - Import Space Grotesk (variable) + Anton via `next/font/google`
  - Render test headlines at `clamp(4.5rem, 13vw, 13rem)` on dark background (#080810)
  - Compare visually: Space Grotesk Bold vs Anton vs current Bebas Neue
  - Test text: "LAUNCH CONTROL", "MISSION COMPLETE", "FROM IDEA TO ORBIT"
  - Validate: font weight sufficient for ESPN-scale impact? Or does Anton need to be primary display?
  - Screenshot all three at 1440px, 768px, 375px widths
  - DECISION OUTPUT: Write recommendation to `.sisyphus/evidence/task-2-font-decision.md`

  **Must NOT do**:
  - No production implementation — this is evaluation only
  - No licensing purchases yet

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple visual test page, no complex logic
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 1, 3)
  - **Parallel Group**: Wave 0
  - **Blocks**: Task 4 (typography system)
  - **Blocked By**: None

  **References**:
  - `src/app/layout.tsx` — Current next/font setup (Bebas Neue, Inter, IBM Plex Mono)
  - `src/styles/section-constants.ts` — Current typography tokens
  - Official: https://nextjs.org/docs/app/building-your-application/optimizing/fonts

  **QA Scenarios**:
  ```
  Scenario: Space Grotesk renders at 13vw without FOUT
    Tool: Playwright
    Preconditions: Dev server running, font spike page available
    Steps:
      1. Navigate to localhost:3000/spike/fonts
      2. Wait 2s for fonts to load
      3. Query computed style of h1: font-family must include "Space Grotesk"
      4. Screenshot at 1440px width
      5. Screenshot at 375px width
    Expected Result: Font renders correctly, no fallback visible after 2s
    Evidence: .sisyphus/evidence/task-2-space-grotesk-1440.png, task-2-space-grotesk-375.png

  Scenario: Anton renders for accent numbers
    Tool: Playwright
    Steps:
      1. Navigate to spike/fonts page
      2. Find element with class .stat-number
      3. Assert computed font-family includes "Anton"
      4. Screenshot the stats row
    Expected Result: Anton renders at correct weight for data callouts
    Evidence: .sisyphus/evidence/task-2-anton-accent.png
  ```

  **Commit**: YES
  - Message: `spike(fonts): validate Space Grotesk + Anton at editorial scale`
  - Files: `src/app/spike/fonts/page.tsx`

- [ ] 3. 3D Asset Audit + Compression Pipeline

  **What to do**:
  - Inventory ALL models in `/public/models/` — record: filename, file size, face count, texture count+resolution
  - For each model, run `npx gltf-transform inspect <file>` to get mesh/material stats
  - Identify which models exceed mobile budget (>50K faces or >5MB)
  - Create compression script using gltf-transform: Draco geometry + resize textures to 1024px
  - Compress ALL models that will be used in sections (shuttle, earth, various-planets, apollo, astronaut variants)
  - Output compressed models to `/public/models/optimized/`
  - Record before/after stats in `.sisyphus/evidence/task-3-asset-audit.md`
  - Also check models in `~/Downloads/` that need importing (drifting astronaut, evanescent smoke, skybox HDRI)

  **Must NOT do**:
  - No custom 3D modeling or mesh editing beyond automated compression
  - No texture re-authoring — only resize/compress existing
  - Don't compress the hero models (falcon-9.glb, floating-astronaut.glb) — they're already in use

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Multi-step pipeline work with tooling setup
  - **Skills**: [`engineering`]
    - `engineering`: Systematic asset pipeline with verification

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 1, 2)
  - **Parallel Group**: Wave 0
  - **Blocks**: All Wave 2 section tasks (9-14)
  - **Blocked By**: None

  **References**:
  - `/public/models/` — Current model directory
  - `/public/draco/` — Existing Draco decoder (already set up)
  - Official: https://gltf-transform.dev/cli — gltf-transform CLI docs
  - `package.json` — Check if gltf-transform is already a dependency

  **QA Scenarios**:
  ```
  Scenario: All section models compressed under 5MB
    Tool: Bash
    Steps:
      1. Run: ls -la public/models/optimized/*.glb
      2. For each file, assert size < 5242880 bytes (5MB)
      3. Run: npx gltf-transform inspect public/models/optimized/space-shuttle.glb
      4. Assert mesh face count < 50000
    Expected Result: All optimized models <5MB and <50K faces
    Evidence: .sisyphus/evidence/task-3-compression-results.md

  Scenario: Compressed models load without errors in R3F
    Tool: Bash
    Steps:
      1. Create minimal test script that calls useGLTF on each compressed model
      2. Run: node --experimental-vm-modules test-load-models.mjs
      3. Assert no errors thrown
    Expected Result: All models parse successfully with Draco decoder
    Evidence: .sisyphus/evidence/task-3-load-test.txt
  ```

  **Commit**: YES
  - Message: `chore(assets): audit + compress 3D models for mobile performance`
  - Files: `public/models/optimized/*`, `scripts/compress-models.sh`

---

### Wave 1 — Foundation (design system + infrastructure)

- [ ] 4. Typography System Swap

  **What to do**:
  - Replace Bebas Neue with Space Grotesk (variable) in `src/app/layout.tsx` via `next/font/google`
  - Add Anton as secondary display font via `next/font/google`
  - Update CSS variables in `src/app/globals.css`: `--font-display` → Space Grotesk, add `--font-accent` → Anton
  - Update `src/styles/section-constants.ts` typography tokens to use new scale
  - Define type scale: Display (13vw), Section Header (8vw), Subhead (3rem), Body (1rem), Caption (0.875rem), Stat (Anton, 4rem+)
  - Ensure `font-display: swap` + preload for Space Grotesk (critical path)
  - Remove Bebas Neue import entirely
  - Verify no FOUT at hero scale (preload must work)

  **Must NOT do**:
  - Don't change body (Inter) or mono (IBM Plex Mono)
  - Don't explore other fonts — decision is final

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Config change + CSS variable update, no complex logic
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 5, 6, 7, 8)
  - **Parallel Group**: Wave 1
  - **Blocks**: All Wave 2 section tasks (9-14)
  - **Blocked By**: Task 2 (font validation confirms the choice)

  **References**:
  - `src/app/layout.tsx:1-30` — Current font setup (localFont for Bebas Neue, Inter, IBM Plex Mono)
  - `src/app/globals.css` — CSS variables section (--font-mono, --font-display, --font-body)
  - `src/styles/section-constants.ts` — Typography token definitions
  - `.sisyphus/evidence/task-2-font-decision.md` — Font validation results from Task 2

  **QA Scenarios**:
  ```
  Scenario: Space Grotesk loads as display font
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to localhost:3000
      2. Wait for page load
      3. Query computed font-family on first h1/h2 element
      4. Assert includes "Space Grotesk" (not "Bebas Neue")
    Expected Result: Space Grotesk is active display font
    Evidence: .sisyphus/evidence/task-4-font-active.png

  Scenario: Build passes after font swap
    Tool: Bash
    Steps:
      1. Run: npm run build
      2. Assert exit code 0
      3. Grep build output for font-related warnings
    Expected Result: Clean build, no font warnings
    Evidence: .sisyphus/evidence/task-4-build.txt
  ```

  **Commit**: YES
  - Message: `feat(typography): swap Bebas Neue → Space Grotesk + Anton display system`
  - Files: `src/app/layout.tsx`, `src/app/globals.css`, `src/styles/section-constants.ts`

- [ ] 5. Color Theme System (6 Section Palettes)

  **What to do**:
  - Define 6 section color palettes in `src/styles/section-constants.ts`:
    - **Hero (THE PROMISE)**: Deep navy #080810 + cyan #22D3EE (keep current)
    - **Problem (THE PROBLEM)**: Hot red #DC2626 + dark #1A0505 (ESPN LeBron energy)
    - **Guide (THE GUIDE)**: Clean white #FAFAFA + technical blue #2563EB (precision)
    - **Proof (THE PROOF)**: Dark #0A0A0F + amber/gold #F59E0B (achievement)
    - **Authority (THE AUTHORITY)**: Black #000000 + white #FFFFFF (dramatic contrast)
    - **Orbit (THE ORBIT)**: Deep blue #0C1E3A + earth tones #4ADE80 (resolution)
  - Each palette exports: `bg`, `text`, `accent`, `muted`, `border`
  - Create CSS custom properties per section: `--section-bg`, `--section-text`, `--section-accent`
  - Ensure all text/bg combinations pass WCAG AA contrast (4.5:1 ratio minimum)
  - Create a `SectionThemeProvider` component that sets CSS vars based on active section

  **Must NOT do**:
  - No gradients within sections (one dominant color per section)
  - No more than 6 palettes total

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: CSS variable definitions + React context, straightforward
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 4, 6, 7, 8)
  - **Parallel Group**: Wave 1
  - **Blocks**: All Wave 2 section tasks (9-14)
  - **Blocked By**: None

  **References**:
  - `src/styles/section-constants.ts` — Current color definitions (navy, cyan, white)
  - `src/app/globals.css` — Current CSS custom properties (--bg, --text, --accent)
  - ESPN Magazine references: LeBron red spread, Hazard Play yellow, Perfect Fits white

  **QA Scenarios**:
  ```
  Scenario: All 6 palettes pass WCAG AA contrast
    Tool: Bash
    Steps:
      1. For each palette, calculate contrast ratio of text on bg
      2. Assert all ratios >= 4.5:1
      3. Log results to evidence file
    Expected Result: 6/6 palettes pass WCAG AA
    Evidence: .sisyphus/evidence/task-5-contrast-audit.md

  Scenario: CSS variables update per section
    Tool: Playwright
    Steps:
      1. Navigate to a test page with all 6 section theme providers
      2. For each section, query computed --section-bg value
      3. Assert matches defined palette
    Expected Result: Each section has correct CSS variables applied
    Evidence: .sisyphus/evidence/task-5-theme-vars.txt
  ```

  **Commit**: YES
  - Message: `feat(design-system): 6-section color theme system with WCAG AA compliance`
  - Files: `src/styles/section-constants.ts`, `src/components/SectionThemeProvider.tsx`

- [ ] 6. Single-Canvas Scroll Architecture Scaffold

  **What to do**:
  - Refactor `src/components/3d/ControlRoomScene.tsx` into a **persistent single Canvas** that spans the full page height
  - Create `src/components/ScrollScene.tsx` — orchestrator that:
    - Uses IntersectionObserver to detect which section is in viewport
    - Loads/disposes 3D scenes based on active section (max 2 loaded at once)
    - Passes scroll progress (0-1 per section) to active scene via zustand store
  - Create `src/components/3d/scenes/` directory with one file per section scene
  - Implement GSAP ScrollTrigger pin: Canvas is pinned while sections scroll through
  - Scene transition: crossfade opacity between outgoing and incoming 3D scenes
  - Update zustand store (`src/store/scene-store.ts`) with: `activeSection`, `scrollProgress`, `loadingSection`
  - The Canvas renders behind all content — sections are transparent overlays on top

  **Must NOT do**:
  - No multiple Canvas elements (iOS Safari will crash at 6 WebGL contexts)
  - No CSS scroll-snap (GSAP controls all scroll behavior)
  - No horizontal scrolling

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Core architectural work — single-canvas scene management is the hardest piece
  - **Skills**: [`engineering`]
    - `engineering`: Architectural pattern with clear interfaces

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 4, 5, 7, 8)
  - **Parallel Group**: Wave 1
  - **Blocks**: All Wave 2 section tasks (9-14)
  - **Blocked By**: Task 1 (spike validates the pin pattern works)

  **References**:
  - `src/components/3d/ControlRoomScene.tsx` — Current canvas setup to refactor
  - `src/components/3d/SceneWrapper.tsx` — Current GSAP integration pattern
  - `src/store/scene-store.ts` — Existing zustand store to extend
  - Spike results from Task 1 — proven pin pattern to scale up
  - 14islands r3f-scroll-rig pattern (single shared Canvas tracking DOM elements)

  **QA Scenarios**:
  ```
  Scenario: Single Canvas renders and pins on scroll
    Tool: Playwright
    Preconditions: Scaffold implemented with placeholder cube scenes
    Steps:
      1. Navigate to localhost:3000
      2. Count canvas elements in DOM: document.querySelectorAll('canvas').length
      3. Assert count === 1
      4. Scroll to 50% of page height
      5. Assert canvas is still visible (pinned)
    Expected Result: Exactly 1 canvas, stays visible throughout scroll
    Evidence: .sisyphus/evidence/task-6-single-canvas.png

  Scenario: Scene swaps on section change
    Tool: Playwright
    Steps:
      1. Scroll to section 2 trigger point
      2. Wait 500ms for transition
      3. Check zustand store activeSection value (via window.__store debug)
      4. Assert activeSection === 2
    Expected Result: Store reflects correct active section
    Evidence: .sisyphus/evidence/task-6-scene-swap.txt
  ```

  **Commit**: YES
  - Message: `feat(3d): single-canvas scroll architecture with scene swapping`
  - Files: `src/components/ScrollScene.tsx`, `src/components/3d/scenes/`, `src/store/scene-store.ts`

- [ ] 7. Section Loading Skeleton + Reduced-Motion Fallback

  **What to do**:
  - Create `src/components/SectionSkeleton.tsx` — loading state visible while 3D initializes per section
  - Skeleton should match section's color theme (dark bg + subtle pulse animation)
  - Create `src/components/ReducedMotionFallback.tsx` — static version for `prefers-reduced-motion: reduce`
  - When reduced motion is active: hide Canvas entirely, show static high-quality renders per section
  - Static renders: screenshots of each 3D scene saved as optimized WebP images in `/public/fallbacks/`
  - Use `useMediaQuery('(prefers-reduced-motion: reduce)')` hook
  - Ensure all content remains accessible and readable in both states

  **Must NOT do**:
  - No animated skeletons on reduced-motion (defeats the purpose)
  - No lazy generation of fallback images at runtime — they must be pre-generated

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Component creation with clear specs, no complex logic
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 4, 5, 6, 8)
  - **Parallel Group**: Wave 1
  - **Blocks**: All Wave 2 section tasks (9-14)
  - **Blocked By**: None

  **References**:
  - `src/components/3d/SceneLoadingState.tsx` — Current loading component pattern
  - `src/components/3d/StaticHeroFallback.tsx` — Current mobile fallback pattern
  - `src/hooks/useIsMobile.ts` — Pattern for media query hook

  **QA Scenarios**:
  ```
  Scenario: Reduced motion shows static fallback
    Tool: Playwright
    Steps:
      1. Emulate prefers-reduced-motion: reduce
      2. Navigate to localhost:3000
      3. Assert no canvas element in DOM
      4. Assert fallback images are visible (img[src*="fallbacks"])
      5. Assert all text content is still present
    Expected Result: No 3D, static images shown, all content accessible
    Evidence: .sisyphus/evidence/task-7-reduced-motion.png
  ```

  **Commit**: YES
  - Message: `feat(a11y): loading skeleton + reduced-motion static fallback`
  - Files: `src/components/SectionSkeleton.tsx`, `src/components/ReducedMotionFallback.tsx`

- [ ] 8. Mobile Detection + 3D Tier System

  **What to do**:
  - Create `src/hooks/useDeviceTier.ts` — detects device capability:
    - **Tier 3 (Full)**: Desktop + dedicated GPU → full 3D, all effects
    - **Tier 2 (Simplified)**: Mobile/tablet + capable GPU → reduced poly, no post-processing, DPR capped at 2
    - **Tier 1 (Static)**: Low-end mobile or no WebGL → static image fallbacks
  - Detection method: test WebGL context creation + check `navigator.gpu` + pixel ratio + screen size
  - Expose tier via zustand store so all components can adapt
  - Update `src/components/3d/ControlRoomScene.tsx` Canvas props: `dpr={tier >= 2 ? [1, 2] : [1, 1]}`
  - Tier 2 models load from `/public/models/optimized/` (compressed versions from Task 3)
  - Tier 1 shows pre-rendered fallback images (from Task 7)

  **Must NOT do**:
  - No "try to make 3D work" on Tier 1 devices — binary decision
  - No user-agent sniffing — use capability detection only

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Hook + store update, clear logic
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 4, 5, 6, 7)
  - **Parallel Group**: Wave 1
  - **Blocks**: Wave 2 sections (model selection depends on tier), Task 18
  - **Blocked By**: None

  **References**:
  - `src/hooks/useIsMobile.ts` — Current mobile detection (768px breakpoint)
  - `src/components/3d/SceneErrorBoundary.tsx` — WebGL fallback pattern
  - `src/components/3d/StaticHeroFallback.tsx` — Current tier-1 fallback

  **QA Scenarios**:
  ```
  Scenario: Mobile emulation gets Tier 2
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Emulate iPhone 12 viewport (390x844, DPR 3)
      2. Navigate to localhost:3000
      3. Check window.__deviceTier (exposed for testing)
      4. Assert tier === 2
      5. Assert canvas DPR is capped at 2 (not 3)
    Expected Result: Mobile gets Tier 2, DPR capped
    Evidence: .sisyphus/evidence/task-8-mobile-tier.txt
  ```

  **Commit**: YES
  - Message: `feat(perf): device tier system (full/simplified/static)`
  - Files: `src/hooks/useDeviceTier.ts`, `src/store/scene-store.ts`

---

### Wave 2 — Sections (MAX PARALLEL — each section is independent)

- [ ] 9. Section 1 "THE PROMISE" — Hero Enhancement

  **What to do**:
  - Enhance existing hero section to match ESPN editorial energy
  - Typography: Replace current headline with Space Grotesk at `clamp(4.5rem, 13vw, 13rem)` — text: "LAUNCH CONTROL"
  - Secondary line in Anton: "LABS" at 8vw (different weight creates ESPN-style hierarchy)
  - Tagline stays: "From idea to shipped product. No guessing." in Inter
  - Apply Hero color theme (deep navy + cyan accent)
  - Keep existing 3D scene (Falcon 9 + Astronaut + Smoke + Starfield) — it's already nearly done
  - Add subtle annotation callouts floating near the rocket (CSS, not 3D): "EST. 2024", "PRODUCT STUDIO"
  - This section is the GSAP pin trigger — Canvas pins here and stays pinned for subsequent sections
  - Ensure the "scroll to explore" prompt still works

  **Must NOT do**:
  - Don't rebuild the 3D scene — it's done (9/11 tasks from previous plan)
  - Don't add new 3D elements to hero
  - Don't change the 3D models or animations

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Typography + layout + CSS overlay work on 3D scene
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 10-15)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 16 (scroll continuity)
  - **Blocked By**: Tasks 4, 5, 6, 7, 8 (all Wave 1)

  **References**:
  - `src/components/Hero.tsx` — Current hero section layout
  - `src/components/3d/ControlRoomScene.tsx` — Current 3D scene (keep as-is)
  - ESPN "I'LL REST WHEN I RETIRE" spread — massive type dominance with subject
  - ESPN "PERFECT FITS" spread — clean type hierarchy over figure

  **QA Scenarios**:
  ```
  Scenario: Hero renders with new typography at scale
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to localhost:3000
      2. Wait for 3D scene to render (canvas visible)
      3. Assert h1 computed font-family includes "Space Grotesk"
      4. Assert h1 computed font-size >= 100px (at 1440px viewport)
      5. Screenshot full hero section
    Expected Result: Massive editorial typography over 3D scene
    Evidence: .sisyphus/evidence/task-9-hero-typography.png

  Scenario: Annotation callouts visible
    Tool: Playwright
    Steps:
      1. Find elements with class .annotation-callout
      2. Assert at least 2 visible
      3. Assert text content includes "EST. 2024" or "PRODUCT STUDIO"
    Expected Result: ESPN-style floating annotations present
    Evidence: .sisyphus/evidence/task-9-callouts.png
  ```

  **Commit**: YES
  - Message: `feat(sections): hero enhancement — ESPN editorial typography + callouts`
  - Files: `src/components/Hero.tsx`, `src/components/sections/HeroSection.tsx`

- [ ] 10. Section 2 "THE PROBLEM" — Lost Founders Narrative

  **What to do**:
  - Create `src/components/sections/ProblemSection.tsx`
  - 3D Asset: Drifting Astronaut (floating aimlessly — visual metaphor for founders without direction)
  - Load from `/public/models/optimized/drifting-astronaut.glb` (import from Downloads if needed, compress via Task 3 pipeline)
  - Color theme: Hot red #DC2626 background + white text (ESPN LeBron energy)
  - Headline (Space Grotesk 8vw): "LOST IN SPACE" or "MOST PRODUCTS FAIL"
  - Data callouts (Anton): "90% FAIL", "18 MONTHS AVG", "$1.2M WASTED" (annotation style with leader lines)
  - Body copy (Inter): Brief narrative about why products fail without the right team
  - Layout: Astronaut floating on left/center, text + data callouts on right (desktop) / stacked (mobile)
  - This is the "BUT" in the But/Therefore chain — introduces tension
  - Annotation callouts: CSS positioned with thin border lines connecting to the astronaut

  **Must NOT do**:
  - No custom animations beyond basic float/drift (use existing GLB animation)
  - No particle effects
  - Stats must be real/defensible (or clearly marked as industry averages)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: 3D scene integration + editorial layout + CSS annotation system
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 9, 11-15)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 16 (scroll continuity)
  - **Blocked By**: Tasks 4, 5, 6, 7, 8 (all Wave 1)

  **References**:
  - ESPN "I'LL REST WHEN I RETIRE" LeBron spread — red bg, stats scattered, hero subject dominant
  - `src/components/3d/InteractiveRoom.tsx` — Pattern for loading + animating GLB models
  - `~/Downloads/drifting_astronaut.glb` — Source model to import

  **QA Scenarios**:
  ```
  Scenario: Problem section renders with red theme + astronaut
    Tool: Playwright
    Steps:
      1. Scroll to section 2 trigger point
      2. Wait for scene transition (astronaut model loads)
      3. Assert section background color is red theme (#DC2626 or close)
      4. Assert headline text visible and includes "FAIL" or "LOST"
      5. Screenshot the section
    Expected Result: Bold red section with floating astronaut and data callouts
    Evidence: .sisyphus/evidence/task-10-problem-section.png

  Scenario: Data callouts have leader lines
    Tool: Playwright
    Steps:
      1. Scroll to problem section
      2. Find elements with class .annotation-line or similar
      3. Assert at least 3 data callouts visible (90%, 18 months, $1.2M)
    Expected Result: ESPN-style annotation callouts with connecting lines
    Evidence: .sisyphus/evidence/task-10-callouts.png
  ```

  **Commit**: YES
  - Message: `feat(sections): "The Problem" — drifting astronaut + red ESPN editorial`
  - Files: `src/components/sections/ProblemSection.tsx`, `src/components/3d/scenes/ProblemScene.tsx`

- [ ] 11. Section 3 "THE GUIDE" — Capabilities with Annotation Callouts

  **What to do**:
  - Create `src/components/sections/GuideSection.tsx`
  - 3D Asset: Space Shuttle (precision engineering — the vehicle that gets you there)
  - Load from `/public/models/optimized/space-shuttle.glb`
  - Color theme: Clean white #FAFAFA + technical blue #2563EB
  - Headline (Space Grotesk 8vw): "MISSION CAPABLE" or "SYSTEMS ONLINE"
  - ESPN Tech Talk style: Annotation callouts pointing to parts of the shuttle, each labeled with a capability:
    - "AI PRODUCTS → 12 shipped" (pointing to cockpit/brain)
    - "FULL-STACK → 47 launched" (pointing to fuselage/body)
    - "DATA PIPELINES → 3.2B events/day" (pointing to engine/thrust)
    - "DEVOPS → 99.97% uptime" (pointing to heat shield/reliability)
  - Leader lines: thin CSS borders from label → shuttle (use absolute positioning)
  - Preserve ALL 4 existing capability stats from current Capabilities component
  - Mobile: stack callouts vertically below shuttle image

  **Must NOT do**:
  - No 3D-rendered text (all callouts are HTML/CSS overlays)
  - No hover interactions on the shuttle model
  - Don't lose any existing capability data

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex CSS positioning of callouts relative to 3D model
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 9, 10, 12-15)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 16 (scroll continuity)
  - **Blocked By**: Tasks 4, 5, 6, 7, 8 (all Wave 1)

  **References**:
  - `src/components/Capabilities.tsx` — Current content to preserve (4 stats with descriptions)
  - ESPN "Tech Talk" ski equipment spread — annotation callouts with leader lines pointing to product features
  - `public/models/space-shuttle.glb` — Model to use (or optimized version)

  **QA Scenarios**:
  ```
  Scenario: All 4 capabilities preserved with callout style
    Tool: Playwright
    Steps:
      1. Scroll to section 3
      2. Assert text "12" or "12 shipped" visible (AI Products stat)
      3. Assert text "47" visible (Full-Stack stat)
      4. Assert text "3.2B" visible (Data Pipelines stat)
      5. Assert text "99.97%" visible (DevOps stat)
      6. Assert at least 4 elements with class containing "callout" or "annotation"
      7. Screenshot
    Expected Result: All 4 stats present in ESPN annotation style
    Evidence: .sisyphus/evidence/task-11-guide-callouts.png
  ```

  **Commit**: YES
  - Message: `feat(sections): "The Guide" — shuttle with capability annotation callouts`
  - Files: `src/components/sections/GuideSection.tsx`, `src/components/3d/scenes/GuideScene.tsx`

- [ ] 12. Section 4 "THE PROOF" — Portfolio as Mission Patches

  **What to do**:
  - Create `src/components/sections/ProofSection.tsx`
  - 3D Asset: Various Planets (each planet = a launched product/client)
  - Load from `/public/models/optimized/various-planets.glb`
  - Color theme: Dark #0A0A0F + amber/gold #F59E0B
  - Headline (Space Grotesk 8vw): "MISSIONS COMPLETE"
  - Featured project (Talisman): Large card with gold accent border, key stats
  - Client projects: 6-project grid styled as "mission patches" — circular badges with project name + key metric
  - Planets orbit slowly in background while portfolio content overlays
  - This section uses SNAP behavior (portfolio grid snaps into place)
  - Preserve ALL existing MissionCards content (Talisman featured + 6 projects)
  - ESPN "STAND UP AND JEER" pie chart spread energy — data as visual centerpiece

  **Must NOT do**:
  - No new project data — use exactly what's in current MissionCards component
  - No interactive 3D (planets are background decoration only)
  - No horizontal carousel for projects — grid only

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Grid layout + 3D background + mission patch styling
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 9-11, 13-15)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 16 (scroll continuity)
  - **Blocked By**: Tasks 4, 5, 6, 7, 8 (all Wave 1)

  **References**:
  - `src/components/MissionCards.tsx` — ALL content to preserve (Talisman + 6 projects)
  - ESPN "STAND UP AND JEER" spread — data visualization as visual centerpiece with callouts
  - `public/models/various-planets.glb` — Planet models for background

  **QA Scenarios**:
  ```
  Scenario: All portfolio content preserved
    Tool: Playwright
    Steps:
      1. Scroll to section 4
      2. Assert "Talisman" text visible (featured project)
      3. Count project cards/patches — assert >= 6
      4. Assert headline contains "MISSION" or "COMPLETE"
      5. Screenshot
    Expected Result: All 7 projects (1 featured + 6 grid) present
    Evidence: .sisyphus/evidence/task-12-portfolio.png
  ```

  **Commit**: YES
  - Message: `feat(sections): "The Proof" — portfolio as mission patches + planets`
  - Files: `src/components/sections/ProofSection.tsx`, `src/components/3d/scenes/ProofScene.tsx`

- [ ] 13. Section 5 "THE AUTHORITY" — Pedigree + Awards Editorial

  **What to do**:
  - Create `src/components/sections/AuthoritySection.tsx`
  - 3D Asset: Apollo Saturn V (legacy, power, proven history)
  - Load from `/public/models/optimized/apollo-saturn-v.glb`
  - Color theme: Black #000000 + white #FFFFFF (maximum dramatic contrast)
  - Headline (Space Grotesk 13vw): "BUILT DIFFERENT" or "PROVEN CREW"
  - Team pedigree: Company logos/names (Google, Meta, Stripe, Apple, Amazon) in bold Anton type
  - Awards: 4-column grid below, minimal styling (let the names speak)
  - Layout: Apollo rocket on left (towering, powerful), text content on right
  - ESPN "PERFECT FITS" / "MVP DEBATE" energy — massive type + hero subject
  - Combine TeamPedigree + Awards into one unified authority section
  - The rocket's height creates a sense of LEGACY and POWER

  **Must NOT do**:
  - Don't separate pedigree and awards into two sections
  - No company logos as images (text-only avoids licensing issues)
  - Don't add team member photos or bios

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Editorial layout with dramatic contrast + 3D integration
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 9-12, 14-15)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 16 (scroll continuity)
  - **Blocked By**: Tasks 4, 5, 6, 7, 8 (all Wave 1)

  **References**:
  - `src/components/TeamPedigree.tsx` — Team background companies (preserve all)
  - `src/components/Awards.tsx` — Awards grid content (preserve all)
  - ESPN "PERFECT FITS" spread — massive type + dramatic figure
  - ESPN "MVP DEBATE" spread — black bg, figures at scale, data callouts

  **QA Scenarios**:
  ```
  Scenario: Team pedigree companies all present
    Tool: Playwright
    Steps:
      1. Scroll to section 5
      2. Assert "Google" text visible
      3. Assert "Stripe" text visible
      4. Assert "Apple" text visible
      5. Assert awards content visible (at least 4 items)
      6. Screenshot
    Expected Result: All team companies + all awards present on dramatic black
    Evidence: .sisyphus/evidence/task-13-authority.png
  ```

  **Commit**: YES
  - Message: `feat(sections): "The Authority" — Apollo Saturn V + pedigree + awards`
  - Files: `src/components/sections/AuthoritySection.tsx`, `src/components/3d/scenes/AuthorityScene.tsx`

- [ ] 14. Section 6 "THE ORBIT" — Contact with Earth Overview Effect

  **What to do**:
  - Create `src/components/sections/OrbitSection.tsx`
  - 3D Asset: Earth (overview effect — seeing the world from space changes perspective)
  - Load from `/public/models/optimized/earth.glb`
  - Color theme: Deep blue #0C1E3A + earth green #4ADE80
  - Headline (Space Grotesk 8vw): "READY FOR LAUNCH?" or "JOIN THE MISSION"
  - Contact CTA: Large, prominent email/button (preserve from current Contact component)
  - Stats row: Response time, timezone coverage, etc. (preserve from current Contact)
  - Earth rotates slowly — creates sense of perspective and scale
  - This is the emotional resolution — "from up here, you can see what's possible"
  - Minimal annotation: just the CTA and essential contact info
  - This is the final section — no scroll after this (footer-like)

  **Must NOT do**:
  - No contact form (keep it simple — CTA to email)
  - No social media links unless they already exist
  - Don't add new contact info not in current Contact component

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: 3D Earth integration + CTA styling + emotional layout
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 9-13, 15)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 16 (scroll continuity)
  - **Blocked By**: Tasks 4, 5, 6, 7, 8 (all Wave 1)

  **References**:
  - `src/components/Contact.tsx` — All contact content to preserve (CTA, stats, email)
  - `public/models/earth.glb` — Earth model
  - Overview effect psychology: seeing Earth from space creates perspective shift

  **QA Scenarios**:
  ```
  Scenario: Contact CTA and stats preserved
    Tool: Playwright
    Steps:
      1. Scroll to final section
      2. Assert CTA button or link visible with contact action
      3. Assert stats visible (response time, timezone coverage)
      4. Assert Earth model visible (canvas has content)
      5. Screenshot
    Expected Result: Contact info preserved on deep blue + rotating Earth
    Evidence: .sisyphus/evidence/task-14-orbit-contact.png
  ```

  **Commit**: YES
  - Message: `feat(sections): "The Orbit" — Earth overview effect + contact CTA`
  - Files: `src/components/sections/OrbitSection.tsx`, `src/components/3d/scenes/OrbitScene.tsx`

- [ ] 15. Section Navigation + Progress Indicator

  **What to do**:
  - Create `src/components/SectionNav.tsx` — fixed position navigation dots (right side)
  - 6 dots corresponding to 6 sections, active dot highlighted with section accent color
  - Clicking a dot smooth-scrolls to that section (GSAP scrollTo)
  - Update existing `src/components/StatusBar.tsx` to include section name as user scrolls
  - Optional: thin progress bar at top showing overall scroll progress
  - Navigation must be keyboard-accessible (Tab + Enter to navigate)
  - Hide on mobile (too small for touch targets) OR use larger touch-friendly dots

  **Must NOT do**:
  - No horizontal navigation bar (dots only)
  - No section names visible in the nav (just dots — keep it minimal)
  - Don't interfere with GSAP scroll behavior

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple UI component with scroll position tracking
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 9-14)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 16 (scroll continuity)
  - **Blocked By**: Task 6 (needs scroll architecture to hook into)

  **References**:
  - `src/components/StatusBar.tsx` — Existing fixed header to enhance
  - Apple product pages — right-side dot navigation pattern
  - `src/store/scene-store.ts` — activeSection state to read from

  **QA Scenarios**:
  ```
  Scenario: Nav dots update on scroll
    Tool: Playwright
    Steps:
      1. Navigate to page
      2. Assert 6 navigation dots visible (or hidden on mobile)
      3. Scroll to section 3
      4. Assert 3rd dot has active class/style
      5. Click 5th dot
      6. Assert page scrolls to section 5 (scroll position changes)
    Expected Result: Dots track scroll, clicking navigates
    Evidence: .sisyphus/evidence/task-15-nav-dots.png
  ```

  **Commit**: YES
  - Message: `feat(nav): section progress dots + keyboard accessible navigation`
  - Files: `src/components/SectionNav.tsx`, `src/components/StatusBar.tsx`

---

### Wave 3 — Integration + Polish

- [ ] 16. Scroll Continuity — But/Therefore Narrative Flow

  **What to do**:
  - Review all 6 sections in sequence — ensure the narrative flows with causality
  - Verify But/Therefore chain: Problem BUT Guide THEREFORE Proof THEREFORE Authority UNTIL Orbit
  - Tune GSAP scroll timing per section (some need more scroll distance for reading)
  - Add section transition effects: brief opacity crossfade between 3D scenes (200ms max)
  - Ensure scroll reversal (scrolling back up) produces smooth reverse through all sections
  - Test full page scroll-through at various speeds (slow read vs fast skim)
  - Adjust scroll-trigger start/end points so content is readable at natural scroll speed
  - Verify StatusBar section name updates at correct transition points

  **Must NOT do**:
  - No adding new content between sections
  - No changing section order (locked: 1-2-3-4-5-6)
  - No transition effects longer than 200ms

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Requires full-page scroll testing + timing adjustments + narrative judgment
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 17, 20)
  - **Parallel Group**: Wave 3
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 9-15 (all Wave 2 sections)

  **References**:
  - All section components from Wave 2
  - GSAP ScrollTrigger docs: start/end timing, scrub values
  - Pixar But/Therefore rule: each section must cause the next

  **QA Scenarios**:
  ```
  Scenario: Full page scroll-through without jank
    Tool: Playwright
    Steps:
      1. Start at top of page
      2. Smooth-scroll to bottom over 10 seconds
      3. Record Performance trace
      4. Assert no frame drops >50ms in trace
      5. Screenshot at each section midpoint (6 screenshots)
    Expected Result: Smooth continuous scroll with clean transitions
    Evidence: .sisyphus/evidence/task-16-scroll-continuity.mp4 (or 6 screenshots)
  ```

  **Commit**: YES
  - Message: `fix(scroll): tune section timing + transition continuity`
  - Files: `src/components/ScrollScene.tsx` (timing adjustments)

- [ ] 17. GPU Memory Management — Dispose/Create Lifecycle

  **What to do**:
  - Implement dispose-on-exit for all 3D scenes:
    - When section scrolls out of viewport + 1 section buffer: dispose geometry, materials, textures
    - Use `useGLTF.clear(url)` + manual traverse dispose
  - Implement priority loading queue:
    - Only load model for current section + next section (max 2 simultaneous)
    - Cancel loading for sections that scroll past before loading completes
  - Monitor GPU memory: log model load/dispose events to console in development
  - Test: scroll through all 6 sections rapidly, then slowly — memory should stay flat
  - Max 3 WebGL draw calls from disposed sections (textures may cache — acceptable)

  **Must NOT do**:
  - Don't dispose hero model (always loaded — it's the entry point)
  - Don't use aggressive caching (defeats memory management purpose)
  - Don't block scroll while loading (show skeleton, load async)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Complex lifecycle management with WebGL resource tracking
  - **Skills**: [`engineering`]
    - `engineering`: Systematic resource management with verification

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 16, 20)
  - **Parallel Group**: Wave 3
  - **Blocks**: Tasks 18, 19
  - **Blocked By**: Tasks 9-14 (needs all scenes implemented)

  **References**:
  - `src/components/ScrollScene.tsx` — Scene lifecycle hooks
  - R3F dispose pattern: `useGLTF.clear()` + manual traverse
  - `src/components/3d/InteractiveRoom.tsx` — Current model loading pattern

  **QA Scenarios**:
  ```
  Scenario: Memory stays flat after scrolling all sections
    Tool: Bash (Chrome DevTools Protocol)
    Steps:
      1. Launch Chrome with remote debugging
      2. Navigate to page, wait for hero load
      3. Record heap snapshot (baseline)
      4. Scroll through all 6 sections (forward then back)
      5. Force GC
      6. Record heap snapshot (after scroll)
      7. Compare: delta should be <50MB
    Expected Result: GPU memory does not grow linearly with sections visited
    Evidence: .sisyphus/evidence/task-17-memory-profile.json
  ```

  **Commit**: YES
  - Message: `fix(perf): GPU memory management — dispose on exit, priority loading`
  - Files: `src/components/ScrollScene.tsx`, `src/hooks/useSceneLifecycle.ts`

- [ ] 18. Mobile Optimization Pass

  **What to do**:
  - Test ALL 6 sections on iPhone 12 emulation (Playwright) and real device if available
  - For Tier 2 (mobile): verify optimized models load (<5MB each, <50K faces)
  - For Tier 1 (low-end): verify static fallbacks render correctly
  - Fix any horizontal overflow (common with 13vw type on small screens)
  - Ensure touch scroll feels native (no GSAP scroll hijacking on mobile)
  - Verify annotation callouts reflow to stacked layout on mobile
  - Test rapid scroll (flick) doesn't crash or produce blank sections
  - Cap pixel ratio at 2 confirmed working
  - No post-processing (bloom) on mobile (disable in Tier 2)

  **Must NOT do**:
  - Don't add mobile-only features
  - Don't break desktop to fix mobile (responsive, not separate)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Cross-device testing + responsive fixes across 6 sections
  - **Skills**: [`playwright-e2e`]
    - `playwright-e2e`: Mobile emulation + screenshot comparison

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 19, 20)
  - **Parallel Group**: Wave 3
  - **Blocks**: F3
  - **Blocked By**: Tasks 8, 17 (tier system + memory management)

  **References**:
  - `src/hooks/useDeviceTier.ts` — Tier detection from Task 8
  - `src/hooks/useIsMobile.ts` — Current mobile breakpoint
  - 2026 mobile constraints: <50K faces, DPR 2, no shadows, no post-processing

  **QA Scenarios**:
  ```
  Scenario: All sections render on iPhone 12 without overflow
    Tool: Playwright
    Preconditions: Mobile emulation (390x844, DPR 3 capped to 2)
    Steps:
      1. Navigate to localhost:3000
      2. For each section: scroll to it, wait 1s, screenshot
      3. Assert document.documentElement.scrollWidth <= 390 (no horizontal overflow)
      4. Assert all text visible (no clipping)
    Expected Result: 6 clean mobile screenshots, no overflow
    Evidence: .sisyphus/evidence/task-18-mobile-section-{1-6}.png
  ```

  **Commit**: YES
  - Message: `fix(mobile): responsive optimization for all 6 narrative sections`
  - Files: Multiple section components (responsive tweaks)

- [ ] 19. Performance Audit + Optimization

  **What to do**:
  - Run Lighthouse CLI on mobile throttled: `npx lighthouse http://localhost:3000 --throttling-method=simulate --preset=perf`
  - Target: Performance score >70 on mobile
  - Identify and fix top performance issues:
    - LCP: ensure hero renders within 2.5s (font preload + model preload critical)
    - CLS: ensure no layout shift from font loading or lazy content (must be <0.1)
    - FID/INP: ensure scroll doesn't block main thread
  - Optimize bundle: check if GSAP/Three.js are tree-shaken properly
  - Verify dynamic imports work for secondary sections (code-split per section)
  - If Lighthouse <70: progressively disable features until threshold met

  **Must NOT do**:
  - Don't sacrifice visual quality for perfect Lighthouse score (>70 is acceptable for 3D site)
  - Don't remove 3D from desktop to improve mobile score

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Performance profiling + targeted optimization
  - **Skills**: [`engineering`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 20)
  - **Parallel Group**: Wave 3
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 17, 18 (memory + mobile optimization)

  **References**:
  - Current `package.json` — bundle analysis
  - Lighthouse docs: https://developer.chrome.com/docs/lighthouse/
  - Next.js bundle analyzer: `@next/bundle-analyzer`

  **QA Scenarios**:
  ```
  Scenario: Lighthouse mobile performance >70
    Tool: Bash
    Steps:
      1. Start production build: npm run build && npm run start
      2. Run: npx lighthouse http://localhost:3000 --output=json --preset=perf --throttling-method=simulate
      3. Parse JSON: extract categories.performance.score
      4. Assert score >= 0.70
    Expected Result: Performance score 70+
    Evidence: .sisyphus/evidence/task-19-lighthouse.json
  ```

  **Commit**: YES
  - Message: `fix(perf): Lighthouse optimization — LCP, CLS, code splitting`
  - Files: Various (dynamic imports, preload hints, bundle optimization)

- [ ] 20. Accessibility Pass

  **What to do**:
  - Verify all text/background combinations meet WCAG AA (4.5:1 contrast)
  - Implement `prefers-reduced-motion` support: disables all 3D animations, shows static poses
  - Ensure keyboard navigation works through all sections (Tab order is logical)
  - Add `aria-label` to navigation dots
  - Ensure screen reader can access all content linearly (3D canvas has `aria-hidden="true"`)
  - Add skip-to-content link for keyboard users
  - Test with VoiceOver (macOS) — all content readable in sequence
  - Ensure focus is never trapped inside the canvas

  **Must NOT do**:
  - Don't add ARIA roles to decorative elements
  - Don't make 3D scenes keyboard-interactive (they're decorative)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Cross-cutting accessibility across all sections
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 16, 17, 18, 19)
  - **Parallel Group**: Wave 3
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 9-15 (all sections must exist)

  **References**:
  - `src/components/3d/ControlRoomScene.tsx` — Canvas element needing aria-hidden
  - WCAG 2.1 AA guidelines
  - `prefers-reduced-motion` MDN docs

  **QA Scenarios**:
  ```
  Scenario: Reduced motion disables all 3D animation
    Tool: Playwright
    Steps:
      1. Set prefers-reduced-motion: reduce
      2. Navigate to page
      3. Assert canvas either hidden or showing static frame
      4. Assert all text content still accessible
      5. Screenshot
    Expected Result: No animation, all content readable
    Evidence: .sisyphus/evidence/task-20-reduced-motion.png

  Scenario: Keyboard navigation through all sections
    Tool: Playwright
    Steps:
      1. Focus page
      2. Press Tab repeatedly — track focus order
      3. Assert focus moves logically through content (not trapped)
      4. Assert nav dots are focusable and activatable with Enter
    Expected Result: Complete keyboard navigation without traps
    Evidence: .sisyphus/evidence/task-20-keyboard-nav.txt
  ```

  **Commit**: YES
  - Message: `fix(a11y): WCAG AA compliance, reduced-motion, keyboard nav`
  - Files: Multiple components (aria attributes, motion queries)

### Wave 4 — Deployment (Porkbun Static Hosting via GitHub Connect)

- [ ] 21. Deploy to Porkbun Static Hosting

  **What to do**:
  - Add `output: 'export'` to `next.config.ts` — enables static HTML export for Porkbun hosting
  - Verify static export works: `npm run build` should produce an `out/` directory with all static files
  - Handle dynamic imports: ensure `ssr: false` components export correctly (3D loads client-side)
  - Create GitHub Action `.github/workflows/deploy.yml`:
    - Triggers on push to `main`
    - Runs `npm ci && npm run build`
    - Pushes contents of `out/` to a `deploy` branch (using `peaceiris/actions-gh-pages@v4`)
  - Connect Porkbun Static Hosting to the GitHub repo:
    - Domain: launchcontrollabs.com (already on Porkbun account "imbazo")
    - Repository: `Launch-Control-Labs/launchcontrollabs.com`
    - Branch: `deploy`
  - Configure DNS on Porkbun (if not already): A/CNAME records pointing to Porkbun's static hosting
  - Use Porkbun API (credentials in macOS Keychain: `porkbun-api-key` + `porkbun-secret-key`, account: `imbazo`) for any programmatic DNS updates
  - Verify: push to main → GitHub Action builds → deploy branch updates → site live on domain

  **Must NOT do**:
  - Don't use Vercel or any other hosting platform (Porkbun Static Hosting is the target)
  - Don't commit API keys to the repo (use GitHub Secrets for Actions if needed)
  - Don't modify the site content — this is deployment infrastructure only
  - Don't change the domain registrar or nameservers

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: CI/CD setup + DNS configuration + multi-step verification
  - **Skills**: [`cloudflare-api`]
    - `cloudflare-api`: DNS management patterns (applicable to Porkbun API calls)

  **Parallelization**:
  - **Can Run In Parallel**: NO (must run after all code is complete)
  - **Parallel Group**: Wave 4 (sequential — after Wave 3)
  - **Blocks**: F1-F4 (site must be live for final QA)
  - **Blocked By**: Tasks 16-20 (all Wave 3 polish)

  **References**:
  - `next.config.ts` — Add `output: 'export'` configuration
  - GitHub repo: `https://github.com/Launch-Control-Labs/launchcontrollabs.com.git` (origin remote)
  - Porkbun Static Hosting docs: https://kb.porkbun.com/article/137-how-to-set-up-static-hosting
  - Porkbun GitHub Connect: https://kb.porkbun.com/article/145-how-to-connect-static-hosting-to-github
  - Porkbun API v3: https://api.porkbun.com/api/json/v3/documentation
  - macOS Keychain: `security find-generic-password -s "porkbun-api-key" -a "porkbun"` (also duplicate under account "imbazo")
  - Porkbun MCP server: `npx -y @porkbunllc/mcp-server` (official, 30 tools — can use for DNS operations)
  - GitHub Action reference: `peaceiris/actions-gh-pages@v4` (publish_dir: ./out, publish_branch: deploy)

  **QA Scenarios**:
  ```
  Scenario: Static export builds successfully
    Tool: Bash
    Steps:
      1. Run: npm run build
      2. Assert exit code 0
      3. Assert directory `out/` exists
      4. Assert `out/index.html` exists
      5. Assert `out/_next/` directory contains JS bundles
    Expected Result: Full static export in out/ directory
    Evidence: .sisyphus/evidence/task-21-static-export.txt

  Scenario: Deploy branch updates on push
    Tool: Bash
    Steps:
      1. Push a trivial change to main (or check latest GitHub Action run)
      2. Wait for GitHub Action to complete (check via gh CLI)
      3. Run: gh run list --workflow=deploy.yml --limit=1
      4. Assert latest run status is "completed" with conclusion "success"
      5. Check deploy branch has fresh commit
    Expected Result: GitHub Action builds and pushes to deploy branch
    Evidence: .sisyphus/evidence/task-21-gh-action.txt

  Scenario: Site is live on domain
    Tool: Bash (curl)
    Steps:
      1. Run: curl -sI https://launchcontrollabs.com
      2. Assert HTTP status 200
      3. Run: curl -s https://launchcontrollabs.com | grep "LAUNCH CONTROL"
      4. Assert homepage content is present
    Expected Result: Site responds on production domain with correct content
    Evidence: .sisyphus/evidence/task-21-live-site.txt
  ```

  **Commit**: YES
  - Message: `ci(deploy): Porkbun Static Hosting via GitHub Actions + deploy branch`
  - Files: `.github/workflows/deploy.yml`, `next.config.ts`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, screenshot, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run build` + linter. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names. Verify single-canvas architecture (no multiple Canvas elements).
  Output: `Build [PASS/FAIL] | Files [N clean/N issues] | Architecture [CORRECT/VIOLATION] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Open in Chrome desktop (1440px) + Safari desktop + Chrome mobile (iPhone 12 emulation). Scroll through ALL 6 sections. Verify: 3D renders, typography correct, colors match theme, no overflow, no jank. Screenshot each section in each viewport. Test `prefers-reduced-motion`. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Sections [6/6 pass] | Viewports [3/3] | Reduced-motion [PASS/FAIL] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual implementation. Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check all "Must NOT Have" guardrails. Verify all existing content (stats, projects, team, awards) is still present. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Content preserved [YES/NO] | Guardrails [N/N clean] | VERDICT`

---

## Commit Strategy

- **Wave 0**: `spike(3d): validate GSAP+R3F pin architecture` — proof files
- **Wave 1**: `feat(design-system): typography + color + scroll infrastructure` — all foundation
- **Wave 2**: One commit per section: `feat(sections): Section N — {name}`
- **Wave 3**: `fix(perf): GPU memory, mobile optimization, accessibility` — polish
- **Wave 4**: `ci(deploy): Porkbun Static Hosting via GitHub Actions + deploy branch`
- **Final**: `chore: cleanup spike files, remove unused components`

---

## Success Criteria

### Verification Commands
```bash
npm run build                    # Expected: ✓ Compiled successfully
npx lighthouse http://localhost:3000 --output=json --throttling-method=simulate  # Expected: performance > 70
```

### Final Checklist
- [ ] All 6 narrative sections render with 3D assets
- [ ] Typography: Space Grotesk at display, Anton for data, Inter body, IBM Plex Mono data
- [ ] Each section has distinct color theme
- [ ] Scroll pins 3D scenes while content passes through
- [ ] Mobile renders all sections (simplified 3D or static fallback)
- [ ] GPU memory stays flat (dispose on exit)
- [ ] prefers-reduced-motion shows static version
- [ ] All existing content preserved (zero data loss)
- [ ] Build passes, Lighthouse >70 performance mobile
- [ ] No console.log in production
- [ ] Site live on launchcontrollabs.com via Porkbun Static Hosting
- [ ] GitHub Actions auto-deploys on push to main
