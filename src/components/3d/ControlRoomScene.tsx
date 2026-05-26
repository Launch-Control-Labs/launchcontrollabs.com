'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
import { createControlRoomShader, SCREEN_MATERIALS, LIGHT_MATERIALS } from '@/shaders/control-room-shader'

const MODEL_PATH = '/models/nasa-jsc-control-room.glb'
const LIGHTMAP_PATH = '/models/textures/bake-02-lightmap-5229a667.exr'

function NasaControlRoom() {
  const { scene } = useGLTF(MODEL_PATH)
  const [lightmap, setLightmap] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    const loader = new EXRLoader()
    loader.load(LIGHTMAP_PATH, (texture) => {
      texture.minFilter = THREE.NearestFilter
      texture.magFilter = THREE.NearestFilter
      texture.colorSpace = THREE.NoColorSpace
      texture.generateMipmaps = false
      setLightmap(texture)
    })
  }, [])

  useEffect(() => {
    if (!scene || !lightmap) return
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        const matName = child.material.name.toLowerCase()
        child.material = createControlRoomShader(child.material, lightmap, {
          isScreen: SCREEN_MATERIALS.has(matName),
          isLight: LIGHT_MATERIALS.has(matName),
        })
        child.userData.hasCustomShader = true
      }
    })
  }, [scene, lightmap])

  return <primitive object={scene} rotation={[-Math.PI / 2, 0, 0]} />
}

export default function ControlRoomScene() {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#000000' }}>
      <Canvas
        gl={{
          antialias: false,
          alpha: false,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.NoToneMapping,
        }}
        camera={{ position: [6, 3, 8], fov: 50 }}
      >
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
