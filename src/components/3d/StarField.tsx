'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STAR_COUNT = 3000

interface StarFieldProps {
  opacity?: number
}

export function StarField({ opacity = 1 }: StarFieldProps) {
  const groupRef = useRef<THREE.Group>(null)

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
    if (typeof document === 'undefined') return null
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

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.004
    groupRef.current.rotation.x += delta * 0.001
  })

  if (!starTexture) return null

  return (
    <group ref={groupRef}>
      <points geometry={geometry} frustumCulled={false}>
        <pointsMaterial
          map={starTexture}
          size={1.5}
          sizeAttenuation={false}
          transparent
          opacity={opacity}
          alphaTest={0.005}
          color="#ffffff"
          depthWrite={false}
          fog={false}
        />
      </points>
    </group>
  )
}
