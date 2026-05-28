'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { getCamera, getCameraFollow } from '@/config/camera-path'
import { useSceneStore } from '@/store/scene-store'
import { SceneErrorBoundary } from '@/components/3d/SceneErrorBoundary'

gsap.registerPlugin(ScrollTrigger)

// ─── CameraController ───────────────────────────────────────────────────────────
// Dual-mode: follow-mode (0–30%), crossfade (30–40%), path-mode (40–100%).
// Single-writer principle: only useFrame touches the camera.

const FOLLOW_END = 0.30
const PATH_START = 0.40
const SMOOTH_SPEED = 8

const _blendedPos = new THREE.Vector3()
const _blendedLookAt = new THREE.Vector3()

function CameraController({
  progressRef,
  shuttleYRef,
}: {
  progressRef: React.RefObject<number>
  shuttleYRef: React.RefObject<number>
}) {
  const { camera, invalidate } = useThree()
  const lastProgress = useRef(-1)

  useFrame((_state, delta) => {
    const progress = Math.max(0, Math.min(1, progressRef.current ?? 0))
    if (Math.abs(progress - lastProgress.current) < 0.0001) return
    lastProgress.current = progress

    const shuttleY = progress * 50

    const blendWeight = THREE.MathUtils.smoothstep(progress, FOLLOW_END, PATH_START)

    const follow = getCameraFollow(progress, shuttleY)
    const path = getCamera(progress)

    _blendedPos.copy(follow.position).lerp(path.position, blendWeight)
    _blendedLookAt.copy(follow.lookAt).lerp(path.lookAt, blendWeight)
    const blendedFov = THREE.MathUtils.lerp(follow.fov, path.fov, blendWeight)

    const smoothing = 1 - Math.exp(-SMOOTH_SPEED * delta)
    camera.position.lerp(_blendedPos, smoothing)
    camera.lookAt(_blendedLookAt)

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, blendedFov, smoothing)
      camera.updateProjectionMatrix()
    }
    invalidate()
  })

  return null
}

// ─── Dynamic Canvas wrapper (SSR disabled) ──────────────────────────────────────

const DynamicCanvas = dynamic(
  () =>
    Promise.resolve(function ScrollCanvas({
      progressRef,
      shuttleYRef,
      scene,
    }: {
      progressRef: React.RefObject<number>
      shuttleYRef: React.RefObject<number>
      scene?: React.ReactNode
    }) {
      return (
        <Canvas
          dpr={[1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]}
          gl={{
            antialias: true,
            alpha: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
            outputColorSpace: THREE.SRGBColorSpace,
            localClippingEnabled: true,
          }}
          camera={{ position: [0, -5, 10], fov: 60, near: 0.1, far: 2000 }}
          style={{ width: '100%', height: '100%' }}
        >
          <color attach="background" args={['#020914']} />
          <CameraController progressRef={progressRef} shuttleYRef={shuttleYRef} />
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
  const shuttleYRef = useRef(0)

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
    <div ref={containerRef} style={{ position: 'relative', height: '700vh' }}>
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
        <SceneErrorBoundary>
          <DynamicCanvas progressRef={progressRef} shuttleYRef={shuttleYRef} scene={scene} />
        </SceneErrorBoundary>
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
