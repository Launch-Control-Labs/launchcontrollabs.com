'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useSceneStore } from '@/store/scene-store'
import { HeroScene } from './scenes/HeroScene'
import { ProblemScene } from './scenes/ProblemScene'
import { GuideScene } from './scenes/GuideScene'
import { ProofScene } from './scenes/ProofScene'
import { AuthorityScene } from './scenes/AuthorityScene'
import { OrbitScene } from './scenes/OrbitScene'

const SCENES = [HeroScene, ProblemScene, GuideScene, ProofScene, AuthorityScene, OrbitScene]
const CROSSFADE_DURATION = 0.2

export function SceneRenderer() {
  const prevSectionRef = useRef(0)
  const opacityRef = useRef<{ incoming: number; outgoing: number }>({ incoming: 1, outgoing: 0 })
  const groupRefs = useRef<(THREE.Group | null)[]>(Array(SCENES.length).fill(null))

  const activeSection = useSceneStore((s) => s.activeSection)

  useFrame((_, delta) => {
    const prev = prevSectionRef.current

    if (prev !== activeSection) {
      opacityRef.current.outgoing = 1
      opacityRef.current.incoming = 0
      prevSectionRef.current = activeSection
    }

    const speed = 1 / CROSSFADE_DURATION
    opacityRef.current.incoming = Math.min(1, opacityRef.current.incoming + delta * speed)
    opacityRef.current.outgoing = Math.max(0, opacityRef.current.outgoing - delta * speed)

    groupRefs.current.forEach((group, i) => {
      if (!group) return
      if (i === activeSection) {
        group.visible = true
        group.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const mat = child.material as THREE.MeshStandardMaterial
            if (mat.opacity !== undefined) {
              mat.transparent = true
              mat.opacity = opacityRef.current.incoming
            }
          }
        })
      } else if (i === prev && opacityRef.current.outgoing > 0) {
        group.visible = true
        group.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const mat = child.material as THREE.MeshStandardMaterial
            if (mat.opacity !== undefined) {
              mat.transparent = true
              mat.opacity = opacityRef.current.outgoing
            }
          }
        })
      } else {
        group.visible = false
      }
    })
  })

  return (
    <>
      {SCENES.map((Scene, index) => (
        <group
          key={index}
          ref={(el) => { groupRefs.current[index] = el }}
          visible={index === activeSection}
        >
          <Scene />
        </group>
      ))}
    </>
  )
}
