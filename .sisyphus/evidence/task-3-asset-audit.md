# 3D Asset Audit Report

**Date:** 2026-05-27  
**Project:** launchcontrollabs.com  
**Budget:** <5MB file size, <50K faces, max texture 1024x1024

---

## Full Model Inventory

| # | Filename | File Size | Faces (triangles) | Textures | Max Resolution | Generator |
|---|----------|-----------|-------------------|----------|----------------|-----------|
| 1 | falcon-9.glb | 33MB | ~240K | 10 | 2048x2048 | Sketchfab | 
| 2 | various-planets.glb | 33MB | 13,680 | 27 | 1024x1024 | Sketchfab |
| 3 | astronaut-v2.glb | 31MB | ~58K | 10 | 1024x1024 | Sketchfab |
| 4 | earth.glb | 22MB | 32,256 | 6 | 4096x2048 | Sketchfab |
| 5 | astronaut-converted.glb | 21MB | ~58K | 10 | 1024x1024 | gltf-transform |
| 6 | floating-astronaut.glb | 19MB | ~58K | — | — | Sketchfab |
| 7 | smoke.glb | 18MB | — | — | — | — |
| 8 | space-shuttle.glb | 13MB | ~240K | 10 | 2048x2048 | Sketchfab |
| 9 | space-shuttle-oriented.glb | 13MB | ~240K | 10 | 2048x2048 | Sketchfab |
| 10 | skybox.glb | 8.1MB | — | — | — | — |
| 11 | drifting-astronaut.glb | 7.1MB | ~137K | 3 | 1024x512 | Sketchfab |
| 12 | astronaut.glb | 3.7MB | — | — | — | — |
| 13 | mercury.glb | 3.4MB | — | — | — | — |
| 14 | apollo-saturn-v.glb | 689KB | 64,177 | 3 | 512x512 | gltf-transform (Draco) |

---

## Models Required Per Section

| Section | Model | Purpose | Action |
|---------|-------|---------|--------|
| 1 (Hero) | falcon-9.glb + floating-astronaut.glb | Hero scene | SKIP (already in use) |
| 2 (Problem) | drifting-astronaut.glb | Drifting astronaut | COMPRESS |
| 3 (Guide) | space-shuttle.glb | Space shuttle | COMPRESS |
| 4 (Proof) | various-planets.glb | Planet system | COMPRESS |
| 5 (Authority) | apollo-saturn-v.glb | Saturn V rocket | COMPRESS |
| 6 (Orbit) | earth.glb | Earth globe | COMPRESS |
| N/A | astronaut-converted.glb | Converted astronaut | COMPRESS |

---

## Compression Results

### Before/After Comparison

| Model | Original Size | Optimized Size | Reduction | Original Faces | Optimized Faces |
|-------|--------------|----------------|-----------|----------------|-----------------|
| space-shuttle.glb | 13MB | 486KB | **96.4%** | ~240K | 47,559 |
| earth.glb | 22MB | 787KB | **96.5%** | 32,256 | 28,116 |
| various-planets.glb | 33MB | 1.9MB | **94.2%** | 13,680 | 13,680 |
| apollo-saturn-v.glb | 689KB | 376KB | **45.4%** | 64,177 | 46,835 |
| astronaut-converted.glb | 21MB | 4.3MB | **79.5%** | ~58K | 49,786 |
| drifting-astronaut.glb | 7.1MB | 399KB | **94.4%** | ~137K | 45,809 |

### Budget Compliance

| Model | Size ✅ (<5MB) | Faces ✅ (<50K) |
|-------|---------------|----------------|
| space-shuttle.glb | 486KB ✅ | 47,559 ✅ |
| earth.glb | 787KB ✅ | 28,116 ✅ |
| various-planets.glb | 1.9MB ✅ | 13,680 ✅ |
| apollo-saturn-v.glb | 376KB ✅ | 46,835 ✅ |
| astronaut-converted.glb | 4.3MB ✅ | 49,786 ✅ |
| drifting-astronaut.glb | 399KB ✅ | 45,809 ✅ |

**All models pass both constraints.**

---

## Compression Pipeline Applied

1. **Mesh Simplification** (gltf-transform simplify)
   - space-shuttle: ratio 0.15, error tolerance 0.01
   - apollo-saturn-v: ratio 0.75, error tolerance 0.01
   - astronaut-converted: ratio 0.59, error tolerance 0.01
   - drifting-astronaut: ratio 0.35, error tolerance 0.01
   - earth/various-planets: no pre-simplification needed (already under 50K faces)

2. **Full Optimization** (gltf-transform optimize)
   - Draco mesh compression (KHR_draco_mesh_compression)
   - WebP texture compression
   - Texture resize: 1024x1024 max (512x512 for various-planets due to 27 textures)
   - Vertex welding, deduplication, instancing, pruning

---

## Notes

- **Draco decoder** already available at `/public/draco/` — optimized models will require it
- **drifting-astronaut.glb** was sourced from `~/Downloads/drifting_astronaut.glb` and copied to `/public/models/`
- **apollo-saturn-v.glb** was already Draco-compressed in the original; re-optimization still reduced it further
- **various-planets.glb** required 512px textures due to 27 texture files totaling over 20MB uncompressed
- **Hero models** (falcon-9.glb, floating-astronaut.glb) intentionally NOT compressed — already in production use

---

## Output Location

Optimized models: `/public/models/optimized/`
