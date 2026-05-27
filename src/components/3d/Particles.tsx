'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const STAR_COUNT = 3000

function StarField() {
  const { positions } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3)
    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 50 + Math.random() * 150
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return { positions }
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64; canvas.height = 64
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.25, 'rgba(220,235,255,0.9)')
    g.addColorStop(0.6, 'rgba(180,210,255,0.3)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
    return new THREE.CanvasTexture(canvas)
  }, [])

  return (
    <points geometry={geometry} frustumCulled={false}>
      <pointsMaterial map={starTexture} size={1.5} sizeAttenuation={false}
        transparent alphaTest={0.005} color="#ffffff" depthWrite={false} fog={false} />
    </points>
  )
}

function Planet({ path, worldSize, position, rotSpeed = 0.02, floatOffset = 0 }: {
  path: string; worldSize: number; position: [number,number,number]; rotSpeed?: number; floatOffset?: number
}) {
  const { scene } = useGLTF(path)
  const ref = useRef<THREE.Group>(null)
  const scale = useMemo(() => {
    scene.updateWorldMatrix(true, true)
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    return maxDim > 0 ? worldSize / maxDim : 1
  }, [scene, worldSize])
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y += rotSpeed * 0.016
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.3 + floatOffset) * 0.5
  })
  return <group ref={ref} position={position} scale={[scale, scale, scale]}><primitive object={scene} /></group>
}

function VariousPlanet({ nodeName, worldSize, position, rotSpeed, floatOffset }: {
  nodeName: string; worldSize: number; position: [number,number,number]; rotSpeed: number; floatOffset: number
}) {
  const { scene } = useGLTF('/models/various-planets.glb')
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
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y += rotSpeed * 0.016
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.25 + floatOffset) * 0.5
  })
  if (!clone) return null
  return <group ref={ref} position={position} scale={[scale, scale, scale]}><primitive object={clone} /></group>
}

export function Particles() {
  return (
    <group>
      <StarField />

      {/* === NEAR LAYER (z = -15 to -25) — flanking the shuttle === */}
      {/* Far left near — large, bleeds off left edge */}
      <VariousPlanet nodeName="planet_gas_2" worldSize={14} position={[-18, 4, -20]} rotSpeed={0.006} floatOffset={0.0} />
      {/* Far right near — medium */}
      <Planet path="/models/earth.glb" worldSize={10} position={[16, -3, -18]} rotSpeed={0.014} floatOffset={1.5} />

      {/* === MID LAYER (z = -50 to -80) — fills the sides === */}
      {/* Hard left mid */}
      <Planet path="/models/mercury.glb" worldSize={5} position={[-36, 10, -60]} rotSpeed={0.028} floatOffset={3.0} />
      {/* Hard right mid */}
      <VariousPlanet nodeName="planet_lava_7" worldSize={7} position={[34, 6, -55]} rotSpeed={0.022} floatOffset={2.2} />
      {/* Left mid-low */}
      <VariousPlanet nodeName="planet_frozen_6" worldSize={9} position={[-28, -10, -70]} rotSpeed={0.016} floatOffset={4.0} />
      {/* Right mid-high */}
      <VariousPlanet nodeName="planet_barren_8" worldSize={6} position={[30, 14, -65]} rotSpeed={0.010} floatOffset={1.0} />

      {/* === DEEP LAYER (z = -120 to -200) — background depth === */}
      {/* Deep left — very large, atmospheric */}
      <VariousPlanet nodeName="planet_continental_4" worldSize={20} position={[-70, -5, -150]} rotSpeed={0.008} floatOffset={5.0} />
      {/* Deep right */}
      <VariousPlanet nodeName="planet_gas_2" worldSize={16} position={[65, 8, -130]} rotSpeed={0.005} floatOffset={2.8} />
      {/* Deep center-left — partially behind shuttle */}
      <Planet path="/models/mercury.glb" worldSize={8} position={[-12, 18, -120]} rotSpeed={0.012} floatOffset={6.0} />
    </group>
  )
}

useGLTF.preload('/models/earth.glb')
useGLTF.preload('/models/mercury.glb')
useGLTF.preload('/models/various-planets.glb')
