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

function DisposableScene({ index, children }: { index: number; children: React.ReactNode }) {
  const groupRef = useSceneDisposer(index)
  return <group ref={groupRef}>{children}</group>
}

export function SceneRenderer() {
  const prevSectionRef = useRef(0)
  const groupRefs = useRef<(THREE.Group | null)[]>(Array(SCENES.length).fill(null))

  const activeSection = useSceneStore((s) => s.activeSection)
  const loadedSections = useSceneStore((s) => s.loadedSections)

  useFrame((_, delta) => {
    const prev = prevSectionRef.current
    if (prev !== activeSection) {
      prevSectionRef.current = activeSection
    }

    groupRefs.current.forEach((group, i) => {
      if (!group) return
      group.visible = i === activeSection
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
            visible={index === activeSection}
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
