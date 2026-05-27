'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useSceneStore } from '@/store/scene-store'
import { useSceneDisposer } from '@/hooks/useSceneLifecycle'
import { HeroScene } from './scenes/HeroScene'
import { ProblemScene } from './scenes/ProblemScene'
import { GuideScene } from './scenes/GuideScene'
import { ProofScene } from './scenes/ProofScene'
import { AuthorityScene } from './scenes/AuthorityScene'
import { OrbitScene } from './scenes/OrbitScene'

const SCENES = [HeroScene, ProblemScene, GuideScene, ProofScene, AuthorityScene, OrbitScene]
const FADE_SPEED = 3.5

function DisposableScene({ index, children }: { index: number; children: React.ReactNode }) {
  const groupRef = useSceneDisposer(index)
  return <group ref={groupRef}>{children}</group>
}

export function SceneRenderer() {
  const groupRefs = useRef<(THREE.Group | null)[]>(Array(SCENES.length).fill(null))
  const opacityRefs = useRef<number[]>(Array(SCENES.length).fill(0))
  opacityRefs.current[0] = 1

  const activeSection = useSceneStore((s) => s.activeSection)
  const loadedSections = useSceneStore((s) => s.loadedSections)

  useFrame((_, delta) => {
    groupRefs.current.forEach((group, i) => {
      if (!group) return
      const target = i === activeSection ? 1 : 0
      opacityRefs.current[i] += (target - opacityRefs.current[i]) * Math.min(1, delta * FADE_SPEED)
      const opacity = opacityRefs.current[i]
      group.visible = opacity > 0.01
      group.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material]
          mats.forEach((m) => {
            if (m.transparent !== undefined) {
              m.transparent = true
              m.opacity = opacity
            }
          })
        }
      })
    })
  })

  return (
    <>
      {SCENES.map((Scene, index) => {
        const isLoaded = loadedSections.includes(index)
        if (!isLoaded) return null

        return (
          <group
            key={index}
            ref={(el) => { groupRefs.current[index] = el }}
            visible={index === activeSection || opacityRefs.current[index] > 0.01}
          >
            <DisposableScene index={index}>
              <Scene />
            </DisposableScene>
          </group>
        )
      })}
    </>
  )
}
