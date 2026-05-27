export default function Contact() {
  return (
    <section style={{
      background: '#0A0A0A',
      color: '#FFFFFF',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
      position: 'relative',
    }}>
      <span style={{
        display: 'inline-block',
        border: '2px solid rgba(255,255,255,0.3)',
        padding: '0.25rem 0.7rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        letterSpacing: '0.25em',
        fontWeight: 700,
        marginBottom: '2rem',
        color: 'rgba(255,255,255,0.5)',
        alignSelf: 'flex-start',
      }}>OPEN CHANNEL</span>

      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(5rem, 16vw, 13rem)',
        lineHeight: 0.85,
        letterSpacing: '-0.02em',
        textTransform: 'uppercase',
        margin: '0 0 2rem',
      }}>READY TO<br/>LAUNCH?</h2>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        lineHeight: 1.6,
        maxWidth: '40ch',
        color: 'rgba(255,255,255,0.6)',
        marginBottom: '2.5rem',
      }}>We take on 2–3 new missions per quarter. If you have a project that needs serious engineering, open a channel.</p>

      <a
        href="mailto:hello@launchcontrollabs.com"
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          color: '#FFFFFF',
          textDecoration: 'none',
          border: '2px solid #FFFFFF',
          padding: '0.8rem 2rem',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}
      >HELLO@LAUNCHCONTROLLABS.COM</a>

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
