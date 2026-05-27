'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

useGLTF.setDecoderPath('/draco/')

const SHUTTLE_PATH = '/models/shuttle-atlantis.glb'

function normalizeToHeight(scene: THREE.Object3D, targetHeight: number): number {
  const box = new THREE.Box3().setFromObject(scene)
  const size = box.getSize(new THREE.Vector3())
  return targetHeight / Math.max(size.x, size.y, size.z)
}

function ShuttleDetail() {
  const { scene } = useGLTF(SHUTTLE_PATH)
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
        child.material.envMapIntensity = 0.8
        child.material.needsUpdate = true
      }
    })
    setScale(normalizeToHeight(scene, 14))
    processed.current = true
  }, [scene])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    timeRef.current += delta
    const t = timeRef.current
    groupRef.current.rotation.y += delta * 0.025
    groupRef.current.position.y = Math.sin(t * 0.06) * 0.4
  })

  return (
    <group ref={groupRef} position={[3, 0, 0]}>
      <group scale={scale} rotation={[0.2, 0, 0.05]}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

export function GuideScene() {
  return (
    <group>
      <ambientLight intensity={0.15} />
      <directionalLight position={[10, 8, 6]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-8, 4, 4]} intensity={0.4} color="#3B82F6" />
      <pointLight position={[0, -6, 8]} intensity={0.6} color="#22d3ee" distance={40} />
      <pointLight position={[-10, 10, -5]} intensity={0.3} color="#1E40AF" distance={50} />
      <ShuttleDetail />
    </group>
  )
}

useGLTF.preload(SHUTTLE_PATH)
