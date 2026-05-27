'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.preload('/models/optimized/space-shuttle.glb')

export function GuideScene() {
  const groupRef = useRef<THREE.Group>(null)
  
  const { scene } = useGLTF('/models/optimized/space-shuttle.glb')
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[8, 6, 4]} intensity={1.8} color="#FFFFFF" />
      <directionalLight position={[-6, 2, 3]} intensity={0.3} color="#1E40AF" />
      
      <primitive 
        object={scene} 
        scale={2.0}
        position={[0, -1, 0]}
        rotation={[0.15, Math.PI * 0.1, 0]}
      />
    </group>
  )
}
