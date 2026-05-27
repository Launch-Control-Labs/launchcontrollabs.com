'use client'

export default function CompanyTicker() {
  const companies = [
    'MICROSOFT', 'GOOGLE', 'AMAZON', 'STRIPE', 'VERCEL',
    'OPENAI', 'ANTHROPIC', 'FIGMA', 'LINEAR', 'NOTION',
    'SHOPIFY', 'TWILIO', 'DATADOG', 'SNOWFLAKE', 'PALANTIR',
  ]

  const items = [...companies, ...companies]

  return (
    <div style={{
      background: '#020914',
      borderTop: '1px solid rgba(34,211,238,0.3)',
      borderBottom: '1px solid rgba(34,211,238,0.3)',
      overflow: 'hidden',
      padding: '0.75rem 0',
      position: 'relative',
    }}>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 30s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="ticker-track">
        {items.map((name, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.55rem, 0.8vw, 0.75rem)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            padding: '0 2.5rem',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2.5rem',
          }}>
            {name}
            <span style={{ color: 'rgba(34,211,238,0.4)', fontSize: '0.4rem' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
