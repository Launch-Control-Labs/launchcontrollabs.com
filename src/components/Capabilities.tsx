export default function Capabilities() {
  return (
    <section>
      {/* Full-bleed YELLOW section — like ESPN "HAZARD PLAY" */}
      <div style={{
        background: '#F5C518',
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 3rem)',
        color: '#0A0A0A',
      }}>
        <span style={{
          display: 'inline-block',
          border: '2px solid #0A0A0A',
          padding: '0.2rem 0.6rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.25em',
          fontWeight: 700,
          marginBottom: '0.5rem',
        }}>STAT FACTORY</span>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 18vw, 14rem)',
          lineHeight: 0.82,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          margin: 0,
        }}>WHAT WE BUILD</h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          maxWidth: '50ch',
          lineHeight: 1.5,
          margin: '1rem 0 1.5rem',
        }}>From AI agents to real-time platforms. We took a leap and ran the numbers to find out what actually ships.</p>

        {/* 2x2 dense grid with borders */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '3px solid #0A0A0A' }}>
          {[
            { num: '01', name: 'AI-POWERED PRODUCTS', desc: 'LLMs, agents, and automation systems built for production. Not prototypes—deployed systems.', pct: 85 },
            { num: '02', name: 'FULL-STACK WEB APPS', desc: 'From architecture to deployment. React, Next.js, Node. Complete products, not partial commits.', pct: 72 },
            { num: '03', name: 'DATA PIPELINES', desc: 'ETL, real-time processing, analytics. Systems that handle millions of events without breaking.', pct: 60 },
            { num: '04', name: 'TECHNICAL OPERATIONS', desc: 'DevOps, monitoring, reliability engineering. We keep things running when it matters.', pct: 90 },
          ].map((s, i) => (
            <div key={s.num} style={{
              padding: '1.2rem',
              borderTop: i >= 2 ? '3px solid #0A0A0A' : 'none',
              borderLeft: i % 2 === 1 ? '3px solid #0A0A0A' : 'none',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 0.8, display: 'block' }}>{s.num}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', lineHeight: 0.9, margin: '0.2rem 0 0.4rem', textTransform: 'uppercase' }}>{s.name}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#333', lineHeight: 1.4, marginBottom: '0.6rem' }}>{s.desc}</p>
              {/* CSS bar chart */}
              <div style={{ display: 'flex', height: 6, width: '100%' }}>
                <div style={{ width: `${s.pct}%`, background: '#0A0A0A' }} />
                <div style={{ width: `${100 - s.pct}%`, background: 'rgba(0,0,0,0.12)' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', letterSpacing: '0.1em', marginTop: '0.2rem', display: 'block' }}>{s.pct}% OF PROJECTS</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
