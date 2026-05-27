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
            paddingBottom: 'clamp(3rem, 8vh, 6rem)',
            paddingLeft: 'clamp(1.5rem, 4vw, 3rem)',
            paddingRight: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 14vw, 12rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              color: 'var(--section-text)',
              textTransform: 'uppercase',
              margin: 0,
              opacity: 0.9,
            }}
          >
            LAUNCH<br />CONTROL
          </h1>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginTop: '0.1em',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.85rem, 1.4vw, 1.2rem)',
                letterSpacing: '0.02em',
                fontWeight: 400,
                color: 'var(--section-text)',
                opacity: 0.55,
                margin: 0,
                maxWidth: '30ch',
                lineHeight: 1.5,
              }}
            >
              From idea to shipped product. No guessing.
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                lineHeight: 0.85,
                letterSpacing: '-0.02em',
                color: 'var(--section-text)',
                textTransform: 'uppercase',
                margin: 0,
                opacity: 0.9,
              }}
            >
              LABS
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              marginTop: '1.5rem',
              margin: '1.5rem 0 0 0',
            }}
          >
            SCROLL TO LAUNCH
          </p>
        </div>
      </div>
    </SectionThemeProvider>
  )
}
