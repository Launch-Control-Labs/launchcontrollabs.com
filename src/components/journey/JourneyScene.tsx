'use client'

import { Suspense, useEffect, useMemo, useRef } from 'react'
import { useGLTF, useAnimations, Cloud, Clouds } from '@react-three/drei'
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
  const modelGroupRef = useRef<THREE.Group>(null)
  const scrollProgress = useSceneStore((s) => s.scrollProgress)

  const srbLeftRef = useRef<THREE.Object3D | null>(null)
  const srbRightRef = useRef<THREE.Object3D | null>(null)
  const etRef = useRef<THREE.Object3D | null>(null)

  useEffect(() => {
    srbLeftRef.current = scene.getObjectByName('Small_Rocket_Group_01') || null
    srbRightRef.current = scene.getObjectByName('Small_Rocket_Group_02') || null
    etRef.current = scene.getObjectByName('Orange_Parts') || null

    // Update world matrices so geometry bounding box checks are accurate
    scene.updateMatrixWorld(true)

    const toRemove: THREE.Object3D[] = []
    scene.traverse((child: any) => {
      const name = child.name.toLowerCase()

      // Rule 1: Name-based filter (defense-in-depth)
      if (name.includes('antenna') || name.includes('wire') ||
          name.includes('cable') || name.includes('tether') ||
          name.includes('rope') || name.includes('rocket_details') ||
          name.includes('tube')) {
        toRemove.push(child)
        return
      }

      // Rule 2: Remove ALL Line/LineSegments/Points — these are helper/wire geometry
      // that are NOT Meshes and thus invisible to isMesh-based filters.
      // This is the structural fix: isLine covers ropes, antennae, debug wires
      // regardless of their node name.
      if (child.isLine || child.isLineSegments || child.isPoints) {
        toRemove.push(child)
        return
      }

      // Rule 3: Thin geometry filter (now correct because updateMatrixWorld ran first)
      if (child.isMesh && child.geometry) {
        child.geometry.computeBoundingBox()
        const bb = child.geometry.boundingBox
        if (bb) {
          const s = new THREE.Vector3()
          bb.getSize(s)
          if (Math.min(s.x, s.y, s.z) < 0.15 && Math.max(s.x, s.y, s.z) > 1) {
            toRemove.push(child)
          }
        }
      }
    })
    toRemove.forEach(obj => obj.removeFromParent())
  }, [scene])

  const { computedScale, nozzleY, centerOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = maxDim > 0 ? 7 / maxDim : 2.5
    const halfLength = size.x * 0.5 * scale
    return { computedScale: scale, nozzleY: -halfLength, centerOffset: [-center.x, -center.y, -center.z] as [number, number, number] }
  }, [scene])

  const visible = scrollProgress <= 0.90

  const exhaustIntensity = THREE.MathUtils.clamp(
    1 - (scrollProgress - 0.15) / 0.20,
    0,
    1
  )
  const exhaustVisible = exhaustIntensity > 0

  // Fade shuttle opacity from 75-90% so it becomes a background element
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        materials.forEach((mat) => {
          if (mat) {
            mat.transparent = true
          }
        })
      }
    })
  }, [scene])

  useFrame(() => {
    if (!shuttleRef.current) return

    // Fade opacity between 75-90%
    const shuttleOpacity = scrollProgress > 0.75
      ? THREE.MathUtils.clamp(1 - (scrollProgress - 0.75) / 0.15, 0.2, 1)
      : 1
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        materials.forEach((mat) => {
          if (mat) {
            mat.opacity = shuttleOpacity
          }
        })
      }
    })

    shuttleRef.current.position.y = scrollProgress * 50
    shuttleRef.current.position.x = 5

    if (scrollProgress < 0.05) {
      const vib = (1 - scrollProgress / 0.05) * 0.03
      shuttleRef.current.position.x = 5 + (Math.random() - 0.5) * vib
    }

    const srbProgress = THREE.MathUtils.clamp(
      (scrollProgress - 0.20) / 0.10,
      0,
      1
    )

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

    const etProgress = THREE.MathUtils.clamp(
      (scrollProgress - 0.28) / 0.07,
      0,
      1
    )

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
      <group ref={modelGroupRef} rotation={[0, Math.PI, -Math.PI / 2]} scale={computedScale}>
        <group position={centerOffset}>
          <primitive object={scene} />
        </group>
      </group>
      <RocketExhaust
        nozzlePosition={[0, nozzleY, 0]}
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
  const { rotation, scale } = SCENE_POSITIONS.astronaut

  const visible = scrollProgress >= 0.72

  useEffect(() => {
    const firstAction = Object.values(actions)[0]
    if (firstAction) firstAction.play()
  }, [actions])

  useEffect(() => {
    scene.traverse((child) => {
      if (child.name === 'Rope_Mat_0' || child.name === 'Rope_tip_Chrome_0') {
        child.visible = false
      }
    })
  }, [scene])

  useFrame((_, delta) => {
    if (!groupRef.current || !visible) return

    const driftProgress = THREE.MathUtils.clamp((scrollProgress - 0.72) / 0.28, 0, 1)
    const astroY = (scrollProgress * 50) + 2 + driftProgress * 5
    const astroX = 5 + driftProgress * 3
    const astroZ = 2 + driftProgress * 4

    groupRef.current.position.set(astroX, astroY, astroZ)

    groupRef.current.rotation.y += delta * 0.1
    groupRef.current.rotation.z += delta * 0.05
  })

  if (!visible) return null
  return (
    <group ref={groupRef} position={[5, 38, 2]} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}


function CloudLayer() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const opacity = 1 - THREE.MathUtils.clamp((scrollProgress - 0.15) / 0.15, 0, 1)
  if (opacity <= 0) return null

  return (
    <Clouds material={THREE.MeshBasicMaterial} limit={100}>
      <Cloud position={[-6, -10, 5]} speed={0.1} opacity={opacity * 0.6} bounds={[15, 4, 5]} volume={8} seed={1} />
      <Cloud position={[10, -12, 0]} speed={0.08} opacity={opacity * 0.4} bounds={[12, 3, 4]} volume={6} seed={2} />
      <Cloud position={[-12, -8, -3]} speed={0.12} opacity={opacity * 0.5} bounds={[18, 5, 6]} volume={10} seed={3} />
      <Cloud position={[4, -14, 7]} speed={0.06} opacity={opacity * 0.35} bounds={[16, 4, 5]} volume={7} seed={4} />
      <Cloud position={[0, -9, -5]} speed={0.09} opacity={opacity * 0.45} bounds={[20, 4, 6]} volume={9} seed={5} />
    </Clouds>
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
      <CloudLayer />
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
