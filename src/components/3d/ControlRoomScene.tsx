'use client'

import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

const MODEL_PATH = '/models/nasa-jsc-control-room.glb'

/**
 * NASA JSC Control Room - loaded as a single scene.
 * Rendering approach matches basement.studio:
 * - NoToneMapping (baked lighting from model)
 * - SRGBColorSpace
 * - No fog, no scene.background
 * - Grey aesthetic comes from model materials (wall, floor, console_body)
 */
function NasaControlRoom() {
  const { scene } = useGLTF(MODEL_PATH)

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const mat = mesh.material as THREE.MeshStandardMaterial
        if (!mat || !mat.name) return
        const name = mat.name.toLowerCase()

        // Make screens glow with emissive
        if (name.includes('screen') || name === 'screens' || name === 'wall_screen') {
          mat.emissive = new THREE.Color(0x1a3a5c)
          mat.emissiveIntensity = 1.5
        }

        // Lights material should also glow
        if (name === 'lights') {
          mat.emissive = new THREE.Color(0xfff5e0)
          mat.emissiveIntensity = 2.0
        }

        // Projector glow
        if (name.includes('projector')) {
          mat.emissive = new THREE.Color(0x2244aa)
          mat.emissiveIntensity = 0.8
        }
      }
    })
  }, [scene])

  // Model authored in Z-up, rotate to Y-up
  return <primitive object={scene} rotation={[-Math.PI / 2, 0, 0]} />
}

export default function ControlRoomScene() {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#000000' }}>
      <Canvas
        gl={{
          antialias: true,
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
          alpha: false,
        }}
        camera={{ position: [6, 3, 8], fov: 50 }}
      >
        <ambientLight intensity={0.25} color="#e8e8f0" />
        <directionalLight position={[5, 8, 3]} intensity={0.3} color="#ffffff" />
        <pointLight position={[0, 2, -4]} intensity={0.15} color="#4488cc" distance={12} />

        <Suspense fallback={null}>
          <NasaControlRoom />
        </Suspense>

        <OrbitControls
          target={[0, 1.5, 0]}
          enableDamping
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={20}
        />

        <EffectComposer>
          <Bloom intensity={0.4} luminanceThreshold={0.8} luminanceSmoothing={0.9} mipmapBlur />
          <Noise opacity={0.015} />
          <Vignette darkness={0.4} offset={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

useGLTF.preload(MODEL_PATH)
