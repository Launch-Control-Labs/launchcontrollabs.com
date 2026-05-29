'use client'

import { useSceneStore } from '@/store/scene-store'
import { getBeatOpacity } from '@/config/beat-config'

export function BeatPreLaunch() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const opacity = getBeatOpacity('launch', scrollProgress)
  
  if (opacity === 0) return null
  
  return (
    <div
      data-beat="1"
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transition: 'opacity 0.1s',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background: 'linear-gradient(to top, rgba(2, 9, 20, 0.65) 0%, rgba(2, 9, 20, 0.3) 35%, transparent 60%)',
      }}
    >
      <div style={{ padding: '0 clamp(1.5rem, 3vw, 3rem)', paddingBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.3rem',
            paddingLeft: '0.1em',
            paddingRight: '0.1em',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6rem, 1vw, 0.85rem)',
              letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
            }}
          >
            Product Studio · Dallas, TX
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6rem, 1vw, 0.85rem)',
              letterSpacing: '0.25em',
              color: 'rgba(34,211,238,0.6)',
              textTransform: 'uppercase',
            }}
          >
            Est. 2021
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '13.5vw',
            lineHeight: 0.82,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            margin: 0,
            opacity: 0.95,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 30px rgba(0,0,0,0.7)',
          }}
        >
          LAUNCH CONTROL
        </h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'flex-end',
            marginTop: '-0.06em',
            width: '100%',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6rem, 1.1vw, 1rem)',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              margin: 0,
              maxWidth: '28ch',
              lineHeight: 1.4,
            }}
          >
            From idea to shipped product. No guessing.
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13.5vw',
              lineHeight: 0.82,
              letterSpacing: '-0.01em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              margin: 0,
              opacity: 0.95,
              textShadow: '0 2px 30px rgba(0,0,0,0.7), 0 0 60px rgba(34, 211, 238, 0.25)',
            }}
          >
            LABS
          </h2>
        </div>
      </div>
    </div>
  )
}
