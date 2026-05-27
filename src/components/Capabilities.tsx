'use client'

import { useState } from 'react'

const SERVICES = [
  {
    number: '01',
    name: 'AI-Powered Products',
    description: 'LLMs, agents, and automation systems built for production. Not prototypes—deployed systems.',
  },
  {
    number: '02',
    name: 'Full-Stack Web Apps',
    description: 'From architecture to deployment. React, Next.js, Node. We ship complete products, not partial commits.',
  },
  {
    number: '03',
    name: 'Data Pipelines',
    description: 'ETL, real-time processing, and analytics infrastructure. Systems that handle millions of events without breaking.',
  },
  {
    number: '04',
    name: 'Technical Operations',
    description: 'DevOps, monitoring, and system reliability engineering. We keep things running when it matters.',
  },
]

export default function Capabilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="section-editorial" style={{ padding: '0' }}>
      <div style={{ borderTop: '3px solid #0A0A0A', padding: 'clamp(4rem, 8vh, 7rem) 0 0' }}>
        <div className="page">
          
          <p style={{
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
            color: '#888888',
            marginBottom: 'clamp(2rem, 4vh, 3rem)',
          }}>Capabilities</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0' }}>
            {SERVICES.map((service, index) => (
              <div
                key={service.number}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  borderTop: hoveredIndex === index ? '3px solid #C41E1E' : '1px solid #0A0A0A',
                  padding: 'clamp(2rem, 4vh, 3rem) clamp(1.5rem, 3vw, 2.5rem)',
                  background: hoveredIndex === index ? '#EDE9DF' : 'transparent',
                  transition: 'border-color 120ms ease-out, background 120ms ease-out',
                  cursor: 'default',
                }}
              >
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: hoveredIndex === index ? '#C41E1E' : '#D9D0C0',
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                  transition: 'color 120ms ease-out',
                  userSelect: 'none',
                }}>
                  {service.number}
                </span>

                <h3 style={{
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  color: '#0A0A0A',
                  letterSpacing: '-0.01em',
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  marginBottom: 'clamp(0.75rem, 1.5vh, 1.25rem)',
                }}>
                  {service.name}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                  color: '#3D3D3D',
                  lineHeight: 1.65,
                  maxWidth: '280px',
                }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom rule */}
          <div style={{ borderTop: '1px solid #C8C0B0', marginTop: '0', paddingBottom: 'clamp(4rem, 8vh, 6rem)' }} />
        </div>
      </div>
    </section>
  )
}
