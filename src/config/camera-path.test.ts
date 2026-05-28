import { describe, test, expect } from 'bun:test'
import { getCamera, getBeatForProgress, BEAT_RANGES } from './camera-path'

describe('camera-path', () => {
  describe('getCamera', () => {
    test('progress 0 returns pre-launch position (y close to -5)', () => {
      const state = getCamera(0)
      expect(state.position.y).toBeCloseTo(-5, 0)
      expect(state.position.x).toBeCloseTo(0, 0)
      expect(state.position.z).toBeCloseTo(10, 0)
      expect(state.fov).toBe(60)
    })

    test('progress 1 returns CTA position (y close to 150)', () => {
      const state = getCamera(1)
      expect(state.position.y).toBeCloseTo(150, 0)
      expect(state.position.x).toBeCloseTo(0, 0)
      expect(state.position.z).toBeCloseTo(80, 0)
      expect(state.fov).toBe(60)
    })

    test('progress 0.5 returns interpolated position between orbit and constellation', () => {
      const state = getCamera(0.5)
      // At 0.5, we're in the orbit→constellation segment (0.35–0.55)
      // localT = (0.5 - 0.35) / (0.55 - 0.35) = 0.75
      // position.y lerp(80, 100, 0.75) = 95
      expect(state.position.y).toBeCloseTo(95, 0)
      // position.x lerp(0, 20, 0.75) = 15
      expect(state.position.x).toBeCloseTo(15, 0)
    })

    test('adjacent positions never jump > 30 units in any axis per 0.01 step', () => {
      const step = 0.01
      for (let p = 0; p < 1; p += step) {
        const a = getCamera(p)
        const b = getCamera(Math.min(p + step, 1))

        const dx = Math.abs(b.position.x - a.position.x)
        const dy = Math.abs(b.position.y - a.position.y)
        const dz = Math.abs(b.position.z - a.position.z)

        expect(dx).toBeLessThan(30)
        expect(dy).toBeLessThan(30)
        expect(dz).toBeLessThan(30)
      }
    })
  })

  describe('BEAT_RANGES', () => {
    test('covers full [0, 1] range without gaps', () => {
      const beatNames = Object.keys(BEAT_RANGES) as Array<keyof typeof BEAT_RANGES>

      // First beat starts at 0
      expect(BEAT_RANGES[beatNames[0]].start).toBe(0)

      // Last beat ends at 1
      expect(BEAT_RANGES[beatNames[beatNames.length - 1]].end).toBe(1)

      // Each beat starts where the previous one ended (no gaps)
      for (let i = 1; i < beatNames.length; i++) {
        const prev = BEAT_RANGES[beatNames[i - 1]]
        const curr = BEAT_RANGES[beatNames[i]]
        expect(curr.start).toBe(prev.end)
      }
    })
  })

  describe('getBeatForProgress', () => {
    test('0.25 returns ascent', () => {
      expect(getBeatForProgress(0.25)).toBe('ascent')
    })

    test('0.65 returns constellation', () => {
      expect(getBeatForProgress(0.65)).toBe('constellation')
    })

    test('0 returns preLaunch', () => {
      expect(getBeatForProgress(0)).toBe('preLaunch')
    })

    test('1.0 returns cta', () => {
      expect(getBeatForProgress(1.0)).toBe('cta')
    })

    test('clamps out-of-range values', () => {
      expect(getBeatForProgress(-0.5)).toBe('preLaunch')
      expect(getBeatForProgress(1.5)).toBe('cta')
    })
  })
})
