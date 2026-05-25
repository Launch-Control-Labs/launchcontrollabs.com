export default function CompanyTicker() {
  return (
    <section style={{ paddingTop: 0, paddingBottom: 'var(--space-6)' }}>
      <div className="page">
        <div
          style={{
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            padding: 'var(--space-6) 0',
          }}
        >
          <p
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.06em',
              color: 'var(--text-dim)',
            }}
          >
            Team from:{' '}
            <span style={{ color: 'var(--text-dim)' }}>
              LinkedIn · Pluralsight · PWC · Expedia · Digital Tutors
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
