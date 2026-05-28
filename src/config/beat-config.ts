'use client'

import * as THREE from 'three'

export const BEAT_RANGES = {
  launch:         [0.00, 0.15] as [number, number],
  atmosphere:     [0.15, 0.35] as [number, number],
  spaceCruise:    [0.35, 0.55] as [number, number],
  shuttleEarth:   [0.55, 0.75] as [number, number],
  astronautFar:   [0.75, 0.90] as [number, number],
  astronautClose: [0.90, 1.00] as [number, number],
  // Legacy beat keys (backward compatibility)
  preLaunch:      [0.00, 0.15] as [number, number],
  ascent:         [0.15, 0.35] as [number, number],
  orbit:          [0.35, 0.55] as [number, number],
  constellation:  [0.55, 0.75] as [number, number],
  deepSpace:      [0.75, 0.90] as [number, number],
  cta:            [0.90, 1.00] as [number, number],
} as const

export type BeatKey = keyof typeof BEAT_RANGES

/**
 * Get opacity for a beat based on scroll progress.
 * Beats fade in at start, stay opaque in middle, fade out at end.
 */
export function getBeatOpacity(beatKey: BeatKey, progress: number): number {
  const [start, end] = BEAT_RANGES[beatKey]
  const range = end - start
  const local = (progress - start) / range

  if (local < 0 || local > 1) return 0

  // Fade in over first 10% of beat
  const fadeInDuration = 0.1
  if (local < fadeInDuration) return local / fadeInDuration

  // Fade out over last 10% of beat
  const fadeOutDuration = 0.1
  if (local > 1 - fadeOutDuration) return (1 - local) / fadeOutDuration

  return 1
}

/**
 * Get background color based on scroll progress.
 * Interpolates: sky blue → dark blue → deep space
 */
export function getBackgroundColor(progress: number): string {
  const skyBlue = new THREE.Color('#4a90d9')
  const darkBlue = new THREE.Color('#1a3a5c')
  const deepSpace = new THREE.Color('#020914')

  let color: THREE.Color

  if (progress < 0.15) {
    // 0.0–0.15: lerp sky blue → dark blue
    const t = progress / 0.15
    color = skyBlue.clone().lerp(darkBlue, t)
  } else if (progress < 0.35) {
    // 0.15–0.35: lerp dark blue → deep space
    const t = (progress - 0.15) / 0.2
    color = darkBlue.clone().lerp(deepSpace, t)
  } else {
    // 0.35+: deep space
    color = deepSpace
  }

  return `#${color.getHexString()}`
}
