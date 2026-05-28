# Fix LCL Visual Defects: Shuttle Orientation + Header + Cohesion

## TL;DR

> **Quick Summary**: Fix three critical visual defects: shuttle model rendered upside down (nose pointing down), header text cropping at viewport bottom with zero breathing room, and poor depth separation between 3D scene and text overlay.
> 
> **Deliverables**:
> - Shuttle model rendered nose-UP (correct launch orientation)
> - Header text properly padded with no clipping
> - Improved text/3D depth separation at Beat 1
> - Section nav dots properly styled
> 
> **Estimated Effort**: Quick
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 (shuttle rotation) → Task 4 (verify)

---

## Context

### Original Request
"the header looks terrible, the shuttle is upside down, how are you missing that?"

### Screenshot Evidence (Beat 1 at scroll 0%)
- Shuttle nose points DOWN — completely inverted from launch orientation
- "LAUNCH CONTROL LABS" hero text crops at bottom viewport edge
- Text overlaps with shuttle model — poor depth separation
- "LABS" offset right creates unbalanced composition
- Section nav dots on right look like artifacts

### Root Cause Analysis (FIP v3.3 — Level 3 Structure)

| Defect | Structural Cause | File | Line |
|--------|-----------------|------|------|
| Shuttle upside down | `rotation: [0, Math.PI, 0]` — rotates 180° around Y but model's native orientation has nose in -Z, so rotating Y flips it visually inverted | `src/config/scene-positions.ts` | 17 |
| Header cropping | `paddingBottom: 'clamp(0.5rem, 1.5vh, 1.2rem)'` — only ~12px at bottom, 13.5vw text needs 3-5vh minimum | `src/components/journey/BeatPreLaunch.tsx` | 26 |
| Poor depth separation | No text shadow/backdrop, shuttle position [0, 4, 5] overlaps with text at screen bottom | `BeatPreLaunch.tsx` + `scene-positions.ts` | — |
| LABS misalignment | flexbox `justifyContent: 'space-between'` puts LABS at far right, feels disconnected from "LAUNCH CONTROL" | `BeatPreLaunch.tsx` | 77-113 |

---

## Work Objectives

### Core Objective
Fix the three most visible visual defects in Beat 1 (hero section) that make the site look broken on first impression.

### Concrete Deliverables
- Shuttle model: nose pointing UP in correct launch/ascent orientation
- Header: properly padded, no clipping, balanced layout
- Clear visual hierarchy between 3D background and text foreground

### Definition of Done
- [ ] Shuttle nose points UP when viewed at scroll 0%
- [ ] No text clips at any viewport edge (down to 900px height)
- [ ] Hero text is readable without squinting against the 3D background

### Must Have
- Shuttle nose UP (launch orientation)
- Minimum 3vh padding from viewport bottom
- Text readable against any 3D background state

### Must NOT Have (Guardrails)
- No new npm dependencies
- No changes to other beats (2-6)
- No changes to camera path waypoints
- No changes to scroll behavior
- No custom shaders

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: YES (Playwright available)
- **Automated tests**: None needed (visual verification only)
- **Framework**: Playwright screenshots

### QA Policy
Every task verified via Playwright screenshot at scroll 0% with visual assertion.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.png`.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — independent fixes):
├── Task 1: Fix shuttle rotation [quick]
├── Task 2: Fix header padding + text layout [quick]
└── Task 3: Improve text/3D depth separation [quick]

Wave 2 (After Wave 1 — verification):
└── Task 4: Visual verification via Playwright [quick]

Critical Path: Task 1 → Task 4
Parallel Speedup: Tasks 1-3 all independent (different files)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | None | 4 |
| 2 | None | 4 |
| 3 | None | 4 |
| 4 | 1, 2, 3 | — |

### Agent Dispatch Summary

- **Wave 1**: 3 tasks → all `quick` category
- **Wave 2**: 1 task → `quick` + `playwright` skill

---

## TODOs

- [x] 1. Fix Shuttle Model Orientation (Nose UP)

  **What to do**:
  - STEP 1 — DISCOVERY: Temporarily set shuttle rotation to `[0, 0, 0]` in `src/config/scene-positions.ts`. Take a Playwright screenshot. This reveals the model's NATIVE orientation (where nose points without any rotation applied).
  - STEP 2 — CALCULATE: Based on native orientation, apply the correct rotation:
    - If nose points +Z (toward camera): use `[-Math.PI / 2, 0, 0]` (tip nose up)
    - If nose points -Z (away from camera): use `[Math.PI / 2, 0, 0]` (tip nose up)
    - If nose points +Y (already up): use `[0, 0, 0]` (no rotation needed)
    - If nose points -Y (straight down): use `[Math.PI, 0, 0]` (flip 180° on X)
  - STEP 3 — VERIFY: Screenshot at scroll 0%. Shuttle cockpit/nose must point UPWARD.
  - MAX 3 ATTEMPTS. If 3 rotations fail, inspect model in Three.js editor and report.
  - The correct final state: shuttle in launch orientation, nose/cockpit pointing UP

  **Must NOT do**:
  - Don't change shuttle position or scale
  - Don't modify other model transforms
  - Don't change camera path

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Task 4
  - **Blocked By**: None

  **References**:
  - `src/config/scene-positions.ts:15-19` — Current shuttle transform (rotation: [0, Math.PI, 0] is the bug)
  - `src/components/journey/JourneyScene.tsx:15-21` — ShuttleModel component that consumes the transform
  - `src/config/camera-path.ts` — Beat 1 camera at [0, 2, 25] looking at [0, 8, 0] — shuttle must be visible and upright from this angle
  - Three.js Euler: rotation is [x, y, z] in radians. Math.PI = 180°. Positive X rotation tips forward.

  **Acceptance Criteria**:
  - [ ] Shuttle nose points UP (toward top of viewport) when viewed at scroll 0%
  - [ ] Shuttle is visible and recognizable as a space shuttle (not a blob)

  **QA Scenarios**:
  ```
  Scenario: Shuttle orientation at Beat 1
    Tool: Playwright
    Preconditions: Dev server running at localhost:3005
    Steps:
      1. Navigate to http://localhost:3005
      2. Wait for canvas to render (wait 2s for GLTF load)
      3. Screenshot full viewport
      4. Visually confirm shuttle nose points UP (top of screen)
    Expected Result: Shuttle rendered with nose pointing up, body vertical, in launch orientation
    Failure Indicators: Nose pointing down, left, right, or model not visible
    Evidence: .sisyphus/evidence/task-1-shuttle-orientation.png
  ```

  **Commit**: YES
  - Message: `fix(3d): correct shuttle rotation to nose-up launch orientation`
  - Files: `src/config/scene-positions.ts`

---

- [x] 2. Fix Header Padding and Text Layout

  **What to do**:
  - Open `src/components/journey/BeatPreLaunch.tsx`
  - Fix the bottom padding: change `paddingBottom: 'clamp(0.5rem, 1.5vh, 1.2rem)'` to `paddingBottom: 'clamp(2.5rem, 5vh, 4rem)'` — minimum 40px clearance from viewport bottom
  - Add horizontal padding: change `padding: 0` to `padding: '0 clamp(1.5rem, 3vw, 3rem)'` — stops text from hitting viewport edges
  - Fix "LABS" alignment: Change the bottom row `justifyContent: 'space-between'` to `justifyContent: 'flex-end'` so "LABS" right-aligns as a visual unit with "LAUNCH CONTROL" above
  - Verify at THREE viewport sizes: 1440×900, 1920×1080, 375×812 (mobile)
  - Programmatic check: `element.getBoundingClientRect().bottom < window.innerHeight - 40` for all text elements

  **Must NOT do**:
  - Don't change the actual text content
  - Don't change font sizes (13.5vw is intentional)
  - Don't change font families
  - Don't change colors

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Task 4
  - **Blocked By**: None

  **References**:
  - `src/components/journey/BeatPreLaunch.tsx:26` — Container div with `padding: 0, paddingBottom: 'clamp(0.5rem, 1.5vh, 1.2rem)'` — the cause of clipping
  - `src/components/journey/BeatPreLaunch.tsx:76-114` — The LABS/tagline row with `justifyContent: 'space-between'` — causes disconnected layout
  - `src/components/journey/BeatPreLaunch.tsx:60-74` — The "LAUNCH CONTROL" h1 (13.5vw)

  **Acceptance Criteria**:
  - [ ] No text clips at viewport bottom on 1440×900 viewport
  - [ ] "LAUNCH CONTROL LABS" reads as a cohesive unit (not split apart)
  - [ ] Minimum 3vh visible space between text bottom and viewport edge
  - [ ] Horizontal padding visible on both sides (text not touching edges)

  **QA Scenarios**:
  ```
  Scenario: Header text fully visible and balanced
    Tool: Playwright
    Preconditions: Dev server running at localhost:3005
    Steps:
      1. Navigate to http://localhost:3005
      2. Set viewport to 1440x900
      3. Wait for content render
      4. Screenshot full viewport
      5. Assert: all text of "LAUNCH CONTROL LABS" fully visible (no clipping)
      6. Assert: visible padding between text bottom and viewport bottom edge
      7. Assert: visible horizontal padding on both sides
    Expected Result: Hero text fully visible with comfortable breathing room on all sides
    Failure Indicators: Any letter partially hidden, text touching viewport edge
    Evidence: .sisyphus/evidence/task-2-header-padding.png

  Scenario: Header at small viewport height
    Tool: Playwright
    Preconditions: Dev server running at localhost:3005
    Steps:
      1. Navigate to http://localhost:3005
      2. Set viewport to 1440x800 (short viewport)
      3. Screenshot full viewport
      4. Assert: text still fully visible (padding may be smaller but no clipping)
    Expected Result: Text visible without clipping even at shorter viewport
    Failure Indicators: Text clips at bottom
    Evidence: .sisyphus/evidence/task-2-header-short-viewport.png
  ```

  **Commit**: YES
  - Message: `fix(ui): add proper padding to hero text, prevent clipping`
  - Files: `src/components/journey/BeatPreLaunch.tsx`

---

- [x] 3. Improve Text/3D Depth Separation

  **What to do**:
  - The hero text at Beat 1 competes visually with the shuttle model behind it
  - Add a subtle bottom gradient to the Beat 1 overlay to separate text from 3D scene
  - In `BeatPreLaunch.tsx`, add a `background` gradient to the outer container div: `background: 'linear-gradient(to top, rgba(2, 9, 20, 0.65) 0%, rgba(2, 9, 20, 0.3) 35%, transparent 60%)'`
  - Color `rgb(2, 9, 20)` matches the scene background `#020914` exactly
  - Gradient covers bottom ~35% at full opacity, fades by 60% height
  - Additionally: add `textShadow: '0 2px 30px rgba(0,0,0,0.6)'` to the h1 and h2 for extra pop

  **Must NOT do**:
  - Don't make the gradient so dark it hides the 3D scene entirely
  - Don't change text colors
  - Don't add new elements (just CSS on existing divs)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Task 4
  - **Blocked By**: None

  **References**:
  - `src/components/journey/BeatPreLaunch.tsx:15-25` — The outer container div (currently no background)
  - `src/components/journey/BeatAscent.tsx` — Has `linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)` as reference pattern
  - `src/components/journey/BeatConstellation.tsx` — Has `linear-gradient(135deg, ...)` as reference pattern
  - `src/config/scene-positions.ts:15-19` — Shuttle at position [0, 4, 5] — near the bottom of viewport at Beat 1

  **Acceptance Criteria**:
  - [ ] Hero text clearly readable against any 3D background state
  - [ ] Subtle gradient visible at bottom but shuttle still partially visible through it
  - [ ] Gradient does NOT cover more than 50% of viewport height

  **QA Scenarios**:
  ```
  Scenario: Text readability with 3D background
    Tool: Playwright
    Preconditions: Dev server running at localhost:3005, shuttle model loaded
    Steps:
      1. Navigate to http://localhost:3005
      2. Wait for canvas + GLTF load (3s)
      3. Screenshot full viewport
      4. Verify: "LAUNCH CONTROL LABS" text is clearly legible
      5. Verify: Shuttle model still partially visible above/through the gradient
    Expected Result: Text pops clearly, 3D scene still visible but not competing
    Failure Indicators: Text hard to read, OR gradient so dark 3D is invisible
    Evidence: .sisyphus/evidence/task-3-depth-separation.png
  ```

  **Commit**: YES (groups with Task 2)
  - Message: `fix(ui): add depth gradient for text/3D separation at Beat 1`
  - Files: `src/components/journey/BeatPreLaunch.tsx`

---

- [x] 4. Visual Verification (All Fixes Combined)

  **What to do**:
  - After Tasks 1-3 complete, take comprehensive screenshots
  - Verify all three fixes work together harmoniously
  - Check that fixes don't break other beats (quick scroll-through)
  - Screenshot Beat 1 at multiple viewport sizes

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `["playwright"]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (after all Wave 1)
  - **Blocks**: None (final task)
  - **Blocked By**: Tasks 1, 2, 3

  **References**:
  - Previous QA evidence at `/Users/chikochingaya/beat1-prelaunch-RETAKE.png` — the "before" state
  - All 6 beat positions defined in `src/config/beat-config.ts`

  **Acceptance Criteria**:
  - [ ] Shuttle nose UP at Beat 1
  - [ ] Header text fully visible with padding on all sides
  - [ ] Text readable against 3D background
  - [ ] Beats 2-6 unchanged (no regression)

  **QA Scenarios**:
  ```
  Scenario: Full Beat 1 visual verification
    Tool: Playwright
    Preconditions: Dev server at localhost:3005, all fixes applied
    Steps:
      1. Navigate to http://localhost:3005
      2. Set viewport 1440x900
      3. Wait 3s for all assets to load
      4. Screenshot Beat 1 (scroll 0%)
      5. Assert: shuttle nose UP, text visible, gradient present
    Expected Result: Professional, cohesive hero section
    Evidence: .sisyphus/evidence/task-4-beat1-final.png

  Scenario: Regression check on other beats
    Tool: Playwright
    Steps:
      1. Scroll to 25% → screenshot Beat 2
      2. Scroll to 45% → screenshot Beat 3
      3. Scroll to 95% → screenshot Beat 6
    Expected Result: All other beats render same as before (no visual regression)
    Failure Indicators: Any beat looks different from previous verification
    Evidence: .sisyphus/evidence/task-4-regression-{beat}.png
  ```

  **Commit**: NO (verification only)

---

## Final Verification Wave

> After all tasks complete, present screenshots to user for explicit approval.

- [ ] F1. Present Beat 1 screenshot to user showing: shuttle orientation, header layout, depth separation
- [ ] F2. Present regression screenshots of Beats 2, 3, 6 confirming no changes

---

## Commit Strategy

| # | Message | Files |
|---|---------|-------|
| 1 | `fix(3d): correct shuttle rotation to nose-up launch orientation` | `src/config/scene-positions.ts` |
| 2 | `fix(ui): fix hero padding, text layout, and depth separation` | `src/components/journey/BeatPreLaunch.tsx` |

---

## Success Criteria

### Verification Commands
```bash
# Dev server running
curl -s -o /dev/null -w "%{http_code}" http://localhost:3005  # Expected: 200

# TypeScript compiles
cd /Users/chikochingaya/Projects/launchcontrollabs.com && npx tsc --noEmit  # Expected: 0 errors
```

### Final Checklist
- [ ] Shuttle nose points UP
- [ ] Header text fully visible with no clipping
- [ ] Text readable against 3D background
- [ ] No regression on other beats
- [ ] TypeScript compiles clean
