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
        <div style={{ padding: '0', paddingBottom: 'clamp(0.5rem, 1.5vh, 1.2rem)' }}>

          {/* Metadata row: PRODUCT STUDIO · DALLAS · BARCELONA · MIAMI  |  EST. 2021 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '0.3rem',
            paddingLeft: '0.1em',
            paddingRight: '0.1em',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6rem, 1vw, 0.85rem)',
              letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
            }}>
              Product Studio · Dallas · Barcelona · Miami
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6rem, 1vw, 0.85rem)',
              letterSpacing: '0.25em',
              color: 'rgba(34,211,238,0.6)',
              textTransform: 'uppercase',
            }}>
              Est. 2021
            </span>
          </div>

          {/* LAUNCH CONTROL — scales to exactly fit viewport width */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 11.5vw, 16rem)',
            lineHeight: 0.82,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            margin: 0,
            opacity: 0.95,
            whiteSpace: 'nowrap',
            display: 'block',
            width: '100%',
          }}>
            LAUNCH CONTROL
          </h1>

          {/* Second row: tagline left, LABS right — both baseline-aligned */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginTop: '-0.06em',
            width: '100%',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6rem, 1.1vw, 1rem)',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              margin: 0,
              maxWidth: '28ch',
              lineHeight: 1.4,
            }}>
              From idea to shipped product. No guessing.
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 11.5vw, 16rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.01em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              margin: 0,
              opacity: 0.95,
              textShadow: '0 0 60px rgba(34, 211, 238, 0.25)',
              whiteSpace: 'nowrap',
            }}>
              LABS
            </h2>
          </div>

        </div>
      </div>
    </SectionThemeProvider>
  )
}
