'use client'

import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

useGLTF.setDecoderPath('/draco/')

const ROCKET_PATH = '/models/apollo-saturn-v.glb'
const ASTRONAUT_PATH = '/models/astronaut.glb'

function Rocket() {
  const { scene } = useGLTF(ROCKET_PATH)
  const processed = useRef(false)

  useEffect(() => {
    if (!scene || processed.current) return
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.envMapIntensity = 1.0
        child.material.needsUpdate = true
      }
    })
    processed.current = true
  }, [scene])

  return <primitive object={scene} position={[15, 0, -30]} scale={[0.8, 0.8, 0.8]} />
}

function Astronaut() {
  const { scene, animations } = useGLTF(ASTRONAUT_PATH)
  const { actions } = useAnimations(animations, scene)
  const processed = useRef(false)

  useEffect(() => {
    if (!scene || processed.current) return
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.envMapIntensity = 1.5
        child.material.needsUpdate = true
      }
    })
    processed.current = true
  }, [scene])

  useEffect(() => {
    const animNames = Object.keys(actions)
    if (animNames.length > 0 && actions[animNames[0]]) {
      actions[animNames[0]]!.reset().fadeIn(0.5).play()
    }
  }, [actions])

  useFrame((_, delta) => {
    scene.rotation.y += delta * 0.1
  })

  return <primitive object={scene} position={[-3, 2, 10]} scale={[2, 2, 2]} />
}

export function InteractiveRoom() {
  return (
    <group>
      <Rocket />
      <Astronaut />
    </group>
  )
}

useGLTF.preload(ROCKET_PATH)
useGLTF.preload(ASTRONAUT_PATH)
