'use client'

import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { ScrollCamera } from './ScrollCamera'
import { InteractiveRoom } from './InteractiveRoom'
import { Particles } from './Particles'
import { HeroOverlay } from '@/components/HeroOverlay'

interface ControlRoomSceneProps {
  containerRef: React.RefObject<HTMLElement | null>
}

export default function ControlRoomScene({ containerRef }: ControlRoomSceneProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const overlay = overlayRef.current
    if (!container || !overlay) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.to(overlay, {
        opacity: 0,
        y: -40,
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=40%',
          scrub: 1,
        },
      })
    }
    init()
  }, [containerRef])

  return (
    <div style={{ width: '100%', height: '100%', background: '#020914', position: 'relative' }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.85,
        }}
        camera={{ position: [0, 3, 30], fov: 50, near: 0.1, far: 2000 }}
      >
        <color attach="background" args={['#020914']} />

        {/* Cinematic 3-light setup — key, fill, rim */}
        <directionalLight position={[80, 40, 60]} intensity={2.5} color="#ffffff" castShadow={false} />
        <hemisphereLight args={['#1a1a3e', '#020914', 0.4]} />
        <pointLight position={[-40, 20, 40]} intensity={1.2} color="#22d3ee" distance={200} />
        {/* Back rim on shuttle */}
        <pointLight position={[0, -5, -25]} intensity={0.6} color="#22d3ee" distance={60} />

        <ScrollCamera containerRef={containerRef} />

        <Suspense fallback={null}>
          <Environment preset="night" background={false} />
          <InteractiveRoom />
          <Particles />
        </Suspense>

        {/* Atmospheric depth fog — denser than before */}
        <fogExp2 attach="fog" args={['#020914', 0.008]} />

        <EffectComposer>
          <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.4} mipmapBlur />
        </EffectComposer>
      </Canvas>

      {/* Hero text overlay — fades on scroll */}
      <div ref={overlayRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <HeroOverlay />
      </div>
    </div>
  )
}
