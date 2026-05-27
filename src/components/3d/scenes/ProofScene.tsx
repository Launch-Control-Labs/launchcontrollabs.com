'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Section 3 — Placeholder for planets model (Wave 2) */
export function ProofScene() {
  const meshRef = useRef<THREE.Mesh>(null)
  const orbitRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * 0.4
      orbitRef.current.rotation.x += delta * 0.1
    }
  })

  return (
    <group>
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 3, 4]} intensity={1.2} color="#a78bfa" />
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#a78bfa" emissive="#1a0033" emissiveIntensity={0.3} />
      </mesh>

      <mesh ref={orbitRef} position={[3, 0.5, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#e0e0e0" emissive="#222222" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}
