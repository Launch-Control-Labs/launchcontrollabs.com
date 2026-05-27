export default function Awards() {
  return (
    <section style={{
      background: '#F5F0E8',
      padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
    }}>
      <span style={{
        display: 'inline-block',
        border: '2px solid #0A0A0A',
        padding: '0.25rem 0.7rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        letterSpacing: '0.25em',
        marginBottom: '1.5rem',
      }}>HONORS</span>

      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(3.5rem, 9vw, 7rem)',
        lineHeight: 0.85,
        letterSpacing: '-0.02em',
        textTransform: 'uppercase' as const,
        margin: '0 0 0.5rem',
        color: '#0A0A0A',
      }}>RECOGNITION</h2>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.45rem',
        letterSpacing: '0.15em',
        color: '#888',
        textTransform: 'uppercase' as const,
        marginBottom: '1.5rem',
      }}>Awards and features earned since launch</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '3px solid #0A0A0A' }}>
        {[
          { achievement: 'WINNER', org: 'Webby Awards', year: '2023' },
          { achievement: 'BEST NEW STARTUP', org: 'TWIF', year: '2024' },
          { achievement: 'PRODUCT OF THE WEEK', org: 'Product Hunt', year: '2024' },
          { achievement: 'FEATURED', org: 'Awwwards', year: '2024' },
        ].map((award, i) => (
          <div key={award.org} style={{
            background: '#0A0A0A',
            color: '#FFFFFF',
            padding: '1.5rem',
            textAlign: 'center' as const,
            display: 'flex',
            flexDirection: 'column' as const,
            justifyContent: 'center',
            minHeight: '140px',
            borderLeft: i > 0 ? '3px solid #F5F0E8' : 'none',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              display: 'block',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>{award.achievement}</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.45rem',
              letterSpacing: '0.15em',
              opacity: 0.7,
              display: 'block',
              marginBottom: '0.5rem',
            }}>{award.org}</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.45rem',
              letterSpacing: '0.15em',
              opacity: 0.4,
            }}>{award.year}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
