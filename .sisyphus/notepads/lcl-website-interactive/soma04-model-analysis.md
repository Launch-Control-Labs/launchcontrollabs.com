# Soma04 Spaceship Interior — GLTF Model Analysis

**Extraction Date:** 2026-05-26  
**Source:** ~/Downloads/soma04_spaceship_low_poly_-_interior.zip  
**Extracted To:** /tmp/soma04-model/  
**Model Format:** glTF 2.0 (Sketchfab export)

---

## 1. ASSET METADATA

| Field | Value |
|-------|-------|
| **glTF Version** | 2.0 |
| **Generator** | Sketchfab-12.66.0 |
| **Author** | L_Krajewski (https://sketchfab.com/L_Krajewski) |
| **License** | CC-BY-4.0 |
| **Source URL** | https://sketchfab.com/3d-models/soma04-spaceship-low-poly-interior-843361ad169040fba19fe8758f5bd396 |
| **Title** | Soma04 spaceship low poly - interior |

---

## 2. SCENE HIERARCHY

```
Sketchfab_Scene (root)
└── Sketchfab_model (node[0])
    └── wewnatrz do sfaba.obj.cleaner.gles (node[1])
        ├── Object_2 (node[2]) → mesh[0]
        ├── Object_3 (node[3]) → mesh[1]
        ├── Object_4 (node[4]) → mesh[2]
        └── Object_5 (node[5]) → mesh[3]
```

**Key Finding:** All geometry is under a single parent node. No complex hierarchy.

---

## 3. MESH INVENTORY

| Mesh ID | Name | Primitives | Vertices | Triangles | Material | Attributes | Size |
|---------|------|-----------|----------|-----------|----------|-----------|------|
| 0 | Object_0 | 1 | 5,610 | 6,678 | Space_ship | POSITION, NORMAL, TANGENT, TEXCOORD_0 | 349.42 KB |
| 1 | Object_1 | 1 | 6,825 | 8,093 | Space_ship_chair_screens_lamps | POSITION, NORMAL, TANGENT, TEXCOORD_0 | 470.36 KB |
| 2 | Object_2 | 1 | 25,356 | 22,812 | Space_ship_interior_base | POSITION, NORMAL, TANGENT, TEXCOORD_0 | 1.4 MB |
| 3 | Object_3 | 1 | 1,870 | 1,952 | Space_ship_phone_and_speed_control | POSITION, NORMAL, TANGENT, TEXCOORD_0 | 116.14 KB |

**Total Geometry:** 122,187 render vertices | 38,467 upload vertices

**Attribute Coverage:**
- ✅ POSITION: All meshes
- ✅ NORMAL: All meshes
- ✅ TANGENT: All meshes (for normal mapping)
- ✅ TEXCOORD_0: All meshes (primary UV)
- ❌ TEXCOORD_1 (UV2): **NOT PRESENT** — no secondary UV channel
- ❌ COLOR: Not present

---

## 4. MATERIAL INVENTORY

### Material 0: Space_ship
- **Used By:** Mesh 0 (Object_0)
- **Base Color:** [1, 1, 1, 1] (white, fully opaque)
- **Textures:**
  - baseColorTexture: Space_ship_baseColor.png (4096×4096, 7.9 MB)
  - normalTexture: Space_ship_normal.png (4096×4096, 13 MB)
  - metallicRoughnessTexture: Space_ship_metallicRoughness.png (4096×4096, 9.5 MB)
  - occlusionTexture: Space_ship_metallicRoughness.png (packed)
- **Emissive:** None (emissiveFactor = [0, 0, 0])
- **Alpha Mode:** OPAQUE
- **Double Sided:** ✓ Yes

### Material 1: Space_ship_chair_screens_lamps ⭐ **EMISSIVE**
- **Used By:** Mesh 1 (Object_1)
- **Base Color:** [1, 1, 1, 1] (white, fully opaque)
- **Textures:**
  - baseColorTexture: Space_ship_chair_screens_lamps_baseColor.png (4096×4096, 6.3 MB)
  - normalTexture: Space_ship_chair_screens_lamps_normal.png (4096×4096, 10 MB)
  - metallicRoughnessTexture: Space_ship_chair_screens_lamps_metallicRoughness.png (4096×4096, 8.3 MB)
  - **emissiveTexture:** Space_ship_chair_screens_lamps_emissive.png (4096×4096, 829 KB) ⭐
  - occlusionTexture: Space_ship_chair_screens_lamps_metallicRoughness.png (packed)
- **Emissive Factor:** [0.6, 0.6, 0.6] (60% brightness)
- **Alpha Mode:** OPAQUE
- **Double Sided:** ✓ Yes

### Material 2: Space_ship_interior_base
- **Used By:** Mesh 2 (Object_2) — **LARGEST MESH**
- **Base Color:** [1, 1, 1, 1] (white, fully opaque)
- **Textures:**
  - baseColorTexture: Space_ship_interior_base_baseColor.png (4096×4096, 8.2 MB)
  - normalTexture: Space_ship_interior_base_normal.png (4096×4096, 11 MB)
  - metallicRoughnessTexture: Space_ship_interior_base_metallicRoughness.png (4096×4096, 12 MB)
  - occlusionTexture: Space_ship_interior_base_metallicRoughness.png (packed)
- **Emissive:** None (emissiveFactor = [0, 0, 0])
- **Alpha Mode:** OPAQUE
- **Double Sided:** ✓ Yes

### Material 3: Space_ship_phone_and_speed_control
- **Used By:** Mesh 3 (Object_3) — **SMALLEST MESH**
- **Base Color:** [1, 1, 1, 1] (white, fully opaque)
- **Textures:**
  - baseColorTexture: Space_ship_phone_and_speed_control_baseColor.png (2048×2048, 1.0 MB)
  - normalTexture: Space_ship_phone_and_speed_control_normal.png (2048×2048, 2.1 MB)
  - metallicRoughnessTexture: Space_ship_phone_and_speed_control_metallicRoughness.png (2048×2048, 2.5 MB)
  - occlusionTexture: Space_ship_phone_and_speed_control_metallicRoughness.png (packed)
- **Emissive:** None (emissiveFactor = [0, 0, 0])
- **Alpha Mode:** OPAQUE
- **Double Sided:** ✓ Yes

---

## 5. BOUNDING BOX & COORDINATE SYSTEM

### Overall Scene Bounding Box
```
Min: [-311.009, -311.009, -0.0]
Max: [311.009, 311.009, 1096.928]
Size: [622.019, 622.019, 1096.929]
```

### Coordinate System Analysis
- **X-axis:** ±311 units (horizontal, symmetric)
- **Y-axis:** ±311 units (horizontal, symmetric)
- **Z-axis:** 0 to 1096.928 units (vertical, **Z-UP**)

**Conclusion:** Model uses **Z-UP** coordinate system (standard for Blender/Sketchfab exports).
- X = left/right
- Y = forward/backward
- Z = up/down (height)

**For Three.js Integration:** No rotation needed if using `THREE.AxesHelper()` with Z-up. If target is Y-up (Three.js default), apply 90° rotation around X-axis.

---

## 6. TEXTURE INVENTORY

| Texture | Resolution | File Size | Slot | Material(s) |
|---------|-----------|-----------|------|------------|
| Space_ship_baseColor.png | 4096×4096 | 7.9 MB | baseColorTexture | Material 0 |
| Space_ship_normal.png | 4096×4096 | 13 MB | normalTexture | Material 0 |
| Space_ship_metallicRoughness.png | 4096×4096 | 9.5 MB | metallicRoughness + occlusion | Material 0 |
| Space_ship_chair_screens_lamps_baseColor.png | 4096×4096 | 6.3 MB | baseColorTexture | Material 1 |
| Space_ship_chair_screens_lamps_normal.png | 4096×4096 | 10 MB | normalTexture | Material 1 |
| Space_ship_chair_screens_lamps_metallicRoughness.png | 4096×4096 | 8.3 MB | metallicRoughness + occlusion | Material 1 |
| **Space_ship_chair_screens_lamps_emissive.png** | 4096×4096 | **829 KB** | **emissiveTexture** | **Material 1** ⭐ |
| Space_ship_interior_base_baseColor.png | 4096×4096 | 8.2 MB | baseColorTexture | Material 2 |
| Space_ship_interior_base_normal.png | 4096×4096 | 11 MB | normalTexture | Material 2 |
| Space_ship_interior_base_metallicRoughness.png | 4096×4096 | 12 MB | metallicRoughness + occlusion | Material 2 |
| Space_ship_phone_and_speed_control_baseColor.png | 2048×2048 | 1.0 MB | baseColorTexture | Material 3 |
| Space_ship_phone_and_speed_control_normal.png | 2048×2048 | 2.1 MB | normalTexture | Material 3 |
| Space_ship_phone_and_speed_control_metallicRoughness.png | 2048×2048 | 2.5 MB | metallicRoughness + occlusion | Material 3 |

**Total Texture Memory:** ~111 MB (disk) → ~358 MB GPU (uncompressed)

**Texture Strategy:**
- 4 materials × 3 texture slots (base, normal, metallic) = 12 textures
- Material 1 has bonus emissive texture (screens/lamps glow)
- Material 3 uses lower resolution (2K vs 4K) — detail level appropriate for small geometry

---

## 7. GEOMETRY BREAKDOWN BY COMPONENT

| Component | Mesh | Vertices | Triangles | Material | Purpose |
|-----------|------|----------|-----------|----------|---------|
| Main hull | Object_0 | 5,610 | 6,678 | Space_ship | Outer spaceship structure |
| Chairs, screens, lamps | Object_1 | 6,825 | 8,093 | Space_ship_chair_screens_lamps | Interior seating + control panels + lighting |
| Interior base/walls | Object_2 | 25,356 | 22,812 | Space_ship_interior_base | Largest component — walls, floor, ceiling |
| Phone + speed control | Object_3 | 1,870 | 1,952 | Space_ship_phone_and_speed_control | Small detail objects |

---

## 8. KEY FINDINGS FOR TASK 1 (Mesh Map)

### Mesh Node Names (for mesh-map keys)
```javascript
{
  "Object_0": "Space_ship",
  "Object_1": "Space_ship_chair_screens_lamps",
  "Object_2": "Space_ship_interior_base",
  "Object_3": "Space_ship_phone_and_speed_control"
}
```

### Bounding Box (for camera path in Task 4)
```javascript
{
  "min": [-311.009, -311.009, -0.0],
  "max": [311.009, 311.009, 1096.928],
  "size": [622.019, 622.019, 1096.929],
  "center": [0, 0, 548.464]
}
```

### Coordinate System
- **Up-Axis:** Z (not Y)
- **Handedness:** Right-handed (standard glTF)
- **Rotation for Three.js Y-up:** 90° around X-axis (if needed)

### Emissive Material
- **Material Name:** Space_ship_chair_screens_lamps
- **Emissive Texture:** Space_ship_chair_screens_lamps_emissive.png
- **Emissive Factor:** [0.6, 0.6, 0.6]
- **Use Case:** Screen glow, lamp illumination

### UV Channels
- **TEXCOORD_0:** ✅ Present on all meshes (primary UV)
- **TEXCOORD_1 (UV2):** ❌ **NOT PRESENT** — no secondary UV channel available

---

## 9. PERFORMANCE METRICS

| Metric | Value |
|--------|-------|
| Total Render Vertices | 122,187 |
| Total Upload Vertices | 38,467 |
| Total Triangles | ~40,000 |
| Mesh Count | 4 |
| Material Count | 4 |
| Texture Count | 13 |
| Total Texture Memory (GPU) | ~358 MB |
| Model File Size (scene.bin) | 2.3 MB |
| glTF File Size (scene.gltf) | 12 KB |
| Animations | None |
| Extensions Used | None |

**Assessment:** Low-poly model suitable for real-time web rendering. Texture memory is the bottleneck; consider LOD or texture atlasing for mobile.

---

## 10. NEXT STEPS FOR INTEGRATION

### Task 1 (Mesh Map)
- Use mesh names: Object_0, Object_1, Object_2, Object_3
- Map to materials: Space_ship, Space_ship_chair_screens_lamps, Space_ship_interior_base, Space_ship_phone_and_speed_control

### Task 2 (Material Customization)
- Material 1 (Space_ship_chair_screens_lamps) is the emissive target
- Emissive texture is already baked; can adjust emissiveFactor in code

### Task 3 (Lighting)
- Model is Z-up; ensure camera/lights account for this
- Emissive material provides self-illumination for screens/lamps

### Task 4 (Camera Path)
- Bounding box center: [0, 0, 548.464]
- Bounding box size: [622, 622, 1097]
- Recommended camera distance: ~1000 units from center
- Recommended camera height range: 0–1100 units (Z-axis)

---

## 11. EXTRACTION ARTIFACTS

- **Extracted Location:** /tmp/soma04-model/
- **Files:**
  - scene.gltf (12 KB) — JSON structure
  - scene.bin (2.3 MB) — Binary geometry + animation data
  - textures/ (13 PNG files, ~111 MB total)
  - license.txt (CC-BY-4.0)

**Ready for:** Copy to project public/ directory and integrate into Three.js scene.

---

**Analysis Complete** ✅  
Generated: 2026-05-26 21:35 UTC
