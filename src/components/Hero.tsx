'use client'

export default function Hero() {
  return (
    <section
      style={{
        paddingTop: 'calc(var(--space-9) + 2.5rem)',
        paddingBottom: 'var(--space-9)',
      }}
    >
      <div className="page">
        {/* Terminal prompt line */}
        <p
          className="text-muted"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.05em',
            marginBottom: 'var(--space-4)',
            opacity: 0.7,
          }}
        >
          $ status --systems
        </p>

        {/* Hook */}
        <h1
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            color: 'var(--text)',
            maxWidth: '700px',
            marginBottom: 'var(--space-7)',
          }}
        >
          We build products that didn&apos;t exist yesterday. We fix the ones that stopped working today.
        </h1>

        {/* Meta line */}
        <p
          className="text-dim"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-5)',
          }}
        >
          Est. 2021 · Los Angeles, CA ·{' '}
          <a
            href="mailto:projects@launchcontrollabs.com"
            style={{
              color: 'var(--amber)',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'var(--amber)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent')
            }
          >
            projects@launchcontrollabs.com →
          </a>
        </p>

        {/* Separator */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            width: '100%',
            maxWidth: '700px',
          }}
        />
      </div>
    </section>
  )
}
