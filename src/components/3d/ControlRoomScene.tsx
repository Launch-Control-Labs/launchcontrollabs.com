'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { ScrollCamera } from './ScrollCamera'
import { InteractiveRoom } from './InteractiveRoom'
import type { MeshGroup } from './mesh-map'
import type { ThreeEvent } from '@react-three/fiber'

interface ControlRoomSceneProps {
  containerRef: React.RefObject<HTMLElement | null>
  onGroupClick?: (group: MeshGroup, event: ThreeEvent<MouseEvent>) => void
  onGroupHover?: (group: MeshGroup | null) => void
}

export default function ControlRoomScene({ containerRef, onGroupClick, onGroupHover }: ControlRoomSceneProps) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#000000' }}>
      <Canvas
        gl={{
          antialias: false,
          alpha: false,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.NoToneMapping,
        }}
        camera={{ position: [6, 3, 8], fov: 50 }}
      >
        <ScrollCamera containerRef={containerRef} />

        <Suspense fallback={null}>
          <InteractiveRoom onGroupClick={onGroupClick} onGroupHover={onGroupHover} />
        </Suspense>

        <EffectComposer>
          <Bloom intensity={0.4} luminanceThreshold={0.8} luminanceSmoothing={0.9} mipmapBlur />
          <Noise opacity={0.015} />
          <Vignette darkness={0.4} offset={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
