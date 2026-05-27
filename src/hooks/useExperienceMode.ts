'use client'
import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'
import { useIsMobile } from './useIsMobile'
import { useDeviceTier } from './useDeviceTier'

/**
 * Experience mode detection hook
 *
 * Priority order:
 * 1. prefers-reduced-motion → 'static'
 * 2. isMobile (< 768px) → '2d-parallax'
 * 3. deviceTier === 1 (weak GPU) → '2d-parallax'
 * 4. else → '3d'
 *
 * Returns:
 * - '3d': Full 3D experience (desktop, capable GPU, no reduced motion)
 * - '2d-parallax': Mobile/tablet 2D parallax experience
 * - 'static': Static content (reduced motion preference or no WebGL)
 */

export function useExperienceMode(): '3d' | '2d-parallax' | 'static' {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const deviceTier = useDeviceTier()

  // SSR-safe default: return '3d' on server, actual mode on client
  const [mode, setMode] = useState<'3d' | '2d-parallax' | 'static'>('3d')

  useEffect(() => {
    // Determine experience mode based on priority
    if (prefersReducedMotion) {
      setMode('static')
    } else if (isMobile) {
      setMode('2d-parallax')
    } else if (deviceTier === 1) {
      setMode('2d-parallax')
    } else {
      setMode('3d')
    }
  }, [prefersReducedMotion, isMobile, deviceTier])

  return mode
}
