'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useDeviceTier } from '@/hooks/useDeviceTier'

useGLTF.setDecoderPath('/draco/')

const ROCKET_PATH_FULL = '/models/space-shuttle.glb'
const ROCKET_PATH_OPT = '/models/optimized/space-shuttle.glb'
const ASTRONAUT_PATH_FULL = '/models/astronaut-converted.glb?v=2'
const ASTRONAUT_PATH_OPT = '/models/optimized/astronaut-converted.glb'
const SMOKE_PATH = '/models/smoke.glb'

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
    setScale(normalizeToHeight(scene, 7))
    processed.current = true
  }, [scene])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    zOffset.current += delta * 0.12
    if (zOffset.current > 3.5) zOffset.current = 0

    groupRef.current.position.z = zOffset.current
    groupRef.current.position.x = Math.sin(t * 0.07) * 0.15
    groupRef.current.position.y = -1 + Math.sin(t * 0.11) * 0.08
  })

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -1, 0]} rotation={[Math.PI / 2.5, Math.PI, 0]}>
      <primitive object={scene} />
    </group>
  )
}

function Astronaut({ modelPath }: { modelPath: string }) {
  const { scene, animations } = useGLTF(modelPath)
  const groupRef = useRef<THREE.Group>(null)
  const { actions } = useAnimations(animations, groupRef)
  const t = useRef(0)
  const origin = useRef(new THREE.Vector3(5, 0, -12))

  useLayoutEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.visible = true
        child.frustumCulled = false
        if (child.material) {
          const mat = child.material as THREE.MeshStandardMaterial
          mat.opacity = 1
          mat.transparent = false
          mat.depthWrite = true
          mat.needsUpdate = true
        }
      }
    })
  }, [scene])

  useEffect(() => {
    const clip = actions['floating'] ?? actions[Object.keys(actions)[0]]
    if (clip) clip.reset().fadeIn(0.5).play()
  }, [actions])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    t.current += delta

    const s = t.current

    groupRef.current.position.x = origin.current.x
      + Math.sin(s * 0.057) * 0.4
      + Math.sin(s * 0.031) * 0.2

    groupRef.current.position.y = origin.current.y
      + Math.sin(s * 0.071) * 0.5
      + Math.sin(s * 0.043) * 0.25

    groupRef.current.position.z = origin.current.z
      + Math.sin(s * 0.047) * 0.3

    groupRef.current.rotation.y += delta * 0.018
    groupRef.current.rotation.x = Math.sin(s * 0.037) * 0.08
    groupRef.current.rotation.z = Math.sin(s * 0.029) * 0.05
  })

  return (
    <group ref={groupRef} position={[5, 0, -12]}>
      <primitive
        object={scene}
        scale={[1.5, 1.5, 1.5]}
        rotation={[0.05, 0.4, 0.08]}
      />
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
    <group ref={groupRef} position={[0, -4.3, 1.1]} scale={[0.4, 0.4, 0.4]}>
      <primitive object={scene} />
    </group>
  )
}

export function InteractiveRoom() {
  const tier = useDeviceTier()
  const rocketPath = tier >= 3 ? ROCKET_PATH_FULL : ROCKET_PATH_OPT
  const astronautPath = tier >= 3 ? ASTRONAUT_PATH_FULL : ASTRONAUT_PATH_OPT

  return (
    <group>
      <Rocket modelPath={rocketPath} />
      <Astronaut modelPath={astronautPath} />
      {tier >= 3 && <Smoke />}
    </group>
  )
}

useGLTF.preload(ROCKET_PATH_OPT)
useGLTF.preload(ASTRONAUT_PATH_OPT)
useGLTF.preload(SMOKE_PATH)
