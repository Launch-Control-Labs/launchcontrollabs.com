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
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            marginBottom: 'var(--space-4)',
          }}
        >
          $ status --systems
        </p>

        {/* Hook */}
        <h1
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
            fontWeight: 500,
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            maxWidth: '680px',
            marginBottom: 'var(--space-7)',
          }}
        >
          We built something that didn't exist 14 weeks ago.
        </h1>

        {/* Meta line */}
        <p
          className="text-dim"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Est. 2021 · Los Angeles, CA ·{' '}
          <a
            href="mailto:projects@launchcontrollabs.com"
            style={{ color: 'var(--amber)' }}
          >
            projects@launchcontrollabs.com →
          </a>
        </p>
      </div>
    </section>
  )
}
