'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Section 2 — Placeholder for space shuttle model (Wave 2) */
export function GuideScene() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight position={[-3, 4, 5]} intensity={1} color="#22d3ee" />
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <coneGeometry args={[1, 3, 6]} />
        <meshStandardMaterial color="#22d3ee" emissive="#003344" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}
