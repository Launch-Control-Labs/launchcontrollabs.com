# LCL Rocket Launch Scroll Journey — Full Redesign

## TL;DR

> **Quick Summary**: Redesign the LCL scroll journey into a continuous rocket launch sequence. Scrolling DOWN = rocket launches UP with fire particles, exits atmosphere, cruises through space, and arrives at an astronaut spacewalk. Camera follows the rocket third-person, then transitions to path-based for deep space.
> 
> **Deliverables**:
> - 6-scene continuous scroll journey with shuttle launch + fire effects
> - Revived 5-layer shader particle exhaust (from git history)
> - Sky-to-space background transition
> - Planet drift + starfield for deep space beats
> - Astronaut far→close zoom for final beats
> - 6 content overlays (DOM, SEO-friendly) unchanged in text
> 
> **Estimated Effort**: Large (8 waves, ~15 tasks)
> **Parallel Execution**: YES — up to 4 per wave
> **Critical Path**: Wave 0 (validation) → Wave 1 (architecture) → Wave 2 (camera) → Wave 3 (fire scenes)

---

## Context

### Original Request
"The rocket should launch up as we scroll down and we should reuse the rocket fire we had previously so its actually launching but that meant the next section could be the same shuttle getting out of the atmosphere then the next one could be what we had for the old header where the ship is going through space then the next one is the astronaut floating in space during a space walk."

### Tournament Winner
**Approach B — Third-Person Follow Camera** (8.30/10) with intimate-start pull-back from Approach A.

### Fire Effect Winner
**Option 1 — Revived 5-layer shader particle system** (8.25/10) from git commit `cca825a`.

### 6-Scene Narrative (confirmed)

| Beat | Scroll | Visual Scene | Content Overlay |
|------|--------|-------------|----------------|
| 1 | 0–15% | Shuttle launches with fire | Hero: LAUNCH CONTROL LABS |
| 2 | 15–35% | Shuttle exits atmosphere | Problem: 90% fail stats |
| 3 | 35–55% | Ship through deep space | Capabilities: stats cards |
| 4 | 55–75% | Shuttle + Earth (wide shot) | Portfolio: Talisman + projects |
| 5 | 75–90% | Astronaut far (full body) | Authority: awards |
| 6 | 90–100% | Astronaut close-up (helmet) | CTA |

---

## Work Objectives

### Core Objective
Replace the current static-positioned-models-along-path architecture with a dynamic rocket-follows-scroll system where the shuttle physically rises through the scene driven by scroll progress.

### Concrete Deliverables
- Rocket position bound to scroll (Y = progress × 50)
- 5-layer PlumeStream exhaust particles (540 total, GLSL shaders)
- Camera: third-person follow (beats 1-2) → path-based (beats 3-6)
- Background: sky blue (#87ceeb) → deep space (#020914) transition at beats 1-2
- StarField: 3000 procedural points, slow rotation, fades in at beat 2-3
- Planet drift: GLB models with Z-axis parallax at beat 3
- Earth: scale 12 at beat 4 background
- Astronaut: animated drifting model, far → close zoom (beats 5-6)

### Definition of Done
- [ ] Shuttle rises from Y=0 to Y=50 as scroll progresses 0→75%
- [ ] Fire particles visible and attached to shuttle during beats 1-2
- [ ] Background transitions from sky blue to space black between 15-35% scroll
- [ ] Stars visible from 30% scroll onward
- [ ] Astronaut visible and animated at 75-100% scroll
- [ ] All 6 DOM content overlays appear at correct scroll positions
- [ ] 30fps sustained during continuous scroll at 500px/s
- [ ] Reverse scroll produces coherent visual (no jumps or particle bursts)

### Must Have
- Shuttle model physically RISES with scroll (not pre-positioned)
- Fire particles from the NOZZLE of the shuttle (5 layers)
- Sky-to-space transition (not a hard cut)
- Astronaut zoom (far → close for final two beats)
- All existing content text preserved verbatim

### Must NOT Have (Guardrails)
- No NEW npm dependencies
- No additional post-processing effects beyond existing Bloom
- No audio/sound effects
- No physics simulation (drift = sine waves only)
- No interactive 3D elements (no hover/click on models)
- No procedural terrain or atmosphere mesh
- No per-star animation (slow group rotation only)
- No more than ONE animation clip per model
- No camera shake or vibration effects
- No nebula, shooting stars, or star-field enhancements
- Do NOT change content text in any beat overlay

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: YES (Playwright + bun test available)
- **Automated tests**: Unit tests for camera math, visual for scenes
- **Framework**: Playwright screenshots + performance.now() FPS measurement

### QA Policy
- Every scene task: Playwright screenshot at beat midpoint + FPS assertion
- FPS: `requestAnimationFrame callback averages ≥30fps over 100 frames during 0→100% scroll at 500px/s`
- Memory: `performance.memory.usedJSHeapSize delta ≤ 1MB after 5 full scroll cycles`
- Reverse scroll: `Scroll 100%→0% at 300px/s — no visual discontinuity`
- Evidence: `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 0 (Validate — must pass before anything):
├── Task 1: Validate old fire code compiles with current Three.js [quick]
├── Task 2: Validate all required model assets exist and are loadable [quick]
└── Task 3: Confirm GSAP + ScrollTrigger + drei deps present [quick]

Wave 1 (Architecture — foundation):
├── Task 4: New camera system (follow-mode + path-mode + crossfade) [deep]
└── Task 5: New scene-positions + beat-config for 6 rocket beats [quick]

Wave 2 (Core scenes — shuttle + fire):
├── Task 6: Extract + adapt RocketExhaust component from git [unspecified-high]
├── Task 7: Build RocketLaunch scene (shuttle + fire + scroll-driven rise) [unspecified-high]
└── Task 8: Build AtmosphereTransition (sky→space bg + fire fadeout) [quick]

Wave 3 (Space scenes — independent of fire):
├── Task 9: Build SpaceCruise scene (starfield + planet drift) [unspecified-high]
├── Task 10: Build ShuttleEarth scene (shuttle + Earth wide shot) [quick]
└── Task 11: Build AstronautScenes (far + close zoom) [unspecified-high]

Wave 4 (Integration):
├── Task 12: Wire all scenes into JourneyScene + ScrollJourney [unspecified-high]
├── Task 13: Content overlays — adapt 6 beat components to new scroll ranges [quick]
└── Task 14: Mobile 2D fallback update [quick]

Wave 5 (QA + Performance):
└── Task 15: Full integration test (FPS, memory, reverse scroll, visual) [quick + playwright]
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1-3 | None | 4-15 (GATE) |
| 4 | 1-3 | 7, 9, 10, 11, 12 |
| 5 | 1-3 | 7, 8, 9, 10, 11, 12 |
| 6 | 1-3 | 7 |
| 7 | 4, 5, 6 | 12 |
| 8 | 5 | 12 |
| 9 | 4, 5 | 12 |
| 10 | 4, 5 | 12 |
| 11 | 4, 5 | 12 |
| 12 | 7, 8, 9, 10, 11 | 13, 15 |
| 13 | 12 | 15 |
| 14 | 5 | 15 |
| 15 | 12, 13, 14 | — |

### Agent Dispatch Summary

- **Wave 0**: 3 tasks → all `quick`
- **Wave 1**: 2 tasks → `deep` + `quick`
- **Wave 2**: 3 tasks → `unspecified-high` × 2, `quick` × 1
- **Wave 3**: 3 tasks → `unspecified-high` × 2, `quick` × 1
- **Wave 4**: 3 tasks → `unspecified-high` × 1, `quick` × 2
- **Wave 5**: 1 task → `quick` + `playwright` skill

---

## TODOs

- [x] 1. Validate Old Fire Shader Compiles with Current Three.js

  **What to do**:
  - Extract PlumeStream code from git: `git show cca825a:src/components/3d/InteractiveRoom.tsx > /tmp/fire-check.tsx`
  - Check current Three.js version: `cat package.json | grep three`
  - Verify ShaderMaterial API compatibility (uniforms syntax, BufferAttribute, gl_PointSize, gl_PointCoord)
  - If incompatible: document what changed, estimate fix effort
  - If compatible: confirm with "PASS — old fire code is usable as-is"

  **Acceptance Criteria**:
  - [ ] Three.js version identified and documented
  - [ ] Each GLSL feature used in VERT/FRAG confirmed still supported
  - [ ] THREE.ShaderMaterial, THREE.BufferAttribute, THREE.Points confirmed available
  - [ ] Verdict: PASS (usable) or FAIL (needs adaptation) with details

  **Recommended Agent Profile**: `quick`, Skills: `[]`
  **Parallelization**: Wave 0 (with Tasks 2, 3) | Blocks: ALL subsequent tasks
  **Commit**: NO (validation only)

---

- [x] 2. Validate Model Assets Exist and Are Loadable

  **What to do**:
  - Confirm these files exist and are non-zero size:
    - `public/models/optimized/space-shuttle.glb`
    - `public/models/optimized/drifting-astronaut.glb`
    - `public/models/optimized/earth.glb`
    - `public/models/optimized/various-planets.glb`
  - Check if drifting-astronaut has embedded animation: load in Three.js and check `animations.length > 0`
  - Check triangle counts: load each model, count total triangles, ensure < 50K per model
  - Verify DRACO decoder is available if models use DRACO compression

  **Acceptance Criteria**:
  - [ ] All 4 required models exist on disk with size > 0
  - [ ] Drifting astronaut has at least 1 animation clip
  - [ ] No single model exceeds 50K triangles
  - [ ] DRACO decoder configured (if needed)

  **Recommended Agent Profile**: `quick`, Skills: `[]`
  **Parallelization**: Wave 0 (with Tasks 1, 3) | Blocks: ALL subsequent tasks
  **Commit**: NO (validation only)

---

- [x] 3. Confirm Dependencies Present (GSAP + drei + postprocessing)

  **What to do**:
  - Check package.json for: `gsap`, `@gsap/react`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `three`, `zustand`
  - Verify versions are compatible (Three.js r150+ for modern ShaderMaterial)
  - Check that `@react-three/drei` has `Stars` component available (used for starfield)
  - Confirm no dep conflicts that would block the fire shader

  **Acceptance Criteria**:
  - [ ] All required packages present in package.json
  - [ ] Three.js version ≥ r150
  - [ ] `Stars` component importable from drei
  - [ ] No conflicting peer dependency issues

  **Recommended Agent Profile**: `quick`, Skills: `[]`
  **Parallelization**: Wave 0 (with Tasks 1, 2) | Blocks: ALL subsequent tasks
  **Commit**: NO (validation only)

---

- [x] 4. New Camera System: Follow-Mode + Path-Mode + Crossfade

  **What to do**:
  - Rewrite `src/config/camera-path.ts` with TWO camera modes:
    - **Follow mode** (0–30% scroll): camera.y = shuttle.y - offset. Offset grows from 2→8 units over 0-15%.
    - **Path mode** (40–100% scroll): existing waypoint interpolation for beats 3-6
    - **Crossfade zone** (30–40% scroll): blend between follow and path with smoothstep
  - Update `CameraController` in ScrollJourney.tsx to compute both modes and blend
  - Crossfade formula: `weight = smoothstep(0.30, 0.40, progress)`; `finalPos = lerp(followPos, pathPos, weight)`
  - Path mode waypoints:
    - Beat 3 (50%): pos [0, 35, 15], lookAt [0, 30, -40], FOV 65
    - Beat 4 (65%): pos [-5, 40, 25], lookAt [10, 35, -60], FOV 70
    - Beat 5 (82%): pos [3, 42, 20], lookAt [-5, 40, -10], FOV 60
    - Beat 6 (95%): pos [0, 43, 8], lookAt [0, 43, -5], FOV 50 (tight on astronaut)
  - Use deltaTime-based lerp: `lerp(current, target, 1 - Math.exp(-speed * delta))`

  **Must NOT do**: No camera shake, no FOV oscillation, no orbit controls

  **References**:
  - `src/components/ScrollJourney.tsx:20-38` — Current CameraController (to rewrite)
  - `src/config/camera-path.ts` — Current waypoint system (to extend)
  - Three.js: `THREE.MathUtils.smoothstep(x, min, max)` for blend weight

  **Acceptance Criteria**:
  - [ ] Camera smoothly follows shuttle during 0-30% scroll
  - [ ] Camera transitions without jump to path mode at 30-40%
  - [ ] Path mode interpolates correctly for beats 3-6
  - [ ] Reverse scroll (scroll up) produces smooth reverse camera movement
  - [ ] No allocation in useFrame (pre-allocated Vector3)

  **Recommended Agent Profile**: `deep`, Skills: `[]`
  **Parallelization**: Wave 1 (with Task 5) | Blocks: Tasks 7, 9, 10, 11, 12
  **Commit**: YES — `feat(camera): dual-mode camera (follow + path + crossfade)`

---

- [x] 5. New Scene Positions + Beat Config for 6 Rocket Beats

  **What to do**:
  - Rewrite `src/config/scene-positions.ts`:
    - shuttle: position [0, 0, 0] (START at Y=0, will be driven by scroll), rotation [-π/2, 0, 0], scale 2.5
    - earth: position [10, 38, -60], rotation [0, 0, -0.2], scale 15
    - planets: position [15, 32, -30], rotation [0, 0.2, 0], scale 0.5
    - astronaut: position [0, 42, -5], rotation [0.1, 0.3, 0], scale 1.2
  - Rewrite `src/config/beat-config.ts` with new 6-beat scroll ranges:
    - launch: 0.00–0.15 (rocket launching)
    - atmosphere: 0.15–0.35 (exiting atmosphere)
    - spaceCruise: 0.35–0.55 (deep space)
    - shuttleEarth: 0.55–0.75 (wide shot with Earth)
    - astronautFar: 0.75–0.90 (astronaut full body)
    - astronautClose: 0.90–1.00 (helmet close-up)
  - Lock background colors:
    - 0%: `#4a90d9` (sky blue)
    - 15%: `#1a3a5c` (dark blue)
    - 35%: `#020914` (deep space — locked for rest)

  **Acceptance Criteria**:
  - [ ] scene-positions.ts has 4 model configs (shuttle, earth, planets, astronaut)
  - [ ] beat-config.ts has 6 beats with non-overlapping ranges that sum to 0-1
  - [ ] Background color hex values locked (not TBD)
  - [ ] TypeScript compiles

  **Recommended Agent Profile**: `quick`, Skills: `[]`
  **Parallelization**: Wave 1 (with Task 4) | Blocks: Tasks 7, 8, 9, 10, 11, 12
  **Commit**: YES — `config: new scene positions + beat config for rocket launch journey`

---

- [x] 6. Extract + Adapt RocketExhaust Component from Git

  **What to do**:
  - Extract PlumeStream from `git show cca825a:src/components/3d/InteractiveRoom.tsx`
  - Create NEW file: `src/components/3d/RocketExhaust.tsx`
  - Port the following into the new file:
    - VERT shader, FRAG shader, makeTexture helper
    - StreamConfig interface
    - PlumeStream component (the particle animation loop)
    - 5 stream configs: STREAK_CFG, BELL_CFG, CORE_CFG, MID_CFG, SMOKE_CFG
  - Adapt for new context:
    - Export a `<RocketExhaust />` component that takes `nozzlePosition` and `direction` props
    - Direction should be `[0, -1, 0]` (straight down, since shuttle rises on Y)
    - Add a `visible` prop to disable when fire should fade out (beat 3+)
    - Add `intensity` prop (0-1) that scales particle count and opacity for fade-out
  - DO NOT include the Rocket component or model loading — just the exhaust system
  - Verify: imports work, TypeScript compiles, no runtime errors

  **References**:
  - Git: `git show cca825a:src/components/3d/InteractiveRoom.tsx` lines 25-295
  - VERT/FRAG shaders at lines 25-50
  - StreamConfig interface + 5 configs at lines 145-240
  - PlumeStream component at lines 78-145

  **Acceptance Criteria**:
  - [ ] `src/components/3d/RocketExhaust.tsx` exists with exported `<RocketExhaust />` component
  - [ ] Accepts props: `nozzlePosition`, `direction`, `visible`, `intensity`
  - [ ] Contains all 5 stream layers (STREAK, BELL, CORE, MID, SMOKE)
  - [ ] TypeScript compiles with no errors
  - [ ] No new npm dependencies added

  **Recommended Agent Profile**: `unspecified-high`, Skills: `[]`
  **Parallelization**: Wave 2 (with Tasks 7, 8) | Blocks: Task 7
  **Commit**: YES — `feat(fire): extract PlumeStream particle system from git history`

---

- [x] 7. Build RocketLaunch Scene (Shuttle + Fire + Scroll-Driven Rise)
- [x] 8. Build Atmosphere Transition (Sky → Space Background)
- [x] 9. Build Space Cruise Scene (StarField + Planet Drift)
- [x] 10. Build Shuttle + Earth Wide Shot (Beat 4)
- [x] 11. Build Astronaut Scenes (Far → Close Zoom)

  **What to do**:
  - Astronaut visible 75-100% scroll
  - Uses `drifting-astronaut.glb` (animated) — play first animation clip on loop
  - **Beat 5 (75-90%)**: Camera far from astronaut. Full body visible, floating in space.
    - Astronaut position: [0, 42, -5]
    - Camera at waypoint 5: [3, 42, 20] looking at [-5, 40, -10]
    - Result: astronaut visible as full body, centered in frame
  - **Beat 6 (90-100%)**: Camera zooms IN to astronaut helmet.
    - Camera at waypoint 6: [0, 43, 8] looking at [0, 43, -5]
    - FOV narrows to 50° (tighter framing)
    - Result: astronaut helmet/visor fills more of frame
  - Shuttle fades out by 80% scroll (astronaut takes over)
  - Earth stays visible behind astronaut at reduced opacity

  **References**:
  - `public/models/optimized/drifting-astronaut.glb` — Model with animation
  - Camera waypoints for beats 5-6 from Task 4
  - Current DriftingAstronautModel in JourneyScene.tsx — reference pattern for `useAnimations`

  **Acceptance Criteria**:
  - [ ] Astronaut visible and animated (looping) at 75-100%
  - [ ] At 82% scroll: full body visible (camera far)
  - [ ] At 95% scroll: helmet/visor prominent (camera close)
  - [ ] Animation plays continuously (not scroll-driven)
  - [ ] Shuttle no longer visible at 85%+

  **Recommended Agent Profile**: `unspecified-high`, Skills: `[]`
  **Parallelization**: Wave 3 (with Tasks 9, 10) | Depends on 4, 5 | Blocks: 12
  **Commit**: YES — `feat(scene): astronaut far-to-close zoom (beats 5-6)`

---

- [x] 12. Wire All Scenes into JourneyScene + ScrollJourney

  **What to do**:
  - Rewrite `src/components/journey/JourneyScene.tsx` to assemble all scene elements:
    - `<RocketWithExhaust />` — shuttle + fire (Tasks 6-7)
    - `<BackgroundController />` — atmosphere transition (Task 8)
    - `<StarField />` — stars (Task 9)
    - `<PlanetDrift />` — planets (Task 9)
    - `<EarthModel />` — Earth (Task 10)
    - `<AstronautModel />` — astronaut (Task 11)
  - Each element uses `useBeatVisible()` for visibility gating
  - Lighting stays as-is (already configured in earlier work)
  - Keep existing `<EffectComposer><Bloom /></EffectComposer>` (enhances fire glow)
  - Update ScrollJourney.tsx to use new CameraController from Task 4
  - Ensure all models are wrapped in `<Suspense fallback={null}>`
  - Reverse scroll: all components must render correctly when progress decreases

  **Acceptance Criteria**:
  - [ ] Full scene renders without errors at any scroll position
  - [ ] All 6 models appear at correct scroll ranges
  - [ ] Fire + bloom creates visible glow effect
  - [ ] No model appears at wrong beat
  - [ ] TypeScript compiles
  - [ ] Reverse scroll: no visual discontinuity

  **Recommended Agent Profile**: `unspecified-high`, Skills: `[]`
  **Parallelization**: Wave 4 (with Tasks 13, 14) | Depends on 7, 8, 9, 10, 11 | Blocks: 15
  **Commit**: YES — `feat(integration): assemble all scenes into scroll journey`

---

- [x] 13. Content Overlays — Adapt Beat Components to New Scroll Ranges

  **What to do**:
  - Update all 6 beat overlay components to match new scroll ranges:
    - BeatPreLaunch → range 0-0.15 (unchanged beat key: 'launch')
    - BeatAscent → range 0.15-0.35 (beat key: 'atmosphere')
    - BeatOrbit → range 0.35-0.55 (beat key: 'spaceCruise')
    - BeatConstellation → range 0.55-0.75 (beat key: 'shuttleEarth')
    - BeatAuthority → range 0.75-0.90 (beat key: 'astronautFar')
    - BeatCTA → range 0.90-1.00 (beat key: 'astronautClose')
  - Update `beat-config.ts` beat keys if changed in Task 5
  - DO NOT change any content text — only scroll range bindings
  - Verify each beat fades in and out correctly

  **Must NOT do**: Don't change text, fonts, colors, or layout of content overlays

  **Acceptance Criteria**:
  - [ ] Each content overlay appears at its designated scroll range
  - [ ] Overlays fade in/out smoothly (no hard cuts)
  - [ ] No two overlays visible simultaneously at full opacity
  - [ ] All text content unchanged from current

  **Recommended Agent Profile**: `quick`, Skills: `[]`
  **Parallelization**: Wave 4 (with Tasks 12, 14) | Depends on 12 | Blocks: 15
  **Commit**: YES (groups with Task 12)

---

- [x] 14. Mobile 2D Fallback Update

  **What to do**:
  - Update `src/components/MobileExperience.tsx` to reflect new beat structure
  - Replace any references to old beat names
  - Ensure 6 sections still render in the correct order with correct content
  - No WebGL on mobile — 2D parallax only (existing architecture)

  **Acceptance Criteria**:
  - [ ] Mobile renders 6 content sections in order
  - [ ] No WebGL canvas loaded on mobile
  - [ ] Content matches desktop text exactly

  **Recommended Agent Profile**: `quick`, Skills: `[]`
  **Parallelization**: Wave 4 (with Tasks 12, 13) | Depends on 5 | Blocks: 15
  **Commit**: YES (groups with Task 12)

---

- [ ] 15. Full Integration Test (FPS + Memory + Reverse Scroll + Visual)

  **What to do**:
  - Comprehensive Playwright test of the complete journey
  - Screenshots at: 0%, 10%, 25%, 35%, 50%, 65%, 80%, 95%
  - FPS measurement: inject `performance.now()` counter in requestAnimationFrame, measure over 100 frames during continuous scroll
  - Memory test: `performance.memory.usedJSHeapSize` before/after 5 full cycles
  - Reverse scroll test: scroll from 100% back to 0% at 300px/s, screenshot at 50% and 10%
  - Visual assertions at each beat midpoint (model visible, content visible)
  - Save all evidence to `.sisyphus/evidence/task-15-*`

  **Acceptance Criteria**:
  - [ ] All 8 screenshots show correct scene state (shuttle rising, fire, stars, earth, astronaut)
  - [ ] FPS average ≥ 30 over 100 frames
  - [ ] Memory delta ≤ 1MB after 5 cycles
  - [ ] Reverse scroll: no jumps, no particle bursts, smooth camera reversal
  - [ ] All 6 content overlays visible at their midpoints

  **Recommended Agent Profile**: `quick`, Skills: `["playwright"]`
  **Parallelization**: Wave 5 (final) | Depends on 12, 13, 14 | Blocks: F1, F2
  **Commit**: NO (test only)

---

> After ALL tasks complete, present consolidated results to user for explicit approval.

- [ ] F1. **Full Scroll Journey QA** — `unspecified-high` + `playwright`
  Navigate to localhost:3005. Set viewport 1440×900. Scroll from 0→100% at 500px/s.
  Screenshot at 0%, 10%, 25%, 35%, 50%, 65%, 80%, 95%.
  Verify: shuttle visible + rising (0-50%), fire visible (0-35%), stars visible (30%+), Earth visible (55-80%), astronaut visible (75-100%).
  Check FPS stays ≥30. Check reverse scroll 100→0% produces no jumps.
  Output: `Scenes [6/6 correct] | FPS [min/avg] | Reverse [PASS/FAIL] | VERDICT`

- [ ] F2. **Content Overlay Verification** — `quick`
  At each beat midpoint, verify DOM text is visible, screen-reader accessible, and matches expected content.
  Output: `Beats [6/6 content visible] | a11y [PASS/FAIL] | VERDICT`

---

## Commit Strategy

| # | Message | Files |
|---|---------|-------|
| 1 | `feat(fire): extract PlumeStream + shader particles from git history` | `src/components/3d/RocketExhaust.tsx` |
| 2 | `feat(camera): dual-mode camera system (follow + path + crossfade)` | `src/config/camera-path.ts`, `src/components/ScrollJourney.tsx` |
| 3 | `feat(scene): rocket launch + atmosphere transition` | `src/components/journey/JourneyScene.tsx`, `src/config/scene-positions.ts` |
| 4 | `feat(scene): space cruise + planet drift + starfield` | `src/components/3d/StarField.tsx`, `src/components/journey/JourneyScene.tsx` |
| 5 | `feat(scene): shuttle-earth + astronaut scenes` | `src/components/journey/JourneyScene.tsx` |
| 6 | `feat(integration): wire all scenes + update beat overlays` | Multiple |

---

## Success Criteria

### Verification Commands
```bash
# Dev server running
curl -s -o /dev/null -w "%{http_code}" http://localhost:3005  # Expected: 200

# TypeScript compiles
cd /Users/chikochingaya/Projects/launchcontrollabs.com && npx tsc --noEmit  # Expected: 0 errors

# Unit tests pass
cd /Users/chikochingaya/Projects/launchcontrollabs.com && bun test  # Expected: all pass
```

### Final Checklist
- [ ] Shuttle physically rises with scroll (Y=0 at 0%, Y=50 at 75%)
- [ ] Fire particles visible at shuttle nozzle (beats 1-2)
- [ ] Sky-to-space background transition (15-35% scroll)
- [ ] Stars visible from 30% onward
- [ ] Planets drift at beat 3
- [ ] Earth visible at beat 4
- [ ] Astronaut far at beat 5, close at beat 6
- [ ] All 6 content overlays visible at correct scroll positions
- [ ] FPS ≥30 sustained
- [ ] Reverse scroll coherent
- [ ] TypeScript compiles clean
- [ ] No new npm dependencies added
