import * as THREE from 'three'

// ─── Types ──────────────────────────────────────────────────────────────────────

export type BeatName =
  | 'preLaunch'
  | 'ascent'
  | 'orbit'
  | 'constellation'
  | 'deepSpace'
  | 'cta'

export interface CameraState {
  position: THREE.Vector3
  lookAt: THREE.Vector3
  fov: number
}

export interface BeatRange {
  start: number
  end: number
}

interface Waypoint {
  position: [number, number, number]
  lookAt: [number, number, number]
  fov: number
}

// ─── Beat Ranges ────────────────────────────────────────────────────────────────
// Maps beat names to [start, end] scroll progress (0–1)

export const BEAT_RANGES: Record<BeatName, BeatRange> = {
  preLaunch: { start: 0, end: 0.15 },
  ascent: { start: 0.15, end: 0.35 },
  orbit: { start: 0.35, end: 0.55 },
  constellation: { start: 0.55, end: 0.75 },
  deepSpace: { start: 0.75, end: 0.9 },
  cta: { start: 0.9, end: 1.0 },
}

// ─── Path-Mode Waypoints ────────────────────────────────────────────────────────
// Used by getCamera() for path-mode (active after 30% scroll).
// Anchors at 0.30/0.40 define the crossfade zone with follow-mode.

const WAYPOINTS: Waypoint[] = [
  // Anchor — crossfade start (matches follow-mode output at 30%)
  { position: [0, 7, 25], lookAt: [0, 19, 0], fov: 55 },
  // Anchor — crossfade end / pure path-mode starts
  { position: [0, 20, 20], lookAt: [0, 25, -20], fov: 60 },
  // Beat 3 — spaceCruise (~50% scroll)
  { position: [0, 35, 15], lookAt: [0, 30, -40], fov: 65 },
  // Beat 4 — shuttleEarth (~65% scroll)
  { position: [-5, 40, 25], lookAt: [10, 35, -60], fov: 70 },
  // Beat 5 — astronautFar (~82% scroll) — full body visible in space
  { position: [-3, 44, 16], lookAt: [5, 46, 2], fov: 55 },
  // Beat 6 — astronautClose (~95% scroll) — helmet close-up
  { position: [3, 48, 7], lookAt: [5, 48, 2], fov: 45 },
]

// Progress values at which each path-mode waypoint sits
const WAYPOINT_PROGRESS = [0.30, 0.40, 0.50, 0.65, 0.82, 0.95]

// ─── Core Functions ─────────────────────────────────────────────────────────────

/**
 * Returns the beat name for a given scroll progress (0–1).
 */
export function getBeatForProgress(progress: number): BeatName {
  const clamped = Math.max(0, Math.min(1, progress))

  const beatNames: BeatName[] = [
    'preLaunch',
    'ascent',
    'orbit',
    'constellation',
    'deepSpace',
    'cta',
  ]

  for (const name of beatNames) {
    const range = BEAT_RANGES[name]
    if (clamped >= range.start && clamped < range.end) {
      return name
    }
  }

  // progress === 1.0 falls into the last beat
  return 'cta'
}

/**
 * Returns interpolated camera state for a given scroll progress (0–1).
 * Linear interpolation between adjacent waypoints.
 * No easing — GSAP scrub handles easing externally.
 */
export function getCamera(progress: number): CameraState {
  const clamped = Math.max(0, Math.min(1, progress))

  // Find the two waypoints we're between
  let segmentIndex = 0
  for (let i = 0; i < WAYPOINT_PROGRESS.length - 1; i++) {
    if (clamped >= WAYPOINT_PROGRESS[i]) {
      segmentIndex = i
    }
  }

  // Clamp to last valid segment
  segmentIndex = Math.min(segmentIndex, WAYPOINTS.length - 2)

  const startProgress = WAYPOINT_PROGRESS[segmentIndex]
  const endProgress = WAYPOINT_PROGRESS[segmentIndex + 1]
  const startWaypoint = WAYPOINTS[segmentIndex]
  const endWaypoint = WAYPOINTS[segmentIndex + 1]

  // Calculate local t within this segment (0–1)
  const segmentLength = endProgress - startProgress
  const localT = segmentLength > 0
    ? (clamped - startProgress) / segmentLength
    : 0

  // Interpolate position
  const position = new THREE.Vector3(
    THREE.MathUtils.lerp(startWaypoint.position[0], endWaypoint.position[0], localT),
    THREE.MathUtils.lerp(startWaypoint.position[1], endWaypoint.position[1], localT),
    THREE.MathUtils.lerp(startWaypoint.position[2], endWaypoint.position[2], localT),
  )

  // Interpolate lookAt
  const lookAt = new THREE.Vector3(
    THREE.MathUtils.lerp(startWaypoint.lookAt[0], endWaypoint.lookAt[0], localT),
    THREE.MathUtils.lerp(startWaypoint.lookAt[1], endWaypoint.lookAt[1], localT),
    THREE.MathUtils.lerp(startWaypoint.lookAt[2], endWaypoint.lookAt[2], localT),
  )

  // Interpolate FOV
  const fov = THREE.MathUtils.lerp(startWaypoint.fov, endWaypoint.fov, localT)

  return { position, lookAt, fov }
}

export function getCameraFollow(progress: number, shuttleY: number): CameraState {
  const pullback = THREE.MathUtils.lerp(1, 8, Math.min(1, progress / 0.15))
  return {
    position: new THREE.Vector3(0, shuttleY - pullback, 25),
    lookAt: new THREE.Vector3(5, shuttleY + 3, 0),
    fov: 55,
  }
}
