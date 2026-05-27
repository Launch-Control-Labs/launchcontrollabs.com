'use client'

import { SectionThemeProvider } from '@/components/SectionThemeProvider'

export function HeroOverlay() {
  return (
    <SectionThemeProvider sectionIndex={0}>
      <div
        data-section="hero"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            padding: '0',
            paddingBottom: 'clamp(0.5rem, 1.5vh, 1.2rem)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '0.3rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.65rem, 1vw, 0.9rem)',
                letterSpacing: '0.15em',
                color: 'var(--section-text)',
                opacity: 0.4,
                textTransform: 'uppercase',
              }}
            >
              Dallas · Barcelona · Miami
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.65rem, 1vw, 0.9rem)',
                letterSpacing: '0.2em',
                color: 'var(--section-accent)',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              EST. 2024
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4.5rem, 13vw, 13rem)',
                lineHeight: 0.85,
                letterSpacing: '-0.02em',
                color: 'var(--section-text)',
                textTransform: 'uppercase',
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              LAUNCH CONTROL
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginTop: '-0.05em',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.9rem, 1.6vw, 1.4rem)',
                  letterSpacing: '0.02em',
                  fontWeight: 400,
                  color: 'var(--section-text)',
                  opacity: 0.6,
                  textTransform: 'none',
                  margin: 0,
                  maxWidth: '32ch',
                  lineHeight: 1.5,
                }}
              >
                From idea to shipped product. No guessing.
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display-secondary)',
                  fontSize: 'clamp(3rem, 8vw, 8rem)',
                  lineHeight: 0.85,
                  letterSpacing: '-0.02em',
                  color: 'var(--section-text)',
                  textTransform: 'uppercase',
                  margin: 0,
                  textShadow: '0 0 80px rgba(34, 211, 238, 0.2)',
                }}
              >
                LABS
              </h2>
            </div>
          </div>
        </div>
      </div>
    </SectionThemeProvider>
  )
}
