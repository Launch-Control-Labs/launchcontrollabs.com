'use client'

import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { ScrollCamera } from './ScrollCamera'
import { InteractiveRoom } from './InteractiveRoom'
import { Particles } from './Particles'

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
          toneMappingExposure: 0.7,
        }}
        camera={{ position: [0, -6, 28], fov: 42, near: 0.1, far: 2000 }}
      >
        <color attach="background" args={['#020914']} />

        {/* Sun key light */}
        <directionalLight position={[80, 40, 60]} intensity={1.8} color="#ffffff" />
        <hemisphereLight args={['#0d1a3a', '#020914', 0.2]} />
        <pointLight position={[-40, 20, 40]} intensity={0.7} color="#22d3ee" distance={120} />
        <pointLight position={[7, 3, -10]} intensity={1.2} color="#ffffff" distance={40} />

        <ScrollCamera containerRef={containerRef} />

        <Suspense fallback={null}>
          <Environment preset="night" background={false} />
          <InteractiveRoom />
          <Particles />
        </Suspense>

        {/* Fog only affects close range — planets/stars use fog={false} on their materials */}
        <fogExp2 attach="fog" args={['#020914', 0.003]} />

        <EffectComposer>
          <Bloom luminanceThreshold={0.85} luminanceSmoothing={0.9} intensity={0.2} mipmapBlur />
        </EffectComposer>
      </Canvas>

      <div ref={overlayRef} style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        <div style={{
          padding: '0',
          paddingBottom: 'clamp(0.5rem, 1.5vh, 1.2rem)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '0.3rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
            }}>Product Studio · Los Angeles</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              letterSpacing: '0.2em',
              color: 'rgba(34,211,238,0.5)',
              textTransform: 'uppercase',
            }}>Est. 2021</span>
          </div>

          <div style={{ position: 'relative' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4.5rem, 16vw, 20rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              margin: 0,
              opacity: 0.95,
              whiteSpace: 'nowrap',
            }}>
              LAUNCH CONTROL
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginTop: '-0.06em',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.5rem, 0.9vw, 0.75rem)',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                margin: 0,
                maxWidth: '28ch',
                lineHeight: 1.4,
              }}>From idea to shipped product. No guessing.</p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4.5rem, 16vw, 20rem)',
                lineHeight: 0.82,
                letterSpacing: '-0.01em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                margin: 0,
                opacity: 0.95,
                textShadow: '0 0 60px rgba(34, 211, 238, 0.25)',
              }}>LABS</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
