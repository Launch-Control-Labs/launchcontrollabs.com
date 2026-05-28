/**
 * Scene Positions — Static world-space positions for non-dynamic models.
 * 
 * NOTE: The shuttle uses position [0, 0, 0] as BASE — its actual Y is
 * computed dynamically in JourneyScene as scrollProgress * 50.
 * Earth, planets, and astronaut are pre-positioned in world space.
 */

export interface ModelTransform {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

export const SCENE_POSITIONS: Record<string, ModelTransform> = {
  shuttle: {
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
    scale: 2.5,
  },

  earth: {
    position: [0, 35, -40],
    rotation: [0, 0, -0.2],
    scale: 20,
  },

  astronaut: {
    position: [0, 43, 2],
    rotation: [0.1, 0.3, 0],
    scale: 6,
  },
} as const
