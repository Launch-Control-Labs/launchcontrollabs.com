export default function Contact() {
  return (
    <section style={{
      background: '#0A0A0A',
      color: '#FFFFFF',
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
      position: 'relative',
      gap: '3rem',
      alignContent: 'center',
    }}>
      <div>
        <span style={{
          display: 'inline-block',
          border: '2px solid rgba(255,255,255,0.3)',
          padding: '0.25rem 0.7rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: 'rgba(255,255,255,0.5)',
        }}>OPEN CHANNEL</span>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 12vw, 10rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          margin: '0 0 1.5rem',
        }}>READY TO<br/>LAUNCH?</h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          maxWidth: '35ch',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: '2rem',
        }}>We take on 2–3 new missions per quarter. If you have a project that needs serious engineering, open a channel.</p>

        <a
          href="mailto:hello@launchcontrollabs.com"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: '#FFFFFF',
            textDecoration: 'none',
            border: '2px solid #FFFFFF',
            padding: '0.8rem 1.5rem',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >HELLO@LAUNCHCONTROLLABS.COM</a>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2px',
        alignSelf: 'center',
      }}>
        {[
          ['47', 'MISSIONS\nCOMPLETED'],
          ['98.7%', 'ON-TIME\nDELIVERY'],
          ['2–3', 'NEW PER\nQUARTER'],
          ['<48h', 'RESPONSE\nTIME'],
        ].map(([value, label]) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: 'clamp(1rem, 3vw, 2rem)',
            textAlign: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              display: 'block',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>{value}</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.4rem',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.4)',
              whiteSpace: 'pre-line',
            }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute',
        bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
        left: 'clamp(1.5rem, 4vw, 3rem)',
        right: 'clamp(1.5rem, 4vw, 3rem)',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.45rem',
        letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.3)',
        textTransform: 'uppercase',
      }}>
        <span>&copy; 2026 LAUNCH CONTROL LABS</span>
        <span>LOS ANGELES, CA</span>
      </div>
    </section>
  )
}
