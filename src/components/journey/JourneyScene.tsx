'use client'

import { Suspense, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { SCENE_POSITIONS } from '@/config/scene-positions'
import { useSceneStore } from '@/store/scene-store'
import { RocketExhaust } from '@/components/3d/RocketExhaust'
import { StarField } from '@/components/3d/StarField'
import { getBackgroundColor } from '@/config/beat-config'
import type { Group } from 'three'

function BackgroundController() {
  const { scene } = useThree()
  const scrollProgress = useSceneStore((s) => s.scrollProgress)

  useFrame(() => {
    const hex = getBackgroundColor(scrollProgress)
    scene.background = new THREE.Color(hex)
  })

  return null
}

function useBeatVisible(beatStart: number, beatEnd: number, buffer = 0.05): boolean {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  return scrollProgress >= beatStart - buffer && scrollProgress <= beatEnd + buffer
}

function ShuttleModel() {
  const { scene } = useGLTF('/models/optimized/space-shuttle.glb')
  const shuttleRef = useRef<THREE.Group>(null)
  const scrollProgress = useSceneStore((s) => s.scrollProgress)

  // Visible during launch + atmosphere + space cruise + shuttle-earth (0-78%)
  const visible = scrollProgress <= 0.78

  // Exhaust intensity: full fire 0-15%, fades to 0 by 35%
  const exhaustIntensity = THREE.MathUtils.clamp(
    1 - (scrollProgress - 0.15) / 0.20,
    0,
    1
  )
  const exhaustVisible = exhaustIntensity > 0

  useFrame(() => {
    if (!shuttleRef.current) return
    // Y rises with scroll: 0 at bottom, 50 at top of journey
    shuttleRef.current.position.y = scrollProgress * 50
    // Subtle vibration during ignition/launch (0-5%)
    if (scrollProgress < 0.05) {
      const vib = (1 - scrollProgress / 0.05) * 0.03
      shuttleRef.current.position.x = (Math.random() - 0.5) * vib
    } else {
      shuttleRef.current.position.x = 0
    }
  })

  if (!visible) return null

  return (
    <group ref={shuttleRef} position={[0, 0, 0]}>
      {/* Shuttle body at rotation [-π/2, 0, 0] (nose UP) */}
      <group rotation={[-Math.PI / 2, 0, 0]} scale={2.5}>
        <primitive object={scene} />
      </group>
      {/* Exhaust: nozzle at bottom of shuttle, pointing DOWN */}
      <RocketExhaust
        nozzlePosition={[0, -3.5, 0]}
        direction={[0, -1, 0]}
        intensity={exhaustIntensity}
        visible={exhaustVisible}
      />
    </group>
  )
}

function EarthModel() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const { scene } = useGLTF('/models/optimized/earth.glb')
  const ref = useRef<THREE.Group>(null)
  const { position, rotation, scale } = SCENE_POSITIONS.earth

  // Visible 50-80%
  const visible = scrollProgress >= 0.47 && scrollProgress <= 0.83

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.003 * delta
  })

  if (!visible) return null
  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

function AstronautModel() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/models/optimized/drifting-astronaut.glb')
  const { actions } = useAnimations(animations, groupRef)
  const { position, rotation, scale } = SCENE_POSITIONS.astronaut

  // Visible from 75%+
  const visible = scrollProgress >= 0.72

  useEffect(() => {
    const firstAction = Object.values(actions)[0]
    if (firstAction) firstAction.play()
  }, [actions])

  if (!visible) return null
  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

function EarthModel() {
  const visible = useBeatVisible(0.30, 0.80)
  const { scene } = useGLTF('/models/optimized/earth.glb')
  const { position, rotation, scale } = SCENE_POSITIONS.earth
  if (!visible) return null
  return <primitive object={scene} position={position} rotation={rotation} scale={scale} />
}

function PlanetDriftModel() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const { scene } = useGLTF('/models/optimized/various-planets.glb')
  const ref = useRef<Group>(null)
  const { position, rotation, scale } = SCENE_POSITIONS.planets

  // Visible 35-55% scroll
  const visible = scrollProgress >= 0.30 && scrollProgress <= 0.58

  useFrame((_, delta) => {
    if (!ref.current || !visible) return
    ref.current.rotation.y += 0.02 * delta
    ref.current.position.z += 0.5 * delta
  })

  if (!visible) return null
  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

function StarFieldWrapper() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  // Stars fade in from 25% to 35% scroll
  const opacity = THREE.MathUtils.clamp((scrollProgress - 0.25) / 0.10, 0, 1)
  if (opacity <= 0) return null
  return <StarField opacity={opacity} />
}

function SaturnVModel() {
  const visible = useBeatVisible(0.65, 0.95)
  const { scene } = useGLTF('/models/optimized/apollo-saturn-v.glb')
  const { position, rotation, scale } = SCENE_POSITIONS.saturnV
  if (!visible) return null
  return <primitive object={scene} position={position} rotation={rotation} scale={scale} />
}

function CtaEarthModel() {
  const visible = useBeatVisible(0.80, 1.0)
  const { scene } = useGLTF('/models/optimized/earth.glb')
  const cloned = scene.clone()
  const { position, rotation, scale } = SCENE_POSITIONS.ctaEarth
  if (!visible) return null
  return <primitive object={cloned} position={position} rotation={rotation} scale={scale} />
}

export function JourneyScene() {
  return (
    <>
      <BackgroundController />
      {/* Low ambient — just enough to see into shadows */}
      <ambientLight intensity={0.08} />
      {/* Main sun-like directional — physically correct with decay=0 */}
      <directionalLight
        position={[50, 80, 30]}
        intensity={Math.PI * 1.2}
        color="#FFF5E0"
        decay={0}
        castShadow={false}
      />
      {/* Rim/fill from opposite side — cool blue */}
      <directionalLight
        position={[-30, -20, -50]}
        intensity={Math.PI * 0.3}
        color="#1a3a5c"
        decay={0}
      />
      {/* Cyan accent — close to shuttle/models, short range */}
      <pointLight
        position={[0, 5, 15]}
        intensity={Math.PI * 2}
        color="#22d3ee"
        distance={80}
        decay={2}
      />
      {/* Hemisphere — subtle sky/ground separation */}
      <hemisphereLight
        args={['#0a1628', '#020914', 0.4]}
      />

      <Suspense fallback={null}>
        <ShuttleModel />
      </Suspense>
      <Suspense fallback={null}>
        <DriftingAstronautModel />
      </Suspense>
      <Suspense fallback={null}>
        <EarthModel />
      </Suspense>
      <Suspense fallback={null}>
        <PlanetDriftModel />
      </Suspense>
      <StarFieldWrapper />
      <Suspense fallback={null}>
        <SaturnVModel />
      </Suspense>
      <Suspense fallback={null}>
        <CtaEarthModel />
      </Suspense>

      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.2} mipmapBlur={false} />
      </EffectComposer>
    </>
  )
}
