'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function OrbitScene() {
  const earthRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/optimized/earth.glb')

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.06
    }
  })

  return (
    <group>
      <ambientLight intensity={0.1} />
      <pointLight position={[15, 8, 10]} intensity={2.0} color="#ffffff" />
      <pointLight position={[-8, 3, 8]} intensity={0.4} color="#4ADE80" />

      <group ref={earthRef} position={[0, -10, 0]}>
        <primitive object={scene.clone()} scale={14} />
      </group>

      <mesh position={[0, -10, 0]}>
        <sphereGeometry args={[14.3, 64, 64]} />
        <meshBasicMaterial
          color="#4ADE80"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/optimized/earth.glb')
