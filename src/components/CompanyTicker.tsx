export default function CompanyTicker() {
  return (
    <section style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className="page">
        <div
          style={{
            borderBottom: '1px solid var(--border)',
            padding: 'var(--space-4) 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Shipped for
          </span>
          <span
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
              color: 'var(--text-dim)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Option One · Sky Boss · NPS.today · Talisman · Helios
          </span>
        </div>
      </div>
    </section>
  )
}
