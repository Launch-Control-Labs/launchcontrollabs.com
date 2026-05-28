# Fix: Shuttle Thin Line Artifact (FIP v3.3 Level 5 Fix)

## TL;DR

> **Quick Summary**: The thin black line above the shuttle is a THREE.Line/LineSegments object (NOT a Mesh), so all `.isMesh`-based filters miss it entirely. Fix: remove ALL renderable non-Mesh objects from the shuttle scene + call `updateMatrixWorld()` before geometry checks.
> 
> **Deliverables**: 
> - Thin line permanently removed from shuttle model at all scroll positions
> - No regression to other shuttle visuals (SRB separation, exhaust, opacity fade)
> 
> **Estimated Effort**: Quick (single file, ~10 lines changed)
> **Parallel Execution**: NO - sequential (single task)
> **Critical Path**: Diagnose → Fix → Verify

---

## Context

### Original Request
User reports thin black line extending upward from shuttle nose, visible at Beat 2 (~20% scroll). Multiple fix attempts (4+) using name-based filters, geometry-size filters, and removeFromParent() have all failed.

### FIP v3.3 Root Cause Analysis

**Phase 0.C Recurrence Fingerprint**: Same visual artifact, 4+ fix attempts → SYSTEMIC.

**Two-Strike Escalation**: Level 12 fixes (parameter tweaks to name/geometry filters) exhausted. Escalating to Level 5 (Rules).

**Level 3 Structural Root Cause**:
The removal code at lines 45-61 of `JourneyScene.tsx` has two flaws:
1. **Geometry filter uses `child.isMesh`** — THREE.Line and THREE.LineSegments objects have geometry and render visibly, but `isMesh` is false for them. They are INVISIBLE to the current filter.
2. **No `updateMatrixWorld()` call** — `Box3.setFromObject()` needs world matrices computed. Without this call, meshes that haven't rendered yet return zero dimensions.

**Level 4 Mental Model Error**: 
"All visible 3D geometry in a scene is a Mesh" — **FALSE**. THREE.js renderables include: Mesh, Line, LineSegments, LineLoop, Points. The shuttle model's lightning rod/antenna is likely exported as a Line or LineSegments, not a Mesh.

### Research Findings
- THREE.js Line objects: `.isLine = true`, `.isMesh = false`
- THREE.js LineSegments: `.isLineSegments = true`, `.isMesh = false`  
- Both are renderable, both have `.geometry`, both appear as thin lines
- R3F's `<primitive>` renders ALL children regardless of type

---

## Work Objectives

### Core Objective
Permanently remove the thin line artifact from the shuttle model using a Level 5 structural fix that cannot be circumvented by parent visibility changes or type-checking gaps.

### Concrete Deliverables
- Modified traverse in `src/components/journey/JourneyScene.tsx` ShuttleModel useEffect

### Definition of Done
- [ ] No thin line visible at 0%, 20%, 50% scroll positions (verified via screenshot)
- [ ] SRB separation still works at 20-30% scroll
- [ ] Shuttle opacity fade still works at 75-90%
- [ ] TypeScript compiles clean

### Must Have
- Remove ALL Line/LineSegments/Points objects from shuttle scene
- Call `scene.updateMatrixWorld(true)` before any geometry size checks
- Keep existing name filter as defense-in-depth

### Must NOT Have (Guardrails)
- Do NOT remove Mesh objects needed for the shuttle (only remove non-Mesh renderables and named thin meshes)
- Do NOT modify the SpaceTether component (it's a separate component, not part of the shuttle model)
- Do NOT change the SRB separation logic or opacity fade logic

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: NO (no test framework)
- **Automated tests**: None
- **Framework**: N/A

### QA Policy
Every task MUST include agent-executed QA scenarios.

---

## TODOs

- [x] 1. Fix shuttle thin line removal — target Line/LineSegments objects + updateMatrixWorld

  **What to do**:
  In `src/components/journey/JourneyScene.tsx`, replace the current useEffect traverse (lines 45-62) with:
  
  ```typescript
  useEffect(() => {
    srbLeftRef.current = scene.getObjectByName('Small_Rocket_Group_01') || null
    srbRightRef.current = scene.getObjectByName('Small_Rocket_Group_02') || null
    etRef.current = scene.getObjectByName('Orange_Parts') || null

    // CRITICAL: Update world matrices so Box3 returns correct dimensions
    scene.updateMatrixWorld(true)

    const toRemove: THREE.Object3D[] = []
    scene.traverse((child: any) => {
      const name = child.name.toLowerCase()
      
      // Rule 1: Remove by name (existing defense-in-depth)
      if (name.includes('antenna') || name.includes('wire') ||
          name.includes('cable') || name.includes('tether') ||
          name.includes('rope') || name.includes('rocket_details')) {
        toRemove.push(child)
        return
      }
      
      // Rule 2: Remove ALL Line/LineSegments/Points objects (Level 5 structural fix)
      // These are helper/debug geometry that should never render in production
      if (child.isLine || child.isLineSegments || child.isPoints) {
        toRemove.push(child)
        return
      }
      
      // Rule 3: Remove thin geometry (catches anything else)
      // Now works correctly because updateMatrixWorld was called above
      if (child.isMesh && child.geometry) {
        child.geometry.computeBoundingBox()
        const bb = child.geometry.boundingBox
        if (bb) {
          const s = new THREE.Vector3()
          bb.getSize(s)
          if (Math.min(s.x, s.y, s.z) < 0.15 && Math.max(s.x, s.y, s.z) > 1) {
            toRemove.push(child)
          }
        }
      }
    })
    toRemove.forEach(obj => obj.removeFromParent())
  }, [scene])
  ```

  Key changes:
  1. Added `scene.updateMatrixWorld(true)` before traverse
  2. Added `child.isLine || child.isLineSegments || child.isPoints` check — this catches the thin line regardless of its name
  3. Changed geometry size check to use `geometry.computeBoundingBox()` + `geometry.boundingBox` (local space, not world space) — more reliable than Box3.setFromObject which depends on world matrices of parents
  4. Added `return` after each push to avoid double-adding

  **Must NOT do**:
  - Don't remove the srbLeftRef/srbRightRef/etRef assignments
  - Don't modify anything in the useFrame (SRB separation logic)
  - Don't touch SpaceTether or AstronautModel

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
    - No special skills needed — single file edit

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (single task)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `src/components/journey/JourneyScene.tsx:45-62` — Current broken traverse code to replace
  - `src/components/journey/JourneyScene.tsx:98-129` — useFrame that sets SRB visibility (must not be affected)
  - THREE.js docs: `Object3D.isLine`, `Object3D.isLineSegments`, `BufferGeometry.computeBoundingBox()`

  **Acceptance Criteria**:
  - [ ] TypeScript compiles: `npx tsc --noEmit` → CLEAN (ignoring existing directionalLight/decay warnings)
  - [ ] No THREE.js console errors on page load

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Thin line removed at 0% scroll (header/launch)
    Tool: Playwright
    Preconditions: Dev server running at localhost:3005, fresh page load (Cmd+Shift+R)
    Steps:
      1. Navigate to http://localhost:3005
      2. Wait 3 seconds for model to load
      3. Take screenshot at 0% scroll
      4. Examine screenshot for any thin black line extending from shuttle nose
    Expected Result: Shuttle visible with NO thin line above nose. Only shuttle body, exhaust below, clouds below.
    Failure Indicators: Any thin straight line visible above the shuttle nose
    Evidence: .sisyphus/evidence/task-1-no-line-header.png

  Scenario: Thin line removed at 20% scroll (Beat 2 - THE PROBLEM)
    Tool: Playwright
    Preconditions: Fresh page load
    Steps:
      1. Navigate to http://localhost:3005
      2. Scroll to 20% of page height: window.scrollTo(0, document.body.scrollHeight * 0.2)
      3. Wait 2 seconds for camera lerp
      4. Take screenshot
      5. Examine for thin line above shuttle
    Expected Result: Shuttle visible with NO thin line. SRBs still attached (separation starts at 20%)
    Failure Indicators: Any thin line visible near/above the shuttle
    Evidence: .sisyphus/evidence/task-1-no-line-beat2.png

  Scenario: SRB separation still works at 30% scroll
    Tool: Playwright
    Steps:
      1. Scroll to 30%: window.scrollTo(0, document.body.scrollHeight * 0.3)
      2. Wait 2 seconds
      3. Take screenshot
      4. Verify SRBs have separated from shuttle (moved outward)
    Expected Result: Two SRBs visible drifting away from shuttle body
    Failure Indicators: SRBs still attached to shuttle at 30%, or shuttle not visible
    Evidence: .sisyphus/evidence/task-1-srb-separation.png
  ```

  **Commit**: YES
  - Message: `fix(scene): remove Line/LineSegments objects from shuttle (root cause: non-Mesh renderables invisible to isMesh filter)`
  - Files: `src/components/journey/JourneyScene.tsx`
  - Pre-commit: `npx tsc --noEmit`

---

## Final Verification Wave

- [ ] F1. **Visual QA** — `unspecified-high` (+ `playwright` skill)
  Navigate to localhost:3005, hard refresh, screenshot at 0%, 20%, 50%, 80% scroll. Verify: no thin line at any position, SRB separation works, astronaut appears at 80%, tether visible at 80%.
  Output: `Screenshots [4/4 clean] | VERDICT: APPROVE/REJECT`

---

## Commit Strategy

- **1**: `fix(scene): remove Line/LineSegments objects from shuttle (root cause: non-Mesh renderables invisible to isMesh filter)` - JourneyScene.tsx, `npx tsc --noEmit`

---

## Success Criteria

### Verification Commands
```bash
npx tsc --noEmit  # Expected: CLEAN (ignoring known warnings)
```

### Final Checklist
- [ ] No thin line visible at any scroll position (0%, 20%, 50%)
- [ ] SRB separation animation works at 20-30%
- [ ] Shuttle opacity fade works at 75-90%
- [ ] Astronaut + tether visible at 72%+
- [ ] TypeScript compiles clean
