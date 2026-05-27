'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

useGLTF.setDecoderPath('/draco/')

const ASTRONAUT_PATH = '/models/astronaut-hero.glb'

function FloatingAstronaut() {
  const { scene, animations } = useGLTF(ASTRONAUT_PATH)
  const groupRef = useRef<THREE.Group>(null)
  const { actions } = useAnimations(animations, groupRef)
  const timeRef = useRef(0)

  useLayoutEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial
        mat.envMapIntensity = 1.2
        mat.needsUpdate = true
      }
    })
  }, [scene])

  useEffect(() => {
    const clip = actions['floating'] ?? actions['idle'] ?? actions[Object.keys(actions)[0]]
    if (clip) clip.reset().fadeIn(0.5).play()
  }, [actions])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    timeRef.current += delta
    const t = timeRef.current
    groupRef.current.position.x = 2 + Math.sin(t * 0.04) * 0.6
    groupRef.current.position.y = 0 + Math.sin(t * 0.07) * 0.8
    groupRef.current.rotation.y = -0.3 + Math.sin(t * 0.025) * 0.15
    groupRef.current.rotation.z = Math.sin(t * 0.035) * 0.06
  })

  const scale = 12 / 261.94

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      <primitive object={scene} scale={scale} />
    </group>
  )
}

export function ProblemScene() {
  return (
    <group>
      <ambientLight intensity={0.08} />
      <pointLight position={[-8, 6, 8]} intensity={2.2} color="#DC2626" distance={60} />
      <pointLight position={[10, -4, 6]} intensity={0.8} color="#ff6b35" distance={40} />
      <pointLight position={[0, 8, -10]} intensity={0.3} color="#1a0505" distance={30} />
      <spotLight
        position={[0, 15, 10]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.2}
        color="#ffffff"
        target-position={[2, 0, 0]}
      />
      <FloatingAstronaut />
    </group>
  )
}

useGLTF.preload(ASTRONAUT_PATH)
