'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function AuthorityScene() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/optimized/apollo-saturn-v.glb')

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 10, 5]} intensity={1.2} color="#FFFFFF" />
      <pointLight position={[-8, -15, 5]} intensity={2.0} color="#FFFFFF" />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#FFFFFF" />
      <primitive
        object={scene}
        scale={2.0}
        position={[-8, -6, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/optimized/apollo-saturn-v.glb')
