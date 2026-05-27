export default function Capabilities() {
  return (
    <section style={{ margin: 0, padding: 0, background: '#F5C518' }}>
      <div style={{
        background: '#F5C518',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
        color: '#0A0A0A',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
      }}>
        <span style={{
          display: 'inline-block',
          border: '2px solid #0A0A0A',
          padding: '0.25rem 0.7rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          fontWeight: 700,
          marginBottom: '1.5rem',
          alignSelf: 'flex-start',
        }}>STAT FACTORY</span>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 18vw, 14rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase' as const,
          margin: 0,
        }}>WHAT WE BUILD</h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          maxWidth: '50ch',
          lineHeight: 1.5,
          margin: '1.5rem 0 1.5rem',
        }}>From AI agents to real-time platforms. We took a leap and ran the numbers to find out what actually ships.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '3px solid #0A0A0A' }}>
          {[
            { num: '01', name: 'AI-POWERED PRODUCTS', desc: 'LLMs, agents, and automation systems built for production. Not prototypes—deployed systems.', pct: 85 },
            { num: '02', name: 'FULL-STACK WEB APPS', desc: 'From architecture to deployment. React, Next.js, Node. Complete products, not partial commits.', pct: 72 },
            { num: '03', name: 'DATA PIPELINES', desc: 'ETL, real-time processing, analytics. Systems that handle millions of events without breaking.', pct: 60 },
            { num: '04', name: 'TECHNICAL OPERATIONS', desc: 'DevOps, monitoring, reliability engineering. We keep things running when it matters.', pct: 90 },
          ].map((s, i) => (
            <div key={s.num} style={{
              padding: '1.5rem',
              borderTop: i >= 2 ? '3px solid #0A0A0A' : 'none',
              borderLeft: i % 2 === 1 ? '3px solid #0A0A0A' : 'none',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 9vw, 7rem)', lineHeight: 0.85, display: 'block' }}>{s.num}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 0.85, letterSpacing: '-0.02em', margin: '0.5rem 0 0.5rem', textTransform: 'uppercase' as const }}>{s.name}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#333', lineHeight: 1.4, marginBottom: '0.5rem' }}>{s.desc}</p>
              <div style={{ display: 'flex', height: 6, width: '100%' }}>
                <div style={{ width: `${s.pct}%`, background: '#0A0A0A' }} />
                <div style={{ width: `${100 - s.pct}%`, background: 'rgba(0,0,0,0.12)' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', letterSpacing: '0.2em', marginTop: '0.5rem', display: 'block' }}>{s.pct}% OF PROJECTS</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
