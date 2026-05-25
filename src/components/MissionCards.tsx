const missions = [
  {
    id: 'MSN-002',
    title: 'E-Commerce Platform',
    client: 'GrocerKey / Wynshop',
    description:
      "Modern e-commerce infrastructure for grocery. Powers Woodman's and regional chains. Zero-downtime migration from legacy systems.",
    metric: 'Zero-downtime migration',
  },
  {
    id: 'MSN-003',
    title: 'Enterprise Integration Platform',
    client: 'Confidential',
    description:
      'Connected 14 siloed systems into unified data pipeline. Processing 2M+ events/day.',
    metric: '2M+ events/day',
  },
]

export default function MissionCards() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="page">
        <p className="section-label">MORE MISSIONS</p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          {missions.map((m) => (
            <div
              key={m.id}
              style={{
                border: '1px solid var(--border)',
                padding: 'var(--space-5)',
                background: 'var(--surface)',
                maxWidth: '680px',
              }}
            >
              {/* Top row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                <span
                  style={{
                    fontSize: '0.5rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}
                >
                  {m.id}
                </span>
                <h3
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--text)',
                  }}
                >
                  {m.title}
                </h3>
                <span
                  style={{
                    fontSize: '0.6rem',
                    color: 'var(--text-dim)',
                    marginLeft: 'auto',
                  }}
                >
                  {m.client}
                </span>
              </div>

              {/* Description */}
              <p
                className="font-body"
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-dim)',
                  lineHeight: 1.6,
                  marginBottom: 'var(--space-3)',
                }}
              >
                {m.description}
              </p>

              {/* Metric tag */}
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--amber)',
                  border: '1px solid var(--amber-dim)',
                  padding: '0.2rem 0.5rem',
                  background: 'var(--amber-dim)',
                }}
              >
                {m.metric}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
