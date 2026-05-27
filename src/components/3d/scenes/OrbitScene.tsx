'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Section 5 — Placeholder for Earth model (Wave 2) */
export function OrbitScene() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08
    }
  })

  return (
    <group>
      <ambientLight intensity={0.15} />
      <pointLight position={[-5, 3, 5]} intensity={1.5} color="#ffffff" />
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#2563eb" emissive="#001133" emissiveIntensity={0.4} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshStandardMaterial
          color="#60a5fa"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}
