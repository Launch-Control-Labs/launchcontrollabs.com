'use client'

import { useSceneStore } from '@/store/scene-store'
import { getBeatOpacity } from '@/config/beat-config'

const SERVICES = [
  { num: '01', name: 'AI-POWERED PRODUCTS', desc: 'LLMs, agents, and automation systems built for production.' },
  { num: '02', name: 'FULL-STACK WEB APPS', desc: 'Architecture to deployment. React, Next.js, Node.' },
  { num: '03', name: 'DATA PIPELINES', desc: 'ETL, real-time processing, and analytics at scale.' },
  { num: '04', name: 'TECHNICAL OPERATIONS', desc: 'DevOps, monitoring, and reliability engineering.' },
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
        background: 'linear-gradient(to right, rgba(2, 9, 20, 0.88) 0%, rgba(2, 9, 20, 0.6) 50%, transparent 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
          maxWidth: 'min(600px, 55vw)',
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
            alignSelf: 'flex-start',
          }}
        >
          SERVICES
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 0.82,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            margin: 0,
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
          }}
        >
          WHAT WE<br />
          <span style={{ color: '#22D3EE' }}>BUILD</span>
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            maxWidth: '40ch',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Full-stack, production-grade. From idea to shipped product.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(34,211,238,0.2)' }}>
          {SERVICES.map((service) => (
            <div
              key={service.num}
              style={{
                background: 'rgba(2, 9, 20, 0.75)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                padding: 'clamp(0.75rem, 1.5vw, 1.25rem)',
                display: 'flex',
                alignItems: 'baseline',
                gap: 'clamp(0.5rem, 1vw, 1rem)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  color: 'rgba(34,211,238,0.3)',
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
                    fontSize: 'clamp(0.85rem, 1.3vw, 1.1rem)',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {service.name}
                </h3>
                <p
                  style={{
                    fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.4,
                    margin: '0.2rem 0 0',
                  }}
                >
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
