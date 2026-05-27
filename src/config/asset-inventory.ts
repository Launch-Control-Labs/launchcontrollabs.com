/**
 * Asset Inventory - Typed metadata for all 3D models
 * Generated: 2025-05-27
 * 
 * Narrative Beat Mapping:
 * Beat 1 (Pre-Launch): Shuttle on pad, engines igniting
 * Beat 2 (Ascent): Camera rises, drifting astronaut (lost = the problem)
 * Beat 3 (Orbit): Earth visible below, stable orbit achieved
 * Beat 4 (Constellation): Mission nodes as planets in a network
 * Beat 5 (Deep Space): Saturn V (heritage), purposeful astronaut
 * Beat 6 (CTA): Earth from orbit, peaceful
 */

export interface ModelMeta {
  path: string
  fileSize: number  // bytes
  hasAnimations: boolean
  beat: number  // 1-6, or 0 for non-narrative models
  description: string
}

export const ASSET_INVENTORY: ModelMeta[] = [
  // Beat 1: Pre-Launch (Shuttle on pad)
  {
    path: '/models/optimized/space-shuttle.glb',
    fileSize: 497224,
    hasAnimations: false,
    beat: 1,
    description: 'Space shuttle on launch pad (optimized)',
  },
  {
    path: '/models/shuttle-atlantis.glb',
    fileSize: 13473280,
    hasAnimations: false,
    beat: 1,
    description: 'Shuttle Atlantis - detailed launch pad scene',
  },

  // Beat 2: Ascent (Drifting astronaut - lost in space metaphor)
  {
    path: '/models/optimized/drifting-astronaut.glb',
    fileSize: 408852,
    hasAnimations: true,
    beat: 2,
    description: 'Drifting astronaut animation (optimized)',
  },
  {
    path: '/models/drifting-astronaut.glb',
    fileSize: 7433688,
    hasAnimations: true,
    beat: 2,
    description: 'Drifting astronaut - lost in space (full quality)',
  },

  // Beat 3: Orbit (Earth visible, stable orbit achieved)
  {
    path: '/models/optimized/earth.glb',
    fileSize: 805464,
    hasAnimations: false,
    beat: 3,
    description: 'Earth from orbit (optimized)',
  },
  {
    path: '/models/earth.glb',
    fileSize: 23342728,
    hasAnimations: false,
    beat: 3,
    description: 'Earth - full detail for orbit view',
  },

  // Beat 6: CTA (Earth from orbit, peaceful)
  {
    path: '/models/optimized/earth.glb',
    fileSize: 786432,
    hasAnimations: false,
    beat: 6,
    description: 'Earth from stable orbit — CTA section peaceful view (reuses Beat 3 model)',
  },

  // Beat 4: Constellation (Mission nodes as planets)
  {
    path: '/models/optimized/various-planets.glb',
    fileSize: 2030448,
    hasAnimations: false,
    beat: 4,
    description: 'Various planets for constellation network (optimized)',
  },
  {
    path: '/models/various-planets.glb',
    fileSize: 34890992,
    hasAnimations: false,
    beat: 4,
    description: 'Various planets - full detail for constellation',
  },
  {
    path: '/models/mercury.glb',
    fileSize: 3571532,
    hasAnimations: false,
    beat: 4,
    description: 'Mercury - additional planet for constellation',
  },

  // Beat 5: Deep Space (Saturn V heritage + purposeful astronaut)
  {
    path: '/models/optimized/apollo-saturn-v.glb',
    fileSize: 385428,
    hasAnimations: false,
    beat: 5,
    description: 'Apollo Saturn V rocket (optimized)',
  },
  {
    path: '/models/apollo-saturn-v.glb',
    fileSize: 705612,
    hasAnimations: false,
    beat: 5,
    description: 'Apollo Saturn V - heritage rocket',
  },
  {
    path: '/models/floating-astronaut.glb',
    fileSize: 20250184,
    hasAnimations: true,
    beat: 5,
    description: 'Floating astronaut - purposeful, animated',
  },

  // Beat 6: CTA (Earth from orbit, peaceful)
  // Reuses earth.glb from Beat 3

  // Supporting/Atmospheric Models (beat = 0, not part of narrative sequence)
  {
    path: '/models/animated-astronaut.glb',
    fileSize: 20250184,
    hasAnimations: true,
    beat: 0,
    description: 'Animated astronaut - general use',
  },
  {
    path: '/models/astronaut-hero.glb',
    fileSize: 31988748,
    hasAnimations: false,
    beat: 0,
    description: 'Hero astronaut model - high detail',
  },
  {
    path: '/models/astronaut-v2.glb',
    fileSize: 31988748,
    hasAnimations: false,
    beat: 0,
    description: 'Astronaut v2 variant',
  },
  {
    path: '/models/astronaut-converted.glb',
    fileSize: 21864152,
    hasAnimations: false,
    beat: 0,
    description: 'Astronaut converted format',
  },
  {
    path: '/models/optimized/astronaut-converted.glb',
    fileSize: 4560088,
    hasAnimations: false,
    beat: 0,
    description: 'Astronaut converted (optimized)',
  },
  {
    path: '/models/astronaut.glb',
    fileSize: 3923512,
    hasAnimations: false,
    beat: 0,
    description: 'Astronaut base model',
  },
  {
    path: '/models/drifting-astronaut-hd.glb',
    fileSize: 7433688,
    hasAnimations: true,
    beat: 0,
    description: 'Drifting astronaut HD variant',
  },
  {
    path: '/models/drifting-astronaut-hq.glb',
    fileSize: 7433688,
    hasAnimations: true,
    beat: 0,
    description: 'Drifting astronaut HQ variant',
  },
  {
    path: '/models/evanescent-smoke.glb',
    fileSize: 18722636,
    hasAnimations: false,
    beat: 0,
    description: 'Evanescent smoke effect',
  },
  {
    path: '/models/falcon-9.glb',
    fileSize: 34891744,
    hasAnimations: false,
    beat: 0,
    description: 'Falcon 9 rocket',
  },
  {
    path: '/models/space-shuttle-oriented.glb',
    fileSize: 13469952,
    hasAnimations: false,
    beat: 0,
    description: 'Space shuttle oriented variant',
  },
  {
    path: '/models/space-shuttle.glb',
    fileSize: 13473280,
    hasAnimations: false,
    beat: 0,
    description: 'Space shuttle base model',
  },
  {
    path: '/models/skybox.glb',
    fileSize: 8511488,
    hasAnimations: false,
    beat: 0,
    description: 'Skybox environment',
  },
  {
    path: '/models/smoke.glb',
    fileSize: 18722636,
    hasAnimations: false,
    beat: 0,
    description: 'Smoke effect',
  },
]

/**
 * Recommended models for narrative sequence (beats 1-6)
 * These are the core models used in the launch-to-orbit story
 */
export const RECOMMENDED_MODELS = ASSET_INVENTORY.filter(m => m.beat > 0)

/**
 * Total size of recommended narrative models (in bytes)
 * Target: < 8MB for optimal performance
 */
export const TOTAL_RECOMMENDED_SIZE = RECOMMENDED_MODELS.reduce((sum, m) => sum + m.fileSize, 0)

/**
 * Beat-to-model mapping for narrative sequence
 */
export const BEAT_MODEL_MAP: Record<number, ModelMeta[]> = {
  1: RECOMMENDED_MODELS.filter(m => m.beat === 1),
  2: RECOMMENDED_MODELS.filter(m => m.beat === 2),
  3: RECOMMENDED_MODELS.filter(m => m.beat === 3),
  4: RECOMMENDED_MODELS.filter(m => m.beat === 4),
  5: RECOMMENDED_MODELS.filter(m => m.beat === 5),
  6: RECOMMENDED_MODELS.filter(m => m.beat === 6),
}

/**
 * Models with animations (for performance optimization)
 */
export const ANIMATED_MODELS = ASSET_INVENTORY.filter(m => m.hasAnimations)

/**
 * Summary statistics
 */
export const ASSET_STATS = {
  totalModels: ASSET_INVENTORY.length,
  recommendedModels: RECOMMENDED_MODELS.length,
  animatedModels: ANIMATED_MODELS.length,
  totalRecommendedSizeBytes: TOTAL_RECOMMENDED_SIZE,
  totalRecommendedSizeMB: (TOTAL_RECOMMENDED_SIZE / (1024 * 1024)).toFixed(2),
  totalAllSizeBytes: ASSET_INVENTORY.reduce((sum, m) => sum + m.fileSize, 0),
  totalAllSizeMB: (ASSET_INVENTORY.reduce((sum, m) => sum + m.fileSize, 0) / (1024 * 1024)).toFixed(2),
}
