'use client'

import * as THREE from 'three'

export const BEAT_RANGES = {
  launch:         [0.00, 0.12] as [number, number],
  services:       [0.12, 0.26] as [number, number],
  atmosphere:     [0.26, 0.40] as [number, number],
  spaceCruise:    [0.40, 0.56] as [number, number],
  shuttleEarth:   [0.56, 0.72] as [number, number],
  astronautFar:   [0.72, 0.88] as [number, number],
  astronautClose: [0.88, 1.00] as [number, number],
  // Legacy beat keys (backward compatibility)
  preLaunch:      [0.00, 0.12] as [number, number],
  ascent:         [0.26, 0.40] as [number, number],
  orbit:          [0.40, 0.56] as [number, number],
  constellation:  [0.56, 0.72] as [number, number],
  deepSpace:      [0.72, 0.88] as [number, number],
  cta:            [0.88, 1.00] as [number, number],
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

  if (local <= 0 || local >= 1) return 0

  const fade = 0.12
  if (local < fade) return local / fade
  if (local > 1 - fade) return (1 - local) / fade

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

  if (progress < 0.12) {
    // 0.0–0.12: lerp sky blue → dark blue
    const t = progress / 0.12
    color = skyBlue.clone().lerp(darkBlue, t)
  } else if (progress < 0.26) {
    // 0.12–0.26: lerp dark blue → deep space
    const t = (progress - 0.12) / 0.14
    color = darkBlue.clone().lerp(deepSpace, t)
  } else {
    // 0.26+: deep space
    color = deepSpace
  }

  return `#${color.getHexString()}`
}
