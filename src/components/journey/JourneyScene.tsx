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
  const colorRef = useRef(new THREE.Color())

  useFrame(() => {
    const hex = getBackgroundColor(scrollProgress)
    colorRef.current.set(hex)
    scene.background = colorRef.current
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
  const bayDoorRef = useRef<THREE.Object3D | null>(null)

  useEffect(() => {
    srbLeftRef.current = scene.getObjectByName('Small_Rocket_Group_01') || null
    srbRightRef.current = scene.getObjectByName('Small_Rocket_Group_02') || null
    etRef.current = scene.getObjectByName('Orange_Parts') || null
    bayDoorRef.current = scene.getObjectByName('Ceiling1') || null

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

      // Rule 3: Thin geometry — only the most extreme hair-thin objects (lightning rods etc)
      // Threshold kept at 0.09 to avoid removing flat panels like cargo bay doors
      if (child.isMesh && child.geometry) {
        child.geometry.computeBoundingBox()
        const bb = child.geometry.boundingBox
        if (bb) {
          const s = new THREE.Vector3()
          bb.getSize(s)
          if (Math.min(s.x, s.y, s.z) < 0.09 && Math.max(s.x, s.y, s.z) > 1) {
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

  // Cache all materials once, set transparent — avoids scene.traverse every frame
  const materialsRef = useRef<THREE.Material[]>([])
  useEffect(() => {
    const mats: THREE.Material[] = []
    scene.traverse((child: any) => {
      if (child.isMesh) {
        const ms = Array.isArray(child.material) ? child.material : [child.material]
        ms.forEach((m: any) => { if (m && !mats.includes(m)) { m.transparent = true; mats.push(m) } })
      }
    })
    materialsRef.current = mats
  }, [scene])

  useFrame(() => {
    if (!shuttleRef.current) return

    // Fade opacity between 75-90%
    const shuttleOpacity = scrollProgress > 0.75
      ? THREE.MathUtils.clamp(1 - (scrollProgress - 0.75) / 0.15, 0.2, 1)
      : 1
    materialsRef.current.forEach(mat => { mat.opacity = shuttleOpacity })

    const baseY = scrollProgress * 50
    shuttleRef.current.position.y = baseY
    shuttleRef.current.position.x = 5

    if (scrollProgress < 0.30) {
      const vibFade = 1 - scrollProgress / 0.30
      const vib = vibFade * 0.055
      shuttleRef.current.position.x = 5 + (Math.random() - 0.5) * vib
      shuttleRef.current.position.y = baseY + (Math.random() - 0.5) * vib * 0.4
    }

    if (modelGroupRef.current) {
      const t = Date.now() * 0.001
      if (scrollProgress < 0.30) {
        const swayFade = 1 - scrollProgress / 0.30
        modelGroupRef.current.rotation.z = -Math.PI / 2 + Math.sin(t * 0.75) * 0.022 * swayFade
        modelGroupRef.current.rotation.y =  Math.PI    + Math.sin(t * 1.20) * 0.012 * swayFade
      } else {
        const glide = THREE.MathUtils.clamp((scrollProgress - 0.30) / 0.40, 0, 1)
        modelGroupRef.current.rotation.z = -Math.PI / 2 + Math.sin(t * 0.15) * 0.006 * (1 - glide * 0.7) + glide * 0.025
        modelGroupRef.current.rotation.y =  Math.PI    + Math.sin(t * 0.10) * 0.003
      }
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

    const bayProgress = THREE.MathUtils.clamp((scrollProgress - 0.65) / 0.07, 0, 1)
    if (bayDoorRef.current) {
      bayDoorRef.current.rotation.x = bayProgress * Math.PI * 0.6
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
        srbAttached={scrollProgress < 0.22}
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
  const { scene, animations } = useGLTF('/models/astronaut-converted.glb')
  const { actions } = useAnimations(animations, groupRef)
  const { rotation, scale } = SCENE_POSITIONS.astronaut

  const shouldRender = scrollProgress >= 0.65
  const visible = scrollProgress >= 0.72

  useEffect(() => {
    if (actions['floating']) {
      actions['floating'].play()
      actions['floating'].setEffectiveTimeScale(0.4)
      actions['floating'].setLoop(THREE.LoopRepeat, Infinity)
    } else {
      // Fallback to first available action
      const firstAction = Object.values(actions)[0]
      if (firstAction) {
        firstAction.play()
        firstAction.setEffectiveTimeScale(0.4)
      }
    }
  }, [actions])

  useEffect(() => {
    scene.traverse((child: any) => {
      const name = (child.name || '').toLowerCase()

      // Hide (don't remove!) bones — removal breaks SkinnedMesh skeleton
      if (name.includes('wire') || name.includes('rope') ||
          name.includes('necklace') || name.includes('cable') ||
          name.includes('tether') || name.includes('tube')) {
        child.visible = false
        return
      }

      // Hide Line/LineSegments/Points
      if (child.isLine || child.isLineSegments || child.isPoints) {
        child.visible = false
        return
      }

      // Thin geometry check — catch unnamed string/wire Meshes
      if (child.isMesh && child.geometry) {
        child.geometry.computeBoundingBox()
        const bb = child.geometry.boundingBox
        if (bb) {
          const s = new THREE.Vector3()
          bb.getSize(s)
          if (Math.min(s.x, s.y, s.z) < 0.02 && Math.max(s.x, s.y, s.z) > 0.5) {
            child.visible = false
            return
          }
        }
      }

      // Set materials transparent for fade-in
      if (child.isMesh) {
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach((m: any) => { if (m) { m.transparent = true; m.opacity = 0 } })
      }
    })
  }, [scene])

  useFrame(() => {
    if (!groupRef.current || !visible) return

    const driftProgress = THREE.MathUtils.clamp((scrollProgress - 0.72) / 0.28, 0, 1)
    const fadeIn = THREE.MathUtils.clamp((scrollProgress - 0.72) / 0.04, 0, 1)
    const shuttleY = scrollProgress * 50
    const t = Date.now() * 0.001

    const astroX = 5 + driftProgress * 3
    const astroY = shuttleY + 0.5 + driftProgress * 5
    const astroZ = 0 + driftProgress * 6

    groupRef.current.position.set(astroX, astroY, astroZ)
    groupRef.current.visible = visible

    // Gentle whole-body tumble layered on skeletal animation
    groupRef.current.rotation.y += 0.0003 * Math.sin(t * 0.1)
    groupRef.current.rotation.x += 0.0001 * Math.sin(t * 0.07 + 1.5)

    scene.traverse((child: any) => {
      if (child.isMesh) {
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach((m: any) => { if (m && m.transparent) m.opacity = fadeIn })
      }
    })
  })

  if (!shouldRender) return null
  return (
    <group ref={groupRef} visible={false} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}



function EVATether() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const meshRef = useRef<THREE.Mesh>(null)
  const visible = scrollProgress >= 0.72

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#cccccc',
    metalness: 0.3,
    roughness: 0.7,
    transparent: true,
    opacity: 0.85,
  }), [])

  useFrame(() => {
    if (!meshRef.current || !visible) {
      if (meshRef.current) meshRef.current.visible = false
      return
    }
    meshRef.current.visible = true

    const driftProgress = THREE.MathUtils.clamp((scrollProgress - 0.72) / 0.28, 0, 1)
    const shuttleY = scrollProgress * 50

    const hullPos = new THREE.Vector3(5, shuttleY + 0.5, 0)
    const astroPos = new THREE.Vector3(
      5 + driftProgress * 3,
      shuttleY + 0.5 + driftProgress * 5,
      0 + driftProgress * 6
    )

    const mid = new THREE.Vector3().lerpVectors(hullPos, astroPos, 0.5)
    mid.y -= 0.3 + driftProgress * 1.2

    const curve = new THREE.CatmullRomCurve3([hullPos, mid, astroPos], false, 'catmullrom', 0.5)
    const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.03 + driftProgress * 0.01, 8, false)

    if (meshRef.current.geometry) meshRef.current.geometry.dispose()
    meshRef.current.geometry = tubeGeo
  })

  return <mesh ref={meshRef} material={material} frustumCulled={false} />
}


function CloudLayer() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const lowerOpacity = 1 - THREE.MathUtils.clamp((scrollProgress - 0.15) / 0.15, 0, 1)
  const upperOpacity = THREE.MathUtils.clamp(1 - (scrollProgress - 0.08) / 0.12, 0, 1) * 0.35

  if (lowerOpacity <= 0 && upperOpacity <= 0) return null

  return (
    <Clouds material={THREE.MeshBasicMaterial} limit={150}>
      {/* Lower ground-level clouds (existing) */}
      {lowerOpacity > 0 && (
        <>
          <Cloud position={[-6, -10, 5]} speed={0.1} opacity={lowerOpacity * 0.08} bounds={[22, 2, 10]} volume={3} seed={1} />
          <Cloud position={[10, -12, 0]} speed={0.08} opacity={lowerOpacity * 0.06} bounds={[18, 2, 8]} volume={2} seed={2} />
          <Cloud position={[-12, -8, -3]} speed={0.12} opacity={lowerOpacity * 0.07} bounds={[28, 2, 12]} volume={3} seed={3} />
          <Cloud position={[4, -14, 7]} speed={0.06} opacity={lowerOpacity * 0.05} bounds={[24, 2, 9]} volume={2} seed={4} />
          <Cloud position={[0, -9, -5]} speed={0.09} opacity={lowerOpacity * 0.06} bounds={[30, 2, 11]} volume={3} seed={5} />
        </>
      )}
      {/* Upper overhead clouds — shuttle rises through these */}
      {upperOpacity > 0 && (
        <>
          <Cloud position={[-8, 10, 6]} speed={0.04} opacity={upperOpacity * 0.28} bounds={[20, 3, 8]} volume={7} seed={10} />
          <Cloud position={[12, 14, -4]} speed={0.03} opacity={upperOpacity * 0.22} bounds={[16, 3, 6]} volume={6} seed={11} />
          <Cloud position={[-3, 18, 8]} speed={0.05} opacity={upperOpacity * 0.26} bounds={[22, 4, 7]} volume={8} seed={12} />
          <Cloud position={[8, 12, 3]} speed={0.04} opacity={upperOpacity * 0.20} bounds={[14, 3, 5]} volume={5} seed={13} />
        </>
      )}
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
      <EVATether />

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
useGLTF.preload('/models/astronaut-converted.glb')
