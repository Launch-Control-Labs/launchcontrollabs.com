'use client'

import { SectionThemeProvider } from '@/components/SectionThemeProvider'

// Capability data preserved from Capabilities.tsx
const CAPABILITIES = [
  {
    id: 'ai-products',
    stat: '12',
    label: 'SHIPPED',
    name: 'AI PRODUCTS',
    desc: 'LLMs, agents, and automation systems built for production. Not prototypes—deployed systems.',
    position: { top: '15%', left: '5%' },
    leaderLine: { from: 'right' as const, length: '120px' },
  },
  {
    id: 'full-stack',
    stat: '47',
    label: 'LAUNCHED',
    name: 'FULL-STACK WEB APPS',
    desc: 'From architecture to deployment. React, Next.js, Node. Complete products, not partial commits.',
    position: { top: '35%', right: '5%' },
    leaderLine: { from: 'left' as const, length: '100px' },
  },
  {
    id: 'data-pipelines',
    stat: '3.2B',
    label: 'EVENTS/DAY',
    name: 'DATA PIPELINES',
    desc: 'ETL, real-time processing, analytics. Systems that handle millions of events without breaking.',
    position: { bottom: '25%', left: '5%' },
    leaderLine: { from: 'right' as const, length: '140px' },
  },
  {
    id: 'devops',
    stat: '99.97%',
    label: 'UPTIME',
    name: 'TECHNICAL OPERATIONS',
    desc: 'DevOps, monitoring, reliability engineering. We keep things running when it matters.',
    position: { bottom: '8%', right: '8%' },
    leaderLine: { from: 'left' as const, length: '80px' },
  },
]

function AnnotationCallout({
  stat,
  label,
  name,
  desc,
  position,
  leaderLine,
}: {
  stat: string
  label: string
  name: string
  desc: string
  position: React.CSSProperties
  leaderLine: { from: 'left' | 'right'; length: string }
}) {
  const isLeft = leaderLine.from === 'left'

  return (
    <div
      style={{
        position: 'absolute',
        ...position,
        zIndex: 10,
      }}
    >
      {/* Leader line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          [isLeft ? 'right' : 'left']: '100%',
          width: leaderLine.length,
          height: '1px',
          background: 'var(--section-accent)',
          transform: 'translateY(-50%)',
        }}
      >
        {/* Dot at end of leader line */}
        <div
          style={{
            position: 'absolute',
            [isLeft ? 'right' : 'left']: 0,
            top: '50%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--section-accent)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Callout box */}
      <div
        style={{
          border: '1px solid var(--section-accent)',
          padding: '12px 16px',
          background: 'var(--section-bg)',
          maxWidth: '220px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            display: 'block',
            lineHeight: 1,
            color: 'var(--section-accent)',
            letterSpacing: '-0.02em',
          }}
        >
          {stat}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            color: 'var(--section-muted)',
            textTransform: 'uppercase',
            display: 'block',
            marginTop: '0.25rem',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display-secondary)',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: 'var(--section-text)',
            textTransform: 'uppercase',
            display: 'block',
            marginTop: '0.5rem',
          }}
        >
          {name}
        </span>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            lineHeight: 1.5,
            color: 'var(--section-muted)',
            marginTop: '0.5rem',
            marginBlock: 0,
          }}
        >
          {desc}
        </p>
      </div>
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
          background: 'var(--section-bg)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(2rem, 5vw, 4rem)',
        }}
      >
        {/* Section flag */}
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
          }}
        >
          THE GUIDE
        </span>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: 'var(--section-text)',
            margin: 0,
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          MISSION CAPABLE
        </h2>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
            color: 'var(--section-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textAlign: 'center',
            maxWidth: '50ch',
            margin: '0 auto 2rem',
            lineHeight: 1.6,
          }}
        >
          Systems engineered for production. Numbers that prove it.
        </p>

        {/* 3D scene container - shuttle rendered here via GuideScene */}
        <div
          className="guide-annotation-desktop"
          style={{
            position: 'relative',
            width: '100%',
            height: '50vh',
            minHeight: '400px',
          }}
        >
          {/* Annotation callouts overlay */}
          {CAPABILITIES.map((cap) => (
            <AnnotationCallout
              key={cap.id}
              stat={cap.stat}
              label={cap.label}
              name={cap.name}
              desc={cap.desc}
              position={cap.position}
              leaderLine={cap.leaderLine}
            />
          ))}
        </div>

        {/* Mobile: stacked callouts below */}
        <div
          style={{
            display: 'none', // Hidden on desktop, shown on mobile via CSS
            flexDirection: 'column',
            gap: '1.5rem',
            marginTop: '2rem',
            padding: '0 1rem',
          }}
          className="guide-mobile-callouts"
        >
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              style={{
                border: '1px solid var(--section-accent)',
                padding: '1rem',
                background: 'var(--section-bg)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  color: 'var(--section-accent)',
                  display: 'block',
                }}
              >
                {cap.stat}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  color: 'var(--section-muted)',
                  textTransform: 'uppercase',
                }}
              >
                {cap.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display-secondary)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--section-text)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: '0.5rem',
                }}
              >
                {cap.name}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile styles */}
        <style>{`
          @media (max-width: 768px) {
            .guide-mobile-callouts {
              display: flex !important;
            }
          }
          @media (max-width: 768px) {
            .guide-annotation-desktop {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </SectionThemeProvider>
  )
}
