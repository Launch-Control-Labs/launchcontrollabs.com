/**
 * mesh-map.ts — NASA JSC Control Room model mesh→material mapping
 *
 * Source of truth: Nasa-jsc-control-room.tsx (gltfjsx output)
 * GLB: public/models/nasa-jsc-control-room.glb
 *
 * Mesh node names are generic (0, 0_1, ... 0_44) because the model was
 * exported as a single merged object with multi-material splits.
 * Material names ARE semantic and used for interaction targeting.
 *
 * ---
 * basement.studio reference patterns (from basementstudio/website-2k25):
 *
 * 1. createGlobalShaderMaterial(baseMaterial, defines?)
 *    - Signature: (MeshStandardMaterial, { GLASS?, GODRAY?, LIGHT?, ... }) => ShaderMaterial
 *    - Wraps standard materials with custom vertex/fragment shaders
 *    - Supports lightMap, aoMap, metalness, roughness uniforms
 *    - File: src/shaders/material-global-shader/index.tsx
 *
 * 2. EXR Lightmap loading:
 *    - import { EXRLoader } from "three/examples/jsm/Addons.js"
 *    - const lightmap = useLoader(EXRLoader, lightmapPath)
 *    - lightmap.minFilter = THREE.NearestFilter
 *    - lightmap.magFilter = THREE.NearestFilter
 *    - Applied via lightMap uniform in global shader
 *
 * 3. Canvas gl config:
 *    - Uses @react-three/offscreen Canvas for loading scenes
 *    - Main canvas uses standard R3F Canvas with custom gl settings
 *    - Zustand stores for scene/navigation state
 */

// ─────────────────────────────────────────────────────────────────────────────
// MESH_MAP: Complete node→material lookup (45 mesh nodes)
// Derived directly from Nasa-jsc-control-room.tsx gltfjsx output
// ─────────────────────────────────────────────────────────────────────────────

export const MESH_MAP: Record<string, string> = {
  '0': 'Keyboards',
  '0_1': 'cabnet',
  '0_2': 'ceiling',
  '0_3': 'console_back',
  '0_4': 'console_body',
  '0_5': 'console_desk',
  '0_6': 'console_face',
  '0_7': 'console_nameplat',
  '0_8': 'console_namepla1',
  '0_9': 'console_namepla2',
  '0_10': 'console_namepla3',
  '0_11': 'console_namepla4',
  '0_12': 'console_namepla5',
  '0_13': 'console_namepla6',
  '0_14': 'console_namepla7',
  '0_15': 'console_namepla8',
  '0_16': 'console_namepla9',
  '0_17': 'console_namepl10',
  '0_18': 'console_namepl11',
  '0_19': 'console_namepl12',
  '0_20': 'console_namepl13',
  '0_21': 'console_namepl14',
  '0_22': 'console_namepl15',
  '0_23': 'crstation_1',
  '0_24': 'crstation_2',
  '0_25': 'edge',
  '0_26': 'far_right',
  '0_27': 'floor',
  '0_28': 'keyboard_special',
  '0_29': 'lights',
  '0_30': 'mid',
  '0_31': 'midle',
  '0_32': 'picture1',
  '0_33': 'picture2',
  '0_34': 'picture3',
  '0_35': 'picture4',
  '0_36': 'picture5',
  '0_37': 'picture6',
  '0_38': 'projector1',
  '0_39': 'right',
  '0_40': 'screen',
  '0_41': 'screens',
  '0_42': 'wall',
  '0_43': 'wall_screen',
  '0_44': 'wall_top',
} as const

// ─────────────────────────────────────────────────────────────────────────────
// GROUPS: Semantic grouping by material type for interaction targeting
// ─────────────────────────────────────────────────────────────────────────────

export const GROUPS = {
  /** Display screens — primary interaction targets for content overlay */
  SCREENS: Object.keys(MESH_MAP).filter((k) =>
    ['screen', 'screens', 'wall_screen'].includes(MESH_MAP[k])
  ),

  /** Console structure — body, desk, face, back, nameplates */
  CONSOLES: Object.keys(MESH_MAP).filter((k) =>
    MESH_MAP[k].startsWith('console')
  ),

  /** Keyboard meshes — tactile interaction targets */
  KEYBOARDS: Object.keys(MESH_MAP).filter((k) =>
    ['Keyboards', 'keyboard_special'].includes(MESH_MAP[k])
  ),

  /** Lighting fixtures — emissive elements for atmosphere control */
  LIGHTS: Object.keys(MESH_MAP).filter((k) =>
    ['lights', 'projector1'].includes(MESH_MAP[k])
  ),

  /** Crew stations — operator position zones */
  STATIONS: Object.keys(MESH_MAP).filter((k) =>
    ['crstation_1', 'crstation_2'].includes(MESH_MAP[k])
  ),

  /** Ambient/structural — walls, floor, ceiling, decorative (non-interactive) */
  AMBIENT: Object.keys(MESH_MAP).filter((k) =>
    [
      'wall',
      'wall_top',
      'floor',
      'ceiling',
      'edge',
      'far_right',
      'right',
      'mid',
      'midle',
      'cabnet',
      'picture1',
      'picture2',
      'picture3',
      'picture4',
      'picture5',
      'picture6',
    ].includes(MESH_MAP[k])
  ),
} as const

export type MeshGroup = keyof typeof GROUPS

// ─────────────────────────────────────────────────────────────────────────────
// INTERACTION CONFIG
// ─────────────────────────────────────────────────────────────────────────────

/** Groups that respond to hover/click events */
export const INTERACTIVE_GROUPS: MeshGroup[] = [
  'SCREENS',
  'CONSOLES',
  'KEYBOARDS',
  'LIGHTS',
  'STATIONS',
]

/** Reverse lookup: material name → mesh node keys */
export const MATERIAL_TO_MESHES: Record<string, string[]> = Object.entries(
  MESH_MAP
).reduce(
  (acc, [node, material]) => {
    if (!acc[material]) acc[material] = []
    acc[material].push(node)
    return acc
  },
  {} as Record<string, string[]>
)

/** Quick check: is a given mesh node interactive? */
export function isInteractive(nodeName: string): boolean {
  const material = MESH_MAP[nodeName]
  if (!material) return false
  return INTERACTIVE_GROUPS.some((group) => GROUPS[group].includes(nodeName))
}

/** Get the group a mesh belongs to (first match) */
export function getMeshGroup(nodeName: string): MeshGroup | null {
  for (const [group, nodes] of Object.entries(GROUPS)) {
    if (nodes.includes(nodeName)) return group as MeshGroup
  }
  return null
}
