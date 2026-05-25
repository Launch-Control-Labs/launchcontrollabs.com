'use client'

import { useEffect, useRef } from 'react'

const phases = [
  {
    label: 'THE PROBLEM',
    content:
      "Traditional accounting software couldn't categorize transactions intelligently. Manual review took 4+ hours daily.",
  },
  {
    label: 'THE APPROACH',
    content:
      'We built an AI categorization engine, anomaly detection system, and natural language reporting layer.',
  },
  {
    label: 'THE BUILD',
    content:
      'Next.js + Python ML pipeline + custom fine-tuned models. 14 weeks. Shipped weekly.',
  },
  {
    label: 'THE OUTCOME',
    content:
      'SaaS Product of the Week on Product Hunt. Multiple design awards. $2M ARR year one.',
  },
]

export default function MissionNarrative() {
  const sectionRef = useRef<HTMLElement>(null)
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        phaseRefs.current.forEach((el) => {
          if (!el) return
          gsap.fromTo(
            el,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 82%',
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

        {/* Outcome first */}
        <h2
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: 500,
            color: 'var(--text)',
            marginBottom: 'var(--space-8)',
            maxWidth: '600px',
            lineHeight: 1.35,
          }}
        >
          AI-Powered Accounting Platform —{' '}
          <span style={{ color: 'var(--amber)' }}>$2M ARR in Year One</span>
        </h2>

        {/* Link to live product */}
        <p
          className="text-dim"
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-7)',
          }}
        >
          <a
            href="https://gettalisman.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              borderBottom: '1px solid var(--border)',
              paddingBottom: '1px',
              transition: 'color 0.2s',
            }}
          >
            gettalisman.com ↗
          </a>
        </p>

        {/* Story phases */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-8)',
          }}
        >
          {phases.map((phase, i) => (
            <div
              key={phase.label}
              ref={(el) => {
                phaseRefs.current[i] = el
              }}
              style={{ maxWidth: '580px' }}
            >
              <p
                style={{
                  fontSize: '0.5rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {phase.label}
              </p>
              <p
                className="font-body"
                style={{
                  fontSize: '1rem',
                  fontWeight: 400,
                  lineHeight: 1.65,
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
