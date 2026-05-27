'use client'

const SERVICES = [
  {
    number: '01',
    name: 'AI-POWERED PRODUCTS',
    description: 'LLMs, agents, and automation systems built for production. Not prototypes—deployed systems.',
  },
  {
    number: '02',
    name: 'FULL-STACK WEB APPS',
    description: 'From architecture to deployment. React, Next.js, Node. We ship complete products, not partial commits.',
  },
  {
    number: '03',
    name: 'DATA PIPELINES',
    description: 'ETL, real-time processing, and analytics infrastructure. Systems that handle millions of events without breaking.',
  },
  {
    number: '04',
    name: 'TECHNICAL OPERATIONS',
    description: 'DevOps, monitoring, and system reliability engineering. We keep things running when it matters.',
  },
]

export default function Capabilities() {
  return (
    <section className="section-editorial" style={{ padding: '0', background: '#F5F0E8' }}>
      <div style={{ borderTop: '4px solid #0A0A0A', padding: '1.5rem 0 0', background: '#F5F0E8' }}>
        <div className="page">
          
          <span style={{
            display: 'inline-block',
            border: '2px solid #C41E1E',
            color: '#C41E1E',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
            padding: '0.2rem 0.6rem',
            fontWeight: 600,
            marginBottom: '1rem',
          }}>CAPABILITIES</span>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0' }}>
            {SERVICES.map((service, index) => (
              <div
                key={service.number}
                style={{
                  borderTop: '2px solid #0A0A0A',
                  padding: '1.2rem 1.5rem',
                  borderRight: index % 2 === 0 ? '2px solid #0A0A0A' : 'none',
                }}
              >
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(5rem, 14vw, 10rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: '#C41E1E',
                  lineHeight: 0.85,
                  letterSpacing: '-0.04em',
                  marginBottom: '0.5rem',
                  userSelect: 'none',
                }}>
                  {service.number}
                </span>

                <h3 style={{
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  fontWeight: 400,
                  fontFamily: 'var(--font-display)',
                  color: '#0A0A0A',
                  letterSpacing: '0.02em',
                  lineHeight: 0.9,
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}>
                  {service.name}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: '#3D3D3D',
                  lineHeight: 1.5,
                  maxWidth: '32ch',
                }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '2px solid #0A0A0A', paddingBottom: '2rem' }} />
        </div>
      </div>
    </section>
  )
}
