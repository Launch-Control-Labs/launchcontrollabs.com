# LCL Section/Transition Architecture Rebuild

## TL;DR

> **Quick Summary**: Replace the broken "flat sections over fixed 3D backdrop" architecture with a scroll-driven spatial launch journey. Camera moves through 3D space driven by scroll position. Content appears as HUD overlays and spatial elements at waypoints.
> 
> **Deliverables**:
> - Scroll-driven 3D camera system (GSAP ScrollTrigger → R3F camera)
> - 6-beat narrative journey (Pre-Launch → Ascent → Orbit → Constellation → Deep Space → CTA)
> - First-person rider perspective with shuttle/rocket/astronaut assets
> - Hybrid content system (HUD overlays + Drei Html spatial elements)
> - 2D parallax mobile fallback
> - Visual QA suite via Playwright screenshots
> 
> **Estimated Effort**: Large (5-7 days)
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: PoC → Camera Path → Scene Setup → Per-Beat Content → Polish

---

## Context

### Original Request
"The implementation of the sections and transitions on the LCL site is extremely poorly architected, constructed and implemented."

### Interview Summary
**Key Discussions**:
- Applied Forensic Integration Protocol v3.1 — identified 5 structural failures
- Discovered implementation diverged from approved "Orbital View" design brief
- User chose to MERGE: keep shuttle/rocket/astronaut assets + orbital descent scroll
- Confirmed first-person rider perspective with hybrid content

**Research Findings**:
- basement.studio uses GSAP scroll → camera binding (reference pattern)
- Current architecture has temporal desynchronization (3 competing timing systems)
- All sections have `background: transparent` — root cause of visual bleeding
- Assets already exist in `/public/models/` (GLB format, web-ready)

### Metis Review
**Identified Gaps** (addressed):
- PoC validation needed before full architecture (added as blocking Task 1)
- Camera path geometry unspecified (added as Task 3 with decision point)
- Asset audit missing (added as Task 2)
- Guardrails needed: no custom shaders, no physics, no audio, no particles in v1
- Scroll edge cases: iOS rubber-band, restoration, keyboard nav (added to final QA)
- Performance floor undefined (set: 30fps minimum, 8MB asset budget)

---

## Work Objectives

### Core Objective
Replace the broken flat-sections-over-fixed-3D architecture with a scroll-driven spatial journey where scrolling = camera movement through a 3D launch sequence, using existing shuttle/rocket/astronaut assets.

### Concrete Deliverables
- `src/components/ScrollJourney.tsx` — new scroll-driven scene (replaces `ScrollScene.tsx`)
- `src/config/camera-path.ts` — camera positions + scroll % mapping
- `src/config/beat-config.ts` — content timing + visibility per beat
- `src/components/journey/Beat*.tsx` — 6 beat content overlays
- `src/components/journey/JourneyScene.tsx` — unified 3D scene with all models
- `src/components/MobileExperience.tsx` — 2D parallax fallback
- `tests/scroll-journey.spec.ts` — Playwright visual QA
- `tests/camera-math.test.ts` — unit tests for scroll→position math

### Definition of Done
- [ ] Scrolling smoothly moves camera through 6 narrative beats at ≥30fps
- [ ] All existing site content present in new implementation (no content regression)
- [ ] Mobile fallback renders 2D without loading ANY WebGL assets
- [ ] `prefers-reduced-motion` respected (no camera animation)
- [ ] No visual bleeding between beats (content bound to scroll % ranges)
- [ ] Playwright screenshots match expected state at each beat position

### Must Have
- Scroll position as SINGLE source of truth (no competing observers)
- Camera movement synchronized 1:1 with scroll (no async lag)
- All content in semantic DOM (for SEO + accessibility)
- Graceful WebGL failure fallback
- Device tier detection before first scroll

### Must NOT Have (Guardrails)
- ❌ No new npm dependencies (R3F + GSAP + Zustand + Drei sufficient)
- ❌ No custom GLSL shaders (use Drei materials only)
- ❌ No real-time dynamic lights (emissive + bloom only)
- ❌ No physics engine (animation-only, no rapier/cannon)
- ❌ No audio in v1
- ❌ No interactive 3D objects (no raycasting, no hover states on models)
- ❌ No OrbitControls or user-controlled camera
- ❌ No procedural generation (no Math.random() for positions)
- ❌ No particle systems in v1 (static positioned meshes only)
- ❌ No custom shaders (.glsl/.frag/.vert files banned)
- ❌ Maximum ONE post-processing effect (bloom) — only if FPS stays above 30

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: NO (no test runner configured beyond lint)
- **Automated tests**: YES (Tests-after) — Visual QA + unit tests for camera math
- **Framework**: Playwright for visual QA, bun test for unit tests
- **Setup needed**: Playwright install + test script in package.json

### QA Policy
Every task includes agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **3D/Scroll**: Playwright — navigate to URL, scroll to %, screenshot, assert camera position
- **Performance**: Inject Stats.js, measure FPS during scroll automation
- **Mobile**: Set viewport to 375x812, verify no WebGL canvas rendered
- **Unit tests**: bun test for camera math (scroll % → position vector)

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 0 (BLOCKING GATE — must pass before any other work):
└── Task 1: GSAP + R3F Proof of Concept [deep]

Wave 1 (After PoC passes — foundation, ALL PARALLEL):
├── Task 2: Asset Audit + Optimization [quick]
├── Task 3: Camera Path Design + Config [deep]
├── Task 4: Device Tier Detection + Routing [quick]
├── Task 5: Test Infrastructure Setup [quick]
└── Task 6: Scroll Container + GSAP Binding [unspecified-high]

Wave 2 (After Wave 1 — scene + content, MAX PARALLEL):
├── Task 7: Unified 3D Scene Setup (all models positioned) [unspecified-high]
├── Task 8: Beat 1 — Pre-Launch (Hero) content + overlay [visual-engineering]
├── Task 9: Beat 2 — Ascent/Problem content + overlay [visual-engineering]
├── Task 10: Beat 3 — Orbit/Guide content + overlay [visual-engineering]
├── Task 11: Beat 4 — Constellation/Proof content + overlay [visual-engineering]
├── Task 12: Beat 5 — Deep Space/Authority content + overlay [visual-engineering]
├── Task 13: Beat 6 — CTA/Orbit content + overlay [visual-engineering]
└── Task 14: Mobile 2D Parallax Fallback [visual-engineering]

Wave 3 (After Wave 2 — integration + polish):
├── Task 15: StatusBar + SectionNav Integration [quick]
├── Task 16: Performance Tuning Pass [deep]
├── Task 17: Accessibility + Reduced Motion [quick]
├── Task 18: Edge Cases (scroll restore, keyboard, iOS) [unspecified-high]
└── Task 19: Remove Old Architecture (dead code) [quick]

Wave FINAL (After ALL tasks):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA — full scroll journey (unspecified-high + playwright)
└── Task F4: Scope fidelity check (deep)
→ Present results → Get explicit user okay

Critical Path: Task 1 → Task 3 → Task 6 → Task 7 → Tasks 8-13 → Task 16 → F1-F4
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 7 (Wave 2)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | ALL | 0 |
| 2 | 1 | 7 | 1 |
| 3 | 1 | 6, 7 | 1 |
| 4 | 1 | 8-14 | 1 |
| 5 | 1 | F1-F4 | 1 |
| 6 | 3 | 7, 8-13 | 1 |
| 7 | 2, 3, 6 | 8-13 | 2 |
| 8-13 | 6, 7 | 15, 16 | 2 |
| 14 | 4 | 17 | 2 |
| 15 | 8-13 | 16 | 3 |
| 16 | 7, 8-13 | F1-F4 | 3 |
| 17 | 14, 15 | F1-F4 | 3 |
| 18 | 6, 8-13 | F1-F4 | 3 |
| 19 | 8-13 | F1-F4 | 3 |
| F1-F4 | ALL | user okay | FINAL |

### Agent Dispatch Summary

- **Wave 0**: 1 task → `deep`
- **Wave 1**: 5 tasks → `quick` × 3, `deep` × 1, `unspecified-high` × 1
- **Wave 2**: 8 tasks → `visual-engineering` × 7, `unspecified-high` × 1
- **Wave 3**: 5 tasks → `quick` × 3, `deep` × 1, `unspecified-high` × 1
- **FINAL**: 4 tasks → `oracle` × 1, `unspecified-high` × 2, `deep` × 1

---

## TODOs

- [x] 1. GSAP + R3F Proof of Concept (BLOCKING GATE)

  **What to do**:
  - Create `src/app/spike/scroll-camera/page.tsx` — a standalone test page
  - Set up: R3F Canvas with a single cube at z=-50, camera at z=0
  - Bind GSAP ScrollTrigger (scrub:true) to drive `camera.position.z` from 0 to -100
  - Scroll container: 600vh tall div
  - Measure: Does camera move smoothly? Any jitter? FPS during scroll?
  - Test TWO approaches: (A) ScrollTrigger writes to a Zustand ref, useFrame reads it. (B) ScrollTrigger directly mutates camera via gsap.to().
  - Pick whichever is smoother. Document findings.
  - If NEITHER works smoothly: flag immediately. Architecture needs revision.

  **Must NOT do**:
  - Don't build anything permanent. This is a spike/throwaway.
  - Don't add any npm dependencies.
  - Don't modify existing site code.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Architecture-defining validation requiring careful analysis and comparison of two approaches
  - **Skills**: [`engineering`]
    - `engineering`: Core TDD/verification methodology for the PoC validation

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 0 (solo, blocking gate)
  - **Blocks**: ALL other tasks
  - **Blocked By**: None

  **References**:
  - `src/components/ScrollScene.tsx:61-70` — Current GSAP ScrollTrigger usage (what to learn from)
  - `src/components/3d/SceneRenderer.tsx:31-49` — Current useFrame pattern (adapt for camera)
  - `src/store/scene-store.ts` — Zustand store pattern (ref approach A)

  **Acceptance Criteria**:
  - [ ] Spike page loads at localhost:3005/spike/scroll-camera
  - [ ] Scrolling moves camera smoothly along Z axis
  - [ ] FPS stays ≥ 45 during continuous scroll (measured via Stats.js or performance.now delta)
  - [ ] No visible jitter or frame drops during scroll direction changes
  - [ ] Clear winner between approach A (ref) and approach B (direct mutation) documented

  **QA Scenarios**:
  ```
  Scenario: Camera moves with scroll (happy path)
    Tool: Playwright
    Preconditions: Dev server running on localhost:3005
    Steps:
      1. Navigate to localhost:3005/spike/scroll-camera
      2. Wait for canvas to render (wait for `canvas` element visible)
      3. Scroll to 50% of page height using page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5))
      4. Wait 500ms for animation
      5. Screenshot → compare camera has moved (cube appears larger/closer)
    Expected Result: Screenshot shows cube at different apparent size than initial state
    Evidence: .sisyphus/evidence/task-1-camera-moves.png

  Scenario: No jitter during rapid scroll changes
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to spike page
      2. Rapidly scroll down 2000px then up 1000px within 500ms
      3. Inject performance measurement: track frame times during scroll
      4. Assert no frame exceeds 33ms (30fps floor)
    Expected Result: All frames < 33ms, no jitter visible
    Evidence: .sisyphus/evidence/task-1-no-jitter.json
  ```

  **Commit**: NO (spike, not production)

---

- [x] 2. Asset Audit + Optimization Inventory

  **What to do**:
  - Inventory ALL GLB files in `public/models/` and `public/models/optimized/`
  - For each: file size, vertex count (via gltf-transform inspect or Three.js loader)
  - Check: are astronaut models animated (embedded animation clips) or static?
  - Check: texture sizes and formats
  - Produce: `src/config/asset-inventory.ts` — typed object with all model metadata
  - Identify: which models to use per beat (based on narrative + size budget)
  - Total budget: < 8MB for all models loaded simultaneously
  - Recommend: which models need optimization, which are ready

  **Must NOT do**:
  - Don't actually optimize models yet (just audit)
  - Don't modify any GLB files
  - Don't add npm dependencies

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: File inspection and metadata extraction, no complex logic
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 3, 4, 5, 6)
  - **Blocks**: Task 7 (Scene Setup needs to know which models to load)
  - **Blocked By**: Task 1 (PoC must pass first)

  **References**:
  - `public/models/` — all model files to audit
  - `src/hooks/useSceneLifecycle.ts:10-16` — current model URL mapping (reference format)

  **Acceptance Criteria**:
  - [ ] `src/config/asset-inventory.ts` exists with typed metadata for all models
  - [ ] Each model entry includes: path, fileSize (bytes), vertexCount, hasAnimations, textureCount
  - [ ] Total recommended model set < 8MB
  - [ ] Beat-to-model mapping documented (which model appears in which beat)

  **QA Scenarios**:
  ```
  Scenario: Asset inventory file is valid TypeScript
    Tool: Bash
    Steps:
      1. Run: npx tsc --noEmit src/config/asset-inventory.ts
    Expected Result: Exit 0, no type errors
    Evidence: .sisyphus/evidence/task-2-typecheck.txt

  Scenario: Total selected assets under budget
    Tool: Bash
    Steps:
      1. Run: node -e "const inv = require('./src/config/asset-inventory.ts'); console.log(inv.totalSelectedSize)"
      2. Assert value < 8388608 (8MB in bytes)
    Expected Result: Total < 8MB
    Evidence: .sisyphus/evidence/task-2-size-budget.txt
  ```

  **Commit**: YES
  - Message: `chore(assets): add typed model inventory with size/vertex metadata`
  - Files: `src/config/asset-inventory.ts`

---

- [x] 3. Camera Path Design + Config

  **What to do**:
  - Design the 3D camera path for the 6-beat journey
  - Decide: linear Z movement vs CatmullRomCurve3 spline (based on PoC findings)
  - For first-person rider perspective: camera starts looking UP (pre-launch), rotates to forward (ascent), then levels (orbit)
  - Create `src/config/camera-path.ts`:
    - Array of waypoints: `{ scrollPercent: number, position: [x,y,z], lookAt: [x,y,z], fov?: number }`
    - Interpolation function: `getCamera(scrollProgress: 0-1) → { position, lookAt, fov }`
    - Scroll % ranges per beat: `BEAT_RANGES = { prelaunch: [0, 0.15], ascent: [0.15, 0.35], ... }`
  - Test: the math produces smooth interpolation between waypoints
  - Consider: camera rotation during ascent (nose-up → level)

  **Must NOT do**:
  - Don't implement the actual R3F camera component (that's Task 6)
  - Don't position any 3D models (that's Task 7)
  - Don't add dependencies for spline libraries (Three.js has CatmullRomCurve3 built-in)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: 3D math, spatial reasoning, architecture-defining config
  - **Skills**: [`engineering`]
    - `engineering`: TDD for camera math functions

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 4, 5, 6)
  - **Blocks**: Task 6 (scroll container reads this config), Task 7 (scene needs to know camera path)
  - **Blocked By**: Task 1 (needs to know which scroll binding approach won)

  **References**:
  - Task 1 PoC findings (which approach is smoother)
  - `src/components/ScrollScene.tsx:39-46` — current section heights (reference for scroll ranges)
  - THREE.CatmullRomCurve3 docs: https://threejs.org/docs/#api/en/extras/curves/CatmullRomCurve3

  **Acceptance Criteria**:
  - [ ] `src/config/camera-path.ts` exports `getCamera(progress: number)` function
  - [ ] `getCamera(0)` returns pre-launch position (looking up at shuttle)
  - [ ] `getCamera(1)` returns final orbit position
  - [ ] Interpolation is smooth (no jumps between waypoints)
  - [ ] `BEAT_RANGES` exported with all 6 beats mapped to scroll % ranges
  - [ ] Unit tests pass: `bun test src/config/camera-path.test.ts`

  **QA Scenarios**:
  ```
  Scenario: Camera interpolation produces smooth positions
    Tool: Bash (bun test)
    Steps:
      1. Run: bun test src/config/camera-path.test.ts
      2. Tests verify: getCamera(0) → starting position
      3. Tests verify: getCamera(0.5) → midpoint (not a waypoint, interpolated)
      4. Tests verify: getCamera(1) → ending position
      5. Tests verify: adjacent positions never jump > 5 units in any axis
    Expected Result: All tests pass
    Evidence: .sisyphus/evidence/task-3-camera-tests.txt

  Scenario: Beat ranges cover full scroll without gaps
    Tool: Bash (bun test)
    Steps:
      1. Test: all beat ranges combined cover [0, 1] completely
      2. Test: no overlapping ranges
      3. Test: getBeatForProgress(0.5) returns correct beat name
    Expected Result: Full coverage, no gaps, no overlaps
    Evidence: .sisyphus/evidence/task-3-beat-ranges.txt
  ```

  **Commit**: YES
  - Message: `feat(journey): camera path config with waypoints and interpolation`
  - Files: `src/config/camera-path.ts`, `src/config/camera-path.test.ts`

---

- [x] 4. Device Tier Detection + Component Routing

  **What to do**:
  - Refactor `src/hooks/useDeviceTier.ts` to detect: desktop-high, desktop-low, mobile
  - Create `src/hooks/useExperienceMode.ts`: returns `'3d' | '2d-parallax' | 'static'`
  - Logic: mobile → 2d-parallax, `prefers-reduced-motion` → static, weak GPU → 2d-parallax, else → 3d
  - Update `src/app/page.tsx` to route between `DesktopJourney` and `MobileExperience` based on mode
  - Detection must complete within 500ms of page load (before first scroll)

  **Must NOT do**:
  - Don't implement the actual Desktop or Mobile experiences (those are later tasks)
  - Don't add WebGL benchmarking libraries
  - Keep detection lightweight (no rendering test frames)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small hook refactor + routing logic, well-defined scope
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 5, 6)
  - **Blocks**: Tasks 8-14 (content tasks need to know which mode they're in)
  - **Blocked By**: Task 1

  **References**:
  - `src/hooks/useDeviceTier.ts` — current tier detection (extend, don't replace)
  - `src/hooks/useIsMobile.ts` — current mobile detection
  - `src/hooks/useReducedMotion.ts` — current reduced motion hook
  - `src/app/page.tsx:20-51` — current routing logic

  **Acceptance Criteria**:
  - [ ] `useExperienceMode()` returns correct mode for: desktop Chrome, iPhone Safari, `prefers-reduced-motion`
  - [ ] Detection completes in < 500ms (measured via performance.now())
  - [ ] `page.tsx` routes to placeholder components based on mode
  - [ ] No WebGL assets loaded when mode is `'2d-parallax'` or `'static'`

  **QA Scenarios**:
  ```
  Scenario: Mobile viewport gets 2D mode
    Tool: Playwright
    Steps:
      1. Set viewport: page.setViewportSize({width: 375, height: 812})
      2. Navigate to localhost:3005
      3. Assert: no <canvas> element in DOM
      4. Assert: data-experience-mode="2d-parallax" attribute on root
    Expected Result: No WebGL canvas rendered on mobile
    Evidence: .sisyphus/evidence/task-4-mobile-no-webgl.png

  Scenario: Reduced motion gets static mode
    Tool: Playwright
    Steps:
      1. page.emulateMedia({reducedMotion: 'reduce'})
      2. Navigate to localhost:3005
      3. Assert: data-experience-mode="static" on root
    Expected Result: Static mode activated
    Evidence: .sisyphus/evidence/task-4-reduced-motion.png
  ```

  **Commit**: YES
  - Message: `feat(routing): experience mode detection + component routing`
  - Files: `src/hooks/useExperienceMode.ts`, `src/app/page.tsx`

---

- [x] 5. Test Infrastructure Setup

  **What to do**:
  - Install Playwright: `pnpm add -D @playwright/test`
  - Create `playwright.config.ts` with: baseURL localhost:3005, screenshot on failure
  - Create `tests/scroll-journey.spec.ts` skeleton (empty test cases for each beat)
  - Add scripts to package.json: `"test:e2e": "playwright test"`, `"test:unit": "bun test"`
  - Create `.sisyphus/evidence/` directory structure
  - Verify: `npx playwright test --list` shows test cases

  **Must NOT do**:
  - Don't write actual test implementations (those come with each task)
  - Don't install unnecessary test utilities

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Scaffolding, no complex logic
  - **Skills**: [`e2e-setup`]
    - `e2e-setup`: Playwright infrastructure scaffolding

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 6)
  - **Blocks**: Final verification wave (needs test infrastructure)
  - **Blocked By**: Task 1

  **References**:
  - `package.json` — add test scripts here
  - `tsconfig.json` — ensure test files are included

  **Acceptance Criteria**:
  - [ ] `npx playwright test --list` shows skeleton test cases
  - [ ] `bun test` runs without error (even if no tests exist yet)
  - [ ] `.sisyphus/evidence/` directory exists
  - [ ] `playwright.config.ts` configured for localhost:3005

  **QA Scenarios**:
  ```
  Scenario: Playwright lists tests
    Tool: Bash
    Steps:
      1. Run: npx playwright test --list
    Expected Result: Shows test file with beat names listed
    Evidence: .sisyphus/evidence/task-5-test-list.txt
  ```

  **Commit**: YES
  - Message: `chore(test): scaffold Playwright + bun test infrastructure`
  - Files: `playwright.config.ts`, `tests/scroll-journey.spec.ts`, `package.json`

---

- [x] 6. Scroll Container + GSAP Camera Binding

  **What to do**:
  - Create `src/components/ScrollJourney.tsx` — the new top-level scroll experience
  - Structure: tall scroll container (total height from camera-path config) + fixed R3F Canvas
  - GSAP ScrollTrigger with `scrub: true` on the container
  - On scroll: read progress (0-1), call `getCamera(progress)`, apply to R3F camera
  - Use the winning approach from Task 1 PoC (ref-based or direct mutation)
  - Zustand store simplified: `scrollProgress` as single number (0-1)
  - Camera component inside Canvas that reads scrollProgress and positions camera

  **Must NOT do**:
  - Don't position any 3D models yet (Task 7)
  - Don't add content overlays yet (Tasks 8-13)
  - Don't handle mobile (Task 14)
  - Just: scroll → camera movement, nothing else

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Core architecture component, requires careful R3F + GSAP integration
  - **Skills**: [`engineering`]
    - `engineering`: Architecture-defining component needs rigorous verification

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 3 provides camera-path config)
  - **Parallel Group**: Wave 1 (starts after Task 3 completes)
  - **Blocks**: Task 7 (scene goes inside this), Tasks 8-13 (overlays attach here)
  - **Blocked By**: Task 1 (approach), Task 3 (camera config)

  **References**:
  - Task 1 PoC findings (which binding approach)
  - `src/config/camera-path.ts` (from Task 3) — `getCamera()` function
  - `src/components/ScrollScene.tsx` — old architecture (reference, don't copy)
  - basement.studio pattern: scroll container height determines journey length

  **Acceptance Criteria**:
  - [ ] `ScrollJourney.tsx` renders a canvas with moving camera
  - [ ] Scrolling from top to bottom moves camera through full path
  - [ ] `scrollProgress` in Zustand store accurately reflects scroll position
  - [ ] Camera position matches `getCamera(scrollProgress)` at all times
  - [ ] FPS ≥ 30 during scroll with empty scene (just camera moving)

  **QA Scenarios**:
  ```
  Scenario: Camera traverses full path on scroll
    Tool: Playwright
    Steps:
      1. Navigate to page (import ScrollJourney as main content)
      2. Screenshot at scroll 0% — camera at start position
      3. Scroll to 50% — screenshot
      4. Scroll to 100% — screenshot
      5. Compare: all 3 screenshots show different camera perspectives
    Expected Result: Visibly different camera angles at 0%, 50%, 100%
    Evidence: .sisyphus/evidence/task-6-camera-path-0.png, task-6-camera-path-50.png, task-6-camera-path-100.png

  Scenario: Scroll UP returns camera correctly
    Tool: Playwright
    Steps:
      1. Scroll to 75%
      2. Screenshot (position A)
      3. Scroll to 25%
      4. Scroll back to 75%
      5. Screenshot (position B)
      6. Compare A and B — must be identical
    Expected Result: Screenshots A and B are pixel-identical (deterministic)
    Evidence: .sisyphus/evidence/task-6-reversible.png
  ```

  **Commit**: YES
  - Message: `feat(journey): scroll container + GSAP camera binding`
  - Files: `src/components/ScrollJourney.tsx`, updated `src/store/scene-store.ts`

---

- [x] 7. Unified 3D Scene Setup (All Models Positioned)

  **What to do**:
  - Create `src/components/journey/JourneyScene.tsx` — single scene with ALL models positioned in world space
  - Load models from asset inventory (Task 2 output): shuttle, astronauts, planets, Earth, smoke
  - Position each model at its narrative waypoint along the camera path:
    - Beat 1 (z=0): Shuttle on "launch pad" (positioned below camera start)
    - Beat 2 (z=-20 to -40): Drifting astronaut floating past, small debris
    - Beat 3 (z=-50): Earth visible below, planets at distance
    - Beat 4 (z=-70): Mission nodes (use planet models as node representations)
    - Beat 5 (z=-85): Saturn V visible (legacy/heritage), purposeful astronaut
    - Beat 6 (z=-100): Earth from distance, peaceful composition
  - Use Suspense + useGLTF for each model
  - All models visible=false until within camera frustum range (optimization)
  - Emissive materials on rocket exhaust + bloom post-processing (ONE effect max)
  - No real-time lights — use environment map + emissive only

  **Must NOT do**:
  - No custom shaders
  - No particle systems
  - No physics
  - No interactive 3D (no raycasting)
  - No procedural positioning (all positions hardcoded in config)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Complex 3D scene composition requiring spatial reasoning
  - **Skills**: [`engineering`]

  **Parallelization**:
  - **Can Run In Parallel**: NO (needs Tasks 2, 3, 6 complete)
  - **Parallel Group**: Wave 2 (first in wave, blocks beat content)
  - **Blocks**: Tasks 8-13 (content needs scene context)
  - **Blocked By**: Task 2 (asset inventory), Task 3 (camera path), Task 6 (scroll container)

  **References**:
  - `src/config/asset-inventory.ts` (Task 2) — model paths + sizes
  - `src/config/camera-path.ts` (Task 3) — waypoint positions
  - `src/components/3d/SceneRenderer.tsx` — old renderer (patterns to learn from)
  - `src/components/3d/scenes/HeroScene.tsx` — old scene setup (emissive + bloom pattern)

  **Acceptance Criteria**:
  - [ ] All 6 beat positions have at least one model visible when camera is at that waypoint
  - [ ] Total loaded model size < 8MB
  - [ ] No real-time lights in scene (only emissive + environment)
  - [ ] FPS ≥ 30 with all models loaded during scroll
  - [ ] Models outside camera frustum are not rendered (visible=false optimization)

  **QA Scenarios**:
  ```
  Scenario: Models visible at correct beats
    Tool: Playwright
    Steps:
      1. Navigate to page with full scene
      2. For each beat (scroll to beat midpoint %):
         - Screenshot
         - Verify: at least one 3D object visible (not empty black)
    Expected Result: 6 screenshots each showing different 3D composition
    Evidence: .sisyphus/evidence/task-7-beat-{1-6}.png
  ```

  **Commit**: YES
  - Message: `feat(journey): unified 3D scene with all models positioned along path`
  - Files: `src/components/journey/JourneyScene.tsx`, `src/config/scene-positions.ts`

---

- [x] 8. Beat 1 — Pre-Launch (Hero) Content Overlay

  **What to do**:
  - Create `src/components/journey/BeatPreLaunch.tsx`
  - Content: "LAUNCH CONTROL LABS" headline, "Product Studio · Dallas · Barcelona · Miami", "Est. 2021"
  - Style: HUD overlay (fixed position div, opacity driven by scrollProgress)
  - Visible when: scrollProgress 0-0.15 (fades in at 0, fades out approaching 0.15)
  - Typography: massive display font (13.5vw), matches current HeroOverlay style
  - Positioned: bottom of viewport (current layout preserved)
  - Use `beat-config.ts` for opacity curves

  **Must NOT do**:
  - Don't modify 3D scene
  - Don't handle mobile (that's Task 14)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Typography, layout, visual timing with scroll
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 9-14)
  - **Blocks**: Task 15 (nav integration)
  - **Blocked By**: Task 6 (scroll container), Task 7 (scene context)

  **References**:
  - `src/components/HeroOverlay.tsx` — current hero content (preserve copy + style)
  - `src/styles/section-constants.ts` — typography + color tokens

  **Acceptance Criteria**:
  - [ ] "LAUNCH CONTROL LABS" visible at scroll 0%
  - [ ] Content fades out by scroll 15%
  - [ ] All text in DOM (not canvas) — verify with `document.querySelector`
  - [ ] Typography matches: 13.5vw display font, monospace labels

  **QA Scenarios**:
  ```
  Scenario: Hero content visible at start, gone by beat 2
    Tool: Playwright
    Steps:
      1. Navigate, scroll to 0%
      2. Assert: text "LAUNCH CONTROL LABS" visible
      3. Scroll to 20%
      4. Assert: text "LAUNCH CONTROL LABS" NOT visible (opacity 0)
    Expected Result: Content correctly bound to scroll range
    Evidence: .sisyphus/evidence/task-8-hero-visible.png, task-8-hero-hidden.png
  ```

  **Commit**: YES (groups with 9-13)
  - Message: `feat(journey): beat content overlays (all 6 beats)`
  - Files: `src/components/journey/BeatPreLaunch.tsx`

---

- [x] 9. Beat 2 — Ascent/Problem Content Overlay

  **What to do**:
  - Create `src/components/journey/BeatAscent.tsx`
  - Content: "THE PROBLEM" flag, "LOST IN SPACE" heading, body copy about product failure, callout stats (90% fail, 18 months, $1.2M)
  - Style: HUD overlay, left-aligned, red accent theme
  - Visible: scrollProgress 0.15-0.35
  - Port content from `src/components/sections/ProblemSection.tsx`

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**: Same as Task 8

  **References**:
  - `src/components/sections/ProblemSection.tsx` — exact content to port
  - `src/styles/section-constants.ts:109-114` — problem theme colors

  **Acceptance Criteria**:
  - [ ] Problem content visible at scroll 20% (midpoint of range)
  - [ ] Hidden outside 0.15-0.35 range
  - [ ] Red accent (#DC2626) matches original theme
  - [ ] Callout cards render with correct stats

  **QA Scenarios**: Same pattern as Task 8 with different scroll positions.

  **Commit**: YES (groups with 8, 10-13)

---

- [x] 10. Beat 3 — Orbit/Guide Content Overlay

  **What to do**:
  - Create `src/components/journey/BeatOrbit.tsx`
  - Content: "THE GUIDE" flag, "MISSION CAPABLE" heading, stats grid (12 shipped, 47 launched, 3.2B events/day, 99.97% uptime)
  - Style: HUD overlay, centered, blue accent. Stats as telemetry readout (HUD feel)
  - Visible: scrollProgress 0.35-0.55
  - Port content from `src/components/sections/GuideSection.tsx`

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**: Same as Task 8

  **References**:
  - `src/components/sections/GuideSection.tsx` — exact content to port
  - `src/styles/section-constants.ts:115-122` — guide theme colors

  **Acceptance Criteria**:
  - [ ] Stats visible and correctly styled at scroll 45%
  - [ ] Blue accent (#2563EB) matches theme
  - [ ] All 4 stat cards render with correct values

  **Commit**: YES (groups with 8-9, 11-13)

---

- [x] 11. Beat 4 — Constellation/Proof Content Overlay

  **What to do**:
  - Create `src/components/journey/BeatConstellation.tsx`
  - Content: "THE PROOF" flag, "MISSIONS COMPLETE" heading, Talisman featured card, client work circles (OBWS, HomeMeds, Option One, Sky Boss, NPS.Today)
  - Style: Left-panel overlay with dark backdrop blur (like current ProofSection)
  - Visible: scrollProgress 0.55-0.75
  - SPATIAL: Consider using Drei `<Html>` for client circles positioned near planet models (hybrid approach)
  - Port content from `src/components/sections/ProofSection.tsx`

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**: Same as Task 8

  **References**:
  - `src/components/sections/ProofSection.tsx` — full content to port
  - `src/styles/section-constants.ts:123-130` — proof theme (amber accent)

  **Acceptance Criteria**:
  - [ ] Talisman card with all stats visible at scroll 65%
  - [ ] Client work circles render correctly
  - [ ] Amber accent (#F59E0B) matches theme
  - [ ] Content readable against 3D background (backdrop blur or solid panel)

  **Commit**: YES (groups with 8-10, 12-13)

---

- [x] 12. Beat 5 — Deep Space/Authority Content Overlay

  **What to do**:
  - Create `src/components/journey/BeatAuthority.tsx`
  - Content: Team credentials, authority markers (port from AuthoritySection if content exists)
  - Style: HUD overlay, white accent, minimal
  - Visible: scrollProgress 0.75-0.90
  - If AuthoritySection has content, port it. If minimal, design simple authority statement.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **References**:
  - `src/components/sections/AuthoritySection.tsx` — content source

  **Acceptance Criteria**:
  - [ ] Authority content visible at scroll 82%
  - [ ] White accent matches theme
  - [ ] Content readable

  **Commit**: YES (groups with 8-11, 13)

---

- [x] 13. Beat 6 — CTA/Orbit Content Overlay

  **What to do**:
  - Create `src/components/journey/BeatCTA.tsx`
  - Content: "Ready to launch your next venture?" + contact CTA + capability summary
  - Style: Clean panel, centered, clear call to action
  - Visible: scrollProgress 0.90-1.0
  - Port from OrbitSection if content exists, otherwise design clean CTA section

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **References**:
  - `src/components/sections/OrbitSection.tsx` — content source
  - Design brief frame 6: "Ready to launch your next venture?"

  **Acceptance Criteria**:
  - [ ] CTA visible at scroll 95%
  - [ ] Contact link/email present and clickable
  - [ ] Capability summary present
  - [ ] Green accent (#4ADE80) for orbit theme

  **Commit**: YES (groups with 8-12)

---

- [x] 14. Mobile 2D Parallax Fallback

  **What to do**:
  - Create `src/components/MobileExperience.tsx`
  - Renders ALL content from beats 1-6 as standard scrollable sections
  - Use static images (screenshots of 3D scenes) or CSS gradients as section backgrounds
  - Parallax: slight Y-offset on background images during scroll (CSS or minimal JS)
  - NO WebGL, NO canvas, NO R3F imports (code-split completely)
  - Must load zero 3D dependencies on mobile (verify via bundle analysis)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Mobile layout + parallax visual engineering
  - **Skills**: [`component-states`]
    - `component-states`: Ensures all states (loading, error, empty) handled on mobile

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7-13)
  - **Blocks**: Task 17 (accessibility)
  - **Blocked By**: Task 4 (device routing)

  **Acceptance Criteria**:
  - [ ] Mobile viewport shows all 6 beats of content
  - [ ] No `<canvas>` element in DOM
  - [ ] No Three.js / R3F code in mobile bundle (verify with `next build` output)
  - [ ] Page weight on mobile < 500KB (no 3D assets)
  - [ ] Scroll is smooth native scroll (no GSAP on mobile)

  **QA Scenarios**:
  ```
  Scenario: Mobile loads no WebGL
    Tool: Playwright
    Steps:
      1. Set viewport 375x812
      2. Navigate to localhost:3005
      3. Assert: document.querySelector('canvas') === null
      4. Assert: all 6 beat headings visible when scrolling
      5. Measure: page weight via performance.getEntries()
    Expected Result: No canvas, all content present, < 500KB
    Evidence: .sisyphus/evidence/task-14-mobile-clean.png
  ```

  **Commit**: YES
  - Message: `feat(mobile): 2D parallax fallback experience`
  - Files: `src/components/MobileExperience.tsx`

---

- [ ] 15. StatusBar + SectionNav Integration

  **What to do**:
  - Update `src/components/StatusBar.tsx` — read current beat from scrollProgress (not activeSection)
  - Update `src/components/SectionNav.tsx` — dot nav highlights based on scroll % ranges
  - Nav dot click → GSAP scrollTo correct scroll position (not element, but % position)
  - Remove dependency on old `activeSection` from Zustand

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 3)
  - **Blocks**: Task 16
  - **Blocked By**: Tasks 8-13 (content must exist for nav to reference)

  **References**:
  - `src/components/StatusBar.tsx` — current implementation
  - `src/components/SectionNav.tsx` — current nav
  - `src/config/camera-path.ts` — BEAT_RANGES

  **Acceptance Criteria**:
  - [ ] StatusBar shows correct beat name at each scroll position
  - [ ] Dot nav highlights correct dot based on scroll %
  - [ ] Clicking a dot scrolls to the correct position smoothly

  **Commit**: YES
  - Message: `fix(nav): integrate status bar + section nav with scroll-driven journey`

---

- [ ] 16. Performance Tuning Pass

  **What to do**:
  - Profile full journey scroll with Chrome DevTools Performance tab
  - Identify: which models have too many vertices, which textures are too large
  - Optimize: enable frustum culling (models outside view = visible:false)
  - Optimize: reduce texture resolution if any > 1024px
  - Optimize: cap devicePixelRatio at 2 (`Math.min(window.devicePixelRatio, 2)`)
  - Optimize: disable antialiasing if FPS < 30
  - Measure: FPS at each beat during continuous scroll
  - If bloom causes FPS < 30: remove it (guardrail says max 1 effect, only if FPS allows)
  - Target: ≥ 30fps sustained, ≥ 45fps average

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Performance profiling requires systematic measurement and tradeoff decisions
  - **Skills**: [`engineering`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 3)
  - **Blocks**: Final verification
  - **Blocked By**: Tasks 7-13 (full scene must exist to profile)

  **Acceptance Criteria**:
  - [ ] No frame > 33ms during automated 10-second continuous scroll
  - [ ] Average FPS ≥ 45 across full journey
  - [ ] GPU memory < 256MB (measured via Chrome DevTools)
  - [ ] No jank visible in Playwright screenshot comparison

  **QA Scenarios**:
  ```
  Scenario: FPS stays above floor during full scroll
    Tool: Playwright + injected performance measurement
    Steps:
      1. Inject frame timing measurement script
      2. Automate scroll from 0% to 100% over 10 seconds
      3. Collect all frame times
      4. Assert: max frame time < 33ms
      5. Assert: average frame time < 22ms (≥45fps)
    Expected Result: Performance within budget
    Evidence: .sisyphus/evidence/task-16-perf-report.json
  ```

  **Commit**: YES
  - Message: `perf(journey): optimize scene for 30fps+ sustained scroll`

---

- [ ] 17. Accessibility + Reduced Motion

  **What to do**:
  - `prefers-reduced-motion`: disable camera animation, show all content simultaneously (static layout)
  - Ensure `aria-hidden="true"` on Canvas (decorative)
  - Ensure all content sections have proper heading hierarchy (h1, h2, h3)
  - Verify: screen reader can read all content sequentially
  - Add skip-to-content link (already exists, verify still works)
  - Keyboard navigation: Tab moves through focusable elements, focus visible

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**: Wave 3, parallel with 15, 16, 18, 19

  **Acceptance Criteria**:
  - [ ] `prefers-reduced-motion` → all content visible without scrolling camera
  - [ ] All headings in correct h-level hierarchy
  - [ ] Tab order makes sense through all content
  - [ ] Canvas has `aria-hidden="true"`

  **Commit**: YES
  - Message: `a11y(journey): reduced motion + semantic structure + keyboard nav`

---

- [ ] 18. Edge Cases (Scroll Restore, Keyboard, iOS)

  **What to do**:
  - iOS rubber-banding: clamp camera position to valid range (never < 0 or > 1)
  - Scroll restoration: on page refresh, browser restores scroll → camera must sync immediately
  - Keyboard scroll: spacebar/pagedown should work correctly with ScrollTrigger
  - Tab backgrounding: resume render loop when tab becomes visible again
  - WebGL context loss: show fallback message + content without 3D
  - Browser resize: update camera aspect ratio on resize event

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Multiple edge cases requiring diverse solutions
  - **Skills**: [`engineering`]

  **Parallelization**: Wave 3, parallel

  **Acceptance Criteria**:
  - [ ] Refresh at scroll 50% → camera immediately at correct position
  - [ ] Spacebar scrolls correctly (viewport height jump)
  - [ ] iOS Safari: no camera overshoot at top/bottom
  - [ ] Tab away + back: scene resumes correctly (no stale frame)
  - [ ] Browser resize: no aspect ratio distortion

  **Commit**: YES
  - Message: `fix(journey): scroll restoration, keyboard nav, iOS edge cases`

---

- [ ] 19. Remove Old Architecture (Dead Code Cleanup)

  **What to do**:
  - Delete `src/components/ScrollScene.tsx` (replaced by ScrollJourney)
  - Delete `src/components/sections/` directory (content moved to journey/Beat*.tsx)
  - Delete `src/components/3d/SceneRenderer.tsx` (replaced by JourneyScene)
  - Delete `src/components/3d/scenes/` directory (all 6 old scene files)
  - Delete old hooks that are no longer used (`useSceneLifecycle.ts` if fully replaced)
  - Clean up Zustand store: remove `activeSection`, `loadedSections`, `loadingSection`
  - Verify: `pnpm build` still passes after deletion
  - Verify: no import errors

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Deletion + verification, straightforward
  - **Skills**: []

  **Parallelization**: Wave 3, parallel (but should be last in wave)

  **Acceptance Criteria**:
  - [ ] `pnpm build` exits 0
  - [ ] No import errors referencing deleted files
  - [ ] Old ScrollScene/SceneRenderer/sections files no longer exist
  - [ ] Zustand store only has: `scrollProgress`, `deviceTier`, `experienceMode`

  **QA Scenarios**:
  ```
  Scenario: Build passes after dead code removal
    Tool: Bash
    Steps:
      1. Run: pnpm build
    Expected Result: Exit 0, no errors
    Evidence: .sisyphus/evidence/task-19-build-clean.txt

  Scenario: No references to deleted files
    Tool: Bash
    Steps:
      1. Run: grep -r "ScrollScene\|SceneRenderer\|ProblemScene\|GuideScene\|ProofScene" src/ --include="*.ts" --include="*.tsx"
    Expected Result: Zero matches
    Evidence: .sisyphus/evidence/task-19-no-refs.txt
  ```

  **Commit**: YES
  - Message: `chore: remove old flat-sections architecture`
  - Files: multiple deletions

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, check exports). For each "Must NOT Have": search codebase for forbidden patterns (custom shaders, physics imports, audio, OrbitControls, procedural Math.random). Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + lint. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction. Verify no new dependencies added to package.json.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Open localhost:3005. Scroll through ENTIRE journey. Screenshot each beat. Test scroll up/down. Test nav link clicks. Test mobile viewport. Test reduced motion. Test WebGL failure. Save all evidence to `.sisyphus/evidence/final-qa/`.
  Output: `Beats [6/6 rendered] | Scroll [smooth/janky] | Mobile [renders/fails] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual implementation. Verify 1:1 — everything in spec was built, nothing beyond spec was built. Check guardrails: no custom shaders, no physics, no audio, no new deps. Detect cross-task contamination.
  Output: `Tasks [N/N compliant] | Guardrails [N/N respected] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

| Wave | Commit Message | Key Files |
|------|---------------|-----------|
| 0 | `spike(scroll): validate GSAP+R3F camera binding PoC` | `src/spike/` |
| 1 | `feat(journey): camera path config + scroll container + device detection` | `src/config/`, `src/components/ScrollJourney.tsx` |
| 2 | `feat(journey): unified 3D scene + all 6 beat overlays` | `src/components/journey/` |
| 2 | `feat(mobile): 2D parallax fallback experience` | `src/components/MobileExperience.tsx` |
| 3 | `fix(journey): perf tuning, a11y, edge cases, nav integration` | various |
| 3 | `chore: remove old ScrollScene architecture` | delete old files |

---

## Success Criteria

### Verification Commands
```bash
# Build passes
pnpm build  # Expected: exit 0

# Unit tests pass
bun test src/config/camera-path.test.ts  # Expected: all pass

# Playwright visual QA
npx playwright test tests/scroll-journey.spec.ts  # Expected: all screenshots match

# Performance check (manual via Playwright)
# FPS ≥ 30 during automated scroll at each beat

# No forbidden patterns
grep -r "OrbitControls\|rapier\|cannon\|\.glsl\|\.frag\|\.vert" src/ --include="*.ts" --include="*.tsx"  # Expected: no matches
grep -r "Math\.random" src/components/journey/ --include="*.ts" --include="*.tsx"  # Expected: no matches
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] All 6 beats render content correctly
- [ ] Mobile fallback works without WebGL
- [ ] Scroll is smooth (≥30fps)
- [ ] Camera position deterministic from scroll %
- [ ] Content in DOM (SEO crawlable)
- [ ] Reduced motion respected
- [ ] Old architecture removed
