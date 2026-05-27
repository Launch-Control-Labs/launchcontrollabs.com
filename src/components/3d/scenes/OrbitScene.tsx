'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const EARTH_PATH = '/models/optimized/earth.glb'

function EarthFromOrbit() {
  const { scene } = useGLTF(EARTH_PATH)
  const earthRef = useRef<THREE.Group>(null)
  const processed = useRef(false)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    if (!scene || processed.current) return
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.envMapIntensity = 1.0
        child.material.needsUpdate = true
      }
    })
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    setScale(18 / maxDim)
    processed.current = true
  }, [scene])

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.04
    }
  })

  return (
    <group ref={earthRef} position={[0, -6, 0]}>
      <group scale={scale}>
        <primitive object={scene} />
      </group>
      <mesh>
        <sphereGeometry args={[scale * 5.2, 64, 64]} />
        <meshBasicMaterial color="#4ADE80" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[scale * 5.4, 64, 64]} />
        <meshBasicMaterial color="#60A5FA" transparent opacity={0.025} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

export function OrbitScene() {
  return (
    <group>
      <ambientLight intensity={0.05} />
      <pointLight position={[20, 10, 15]}  intensity={2.8} color="#ffffff" distance={100} />
      <pointLight position={[-10, 5, 8]}   intensity={0.3} color="#4ADE80" distance={60} />
      <pointLight position={[0, 20, -10]}  intensity={0.2} color="#60A5FA" distance={80} />
      <EarthFromOrbit />
    </group>
  )
}

useGLTF.preload(EARTH_PATH)
