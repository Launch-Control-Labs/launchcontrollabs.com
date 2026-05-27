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
      groupRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 10, 5]} intensity={1.5} color="#FFFFFF" />
      <pointLight position={[-5, 5, -5]} intensity={0.8} color="#FFFFFF" />
      <directionalLight position={[0, 10, 5]} intensity={0.6} color="#FFFFFF" />
      
      <primitive 
        object={scene} 
        scale={0.8}
        position={[0, -2, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/optimized/apollo-saturn-v.glb')
