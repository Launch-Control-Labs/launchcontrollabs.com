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
      <VariousPlanet nodeName="planet_gas_2"        worldSize={11} position={[-32,  12,  -38]} rotSpeed={0.006} floatOffset={0.0} />
      <Planet path="/models/earth.glb"              worldSize={9}  position={[ 28, -14,  -42]} rotSpeed={0.014} floatOffset={1.5} />
      <Planet path="/models/mercury.glb"            worldSize={4}  position={[-22,  18,  -90]} rotSpeed={0.028} floatOffset={3.0} />
      <VariousPlanet nodeName="planet_lava_7"       worldSize={7}  position={[ 48,   4, -110]} rotSpeed={0.022} floatOffset={2.2} />
      <VariousPlanet nodeName="planet_frozen_6"     worldSize={8}  position={[-50, -16, -130]} rotSpeed={0.016} floatOffset={4.0} />
      <VariousPlanet nodeName="planet_barren_8"     worldSize={5}  position={[ 38,  20, -170]} rotSpeed={0.010} floatOffset={1.0} />
      <VariousPlanet nodeName="planet_continental_4" worldSize={22} position={[-72,  -6, -280]} rotSpeed={0.008} floatOffset={5.0} />
      <VariousPlanet nodeName="planet_gas_2"        worldSize={16} position={[ 80,   8, -220]} rotSpeed={0.005} floatOffset={2.8} />
      <Planet path="/models/mercury.glb"            worldSize={6}  position={[-14, -20, -350]} rotSpeed={0.012} floatOffset={6.0} />
    </group>
  )
}

useGLTF.preload('/models/earth.glb')
useGLTF.preload('/models/mercury.glb')
useGLTF.preload('/models/various-planets.glb')
