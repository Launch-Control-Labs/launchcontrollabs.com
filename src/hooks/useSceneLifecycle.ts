'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { SECTION_COUNT } from '@/store/scene-store'

const HERO_SECTION = 0

export const SECTION_MODEL_URLS: Record<number, string> = {
  1: '/models/astronaut-hero.glb',
  2: '/models/shuttle-atlantis.glb',
  3: '/models/various-planets.glb',
  4: '/models/optimized/apollo-saturn-v.glb',
  5: '/models/optimized/earth.glb',
}

export function disposeScene(scene: THREE.Object3D, url: string) {
  useGLTF.clear(url)

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry?.dispose()
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      for (const mat of mats) {
        for (const key of Object.keys(mat)) {
          if ((mat as any)[key]?.isTexture) (mat as any)[key].dispose()
        }
        mat.dispose()
      }
    }
    if ((child as any).skeleton) (child as any).skeleton.dispose()
  })
}

export function computeLoadedSections(activeSection: number): number[] {
  const loaded = new Set<number>()
  loaded.add(HERO_SECTION)
  loaded.add(activeSection)

  const next = activeSection + 1
  if (next < SECTION_COUNT) {
    loaded.add(next)
  }

  return Array.from(loaded).sort((a, b) => a - b)
}

export function useSceneLifecycle() {
  // Legacy hook — section lifecycle is now handled by ScrollJourney
}

export function useSceneDisposer(sectionIndex: number) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    return () => {
      const url = SECTION_MODEL_URLS[sectionIndex]
      if (url && groupRef.current) {
        disposeScene(groupRef.current, url)
      }
    }
  }, [sectionIndex])

  return groupRef
}
