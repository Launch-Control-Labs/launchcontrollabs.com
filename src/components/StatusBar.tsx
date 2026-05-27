'use client'

export default function StatusBar() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem clamp(1rem, 3vw, 2rem)',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.5rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.6)',
    }}>
      <span style={{ fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.3em' }}>LAUNCH CONTROL LABS</span>
      <span>LOS ANGELES · 2026</span>
    </header>
  )
}
