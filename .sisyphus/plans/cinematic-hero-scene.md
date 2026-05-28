# Cinematic 3D Hero Scene — Falcon 9 + Floating Astronaut

## TL;DR

> **Quick Summary**: Replace the current Saturn V 3D hero with a cinematic, layered composition: Falcon 9 center-frame, colorful floating astronaut, "Launch Control" LEFT / "Labs" RIGHT text, using cinematographic depth principles (foreground particles → midground subjects → background fog/stars).
> 
> **Deliverables**:
> - Falcon 9 model loaded as centerpiece spacecraft
> - Animated floating astronaut with colorful suit positioned in frame
> - "Launch Control" text left, "Labs" text right (HTML overlay)
> - Cinematographic layering with fog, parallax, and ambient animation
> - Post-processing (bloom) for cinematic glow
> - Interactive parallax on mouse/scroll + ambient drift
> 
> **Estimated Effort**: Medium (3-5 hours)
> **Parallel Execution**: YES — 4 waves
> **Critical Path**: Model validation → Scene swap → Animation → Polish

---

## Context

### Original Request
The user wants the 3D hero scene redesigned with:
1. "Labs" text added to the right of the spacecraft (was never implemented)
2. Switch from Saturn V to the Falcon 9 ("shuttle") model which fits better
3. Cinematographic layering for depth: foreground, midground, background
4. Floating astronaut with colorful suit details

### Interview Summary
**Key Discussions**:
- **Mood**: Epic/cinematic (Gravity, Interstellar) — dramatic lighting, sense of scale
- **Astronaut colors**: Full color palette, realistic with colorful details (mission patches, flag, colored panels)
- **Text layout**: "Launch Control" LEFT, "Labs" RIGHT, flanking the center spacecraft
- **Animation**: Both ambient drift AND interactive parallax (mouse/scroll)
- **Models**: User has both models in Downloads, chose `animated_floating_astronaut_in_space_suit_loop.glb`
- **Text rendering**: Improve current HTML overlay approach (no 3D text)

**Research Findings**:
- Project uses Next.js + React Three Fiber v9.6.1 + Three.js 0.184 + @react-three/drei v10.7.7
- Existing scroll camera with Catmull-Rom curve (4 keyframes, 150% scroll distance)
- Mobile already handled: `StaticHeroFallback` component exists for `isMobile`
- Custom shader system exists but can be simplified for new composition
- Scene files: `ControlRoomScene.tsx`, `InteractiveRoom.tsx`, `ScrollCamera.tsx`

### Metis Review
**Identified Gaps** (addressed):
- Performance budget for 52MB models → Added model validation + Draco compression task
- Falcon 9 includes launch pad, may conflict with "floating in space" aesthetic → Keep pad, gives grounding
- Astronaut scale vs 70m Falcon 9 → Use artistic scale (astronaut ~1/5 rocket height)
- Camera system incompatibility → Simplify to frontal composition with drift
- Text readability against dynamic background → CSS text-shadow + backdrop for contrast
- Post-processing scope → Capped at bloom only

---

## Work Objectives

### Core Objective
Create a cinematic, layered 3D hero scene that showcases a Falcon 9 rocket (center) with a floating colored astronaut, flanked by "Launch Control" (left) and "Labs" (right) text, with depth created via foreground particles, atmospheric fog, and parallax motion.

### Concrete Deliverables
- `/public/models/falcon-9.glb` — Validated Falcon 9 model in project
- `/public/models/floating-astronaut.glb` — Validated animated astronaut in project
- Updated `src/components/3d/InteractiveRoom.tsx` — New model loading + positioning
- Updated `src/components/3d/ControlRoomScene.tsx` — New lighting, fog, post-processing
- Updated `src/components/3d/ScrollCamera.tsx` — Frontal camera with drift + parallax
- New text overlay in scene (HTML via drei `<Html>` or CSS positioned div)
- Foreground particle layer (InstancedMesh)

### Definition of Done
- [ ] Falcon 9 visible center-frame at localhost:3005
- [ ] Animated astronaut floating with visible color details
- [ ] "Launch Control" text readable on left, "Labs" readable on right
- [ ] Depth layers visible: particles in front → subjects → fog/stars behind
- [ ] Mouse movement triggers parallax shift
- [ ] Astronaut animation loops smoothly
- [ ] `npm run build` passes clean
- [ ] 30fps sustained on M1 MacBook Chrome

### Must Have
- Falcon 9 model loaded from `/public/models/falcon-9.glb`
- Animated floating astronaut from `/public/models/floating-astronaut.glb`
- "Launch Control" text LEFT, "Labs" text RIGHT
- Atmospheric fog (exponential, dark navy)
- At least 3 visible depth layers
- Mouse parallax interaction
- Ambient drift animation on astronaut

### Must NOT Have (Guardrails)
- Do NOT add more than 1 post-processing effect (bloom only)
- Do NOT introduce new npm dependencies (use existing R3F/drei/Three.js)
- Do NOT create a particle physics system (use static InstancedMesh)
- Do NOT add volumetric lighting or caustics
- Do NOT create 3D geometry text (use HTML overlay)
- Do NOT modify any page sections below the hero
- Do NOT remove the existing mobile fallback (StaticHeroFallback stays)
- Do NOT refactor the overall page layout (page.tsx stays as-is)
- Do NOT spend more than 1 task on "polish" — no endless refinement loops
- Do NOT exceed 200 foreground particles or 500 background star instances

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: N/A (visual project)
- **Automated tests**: None — visual verification via Playwright screenshots
- **Framework**: N/A

### QA Policy
Every task includes agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-{N}-*.png`.

- **Visual verification**: Playwright opens localhost:3005, takes screenshots at key viewports
- **Performance**: Lighthouse CLI in headless Chrome
- **Build**: `npm run build` must pass
- **Animation**: Playwright records brief video or takes timed screenshots

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — 3 parallel tasks):
├── Task 1: Copy + validate Falcon 9 model [quick]
├── Task 2: Copy + validate animated astronaut model [quick]
└── Task 3: Update scene scaffolding (lighting, fog, background) [quick]

Wave 2 (Core Composition — 3 parallel tasks):
├── Task 4: Replace models in InteractiveRoom.tsx + position for layered composition [unspecified-high]
├── Task 5: Simplify ScrollCamera.tsx for frontal view + drift [quick]
└── Task 6: Add "Launch Control" / "Labs" text overlay [quick]

Wave 3 (Animation + Depth — 3 parallel tasks):
├── Task 7: Mouse parallax interaction [quick]
├── Task 8: Foreground particle layer (InstancedMesh) [unspecified-high]
└── Task 9: Post-processing bloom effect [quick]

Wave FINAL (Verification — 2 parallel reviews):
├── Task F1: Visual composition verification + performance check [unspecified-high]
└── Task F2: Build verification + scope fidelity check [quick]
→ Present results → Get explicit user okay
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 4 | 1 |
| 2 | — | 4 | 1 |
| 3 | — | 4, 5, 7, 8, 9 | 1 |
| 4 | 1, 2, 3 | 6, 7, 8, 9 | 2 |
| 5 | 3 | 7 | 2 |
| 6 | 4 | — | 2 |
| 7 | 4, 5 | — | 3 |
| 8 | 4 | — | 3 |
| 9 | 3 | — | 3 |
| F1 | ALL | — | FINAL |
| F2 | ALL | — | FINAL |

### Agent Dispatch Summary

- **Wave 1**: 3 tasks — T1 `quick`, T2 `quick`, T3 `quick`
- **Wave 2**: 3 tasks — T4 `unspecified-high`, T5 `quick`, T6 `quick`
- **Wave 3**: 3 tasks — T7 `quick`, T8 `unspecified-high`, T9 `quick`
- **FINAL**: 2 tasks — F1 `unspecified-high`, F2 `quick`

---

## TODOs

- [x] 1. Copy + Validate Falcon 9 Model

  **What to do**:
  - Copy `/Users/chikochingaya/Downloads/falcon_9__launching_pad.glb` to `/public/models/falcon-9.glb`
  - Inspect with `npx gltfjsx public/models/falcon-9.glb --types` to generate type info and verify structure
  - Check polycount and material count from gltfjsx output
  - Verify model loads without errors by checking for valid scene graph
  - If polycount > 100K faces, note for future optimization (but do NOT optimize in this task)

  **Must NOT do**:
  - Do NOT modify the model file
  - Do NOT run mesh optimization (separate concern)
  - Do NOT install new tools globally

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: Simple file copy + CLI validation, <5 min task

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Task 4
  - **Blocked By**: None

  **References**:
  - `src/components/3d/InteractiveRoom.tsx:10` — See how ROCKET_PATH is defined (follow same pattern)
  - `public/models/` — Target directory for model files
  - Source: `/Users/chikochingaya/Downloads/falcon_9__launching_pad.glb` (33MB)

  **QA Scenarios**:
  ```
  Scenario: Model file exists and is valid GLB
    Tool: Bash
    Steps:
      1. ls -la public/models/falcon-9.glb — verify file exists and size ~33MB
      2. npx gltfjsx public/models/falcon-9.glb --types 2>&1 | head -50 — verify no parse errors
      3. Check output contains "useGLTF" and mesh/node definitions
    Expected Result: File exists, gltfjsx parses without error, outputs valid component structure
    Evidence: .sisyphus/evidence/task-1-model-validation.txt
  ```

  **Commit**: YES (groups with Task 2)
  - Message: `feat(3d): add falcon-9 and floating-astronaut models`
  - Files: `public/models/falcon-9.glb`

- [x] 2. Copy + Validate Animated Astronaut Model

  **What to do**:
  - Copy `/Users/chikochingaya/Downloads/animated_floating_astronaut_in_space_suit_loop.glb` to `/public/models/floating-astronaut.glb`
  - Inspect with `npx gltfjsx public/models/floating-astronaut.glb --types` to verify structure
  - Confirm animation data exists (look for `animations` array in gltfjsx output)
  - Verify skeleton nodes present (should see bone/joint names)
  - Note: this replaces the current `/public/models/astronaut.glb` (keep old file, don't delete)

  **Must NOT do**:
  - Do NOT delete the existing astronaut.glb
  - Do NOT modify the model file
  - Do NOT rename existing files

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: Simple file copy + CLI validation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Task 4
  - **Blocked By**: None

  **References**:
  - `src/components/3d/InteractiveRoom.tsx:11` — See how ASTRONAUT_PATH is defined
  - `public/models/` — Target directory
  - Source: `/Users/chikochingaya/Downloads/animated_floating_astronaut_in_space_suit_loop.glb` (19MB)

  **QA Scenarios**:
  ```
  Scenario: Astronaut model valid with animations
    Tool: Bash
    Steps:
      1. ls -la public/models/floating-astronaut.glb — verify exists and size ~19MB
      2. npx gltfjsx public/models/floating-astronaut.glb --types 2>&1 | head -80
      3. Verify output mentions "useAnimations" or "animations" (confirms animation data present)
      4. Verify output mentions bone/joint nodes (skeleton present)
    Expected Result: File exists, has animation data, has skeleton
    Evidence: .sisyphus/evidence/task-2-astronaut-validation.txt
  ```

  **Commit**: YES (groups with Task 1)
  - Message: `feat(3d): add falcon-9 and floating-astronaut models`
  - Files: `public/models/floating-astronaut.glb`

- [x] 3. Update Scene Scaffolding — Lighting, Fog, Background

  **What to do**:
  - Edit `src/components/3d/ControlRoomScene.tsx`:
    - Change background color to deep navy `#020914`
    - Replace fog with exponential fog: `<fogExp2 attach="fog" args={['#0a0e27', 0.008]} />`
    - Update lighting to cinematic 3-light setup:
      - Key light: `<directionalLight position={[80, 40, 60]} intensity={2.5} color="#ffffff" />`
      - Fill light: `<hemisphereLight skyColor="#1a1a3e" groundColor="#020914" intensity={0.4} />`
      - Rim light: `<pointLight position={[-40, 20, 40]} intensity={1.2} color="#22d3ee" distance={100} />`
    - Remove existing sunset environment preset (if using drei Environment)
    - Keep Canvas props: `gl={{ antialias: true }}`, keep SRGB colorspace
  - This sets the stage for all subsequent composition work

  **Must NOT do**:
  - Do NOT modify InteractiveRoom.tsx content (that's Task 4)
  - Do NOT add post-processing yet (that's Task 9)
  - Do NOT change the Canvas size/wrapper logic

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: Single file edit with clear values to set

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Tasks 4, 5, 7, 8, 9
  - **Blocked By**: None

  **References**:
  - `src/components/3d/ControlRoomScene.tsx` — Main scene file to edit (read FULL file first)
  - Cinematographic lighting research: Key (sun) + Fill (hemisphere/ambient) + Rim (accent color)
  - Color values: Background `#020914`, fog `#0a0e27`, rim accent `#22d3ee` (cyan)

  **QA Scenarios**:
  ```
  Scenario: Scene renders with updated lighting (not black, not blown out)
    Tool: Bash
    Steps:
      1. npm run build — verify no TypeScript errors in ControlRoomScene.tsx
      2. grep -n "fogExp2\|directionalLight\|hemisphereLight\|pointLight" src/components/3d/ControlRoomScene.tsx
      3. Verify: 3 lights present, fogExp2 present, background color set
    Expected Result: Build passes, all 3 lights + fog present in file
    Evidence: .sisyphus/evidence/task-3-scene-scaffold.txt

  Scenario: No regression — file still exports valid component
    Tool: Bash
    Steps:
      1. grep "export default\|export function" src/components/3d/ControlRoomScene.tsx
      2. Verify component still exports correctly (not broken)
    Expected Result: Valid export statement present
    Evidence: .sisyphus/evidence/task-3-export-check.txt
  ```

  **Commit**: NO (groups with Wave 2 commit)

- [x] 4. Replace Models + Position for Layered Composition

  **What to do**:
  - Rewrite `src/components/3d/InteractiveRoom.tsx` to load new models:
    - Change `ROCKET_PATH` to `/models/falcon-9.glb`
    - Change `ASTRONAUT_PATH` to `/models/floating-astronaut.glb`
  - Position models for cinematic layered composition:
    - Falcon 9: Center frame, `position={[0, -8, -20]}`, `scale={[0.5, 0.5, 0.5]}` (adjust as needed for framing)
    - Astronaut: Slightly right and forward, `position={[6, 2, -5]}`, `scale={[3, 3, 3]}` (artistic scale — astronaut ~1/5 rocket visual height)
    - Astronaut rotated to face camera at 3/4 angle: `rotation={[0, -0.3, 0.1]}`
  - Keep `useGLTF` loading pattern (already correct)
  - Keep `useAnimations` for astronaut (play first animation)
  - Remove astronaut Y-axis continuous rotation (old behavior) — replace with subtle idle drift
  - Set astronaut material `envMapIntensity={2.0}` to make colors pop under rim light
  - Set Falcon 9 material `envMapIntensity={1.2}` for metallic sheen

  **Must NOT do**:
  - Do NOT add animation logic beyond basic model loading and positioning
  - Do NOT add parallax logic (that's Task 7)
  - Do NOT add particles (that's Task 8)
  - Do NOT touch ControlRoomScene.tsx (already done in Task 3)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - Reason: Core composition work requiring visual judgment + multiple model positioning

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6)
  - **Blocks**: Tasks 6, 7, 8
  - **Blocked By**: Tasks 1, 2, 3

  **References**:
  - `src/components/3d/InteractiveRoom.tsx` — File to rewrite (READ FULL FILE FIRST)
  - `src/components/3d/InteractiveRoom.tsx:10-11` — Current path pattern to follow
  - `src/components/3d/InteractiveRoom.tsx:31-58` — Current Astronaut component with useAnimations pattern
  - Cinematographic layering: Midground subjects at z=-5 to z=-20, foreground at z=5+, background at z=-50+
  - Artistic scale: Astronaut should be ~1/5 the visual height of Falcon 9 for dramatic scale contrast

  **QA Scenarios**:
  ```
  Scenario: Both models load without errors
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3005
      2. Wait 5 seconds for model loading
      3. Check browser console for errors (should be 0 GL errors)
      4. Take screenshot at 1440x900
    Expected Result: No WebGL errors, scene renders (not black), both models visible
    Failure Indicators: Console shows "Failed to load", "404", or "GL ERROR"
    Evidence: .sisyphus/evidence/task-4-models-loaded.png

  Scenario: Models positioned at correct depth layers
    Tool: Bash
    Steps:
      1. grep -n "position=" src/components/3d/InteractiveRoom.tsx
      2. Verify Falcon 9 z-position is more negative (further back) than astronaut
      3. Verify astronaut is offset (not dead center)
    Expected Result: Rocket z < astronaut z (depth layering correct), astronaut x > 0 (offset right)
    Evidence: .sisyphus/evidence/task-4-positions.txt
  ```

  **Commit**: YES
  - Message: `feat(3d): cinematic scene composition with layered depth`
  - Files: `src/components/3d/InteractiveRoom.tsx`
  - Pre-commit: `npm run build`

- [x] 5. Simplify ScrollCamera for Frontal View + Drift

  **What to do**:
  - Edit `src/components/3d/ScrollCamera.tsx`:
    - Replace the 4-point Catmull-Rom orbital path with a simpler frontal camera
    - New camera behavior: starts at `[0, 3, 30]` facing center, subtle Z-drift on scroll (moves from z=30 to z=20 — pulling in closer)
    - Keep mouse parallax foundation (X/Y rotation on mouse move) but reduce intensity: X=±0.005, Y=±0.003
    - Keep interaction-enabled threshold at 90% scroll
    - Remove lookAt targeting that was specific to Saturn V position
    - Camera should always face approximately `[0, 0, -10]` (center of composition)
  - Simpler is better — the composition should work from a relatively static viewpoint

  **Must NOT do**:
  - Do NOT remove the scroll listener entirely (keep scroll-driven Z movement)
  - Do NOT add complex orbital paths
  - Do NOT modify the container/canvas wrapper

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: Simplification of existing file — removing complexity

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 6)
  - **Blocks**: Task 7
  - **Blocked By**: Task 3

  **References**:
  - `src/components/3d/ScrollCamera.tsx` — File to simplify (READ FULL FILE FIRST)
  - Current: Catmull-Rom curve with 4 keyframes + 150% scroll distance
  - Target: Simple linear Z interpolation (30 → 20) on scroll + mouse rotation

  **QA Scenarios**:
  ```
  Scenario: Camera moves on scroll without jerking
    Tool: Bash
    Steps:
      1. npm run build — passes without error
      2. grep -n "position\|lookAt\|scroll" src/components/3d/ScrollCamera.tsx
      3. Verify: no CatmullRomCurve3 references remain, simple lerp/interpolation present
    Expected Result: Build passes, camera logic simplified, no Catmull-Rom
    Evidence: .sisyphus/evidence/task-5-camera-simplified.txt
  ```

  **Commit**: NO (groups with Task 4 commit)

- [x] 6. Add "Launch Control" / "Labs" Text Overlay

  **What to do**:
  - Add text as an HTML overlay positioned over the Canvas:
    - Option A (preferred): CSS-positioned divs outside Canvas with `pointer-events: none` and `position: absolute`
    - Option B: drei `<Html>` component inside Canvas (if parallax integration needed)
  - Text placement:
    - "LAUNCH CONTROL" — left side, vertically centered, uppercase, monospace font
    - "LABS" — right side, vertically centered, uppercase, monospace font
  - Styling:
    - Font: `var(--font-mono)` (match existing site)
    - Color: `rgba(255, 255, 255, 0.85)` with `text-shadow: 0 0 20px rgba(34, 211, 238, 0.3)` for subtle glow
    - Size: `clamp(1.5rem, 3vw, 2.5rem)` for responsive
    - Letter-spacing: `0.15em`
  - Add to `SceneWrapper.tsx` or create a new `HeroText.tsx` component rendered alongside the Canvas in `page.tsx`
  - Text must NOT interfere with 3D scene interaction (pointer-events: none on overlay)

  **Must NOT do**:
  - Do NOT use 3D geometry text (no TextGeometry/troika-three-text)
  - Do NOT add animation to text in this task
  - Do NOT modify page.tsx layout structure

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: CSS positioning + simple HTML — straightforward

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5)
  - **Blocks**: None
  - **Blocked By**: Task 4 (need to see composition to position text)

  **References**:
  - `src/components/3d/SceneWrapper.tsx` — Container component where overlay could go
  - `src/app/page.tsx:34-41` — Where Canvas is rendered in the page
  - `src/components/Hero.tsx` — Current text component (uses `var(--font-mono)`)
  - Site uses CSS variables: `--font-mono`, `--text`, `--amber`

  **QA Scenarios**:
  ```
  Scenario: Both text elements visible and readable
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3005
      2. Wait 3 seconds
      3. Query selector for text containing "LAUNCH CONTROL" — assert visible
      4. Query selector for text containing "LABS" — assert visible
      5. Verify left text x-position < viewport center
      6. Verify right text x-position > viewport center
      7. Screenshot
    Expected Result: Both texts visible, correctly positioned left/right of center
    Failure Indicators: Text missing, overlapping center, or completely occluded
    Evidence: .sisyphus/evidence/task-6-text-overlay.png

  Scenario: Text doesn't block 3D interaction
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3005
      2. Check computed style of text overlay: pointer-events should be "none"
    Expected Result: pointer-events: none on overlay container
    Evidence: .sisyphus/evidence/task-6-pointer-events.txt
  ```

  **Commit**: YES
  - Message: `feat(3d): add Launch Control / Labs text overlay`
  - Files: New text component + SceneWrapper.tsx (or page.tsx)

- [x] 7. Mouse Parallax Interaction

  **What to do**:
  - In `ScrollCamera.tsx` or a new `useParallax` hook:
    - Track mouse position normalized to [-1, 1] range
    - Apply parallax to camera rotation (small values: X ±0.008, Y ±0.004 radians)
    - Use `useFrame` with lerp for smooth damped movement (damping factor 0.05)
  - Additionally, apply depth-based parallax to layers:
    - Foreground particles: move OPPOSITE to mouse at 1.5x intensity
    - Subjects (rocket/astronaut): stay relatively fixed (camera moves around them)
    - Background: moves WITH mouse at 0.3x (subtle)
  - Use `pointer` event on Canvas or window `mousemove`
  - Respect `prefers-reduced-motion`: disable parallax if user has motion preference

  **Must NOT do**:
  - Do NOT add spring physics libraries
  - Do NOT make parallax intensity configurable at runtime
  - Do NOT apply parallax to text overlay (text stays fixed)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: Simple useFrame + mouse tracking — well-known R3F pattern

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 8, 9)
  - **Blocks**: None
  - **Blocked By**: Tasks 4, 5

  **References**:
  - `src/components/3d/ScrollCamera.tsx` — Already has mouse parallax (X: ±0.008, Y: ±0.004) — EXTEND this
  - R3F `useFrame` pattern for per-frame updates
  - `window.matchMedia('(prefers-reduced-motion: reduce)')` for accessibility

  **QA Scenarios**:
  ```
  Scenario: Mouse movement causes visible scene shift
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3005
      2. Take screenshot at mouse position (0, 0) — top-left
      3. Move mouse to (window.innerWidth, window.innerHeight/2) — right side
      4. Wait 500ms for lerp to settle
      5. Take second screenshot
      6. Compare: scene should have shifted visibly between the two shots
    Expected Result: Pixel difference between screenshots > 0 (scene moved)
    Failure Indicators: Identical screenshots = parallax not working
    Evidence: .sisyphus/evidence/task-7-parallax-left.png, task-7-parallax-right.png
  ```

  **Commit**: NO (groups with Wave 3 commit)

- [x] 8. Foreground Particle Layer (InstancedMesh)

  **What to do**:
  - Create a `Particles.tsx` component in `src/components/3d/`:
    - Use `THREE.InstancedMesh` with small geometry (IcosahedronGeometry, radius 0.02-0.08 randomly)
    - 150 instances (capped, do NOT exceed 200)
    - Position randomly in a volume: x=[-20, 20], y=[-10, 10], z=[5, 15] (FOREGROUND — between camera z=30 and subjects z=-5)
    - Material: `MeshBasicMaterial` with `color="#ffffff"` and `opacity: 0.3-0.6` (random per instance)
    - Subtle drift: in `useFrame`, rotate each instance slowly (different speeds) and drift Y ±0.001 per frame
    - These should appear as small floating debris/dust catching rim light
  - Import and render `<Particles />` inside the InteractiveRoom group (or alongside it in ControlRoomScene)

  **Must NOT do**:
  - Do NOT use a particle physics system (no cannon.js, no rapier)
  - Do NOT exceed 200 instances
  - Do NOT make particles interactive (no click/hover)
  - Do NOT use THREE.Points (too flat looking — use InstancedMesh for 3D depth)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - Reason: InstancedMesh setup requires matrix transforms + randomization logic

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 7, 9)
  - **Blocks**: None
  - **Blocked By**: Task 4

  **References**:
  - THREE.InstancedMesh API: set matrix per instance with `dummy.position.set()` + `dummy.updateMatrix()` + `instancedMesh.setMatrixAt(i, dummy.matrix)`
  - Foreground layer z-range: 5 to 15 (between camera at z=30 and subjects at z=-5 to -20)
  - Keep material simple (MeshBasicMaterial) — no PBR needed for tiny particles

  **QA Scenarios**:
  ```
  Scenario: Particles visible in foreground layer
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3005
      2. Wait 3 seconds for scene load
      3. Take screenshot
      4. Verify: small bright dots/shapes visible in front of the rocket (visual check via pixel sampling)
    Expected Result: Particles visible, creating depth between camera and subjects
    Evidence: .sisyphus/evidence/task-8-particles.png

  Scenario: Performance not degraded by particles
    Tool: Bash
    Steps:
      1. grep -c "InstancedMesh\|instancedMesh" src/components/3d/Particles.tsx
      2. grep "count\|COUNT\|instances" src/components/3d/Particles.tsx — verify ≤200
    Expected Result: Uses InstancedMesh (not individual meshes), count ≤ 200
    Evidence: .sisyphus/evidence/task-8-particle-count.txt
  ```

  **Commit**: YES
  - Message: `feat(3d): add parallax, particles, and bloom`
  - Files: `src/components/3d/Particles.tsx`, camera updates
  - Pre-commit: `npm run build`

- [x] 9. Post-Processing Bloom Effect

  **What to do**:
  - Add bloom post-processing to `ControlRoomScene.tsx`:
    - Import from `@react-three/postprocessing`: `EffectComposer`, `Bloom`
    - Add inside Canvas (after scene content):
      ```jsx
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          intensity={0.4}
          mipmapBlur
        />
      </EffectComposer>
      ```
    - This makes bright elements (rim light reflections, astronaut highlights) glow cinematically
  - If `@react-three/postprocessing` is not already installed, add it: `npm install @react-three/postprocessing`
  - Keep it subtle — intensity 0.4 max, high threshold (only bright areas bloom)

  **Must NOT do**:
  - Do NOT add more than bloom (no DOF, no film grain, no chromatic aberration)
  - Do NOT set intensity above 0.5 (too much glow = amateur look)
  - Do NOT add Vignette or ColorAverage or any other effects

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: Single import + 5 lines of JSX — well-documented pattern

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 7, 8)
  - **Blocks**: None
  - **Blocked By**: Task 3

  **References**:
  - `@react-three/postprocessing` docs: https://docs.pmnd.rs/react-postprocessing
  - `src/components/3d/ControlRoomScene.tsx` — Add EffectComposer inside Canvas
  - Check `package.json` — may already have `@react-three/postprocessing` installed

  **QA Scenarios**:
  ```
  Scenario: Bloom renders without crashing
    Tool: Bash
    Steps:
      1. npm run build — no errors
      2. grep "EffectComposer\|Bloom" src/components/3d/ControlRoomScene.tsx
      3. Verify both imports and JSX usage present
    Expected Result: Build passes, bloom components in file
    Evidence: .sisyphus/evidence/task-9-bloom.txt

  Scenario: Bloom effect not overpowering
    Tool: Bash
    Steps:
      1. grep "intensity" src/components/3d/ControlRoomScene.tsx
      2. Verify intensity value is ≤ 0.5
      3. grep "luminanceThreshold" — verify ≥ 0.5 (only bright areas bloom)
    Expected Result: intensity ≤ 0.5 AND threshold ≥ 0.5
    Evidence: .sisyphus/evidence/task-9-bloom-params.txt
  ```

  **Commit**: NO (groups with Task 8 commit)

---

## Final Verification Wave

- [ ] F1. **Visual Composition + Performance Verification** — `unspecified-high`

  **What to do**:
  - Start dev server (`npm run dev`)
  - Open localhost:3005 in Playwright
  - Take screenshots at 1440px, 1280px, and 768px widths
  - Verify: Falcon 9 centered, astronaut visible, text readable both sides
  - Verify: depth layers visible (particles in front of subjects)
  - Run Lighthouse performance audit (headless)
  - Check: FPS ≥ 30 via Performance panel recording (5 second sample)
  - Verify astronaut animation is playing (take 2 screenshots 1s apart, compare)

  **Acceptance Criteria**:
  - [ ] Screenshots show all 3 layers of depth visible
  - [ ] Text readable on both sides (not obscured by models)
  - [ ] Lighthouse performance score ≥ 50 on desktop
  - [ ] No console errors in Chrome DevTools
  - [ ] Astronaut visibly different between frames (animation playing)

  **Evidence**: `.sisyphus/evidence/final-composition-1440.png`, `final-composition-1280.png`, `final-lighthouse.json`

- [ ] F2. **Build + Scope Verification** — `quick`

  **What to do**:
  - Run `npm run build` — must pass with exit code 0
  - Verify no TypeScript errors
  - Check git diff — only files in `src/components/3d/`, `public/models/`, and the text overlay touched
  - Verify `StaticHeroFallback` still renders on mobile (not removed)
  - Verify no files outside scope were modified

  **Acceptance Criteria**:
  - [ ] `npm run build` exit code 0
  - [ ] Only expected files modified (no scope creep)
  - [ ] Mobile fallback still in page.tsx

  **Evidence**: `.sisyphus/evidence/final-build-output.txt`

---

## Commit Strategy

- **Wave 1**: `feat(3d): add falcon-9 and floating-astronaut models` — public/models/*.glb
- **Wave 2**: `feat(3d): cinematic scene composition with layered depth` — InteractiveRoom.tsx, ControlRoomScene.tsx, ScrollCamera.tsx, text overlay
- **Wave 3**: `feat(3d): add parallax, particles, and bloom` — animation + post-processing files
- **Final**: No commit (verification only)

---

## Success Criteria

### Verification Commands
```bash
npm run build          # Expected: exit 0, no errors
npm run dev            # Expected: localhost:3005 loads with 3D scene
```

### Final Checklist
- [ ] Falcon 9 visible as centerpiece
- [ ] Animated astronaut with color floating in scene
- [ ] "Launch Control" LEFT + "Labs" RIGHT text visible and readable
- [ ] 3+ depth layers (foreground particles → subjects → background fog)
- [ ] Mouse parallax responsive
- [ ] Ambient animation playing
- [ ] Build passes clean
- [ ] 30fps on M1 MacBook
- [ ] Mobile shows StaticHeroFallback (unchanged)
