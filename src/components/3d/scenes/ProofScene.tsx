'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const PLANETS_PATH = '/models/various-planets.glb'

const SCENE_PLANETS = [
  { name: 'planet_continental_4', worldSize: 9,  pos: [-6,  2, -8]  as [number,number,number], speed: 0.018, tilt: 0.3 },
  { name: 'planet_gas_2',         worldSize: 7,  pos: [ 8, -2, -6]  as [number,number,number], speed: 0.012, tilt: 0.1 },
  { name: 'planet_lava_7',        worldSize: 5,  pos: [-2,  5, -12] as [number,number,number], speed: 0.025, tilt: 0.5 },
  { name: 'planet_frozen_6',      worldSize: 4,  pos: [ 10, 6, -14] as [number,number,number], speed: 0.020, tilt: 0.2 },
  { name: 'planet_barren_8',      worldSize: 3,  pos: [-10,-4, -10] as [number,number,number], speed: 0.030, tilt: 0.4 },
]

function ScenePlanet({ nodeName, worldSize, position, rotSpeed, tilt }: {
  nodeName: string; worldSize: number; position: [number,number,number]; rotSpeed: number; tilt: number
}) {
  const { scene } = useGLTF(PLANETS_PATH)
  const ref = useRef<THREE.Group>(null)
  const { clone, scale } = useMemo(() => {
    const node = scene.getObjectByName(nodeName)
    if (!node) return { clone: null, scale: 1 }
    const cloned = node.clone(true)
    const box = new THREE.Box3().setFromObject(cloned)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    return { clone: cloned, scale: maxDim > 0 ? worldSize / maxDim : 1 }
  }, [scene, nodeName, worldSize])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * rotSpeed
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.2 + tilt * 10) * 0.3
  })

  if (!clone) return null
  return (
    <group ref={ref} position={position} scale={scale} rotation={[tilt * 0.3, 0, tilt * 0.1]}>
      <primitive object={clone} />
    </group>
  )
}

export function ProofScene() {
  return (
    <group>
      <ambientLight intensity={0.12} />
      <pointLight position={[5, 5, 8]}   intensity={1.4} color="#F59E0B" distance={60} />
      <pointLight position={[-8, -3, 5]} intensity={0.6} color="#FCD34D" distance={40} />
      <pointLight position={[0, 10, -5]} intensity={0.3} color="#ffffff" distance={50} />
      {SCENE_PLANETS.map((p) => (
        <ScenePlanet
          key={p.name}
          nodeName={p.name}
          worldSize={p.worldSize}
          position={p.pos}
          rotSpeed={p.speed}
          tilt={p.tilt}
        />
      ))}
    </group>
  )
}

useGLTF.preload(PLANETS_PATH)
