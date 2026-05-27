'use client'

export function HeroOverlay() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
      <div style={{
        padding: '0',
        paddingBottom: 'clamp(0.5rem, 1.5vh, 1.2rem)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '0.3rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.75rem, 1.2vw, 1.1rem)',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
          }}>Product Studio · Dallas · Barcelona · Miami</span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.75rem, 1.2vw, 1.1rem)',
            letterSpacing: '0.2em',
            color: 'rgba(34,211,238,0.5)',
            textTransform: 'uppercase',
          }}>Est. 2021</span>
        </div>

        <div style={{ position: 'relative' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4.5rem, 16vw, 20rem)',
            lineHeight: 0.82,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            margin: 0,
            opacity: 0.95,
            whiteSpace: 'nowrap',
          }}>
            LAUNCH CONTROL
          </h1>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginTop: '-0.06em',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1rem, 1.8vw, 1.6rem)',
              letterSpacing: '0.12em',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              margin: 0,
              maxWidth: '28ch',
              lineHeight: 1.4,
            }}>From idea to shipped product. No guessing.</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4.5rem, 16vw, 20rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.01em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              margin: 0,
              opacity: 0.95,
              textShadow: '0 0 60px rgba(34, 211, 238, 0.25)',
            }}>LABS</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
