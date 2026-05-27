'use client'

import { SectionThemeProvider } from '@/components/SectionThemeProvider'

/**
 * OrbitSection — Section 6 "THE ORBIT"
 * 
 * The overview effect: seeing Earth from space creates perspective shift.
 * This is the emotional payoff — minimal text, clear CTA.
 * 
 * Design system:
 * - Deep blue background (#0C1E3A) with Earth green accent (#4ADE80)
 * - Anton headline at 8vw: "READY FOR LAUNCH?"
 * - Contact CTA: large prominent button to email
 * - Stats row: mission metrics (preserved from Contact.tsx)
 * - Footer: copyright + location
 * 
 * Typography:
 * - Anton (var(--font-display)): Headline
 * - IBM Plex Mono (var(--font-mono)): Stats, labels, footer
 * - Inter (var(--font-body)): Body text
 */
export function OrbitSection() {
  return (
    <SectionThemeProvider sectionIndex={5}>
      <section
        data-section="orbit"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignContent: 'center',
          background: 'transparent', // 3D canvas shows through
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
        }}
      >
        {/* Left column: Headline + CTA */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          {/* Section flag */}
          <span
            style={{
              display: 'inline-block',
              border: '2px solid var(--section-accent)',
              padding: '0.3rem 0.8rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
              letterSpacing: '0.25em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--section-accent)',
              marginBottom: '1.5rem',
            }}
          >
            OPEN CHANNEL
          </span>

          {/* Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-display)', // Anton
              fontSize: 'clamp(3.5rem, 8vw, 8rem)',
              fontWeight: 400,
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              color: 'var(--section-text)',
              textTransform: 'uppercase',
              margin: '0 0 1.5rem',
            }}
          >
            READY TO<br />LAUNCH?
          </h2>

          {/* Body text */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1vw, 1rem)',
              lineHeight: 1.6,
              maxWidth: '35ch',
              color: 'var(--section-text)',
              opacity: 0.7,
              marginBottom: '2rem',
            }}
          >
            We take on 2–3 new missions per quarter. If you have a project that needs serious engineering, open a channel.
          </p>

          {/* CTA Button */}
          <a
            href="mailto:hello@launchcontrollabs.com"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
              letterSpacing: '0.25em',
              color: 'var(--section-accent)',
              textDecoration: 'none',
              border: '2px solid var(--section-accent)',
              padding: '0.75rem 2rem',
              textTransform: 'uppercase',
              fontWeight: 700,
              transition: 'all 0.2s ease',
            }}
          >
            HELLO@LAUNCHCONTROLLABS.COM
          </a>
        </div>

        {/* Right column: Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2px',
            alignSelf: 'center',
          }}
        >
          {[
            ['47', 'MISSIONS\nCOMPLETED'],
            ['98.7%', 'ON-TIME\nDELIVERY'],
            ['2–3', 'NEW PER\nQUARTER'],
            ['<48h', 'RESPONSE\nTIME'],
          ].map(([value, label]) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--section-border)',
                padding: 'clamp(1rem, 3vw, 2rem)',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)', // Anton
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 400,
                  lineHeight: 0.85,
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--section-text)',
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.5rem, 0.7vw, 0.65rem)',
                  letterSpacing: '0.15em',
                  color: 'var(--section-muted)',
                  whiteSpace: 'pre-line',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
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
            color: 'var(--section-text)',
            opacity: 0.4,
            textTransform: 'uppercase',
          }}
        >
          <span>&copy; 2026 LAUNCH CONTROL LABS</span>
          <span>LOS ANGELES, CA</span>
        </div>
      </section>
    </SectionThemeProvider>
  )
}
