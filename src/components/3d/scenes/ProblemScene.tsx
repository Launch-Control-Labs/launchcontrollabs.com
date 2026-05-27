'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'

useGLTF.setDecoderPath('/draco/')

const DRIFTING_ASTRONAUT_PATH = '/models/optimized/drifting-astronaut.glb'

function DriftingAstronaut() {
  const { scene, animations } = useGLTF(DRIFTING_ASTRONAUT_PATH)
  const groupRef = useRef<THREE.Group>(null)
  const { actions } = useAnimations(animations, groupRef)
  const time = useRef(0)

  useLayoutEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.visible = true
        child.frustumCulled = false
        if (child.material) {
          const mat = child.material as THREE.MeshStandardMaterial
          mat.opacity = 1
          mat.transparent = false
          mat.depthWrite = true
          mat.needsUpdate = true
        }
      }
    })
  }, [scene])

  useEffect(() => {
    const clip = actions['floating'] ?? actions[Object.keys(actions)[0]]
    if (clip) clip.reset().fadeIn(0.5).play()
  }, [actions])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    time.current += delta

    const t = time.current

    groupRef.current.position.x = -2 + Math.sin(t * 0.057) * 0.4 + Math.sin(t * 0.031) * 0.2
    groupRef.current.position.y = 0 + Math.sin(t * 0.071) * 0.5 + Math.sin(t * 0.043) * 0.25
    groupRef.current.position.z = -3 + Math.sin(t * 0.047) * 0.3

    groupRef.current.rotation.y += delta * 0.018
    groupRef.current.rotation.x = Math.sin(t * 0.037) * 0.08
    groupRef.current.rotation.z = Math.sin(t * 0.029) * 0.05
  })

  return (
    <group ref={groupRef} position={[-2, 0, -3]}>
      <primitive
        object={scene}
        scale={[1.8, 1.8, 1.8]}
        rotation={[0.05, 0.4, 0.08]}
      />
    </group>
  )
}

export function ProblemScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#DC2626" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#ff6b6b" />
      <spotLight
        position={[0, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#DC2626"
      />
      <DriftingAstronaut />
    </Canvas>
  )
}

useGLTF.preload(DRIFTING_ASTRONAUT_PATH)
