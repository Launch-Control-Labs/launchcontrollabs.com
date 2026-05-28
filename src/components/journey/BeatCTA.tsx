'use client'

import { useSceneStore } from '@/store/scene-store'
import { getBeatOpacity } from '@/config/beat-config'

const STATS = [
  { value: '6', label: 'MISSIONS\nCOMPLETED' },
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
        overflow: 'hidden',
        opacity,
        transition: 'opacity 0.1s',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        color: '#E5EBF2',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignContent: 'center',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
        }}
      >
        <div style={{ position: 'relative', zIndex: 10 }}>
          <span
            style={{
              display: 'inline-block',
              border: '1px solid #22D3EE',
              padding: '0.3rem 0.8rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
              letterSpacing: '0.25em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#22D3EE',
              marginBottom: '1.5rem',
            }}
          >
            THE ORBIT
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 8vw, 8rem)',
              fontWeight: 400,
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              color: '#E5EBF2',
              textTransform: 'uppercase',
              margin: '0 0 1.5rem',
            }}
          >
            READY TO<br />LAUNCH?
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1vw, 1rem)',
              lineHeight: 1.6,
              maxWidth: '35ch',
              color: '#E5EBF2',
              opacity: 0.7,
              marginBottom: '2rem',
            }}
          >
            Your next venture deserves mission-grade execution.
          </p>

          <a
            href="mailto:projects@launchcontrollabs.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
              letterSpacing: '0.25em',
              color: '#22D3EE',
              textDecoration: 'none',
              border: '2px solid #22D3EE',
              padding: '0.75rem 2rem',
              textTransform: 'uppercase',
              fontWeight: 700,
              transition: 'all 0.2s ease',
            }}
          >
            PROJECTS@LAUNCHCONTROLLABS.COM
            <span style={{ fontSize: '1.2em' }}>→</span>
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2px',
            alignSelf: 'center',
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(34,211,238,0.2)',
                padding: 'clamp(1rem, 3vw, 2rem)',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 400,
                  lineHeight: 0.85,
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#E5EBF2',
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.5rem, 0.7vw, 0.65rem)',
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.45)',
                  whiteSpace: 'pre-line',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            left: 'clamp(1.5rem, 4vw, 3rem)',
            right: 'clamp(1.5rem, 4vw, 3rem)',
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
