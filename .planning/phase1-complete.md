# LCL — Phase 1 COMPLETE ✅
## Pipeline Proven (2026-05-25)

### What's Rendering at localhost:3001/prototype

A 3D control room scene with:
- Amber-glowing screens (selective bloom via toneMapped=false + emissiveIntensity > 1)
- Green keyboard LED indicators
- Dark blue console bodies
- Film grain + vignette post-processing
- OrbitControls for exploration

### What Works End-to-End
1. ✅ NASA GLTF model loads via useGLTF
2. ✅ Material traversal + runtime override by semantic name
3. ✅ Selective bloom (only emissive meshes glow)
4. ✅ Post-processing stack (Bloom + Noise + Vignette)
5. ✅ Next.js 16 + React 19 + R3F 9.6.1 — zero conflicts
6. ✅ Dynamic import with ssr: false — correct pattern
7. ✅ ACESFilmicToneMapping for cinematic color
8. ✅ Build passes (`pnpm build` exits 0)

### What's Clearly Needed for Production
- **Better model:** NASA model is 180KB vertex-colored flat geometry. Need Dyonos (56K verts) or CGTrader model.
- **Baked lighting:** Current look is "flat geometry + emissive glow." Baked lightmaps would add the warmth, bounce light, and volumetric depth that basement.studio has.
- **Camera angle:** Need to match basement.studio's "peering into the room" composition
- **Scroll integration:** GSAP ScrollTrigger for camera dolly + transition to 2D
- **Screen content:** Drei `<Html>` for live mission data overlays

### Next Steps (Phase 2)
1. Log into Sketchfab → download Dyonos model → replace NASA model
2. Install Blender (`brew install --cask blender`) → re-light model with amber → bake
3. Add GSAP scroll → camera dolly on scroll
4. Add screen interactivity via `<Html>` from drei
5. Build the 2D sections below the 3D hero
