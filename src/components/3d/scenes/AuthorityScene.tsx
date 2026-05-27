'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * AuthorityScene — Section 5
 * Placeholder: apollo saturn v (colored mesh until model loads in Wave 2)
 */
export function AuthorityScene() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 8, 5]} intensity={1} color="#f59e0b" />
      <directionalLight position={[3, 5, 2]} intensity={0.6} color="#ffffff" />
      {/* Rocket body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.6, 4, 16]} />
        <meshStandardMaterial color="#f59e0b" emissive="#331a00" emissiveIntensity={0.3} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[0.4, 1, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#333333" emissiveIntensity={0.1} />
      </mesh>
    </group>
  )
}
