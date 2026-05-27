'use client'

import { useEffect, useRef, useState } from 'react'
import { useSceneStore } from '@/store/scene-store'
import { SECTION_THEMES } from '@/styles/section-constants'
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const SECTION_NAMES = ['THE PROMISE', 'THE PROBLEM', 'THE GUIDE', 'THE PROOF', 'THE AUTHORITY', 'THE ORBIT']
const SECTION_IDS = ['hero', 'capabilities', 'projects', 'team', 'awards', 'contact']
const THEME_KEYS = ['hero', 'problem', 'guide', 'proof', 'authority', 'orbit'] as const

export default function SectionNav() {
  const { activeSection, setActiveSection } = useSceneStore()
  const [isMobile, setIsMobile] = useState(false)
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([])

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTION_IDS.map((id) => document.getElementById(id))
      let currentSection = 0

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2) {
            currentSection = i
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setActiveSection])

  const handleDotClick = (index: number) => {
    const sectionId = SECTION_IDS[index]
    const element = document.getElementById(sectionId)

    if (element) {
      gsap.to(window, {
        scrollTo: element,
        duration: 1,
        ease: 'power2.inOut',
      })
      setActiveSection(index)
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
