export default function Awards() {
  return (
    <section style={{ background: '#F5F0E8' }}>
      <div style={{ padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 4vw, 3rem)' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 14vw, 10rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          margin: '0 0 0.5rem',
          color: '#0A0A0A',
        }}>RECOGNITION</h2>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          color: '#888',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>Awards and features earned since launch</p>

        {/* BLACK stat boxes — like ESPN trophy cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px' }}>
          {[
            { achievement: 'WINNER', org: 'Webby Awards', year: '2023' },
            { achievement: 'BEST NEW STARTUP', org: 'TWIF', year: '2024' },
            { achievement: 'PRODUCT OF THE WEEK', org: 'Product Hunt', year: '2024' },
            { achievement: 'FEATURED', org: 'Awwwards', year: '2024' },
          ].map((award) => (
            <div key={award.org} style={{
              background: '#0A0A0A',
              color: '#FFFFFF',
              padding: 'clamp(1rem, 3vw, 2rem) clamp(0.8rem, 2vw, 1.5rem)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '140px',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                display: 'block',
                lineHeight: 1,
                marginBottom: '0.6rem',
              }}>{award.achievement}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.12em',
                opacity: 0.7,
                display: 'block',
                marginBottom: '0.3rem',
              }}>{award.org}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.45rem',
                letterSpacing: '0.1em',
                opacity: 0.4,
              }}>{award.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
