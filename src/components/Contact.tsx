import { COLORS, TYPOGRAPHY, SPACING, SECTION_FLAG, SECTION_BASE, STAR_BG } from '@/styles/section-constants'

export default function Contact() {
  return (
    <section style={{
      ...SECTION_BASE,
      background: COLORS.navy,
      backgroundImage: STAR_BG,
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem',
      alignContent: 'center',
    }}>
      <div>
        <span style={{
          ...SECTION_FLAG,
        }}>OPEN CHANNEL</span>

         <h2 style={{
           fontFamily: 'var(--font-display)',
           fontSize: TYPOGRAPHY.display.size,
           lineHeight: TYPOGRAPHY.lineHeightTight,
           letterSpacing: '-0.02em',
           textTransform: 'uppercase',
           margin: '0 0 1.5rem',
         }}>READY TO<br/>LAUNCH?</h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: TYPOGRAPHY.body,
          lineHeight: TYPOGRAPHY.lineHeightBody,
          maxWidth: '35ch',
          color: COLORS.whiteDim,
          marginBottom: '2rem',
        }}>We take on 2–3 new missions per quarter. If you have a project that needs serious engineering, open a channel.</p>

        <a
          href="mailto:hello@launchcontrollabs.com"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: TYPOGRAPHY.label,
            letterSpacing: TYPOGRAPHY.letterSpacingLabel,
            color: COLORS.white,
            textDecoration: 'none',
            border: '2px solid ' + COLORS.cyan,
            padding: '0.75rem 2rem',
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
          ['6', 'MISSIONS\nFEATURED'],
          ['✓', 'ON-TIME\nDELIVERY'],
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
