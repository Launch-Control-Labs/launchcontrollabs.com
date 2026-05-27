'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
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
          toneMappingExposure: 1.0,
        }}
        camera={{ position: [0, 30, 60], fov: 50, near: 0.1, far: 500 }}
      >
        <Environment preset="sunset" background={false} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 80, 30]} intensity={1.5} />

        <ScrollCamera containerRef={containerRef} />

        <Suspense fallback={null}>
          <InteractiveRoom />
        </Suspense>

        <fog attach="fog" args={['#080810', 80, 200]} />
      </Canvas>
    </div>
  )
}
