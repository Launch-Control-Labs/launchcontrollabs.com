/**
 * Scene Positions — Hardcoded world-space positions for all narrative models.
 *
 * Models spread along Z-axis (depth) so they're naturally out of frustum
 * when camera is at a different beat. Camera moves forward through Z.
 */

export interface ModelTransform {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

export const SCENE_POSITIONS: Record<string, ModelTransform> = {
  shuttle: {
    position: [0, 5, -5],
    rotation: [0, Math.PI, 0],
    scale: 0.8,
  },

  driftingAstronaut: {
    position: [-6, 18, -5],
    rotation: [0.3, 0.5, 0.1],
    scale: 0.6,
  },

  earth: {
    position: [0, 10, -80],
    rotation: [0, 0, 0],
    scale: 12,
  },

  planets: {
    position: [15, 28, -40],
    rotation: [0, 0.2, 0],
    scale: 0.4,
  },

  saturnV: {
    position: [20, 35, -25],
    rotation: [0, -0.5, 0],
    scale: 0.25,
  },

  ctaEarth: {
    position: [0, 25, -100],
    rotation: [0, 0, 0],
    scale: 20,
  },
} as const
