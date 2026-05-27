# Swap 3D Model — Soma04 Spaceship Interior + Shader Pipeline Refactor

## TL;DR

> **Quick Summary**: Replace broken NASA model (all-black, no textures, no UV2) with soma04 spaceship interior (4 PBR materials, 13 textures, emission map). Refactor shader from lightmap-based to PBR texture-based. Target: dark room with warm screen glow matching basement.studio aesthetic.
> 
> **Deliverables**:
> - Compressed GLB (≤8MB) in public/models/
> - Refactored shader that reads PBR baseColor + emissive textures
> - Updated interaction system for 4-mesh model
> - Tuned camera path + fog for new geometry
> 
> **Estimated Effort**: Medium (4-6 hours across 5 tasks)
> **Parallel Execution**: NO — strict sequential dependency chain
> **Critical Path**: Validate model → Compress GLB → Refactor shader → Swap + wire → Visual tune

---

## Context

### Original Request
The 3D hero scene is invisible (pure black). Root cause: the NASA model has ALL 45 materials set to `[0,0,0]` with zero textures and no UV2. It's fundamentally unusable. User downloaded soma04 spaceship interior from Sketchfab — a properly textured model with PBR materials and emission maps.

### Model Comparison

| | **NASA (broken)** | **Soma04 (replacement)** | **basement.studio (inspo)** |
|---|---|---|---|
| Size | 185KB | ~90MB raw → **target ≤8MB** compressed | 2.3MB |
| Meshes | 1 | 4 | 101 |
| Materials | 45 (all black) | 4 (proper PBR) | 47 (textured + emissive) |
| Textures | 0 | 13 (baseColor, normal, metallicRoughness, emissive) | 30 |
| UV2 / Lightmap | No | No (uses textures directly) | Yes |
| Emission | None | `chair_screens_lamps` has emission map | Built into materials |

### Metis Review Findings (Addressed)
- **Task 0 needed**: Must validate model before any code changes (orientation, scale, bounds)
- **DRACO decoder path**: Not configured in useGLTF — must add
- **Interaction granularity**: 4 meshes vs old 45 — redesign groups
- **Camera path**: Old coordinates meaningless for new geometry — must recompute
- **Stale code**: `fragment.glsl`, EXRLoader, lightmap pipeline — all removed
- **Screen textures**: Canvas-based animated textures system (DataVizScreen, CodeScreen, StatusScreen) — defer to follow-up

---

## Work Objectives

### Core Objective
Get a visible, properly-textured 3D scene rendering on localhost:3005 that matches the basement.studio dark-room-with-warm-accents aesthetic.

### Concrete Deliverables
- `public/models/soma04-interior.glb` — compressed, DRACO'd, ≤8MB
- `src/shaders/control-room-shader/index.ts` — refactored for PBR (no lightmap)
- `src/components/3d/InteractiveRoom.tsx` — loads new model, no EXRLoader
- `src/components/3d/mesh-map.ts` — remapped for 4 meshes
- `src/components/3d/ScrollCamera.tsx` — camera path tuned for new bounds

### Definition of Done
- [ ] 3D scene renders visible textured geometry (not black)
- [ ] Screens/lamps emit warm glow (bloom catches it)
- [ ] Scene feels dark with warm accents (not washed out)
- [ ] Hover interaction works on at least one mesh group
- [ ] `npm run build` passes clean
- [ ] GLB ≤ 8MB

### Must Have
- Compressed GLB with embedded textures + DRACO
- Shader reads `baseMaterial.map` (base color texture) directly — no lightmap
- Emissive from model's built-in emissive texture
- Fog preserved (dark aesthetic)
- PostProcessing preserved (ToneMapping, Bloom, Vignette, Noise)
- At least minimal hover/click interaction

### Must NOT Have (Guardrails)
- Do NOT add runtime Three.js lights (AmbientLight, PointLight, etc.)
- Do NOT add environment maps / IBL / HDRI
- Do NOT add KTX2/Basis loader (scope creep — use WebP or JPEG in GLB)
- Do NOT modify ScrollTrigger/GSAP logic (only camera PATH constants)
- Do NOT change Zustand store interface (`MeshGroup` type, `activePanel`, etc.)
- Do NOT change postprocessing stack (ToneMapping mode 7 + Bloom + Vignette + Noise)
- Do NOT attempt to bake a new lightmap in Blender
- Do NOT keep ANY lightmap code paths "for fallback"
- Do NOT add loading progress UI (separate task)
- Do NOT try to make animated screen textures work with new model (follow-up)

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: No test framework needed
- **Automated tests**: None — visual + build verification
- **QA method**: Playwright screenshot + build check + grep assertions

### QA Policy
Every task verified by: build passes + specific grep/file assertions + visual check where applicable.

---

## Execution Strategy

### Sequential Dependency Chain (5 tasks)

```
Task 0: Validate soma04 model (inspect, bounds, orientation)
    ↓
Task 1: Compress to web-ready GLB (gltf-transform, DRACO, resize textures)
    ↓
Task 2: Refactor shader pipeline (remove lightmap, use PBR textures)
    ↓
Task 3: Swap model + rewire interaction system (mesh-map, InteractiveRoom, paths)
    ↓
Task 4: Visual tuning (camera path, fog, emissive intensity, background)

Critical Path: ALL sequential — each depends on previous
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 0 | Nothing | 1 | 1 |
| 1 | 0 | 2, 3 | 2 |
| 2 | 1 | 3 | 3 |
| 3 | 1, 2 | 4 | 4 |
| 4 | 3 | F1 | 5 |

### Agent Dispatch Summary

- **Task 0**: `quick` — file inspection, no code changes
- **Task 1**: `unspecified-high` — CLI tooling, file processing
- **Task 2**: `deep` — shader GLSL refactoring, careful deletion
- **Task 3**: `unspecified-high` — multi-file wiring changes
- **Task 4**: `deep` — visual tuning requires judgment

---

## TODOs

- [x] 0. Validate soma04 model — extract, inspect, verify orientation and bounds

  **What to do**:
  1. Extract `~/Downloads/soma04_spaceship_low_poly_-_interior.zip` to `/tmp/soma04-model/`
  2. Install gltf-transform CLI: `npx @gltf-transform/cli inspect /tmp/soma04-model/scene.gltf`
  3. Check output for: mesh count (expect 4), material count (expect 4), texture count (expect 13)
  4. Get bounding box: use gltf-transform or write a quick Node script to read accessor min/max
  5. Check if model is Y-up (standard GLTF) or Z-up (needs rotation)
  6. Record: mesh names, bounding box dimensions, up-axis, material→mesh mapping
  7. Save findings to `.sisyphus/notepads/lcl-website-interactive/soma04-model-analysis.md`

  **Must NOT do**:
  - Do NOT modify the model files
  - Do NOT copy to public/ yet (Task 1 does compression first)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Blocks**: Task 1
  - **Blocked By**: None

  **References**:
  - `~/Downloads/soma04_spaceship_low_poly_-_interior.zip` — source ZIP
  - `public/draco/` — DRACO decoder already present in project

  **Acceptance Criteria**:
  - [ ] ZIP extracted successfully
  - [ ] `gltf-transform inspect` reports 4 meshes, 4 materials, 13 textures
  - [ ] Bounding box dimensions recorded (needed for camera path in Task 4)
  - [ ] Up-axis determined (Y-up or Z-up)
  - [ ] Findings saved to notepad

  **QA Scenarios**:
  ```
  Scenario: Model structure verified
    Tool: Bash
    Steps:
      1. npx @gltf-transform/cli inspect /tmp/soma04-model/scene.gltf
    Expected Result: Output shows meshCount=4, materialCount=4
    Evidence: .sisyphus/evidence/task-0-inspect.txt
  ```

  **Commit**: NO (research only)

---

- [x] 1. Compress soma04 to web-ready GLB (≤8MB, DRACO, resized textures)

  **What to do**:
  1. Use gltf-transform CLI to optimize:
     ```bash
     npx @gltf-transform/cli optimize \
       /tmp/soma04-model/scene.gltf \
       ~/Projects/launchcontrollabs.com/public/models/soma04-interior.glb \
       --compress draco \
       --texture-resize 1024
     ```
     (If >8MB at 1024, try `--texture-resize 512` for normal maps only)
  2. Validate output: `npx @gltf-transform/cli validate public/models/soma04-interior.glb`
  3. Check file size: must be ≤ 8MB (8388608 bytes)
  4. Verify DRACO compression applied: inspect output should mention draco
  5. Delete old model files:
     - `public/models/nasa-jsc-control-room.glb`
     - `public/models/textures/bake-02-lightmap-5229a667.exr`
     - `public/models/basement-office.glb` (reference no longer needed)

  **Must NOT do**:
  - Do NOT manually resize images with ImageMagick/Sharp
  - Do NOT use KTX2 format (no loader configured)
  - Do NOT keep old model files "for reference"

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `[]`

  **Parallelization**:
  - **Blocks**: Task 2, Task 3
  - **Blocked By**: Task 0

  **References**:
  - `/tmp/soma04-model/scene.gltf` — source GLTF from Task 0
  - `public/models/` — destination directory
  - `public/draco/` — DRACO decoder wasm files (already present)
  - gltf-transform docs: `npx @gltf-transform/cli --help`

  **Acceptance Criteria**:
  - [ ] `public/models/soma04-interior.glb` exists
  - [ ] File size ≤ 8,388,608 bytes
  - [ ] `gltf-transform validate` exits 0
  - [ ] Old model files deleted
  - [ ] `npm run build` still passes (no import errors from deleted files yet — they're only referenced in code changed in Task 3)

  **QA Scenarios**:
  ```
  Scenario: GLB size within budget
    Tool: Bash
    Steps:
      1. stat -f %z ~/Projects/launchcontrollabs.com/public/models/soma04-interior.glb
    Expected Result: Number ≤ 8388608
    Evidence: .sisyphus/evidence/task-1-filesize.txt

  Scenario: GLB validates clean
    Tool: Bash
    Steps:
      1. npx @gltf-transform/cli validate public/models/soma04-interior.glb
    Expected Result: No errors (warnings OK)
    Evidence: .sisyphus/evidence/task-1-validate.txt
  ```

  **Commit**: YES
  - Message: `feat(3d): add compressed soma04 spaceship interior GLB, remove broken NASA model`
  - Files: `public/models/soma04-interior.glb` (added), `public/models/nasa-jsc-control-room.glb` (deleted), `public/models/textures/` (deleted), `public/models/basement-office.glb` (deleted)

---

- [ ] 2. Refactor shader from lightmap-based to PBR texture-based

  **What to do**:
  1. **Rewrite `src/shaders/control-room-shader/index.ts`** — new shader that:
     - Reads `map` (baseColor texture) from the loaded material — this IS the visual
     - Reads emissive from material's `emissiveMap` if present
     - Applies exponential² fog (keep current formula)
     - NO lightmap, NO uv2, NO EXRLoader dependency
     - Adds ambient floor: `max(color, vec3(0.08))` so nothing is pure black

  2. New fragment shader (inline):
     ```glsl
     uniform sampler2D map;
     uniform vec3 emissiveColor;
     uniform float emissiveIntensity;
     uniform sampler2D emissiveMap;
     uniform float hasEmissiveMap;
     uniform float opacity;
     uniform vec3 fogColor;
     uniform float fogDensity;
     uniform float fogDepth;

     varying vec2 vUv;
     varying vec3 vWorldPosition;

     void main() {
       vec4 texColor = texture2D(map, vUv);
       vec3 color = texColor.rgb;

       // Ambient floor — never pure black
       color = max(color, vec3(0.06));

       // Emissive (from texture if available, otherwise uniform)
       if (hasEmissiveMap > 0.5) {
         vec3 emTex = texture2D(emissiveMap, vUv).rgb;
         color += emTex * emissiveColor * emissiveIntensity;
       } else {
         color += emissiveColor * emissiveIntensity;
       }

       // Exponential² fog (basement.studio formula)
       float fogDepthValue = min(-length(vWorldPosition) + fogDepth, 0.0);
       float fogFactor = 1.0 - exp(-(fogDensity * fogDensity) * (fogDepthValue * fogDepthValue));
       fogFactor = clamp(fogFactor, 0.0, 1.0);
       if (fogFactor > 0.0) {
         color = color * (1.0 - fogFactor) + fogColor * fogFactor;
       }

       gl_FragColor = vec4(color, opacity * texColor.a);
     }
     ```

  3. New vertex shader (simplified — no uv2):
     ```glsl
     varying vec2 vUv;
     varying vec3 vWorldPosition;

     void main() {
       vUv = uv;
       vec4 worldPos = modelMatrix * vec4(position, 1.0);
       vWorldPosition = worldPos.xyz;
       gl_Position = projectionMatrix * viewMatrix * worldPos;
     }
     ```

  4. Update `createControlRoomShader()` factory:
     - Remove: `lightMap`, `lightMapIntensity`, `baseColor`, `uv2` attribute
     - Add: `emissiveMap` uniform, `hasEmissiveMap` flag
     - Keep: `map`, `emissiveColor`, `emissiveIntensity`, `opacity`, `fogColor`, `fogDensity`, `fogDepth`
     - `baseColor` uniform removed — texture IS the color now

  5. Update exports:
     - Keep `SCREEN_MATERIALS` but update set values for soma04 material names
     - Keep `LIGHT_MATERIALS` but update
     - Keep `ControlRoomShaderOptions` interface

  6. **Delete** `src/shaders/control-room-shader/fragment.glsl` (stale, never imported)
  7. **Delete** `src/shaders/control-room-shader/vertex.glsl` (stale, never imported)

  **Must NOT do**:
  - Do NOT use MeshStandardMaterial instead (keep custom ShaderMaterial for control)
  - Do NOT add normal map sampling (keep it simple — baseColor + emissive + fog only)
  - Do NOT add metallic/roughness (that's PBR lighting which needs env maps — out of scope)
  - Do NOT change the fog formula or postprocessing stack

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: `[]`

  **Parallelization**:
  - **Blocks**: Task 3
  - **Blocked By**: Task 1 (need to know final material names from compressed GLB)

  **References**:
  - `src/shaders/control-room-shader/index.ts` — current shader to rewrite
  - `/tmp/basement-reference/src/shaders/material-global-shader/` — basement.studio shader for reference pattern
  - Soma04 materials: `Space_ship`, `Space_ship_interior_base`, `Space_ship_chair_screens_lamps` (has emissive), `Space_ship_phone_and_speed_control`

  **Acceptance Criteria**:
  - [ ] Shader has NO `lightMap` uniform, NO `uv2` attribute, NO `lightMapIntensity`
  - [ ] Shader reads `map` (baseColor texture) as primary color source
  - [ ] Shader has `emissiveMap` support for the screens/lamps material
  - [ ] Fog formula preserved (exponential²)
  - [ ] `fragment.glsl` and `vertex.glsl` files deleted
  - [ ] TypeScript compiles: `npx tsc --noEmit`

  **QA Scenarios**:
  ```
  Scenario: No lightmap references remain
    Tool: Bash (grep)
    Steps:
      1. grep -r "lightMap\|lightmap\|EXRLoader\|exr\|uv2\|TEXCOORD_1" src/ --include="*.ts" --include="*.tsx"
    Expected Result: Zero matches
    Evidence: .sisyphus/evidence/task-2-no-lightmap.txt

  Scenario: TypeScript compiles
    Tool: Bash
    Steps:
      1. cd ~/Projects/launchcontrollabs.com && npx tsc --noEmit
    Expected Result: Exit code 0, no errors
    Evidence: .sisyphus/evidence/task-2-tsc.txt

  Scenario: Stale GLSL files removed
    Tool: Bash
    Steps:
      1. ls src/shaders/control-room-shader/fragment.glsl src/shaders/control-room-shader/vertex.glsl 2>&1
    Expected Result: "No such file or directory" for both
    Evidence: .sisyphus/evidence/task-2-glsl-deleted.txt
  ```

  **Commit**: YES
  - Message: `refactor(3d): rewrite shader for PBR textures, remove lightmap pipeline`
  - Files: `src/shaders/control-room-shader/index.ts`, `src/shaders/control-room-shader/fragment.glsl` (deleted), `src/shaders/control-room-shader/vertex.glsl` (deleted)

---

- [ ] 3. Swap model in InteractiveRoom + rewire interaction system

  **What to do**:
  1. **Update `InteractiveRoom.tsx`**:
     - Change `MODEL_PATH` to `'/models/soma04-interior.glb'`
     - Remove `LIGHTMAP_PATH` constant entirely
     - Remove `EXRLoader` import and the lightmap loading `useEffect`
     - Remove `lightmap` state, `shadersApplied` ref
     - Add `useGLTF.setDecoderPath('/draco/')` before component (DRACO support)
     - Simplify shader application: traverse meshes, apply `createControlRoomShader()` using material's `map` and `emissiveMap`
     - Remove all `uv2` fallback logic (no longer needed)
     - Remove `rotation={[-Math.PI / 2, 0, 0]}` on primitive IF model is Y-up (verify from Task 0)
     - Keep hover/click handlers but update for new mesh structure

  2. **Rewrite `src/components/3d/mesh-map.ts`**:
     - Old: 45 entries mapping mesh names to groups
     - New: 4 entries mapping soma04 mesh/material names to groups:
       ```typescript
       export type MeshGroup = 'EXTERIOR' | 'INTERIOR' | 'SCREENS' | 'CONTROLS'
       
       export const MESH_GROUPS: Record<string, MeshGroup> = {
         'Object_2': 'EXTERIOR',   // or whatever gltf-transform names them
         'Object_3': 'INTERIOR',
         'Object_4': 'SCREENS',    // chair_screens_lamps — has emissive
         'Object_5': 'CONTROLS',   // phone_and_speed_control
       }
       
       export const INTERACTIVE_GROUPS: MeshGroup[] = ['SCREENS', 'CONTROLS']
       ```
     - Update `getMeshGroup()` function accordingly

  3. **Update `src/shaders/control-room-shader/index.ts`** exports:
     - `SCREEN_MATERIALS` → set containing soma04's screen material name
     - `LIGHT_MATERIALS` → can be empty or removed

  4. **Update `src/data/panel-content.ts`**:
     - `PANEL_POSITIONS` — update 3D coordinates for SCREENS and CONTROLS groups (placeholder values, tuned in Task 4)

  5. **Remove screen-textures system** (incompatible with new model):
     - Remove import of `applyScreenTextures`, `disposeScreenTextures` from InteractiveRoom
     - Keep the files but don't use them (can be wired back in follow-up)

  6. **Update `src/store/scene-store.ts`** — update `MeshGroup` type if names changed

  **Must NOT do**:
  - Do NOT change Zustand store logic (just the type)
  - Do NOT change ControlRoomScene.tsx (Canvas, postprocessing unchanged)
  - Do NOT change ScrollCamera.tsx yet (Task 4)
  - Do NOT try to make animated screen textures work (follow-up)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `[]`

  **Parallelization**:
  - **Blocks**: Task 4
  - **Blocked By**: Task 1, Task 2

  **References**:
  - `src/components/3d/InteractiveRoom.tsx` — main file to rewrite
  - `src/components/3d/mesh-map.ts` — interaction mapping to rewrite
  - `src/store/scene-store.ts` — MeshGroup type
  - `src/data/panel-content.ts` — panel positions to update
  - `.sisyphus/notepads/lcl-website-interactive/soma04-model-analysis.md` — mesh names from Task 0

  **Acceptance Criteria**:
  - [ ] No import errors: `npx tsc --noEmit` passes
  - [ ] No reference to `EXRLoader`, `lightmap`, `LIGHTMAP_PATH`, `uv2` in InteractiveRoom
  - [ ] `useGLTF.setDecoderPath('/draco/')` present
  - [ ] `npm run build` passes clean
  - [ ] Dev server starts without console errors related to model loading

  **QA Scenarios**:
  ```
  Scenario: Build passes with new model wiring
    Tool: Bash
    Steps:
      1. cd ~/Projects/launchcontrollabs.com && npm run build
    Expected Result: "Compiled successfully"
    Evidence: .sisyphus/evidence/task-3-build.txt

  Scenario: No old model references remain
    Tool: Bash (grep)
    Steps:
      1. grep -r "nasa-jsc\|bake-02-lightmap\|EXRLoader" src/ --include="*.ts" --include="*.tsx"
    Expected Result: Zero matches
    Evidence: .sisyphus/evidence/task-3-no-old-refs.txt

  Scenario: DRACO decoder configured
    Tool: Bash (grep)
    Steps:
      1. grep "setDecoderPath\|decoderPath" src/components/3d/InteractiveRoom.tsx
    Expected Result: Contains "/draco/"
    Evidence: .sisyphus/evidence/task-3-draco.txt
  ```

  **Commit**: YES
  - Message: `feat(3d): swap to soma04 spaceship model, rewire interaction system`
  - Files: `src/components/3d/InteractiveRoom.tsx`, `src/components/3d/mesh-map.ts`, `src/store/scene-store.ts`, `src/data/panel-content.ts`

---

- [ ] 4. Visual tuning — camera path, fog, emissive, background

  **What to do**:
  1. **Update `ScrollCamera.tsx` camera path constants**:
     - Use bounding box from Task 0 to compute sensible start/end positions
     - Start: outside model looking in (pull back ~1.5× bounding radius)
     - End: inside model at eye-level looking at screens
     - Update `CAMERA_START`, `CAMERA_END`, `LOOK_AT` vectors

  2. **Tune fog parameters** in shader index.ts:
     - `fogColor`: keep dark `(0.02, 0.02, 0.04)` (matching basement.studio's dark aesthetic)
     - `fogDensity`: adjust based on model scale (start 0.03, tune if needed)
     - `fogDepth`: set to ~1.5× model depth

  3. **Tune emissive intensity** for screens material:
     - Start at `emissiveIntensity: 2.0` for the `chair_screens_lamps` material
     - Bloom threshold is 0.85 — emissive must exceed this to glow
     - May need 3.0-5.0 depending on how the emissive texture values are

  4. **Background color** in ControlRoomScene.tsx:
     - Keep dark: `#080810` (very dark blue-black, matches fog endpoint)

  5. **Test by running dev server** and checking visual output:
     - `npm run dev -- --port 3005`
     - Verify: room visible, screens glow, dark atmosphere, fog fades distance

  **Must NOT do**:
  - Do NOT change ScrollTrigger/GSAP logic (only PATH constants)
  - Do NOT change postprocessing (Bloom threshold, Vignette, ToneMapping mode)
  - Do NOT add lights
  - Do NOT change Canvas gl settings

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: `[]`

  **Parallelization**:
  - **Blocks**: Final verification
  - **Blocked By**: Task 3

  **References**:
  - `src/components/3d/ScrollCamera.tsx:9-12` — CAMERA_PATH constants
  - `src/shaders/control-room-shader/index.ts` — fog uniforms
  - `src/components/3d/ControlRoomScene.tsx:83` — background color
  - `.sisyphus/notepads/lcl-website-interactive/soma04-model-analysis.md` — bounding box from Task 0

  **Acceptance Criteria**:
  - [ ] Camera starts outside model, scrolls inside
  - [ ] Room geometry visible (not black)
  - [ ] Screen/lamp areas emit glow (bloom visible)
  - [ ] Far objects fade to dark (fog working)
  - [ ] `npm run build` passes
  - [ ] No runtime console errors

  **QA Scenarios**:
  ```
  Scenario: Dev server renders visible scene
    Tool: Bash
    Steps:
      1. cd ~/Projects/launchcontrollabs.com && npm run dev -- --port 3005 &
      2. sleep 8
      3. curl -s -o /dev/null -w "%{http_code}" http://localhost:3005
      4. kill %1
    Expected Result: HTTP 200
    Evidence: .sisyphus/evidence/task-4-server-up.txt

  Scenario: Build passes after all tuning
    Tool: Bash
    Steps:
      1. cd ~/Projects/launchcontrollabs.com && npm run build
    Expected Result: "Compiled successfully"
    Evidence: .sisyphus/evidence/task-4-build.txt
  ```

  **Commit**: YES
  - Message: `fix(3d): tune camera path, fog, and emissive for soma04 model`
  - Files: `src/components/3d/ScrollCamera.tsx`, `src/shaders/control-room-shader/index.ts`, `src/components/3d/ControlRoomScene.tsx`

---

## Final Verification Wave

- [ ] F1. **Visual + Build verification** — Dev server at localhost:3005 shows:
  - Visible 3D spaceship interior (not black, not washed out)
  - Dark atmosphere with warm screen/lamp glow
  - Scroll interaction moves camera into scene
  - At least one mesh highlights on hover
  - `npm run build` exits 0
  - GLB file ≤ 8MB

---

## Commit Strategy

| Task | Message | Key Files |
|------|---------|-----------|
| 1 | `feat(3d): add compressed soma04 spaceship interior GLB, remove broken NASA model` | public/models/ |
| 2 | `refactor(3d): rewrite shader for PBR textures, remove lightmap pipeline` | src/shaders/ |
| 3 | `feat(3d): swap to soma04 spaceship model, rewire interaction system` | src/components/3d/, src/store/, src/data/ |
| 4 | `fix(3d): tune camera path, fog, and emissive for soma04 model` | ScrollCamera, shader, ControlRoomScene |

---

## Success Criteria

### Verification Commands
```bash
# GLB exists and is ≤8MB
stat -f %z public/models/soma04-interior.glb  # ≤ 8388608

# No old model references
grep -r "nasa-jsc\|EXRLoader\|lightMap\|uv2\|TEXCOORD_1" src/ --include="*.ts" --include="*.tsx"  # 0 matches

# Build passes
npm run build  # exit 0

# DRACO configured
grep "setDecoderPath\|decoderPath" src/components/3d/InteractiveRoom.tsx  # match
```

### Final Checklist
- [ ] soma04-interior.glb in public/models/ (≤8MB)
- [ ] Old model + lightmap + reference model deleted
- [ ] Shader uses PBR baseColor texture (no lightmap)
- [ ] EXRLoader fully removed from codebase
- [ ] Stale .glsl files deleted
- [ ] DRACO decoder path configured
- [ ] Mesh-map updated for 4 meshes
- [ ] Camera path works for new geometry
- [ ] Scene renders visible with warm emissive accents
- [ ] Build passes clean

---

## Deferred (Follow-up tasks, NOT in this plan)
- Animated screen textures (DataVizScreen, CodeScreen, StatusScreen) — needs UV mapping study
- Loading progress UI for larger model
- Mobile performance optimization / LOD
- Fine-grained interaction (raycasting sub-mesh areas within the 4 large meshes)
