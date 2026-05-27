'use client'

import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.setDecoderPath('/draco/')

const MODEL_PATH = '/models/apollo-saturn-v.glb'

export function InteractiveRoom() {
  const { scene } = useGLTF(MODEL_PATH)
  const processed = useRef(false)

  useEffect(() => {
    if (!scene || processed.current) return

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      child.visible = true

      if (child.material instanceof THREE.MeshStandardMaterial) {
        child.material.side = THREE.DoubleSide
        child.material.envMapIntensity = 1.0
        child.material.needsUpdate = true
      }
    })

    processed.current = true
  }, [scene])

  return (
    <primitive object={scene} />
  )
}

useGLTF.preload(MODEL_PATH)
