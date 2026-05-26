export function StaticHeroFallback() {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      background: '#060E1C',
      overflow: 'hidden',
    }}>
      <img
        src="/images/hero-static.webp"
        alt="LCL Control Room"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.85,
        }}
      />
      {/* Subtle amber pulse overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(229,168,50,0.05) 0%, transparent 70%)',
        animation: 'ambientPulse 4s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
