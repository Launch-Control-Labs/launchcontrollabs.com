# LCL — 3D Asset Strategy & Implementation Plan (ROBUST)

## Summary of Available Base Models

### Tier 1: Best Match (Free, Downloadable, GLTF Available)

| Model | Source | Poly Count | License | GLTF? | Mood Match | Notes |
|---|---|---|---|---|---|---|
| **Low Poly Sci-Fi Control Room** | [Sketchfab - TRUTH_319](https://sketchfab.com/3d-models/low-poly-sci-fi-control-room-free-download-69a97b5821424674a5c559efdca0dcc6) | ~30-50k | CC-Attribution | ✅ Yes | 🟢 HIGH | Dark moody control room with multiple screens, teal/cyan accent lighting. 465 downloads, proven usability. Best starting point. |
| **Futuristic Sci-Fi Control Room** | [CGTrader](https://www.cgtrader.com/free-3d-models/interior/other/futuristic-sci-fi-control-room) | Low-Mid | Free | ✅ GLTF (24MB) + Blender source | 🟢 HIGH | Includes screens, ambient lighting, industrial door. Has Blender source file (Cycles) — perfect for re-baking with our palette. |
| **Scifi Control Room (Dyonos)** | [Sketchfab](https://sketchfab.com/3d-models/scifi-control-room-7e68ba6cbabf421db1cae503fb4d5c4d) | 125.7k tri / 56.5k vert | CC-Attribution | ✅ Yes | 🟡 MED | More spaceship-bridge style. May need heavier modification but good geometry quality. |
| **Sci Fi Control Room (Terobi)** | [Sketchfab](https://sketchfab.com/3d-models/sci-fi-control-room-07230ab99eae478f895c59adbdd9beb1) | Unknown | Store (paid?) | ❓ | 🟡 MED | Warm amber/yellow lighting already matches our palette! Console-heavy. |

### Tier 2: Supporting Assets (Mix & Match)

| Asset | Source | Use For |
|---|---|---|
| **NASA JSC Mission Control** | [data.nasa.gov](https://data.nasa.gov/dataset/nasa-3d-models-jsc-mission-control-room) | Reference for layout/proportions (public domain, .3ds format — would need Blender conversion) |
| **Low Poly Sci-Fi Control Console** | Sketchfab (CC) | Individual desk/console to add to a room scene |
| **Hacker's Room** | Sketchfab | Good reference for dark room + multiple screens + ambient mood |
| **Poly Haven HDRI environments** | [polyhaven.com](https://polyhaven.com) | CC0 HDRIs for environment lighting in R3F |

---

## Recommended Approach: CGTrader Model + Blender Re-Light

**Why the CGTrader model is the best base:**
1. ✅ Free Blender source file (v4, Cycles renderer) — we can open and modify directly
2. ✅ Already has GLTF export (24MB — we'll optimize)
3. ✅ PBR textures included (base color, roughness, metalness, normal)
4. ✅ Has screens, ambient lighting, industrial feel
5. ✅ Low enough poly count for web performance
6. ✅ Proper UV unwrapping verified by CGTrader QA

**Modification plan in Blender:**
1. Open the .blend file
2. Swap accent lighting from whatever it is → warm amber (#f59e0b)
3. Add emissive materials to screens showing LCL mission data
4. Replace/add objects: mission clock, LCL branding on equipment, coffee mug
5. Adjust camera angle to match basement.studio's "looking into the room" composition
6. Bake lighting (Combined pass, 4096x4096 texture, 128 samples + denoise)
7. Export as optimized GLTF (Draco compression, merged meshes where possible)
8. Target: <5MB final GLTF file

---

## The Baked Lighting Pipeline (from tchayen.com research)

This is the EXACT workflow that gives basement.studio's quality:

### Step 1: Model Prep (in Blender)
```
1. Unlink all instanced objects → make single-user
2. Materialize curves (lamp arms, cables)
3. Fix normals (broken normals → black in bake)
4. Apply all transforms (scale, rotation)
5. Separate into: Lights/Emissives collection + Meshes collection
```

### Step 2: UV Setup for Baking
```
1. For each mesh: create a second UV map called "Bake"
2. Select all meshes → Edit mode → Smart UV Unwrap on "Bake" UV
3. Use UV Pack (maximize texture usage)
4. Scale up important faces (floor, main console) for higher resolution
5. Scale down invisible faces (undersides, backs against walls)
```

### Step 3: Bake Settings (Cycles)
```
- Bake Type: Combined (includes ALL lighting info)
- Image: 4096x4096, no alpha
- Samples: 128 (test with 1-10 first)
- Margin: 8px (prevents bleeding)
- Create Image Texture node in each material, point to bake target
- Select all meshes, bake
```

### Step 4: Denoise + Color Grade
```
- Use compositor denoising (dramatically improves quality)
- Color grade: boost amber warmth, deepen shadows
- Export as PNG (or JPEG at 90% for smaller file)
```

### Step 5: Export to GLTF
```
- Replace all material nodes with single Image Texture → baked map
- Remove all lights from export (they're baked now)
- Enable backface culling on wall materials (performance + peek-in effect)
- Export GLTF with Draco compression
- DO NOT export vertex colors (causes black mesh bug)
```

### Step 6: Load in R3F
```tsx
import { useGLTF } from '@react-three/drei'

function ControlRoom() {
  const { scene } = useGLTF('/models/control-room.glb')
  return <primitive object={scene} />
}
```

### Step 7: Convert to JSX Component (optional, for customization)
```bash
npx gltfjsx public/models/control-room.glb --transform --types
```
This generates a typed React component where each mesh is individually addressable — crucial for making screens interactive.

---

## gltfjsx Workflow (for customizable scenes)

The `gltfjsx` tool (by pmndrs) converts a GLTF file into a React component:

```bash
# Install
npm install -g gltfjsx

# Convert model to React component
npx gltfjsx control-room.glb --transform --types --draco

# Output: ControlRoom.tsx — a React component where every mesh is a <mesh> element
```

**What this gives us:**
```tsx
// Generated by gltfjsx
export function ControlRoom(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/control-room.glb')
  return (
    <group {...props}>
      <mesh geometry={nodes.Floor.geometry} material={materials.Floor} />
      <mesh geometry={nodes.MainConsole.geometry} material={materials.Console} />
      <mesh geometry={nodes.Screen_01.geometry} material={materials.Screen}>
        {/* We can replace this material with a live texture! */}
      </mesh>
      <mesh geometry={nodes.Screen_02.geometry} material={materials.Screen} />
      {/* ... all other meshes individually addressable */}
    </group>
  )
}
```

**Why this matters for LCL:**
- We can replace screen materials with LIVE React content via Drei's `<Html>` component
- We can add hover interactions to specific objects
- We can animate individual elements (blinking LEDs, screen glitches)
- We can swap materials at runtime (e.g., highlight a console on hover)

---

## Live Screen Content Strategy

basement.studio shows their work on the TVs in their 3D room. We show our missions on control room screens.

### Option A: Drei `<Html>` Component (easiest, best for text)
```tsx
<mesh geometry={nodes.MainScreen.geometry}>
  <Html transform position={[0, 0, 0.01]} scale={0.1}>
    <div className="w-[400px] h-[300px] bg-black text-amber-500 font-mono p-4">
      <h2>MSN-001: TALISMAN</h2>
      <p>Status: OPERATIONAL</p>
      <p>Revenue: Growing</p>
    </div>
  </Html>
</mesh>
```

### Option B: Render to Texture (better visual integration)
```tsx
import { RenderTexture, Text } from '@react-three/drei'

<mesh geometry={nodes.MainScreen.geometry}>
  <meshBasicMaterial>
    <RenderTexture attach="map">
      <color attach="background" args={['#0a0a0a']} />
      <Text color="#f59e0b" fontSize={0.5}>TALISMAN</Text>
      <Text color="#22c55e" fontSize={0.3} position={[0,-0.5,0]}>OPERATIONAL</Text>
    </RenderTexture>
  </meshBasicMaterial>
</mesh>
```

### Option C: Video/Canvas Texture (most performant for complex content)
Pre-render screen content as a video or canvas, apply as texture. Best for complex dashboards without impacting 3D performance.

---

## Post-Processing (the "film quality" layer)

Using basement.studio's own `@basementstudio/shader-lab` OR simpler alternatives:

### Simple approach (no WebGPU dependency):
```tsx
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'

<EffectComposer>
  <Bloom intensity={0.5} luminanceThreshold={0.8} /> {/* Glow on emissives */}
  <Noise opacity={0.05} /> {/* Film grain */}
  <Vignette darkness={0.7} /> {/* Dark edges */}
</EffectComposer>
```

### Advanced approach (with shader-lab, requires WebGPU):
```tsx
import { ShaderLabComposition } from '@basementstudio/shader-lab'
// Use their editor to compose effects, export config
```

---

## Scroll Integration (basement.studio's approach)

Using their `@basementstudio/scrollytelling` library:

```tsx
import { Scrollytelling, Animation } from '@basementstudio/scrollytelling'

<Scrollytelling>
  {/* 3D scene stays fixed, camera moves slightly on scroll */}
  <Animation
    tween={{
      target: cameraRef.current.position,
      to: { z: -2 }, // dolly forward into room
      duration: 0.3, // 30% of scroll
    }}
  />
  
  {/* At 40% scroll, 2D content begins overlaying */}
  <Animation
    tween={{
      target: overlayRef.current,
      to: { opacity: 1 },
      start: 0.4,
      duration: 0.2,
    }}
  />
</Scrollytelling>
```

OR simpler with raw GSAP ScrollTrigger (which basement.studio actually uses for their own site):

```tsx
useEffect(() => {
  gsap.to(camera.position, {
    z: -2,
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top top',
      end: '30% top',
      scrub: true,
    }
  })
}, [])
```

---

## Final Implementation Phases (Revised)

### Phase 0: Asset Acquisition (Day 1)
- [ ] Download CGTrader control room (.blend + .gltf)
- [ ] Download Sketchfab low-poly control room as backup
- [ ] Download NASA JSC model for reference
- [ ] Install: gltfjsx, @react-three/fiber, drei, gsap, tailwind

### Phase 1: Blender Prep (Day 1-2)
- [ ] Open CGTrader .blend in Blender
- [ ] Re-light with amber warm practicals (match LCL palette)
- [ ] Add/swap objects for LCL identity (screens, mission clock, branding)
- [ ] Set camera to "looking into room" angle
- [ ] Bake lighting (Combined, 4096x4096, 128 samples + denoise)
- [ ] Export optimized GLTF (<5MB target)

### Phase 2: R3F Foundation (Day 2-3)
- [ ] `npx gltfjsx` → generate ControlRoom.tsx component
- [ ] Basic R3F canvas rendering the room
- [ ] Camera positioned to match basement.studio's "peek in" angle
- [ ] Post-processing: bloom + noise + vignette
- [ ] Verify: does it FEEL like basement.studio in quality?

### Phase 3: Scroll Integration (Day 3-4)
- [ ] GSAP ScrollTrigger: slight camera dolly on scroll
- [ ] At scroll threshold: 2D content fades in below/over
- [ ] Bold typography sections (basement.studio style)
- [ ] Smooth transition between 3D hero and 2D content

### Phase 4: Interactivity (Day 4-5)
- [ ] Screen content: `<Html>` or RenderTexture showing mission data
- [ ] Hover on central display: subtle glow/animation
- [ ] "Scroll to Explore" prompt
- [ ] Loading state while model downloads

### Phase 5: 2D Sections (Day 5-6)
- [ ] Bold statement section (massive white text)
- [ ] Mission cards
- [ ] Capabilities grid
- [ ] CTA + footer

### Phase 6: Polish (Day 6-7)
- [ ] Mobile fallback (static rendered image of room)
- [ ] Performance optimization (lazy load 3D, progressive reveal)
- [ ] Cross-browser test
- [ ] Lighthouse audit
- [ ] Deploy to Vercel

---

## Risk Mitigation

| Risk | Mitigation |
|---|---|
| CGTrader model doesn't look right | Backup: Sketchfab low-poly control room already has the right mood |
| Baked lighting looks bad | Follow tchayen.com tutorial exactly. Test at low samples first. |
| GLTF too large for web | Draco compression + texture downscale + mesh merging |
| WebGL not supported | CSS fallback with static render of the room (screenshot from Blender) |
| Screens hard to make interactive | Start with static textures, upgrade to Html/RenderTexture later |
| Doesn't feel "basement.studio quality" | The quality comes from LIGHTING. If bake is good, result is good. |

---

## Key Principle

> basement.studio's quality comes from ONE thing: **beautifully baked lighting in Blender.**
> 
> The 3D scene itself is not complex. The shaders are not exotic.
> The models are not high-poly. What makes it look incredible is that
> a skilled lighter set up warm practicals in Blender, baked them at
> high samples, denoised, and exported. The GPU just displays the result.
>
> Our job: get a decent room model, re-light it beautifully in amber,
> bake it, and let the baked quality do the heavy lifting.
