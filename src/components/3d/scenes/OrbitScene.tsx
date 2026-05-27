'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

/** Section 6 — Earth model with overview effect */
export function OrbitScene() {
  const earthRef = useRef<THREE.Group>(null)
  
  // Load the optimized Earth model
  const { scene } = useGLTF('/models/optimized/earth.glb')

  useFrame((_, delta) => {
    if (earthRef.current) {
      // Slow continuous rotation for overview effect
      earthRef.current.rotation.y += delta * 0.08
    }
  })

  return (
    <group>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.15} />
      
      {/* Key light from upper left */}
      <pointLight position={[-5, 3, 5]} intensity={1.5} color="#ffffff" />
      
      {/* Fill light from lower right */}
      <pointLight position={[5, -2, 3]} intensity={0.5} color="#4ADE80" />
      
      {/* Earth model */}
      <group ref={earthRef} position={[0, 0, 0]}>
        <primitive 
          object={scene.clone()} 
          scale={2}
        />
      </group>
      
      {/* Atmospheric glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.15, 64, 64]} />
        <meshStandardMaterial
          color="#4ADE80"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

// Preload the Earth model
useGLTF.preload('/models/optimized/earth.glb')
