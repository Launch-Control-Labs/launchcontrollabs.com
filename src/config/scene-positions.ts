/**
 * Scene Positions — Hardcoded world-space positions for all narrative models.
 *
 * Positions are placed relative to camera waypoints (from camera-path.ts):
 *   Beat 1: camera [0,-5,10] → lookAt [0,20,-10]
 *   Beat 2: camera [0,30,5] → lookAt [0,50,-20]
 *   Beat 3: camera [0,80,20] → lookAt [0,60,-30]
 *   Beat 4: camera [20,100,40] → lookAt [0,80,0]
 *   Beat 5: camera [30,120,60] → lookAt [0,100,0]
 *   Beat 6: camera [0,150,80] → lookAt [0,0,0]
 */

export interface ModelTransform {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

export const SCENE_POSITIONS: Record<string, ModelTransform> = {
  /** Beat 1 — Shuttle on pad, positioned between camera and lookAt */
  shuttle: {
    position: [0, 0, -10],
    rotation: [0, 0, 0],
    scale: 1,
  },

  /** Beat 2 — Drifting astronaut, off to the left of camera path */
  driftingAstronaut: {
    position: [-8, 35, -5],
    rotation: [0.3, 0.5, 0.1],
    scale: 0.8,
  },

  /** Beat 3 — Earth visible below camera */
  earth: {
    position: [15, 75, -20],
    rotation: [0, 0, 0],
    scale: 5,
  },

  /** Beat 4 — Constellation of planets */
  planets: {
    position: [-10, 95, -15],
    rotation: [0, 0.2, 0],
    scale: 0.5,
  },

  /** Beat 5 — Saturn V heritage rocket */
  saturnV: {
    position: [25, 115, -10],
    rotation: [0, 0.3, 0],
    scale: 0.3,
  },

  /** Beat 6 — Earth from orbit (reuse earth model, different position/scale) */
  ctaEarth: {
    position: [0, 145, -30],
    rotation: [0, 0, 0],
    scale: 8,
  },
} as const
