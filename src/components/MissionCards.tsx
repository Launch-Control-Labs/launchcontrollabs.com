const missions = [
  {
    id: 'MSN-002',
    title: 'E-Commerce Infrastructure — GrocerKey/Wynshop',
    description:
      'Modern e-commerce platform for grocery retailers. Powers Woodman\'s and regional chains. Zero-downtime migration from legacy systems.',
    tag: 'GROCERY · E-COMMERCE',
  },
  {
    id: 'MSN-003',
    title: 'AI Medication Safety Platform — HomeMeds',
    description:
      'AI-enhanced platform reducing medication errors for older adults. Camera-based label recognition, automated safety alerts. 80+ program sites across 19 states.',
    tag: 'HEALTHCARE · AI',
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
                borderLeft: '3px solid var(--amber)',
                padding: 'var(--space-5)',
                background: 'var(--surface)',
                maxWidth: '680px',
              }}
            >
              {/* Mission ID */}
              <span
                style={{
                  display: 'block',
                  fontSize: '0.55rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--amber)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {m.id}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  marginBottom: 'var(--space-3)',
                  letterSpacing: '-0.02em',
                }}
              >
                {m.title}
              </h3>

              {/* Description */}
              <p
                className="font-body"
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-dim)',
                  lineHeight: 1.65,
                  marginBottom: 'var(--space-4)',
                }}
              >
                {m.description}
              </p>

              {/* Metric tag pill */}
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                  border: '1px solid var(--border)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '2px',
                }}
              >
                {m.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
