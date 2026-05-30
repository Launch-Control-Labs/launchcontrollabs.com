'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Logo } from '@/components/Logo'
import { useSceneStore } from '@/store/scene-store'

// NO imports from @react-three/fiber, @react-three/drei, three, gsap
// Pure React + CSS only

const SECTION_IDS = [
  'section-hero',
  'section-services',
  'section-problem',
  'section-guide',
  'section-proof',
  'section-authority',
  'section-orbit',
  'section-footer',
] as const

/** Matches StatusBar / SectionNav beat thresholds */
const SCROLL_PROGRESS_BY_BEAT = [0.06, 0.19, 0.33, 0.48, 0.64, 0.8, 0.94, 1] as const

const BEAT_COUNT = SECTION_IDS.length
const VIEW_TRANSITION_MS = 650
const SWIPE_THRESHOLD_PX = 48
const WHEEL_THRESHOLD_PX = 40

const MobileViewContext = createContext(0)

type MobileSectionProps = {
  beatIndex: number
  align?: 'center' | 'end'
  background?: string
  children: ReactNode
  contentStyle?: CSSProperties
}

function MobileSection({
  beatIndex,
  align = 'center',
  background,
  children,
  contentStyle,
}: MobileSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const activeIndex = useContext(MobileViewContext)
  const isActive = activeIndex === beatIndex

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (isActive) {
      el.classList.add('is-visible')
    } else {
      el.classList.remove('is-visible')
    }
  }, [isActive])

  const alignClass =
    align === 'end' ? 'mobile-beat-section--end' : 'mobile-beat-section--center'

  return (
    <section
      ref={ref}
      id={SECTION_IDS[beatIndex]}
      data-beat-index={beatIndex}
      className={`mobile-beat-section ${alignClass}`}
    >
      {background ? (
        <div className="mobile-section-bg" style={{ background }} aria-hidden />
      ) : null}
      <div className="mobile-section-content" style={contentStyle}>
        {children}
      </div>
    </section>
  )
}

function useMobileViewTransition(viewportRef: RefObject<HTMLDivElement | null>) {
  const prefersReducedMotion = useReducedMotion()
  const setScrollProgress = useSceneStore((s) => s.setScrollProgress)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const isTransitioningRef = useRef(false)
  const transitionMs = prefersReducedMotion ? 0 : VIEW_TRANSITION_MS

  const goToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(BEAT_COUNT - 1, index))
      if (clamped === activeIndexRef.current || isTransitioningRef.current) return

      isTransitioningRef.current = true
      activeIndexRef.current = clamped
      setActiveIndex(clamped)
      setScrollProgress(SCROLL_PROGRESS_BY_BEAT[clamped] ?? 0)

      window.setTimeout(() => {
        isTransitioningRef.current = false
      }, transitionMs)
    },
    [setScrollProgress, transitionMs]
  )

  const goNext = useCallback(() => {
    goToIndex(activeIndexRef.current + 1)
  }, [goToIndex])

  const goPrev = useCallback(() => {
    goToIndex(activeIndexRef.current - 1)
  }, [goToIndex])

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    setScrollProgress(SCROLL_PROGRESS_BY_BEAT[0] ?? 0)
  }, [setScrollProgress])

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    let touchStartY = 0
    let wheelDelta = 0
    let wheelResetTimer = 0

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const onTouchEnd = (event: TouchEvent) => {
      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY
      const deltaY = touchStartY - touchEndY

      if (Math.abs(deltaY) < SWIPE_THRESHOLD_PX) return

      if (deltaY > 0) goNext()
      else goPrev()
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()

      if (isTransitioningRef.current) return

      wheelDelta += event.deltaY
      window.clearTimeout(wheelResetTimer)
      wheelResetTimer = window.setTimeout(() => {
        wheelDelta = 0
      }, 120)

      if (Math.abs(wheelDelta) < WHEEL_THRESHOLD_PX) return

      if (wheelDelta > 0) goNext()
      else goPrev()
      wheelDelta = 0
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault()
        goNext()
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault()
        goPrev()
      }
    }

    viewport.addEventListener('touchstart', onTouchStart, { passive: true })
    viewport.addEventListener('touchend', onTouchEnd, { passive: true })
    viewport.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      viewport.removeEventListener('touchstart', onTouchStart)
      viewport.removeEventListener('touchend', onTouchEnd)
      viewport.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(wheelResetTimer)
    }
  }, [goNext, goPrev, viewportRef])

  return { activeIndex, transitionMs }
}

// ============================================================================
// MOBILE HERO
// ============================================================================
function MobileHero() {
  return (
    <MobileSection
      beatIndex={0}
      align="end"
      background="radial-gradient(ellipse at 50% 100%, rgba(34,211,238,0.15) 0%, #020914 60%)"
    >
      <div style={{ marginBottom: 'clamp(0.5rem, 2vh, 1.5rem)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.55rem, 2vw, 0.75rem)',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
            }}
          >
            Product Studio · Dallas, TX
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.55rem, 2vw, 0.75rem)',
              letterSpacing: '0.2em',
              color: 'rgba(34,211,238,0.6)',
              textTransform: 'uppercase',
            }}
          >
            Est. 2021
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 13.5vw, 6rem)',
            lineHeight: 0.82,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            margin: 0,
            opacity: 0.95,
            textShadow: '0 2px 30px rgba(0,0,0,0.7)',
          }}
        >
          LAUNCH CONTROL
        </h1>

        <div className="mobile-hero-tagline-row">
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.55rem, 2.8vw, 0.85rem)',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              margin: 0,
              maxWidth: '28ch',
              lineHeight: 1.4,
            }}
          >
            From idea to shipped product. No guessing.
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 13.5vw, 6rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.01em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              margin: 0,
              opacity: 0.95,
              flexShrink: 0,
              textShadow: '0 2px 30px rgba(0,0,0,0.7), 0 0 60px rgba(34, 211, 238, 0.25)',
            }}
          >
            LABS
          </h2>
        </div>
      </div>
    </MobileSection>
  )
}

// ============================================================================
// MOBILE SERVICES
// ============================================================================
const MOBILE_SERVICES = [
  { num: '01', name: 'AI-POWERED PRODUCTS', desc: 'LLMs, agents, and automation systems built for production.', featured: true },
  { num: '02', name: 'FULL-STACK WEB APPS', desc: 'Architecture to deployment. React, Next.js, Node. Complete products.', featured: false },
  { num: '03', name: 'DATA PIPELINES', desc: 'ETL, real-time processing, and analytics at scale.', featured: false },
  { num: '04', name: 'TECHNICAL OPERATIONS', desc: 'DevOps, monitoring, and reliability engineering.', featured: false },
]

function MobileServices() {
  const featuredService = MOBILE_SERVICES.find((s) => s.featured)
  const otherServices = MOBILE_SERVICES.filter((s) => !s.featured)

  return (
    <MobileSection beatIndex={1} background="#020914">
      {/* Section flag - ESPN Magazine style */}
      <div style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
        <span
          style={{
            display: 'inline-block',
            background: '#22D3EE',
            color: '#020914',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.5rem, 1.8vw, 0.65rem)',
            letterSpacing: '0.2em',
            fontWeight: 700,
            textTransform: 'uppercase',
            padding: '0.2rem 0.5rem',
          }}
        >
          CAPABILITIES
        </span>
      </div>

      {/* MASSIVE editorial headline - ESPN Magazine style */}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 12vw, 7rem)',
          fontWeight: 400,
          lineHeight: 0.8,
          letterSpacing: '-0.04em',
          color: '#FFFFFF',
          margin: '0 0 0.25rem 0',
          textTransform: 'uppercase',
        }}
      >
        WHAT WE
      </h2>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 12vw, 7rem)',
          fontWeight: 400,
          lineHeight: 0.8,
          letterSpacing: '-0.04em',
          color: '#22D3EE',
          margin: '0 0 clamp(1rem, 3vw, 1.5rem) 0',
          textTransform: 'uppercase',
        }}
      >
        BUILD
      </h2>

      {/* Deck paragraph - editorial context */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.65rem, 2vw, 0.8rem)',
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          maxWidth: '32ch',
          margin: '0 0 clamp(2rem, 6vw, 3rem)',
          lineHeight: 1.5,
        }}
      >
        From idea to shipped product. Every engagement is full-stack, production-grade, and built to last.
      </p>

      {/* Featured service - ESPN Magazine hero treatment */}
      <div
        style={{
          background: 'rgba(2, 9, 20, 0.95)',
          padding: 'clamp(1.25rem, 4vw, 2rem)',
          marginBottom: '1px',
          borderLeft: '4px solid #22D3EE',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Oversized number anchor - ESPN jersey number style */}
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4.5rem, 18vw, 8rem)',
            color: 'rgba(34,211,238,0.12)',
            lineHeight: 0.75,
            letterSpacing: '-0.05em',
            position: 'absolute',
            top: '-0.1em',
            right: '0.1em',
          }}
        >
          {featuredService?.num}
        </span>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 10vw, 4rem)',
              color: 'rgba(34,211,238,0.25)',
              lineHeight: 0.9,
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            {featuredService?.num}
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.25rem, 5vw, 2rem)',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              lineHeight: 1,
              margin: '0 0 0.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            {featuredService?.name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.5,
              margin: 0,
              maxWidth: '30ch',
            }}
          >
            {featuredService?.desc}
          </p>
        </div>
      </div>

      {/* Other services - compressed, stacked */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(34,211,238,0.2)' }}>
        {otherServices.map((service, index) => (
          <div
            key={service.num}
            style={{
              background: 'rgba(2, 9, 20, 0.95)',
              padding: 'clamp(1rem, 3vw, 1.25rem)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'clamp(0.75rem, 2vw, 1rem)',
            }}
          >
            {/* Number as visual rhythm element */}
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
                color: 'rgba(34,211,238,0.35)',
                lineHeight: 0.9,
                flexShrink: 0,
              }}
            >
              {service.num}
            </span>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.85rem, 3vw, 1.1rem)',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  margin: '0 0 0.25rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {service.name}
              </h3>
              <p
                style={{
                  fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom annotation bar - ESPN metadata style */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'clamp(1.5rem, 4vw, 2rem)',
          borderTop: '1px solid rgba(34,211,238,0.2)',
          paddingTop: 'clamp(0.75rem, 2vw, 1rem)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.45rem, 1.5vw, 0.55rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          Launch Control Labs
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.45rem, 1.5vw, 0.55rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(34,211,238,0.6)',
          }}
        >
          Est. 2021
        </span>
      </div>
    </MobileSection>
  )
}

// ============================================================================
// MOBILE PROBLEM
// ============================================================================
const CALLOUTS = [
  { label: 'INDUSTRY AVERAGE', value: '70%', suffix: 'FAIL' },
  { label: 'TIME TO FAILURE', value: '3', suffix: 'YEARS' },
  { label: 'CAPITAL BURNED', value: '$2.5M', suffix: 'AVG BURN' },
]

function MobileProblem() {
  return (
    <MobileSection
      beatIndex={2}
      align="end"
      background="radial-gradient(ellipse at 20% 50%, rgba(220,38,38,0.1) 0%, #020914 60%)"
    >
      <div style={{ maxWidth: '36rem', width: '100%' }}>
        <span
          style={{
            display: 'inline-block',
            border: '1px solid #DC2626',
            padding: '0.3rem 0.8rem',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.55rem, 2vw, 0.75rem)',
            letterSpacing: '0.2em',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#DC2626',
            marginBottom: '1.5rem',
          }}
        >
          THE PROBLEM
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 400,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            margin: '0 0 1.5rem 0',
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
          }}
        >
          LOST IN SPACE
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 3vw, 1.25rem)',
            lineHeight: 1.6,
            letterSpacing: '0.02em',
            color: '#FFFFFF',
            margin: '0 0 2rem 0',
            opacity: 0.85,
            maxWidth: '480px',
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
          }}
        >
          Most products don&apos;t fail because of bad ideas. They fail because the right team 
          wasn&apos;t there to navigate the unknown. Without experienced operators who&apos;ve 
          been to orbit and back, even the best missions drift into the void.
        </p>

        <div className="mobile-callouts">
          {CALLOUTS.map((callout) => (
            <div
              key={callout.label}
              style={{
                border: '1px solid #DC2626',
                padding: 'clamp(10px, 3vw, 16px) clamp(12px, 3vw, 20px)',
                background: 'rgba(220, 38, 38, 0.05)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.5rem, 1.5vw, 0.65rem)',
                  display: 'block',
                  letterSpacing: '0.2em',
                  color: '#DC2626',
                  marginBottom: '0.4rem',
                  opacity: 0.8,
                }}
              >
                {callout.label}
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                  fontWeight: 400,
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                }}
              >
                {callout.value}
                <span
                  style={{
                    display: 'block',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.5rem)',
                    marginTop: '0.2rem',
                  }}
                >
                  {callout.suffix}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileSection>
  )
}

// ============================================================================
// MOBILE GUIDE
// ============================================================================
const STATS = [
  { stat: '12', label: 'PRODUCTS SHIPPED' },
  { stat: '6', label: 'FEATURED' },
  { stat: '99.9%', label: 'UPTIME' },
  { stat: '<48h', label: 'RESPONSE TIME' },
]

function MobileGuide() {
  return (
    <MobileSection
      beatIndex={3}
      background="radial-gradient(ellipse at 80% 50%, rgba(37,99,235,0.1) 0%, #020914 60%)"
      contentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <span
        style={{
          display: 'inline-block',
          alignSelf: 'flex-start',
          border: '1px solid #2563EB',
          padding: '0.3rem 0.8rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
          letterSpacing: '0.2em',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#2563EB',
          background: 'rgba(10, 10, 15, 0.8)',
          marginBottom: '1.5rem'
        }}
      >
        THE GUIDE
      </span>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 10vw, 6rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          margin: '0 0 0.75rem 0',
          textAlign: 'center',
          textShadow: '0 2px 20px rgba(0,0,0,0.8)',
        }}
      >
        MISSION CAPABLE
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.75rem, 2.5vw, 1rem)',
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textAlign: 'center',
          maxWidth: '40ch',
          margin: '0 auto 2rem',
          lineHeight: 1.6,
        }}
      >
        Systems engineered for production. Numbers that prove it.
      </p>

      <div className="mobile-guide-stats">
        {STATS.map((item) => (
          <div
            key={item.label}
            style={{
              border: '1px solid #2563EB',
              background: 'rgba(10, 10, 15, 0.75)',
              padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1.25rem, 3vw, 2rem)',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                display: 'block',
                lineHeight: 1,
                color: '#2563EB',
                letterSpacing: '-0.02em',
              }}
            >
              {item.stat}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.55rem, 1.5vw, 0.7rem)',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                display: 'block',
                marginTop: '0.4rem',
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </MobileSection>
  )
}

// ============================================================================
// MOBILE PROOF
// ============================================================================
const TALISMAN_PROJECT = {
  name: 'TALISMAN',
  description: 'AI-powered accounting automation for modern finance teams. Graph-native architecture processing millions of transactions.',
  stats: [
    { value: '2.4M', label: 'TRANSACTIONS' },
    { value: '99.9%', label: 'UPTIME' },
    { value: '<200ms', label: 'P95 LATENCY' },
    { value: '4', label: 'ML MODELS' },
  ],
  techStack: ['NEXT.JS', 'NEO4J', 'LLMs'],
  status: 'ACTIVE',
}

const CLIENT_PROJECTS = [
  { num: '02', name: 'OBWS', desc: 'E-commerce marketplace connecting consumers with Black-owned businesses.', year: '2024', metric: 'MARKETPLACE' },
  { num: '03', name: 'HOMEMEDS', desc: 'Pharmacy medication management. Automated dose packaging.', year: '2024', metric: 'HEALTHCARE' },
  { num: '04', name: 'OPTION ONE', desc: 'Full-range plumbing services. CSR and field coordination.', year: '2025', metric: 'FIELD OPS' },
  { num: '05', name: 'SKY BOSS', desc: 'Aviation operations management. Fleet tracking, maintenance.', year: '2025', metric: 'AVIATION' },
  { num: '06', name: 'NPS.TODAY', desc: 'Net Promoter Score platform. Automated surveys and analytics.', year: '2024', metric: 'ANALYTICS' },
]

function MobileProof() {
  return (
    <MobileSection
      beatIndex={4}
      background="radial-gradient(ellipse at 30% 70%, rgba(245,158,11,0.1) 0%, #020914 60%)"
      contentStyle={{ color: '#FAFAFA' }}
    >
      <span
        style={{
          display: 'inline-block',
          border: '2px solid #F59E0B',
          padding: '0.3rem 0.8rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
          letterSpacing: '0.25em',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#F59E0B',
          marginBottom: '1.5rem',
        }}
      >
        THE PROOF
      </span>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 10vw, 6rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#FAFAFA',
          margin: 0,
        }}
      >
        SELECT
      </h2>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 10vw, 6rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#F59E0B',
          margin: '0 0 2rem 0',
        }}
      >
        MISSIONS
      </h2>

      {/* Talisman Card */}
      <div
        style={{
          margin: 'clamp(1.5rem, 4vw, 2.5rem) 0',
          padding: 'clamp(1.25rem, 4vw, 2rem)',
          border: '3px solid #F59E0B',
          background: 'rgba(245, 158, 11, 0.05)',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 5vw, 3rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#FAFAFA',
            margin: '0 0 0.75rem 0',
          }}
        >
          {TALISMAN_PROJECT.name}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
            color: 'rgba(250, 250, 250, 0.7)',
            lineHeight: 1.6,
            maxWidth: '50ch',
            margin: '0 0 1.25rem 0',
          }}
        >
          {TALISMAN_PROJECT.description}
        </p>

        <div
          className="mobile-proof-stat-grid"
          style={{
            borderTop: '1px solid rgba(245, 158, 11, 0.3)',
            paddingTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          {TALISMAN_PROJECT.stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 4vw, 2rem)',
                  color: '#F59E0B',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.5rem, 1.5vw, 0.6rem)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(250, 250, 250, 0.5)',
                  marginTop: '0.4rem',
                  display: 'block',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {TALISMAN_PROJECT.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  border: '1px solid #F59E0B',
                  color: '#F59E0B',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
                  letterSpacing: '0.15em',
                  padding: '0.2rem 0.5rem',
                  textTransform: 'uppercase',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.5rem, 1.5vw, 0.55rem)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#FAFAFA',
              border: '2px solid rgba(245, 158, 11, 0.3)',
              padding: '0.2rem 0.6rem',
              fontWeight: 700,
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#34D399',
              }}
            />
            {TALISMAN_PROJECT.status}
          </span>
        </div>
      </div>

      {/* Client Projects */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.5rem, 1.5vw, 0.55rem)',
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(250, 250, 250, 0.4)',
          display: 'block',
          marginBottom: '1rem',
        }}
      >
        CLIENT WORK
      </span>

      <div className="mobile-proof-projects proof-projects-wrap">
        {CLIENT_PROJECTS.map((project) => (
          <span key={project.num} className="mobile-proof-chip">
            {project.num} — {project.name}
          </span>
        ))}
      </div>
    </MobileSection>
  )
}

// ============================================================================
// MOBILE AUTHORITY
// ============================================================================
const COMPANIES = [
  'LINKEDIN',
  'PLURALSIGHT',
  'PWC',
  'EXPEDIA',
  'DIGITAL TUTORS',
]

const AWARDS = [
  { achievement: 'BEST NEW STARTUP', org: 'TWIF', year: '2024' },
  { achievement: '#2 OF THE DAY', org: 'Product Hunt', year: '2024' },
]

function MobileAuthority() {
  return (
    <MobileSection
      beatIndex={5}
      background="linear-gradient(180deg, #020914 0%, #0a0a1a 100%)"
      contentStyle={{ color: '#FFFFFF' }}
    >
      <span
        style={{
          display: 'inline-block',
          border: '1px solid rgba(255,255,255,0.4)',
          padding: '0.3rem 0.8rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
          letterSpacing: '0.25em',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: '1.5rem',
        }}
      >
        THE AUTHORITY
      </span>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 12vw, 8rem)',
          fontWeight: 400,
          lineHeight: 0.85,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          margin: '0 0 2rem 0',
        }}
      >
        PROVEN<br />CREW
      </h2>

      <div style={{ marginBottom: '2.5rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '1rem',
          }}
        >
          Flight History
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {COMPANIES.map((company, i) => (
            <div
              key={company}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 6vw, 4rem)',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                borderBottom: i < COMPANIES.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                paddingBottom: '0.25rem',
                paddingTop: '0.25rem',
                opacity: 0.9,
              }}
            >
              {company}
            </div>
          ))}
        </div>
      </div>

      <div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '0.75rem',
          }}
        >
          Recognition
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.1)',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          {AWARDS.map((award) => (
            <div
              key={award.org}
              style={{
                background: 'rgba(0,0,0,0.9)',
                padding: '1rem 0.75rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '90px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.6rem, 1.5vw, 0.85rem)',
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '0.4rem',
                }}
              >
                {award.year}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  marginBottom: '0.2rem',
                }}
              >
                {award.achievement}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.5rem, 1.2vw, 0.65rem)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {award.org}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MobileSection>
  )
}

// ============================================================================
// MOBILE CTA
// ============================================================================
function MobileCTA() {
  return (
    <MobileSection
      beatIndex={6}
      background="radial-gradient(ellipse at 50% 50%, rgba(74,222,128,0.1) 0%, #020914 60%)"
      contentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <span
        style={{
          display: 'inline-block',
          border: '1px solid #4ADE80',
          padding: '0.3rem 0.8rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
          letterSpacing: '0.25em',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#4ADE80',
          marginBottom: '1.5rem',
        }}
      >
        THE ORBIT
      </span>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 10vw, 6rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          margin: '0 0 1rem 0',
          textAlign: 'center',
        }}
      >
        READY FOR<br />LAUNCH?
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.75rem, 2.5vw, 1rem)',
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textAlign: 'center',
          maxWidth: '35ch',
          margin: '0 auto 2rem',
          lineHeight: 1.6,
        }}
      >
        Let&apos;s discuss your mission. No commitment required.
      </p>

      <a
        href="mailto:hello@launchcontrollabs.com"
        style={{
          display: 'inline-block',
          maxWidth: '100%',
          textAlign: 'center',
          wordBreak: 'break-word',
          border: '2px solid #4ADE80',
          padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 4vw, 2rem)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.7rem, 2.8vw, 0.9rem)',
          letterSpacing: '0.15em',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#4ADE80',
          textDecoration: 'none',
          background: 'rgba(74, 222, 128, 0.05)',
          transition: 'background 0.2s ease',
        }}
      >
        hello@launchcontrollabs.com
      </a>
    </MobileSection>
  )
}

// ============================================================================
// MOBILE FOOTER
// ============================================================================
function MobileFooter() {
  return (
    <MobileSection beatIndex={7} background="#020914">
      <div
        style={{
          opacity: 0.7,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Logo size={160} />
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          letterSpacing: '0.1em',
          color: '#FFFFFF',
          marginTop: '1.5rem',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        LAUNCH CONTROL LABS
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)',
          letterSpacing: '0.25em',
          color: 'rgba(255,255,255,0.4)',
          marginTop: '0.5rem',
          textTransform: 'uppercase',
        }}
      >
        Dallas, TX · Est. 2021
      </span>
      </div>
    </MobileSection>
  )
}

// ============================================================================
// MOBILE EXPERIENCE (Main Export)
// ============================================================================
export function MobileExperience() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const { activeIndex, transitionMs } = useMobileViewTransition(viewportRef)

  return (
    <MobileViewContext.Provider value={activeIndex}>
      <div
        ref={viewportRef}
        className="mobile-snap-viewport"
        role="region"
        aria-label="Launch Control Labs story"
        aria-roledescription="carousel"
        tabIndex={0}
        data-active-beat={activeIndex}
      >
        <div
          className="mobile-experience"
          style={
            {
              '--mobile-active-index': activeIndex,
              '--mobile-transition-ms': `${transitionMs}ms`,
            } as CSSProperties
          }
        >
          <MobileHero />
          <MobileServices />
          <MobileProblem />
          <MobileGuide />
          <MobileProof />
          <MobileAuthority />
          <MobileCTA />
          <MobileFooter />
        </div>
      </div>
    </MobileViewContext.Provider>
  )
}
