'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useDeviceTier } from '@/hooks/useDeviceTier'

useGLTF.setDecoderPath('/draco/')

const ROCKET_PATH_FULL = '/models/space-shuttle.glb'
const ROCKET_PATH_OPT = '/models/optimized/space-shuttle.glb'
const SMOKE_PATH = '/models/evanescent-smoke.glb'

const HIDE_NODES = [
  'Small_Rocket_Group_02', 'Small_Rocket_Group_01',
  'Turbine_Group1', 'Rocket_01', 'Rocket_Details_01'
]

function normalizeToHeight(scene: THREE.Object3D, targetHeight: number): number {
  const box = new THREE.Box3().setFromObject(scene)
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  return targetHeight / maxDim
}

function Rocket({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath)
  const processed = useRef(false)
  const [scale, setScale] = useState(1)
  const groupRef = useRef<THREE.Group>(null)
  const zOffset = useRef(0)

  useLayoutEffect(() => {
    if (!scene || processed.current) return
    scene.traverse((child) => {
      if (HIDE_NODES.some(name => child.name.startsWith(name))) {
        child.visible = false
      }
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.envMapIntensity = 0.5
        child.material.needsUpdate = true
      }
    })
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    scene.position.sub(center)
    setScale(normalizeToHeight(scene, 12))
    processed.current = true
  }, [scene])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    groupRef.current.position.x = Math.sin(t * 0.04) * 0.4
    groupRef.current.position.y = -2 + Math.sin(t * 0.07) * 0.3
    groupRef.current.position.z = Math.sin(t * 0.05) * 0.5
  })

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -2, 0]} rotation={[Math.PI / 2.5, Math.PI, 0]}>
      <primitive object={scene} />
    </group>
  )
}

function Smoke() {
  const { scene, animations } = useGLTF(SMOKE_PATH)
  const groupRef = useRef<THREE.Group>(null)
  const { actions } = useAnimations(animations, groupRef)

  useEffect(() => {
    const clip = actions['Animation'] ?? actions[Object.keys(actions)[0]]
    if (clip) {
      clip.reset().play()
      clip.setLoop(THREE.LoopRepeat, Infinity)
    }
  }, [actions])

  return (
    <group ref={groupRef} position={[0, -8, 2]} scale={[0.25, 0.25, 0.25]}>
      <primitive object={scene} />
    </group>
  )
}

export function InteractiveRoom() {
  const tier = useDeviceTier()
  const rocketPath = tier >= 3 ? ROCKET_PATH_FULL : ROCKET_PATH_OPT

  return (
    <group>
      <Rocket modelPath={rocketPath} />
      <Smoke />
    </group>
  )
}

useGLTF.preload(ROCKET_PATH_OPT)
