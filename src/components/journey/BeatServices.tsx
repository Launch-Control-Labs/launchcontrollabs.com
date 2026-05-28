'use client'

import { useSceneStore } from '@/store/scene-store'
import { getBeatOpacity } from '@/config/beat-config'

const SERVICES = [
  {
    num: '01',
    name: 'AI-POWERED PRODUCTS',
    desc: 'LLMs, agents, and automation systems built for production.',
  },
  {
    num: '02',
    name: 'FULL-STACK WEB APPS',
    desc: 'Architecture to deployment. React, Next.js, Node. Complete products.',
  },
  {
    num: '03',
    name: 'DATA PIPELINES',
    desc: 'ETL, real-time processing, and analytics at scale.',
  },
  {
    num: '04',
    name: 'TECHNICAL OPERATIONS',
    desc: 'DevOps, monitoring, and reliability engineering.',
  },
]

export function BeatServices() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const opacity = getBeatOpacity('services', scrollProgress)

  if (opacity === 0) return null

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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(2rem, 5vw, 4rem)',
        background: 'linear-gradient(135deg, rgba(2,9,20,0.92) 0%, rgba(10,10,15,0.88) 100%)',
      }}
    >
      <span
        style={{
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
          marginBottom: '1.5rem',
          alignSelf: 'flex-start',
        }}
      >
        SERVICES
      </span>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 7vw, 6rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          margin: '0 0 0.5rem',
          textShadow: '0 2px 20px rgba(0,0,0,0.8)',
        }}
      >
        WHAT WE BUILD
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          maxWidth: '45ch',
          margin: '0 0 2.5rem',
          lineHeight: 1.5,
        }}
      >
        From idea to shipped product. Every engagement is full-stack, production-grade, and built to last.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1px',
          maxWidth: '900px',
          background: 'rgba(34,211,238,0.2)',
        }}
      >
        {SERVICES.map((service) => (
          <div
            key={service.num}
            style={{
              background: 'rgba(2, 9, 20, 0.9)',
              padding: 'clamp(1.25rem, 2.5vw, 2rem)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: 'rgba(34,211,238,0.4)',
                lineHeight: 1,
                display: 'block',
              }}
            >
              {service.num}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                lineHeight: 1.1,
                margin: '0.5rem 0',
                letterSpacing: '-0.01em',
              }}
            >
              {service.name}
            </h3>
            <p
              style={{
                fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
