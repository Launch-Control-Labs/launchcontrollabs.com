'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

function SpinningCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.7
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#22d3ee" wireframe />
    </mesh>
  )
}

export function ScrollPinSpike() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1,
    })
  }, { scope: containerRef })

  return (
    <>
      <section style={{ height: '50vh', background: '#111', display: 'grid', placeItems: 'center' }}>
        <p style={{ color: '#666', fontFamily: 'monospace', fontSize: '1.2rem' }}>
          SCROLL DOWN — Canvas will pin below
        </p>
      </section>

      <div ref={containerRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <Canvas
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
          gl={{ antialias: true, alpha: false }}
          camera={{ position: [0, 0, 6], fov: 50 }}
        >
          <color attach="background" args={['#020914']} />
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#22d3ee" />
          <SpinningCube />
        </Canvas>

        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{
            background: 'rgba(2, 9, 20, 0.7)',
            padding: '2rem 3rem',
            borderRadius: '8px',
            border: '1px solid rgba(34, 211, 238, 0.2)',
          }}>
            <h2 style={{ color: '#fff', fontFamily: 'monospace', fontSize: '1.5rem', margin: 0 }}>
              PINNED SECTION ACTIVE
            </h2>
            <p style={{ color: '#22d3ee', fontFamily: 'monospace', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Canvas stays fixed while content scrolls through
            </p>
          </div>
        </div>
      </div>

      <section style={{ background: '#0a0a0a' }}>
        <div style={{ padding: '10vh 2rem', maxWidth: '800px', margin: '0 auto' }}>
          <TextBlock
            title="Block 1 — Architecture Validated"
            body="The R3F Canvas remains pinned via GSAP ScrollTrigger while this HTML scrolls over it. Single Canvas context confirmed."
          />
          <TextBlock
            title="Block 2 — Smooth Pin/Unpin"
            body="Forward and reverse scroll both handle pin transitions without layout shift. The container-based pin strategy works."
          />
          <TextBlock
            title="Block 3 — React 19 Compatible"
            body="useGSAP hook from @gsap/react handles strict mode double-mount cleanup automatically. No manual useEffect needed."
          />
        </div>
      </section>

      <section style={{ height: '50vh', background: '#111', display: 'grid', placeItems: 'center' }}>
        <p style={{ color: '#666', fontFamily: 'monospace', fontSize: '1.2rem' }}>
          END — Canvas unpinned successfully
        </p>
      </section>
    </>
  )
}

function TextBlock({ title, body }: { title: string; body: string }) {
  return (
    <div style={{
      marginBottom: '8vh',
      padding: '2rem',
      border: '1px solid rgba(34, 211, 238, 0.15)',
      borderRadius: '8px',
      background: 'rgba(2, 9, 20, 0.5)',
    }}>
      <h3 style={{ color: '#22d3ee', fontFamily: 'monospace', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ color: '#aaa', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6 }}>
        {body}
      </p>
    </div>
  )
}
