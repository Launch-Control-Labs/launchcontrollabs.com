'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { ScrollCamera } from './ScrollCamera'
import { InteractiveRoom } from './InteractiveRoom'

interface ControlRoomSceneProps {
  containerRef: React.RefObject<HTMLElement | null>
}

export default function ControlRoomScene({ containerRef }: ControlRoomSceneProps) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#080810' }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        camera={{ position: [0, 580, 500], fov: 60, near: 1, far: 3000 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[0, 800, 300]} intensity={0.8} />
        <pointLight position={[0, 600, 0]} intensity={0.6} distance={800} />

        <ScrollCamera containerRef={containerRef} />

        <Suspense fallback={null}>
          <InteractiveRoom />
        </Suspense>

        <fog attach="fog" args={['#080810', 600, 1400]} />
      </Canvas>
    </div>
  )
}
