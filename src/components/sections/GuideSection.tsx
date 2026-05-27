'use client'

import { SectionThemeProvider } from '@/components/SectionThemeProvider'

const CAPABILITIES = [
  {
    stat: '12',
    label: 'SHIPPED',
    capability: 'AI PRODUCTS',
    description: 'Production ML systems deployed',
  },
  {
    stat: '47',
    label: 'LAUNCHED',
    capability: 'FULL-STACK WEB APPS',
    description: 'End-to-end applications shipped',
  },
  {
    stat: '3.2B',
    label: 'EVENTS/DAY',
    capability: 'DATA PIPELINES',
    description: 'Real-time event processing',
  },
  {
    stat: '99.97%',
    label: 'UPTIME',
    capability: 'TECHNICAL OPERATIONS',
    description: 'Battle-tested reliability',
  },
]

function StatCard({
  stat,
  label,
  capability,
  description,
}: {
  stat: string
  label: string
  capability: string
  description: string
}) {
  return (
    <div
      style={{
        border: '1px solid var(--section-accent)',
        background: 'rgba(10, 10, 15, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '1.5rem 1.25rem',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          display: 'block',
          lineHeight: 0.9,
          color: 'var(--section-accent)',
          letterSpacing: '-0.02em',
        }}
      >
        {stat}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          color: 'var(--section-muted)',
          textTransform: 'uppercase',
          display: 'block',
          marginTop: '0.35rem',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-display-secondary)',
          fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
          fontWeight: 700,
          letterSpacing: '0.05em',
          color: '#FFFFFF',
          textTransform: 'uppercase',
          display: 'block',
          marginTop: '0.75rem',
        }}
      >
        {capability}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--section-muted)',
          display: 'block',
          marginTop: '0.35rem',
          lineHeight: 1.4,
        }}
      >
        {description}
      </span>
    </div>
  )
}

export function GuideSection() {
  return (
    <SectionThemeProvider sectionIndex={2}>
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          background: 'transparent',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'clamp(2rem, 5vw, 4rem)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 'clamp(1.5rem, 3vw, 2.5rem)',
            left: 'clamp(1.5rem, 4vw, 3rem)',
            display: 'inline-block',
            border: '1px solid var(--section-accent)',
            padding: '0.3rem 0.8rem',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
            letterSpacing: '0.25em',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--section-accent)',
            background: 'rgba(10, 10, 15, 0.8)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        >
          THE GUIDE
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            margin: 0,
            textAlign: 'center',
            marginBottom: '1rem',
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
          }}
        >
          MISSION CAPABLE
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textAlign: 'center',
            maxWidth: '50ch',
            margin: '0 auto 3rem',
            lineHeight: 1.6,
          }}
        >
          Systems engineered for production. Numbers that prove it.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(200px, 280px))',
            gap: '1.5rem',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '640px',
          }}
        >
          {CAPABILITIES.map((item) => (
            <StatCard
              key={item.label}
              stat={item.stat}
              label={item.label}
              capability={item.capability}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </SectionThemeProvider>
  )
}
