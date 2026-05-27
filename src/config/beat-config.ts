'use client'

export interface BeatConfig {
  scrollStart: number
  scrollEnd: number
  fadeInDuration: number
  fadeOutDuration: number
}

export const BEAT_CONFIG: Record<string, BeatConfig> = {
  preLaunch:     { scrollStart: 0,    scrollEnd: 0.15, fadeInDuration: 0.1, fadeOutDuration: 0.2 },
  ascent:        { scrollStart: 0.15, scrollEnd: 0.35, fadeInDuration: 0.1, fadeOutDuration: 0.2 },
  orbit:         { scrollStart: 0.35, scrollEnd: 0.55, fadeInDuration: 0.1, fadeOutDuration: 0.2 },
  constellation: { scrollStart: 0.55, scrollEnd: 0.75, fadeInDuration: 0.1, fadeOutDuration: 0.2 },
  deepSpace:     { scrollStart: 0.75, scrollEnd: 0.90, fadeInDuration: 0.1, fadeOutDuration: 0.2 },
  cta:           { scrollStart: 0.90, scrollEnd: 1.0,  fadeInDuration: 0.1, fadeOutDuration: 0.05 },
}

export function getBeatOpacity(beatKey: string, scrollProgress: number): number {
  const config = BEAT_CONFIG[beatKey]
  if (!config) return 0
  const { scrollStart, scrollEnd, fadeInDuration, fadeOutDuration } = config
  const range = scrollEnd - scrollStart
  const local = (scrollProgress - scrollStart) / range
  if (local < 0 || local > 1) return 0
  if (local < fadeInDuration) return local / fadeInDuration
  if (local > 1 - fadeOutDuration) return (1 - local) / fadeOutDuration
  return 1
}
