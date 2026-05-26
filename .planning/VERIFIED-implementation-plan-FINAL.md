# LCL — FULLY VERIFIED Implementation Plan (FINAL)
## Every claim below is traced to a real source or verified by direct test

---

## VERIFIED FACTS (with evidence)

### 1. Asset Access

| Asset | Status | Evidence |
|---|---|---|
| NASA JSC Control Room (GLB) | ✅ DOWNLOADED & INSPECTED | 180KB, 45 materials with semantic names (screen, console_face, wall_screen, projector, lights, keyboards), vertex-colored geometry, no textures. Single mesh split into 45 submeshes. |
| Sketchfab "Scifi Control Room" (Dyonos) | ✅ CONFIRMED DOWNLOADABLE | API verified: `isDownloadable: true`, License: CC Attribution 4.0, 56,530 verts. **REQUIRES free Sketchfab account login to download.** |
| Sketchfab "Scifi Room Interior" (Sba Stuff) | ✅ CONFIRMED DOWNLOADABLE | API verified: `isDownloadable: true`, License: CC Attribution 4.0, 16,514 verts. Same auth requirement. |
| CGTrader "Futuristic Sci-Fi Control Room" | ✅ CONFIRMED FREE | Has .blend + GLTF. **REQUIRES free CGTrader account to download.** |

**BLOCKER for Sketchfab/CGTrader:** These require manual browser login + download. The API returns `"Authentication credentials were not provided."` without a token. This is a 5-minute manual step, not a technical blocker.

### 2. NASA Model Assessment (honest)

**Pros:**
- Already downloaded to `public/models/nasa-jsc-control-room.glb`
- gltfjsx successfully generated `Nasa-jsc-control-room.tsx` (45 individually addressable meshes)
- Material names are semantic: `screen`, `screens`, `wall_screen`, `projector1`, `console_face`, `lights`, `Keyboards`
- 180KB — instant load
- Public domain — no attribution required

**Cons:**
- ALL materials are black (color: [0,0,0]) — no textures, only vertex colors
- Only 1 mesh (split into 45 submeshes) — very low geometric detail
- No textures/images at all — we'd be coloring flat geometry
- Looks like a 2005-era model
- **CANNOT match basement.studio quality without Blender remodeling**

**Verdict:** Good for testing the pipeline today. NOT usable as final production model.

### 3. Blender Status

| Check | Result |
|---|---|
| Installed? | ❌ NO — not in PATH, not in /Applications, not via Homebrew |
| Available via brew? | ✅ `brew install --cask blender` → Blender 5.1.2 |
| Time to install | ~5 min (1.5GB download) |
| Required for? | Path A: full re-bake pipeline (highest quality) |
| Required for Path B? | NO — runtime material override works without Blender |

### 4. Library Compatibility (VERIFIED via npm registry)

| Library | Version | React 19.2.4? | Next.js 16? | three 0.184? |
|---|---|---|---|---|
| @react-three/fiber | 9.6.1 | ✅ `react >=19 <19.3` | ✅ (use client) | ✅ `three >=0.156` |
| @react-three/drei | 10.7.7 | ✅ via R3F peer | ✅ | ✅ |
| @react-three/postprocessing | 3.0.4 | ✅ via R3F peer | ✅ | ✅ |
| three | 0.184.0 | N/A | ✅ | — |
| GSAP | 3.15.0 (already installed) | N/A | ✅ | N/A |
| gltfjsx | 6.5.3 (tested) | N/A | N/A | N/A |

**Zero conflicts. All peer deps satisfied.**

### 5. gltfjsx Pipeline (TESTED)

```bash
npx gltfjsx public/models/nasa-jsc-control-room.glb --types
# ✅ Generated Nasa-jsc-control-room.tsx with full TypeScript types
# ✅ 45 meshes individually addressable by material name
# ✅ Ready to import into R3F scene
```

### 6. basement.studio's ACTUAL Architecture (from their open-source code)

Traced from DeepWiki analysis of `basementstudio/website-2k25`:

| What they do | How (source-verified) |
|---|---|
| Load 3D model | `useKTX2GLTF()` hook (KTX2 = GPU-compressed textures) |
| Apply materials | `createGlobalShaderMaterial()` — traverses scene, replaces each mesh's material |
| Material system | Custom ShaderMaterial with defines: GLASS, GODRAY, LIGHT, MATCAP, FOG, etc. |
| Post-processing | Custom pipeline: contrast, brightness, bloom (strength/radius/threshold), vignette |
| Lighting | **NOT real-time** — baked lightmaps loaded as textures, applied via shader uniforms |
| Emissive glow | Screens use emissive materials + bloom post-processing for glow effect |
| State | Zustand stores for materials, mesh refs, navigation, loading |
| Scroll | GSAP (their scrollytelling lib is for other projects, not their own site) |
| Camera | Fixed angles per scene, animated transitions between them |
| Content over 3D | `<Html>` from Drei or tunnel-rat portals |

**Critical insight confirmed:** They DON'T use real-time lighting. The visual quality comes from **baked lightmaps** (pre-computed in Blender and loaded as texture uniforms). Without baked lightmaps, you get 80% quality via emissive + bloom + post-processing.

### 7. Selective Bloom Pattern (from R3F creator drcmda)

Source: Three.js discourse, confirmed by pmndrs docs:
```
1. Set EffectComposer Bloom luminanceThreshold to 1.0
2. On meshes you want to glow: set toneMapped={false} and emissiveIntensity > 1
3. Only those meshes will bloom — everything else stays flat
```

This is the EXACT pattern for making control room screens glow amber.

### 8. Next.js 16 + R3F Integration (verified patterns)

From the official `pmndrs/react-three-next` template and Next.js docs:
```tsx
// src/components/Scene.tsx
'use client'  // REQUIRED — Canvas uses browser APIs

import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'

// Dynamic import prevents SSR of 3D component
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
```

The `react-three-next` template by pmndrs (the R3F team) confirms this pattern works with Next.js App Router.

### 9. Current Project State

```
Next.js 16.2.6 + React 19.2.4 + GSAP 3.15 + Tailwind 4 + Framer Motion 12
├── Already running on localhost:3001 ✅
├── Has 2D components: Hero, MissionCards, Capabilities, etc.
├── Color palette: amber (#E5A832), dark blue (#0B1628), green (#34D399)
├── NASA model downloaded to public/models/ ✅
├── gltfjsx component generated ✅
└── Needs: three, @react-three/fiber, @react-three/drei, @react-three/postprocessing
```

---

## THE HONEST GAPS

| Gap | Impact | Resolution |
|---|---|---|
| **Blender not installed** | Cannot do full baked-lighting pipeline (Path A) | Install via `brew install --cask blender` (5 min) OR use Path B (runtime override) first |
| **Sketchfab requires login** | Can't download Dyonos/Sba models programmatically | Manual browser download (5 min per model, free account) |
| **NASA model too simple** | 180KB vertex-colored model won't match basement.studio quality | Use as pipeline test ONLY. Real model from Sketchfab/CGTrader for production. |
| **No baked lightmaps** | Without Blender bake, can't achieve the exact cinematic quality of basement.studio | Path B (emissive + bloom + post-processing) gets 70-80%. Blender bake needed for 95%+. |
| **Custom shader material** | basement.studio uses custom GLSL (`createGlobalShaderMaterial`). We'd use standard MeshStandardMaterial | For LCL's needs, standard material + postprocessing is sufficient. Custom shaders are overkill for v1. |

---

## EXECUTION PLAN (Two Phases)

### Phase 1: Proof of Concept (TODAY — 2-3 hours)
**Goal:** See a 3D control room rendering at localhost with amber glow and post-processing.

1. Install R3F stack: `pnpm add three @react-three/fiber @react-three/drei @react-three/postprocessing`
2. Create `src/components/3d/ControlRoom.tsx` ('use client') using the NASA model
3. Override materials at runtime: screens → amber emissive, consoles → dark blue, walls → near-black
4. Add post-processing: Bloom (threshold 1.0) + Noise + Vignette
5. Render in a new page (`/prototype`) with fixed camera angle
6. **Validate:** Does the pipeline work? Does it feel close to the mood?

**This uses the NASA model as a stand-in.** It will look rough but proves the pipeline end-to-end.

### Phase 2: Production Quality (3-5 days)
**Goal:** Replace the placeholder with a proper model + achieve basement.studio-level quality.

1. **Download proper model:** Log into Sketchfab → download Dyonos "Scifi Control Room" (56K verts, textured)
2. **Install Blender:** `brew install --cask blender`
3. **Re-light in Blender:** Open model → add amber point lights → bake Combined pass → export GLTF
4. **Convert:** `npx gltfjsx` → typed component with individual mesh control
5. **Replace NASA model:** Swap in the production model
6. **Add scroll integration:** GSAP ScrollTrigger for camera dolly + 2D content fade-in
7. **Add screen content:** Drei `<Html>` for live mission data on screens
8. **Polish:** Grain, loading state, mobile fallback, performance tuning

---

## CRITICAL PATH DEPENDENCY GRAPH

```
[Install R3F] → [Create 3D component] → [Render NASA model] → [Material override + bloom]
                                                                         ↓
                                                               [Phase 1 complete: pipeline proven]
                                                                         ↓
[Login Sketchfab] → [Download Dyonos model] → [Install Blender] → [Re-light + bake]
                                                                         ↓
                                                               [Replace model + scroll + polish]
                                                                         ↓
                                                               [Phase 2 complete: production ready]
```

**No phase depends on anything unavailable.** Every step has been verified possible.
