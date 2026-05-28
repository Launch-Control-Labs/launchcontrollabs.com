'use client'

import { Suspense, useEffect, useMemo, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { SCENE_POSITIONS } from '@/config/scene-positions'
import { useSceneStore } from '@/store/scene-store'
import { RocketExhaust } from '@/components/3d/RocketExhaust'
import { StarField } from '@/components/3d/StarField'
import { getBackgroundColor } from '@/config/beat-config'

// CRITICAL: Set DRACO decoder path so compressed GLBs (earth, astronaut) load correctly.
// Without this, DRACO-compressed models fail silently (empty scene object).
useGLTF.setDecoderPath('/draco/')

function BackgroundController() {
  const { scene } = useThree()
  const scrollProgress = useSceneStore((s) => s.scrollProgress)

  useFrame(() => {
    const hex = getBackgroundColor(scrollProgress)
    scene.background = new THREE.Color(hex)
  })

  return null
}

function ShuttleModel() {
  const { scene } = useGLTF('/models/space-shuttle-oriented.glb')
  const shuttleRef = useRef<THREE.Group>(null)
  const scrollProgress = useSceneStore((s) => s.scrollProgress)

  // Find SRB and ET nodes after mount
  const srbLeftRef = useRef<THREE.Object3D | null>(null)
  const srbRightRef = useRef<THREE.Object3D | null>(null)
  const etRef = useRef<THREE.Object3D | null>(null)

  useEffect(() => {
    srbLeftRef.current = scene.getObjectByName('Small_Rocket_Group_01') || null
    srbRightRef.current = scene.getObjectByName('Small_Rocket_Group_02') || null
    etRef.current = scene.getObjectByName('Orange_Parts') || null
  }, [scene])

  // Normalize model to ~7 world units height
  const computedScale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    return maxDim > 0 ? 7 / maxDim : 2.5
  }, [scene])

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
    shuttleRef.current.position.x = 5 // ESPN right-side anchor

    // Subtle vibration during ignition/launch (0-5%)
    if (scrollProgress < 0.05) {
      const vib = (1 - scrollProgress / 0.05) * 0.03
      shuttleRef.current.position.x = 5 + (Math.random() - 0.5) * vib
    }

    // === SRB SEPARATION (20-30% scroll) ===
    const srbProgress = THREE.MathUtils.clamp(
      (scrollProgress - 0.20) / 0.10, // 0 at 20%, 1 at 30%
      0,
      1
    )

    // Reset SRBs when scrolling back up
    if (srbProgress <= 0) {
      if (srbLeftRef.current) {
        srbLeftRef.current.visible = true
        srbLeftRef.current.position.set(0, 0, 0)
        srbLeftRef.current.rotation.set(0, 0, 0)
      }
      if (srbRightRef.current) {
        srbRightRef.current.visible = true
        srbRightRef.current.position.set(0, 0, 0)
        srbRightRef.current.rotation.set(0, 0, 0)
      }
    }

    if (srbLeftRef.current) {
      if (srbProgress > 0 && srbProgress < 1) {
        // SRBs drift outward + fall behind
        srbLeftRef.current.position.x = -srbProgress * 8
        srbLeftRef.current.position.y = -srbProgress * 12
        srbLeftRef.current.rotation.z = srbProgress * 0.3
      } else if (srbProgress >= 1) {
        srbLeftRef.current.visible = false
      }
    }

    if (srbRightRef.current) {
      if (srbProgress > 0 && srbProgress < 1) {
        srbRightRef.current.position.x = srbProgress * 8
        srbRightRef.current.position.y = -srbProgress * 12
        srbRightRef.current.rotation.z = -srbProgress * 0.3
      } else if (srbProgress >= 1) {
        srbRightRef.current.visible = false
      }
    }

    // === ET SEPARATION (28-35% scroll) ===
    const etProgress = THREE.MathUtils.clamp(
      (scrollProgress - 0.28) / 0.07, // 0 at 28%, 1 at 35%
      0,
      1
    )

    // Reset ET when scrolling back up
    if (etProgress <= 0 && etRef.current) {
      etRef.current.visible = true
      etRef.current.position.set(0, 0, 0)
      etRef.current.rotation.set(0, 0, 0)
    }

    if (etRef.current) {
      if (etProgress > 0 && etProgress < 1) {
        etRef.current.position.y = -etProgress * 15
        etRef.current.position.z = etProgress * 5
        etRef.current.rotation.x = etProgress * 0.2
      } else if (etProgress >= 1) {
        etRef.current.visible = false
      }
    }
  })

  if (!visible) return null

  return (
    <group ref={shuttleRef} position={[5, 0, 0]}>
      <group rotation={[-Math.PI / 2, Math.PI, 0]} scale={computedScale}>
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

function StarFieldWrapper() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const opacity = THREE.MathUtils.clamp((scrollProgress - 0.25) / 0.10, 0, 1)
  if (opacity <= 0) return null
  return <StarField opacity={opacity} />
}

export function JourneyScene() {
  return (
    <>
      <BackgroundController />
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[50, 80, 30]}
        intensity={Math.PI * 1.4}
        color="#FFF5E0"
        castShadow={false}
      />
      <directionalLight
        position={[-30, -20, -50]}
        intensity={Math.PI * 0.4}
        color="#1a3a5c"
      />
      <pointLight
        position={[0, 5, 15]}
        intensity={Math.PI * 2}
        color="#22d3ee"
        distance={80}
        decay={2}
      />
      <hemisphereLight
        args={['#0a1628', '#020914', 0.4]}
      />

      <Suspense fallback={null}>
        <ShuttleModel />
      </Suspense>
      <Suspense fallback={null}>
        <EarthModel />
      </Suspense>
      <Suspense fallback={null}>
        <AstronautModel />
      </Suspense>
      <StarFieldWrapper />

      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.2} mipmapBlur={false} />
      </EffectComposer>
    </>
  )
}

useGLTF.preload('/models/space-shuttle-oriented.glb')
useGLTF.preload('/models/optimized/earth.glb')
useGLTF.preload('/models/optimized/drifting-astronaut.glb')
