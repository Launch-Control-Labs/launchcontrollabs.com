'use client'

import { useRef, useEffect, useCallback } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { useSceneStore, SECTION_COUNT } from '@/store/scene-store'
import { useSceneLifecycle } from '@/hooks/useSceneLifecycle'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useDeviceTier } from '@/hooks/useDeviceTier'
import { SceneRenderer } from './3d/SceneRenderer'
import { ProblemSection } from './sections/ProblemSection'
import { GuideSection } from './sections/GuideSection'
import { ProofSection } from './sections/ProofSection'
import { AuthoritySection } from './sections/AuthoritySection'
import { OrbitSection } from './sections/OrbitSection'

// Register all Three.js objects with R3F's namespace
// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any)

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.config({
  ignoreMobileResize: true,
})

const SECTION_IDS = [
  'section-hero',
  'section-problem',
  'section-guide',
  'section-proof',
  'section-authority',
  'section-orbit',
] as const

const SECTION_HEIGHTS = [
  '100vh',
  '140vh',
  '140vh',
  '120vh',
  '120vh',
  '100vh',
] as const

export function ScrollScene({ children }: { children: React.ReactNode }) {
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>(Array(SECTION_COUNT).fill(null))
  const { setActiveSection, setScrollProgress } = useSceneStore()

  useSceneLifecycle()
  const prefersReducedMotion = useReducedMotion()
  const deviceTier = useDeviceTier()

  const setSectionRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el
  }, [])

  useGSAP(() => {
    if (!canvasContainerRef.current) return

    ScrollTrigger.create({
      trigger: canvasContainerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: false,
    })
  }, { scope: canvasContainerRef })

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    let lastScrollY = window.scrollY

    const getScrollDirection = () => {
      const currentY = window.scrollY
      const direction = currentY >= lastScrollY ? 'down' : 'up'
      lastScrollY = currentY
      return direction
    }

    sectionRefs.current.forEach((sectionEl, index) => {
      if (!sectionEl) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const direction = getScrollDirection()
            const threshold = direction === 'up' ? 0.15 : 0.3
            if (entry.intersectionRatio >= threshold) {
              setActiveSection(index)
            }
          })
        },
        { threshold: [0.1, 0.15, 0.3, 0.5, 0.7] }
      )

      observer.observe(sectionEl)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [setActiveSection])

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    sectionRefs.current.forEach((sectionEl, index) => {
      if (!sectionEl) return

      const trigger = ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const { activeSection } = useSceneStore.getState()
          if (activeSection === index) {
            setScrollProgress(self.progress)
          }
        },
      })

      triggers.push(trigger)
    })

    return () => triggers.forEach((t) => t.kill())
  }, [setScrollProgress])

  return (
    <div ref={canvasContainerRef} style={{ position: 'relative' }}>
      {/* 3D Canvas — decorative only, hidden from assistive tech */}
      <div
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          display: prefersReducedMotion ? 'none' : 'block',
        }}
      >
        <Canvas
          dpr={deviceTier >= 3 ? [1, 1.5] : [1, 1]}
          gl={{
            antialias: true,
            alpha: false,
            outputColorSpace: THREE.SRGBColorSpace,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.85,
          }}
          camera={{ position: [0, 3, 30], fov: 50, near: 0.1, far: 2000 }}
          style={{ width: '100%', height: '100%' }}
        >
          <color attach="background" args={['#020914']} />
          <SceneRenderer />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {SECTION_IDS.map((id, index) => (
          <div
            key={id}
            id={id}
            ref={setSectionRef(index)}
            data-section={index}
            style={{
              minHeight: SECTION_HEIGHTS[index],
              position: 'relative',
              background: 'transparent',
              overflow: index === 0 ? 'hidden' : 'visible',
            }}
          >
            {index === 0 && children}
            {index === 1 && <ProblemSection />}
            {index === 2 && <GuideSection />}
            {index === 3 && <ProofSection />}
            {index === 4 && <AuthoritySection />}
            {index === 5 && <OrbitSection />}
          </div>
        ))}
      </div>
    </div>
  )
}
