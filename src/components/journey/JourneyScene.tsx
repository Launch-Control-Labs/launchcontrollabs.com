'use client'

import { Suspense, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { SCENE_POSITIONS } from '@/config/scene-positions'
import type { Group } from 'three'

function ShuttleModel() {
  const { scene } = useGLTF('/models/optimized/space-shuttle.glb')
  const { position, rotation, scale } = SCENE_POSITIONS.shuttle
  return <primitive object={scene} position={position} rotation={rotation} scale={scale} />
}

function DriftingAstronautModel() {
  const groupRef = useRef<Group>(null)
  const { scene, animations } = useGLTF('/models/optimized/drifting-astronaut.glb')
  const { actions } = useAnimations(animations, groupRef)
  const { position, rotation, scale } = SCENE_POSITIONS.driftingAstronaut

  useEffect(() => {
    const firstAction = Object.values(actions)[0]
    if (firstAction) firstAction.play()
  }, [actions])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

function EarthModel() {
  const { scene } = useGLTF('/models/optimized/earth.glb')
  const { position, rotation, scale } = SCENE_POSITIONS.earth
  return <primitive object={scene} position={position} rotation={rotation} scale={scale} />
}

function PlanetsModel() {
  const { scene } = useGLTF('/models/optimized/various-planets.glb')
  const { position, rotation, scale } = SCENE_POSITIONS.planets
  return <primitive object={scene} position={position} rotation={rotation} scale={scale} />
}

function SaturnVModel() {
  const { scene } = useGLTF('/models/optimized/apollo-saturn-v.glb')
  const { position, rotation, scale } = SCENE_POSITIONS.saturnV
  return <primitive object={scene} position={position} rotation={rotation} scale={scale} />
}

function CtaEarthModel() {
  const { scene } = useGLTF('/models/optimized/earth.glb')
  const cloned = scene.clone()
  const { position, rotation, scale } = SCENE_POSITIONS.ctaEarth
  return <primitive object={cloned} position={position} rotation={rotation} scale={scale} />
}

export function JourneyScene() {
  return (
    <>
      <ambientLight intensity={0.3} />

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
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.3} mipmapBlur />
      </EffectComposer>
    </>
  )
}
