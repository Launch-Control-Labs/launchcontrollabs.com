'use client'

export default function Brief() {
  return (
    <section style={{ position: 'relative' }}>
      <div className="page">
        <p className="section-label">START HERE</p>

        <h2
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 400,
            color: 'var(--text)',
            marginBottom: 'var(--space-4)',
            lineHeight: 1.25,
            letterSpacing: '-0.03em',
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

        {/* CTA with radial glow */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 'var(--space-4)' }}>
          {/* Radial glow pseudo */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--amber) 0%, transparent 70%)',
              opacity: 0.05,
              pointerEvents: 'none',
            }}
          />
          <a
            href="https://calendly.com/launchcontrollabs"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'relative',
              display: 'inline-block',
              background: 'var(--amber)',
              color: 'var(--bg)',
              padding: '1.2rem 3rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
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
        </div>

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
          <span className="status-dot" />
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
