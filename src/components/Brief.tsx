'use client'

export default function Brief() {
  return (
    <section>
      <div className="page">
        <p className="section-label">START HERE</p>

        <h2
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 500,
            color: 'var(--text)',
            marginBottom: 'var(--space-4)',
            lineHeight: 1.3,
          }}
        >
          Ready to launch?
        </h2>

        <p
          className="font-body"
          style={{
            fontSize: '1rem',
            color: 'var(--text-dim)',
            lineHeight: 1.65,
            marginBottom: 'var(--space-6)',
            maxWidth: '480px',
          }}
        >
          New product, AI system, or platform rescue — we deploy within 48
          hours.
        </p>

        {/* Primary CTA */}
        <a
          href="https://calendly.com/launchcontrollabs"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: 'var(--amber)',
            color: 'var(--bg)',
            padding: '0.75rem 1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-4)',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.85')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')
          }
        >
          Book a Mission Brief →
        </a>

        {/* Secondary */}
        <p
          style={{
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            marginBottom: 'var(--space-5)',
          }}
        >
          or email{' '}
          <a
            href="mailto:projects@launchcontrollabs.com"
            style={{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }}
          >
            projects@launchcontrollabs.com
          </a>
        </p>

        {/* Response time indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'var(--green)',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Average response: &lt; 4 hours
          </span>
        </div>
      </div>
    </section>
  )
}
