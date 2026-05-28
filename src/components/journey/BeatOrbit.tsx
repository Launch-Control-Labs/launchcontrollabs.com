'use client'

import { useSceneStore } from '@/store/scene-store'
import { getBeatOpacity } from '@/config/beat-config'

const STATS = [
  { stat: '12', label: 'SHIPPED' },
  { stat: '47', label: 'LAUNCHED' },
  { stat: '3.2B', label: 'EVENTS/DAY' },
  { stat: '99.97%', label: 'UPTIME' },
]

function StatCard({ stat, label }: { stat: string; label: string }) {
  return (
    <div
      style={{
        border: '1px solid #22D3EE',
        background: 'rgba(10, 10, 15, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '2rem 2.5rem',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 6vw, 6rem)',
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
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.6)',
          textTransform: 'uppercase',
          display: 'block',
          marginTop: '0.5rem',
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
        padding: 'clamp(2rem, 5vw, 4rem)',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 'clamp(1.5rem, 3vw, 2.5rem)',
          left: 'clamp(1.5rem, 4vw, 3rem)',
          display: 'inline-block',
        border: '1px solid #22D3EE',
          padding: '0.3rem 0.8rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
          letterSpacing: '0.25em',
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
          fontSize: 'clamp(3rem, 8vw, 8rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          margin: 0,
          textAlign: 'center',
          marginBottom: '1rem',
          textShadow: '0 2px 20px rgba(0,0,0,0.8)',
        }}
      >
        MISSION CAPABLE
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textAlign: 'center',
          maxWidth: '50ch',
          margin: '0 auto 3rem',
          lineHeight: 1.6,
        }}
      >
        Systems engineered for production. Numbers that prove it.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(200px, 280px))',
          gap: '1.5rem',
          justifyContent: 'center',
          marginTop: '3rem',
        }}
      >
        {STATS.map((item) => (
          <StatCard key={item.label} stat={item.stat} label={item.label} />
        ))}
      </div>
    </div>
  )
}
