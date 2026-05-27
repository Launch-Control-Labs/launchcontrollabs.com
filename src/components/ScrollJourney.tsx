'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { getCamera } from '@/config/camera-path'
import { useSceneStore } from '@/store/scene-store'
import { SceneErrorBoundary } from '@/components/3d/SceneErrorBoundary'

gsap.registerPlugin(ScrollTrigger)

// ─── CameraController ───────────────────────────────────────────────────────────
// Reads progressRef every frame and applies camera-path interpolation.
// Single-writer principle: only useFrame touches the camera.

function CameraController({ progressRef }: { progressRef: React.RefObject<number> }) {
  const { camera } = useThree()

  useFrame(() => {
    const progress = Math.max(0, Math.min(1, progressRef.current ?? 0))
    const { position, lookAt, fov } = getCamera(progress)
    camera.position.copy(position)
    camera.lookAt(lookAt)
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fov
      camera.updateProjectionMatrix()
    }
  })

  return null
}

// ─── Dynamic Canvas wrapper (SSR disabled) ──────────────────────────────────────

const DynamicCanvas = dynamic(
  () =>
    Promise.resolve(function ScrollCanvas({
      progressRef,
      scene,
    }: {
      progressRef: React.RefObject<number>
      scene?: React.ReactNode
    }) {
      return (
        <Canvas
          dpr={[1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]}
          gl={{ antialias: true, alpha: false }}
          camera={{ position: [0, -5, 10], fov: 60, near: 0.1, far: 2000 }}
          style={{ width: '100%', height: '100%' }}
        >
          <color attach="background" args={['#020914']} />
          <CameraController progressRef={progressRef} />
          {scene}
        </Canvas>
      )
    }),
  { ssr: false }
)

// ─── ScrollJourney ──────────────────────────────────────────────────────────────
// Top-level scroll experience: a 600vh scroll container with a fixed R3F Canvas
// whose camera is driven by GSAP ScrollTrigger via ref (Approach A from PoC).

export function ScrollJourney({ children, scene }: { children?: React.ReactNode; scene?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)

  // GSAP binding: ScrollTrigger writes to progressRef + Zustand store
  useGSAP(
    () => {
      if (!containerRef.current) return

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress
          useSceneStore.getState().setScrollProgress(self.progress)
        },
      })

      // Sync camera immediately on mount (handles browser scroll restoration)
      ScrollTrigger.refresh()
      const initialProgress =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      progressRef.current = Math.max(0, Math.min(1, initialProgress || 0))

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    },
    { scope: containerRef }
  )

  // Refresh ScrollTrigger when tab becomes visible (handles tab backgrounding)
  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden) {
        ScrollTrigger.refresh()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Refresh ScrollTrigger on resize (recalculates scroll bounds)
  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '600vh' }}>
      {/* Fixed 3D Canvas — decorative, hidden from assistive tech */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
        }}
      >
        <DynamicCanvas progressRef={progressRef} scene={scene} />
      </div>

      {/* Fixed content overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        {children}
      </div>
    </div>
  )
}
