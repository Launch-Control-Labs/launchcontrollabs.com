'use client'

import { useSceneStore } from '@/store/scene-store'
import { getBeatOpacity } from '@/config/beat-config'
import { SECTION_FLAG, TYPOGRAPHY } from '@/styles/section-constants'

const CALLOUTS = [
  { label: 'INDUSTRY AVERAGE', value: '90%', suffix: 'FAIL' },
  { label: 'TIME TO FAILURE', value: '18', suffix: 'MONTHS' },
  { label: 'CAPITAL BURNED', value: '$1.2M', suffix: 'WASTED' },
]

function CalloutCard({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div
      style={{
        border: '1px solid #DC2626',
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
          color: '#DC2626',
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
          color: '#FFFFFF',
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

export function BeatAscent() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const opacity = getBeatOpacity('ascent', scrollProgress)
  
  if (opacity === 0) return null
  
  return (
    <div
      data-beat="2"
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transition: 'opacity 0.1s',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          padding: 'clamp(3rem, 6vw, 5rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(1.5rem, 3vw, 3rem)',
          maxWidth: '560px',
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
            color: '#FFFFFF',
            margin: 0,
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
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
            color: '#FFFFFF',
            margin: 0,
            opacity: 0.85,
            maxWidth: '520px',
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
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
    </div>
  )
}
