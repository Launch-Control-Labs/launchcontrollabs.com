'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const PLANET_NODES = [
  { name: 'planet_gas_2',        pos: [-10, 5, -8]  as [number,number,number], scale: 2.5, speed: 0.03 },
  { name: 'planet_lava_7',       pos: [8, -3, -5]   as [number,number,number], scale: 1.8, speed: 0.05 },
  { name: 'planet_continental_4',pos: [12, 8, -12]  as [number,number,number], scale: 3.0, speed: 0.02 },
  { name: 'planet_frozen_6',     pos: [-6, -6, -10] as [number,number,number], scale: 2.0, speed: 0.04 },
]

function ProofPlanet({ nodeName, position, worldScale, rotSpeed }: {
  nodeName: string
  position: [number, number, number]
  worldScale: number
  rotSpeed: number
}) {
  const { scene } = useGLTF('/models/various-planets.glb')
  const ref = useRef<THREE.Group>(null)
  const clone = useMemo(() => {
    const node = scene.getObjectByName(nodeName)
    if (!node) return null
    return node.clone(true)
  }, [scene, nodeName])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * rotSpeed
  })

  if (!clone) return null
  return (
    <group ref={ref} position={position} scale={[worldScale, worldScale, worldScale]}>
      <primitive object={clone} />
    </group>
  )
}

export function ProofScene() {
  return (
    <group>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 3, 5]} intensity={0.8} color="#F59E0B" />
      <pointLight position={[-3, -2, 3]} intensity={0.4} color="#FCD34D" />
      {PLANET_NODES.map((p) => (
        <ProofPlanet
          key={p.name}
          nodeName={p.name}
          position={p.pos}
          worldScale={p.scale}
          rotSpeed={p.speed}
        />
      ))}
    </group>
  )
}

useGLTF.preload('/models/various-planets.glb')
