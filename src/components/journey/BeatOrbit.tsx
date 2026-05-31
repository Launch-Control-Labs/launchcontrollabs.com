'use client'

import { useSceneStore } from '@/store/scene-store'
import { getBeatOpacity } from '@/config/beat-config'
import { useIsMobile } from '@/hooks/useIsMobile'

const STATS = [
  { stat: '12', label: 'PRODUCTS SHIPPED' },
  { stat: '6', label: 'FEATURED' },
  { stat: '99.9%', label: 'UPTIME' },
  { stat: '<48h', label: 'RESPONSE TIME' },
]

function StatCard({ stat, label, isMobile }: { stat: string; label: string; isMobile: boolean }) {
  return (
    <div
      style={{
        border: '1px solid #22D3EE',
        background: 'rgba(10, 10, 15, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: isMobile ? '1rem 0.5rem' : '2rem 2.5rem',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 'clamp(2rem, 5vw, 4.5rem)' : 'clamp(3rem, 6vw, 6rem)',
          display: 'block',
          lineHeight: 1,
          color: '#22D3EE',
          letterSpacing: '-0.02em',
        }}
      >
        {stat}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: isMobile ? '0.55rem' : '0.75rem',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.6)',
          textTransform: 'uppercase',
          display: 'block',
          marginTop: '0.5rem',
          lineHeight: 1.2,
        }}
      >
        {label}
      </span>
    </div>
  )
}

export function BeatOrbit() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const opacity = getBeatOpacity('spaceCruise', scrollProgress)
  const isMobile = useIsMobile()
  
  if (opacity === 0) return null
  
  return (
    <div
      data-beat="3"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        opacity,
        transition: 'opacity 0.1s',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '1rem' : 'clamp(2rem, 5vw, 4rem)',
        background: isMobile
          ? 'linear-gradient(to top, rgba(2, 9, 20, 0.95) 0%, rgba(2, 9, 20, 0.85) 60%, rgba(2, 9, 20, 0.4) 100%)'
          : undefined,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: isMobile ? '4.5rem' : 'clamp(3rem, 4vw, 4rem)',
          left: isMobile ? '1rem' : 'clamp(1.5rem, 4vw, 3rem)',
          display: 'inline-block',
          border: '1px solid #22D3EE',
          padding: '0.2rem 0.6rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.55rem, 0.9vw, 0.85rem)',
          letterSpacing: '0.2em',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#22D3EE',
          background: 'rgba(10, 10, 15, 0.8)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      >
        THE GUIDE
      </span>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 'clamp(2.5rem, 8vw, 5rem)' : 'clamp(3rem, 8vw, 8rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          margin: 0,
          textAlign: 'center',
          marginBottom: '0.5rem',
          textShadow: '0 2px 20px rgba(0,0,0,0.8)',
        }}
      >
        MISSION CAPABLE
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: isMobile ? 'clamp(0.7rem, 1.5vw, 1rem)' : 'clamp(0.9rem, 1.5vw, 1.2rem)',
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textAlign: 'center',
          maxWidth: '40ch',
          margin: isMobile ? '0 auto 1.5rem' : '0 auto 3rem',
          lineHeight: 1.4,
        }}
      >
        Systems engineered for production. Numbers that prove it.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? 'repeat(2, minmax(130px, 1fr))' 
            : 'repeat(2, minmax(200px, 280px))',
          gap: isMobile ? '0.5rem' : '1.5rem',
          justifyContent: 'center',
          marginTop: isMobile ? '1rem' : '3rem',
          width: isMobile ? '100%' : 'auto',
          maxWidth: isMobile ? '340px' : 'none',
        }}
      >
        {STATS.map((item) => (
          <StatCard key={item.label} stat={item.stat} label={item.label} isMobile={isMobile} />
        ))}
      </div>
    </div>
  )
}
