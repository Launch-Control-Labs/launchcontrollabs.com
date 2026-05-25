const capabilities = [
  {
    number: '01',
    title: 'New Products',
    subtitle: 'Zero to Shipped',
    description:
      'From validated idea to production in weeks, not quarters. We scope, build, and ship.',
  },
  {
    number: '02',
    title: 'AI Engineering',
    subtitle: null,
    description:
      'Custom models, fine-tuning, inference pipelines, and AI-native product features that actually work.',
  },
  {
    number: '03',
    title: 'Platform Rescue',
    subtitle: null,
    description:
      "Legacy systems replaced without downtime. We've migrated six-figure user bases with zero incidents.",
  },
  {
    number: '04',
    title: 'Scale Engineering',
    subtitle: null,
    description:
      'Architecture, data pipelines, and infrastructure that hold up at millions of events per day.',
  },
]

export default function Capabilities() {
  return (
    <section>
      <div className="page">
        <p className="section-label">CAPABILITIES</p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
          }}
        >
          {capabilities.map((cap, i) => (
            <div
              key={cap.number}
              style={{
                display: 'grid',
                gridTemplateColumns: '2rem 1fr',
                gap: 'var(--space-5)',
                alignItems: 'start',
                padding: 'var(--space-5) 0',
                borderTop:
                  i === 0 ? '1px solid var(--border)' : undefined,
                borderBottom: '1px solid var(--border-subtle)',
                maxWidth: '640px',
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                  paddingTop: '0.2rem',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {cap.number}
              </span>

              {/* Content */}
              <div>
                <p
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--text)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {cap.title}
                  {cap.subtitle && (
                    <span
                      style={{
                        color: 'var(--text-dim)',
                        fontWeight: 400,
                        marginLeft: '0.5rem',
                      }}
                    >
                      — {cap.subtitle}
                    </span>
                  )}
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-dim)',
                    lineHeight: 1.6,
                  }}
                >
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
