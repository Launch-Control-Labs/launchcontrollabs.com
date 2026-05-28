# LCL — Technology & Art Direction Analysis

## basement.studio's EXACT Stack (from their open-source repo)

Their website (`website-2k25`) is fully open-source. Here's their exact technology:

| Layer | Technology | Purpose |
|---|---|---|
| Framework | **Next.js 15.2** + React 19 | App foundation |
| 3D | **React Three Fiber** + Drei | Scene rendering |
| Physics | **React Three Rapier** | Basketball game physics |
| Shaders | **Custom GLSL** via `createGlobalShaderMaterial()` | The "look" |
| Scroll | **GSAP** (NOT their scrollytelling lib for this site) | Scroll → camera binding |
| State | **Zustand** | Global state |
| Styling | **Tailwind CSS** | UI |
| Animation | **Framer Motion** | UI animations |
| CMS | **Basehub** (their own CMS) | Dynamic content |
| Deploy | **Vercel** | Hosting |

## Their Art Style: "Stylized Realistic with Baked Lighting"

**What the art style IS:**
- **Blender-modeled room** with realistic proportions but slightly stylized materials
- **Baked lighting** (pre-computed in Blender, exported as lightmaps) — NOT real-time lighting
- **Emissive materials** for screens and neon signs (these glow without needing real-time lights)
- **Dark ambient** with warm pool lighting (the orange/amber from arcade, lamps, screens)
- **Low-poly-ISH geometry** but with enough detail to look "crafted" not cheap
- **PBR materials** on key objects (metal on stairs, wood texture on shelves)
- **Characters** are very low-poly/stylized (the guy sitting on stairs)
- **Noise/grain** post-processing for film-like quality

**What it is NOT:**
- NOT photorealistic (it's clearly stylized/designed)
- NOT low-poly (it has enough detail to feel substantial)  
- NOT real-time lit (performance comes from baked lightmaps)
- NOT procedurally generated (everything is hand-placed in Blender)

**The key insight on WHY it looks good:**
The entire visual quality comes from the **LIGHTING** in the Blender bake, not from complex shaders. The room is modeled simply, but lit beautifully with warm practicals (light sources visible in the scene — the arcade, the neon, ceiling lights). This is cinematography applied to 3D.

## Their Open-Source Libraries We Can Use

### 1. `@basementstudio/scrollytelling` (1.6k stars)
- Scroll-driven animations powered by GSAP
- Declarative React API
- Integrates with R3F for scroll → 3D camera binding
- **USE FOR**: Binding scroll position to camera movement in the control room

### 2. `@basementstudio/shader-lab` (542 stars)
- Portable shader composition runtime
- Post-processing effects: bloom, CRT, chromatic aberration, dithering, grain, halftone, etc.
- **USE FOR**: The film-grain/noise overlay that gives their site its cinematic quality
- ⚠️ Requires WebGPU — may need fallback for older browsers

### 3. `basementstudio/website-2k25` (240 stars)
- Their ACTUAL site source code
- Custom global shader material system
- Asset loading pipeline
- Camera navigation system
- **USE AS**: Reference implementation — study their shader code, camera system, asset loading

## 3D Assets Strategy

### Option A: Commission a Blender Artist (highest quality, 2-3 weeks)
- Brief a 3D artist on Fiverr/Upwork to model the "launch control room"
- Provide reference images (SpaceX control, ISS control, basement.studio's room as style reference)
- Export as GLTF with baked lightmaps
- Cost: $500-$2000 depending on detail level
- This is what basement.studio did — their room is custom-modeled

### Option B: Modify Existing Assets (medium quality, faster)
Available on Sketchfab (CC licensed or purchasable):
- **NASA JSC Mission Control Room** — real NASA model, available on data.nasa.gov (FREE, public domain)
- **"Mission Control Console" by TheoClarke** — retro 1970s NASA style (Sketchfab)
- **"Sci-Fi Control Room" by Terobi Studio** — free on CGTrader (GLTF format)
- **"Cyberpunk-X-Hub"** — Sketchfab, dark moody interior
- Various "sci-fi interior" models on Sketchfab with CC licenses

Strategy: Grab a base scene, modify it in Blender (re-light, add LCL-specific elements like custom screen content), bake lighting, export.

### Option C: Hybrid (recommended)
1. Start with the NASA JSC model or a Sketchfab base
2. Strip it down, re-compose with LCL-specific elements
3. Add custom emissive screens showing LCL mission data
4. Bake lighting in Blender with warm amber practicals
5. Export to GLTF
6. Overlay text/UI via Drei's `<Html>` component in 3D space

## Exact Implementation Plan

```
LCL Website Stack (matching basement.studio's approach):

Next.js 15 + React 19
├── @react-three/fiber (3D rendering)
├── @react-three/drei (Html, Environment, useGLTF, ContactShadows)
├── @basementstudio/scrollytelling (scroll → camera)
├── @basementstudio/shader-lab (post-processing: grain, bloom)  [if WebGPU available]
├── GSAP + ScrollTrigger (fallback scroll animations + 2D sections)
├── Tailwind CSS (2D sections typography)
├── Framer Motion (UI transitions)
├── Zustand (state: loading, navigation, interaction)
└── Vercel (deploy)

3D Pipeline:
Blender (model + bake lighting) → GLTF export → useGLTF in R3F → custom shader material for screens
```

## The Art Direction for LCL's Room

**Adapting basement.studio's style to "Launch Control":**

| basement.studio's Room | LCL's Control Room |
|---|---|
| Wooden bookshelves | Rack-mounted server equipment |
| Arcade machine (orange glow) | Main mission display (amber glow) |
| Neon "basement." sign | Subtle LCL logo on equipment/wall |
| Person sitting on stairs | Empty chair + headset (just missed the operator) |
| Old TVs showing work | Multiple flat screens showing mission status |
| Basketball hoop | Mission clock / countdown timer |
| Stairs going up | Rows of consoles going into depth |
| Books/collectibles on shelves | Notebooks, coffee, sticky notes on monitors |

**Lighting plan (the key to the look):**
- **Key light**: Amber glow from the central mission display (like the arcade is basement's key)
- **Fill**: Cool blue from secondary monitors
- **Accent**: Small green/red status LEDs scattered on equipment
- **Ambient**: Very low, almost no ambient — let the practicals do all the work
- **Post-processing**: Film grain + subtle bloom on emissives + vignette

This is how you get basement.studio's quality: **beautiful lighting baked in Blender, not real-time computation.**
