export default function Awards() {
  const awards = [
    { org: 'Webby Awards', achievement: 'WINNER', year: '2023' },
    { org: 'TWIF', achievement: 'BEST NEW STARTUP', year: '2024' },
    { org: 'Product Hunt', achievement: 'PRODUCT OF THE WEEK', year: '2024' },
    { org: 'Awwwards', achievement: 'FEATURED', year: '2024' },
  ]

  return (
    <section className="section-editorial" style={{ padding: 0, background: '#F5F0E8' }}>
      <div style={{ borderTop: '4px solid #0A0A0A', padding: '1.5rem 0 2rem', background: '#F5F0E8' }}>
        <div className="page">
          <span style={{
            display: 'inline-block',
            border: '2px solid #C41E1E',
            color: '#C41E1E',
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
            padding: '0.25rem 0.7rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}>RECOGNITION</span>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
          }}>
            {awards.map((award, i) => (
              <div key={award.org} style={{
                border: '2px solid #0A0A0A',
                borderLeft: i === 0 ? '2px solid #0A0A0A' : 'none',
                padding: '1.5rem 1.2rem',
                textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                  color: '#0A0A0A',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                }}>{award.achievement}</p>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  color: '#3D3D3D',
                  marginBottom: '0.4rem',
                }}>{award.org}</p>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.1em',
                  color: '#888888',
                }}>{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
