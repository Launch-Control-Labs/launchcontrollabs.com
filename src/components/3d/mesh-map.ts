// mesh-map.ts — Soma04 Spaceship Interior model mesh→group mapping
// GLB: public/models/soma04-interior.glb
// Source: Sketchfab soma04-spaceship-low-poly-interior (CC-BY-4.0, L_Krajewski)
//
// GLTF node names (what Three.js exposes as child.name in scene.traverse):
//   Object_2 → Space_ship material          (outer hull)
//   Object_3 → Space_ship_chair_screens_lamps (screens + chairs + lamps — HAS EMISSIVE)
//   Object_4 → Space_ship_interior_base      (walls, floor, ceiling — largest mesh)
//   Object_5 → Space_ship_phone_and_speed_control (control panel details)
//
// Model coordinate system: Z-UP (Blender/Sketchfab export)
// Three.js rotation: rotation={[-Math.PI / 2, 0, 0]} on <primitive>
// Bounding box (Z-up): 622×622×1097 units, center at [0, 0, 548]

export const MESH_MAP: Record<string, string> = {
  Object_2: 'Space_ship',
  Object_3: 'Space_ship_chair_screens_lamps',
  Object_4: 'Space_ship_interior_base',
  Object_5: 'Space_ship_phone_and_speed_control',
} as const

export const GROUPS = {
  SCREENS:  ['Object_3'],
  CONTROLS: ['Object_5'],
  INTERIOR: ['Object_4'],
  HULL:     ['Object_2'],
} as const

export type MeshGroup = keyof typeof GROUPS

export const INTERACTIVE_GROUPS: MeshGroup[] = ['SCREENS', 'CONTROLS']

export function getMeshGroup(nodeName: string): MeshGroup | null {
  for (const [group, nodes] of Object.entries(GROUPS)) {
    if ((nodes as readonly string[]).includes(nodeName)) return group as MeshGroup
  }
  return null
}

export function isInteractive(nodeName: string): boolean {
  const group = getMeshGroup(nodeName)
  return group !== null && INTERACTIVE_GROUPS.includes(group)
}
