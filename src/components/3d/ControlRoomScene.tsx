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
    <div style={{ width: '100%', height: '100%', background: '#080810', position: 'relative' }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        camera={{ position: [0, 35, 130], fov: 50, near: 0.1, far: 500 }}
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

      <div style={{
        position: 'absolute',
        bottom: 'clamp(3rem, 8vh, 6rem)',
        left: 'clamp(1.5rem, 4vw, 3rem)',
        right: 'clamp(1.5rem, 4vw, 3rem)',
        pointerEvents: 'none',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 14vw, 12rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          color: '#FFFFFF',
          textTransform: 'uppercase',
          margin: 0,
          opacity: 0.9,
        }}>LAUNCH<br />CONTROL</h1>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          marginTop: '1rem',
        }}>SCROLL TO LAUNCH</p>
      </div>
    </div>
  )
}
