export default function CompanyTicker() {
  return (
    <section style={{ paddingTop: 0, paddingBottom: 'var(--space-6)' }}>
      <div className="page">
        <p
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.06em',
            color: 'var(--text-muted)',
          }}
        >
          Team from:{' '}
          <span style={{ color: 'var(--text-dim)' }}>
            LinkedIn · Pluralsight · PWC · Expedia · Digital Tutors
          </span>
        </p>
      </div>
    </section>
  )
}
