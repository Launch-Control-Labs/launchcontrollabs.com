'use client'

import { useSceneStore } from '@/store/scene-store'
import { getBeatOpacity } from '@/config/beat-config'

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

export function BeatAuthority() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const opacity = getBeatOpacity('astronautFar', scrollProgress)
  if (opacity === 0) return null

  return (
    <div
      data-beat="5"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        opacity,
        transition: 'opacity 0.1s',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        color: '#FFFFFF',
      }}
    >
      <div
        style={{
          width: '58%',
          height: '100%',
          marginLeft: 'auto',
          background: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.70) 20%, rgba(0,0,0,0.78) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 4vw, 3rem)',
          position: 'relative',
          zIndex: 2,
          overflow: 'hidden',
        }}
      >
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
            marginBottom: '0.75rem',
            alignSelf: 'flex-start',
          }}
        >
          THE AUTHORITY
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 9rem)',
            fontWeight: 400,
            lineHeight: 0.85,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            margin: '0 0 1rem 0',
          }}
        >
          PROVEN<br />CREW
        </h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#6B7280',
              marginBottom: '1.5rem',
            }}
          >
            Flight History
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {COMPANIES.map((company, i) => (
              <div
                key={company}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 2.8vw, 2.8rem)',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  borderBottom: i < COMPANIES.length - 1 ? '1px solid #374151' : 'none',
                  paddingBottom: '0.3rem',
                  paddingTop: '0.3rem',
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
              fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#6B7280',
              marginBottom: '1rem',
            }}
          >
            Recognition
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1px',
              background: '#374151',
              maxWidth: '600px',
            }}
          >
            {AWARDS.map((award) => (
              <div
                key={award.org}
                style={{
                  background: 'rgba(0,0,0,0.9)',
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: '120px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
                    letterSpacing: '0.15em',
                    color: '#6B7280',
                    marginBottom: '0.5rem',
                  }}
                >
                  {award.year}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                    marginBottom: '0.25rem',
                  }}
                >
                  {award.achievement}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.6rem, 0.8vw, 0.75rem)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#6B7280',
                  }}
                >
                  {award.org}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
