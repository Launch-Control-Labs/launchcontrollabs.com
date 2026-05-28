'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// ─── FPS Counter ───────────────────────────────────────────────────────────────

function FPSCounter({ onFPS }: { onFPS: (fps: number) => void }) {
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useFrame(() => {
    frameCount.current++
    const now = performance.now()
    const elapsed = now - lastTime.current
    if (elapsed >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / elapsed)
      onFPS(fps)
      frameCount.current = 0
      lastTime.current = now
    }
  })

  return null
}

// ─── Approach A: Ref-Based ─────────────────────────────────────────────────────
// ScrollTrigger writes to a plain ref. useFrame reads the ref and sets camera.position.z.
// Only R3F's loop touches the camera — no frame fighting.

function CameraControllerA({ progressRef }: { progressRef: React.RefObject<number> }) {
  const { camera } = useThree()

  useFrame(() => {
    const progress = progressRef.current ?? 0
    // Lerp from z=0 to z=-100 based on scroll progress
    const targetZ = -100 * progress
    camera.position.z = targetZ
  })

  return null
}

// ─── Approach B: Direct GSAP Mutation ──────────────────────────────────────────
// ScrollTrigger directly animates the camera.position via gsap.to().
// Both GSAP and R3F may contend for camera updates.

function CameraControllerB({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> }) {
  const { camera } = useThree()
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!scrollContainerRef.current) return

    // Create a proxy object for GSAP to animate
    const proxy = { z: 0 }

    tweenRef.current = gsap.to(proxy, {
      z: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          camera.position.z = proxy.z
        },
      },
    })

    return () => {
      tweenRef.current?.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [camera, scrollContainerRef])

  return null
}

// ─── Target Cube ───────────────────────────────────────────────────────────────

function TargetCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -50]}>
      <boxGeometry args={[4, 4, 4]} />
      <meshStandardMaterial color="#22D3EE" wireframe={false} />
    </mesh>
  )
}

// ─── Scene Wrapper (approach-aware) ────────────────────────────────────────────

function SceneContent({
  approach,
  progressRef,
  scrollContainerRef,
  onFPS,
}: {
  approach: 'A' | 'B'
  progressRef: React.RefObject<number>
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
  onFPS: (fps: number) => void
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <TargetCube />
      <FPSCounter onFPS={onFPS} />
      {approach === 'A' ? (
        <CameraControllerA progressRef={progressRef} />
      ) : (
        <CameraControllerB scrollContainerRef={scrollContainerRef} />
      )}
    </>
  )
}

// ─── Dynamic Canvas (SSR disabled) ─────────────────────────────────────────────

const DynamicScene = dynamic(
  () =>
    Promise.resolve(function Scene({
      approach,
      progressRef,
      scrollContainerRef,
      onFPS,
    }: {
      approach: 'A' | 'B'
      progressRef: React.RefObject<number>
      scrollContainerRef: React.RefObject<HTMLDivElement | null>
      onFPS: (fps: number) => void
    }) {
      return (
        <Canvas
          camera={{ position: [0, 0, 0], fov: 75 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
          }}
        >
          <SceneContent
            approach={approach}
            progressRef={progressRef}
            scrollContainerRef={scrollContainerRef}
            onFPS={onFPS}
          />
        </Canvas>
      )
    }),
  { ssr: false }
)

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ScrollCameraSpikePage() {
  const [approach, setApproach] = useState<'A' | 'B'>('A')
  const [fps, setFPS] = useState(60)
  const [fpsHistory, setFpsHistory] = useState<number[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<number>(0)

  // Approach A: ScrollTrigger writes to progressRef only
  useGSAP(
    () => {
      if (approach !== 'A' || !scrollContainerRef.current) return

      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress
        },
      })

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    },
    { dependencies: [approach], scope: scrollContainerRef }
  )

  const handleFPS = useCallback((newFps: number) => {
    setFPS(newFps)
    setFpsHistory((prev) => {
      const next = [...prev, newFps]
      if (next.length > 60) next.shift() // Keep last 60 samples
      return next
    })
  }, [])

  const avgFPS = fpsHistory.length > 0
    ? Math.round(fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length)
    : 0
  const minFPS = fpsHistory.length > 0 ? Math.min(...fpsHistory) : 0
  const maxFPS = fpsHistory.length > 0 ? Math.max(...fpsHistory) : 0

  const switchApproach = useCallback((next: 'A' | 'B') => {
    // Kill all existing ScrollTriggers before switching
    ScrollTrigger.getAll().forEach((t) => t.kill())
    progressRef.current = 0
    setFpsHistory([])
    setApproach(next)
    // Reset scroll position
    window.scrollTo(0, 0)
  }, [])

  return (
    <div ref={scrollContainerRef} style={{ position: 'relative', height: '600vh' }}>
      {/* Fixed Canvas */}
      <DynamicScene
        approach={approach}
        progressRef={progressRef}
        scrollContainerRef={scrollContainerRef}
        onFPS={handleFPS}
      />

      {/* Fixed HUD */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 100,
          background: 'rgba(0,0,0,0.85)',
          color: '#22D3EE',
          padding: '12px 16px',
          borderRadius: 8,
          fontFamily: 'monospace',
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        <div style={{ marginBottom: 8, fontWeight: 'bold', fontSize: 15 }}>
          GSAP + R3F Camera Spike
        </div>
        <div>
          Approach:{' '}
          <button
            onClick={() => switchApproach('A')}
            style={{
              background: approach === 'A' ? '#22D3EE' : 'transparent',
              color: approach === 'A' ? '#000' : '#22D3EE',
              border: '1px solid #22D3EE',
              padding: '2px 8px',
              marginRight: 4,
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            A (Ref)
          </button>
          <button
            onClick={() => switchApproach('B')}
            style={{
              background: approach === 'B' ? '#22D3EE' : 'transparent',
              color: approach === 'B' ? '#000' : '#22D3EE',
              border: '1px solid #22D3EE',
              padding: '2px 8px',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            B (Direct)
          </button>
        </div>
        <div style={{ marginTop: 8 }}>
          FPS: <span data-testid="fps-current">{fps}</span> | Avg:{' '}
          <span data-testid="fps-avg">{avgFPS}</span> | Min:{' '}
          <span data-testid="fps-min">{minFPS}</span> | Max: {maxFPS}
        </div>
        <div style={{ marginTop: 4, fontSize: 11, color: '#888' }}>
          Camera Z: {approach === 'A' ? (progressRef.current * -100).toFixed(1) : '(GSAP-driven)'}
        </div>
        <div style={{ marginTop: 4, fontSize: 11, color: '#888' }}>
          Scroll down to move camera toward cube at z=-50
        </div>
      </div>

      {/* Scroll progress markers */}
      {[0, 25, 50, 75, 100].map((pct) => (
        <div
          key={pct}
          style={{
            position: 'absolute',
            top: `${pct * 6}vh`, // 600vh total, so each % = 6vh
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.3)',
            fontFamily: 'monospace',
            fontSize: 12,
            pointerEvents: 'none',
          }}
        >
          {pct}% scroll
        </div>
      ))}
    </div>
  )
}
