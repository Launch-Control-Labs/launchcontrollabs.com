export interface ModelTransform {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

export const SCENE_POSITIONS: Record<string, ModelTransform> = {
  shuttle: {
    position: [5, 0, 0],
    rotation: [-Math.PI / 2, Math.PI, 0],
    scale: 2.5,
  },

  earth: {
    position: [10, 35, -40],
    rotation: [0, 0, -0.2],
    scale: 20,
  },

  astronaut: {
    position: [5, 43, 2],
    rotation: [0.1, 0.3, 0],
    scale: 6,
  },
} as const
