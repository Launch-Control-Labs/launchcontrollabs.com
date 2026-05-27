export default function TeamPedigree() {
  const companies = ['LINKEDIN', 'PLURALSIGHT', 'PWC', 'EXPEDIA', 'DIGITAL TUTORS']

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
      }}>STYLE REPORT</span>

      <div>
        {companies.map((company, i) => (
          <h3 key={company} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 9vw, 7rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.01em',
            color: '#0A0A0A',
            margin: 0,
            borderBottom: i < companies.length - 1 ? '3px solid rgba(0,0,0,0.1)' : 'none',
            paddingBottom: '0.5rem',
            paddingTop: '0.5rem',
          }}>{company}</h3>
        ))}
      </div>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.45rem',
        letterSpacing: '0.15em',
        color: '#888',
        textTransform: 'uppercase' as const,
        marginTop: '1.5rem',
      }}>Where our team shipped before Launch Control Labs</p>
    </section>
  )
}
