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
    position: [0, 0, 0],      // BASE position — actual Y driven by scroll in JourneyScene
    rotation: [-Math.PI / 2, 0, 0],  // nose UP (proven correct from prior work)
    scale: 2.5,
  },

  earth: {
    position: [10, 38, -60],   // Background at beat 4 (shuttle+earth shot)
    rotation: [0, 0, -0.2],    // slight tilt
    scale: 15,
  },

  planets: {
    position: [15, 32, -30],   // Beat 3 (space cruise) — will drift on Z
    rotation: [0, 0.2, 0],
    scale: 0.5,
  },

  astronaut: {
    position: [0, 42, -5],     // Beats 5-6 — near camera path endpoint
    rotation: [0.1, 0.3, 0],
    scale: 1.2,
  },
} as const
