'use client'
import { useEffect, useState } from 'react'

/**
 * Device capability detection hook
 *
 * Tier 3 (Full): Desktop + capable GPU
 *   - screen width > 1024px AND devicePixelRatio <= 2
 *   - Full 3D scene with post-processing
 *
 * Tier 2 (Simplified): Mobile/tablet or high-DPR
 *   - screen width <= 1024px OR devicePixelRatio > 2
 *   - Optimized models, no post-processing, DPR capped at 2
 *
 * Tier 1 (Static): No WebGL or very low-end
 *   - WebGL context creation fails
 *   - Shows static image fallbacks
 */

function canUseWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('webgl2')
    return gl !== null
  } catch {
    return false
  }
}

function detectDeviceTier(): 1 | 2 | 3 {
  // Tier 1: No WebGL support
  if (!canUseWebGL()) {
    return 1
  }

  // Check screen size and DPR
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1

  // Tier 3: Desktop + capable GPU
  if (screenWidth > 1024 && dpr <= 2) {
    return 3
  }

  // Tier 2: Mobile/tablet or high-DPR
  return 2
}

export function useDeviceTier(): 1 | 2 | 3 {
  const [tier, setTier] = useState<1 | 2 | 3>(2) // Default to Tier 2 (safe)

  useEffect(() => {
    const detectedTier = detectDeviceTier()
    setTier(detectedTier)

    if (typeof window !== 'undefined') {
      ;(window as any).__deviceTier = detectedTier
    }

    const handleResize = () => {
      const newTier = detectDeviceTier()
      // Use functional update to compare against CURRENT state, not captured value
      setTier(prev => {
        if (newTier !== prev) {
          if (typeof window !== 'undefined') {
            ;(window as any).__deviceTier = newTier
          }
          return newTier
        }
        return prev
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return tier
}
