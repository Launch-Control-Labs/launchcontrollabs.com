'use client'

import { useEffect, useRef, useState } from 'react'
import { useSceneStore } from '@/store/scene-store'
import { SECTION_THEMES } from '@/styles/section-constants'
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const SECTION_NAMES = ['THE PROMISE', 'THE PROBLEM', 'THE GUIDE', 'THE PROOF', 'THE AUTHORITY', 'THE ORBIT']
const SCROLL_SECTION_IDS = [
  'section-hero',
  'section-problem',
  'section-guide',
  'section-proof',
  'section-authority',
  'section-orbit',
]
const THEME_KEYS = ['hero', 'problem', 'guide', 'proof', 'authority', 'orbit'] as const

const BEAT_TO_INDEX = (progress: number): number => {
  if (progress < 0.15) return 0
  if (progress < 0.35) return 1
  if (progress < 0.55) return 2
  if (progress < 0.75) return 3
  if (progress < 0.90) return 4
  return 5
}

export default function SectionNav() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const activeSection = BEAT_TO_INDEX(scrollProgress)
  const [isMobile, setIsMobile] = useState(false)
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([])

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleDotClick = (index: number) => {
    const sectionId = SCROLL_SECTION_IDS[index]
    const element = document.getElementById(sectionId)

    if (element) {
      gsap.to(window, {
        scrollTo: element,
        duration: 1,
        ease: 'power2.inOut',
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleDotClick(index)
    }
  }

  if (isMobile) return null

  return (
    <nav
      style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
      aria-label="Section navigation"
    >
      {SECTION_NAMES.map((name, index) => {
        const themeKey = THEME_KEYS[index]
        const theme = SECTION_THEMES[themeKey]
        const isActive = activeSection === index

        return (
          <button
            key={index}
            ref={(el) => {
              dotsRef.current[index] = el
            }}
            onClick={() => handleDotClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-label={`Go to section ${index + 1}: ${name}`}
            aria-current={isActive ? 'page' : undefined}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: `1px solid ${theme.accent}`,
              background: isActive ? theme.accent : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
              outline: 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = `0 0 8px ${theme.accent}`
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
        )
      })}
    </nav>
  )
}
