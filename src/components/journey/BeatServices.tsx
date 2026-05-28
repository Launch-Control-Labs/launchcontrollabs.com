'use client'

import { useSceneStore } from '@/store/scene-store'
import { getBeatOpacity } from '@/config/beat-config'

const SERVICES = [
  {
    num: '01',
    name: 'AI-POWERED PRODUCTS',
    desc: 'LLMs, agents, and automation systems built for production.',
    featured: true,
  },
  {
    num: '02',
    name: 'FULL-STACK WEB APPS',
    desc: 'Architecture to deployment. React, Next.js, Node. Complete products.',
    featured: false,
  },
  {
    num: '03',
    name: 'DATA PIPELINES',
    desc: 'ETL, real-time processing, and analytics at scale.',
    featured: false,
  },
  {
    num: '04',
    name: 'TECHNICAL OPERATIONS',
    desc: 'DevOps, monitoring, and reliability engineering.',
    featured: false,
  },
]

export function BeatServices() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const opacity = getBeatOpacity('services', scrollProgress)

  if (opacity === 0) return null

  const featuredService = SERVICES.find((s) => s.featured)
  const otherServices = SERVICES.filter((s) => !s.featured)

  return (
    <div
      data-beat="services"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        opacity,
        transition: 'opacity 0.1s',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        background: 'linear-gradient(to top, rgba(2, 9, 20, 0.88) 0%, rgba(2, 9, 20, 0.7) 50%, transparent 100%)',
        padding: 'clamp(1.5rem, 4vw, 3rem)',
      }}
    >
      {/* Section flag - ESPN Magazine style */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(1.5rem, 4vw, 2.5rem)',
          left: 'clamp(1.5rem, 4vw, 3rem)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: '#22D3EE',
            color: '#020914',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.55rem, 0.8vw, 0.7rem)',
            letterSpacing: '0.2em',
            fontWeight: 700,
            textTransform: 'uppercase',
            padding: '0.25rem 0.6rem',
          }}
        >
          CAPABILITIES
        </span>
      </div>

      {/* MASSIVE editorial headline - ESPN Magazine style */}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 6vw, 6rem)',
          lineHeight: 0.78,
          letterSpacing: '-0.04em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          margin: 'clamp(1.5rem, 4vw, 3rem) 0 clamp(0.4rem, 1vw, 0.75rem)',
          textShadow: '0 4px 40px rgba(0,0,0,0.6)',
          maxWidth: '85vw',
        }}
      >
        WHAT WE<br />
        <span style={{ color: '#22D3EE' }}>BUILD</span>
      </h2>

      {/* Deck/lead paragraph - editorial context */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          maxWidth: '50ch',
          margin: '0 0 clamp(1rem, 2vw, 2rem)',
          lineHeight: 1.6,
        }}
      >
        From idea to shipped product. Every engagement is full-stack, production-grade, and built to last.
      </p>

      {/* Asymmetric editorial grid - ESPN Magazine spread style */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'auto auto',
          gap: '1px',
          maxWidth: '1100px',
          background: 'rgba(34,211,238,0.25)',
        }}
      >
        {/* Featured service - takes more space */}
        <div
          style={{
            gridColumn: '1',
            gridRow: '1 / 3',
            background: 'rgba(2, 9, 20, 0.82)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 'clamp(200px, 28vh, 320px)',
            borderLeft: '4px solid #22D3EE',
          }}
        >
          {/* Oversized number anchor - ESPN jersey number style */}
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(5rem, 10vw, 9rem)',
              color: 'rgba(34,211,238,0.15)',
              lineHeight: 0.8,
              letterSpacing: '-0.05em',
            }}
          >
            {featuredService?.num}
          </span>

          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                lineHeight: 1,
                margin: '0 0 0.75rem',
                letterSpacing: '-0.02em',
              }}
            >
              {featuredService?.name}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.5,
                margin: 0,
                maxWidth: '28ch',
              }}
            >
              {featuredService?.desc}
            </p>
          </div>
        </div>

        {/* Other services - compressed, stacked */}
        {otherServices.map((service, index) => (
          <div
            key={service.num}
            style={{
              background: 'rgba(2, 9, 20, 0.78)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: 'clamp(1rem, 2vw, 1.5rem)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              borderBottom: index < otherServices.length - 1 ? '1px solid rgba(34,211,238,0.15)' : 'none',
            }}
          >
            {/* Number as visual rhythm element */}
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: 'rgba(34,211,238,0.35)',
                lineHeight: 0.9,
                flexShrink: 0,
              }}
            >
              {service.num}
            </span>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.25rem)',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  margin: '0 0 0.35rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {service.name}
              </h3>
              <p
                style={{
                  fontSize: 'clamp(0.75rem, 1vw, 0.85rem)',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom annotation bar - ESPN metadata style */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(1rem, 3vw, 2rem)',
          left: 'clamp(1.5rem, 4vw, 3rem)',
          right: 'clamp(1.5rem, 4vw, 3rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(34,211,238,0.2)',
          paddingTop: 'clamp(0.75rem, 2vw, 1rem)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.5rem, 0.7vw, 0.6rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          Launch Control Labs · Product Studio
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.5rem, 0.7vw, 0.6rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(34,211,238,0.6)',
          }}
        >
          Est. 2021
        </span>
      </div>
    </div>
  )
}
