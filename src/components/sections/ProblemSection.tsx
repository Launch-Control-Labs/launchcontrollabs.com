'use client'

import { SectionThemeProvider } from '@/components/SectionThemeProvider'
import { SECTION_FLAG, TYPOGRAPHY, SPACING } from '@/styles/section-constants'

const CALLOUTS = [
  { label: 'INDUSTRY AVERAGE', value: '90%', suffix: 'FAIL' },
  { label: 'TIME TO FAILURE', value: '18', suffix: 'MONTHS' },
  { label: 'CAPITAL BURNED', value: '$1.2M', suffix: 'WASTED' },
]

function CalloutCard({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div
      style={{
        border: '1px solid var(--section-accent)',
        padding: 'clamp(12px, 2vw, 20px) clamp(16px, 2.5vw, 28px)',
        background: 'rgba(220, 38, 38, 0.05)',
        position: 'relative' as const,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.6rem, 0.75vw, 0.75rem)',
          display: 'block',
          letterSpacing: '0.2em',
          color: 'var(--section-accent)',
          marginBottom: '0.5rem',
          opacity: 0.8,
        }}
      >
        {label}
      </span>
      
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 5rem)',
          fontWeight: 400,
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          color: 'var(--section-text)',
        }}
      >
        {value}
        <span
          style={{
            display: 'block',
            fontSize: 'clamp(1.2rem, 2.5vw, 2.5rem)',
            marginTop: '0.25rem',
          }}
        >
          {suffix}
        </span>
      </div>
    </div>
  )
}

function ProblemContent() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1.5rem, 3vw, 3rem)',
        maxWidth: '600px',
      }}
    >
      <div style={SECTION_FLAG}>
        THE PROBLEM
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: TYPOGRAPHY.sectionHeader.size,
          fontWeight: TYPOGRAPHY.sectionHeader.weight,
          lineHeight: TYPOGRAPHY.sectionHeader.lineHeight,
          letterSpacing: TYPOGRAPHY.sectionHeader.letterSpacing,
          color: 'var(--section-text)',
          margin: 0,
        }}
      >
        LOST IN SPACE
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: TYPOGRAPHY.deck,
          lineHeight: TYPOGRAPHY.lineHeightBody,
          letterSpacing: TYPOGRAPHY.letterSpacingDeck,
          color: 'var(--section-text)',
          margin: 0,
          opacity: 0.85,
          maxWidth: '520px',
        }}
      >
        Most products don&apos;t fail because of bad ideas. They fail because the right team 
        wasn&apos;t there to navigate the unknown. Without experienced operators who&apos;ve 
        been to orbit and back, even the best missions drift into the void.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'clamp(0.75rem, 1.5vw, 1.5rem)',
          marginTop: '1rem',
        }}
      >
        {CALLOUTS.map((callout) => (
          <CalloutCard key={callout.label} {...callout} />
        ))}
      </div>
    </div>
  )
}

export function ProblemSection() {
  return (
    <SectionThemeProvider sectionIndex={1}>
      <section
        id="problem"
        style={{
          width: '100%',
          minHeight: '100vh',
          background: 'var(--section-bg)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          position: 'relative' as const,
          overflow: 'hidden' as const,
        }}
      >
        <div
          style={{
            position: 'relative' as const,
            height: '100vh',
            background: 'radial-gradient(ellipse at 30% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 60%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: SPACING.sectionPad,
            position: 'relative' as const,
            zIndex: 1,
          }}
        >
          <ProblemContent />
        </div>

        <div
          style={{
            position: 'absolute' as const,
            top: '50%',
            left: '30%',
            transform: 'translate(-50%, -50%)',
            width: '60vw',
            height: '60vw',
            background: 'radial-gradient(circle, rgba(220, 38, 38, 0.06) 0%, transparent 50%)',
            pointerEvents: 'none' as const,
          }}
        />
      </section>
    </SectionThemeProvider>
  )
}
