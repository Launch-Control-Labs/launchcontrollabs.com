'use client'

import { useRef, useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { useSceneStore, SECTION_COUNT } from '@/store/scene-store'
import { SceneRenderer } from './3d/SceneRenderer'

gsap.registerPlugin(ScrollTrigger)

const SECTION_IDS = [
  'section-hero',
  'section-problem',
  'section-guide',
  'section-proof',
  'section-authority',
  'section-orbit',
] as const

export function ScrollScene({ children }: { children: React.ReactNode }) {
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>(Array(SECTION_COUNT).fill(null))
  const { setActiveSection, setScrollProgress } = useSceneStore()

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

    sectionRefs.current.forEach((sectionEl, index) => {
      if (!sectionEl) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setActiveSection(index)
            }
          })
        },
        { threshold: [0.3, 0.5, 0.7] }
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
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Canvas
          gl={{
            antialias: true,
            alpha: false,
            outputColorSpace: THREE.SRGBColorSpace,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.7,
          }}
          camera={{ position: [0, -6, 28], fov: 42, near: 0.1, far: 2000 }}
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
              minHeight: '100vh',
              position: 'relative',
              background: 'transparent',
            }}
          >
            {index === 0 && children}
          </div>
        ))}
      </div>
    </div>
  )
}
