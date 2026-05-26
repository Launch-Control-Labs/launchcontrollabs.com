'use client'

import { useState } from 'react'

const SERVICES = [
  {
    number: '01',
    name: 'AI-Powered Products',
    description:
      'LLMs, agents, and automation systems built for production. Not prototypes—deployed systems.',
  },
  {
    number: '02',
    name: 'Full-Stack Web Apps',
    description:
      'From architecture to deployment. React, Next.js, Node. We ship complete products, not partial commits.',
  },
  {
    number: '03',
    name: 'Data Pipelines',
    description:
      'ETL, real-time processing, and analytics infrastructure. Systems that handle millions of events without breaking.',
  },
  {
    number: '04',
    name: 'Technical Operations',
    description:
      'DevOps, monitoring, and system reliability engineering. We keep things running when it matters.',
  },
]

export default function Capabilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section>
      <div className="page">
        <p className="section-label">CAPABILITIES</p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '0',
          }}
        >
          {SERVICES.map((service, index) => (
            <div
              key={service.number}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'relative',
                padding: 'clamp(2rem, 5vh, 3.5rem) clamp(1.5rem, 4vw, 2.5rem)',
                borderTop: '1px solid var(--border)',
                borderLeft: hoveredIndex === index ? '3px solid var(--amber)' : '3px solid transparent',
                background: hoveredIndex === index ? 'var(--surface)' : 'transparent',
                transition: 'border-color 150ms ease-out, background 150ms ease-out',
                cursor: 'default',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--amber)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {service.number}
              </span>

              <h3
                style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text)',
                  letterSpacing: '-0.02em',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {service.name}
              </h3>

              <p
                className="font-body"
                style={{
                  fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                  color: 'var(--text-dim)',
                  lineHeight: 1.65,
                  maxWidth: '320px',
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
