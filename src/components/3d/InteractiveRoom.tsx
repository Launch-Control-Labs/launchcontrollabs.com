'use client'

import { useLayoutEffect, useRef, useState, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useDeviceTier } from '@/hooks/useDeviceTier'

useGLTF.setDecoderPath('/draco/')

const ROCKET_PATH_FULL = '/models/space-shuttle.glb'
const ROCKET_PATH_OPT = '/models/optimized/space-shuttle.glb'

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

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.x = Math.sin(t * 0.04) * 0.4
    groupRef.current.position.y = 2 + Math.sin(t * 0.07) * 0.3
    groupRef.current.position.z = Math.sin(t * 0.05) * 0.5
  })

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 2, 0]} rotation={[Math.PI / 2.5, Math.PI, 0]}>
      <primitive object={scene} />
    </group>
  )
}

const PARTICLE_COUNT = 120

function ExhaustSmoke() {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, velocities, lifetimes, maxLifetimes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    const lifetimes = new Float32Array(PARTICLE_COUNT)
    const maxLifetimes = new Float32Array(PARTICLE_COUNT)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      lifetimes[i] = Math.random() * 2.5
      maxLifetimes[i] = 2.0 + Math.random() * 1.5
      positions[i * 3]     = (Math.random() - 0.5) * 0.8
      positions[i * 3 + 1] = -Math.random() * 3
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8
      velocities[i * 3]     = (Math.random() - 0.5) * 0.025
      velocities[i * 3 + 1] = -(0.015 + Math.random() * 0.02)
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.025
    }
    return { positions, velocities, lifetimes, maxLifetimes }
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
    return geo
  }, [positions])

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128; canvas.height = 128
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    g.addColorStop(0,   'rgba(255,255,255,1.0)')
    g.addColorStop(0.2, 'rgba(220,230,240,0.8)')
    g.addColorStop(0.5, 'rgba(180,200,220,0.4)')
    g.addColorStop(1,   'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 128, 128)
    return new THREE.CanvasTexture(canvas)
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      lifetimes[i] += delta
      if (lifetimes[i] > maxLifetimes[i]) {
        lifetimes[i] = 0
        positions[i * 3]     = (Math.random() - 0.5) * 0.8
        positions[i * 3 + 1] = 0
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8
        velocities[i * 3]     = (Math.random() - 0.5) * 0.025
        velocities[i * 3 + 1] = -(0.015 + Math.random() * 0.02)
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.025
      }
      positions[i * 3]     += velocities[i * 3]
      positions[i * 3 + 1] += velocities[i * 3 + 1]
      positions[i * 3 + 2] += velocities[i * 3 + 2]
      velocities[i * 3]     *= 1.01
      velocities[i * 3 + 2] *= 1.01
    }

    pos.array.set(positions)
    pos.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry} position={[0, -4.5, 0.5]}>
      <pointsMaterial
        map={texture}
        size={2.5}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        fog={false}
      />
    </points>
  )
}

export function InteractiveRoom() {
  const tier = useDeviceTier()
  const rocketPath = tier >= 3 ? ROCKET_PATH_FULL : ROCKET_PATH_OPT

  return (
    <group>
      <Rocket modelPath={rocketPath} />
      <ExhaustSmoke />
    </group>
  )
}

useGLTF.preload(ROCKET_PATH_OPT)
