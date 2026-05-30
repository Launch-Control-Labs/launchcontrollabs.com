'use client'

import { ReactLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { useExperienceMode } from '@/hooks/useExperienceMode'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const experienceMode = useExperienceMode()
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    if (experienceMode !== '3d') return

    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    lenis.on('scroll', ScrollTrigger.update)

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.off('scroll', ScrollTrigger.update)
    }
  }, [experienceMode])

  if (experienceMode !== '3d') {
    return <>{children}</>
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
