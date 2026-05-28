'use client'

import { useEffect, useRef } from 'react'

const phases = [
  {
    number: '01',
    label: 'THE PROBLEM',
    content:
      'Traditional accounting software couldn\'t categorize transactions intelligently. Firms spent 4+ hours daily on manual review and reconciliation.',
  },
  {
    number: '02',
    label: 'THE APPROACH',
    content:
      'Custom AI categorization engine. Anomaly detection. Natural language reporting. Built to replace most manual bookkeeping workflows.',
  },
  {
    number: '03',
    label: 'THE BUILD',
    content:
      '14 weeks. Next.js frontend, Python ML pipeline, custom fine-tuned models. Weekly ship cadence with live client feedback loops.',
  },
  {
    number: '04',
    label: 'THE OUTCOME',
    content:
      'TWIF Best New Startup. #2 of the Day on Product Hunt. Active user base across accounting firms.',
  },
]

export default function MissionNarrative() {
  const sectionRef = useRef<HTMLElement>(null)
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        phaseRefs.current.forEach((el, i) => {
          if (!el) return
          gsap.fromTo(
            el,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.05,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      }, sectionRef)
    }

    init()

    return () => {
      ctx?.revert()
    }
  }, [])

  return (
    <section ref={sectionRef}>
      <div className="page">
        {/* Section label */}
        <p className="section-label">FEATURED MISSION · MSN-001</p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            fontWeight: 500,
            color: 'var(--text)',
            marginBottom: 'var(--space-3)',
            maxWidth: '650px',
            lineHeight: 1.35,
            letterSpacing: '-0.03em',
          }}
        >
          AI-Powered Accounting Platform — TWIF Best New Startup · Product Hunt #2 of the Day
        </h2>

        {/* Link to live product */}
        <p
          style={{
            fontSize: '0.7rem',
            marginBottom: 'var(--space-8)',
          }}
        >
          <a
            href="https://gettalisman.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--amber)',
              borderBottom: '1px solid transparent',
              paddingBottom: '1px',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'var(--amber)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent')
            }
          >
            gettalisman.com →
          </a>
        </p>

        {/* Story phases */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-7)',
          }}
        >
          {phases.map((phase, i) => (
            <div
              key={phase.label}
              ref={(el) => {
                phaseRefs.current[i] = el
              }}
              style={{
                maxWidth: '600px',
                opacity: 0,
              }}
            >
              {/* Phase number */}
              <span
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 300,
                  color: 'var(--text-muted)',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: 'var(--space-2)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '-0.03em',
                }}
              >
                {phase.number}
              </span>

              {/* Phase label */}
              <p
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {phase.label}
              </p>

              {/* Phase content */}
              <p
                className="font-body"
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: 'var(--text)',
                }}
              >
                {phase.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
