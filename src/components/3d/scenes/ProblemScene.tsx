'use client'

import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

useGLTF.setDecoderPath('/draco/')

function AnimatedAstronaut() {
  const { scene, animations } = useGLTF('/models/animated-astronaut.glb')
  const groupRef = useRef<THREE.Group>(null)
  const { actions } = useAnimations(animations, groupRef)
  const timeRef = useRef(0)

  useEffect(() => {
    const clip = actions[Object.keys(actions)[0]]
    if (clip) clip.reset().fadeIn(0.5).play()
  }, [actions])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    timeRef.current += delta
    const t = timeRef.current

    groupRef.current.position.y = -1 + Math.sin(t * 0.06) * 0.4
    groupRef.current.rotation.y += delta * 0.015
  })

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      <primitive
        object={scene}
        scale={3.5}
      />
    </group>
  )
}

export function ProblemScene() {
  return (
    <group>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" />
      <pointLight position={[-4, 2, -3]} intensity={0.6} color="#DC2626" />
      <AnimatedAstronaut />
    </group>
  )
}

useGLTF.preload('/models/animated-astronaut.glb')
