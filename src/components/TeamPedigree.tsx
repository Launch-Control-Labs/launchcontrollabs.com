export default function TeamPedigree() {
  const companies = ['LINKEDIN', 'PLURALSIGHT', 'PWC', 'EXPEDIA', 'DIGITAL TUTORS']

  return (
    <section style={{ background: '#F5F0E8', padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 4vw, 3rem)' }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: '#888',
        display: 'block',
        marginBottom: '0.5rem',
      }}>STYLE REPORT &middot; OUR TEAM SHIPPED AT</span>

      {/* Giant stacked company names — like ESPN "PERFECT FITS" */}
      <div>
        {companies.map((company) => (
          <h3 key={company} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 11vw, 8rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.01em',
            color: '#0A0A0A',
            margin: 0,
            borderBottom: '1px solid rgba(0,0,0,0.1)',
          }}>{company}</h3>
        ))}
      </div>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5rem',
        letterSpacing: '0.15em',
        color: '#888',
        textTransform: 'uppercase',
        marginTop: '1rem',
      }}>Where our team shipped before Launch Control Labs</p>
    </section>
  )
}
