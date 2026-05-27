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

// ─── Waypoints ──────────────────────────────────────────────────────────────────
// Camera waypoints for each beat boundary. Interpolation happens between these.

const WAYPOINTS: Waypoint[] = [
  // Beat 1 — Pre-Launch: Ground level, looking UP at shuttle
  { position: [0, -5, 10], lookAt: [0, 20, -10], fov: 60 },
  // Beat 2 — Ascent: Rising with shuttle
  { position: [0, 30, 5], lookAt: [0, 50, -20], fov: 65 },
  // Beat 3 — Orbit: High altitude, leveling out
  { position: [0, 80, 20], lookAt: [0, 60, -30], fov: 70 },
  // Beat 4 — Constellation: Pulled back, wider view
  { position: [20, 100, 40], lookAt: [0, 80, 0], fov: 75 },
  // Beat 5 — Deep Space: Wide view of heritage
  { position: [30, 120, 60], lookAt: [0, 100, 0], fov: 80 },
  // Beat 6 — CTA: Stable orbit, looking down at Earth
  { position: [0, 150, 80], lookAt: [0, 0, 0], fov: 60 },
]

// Progress values at which each waypoint sits (beat boundaries)
const WAYPOINT_PROGRESS = [0, 0.15, 0.35, 0.55, 0.75, 1.0]

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
