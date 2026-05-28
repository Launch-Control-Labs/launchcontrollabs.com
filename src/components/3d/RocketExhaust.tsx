'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Shaders ─────────────────────────────────────────────────────────────────

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

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── Types ───────────────────────────────────────────────────────────────────

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

// ─── PlumeStream ─────────────────────────────────────────────────────────────

function PlumeStream({ cfg, pos, dir }: { cfg: StreamConfig; pos: [number, number, number]; dir: [number, number, number] }) {
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
      pos[i*3]     = dir[0] * spd * age + r * Math.cos(th)
      pos[i*3 + 1] = dir[1] * spd * age
      pos[i*3 + 2] = dir[2] * spd * age
      vel[i*3]     = dir[0] * spd + (Math.random() - 0.5) * spread
      vel[i*3 + 1] = dir[1] * spd
      vel[i*3 + 2] = dir[2] * spd + (Math.random() - 0.5) * spread
    }
    return { pos, vel, ages, maxA, sz }
  }, [count, radius, speed, spread, lifetime, size, dir])

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
        vel[i*3]     = dir[0] * spd + (Math.random() - 0.5) * spread
        vel[i*3 + 1] = dir[1] * spd
        vel[i*3 + 2] = dir[2] * spd + (Math.random() - 0.5) * spread
      }
      pos[i*3]     += vel[i*3]     * delta * 60
      pos[i*3 + 1] += vel[i*3 + 1] * delta * 60
      pos[i*3 + 2] += vel[i*3 + 2] * delta * 60
      vel[i*3]     += (Math.random() - 0.5) * expand * delta
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

// ─── Stream Configs ──────────────────────────────────────────────────────────

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
  speed:    [0.16, 0.30],
  spread:   0.010,
  lifetime: [0.25, 0.65],
  size:     [7, 14],
  color:    '#ff7700',
  inner:    'rgba(255,180,60,0.9)',
  outer:    'rgba(255,50,5,0.2)',
  expand:   0.010,
}

const SMOKE_CFG: StreamConfig = {
  count:    70,
  radius:   0.22,
  speed:    [0.20, 0.40],
  spread:   0.010,
  lifetime: [0.30, 0.70],
  size:     [10, 20],
  color:    '#331a0a',
  inner:    'rgba(140,90,40,0.30)',
  outer:    'rgba(30,15,5,0.0)',
  expand:   0.008,
}

const SIDE_SMOKE_CFG: StreamConfig = {
  count:    40,
  radius:   0.30,
  speed:    [0.14, 0.28],
  spread:   0.035,
  lifetime: [0.50, 1.20],
  size:     [10, 22],
  color:    '#999999',
  inner:    'rgba(180,180,180,0.15)',
  outer:    'rgba(100,100,100,0.0)',
  expand:   0.015,
}

const SRB_FIRE_CFG: StreamConfig = {
  count:    100,
  radius:   0.12,
  speed:    [0.38, 0.68],
  spread:   0.006,
  lifetime: [0.08, 0.22],
  size:     [8, 16],
  color:    '#ffaa00',
  inner:    'rgba(255,230,120,1)',
  outer:    'rgba(255,80,0,0.5)',
  expand:   0.012,
}

const SSME_CORE_CFG: StreamConfig = {
  count:    110,
  radius:   0.05,
  speed:    [0.45, 0.70],
  spread:   0.003,
  lifetime: [0.06, 0.18],
  size:     [2, 5],
  color:    '#b8e0ff',
  inner:    'rgba(210,235,255,1)',
  outer:    'rgba(100,180,255,0.35)',
  expand:   0.003,
}

const SSME_BELL_CFG: StreamConfig = {
  count:    85,
  radius:   0.09,
  speed:    [0.28, 0.48],
  spread:   0.004,
  lifetime: [0.10, 0.26],
  size:     [4, 8],
  color:    '#ffffff',
  inner:    'rgba(240,250,255,1)',
  outer:    'rgba(150,200,255,0.25)',
  expand:   0.005,
}

// ─── RocketExhaust ───────────────────────────────────────────────────────────

interface RocketExhaustProps {
  nozzlePosition: [number, number, number]
  direction: [number, number, number]
  intensity?: number  // 0-1, default 1.0 — scales with scroll to fade out
  visible?: boolean   // default true
  srbAttached?: boolean  // true = SRBs present, false = orbiter engines only
}

export function RocketExhaust({
  nozzlePosition,
  direction,
  intensity = 1.0,
  visible = true,
  srbAttached = true,
}: RocketExhaustProps) {
  if (!visible || intensity <= 0) return null

  const [nx, ny, nz] = nozzlePosition

  if (srbAttached) {
    return (
      <>
        {/* Center column: main plume */}
        <PlumeStream cfg={SMOKE_CFG}  pos={nozzlePosition} dir={direction} />
        <PlumeStream cfg={MID_CFG}    pos={nozzlePosition} dir={direction} />
        <PlumeStream cfg={CORE_CFG}   pos={nozzlePosition} dir={direction} />
        <PlumeStream cfg={BELL_CFG}   pos={nozzlePosition} dir={direction} />
        <PlumeStream cfg={STREAK_CFG} pos={nozzlePosition} dir={direction} />
        {/* 3 SSME engines also fire at T=0 — ignite 6.6s before SRB liftoff */}
        <PlumeStream cfg={SSME_CORE_CFG} pos={[nx - 0.15, ny, nz - 0.06]} dir={direction} />
        <PlumeStream cfg={SSME_CORE_CFG} pos={[nx + 0.15, ny, nz - 0.06]} dir={direction} />
        <PlumeStream cfg={SSME_CORE_CFG} pos={[nx,        ny, nz + 0.18]} dir={direction} />
        {/* Left SRB fire — bright, large, punches through smoke */}
        <PlumeStream cfg={SRB_FIRE_CFG} pos={[nx - 0.65, ny, nz]} dir={direction} />
        <PlumeStream cfg={SMOKE_CFG}    pos={[nx - 0.65, ny, nz]} dir={direction} />
        {/* Right SRB fire */}
        <PlumeStream cfg={SRB_FIRE_CFG} pos={[nx + 0.65, ny, nz]} dir={direction} />
        <PlumeStream cfg={SMOKE_CFG}    pos={[nx + 0.65, ny, nz]} dir={direction} />
        {/* Bilateral smoke clouds billowing sideways */}
        <PlumeStream cfg={SIDE_SMOKE_CFG} pos={nozzlePosition} dir={[-0.70, -0.30, 0]} />
        <PlumeStream cfg={SIDE_SMOKE_CFG} pos={nozzlePosition} dir={[ 0.70, -0.30, 0]} />
      </>
    )
  }

  // Post-SRB: SSME triangle — 3 engines (left, right, back-center)
  return (
    <>
      <PlumeStream cfg={SSME_CORE_CFG} pos={[nx - 0.18, ny, nz - 0.05]} dir={direction} />
      <PlumeStream cfg={SSME_CORE_CFG} pos={[nx + 0.18, ny, nz - 0.05]} dir={direction} />
      <PlumeStream cfg={SSME_CORE_CFG} pos={[nx,        ny, nz + 0.20]} dir={direction} />
      <PlumeStream cfg={SSME_BELL_CFG} pos={nozzlePosition}             dir={direction} />
      <PlumeStream cfg={STREAK_CFG}    pos={nozzlePosition}             dir={direction} />
    </>
  )
}
