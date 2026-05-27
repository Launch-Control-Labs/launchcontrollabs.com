'use client'

export default function MissionCards() {
  return (
    <section id="projects">
      <div className="page">
        <p className="section-label">WORK</p>
        
        {/* TIER 1 — Featured, full width, huge typography */}
        <article style={{
          paddingBottom: 'clamp(3rem, 8vh, 5rem)',
          borderBottom: '1px solid var(--border)',
          marginBottom: 'clamp(2rem, 5vh, 3rem)',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: 'var(--space-3)' }}>
            <span style={{ fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>01</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px rgba(52, 211, 153, 0.4)' }}></span>
              ACTIVE
            </span>
          </div>
          <h3 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: 'var(--space-4)' }}>Talisman</h3>
          <p className="font-body" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: '600px', marginBottom: 'var(--space-5)' }}>
            AI-powered accounting automation for modern finance teams. Graph-native architecture processing millions of transactions.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {['Next.js', 'Neo4j', 'LLMs'].map(t => (
                <span key={t} style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', border: '1px solid var(--border)', padding: '0.25rem 0.6rem', fontFamily: 'var(--font-mono)' }}>{t}</span>
              ))}
            </div>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>2024</span>
          </div>
        </article>

        {/* TIER 2 — Two-up grid, medium */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)',
          paddingBottom: 'clamp(3rem, 8vh, 5rem)',
          borderBottom: '1px solid var(--border)',
          marginBottom: 'clamp(2rem, 5vh, 3rem)',
        }}>
          <article>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>02</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px rgba(52, 211, 153, 0.4)' }}></span>
                ACTIVE
              </span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 'var(--space-3)' }}>Helios</h3>
            <p className="font-body" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', color: 'var(--text-dim)', lineHeight: 1.65, marginBottom: 'var(--space-4)' }}>
              Autonomous AI agent runtime with multi-agent orchestration. Built for production workloads.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {['TypeScript', 'Memgraph', 'R3F'].map(t => (
                <span key={t} style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', border: '1px solid var(--border)', padding: '0.25rem 0.6rem', fontFamily: 'var(--font-mono)' }}>{t}</span>
              ))}
            </div>
          </article>

          <article>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>03</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent)' }}></span>
                DEPLOYED
              </span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 'var(--space-3)' }}>Launch Control Labs</h3>
            <p className="font-body" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', color: 'var(--text-dim)', lineHeight: 1.65, marginBottom: 'var(--space-4)' }}>
              This site. Built with basement.studio&apos;s baked-lighting approach. WebGL meets mission control.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {['Next.js', 'Three.js', 'GSAP'].map(t => (
                <span key={t} style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', border: '1px solid var(--border)', padding: '0.25rem 0.6rem', fontFamily: 'var(--font-mono)' }}>{t}</span>
              ))}
            </div>
          </article>
        </div>

        {/* TIER 3 — Client work, 3-up compact */}
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <p style={{ fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>CLIENT WORK</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
        }}>
          {[
            { num: '04', name: 'Option One', desc: 'Full-range plumbing services platform. CSR and field worker coordination.', stack: ['Next.js', 'Real-time', 'CRM'], year: '2025' },
            { num: '05', name: 'Sky Boss', desc: 'Aviation operations management. Fleet tracking, maintenance, crew coordination.', stack: ['React', 'Node.js', 'Real-time'], year: '2025' },
            { num: '06', name: 'NPS.today', desc: 'Net Promoter Score platform. Automated survey distribution and analytics.', stack: ['Next.js', 'Analytics'], year: '2024' },
          ].map(project => (
            <article key={project.num}>
              <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 'var(--space-2)' }}>{project.num}</span>
              <h4 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text)', letterSpacing: '-0.01em', marginBottom: 'var(--space-2)' }}>{project.name}</h4>
              <p className="font-body" style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 'var(--space-3)' }}>{project.desc}</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                {project.stack.map(t => (
                  <span key={t} style={{ fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{t}</span>
                ))}
                <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginLeft: 'auto' }}>{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
