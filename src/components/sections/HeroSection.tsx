'use client'

import { SectionThemeProvider } from '@/components/SectionThemeProvider'

/**
 * HeroSection — ESPN Magazine-level editorial typography
 * 
 * Typography system:
 * - Anton (var(--font-display)): "LAUNCH CONTROL" at clamp(4.5rem, 13vw, 13rem)
 * - Space Grotesk (var(--font-display-secondary)): "LABS" at clamp(3rem, 8vw, 8rem)
 * - Inter (var(--font-body)): Tagline body text
 * 
 * Design principles:
 * - Tight line-height (0.85) for ESPN-style stacking
 * - Letter spacing -0.02em for editorial tightness
 * - Annotation callouts with thin 1px borders, monospace, small caps
 */
export function HeroSection() {
  return (
    <SectionThemeProvider sectionIndex={0}>
      <section
        data-section="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: 'transparent', // 3D canvas shows through
          padding: '0',
          paddingBottom: 'clamp(0.5rem, 1.5vh, 1.2rem)',
        }}
      >
        {/* Annotation callout: EST. 2024 — top right */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(1.5rem, 4vh, 3rem)',
            right: 'clamp(1rem, 3vw, 2rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0.25rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--section-accent)',
              fontWeight: 500,
            }}
          >
            EST. 2024
          </span>
          <div
            style={{
              width: '1px',
              height: '2rem',
              background: 'var(--section-accent)',
              opacity: 0.5,
            }}
          />
        </div>

        {/* Annotation callout: PRODUCT STUDIO — top left */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(1.5rem, 4vh, 3rem)',
            left: 'clamp(1rem, 3vw, 2rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.25rem',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '2rem',
              background: 'var(--section-text)',
              opacity: 0.3,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--section-text)',
              opacity: 0.6,
              fontWeight: 500,
            }}
          >
            PRODUCT STUDIO
          </span>
        </div>

        {/* Main hero content */}
        <div
          style={{
            padding: '0 clamp(1rem, 3vw, 2rem)',
          }}
        >
          {/* Location bar */}
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
          </div>

          {/* Headline: LAUNCH CONTROL */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4.5rem, 13vw, 13rem)',
              fontWeight: 400,
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              color: 'var(--section-text)',
              textTransform: 'uppercase',
              margin: 0,
              overflow: 'hidden',
            }}
          >
            LAUNCH CONTROL
          </h1>

          {/* Secondary line: LABS + Tagline */}
          <div
            className="hero-secondary-row"
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginTop: '-0.05em',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)', // Inter
                fontSize: 'clamp(0.9rem, 1.6vw, 1.4rem)',
                letterSpacing: '0.02em',
                fontWeight: 400,
                color: 'var(--section-text)',
                opacity: 0.6,
                margin: 0,
                maxWidth: '32ch',
                lineHeight: 1.5,
              }}
            >
              From idea to shipped product. No guessing.
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display-secondary)', // Space Grotesk
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                fontWeight: 700,
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
      </section>
    </SectionThemeProvider>
  )
}
