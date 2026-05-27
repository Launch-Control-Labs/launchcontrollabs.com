'use client'

import { Suspense, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { SCENE_POSITIONS } from '@/config/scene-positions'
import { useSceneStore } from '@/store/scene-store'
import type { Group } from 'three'

function useBeatVisible(beatStart: number, beatEnd: number, buffer = 0.05): boolean {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  return scrollProgress >= beatStart - buffer && scrollProgress <= beatEnd + buffer
}

function ShuttleModel() {
  const visible = useBeatVisible(0, 0.35)
  const { scene } = useGLTF('/models/optimized/space-shuttle.glb')
  const { position, rotation, scale } = SCENE_POSITIONS.shuttle
  if (!visible) return null
  return <primitive object={scene} position={position} rotation={rotation} scale={scale} />
}

function DriftingAstronautModel() {
  const visible = useBeatVisible(0.10, 0.45)
  const groupRef = useRef<Group>(null)
  const { scene, animations } = useGLTF('/models/optimized/drifting-astronaut.glb')
  const { actions } = useAnimations(animations, groupRef)
  const { position, rotation, scale } = SCENE_POSITIONS.driftingAstronaut

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

function PlanetsModel() {
  const visible = useBeatVisible(0.50, 0.85)
  const { scene } = useGLTF('/models/optimized/various-planets.glb')
  const { position, rotation, scale } = SCENE_POSITIONS.planets
  if (!visible) return null
  return <primitive object={scene} position={position} rotation={rotation} scale={scale} />
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
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 10, 20]} intensity={0.8} color="#22d3ee" distance={200} />

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
        <PlanetsModel />
      </Suspense>
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
