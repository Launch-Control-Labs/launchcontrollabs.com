'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Preload the space shuttle model
useGLTF.preload('/models/optimized/space-shuttle.glb')

/** Section 2 — Space shuttle with capability annotation callouts (ESPN Tech Talk style) */
export function GuideScene() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Load the space shuttle model
  const { scene } = useGLTF('/models/optimized/space-shuttle.glb')
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      // Slow rotation to show off the shuttle
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Lighting for clean white background aesthetic */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FFFFFF" />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#2563EB" />
      <pointLight position={[0, -3, 2]} intensity={0.3} color="#2563EB" />
      
      {/* Space shuttle model */}
      <primitive 
        object={scene} 
        scale={1.5}
        position={[0, 0, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
    </group>
  )
}
