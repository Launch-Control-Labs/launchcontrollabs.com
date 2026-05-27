export default function Awards() {
  const awards = [
    { org: 'Webby Awards', achievement: 'Winner', year: '2023' },
    { org: 'TWIF', achievement: 'Best New Startup', year: '2024' },
    { org: 'Product Hunt', achievement: 'Product of the Week', year: '2024' },
    { org: 'Awwwards', achievement: 'Featured', year: '2024' },
  ]

  return (
    <section>
      <div className="page">
        <p className="section-label">RECOGNITION</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)',
          textAlign: 'center' as const,
        }}>
          {awards.map((award) => (
            <div key={award.org}>
              <p style={{
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                marginBottom: 'var(--space-2)',
              }}>{award.org}</p>
              <p style={{
                fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: 'var(--text)',
                letterSpacing: '-0.01em',
                marginBottom: 'var(--space-1)',
              }}>{award.achievement}</p>
              <p style={{
                fontSize: '0.55rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}>{award.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
