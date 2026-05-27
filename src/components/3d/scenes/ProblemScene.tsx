'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Section 1 — Placeholder for drifting astronaut model (Wave 2) */
export function ProblemScene() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.5
    }
  })

  return (
    <group>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ff6b6b" />
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 1.5, 8, 16]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#330000" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}
