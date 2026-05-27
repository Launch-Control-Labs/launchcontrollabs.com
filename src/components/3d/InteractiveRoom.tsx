'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useDeviceTier } from '@/hooks/useDeviceTier'

useGLTF.setDecoderPath('/draco/')

const ROCKET_PATH_FULL = '/models/space-shuttle.glb'
const ROCKET_PATH_OPT  = '/models/optimized/space-shuttle.glb'

const HIDE_NODES = [
  'Small_Rocket_Group_02', 'Small_Rocket_Group_01',
  'Turbine_Group1', 'Rocket_01', 'Rocket_Details_01',
]

function normalizeToHeight(scene: THREE.Object3D, targetHeight: number): number {
  const box  = new THREE.Box3().setFromObject(scene)
  const size = box.getSize(new THREE.Vector3())
  return targetHeight / Math.max(size.x, size.y, size.z)
}

const VERT = `
  attribute float aAge;
  attribute float aMaxAge;
  attribute float aSize;
  varying float vAlpha;
  void main() {
    float t  = clamp(aAge / aMaxAge, 0.0, 1.0);
    vAlpha   = (1.0 - t) * (1.0 - t);
    vec4 mv  = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (300.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`

const FRAG = `
  uniform sampler2D uTex;
  uniform vec3      uColor;
  varying float     vAlpha;
  void main() {
    vec4 tex = texture2D(uTex, gl_PointCoord);
    gl_FragColor = vec4(uColor, tex.a * vAlpha);
    if (gl_FragColor.a < 0.01) discard;
  }
`

function makeTexture(inner: string, outer: string): THREE.CanvasTexture {
  const c   = document.createElement('canvas')
  c.width   = 128; c.height = 128
  const ctx = c.getContext('2d')!
  const g   = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0,    inner)
  g.addColorStop(0.25, inner.replace(/[\d.]+\)$/, '0.8)'))
  g.addColorStop(0.55, outer)
  g.addColorStop(1,    'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

interface StreamConfig {
  count:       number
  radius:      number
  speed:       [number, number]
  spread:      number
  lifetime:    [number, number]
  size:        [number, number]
  color:       string
  inner:       string
  outer:       string
  expand:      number
}

// All streams use local-space direction [0, -1, 0] (straight down from nozzle).
// Because PlumeStream lives inside the inner rotated group, Three.js transforms
// this to world space automatically — no manual direction math needed.

// ─── PlumeStream ─────────────────────────────────────────────────────────────

function PlumeStream({ cfg, pos }: { cfg: StreamConfig; pos: [number, number, number] }) {
  const ref = useRef<THREE.Points>(null)
  const { count, radius, speed, spread, lifetime, size, color, inner, outer, expand } = cfg

  const arrays = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const vel  = new Float32Array(count * 3)
    const ages = new Float32Array(count)
    const maxA = new Float32Array(count)
    const sz   = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const age = Math.random() * (lifetime[1] - lifetime[0]) + lifetime[0]
      const max = lifetime[0] + Math.random() * (lifetime[1] - lifetime[0])
      const spd = speed[0] + Math.random() * (speed[1] - speed[0])
      const r   = Math.random() * radius
      const th  = Math.random() * Math.PI * 2
      ages[i]   = age
      maxA[i]   = max
      sz[i]     = size[0] + Math.random() * (size[1] - size[0])
      pos[i*3]     = r * Math.cos(th)
      pos[i*3 + 1] = -spd * age
      pos[i*3 + 2] = 0
      vel[i*3]     = (Math.random() - 0.5) * spread
      vel[i*3 + 1] = -spd
      vel[i*3 + 2] = (Math.random() - 0.5) * spread
    }
    return { pos, vel, ages, maxA, sz }
  }, [count, radius, speed, spread, lifetime, size])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(arrays.pos),  3))
    g.setAttribute('aAge',     new THREE.BufferAttribute(new Float32Array(arrays.ages), 1))
    g.setAttribute('aMaxAge',  new THREE.BufferAttribute(new Float32Array(arrays.maxA), 1))
    g.setAttribute('aSize',    new THREE.BufferAttribute(new Float32Array(arrays.sz),   1))
    return g
  }, [arrays])

  const mat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader:   VERT,
    fragmentShader: FRAG,
    uniforms: {
      uTex:   { value: makeTexture(inner, outer) },
      uColor: { value: new THREE.Color(color) },
    },
    transparent: true,
    depthWrite:  false,
    blending:    THREE.AdditiveBlending,
  }), [color, inner, outer])

  useFrame((_, delta) => {
    if (!ref.current) return
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute
    const ageAttr = ref.current.geometry.attributes.aAge     as THREE.BufferAttribute
    const { pos, vel, ages, maxA } = arrays

    for (let i = 0; i < count; i++) {
      ages[i] += delta
      if (ages[i] >= maxA[i]) {
        const spd = speed[0] + Math.random() * (speed[1] - speed[0])
        const r   = Math.random() * radius
        const th  = Math.random() * Math.PI * 2
        ages[i]      = 0
        pos[i*3]     = r * Math.cos(th)
        pos[i*3 + 1] = 0
        pos[i*3 + 2] = 0
        vel[i*3]     = (Math.random() - 0.5) * spread
        vel[i*3 + 1] = -spd
        vel[i*3 + 2] = (Math.random() - 0.5) * spread
      }
      pos[i*3]     += vel[i*3]     * delta * 60
      pos[i*3 + 1] += vel[i*3 + 1] * delta * 60
      pos[i*3 + 2] += vel[i*3 + 2] * delta * 60
      vel[i*3]     += (Math.random() - 0.5) * expand * delta
      vel[i*3 + 2] += (Math.random() - 0.5) * expand * delta
    }
    posAttr.array.set(pos)
    ageAttr.array.set(ages)
    posAttr.needsUpdate = true
    ageAttr.needsUpdate = true
  })

  return (
    <points
      ref={ref}
      geometry={geo}
      material={mat}
      position={pos}
      frustumCulled={false}
    />
  )
}

const NOZZLE_Y = -4.665
const NOZZLE: [number, number, number] = [0, NOZZLE_Y, 0]

const STREAK_CFG: StreamConfig = {
  count:    80,
  radius:   0.04,
  speed:    [0.55, 0.80],
  spread:   0.002,
  lifetime: [0.05, 0.14],
  size:     [3, 5],
  color:    '#d0eeff',
  inner:    'rgba(220,240,255,1)',
  outer:    'rgba(160,210,255,0.5)',
  expand:   0.002,
}

const BELL_CFG: StreamConfig = {
  count:    90,
  radius:   0.08,
  speed:    [0.30, 0.50],
  spread:   0.005,
  lifetime: [0.10, 0.28],
  size:     [4, 8],
  color:    '#ffffff',
  inner:    'rgba(255,255,255,1)',
  outer:    'rgba(255,240,180,0.5)',
  expand:   0.006,
}

const CORE_CFG: StreamConfig = {
  count:    120,
  radius:   0.12,
  speed:    [0.18, 0.32],
  spread:   0.008,
  lifetime: [0.20, 0.60],
  size:     [5, 10],
  color:    '#ffffff',
  inner:    'rgba(255,255,255,1)',
  outer:    'rgba(255,200,60,0.4)',
  expand:   0.015,
}

const MID_CFG: StreamConfig = {
  count:    160,
  radius:   0.18,
  speed:    [0.08, 0.18],
  spread:   0.012,
  lifetime: [0.40, 1.10],
  size:     [8, 16],
  color:    '#ff7700',
  inner:    'rgba(255,180,60,0.9)',
  outer:    'rgba(255,50,5,0.2)',
  expand:   0.025,
}

const SMOKE_CFG: StreamConfig = {
  count:    90,
  radius:   0.25,
  speed:    [0.03, 0.08],
  spread:   0.015,
  lifetime: [0.70, 1.80],
  size:     [12, 24],
  color:    '#331a0a',
  inner:    'rgba(140,90,40,0.35)',
  outer:    'rgba(30,15,5,0.0)',
  expand:   0.030,
}

function Rocket({ modelPath }: { modelPath: string }) {
  const { scene }    = useGLTF(modelPath)
  const processed    = useRef(false)
  const [scale, setScale] = useState(1)
  const outerRef     = useRef<THREE.Group>(null)

  useLayoutEffect(() => {
    if (!scene || processed.current) return
    scene.traverse((child) => {
      if (HIDE_NODES.some(n => child.name.startsWith(n))) child.visible = false
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.envMapIntensity = 0.5
        child.material.needsUpdate     = true
      }
    })
    const box    = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    scene.position.sub(center)
    setScale(normalizeToHeight(scene, 12))
    processed.current = true
  }, [scene])

  useFrame((state) => {
    if (!outerRef.current) return
    const t = state.clock.elapsedTime
    outerRef.current.position.x = Math.sin(t * 0.038) * 0.3
    outerRef.current.position.y = 1 + Math.sin(t * 0.055) * 0.20
    outerRef.current.position.z = Math.sin(t * 0.028) * 0.30
    outerRef.current.rotation.x = Math.sin(t * 0.042) * 0.010
    outerRef.current.rotation.z = Math.sin(t * 0.033) * 0.007
  })

  return (
    <group ref={outerRef} position={[0, 1, 0]}>
      <group rotation={[Math.PI / 4, Math.PI, 0]}>
        <group scale={scale}>
          <primitive object={scene} />
        </group>
        <PlumeStream cfg={SMOKE_CFG}  pos={NOZZLE} />
        <PlumeStream cfg={MID_CFG}    pos={NOZZLE} />
        <PlumeStream cfg={CORE_CFG}   pos={NOZZLE} />
        <PlumeStream cfg={BELL_CFG}   pos={NOZZLE} />
        <PlumeStream cfg={STREAK_CFG} pos={NOZZLE} />
      </group>
    </group>
  )
}

export function InteractiveRoom() {
  const tier       = useDeviceTier()
  const rocketPath = tier >= 3 ? ROCKET_PATH_FULL : ROCKET_PATH_OPT
  return (
    <group>
      <Rocket modelPath={rocketPath} />
    </group>
  )
}

useGLTF.preload(ROCKET_PATH_OPT)
