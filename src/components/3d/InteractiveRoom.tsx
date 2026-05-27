'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

useGLTF.setDecoderPath('/draco/')

const ROCKET_PATH = '/models/space-shuttle.glb'
const ASTRONAUT_PATH = '/models/astronaut-converted.glb'

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

function Rocket() {
  const { scene } = useGLTF(ROCKET_PATH)
  const processed = useRef(false)
  const [scale, setScale] = useState(1)
  const groupRef = useRef<THREE.Group>(null)

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
    setScale(normalizeToHeight(scene, 8))
    const box2 = new THREE.Box3().setFromObject(scene)
    const size2 = box2.getSize(new THREE.Vector3())
    console.log('SHUTTLE_BBOX:', JSON.stringify({
      x: { min: box2.min.x.toFixed(2), max: box2.max.x.toFixed(2), size: size2.x.toFixed(2) },
      y: { min: box2.min.y.toFixed(2), max: box2.max.y.toFixed(2), size: size2.y.toFixed(2) },
      z: { min: box2.min.z.toFixed(2), max: box2.max.z.toFixed(2), size: size2.z.toFixed(2) },
      longestAxis: size2.x > size2.y && size2.x > size2.z ? 'X' : size2.y > size2.z ? 'Y' : 'Z',
      scale: normalizeToHeight(scene, 8).toFixed(4)
    }))
    processed.current = true
  }, [scene])

  useFrame((_, delta) => {
    if (!groupRef.current) return
  })

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -4, 0]} rotation={[-0.1, 0, 0]}>
      <primitive object={scene} />
    </group>
  )
}

function Astronaut() {
  const { scene, animations } = useGLTF(ASTRONAUT_PATH)
  const groupRef = useRef<THREE.Group>(null)
  const { actions } = useAnimations(animations, groupRef)
  const driftRef = useRef(0)

  useEffect(() => {
    const clip = actions['floating'] ?? actions[Object.keys(actions)[0]]
    if (clip) clip.reset().fadeIn(0.5).play()
  }, [actions])

  useLayoutEffect(() => {
    if (!scene) return
    const mats: object[] = []
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const m = child.material as THREE.MeshStandardMaterial
        mats.push({
          name: child.name,
          matType: m?.type,
          opacity: m?.opacity,
          visible: child.visible,
          transparent: m?.transparent,
          hasMap: !!m?.map,
          hasNormalMap: !!m?.normalMap,
          color: m?.color?.getHexString?.()
        })
      }
    })
    console.log('ASTRO_MATERIALS:', JSON.stringify(mats))
    console.log('ASTRO_ANIM_CLIPS:', JSON.stringify(Object.keys(actions)))
  }, [scene, actions])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    driftRef.current += delta
    groupRef.current.position.y = 3 + Math.sin(driftRef.current * 0.25) * 0.6
    groupRef.current.rotation.y += delta * 0.03
  })

  return (
    <group ref={groupRef} position={[7, 3, -15]}>
      <primitive
        object={scene}
        scale={[0.022, 0.022, 0.022]}
        rotation={[0.05, 0.4, 0.08]}
      />
    </group>
  )
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
