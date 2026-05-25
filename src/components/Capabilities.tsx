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
          {capabilities.map((cap) => (
            <div
              key={cap.number}
              style={{
                display: 'grid',
                gridTemplateColumns: '3.5rem 1fr',
                gap: 'var(--space-4)',
                alignItems: 'start',
                padding: 'var(--space-6) 0',
                borderTop: '1px solid var(--border)',
                maxWidth: '640px',
              }}
            >
              {/* Number — large and amber */}
              <span
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 300,
                  color: 'var(--amber)',
                  lineHeight: 1,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '-0.02em',
                }}
              >
                {cap.number}
              </span>

              {/* Content */}
              <div>
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--text)',
                    marginBottom: 'var(--space-2)',
                    letterSpacing: '-0.02em',
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
                    lineHeight: 1.65,
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
