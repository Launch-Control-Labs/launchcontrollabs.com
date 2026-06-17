'use client'

import { useSceneStore } from '@/store/scene-store'
import { getBeatOpacity } from '@/config/beat-config'
import { ContactForm } from '@/components/ContactForm'

const STATS = [
  { value: '6', label: 'MISSIONS\nFEATURED' },
  { value: '✓', label: 'ON-TIME\nDELIVERY' },
  { value: '2–3', label: 'NEW PER\nQUARTER' },
  { value: '<48h', label: 'RESPONSE\nTIME' },
]

export function BeatCTA() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const opacity = getBeatOpacity('astronautClose', scrollProgress)

  if (opacity === 0) return null

  return (
    <div
      data-beat="6"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden auto',
        opacity,
        transition: 'opacity 0.1s',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        color: '#E5EBF2',
      }}
    >
      <div
        style={{
          position: 'relative',
          minHeight: '100%',
          display: 'grid',
          // Single column on narrow, side-by-side from ~800 px up
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: 'clamp(1.5rem, 4vw, 3rem)',
          alignContent: 'center',
          padding: 'clamp(4rem, 8vw, 5rem) clamp(1.25rem, 4vw, 3rem) clamp(3rem, 6vw, 4rem)',
        }}
      >
        {/* Left column — heading + form */}
        <div style={{ position: 'relative', zIndex: 10, minWidth: 0 }}>
          <span
            style={{
              display: 'inline-block',
              border: '1px solid #22D3EE',
              padding: '0.3rem 0.8rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6rem, 0.9vw, 0.85rem)',
              letterSpacing: '0.25em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#22D3EE',
              marginBottom: '1.25rem',
            }}
          >
            THE ORBIT
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 8rem)',
              fontWeight: 400,
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              color: '#E5EBF2',
              textTransform: 'uppercase',
              margin: '0 0 1.25rem',
            }}
          >
            READY TO<br />LAUNCH?
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem, 1vw, 1rem)',
              lineHeight: 1.6,
              maxWidth: '35ch',
              color: '#E5EBF2',
              opacity: 0.7,
              marginBottom: '1.5rem',
            }}
          >
            Your next venture deserves mission-grade execution.
          </p>

          <ContactForm accentColor="#22D3EE" />
        </div>

        {/* Right column — stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2px',
            alignSelf: 'center',
            width: '100%',
            minWidth: 0,
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(34,211,238,0.2)',
                padding: 'clamp(0.75rem, 2.5vw, 2rem)',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
                  fontWeight: 400,
                  lineHeight: 0.85,
                  display: 'block',
                  marginBottom: '0.25rem',
                  color: '#E5EBF2',
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.5rem, 0.7vw, 0.65rem)',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.45)',
                  whiteSpace: 'pre-line',
                  textTransform: 'uppercase',
                  lineHeight: 1.2,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer line */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(1rem, 2vw, 2rem)',
            left: 'clamp(1.25rem, 4vw, 3rem)',
            right: 'clamp(1.25rem, 4vw, 3rem)',
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.45rem, 0.6vw, 0.55rem)',
            letterSpacing: '0.2em',
            color: '#E5EBF2',
            opacity: 0.4,
            textTransform: 'uppercase',
          }}
        >
          <span>&copy; 2026 LAUNCH CONTROL LABS</span>
          <span>LOS ANGELES, CA</span>
        </div>
      </div>
    </div>
  )
}
