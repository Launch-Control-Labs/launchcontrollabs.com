export default function TeamPedigree() {
  const companies = ['LinkedIn', 'Pluralsight', 'PWC', 'Expedia', 'Digital Tutors']

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
          }}>PREVIOUSLY AT</span>

          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 1.1,
            color: '#0A0A0A',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            marginBottom: '1rem',
          }}>
            {companies.join(' · ')}
          </p>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            color: '#888888',
            textTransform: 'uppercase',
          }}>Where our team shipped before Launch Control</p>
        </div>
      </div>
    </section>
  )
}
