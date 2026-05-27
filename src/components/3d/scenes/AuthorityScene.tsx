'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const SATURN_V_PATH = '/models/optimized/apollo-saturn-v.glb'

function normalizeToHeight(scene: THREE.Object3D, targetHeight: number): number {
  const box = new THREE.Box3().setFromObject(scene)
  const size = box.getSize(new THREE.Vector3())
  return targetHeight / Math.max(size.x, size.y, size.z)
}

function SaturnV() {
  const { scene } = useGLTF(SATURN_V_PATH)
  const groupRef = useRef<THREE.Group>(null)
  const processed = useRef(false)
  const [scale, setScale] = useState(1)
  const timeRef = useRef(0)

  useLayoutEffect(() => {
    if (!scene || processed.current) return
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    scene.position.sub(center)
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.envMapIntensity = 0.6
        child.material.needsUpdate = true
      }
    })
    setScale(normalizeToHeight(scene, 16))
    processed.current = true
  }, [scene])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    timeRef.current += delta
    const t = timeRef.current
    groupRef.current.rotation.y += delta * 0.018
    groupRef.current.position.y = Math.sin(t * 0.05) * 0.3
  })

  return (
    <group ref={groupRef} position={[-2, 0, 0]}>
      <group scale={scale}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

export function AuthorityScene() {
  return (
    <group>
      <ambientLight intensity={0.1} />
      <directionalLight position={[8, 12, 8]}  intensity={2.5} color="#ffffff" />
      <directionalLight position={[-6, 4, 4]}  intensity={0.4} color="#93C5FD" />
      <pointLight position={[0, -8, 10]}       intensity={0.8} color="#ffffff" distance={50} />
      <pointLight position={[10, 8, -5]}       intensity={0.3} color="#FCD34D" distance={40} />
      <SaturnV />
    </group>
  )
}

useGLTF.preload(SATURN_V_PATH)
