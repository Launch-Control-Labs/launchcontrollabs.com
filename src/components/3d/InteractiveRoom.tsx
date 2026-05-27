'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react'
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

const VERT = `
  attribute float aAge;
  attribute float aMaxAge;
  attribute float aSize;
  varying float vAlpha;
  void main() {
    float t = clamp(aAge / aMaxAge, 0.0, 1.0);
    vAlpha = (1.0 - t) * (1.0 - t);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`

const FRAG = `
  uniform sampler2D uTex;
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec4 tex = texture2D(uTex, gl_PointCoord);
    gl_FragColor = vec4(uColor, tex.a * vAlpha);
    if (gl_FragColor.a < 0.01) discard;
  }
`

function makeParticleTexture(innerColor: string, outerColor: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 128; canvas.height = 128
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0,    innerColor)
  g.addColorStop(0.25, innerColor.replace(/[\d.]+\)$/, '0.8)'))
  g.addColorStop(0.55, outerColor)
  g.addColorStop(1,    'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(canvas)
}

interface StreamConfig {
  count: number
  spawnRadius: number
  speed: [number, number]
  spread: number
  lifetime: [number, number]
  size: [number, number]
  color: string
  innerColor: string
  outerColor: string
  dir: [number, number, number]
}

function PlumeStream({ config, position }: { config: StreamConfig; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Points>(null)
  const { count, spawnRadius, speed, spread, lifetime, size, color, innerColor, outerColor, dir } = config

  const arrays = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const vel  = new Float32Array(count * 3)
    const ages = new Float32Array(count)
    const maxA = new Float32Array(count)
    const sz   = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      ages[i] = Math.random() * (lifetime[1] - lifetime[0]) + lifetime[0]
      maxA[i] = lifetime[0] + Math.random() * (lifetime[1] - lifetime[0])
      sz[i]   = size[0] + Math.random() * (size[1] - size[0])
      const r = Math.random() * spawnRadius
      const th = Math.random() * Math.PI * 2
      const spd = speed[0] + Math.random() * (speed[1] - speed[0])
      pos[i*3]   = r * Math.cos(th)
      pos[i*3+1] = dir[1] * spd * ages[i]
      pos[i*3+2] = dir[2] * spd * ages[i]
      vel[i*3]   = (Math.random() - 0.5) * spread
      vel[i*3+1] = dir[1] * spd
      vel[i*3+2] = dir[2] * spd + (Math.random() - 0.5) * spread * 0.3
    }
    return { pos, vel, ages, maxA, sz }
  }, [count, spawnRadius, speed, spread, lifetime, size, dir])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(arrays.pos), 3))
    g.setAttribute('aAge',     new THREE.BufferAttribute(new Float32Array(arrays.ages), 1))
    g.setAttribute('aMaxAge',  new THREE.BufferAttribute(new Float32Array(arrays.maxA), 1))
    g.setAttribute('aSize',    new THREE.BufferAttribute(new Float32Array(arrays.sz), 1))
    return g
  }, [arrays])

  const mat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uTex:   { value: makeParticleTexture(innerColor, outerColor) },
      uColor: { value: new THREE.Color(color) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [color, innerColor, outerColor])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
    const ageAttr = meshRef.current.geometry.attributes.aAge as THREE.BufferAttribute
    const { pos, vel, ages, maxA } = arrays

    for (let i = 0; i < count; i++) {
      ages[i] += delta
      if (ages[i] >= maxA[i]) {
        ages[i] = 0
        const r = Math.random() * spawnRadius
        const th = Math.random() * Math.PI * 2
        const spd = speed[0] + Math.random() * (speed[1] - speed[0])
        pos[i*3]   = r * Math.cos(th)
        pos[i*3+1] = 0
        pos[i*3+2] = 0
        vel[i*3]   = (Math.random() - 0.5) * spread
        vel[i*3+1] = dir[1] * spd
        vel[i*3+2] = dir[2] * spd + (Math.random() - 0.5) * spread * 0.3
      }
      pos[i*3]   += vel[i*3]   * delta * 60
      pos[i*3+1] += vel[i*3+1] * delta * 60
      pos[i*3+2] += vel[i*3+2] * delta * 60
      vel[i*3]   *= 1.006
      vel[i*3+2] *= 1.004
    }
    posAttr.array.set(pos)
    ageAttr.array.set(ages)
    posAttr.needsUpdate = true
    ageAttr.needsUpdate = true
  })

  return <points ref={meshRef} geometry={geo} material={mat} position={position} frustumCulled={false} />
}

const DIR: [number, number, number] = [0, -0.707, 0.707]

const BELL_CONFIG: StreamConfig = {
  count: 60,
  spawnRadius: 0.06,
  speed: [0.35, 0.55],
  spread: 0.004,
  lifetime: [0.08, 0.22],
  size: [4, 7],
  color: '#e8f4ff',
  innerColor: 'rgba(240,248,255,1)',
  outerColor: 'rgba(180,220,255,0.6)',
  dir: DIR,
}

const CORE_CONFIG: StreamConfig = {
  count: 100,
  spawnRadius: 0.10,
  speed: [0.20, 0.32],
  spread: 0.006,
  lifetime: [0.25, 0.65],
  size: [5, 9],
  color: '#ffffff',
  innerColor: 'rgba(255,255,255,1)',
  outerColor: 'rgba(255,240,160,0.5)',
  dir: DIR,
}

const MID_CONFIG: StreamConfig = {
  count: 160,
  spawnRadius: 0.20,
  speed: [0.10, 0.18],
  spread: 0.014,
  lifetime: [0.5, 1.2],
  size: [9, 16],
  color: '#ff8820',
  innerColor: 'rgba(255,200,80,0.9)',
  outerColor: 'rgba(255,60,5,0.25)',
  dir: DIR,
}

const SMOKE_CONFIG: StreamConfig = {
  count: 100,
  spawnRadius: 0.28,
  speed: [0.04, 0.09],
  spread: 0.018,
  lifetime: [0.8, 2.0],
  size: [14, 26],
  color: '#442211',
  innerColor: 'rgba(160,100,50,0.4)',
  outerColor: 'rgba(40,25,10,0.0)',
  dir: DIR,
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
    groupRef.current.position.x = Math.sin(t * 0.038) * 0.3
    groupRef.current.position.y = 1 + Math.sin(t * 0.055) * 0.20
    groupRef.current.position.z = Math.sin(t * 0.028) * 0.30
    groupRef.current.rotation.x = Math.sin(t * 0.042) * 0.010
    groupRef.current.rotation.z = Math.sin(t * 0.033) * 0.007
  })

  return (
    <group ref={groupRef} position={[0, 1, 0]}>
      <group scale={[scale, scale, scale]} rotation={[Math.PI / 4, Math.PI, 0]}>
        <primitive object={scene} />
      </group>
      <PlumeStream config={SMOKE_CONFIG} position={[0, -4.24, 4.24]} />
      <PlumeStream config={MID_CONFIG}   position={[0, -4.24, 4.24]} />
      <PlumeStream config={CORE_CONFIG}  position={[0, -4.24, 4.24]} />
      <PlumeStream config={BELL_CONFIG}  position={[0, -4.24, 4.24]} />
    </group>
  )
}

export function InteractiveRoom() {
  const tier = useDeviceTier()
  const rocketPath = tier >= 3 ? ROCKET_PATH_FULL : ROCKET_PATH_OPT

  return (
    <group>
      <Rocket modelPath={rocketPath} />
    </group>
  )
}

useGLTF.preload(ROCKET_PATH_OPT)
