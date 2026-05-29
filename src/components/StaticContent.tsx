'use client'

import { BeatPreLaunch } from './journey/BeatPreLaunch'
import { BeatServices } from './journey/BeatServices'
import { BeatAscent } from './journey/BeatAscent'
import { BeatOrbit } from './journey/BeatOrbit'
import { BeatConstellation } from './journey/BeatConstellation'
import { BeatAuthority } from './journey/BeatAuthority'
import { BeatCTA } from './journey/BeatCTA'
import { Logo } from './Logo'

/**
 * StaticContent: Renders all 6 beats stacked vertically without animation.
 * Used when prefers-reduced-motion is enabled.
 * All beats are visible simultaneously with opacity: 1.
 */
export function StaticContent() {
  return (
    <div
      style={{
        background: '#020914',
        color: '#FFFFFF',
        minHeight: '100vh',
      }}
    >
      {/* Beat 1: Pre-Launch */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div style={{ opacity: 1 }}>
          <BeatPreLaunch />
        </div>
      </section>

      {/* Beat 2: Services */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div style={{ opacity: 1, width: '100%' }}>
          <BeatServices />
        </div>
      </section>

      {/* Beat 3: Ascent */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(2rem, 4vw, 3rem)',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
        }}
      >
        <div style={{ opacity: 1 }}>
          <BeatAscent />
        </div>
      </section>

      {/* Beat 3: Orbit */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div style={{ opacity: 1, width: '100%' }}>
          <BeatOrbit />
        </div>
      </section>

      {/* Beat 4: Constellation */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div style={{ opacity: 1, width: '100%' }}>
          <BeatConstellation />
        </div>
      </section>

      {/* Beat 5: Authority */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div style={{ opacity: 1, width: '100%' }}>
          <BeatAuthority />
        </div>
      </section>

      {/* Beat 6: CTA */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div style={{ opacity: 1, width: '100%' }}>
          <BeatCTA />
        </div>
      </section>

      {/* Colophon */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'clamp(2rem, 4vw, 3rem)',
          opacity: 0.7,
        }}
      >
        <Logo size={140} />
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '0.15em',
            color: '#E5EBF2',
            marginTop: '1.5rem',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          LAUNCH CONTROL LABS
        </h2>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '0.5rem',
            textTransform: 'uppercase',
          }}
        >
          Dallas, TX &middot; Est. 2021
        </span>
      </section>
    </div>
  )
}
