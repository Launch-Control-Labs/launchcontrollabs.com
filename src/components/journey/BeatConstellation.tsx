'use client'

import { useSceneStore } from '@/store/scene-store'
import { getBeatOpacity } from '@/config/beat-config'

const TALISMAN_PROJECT = {
  name: 'TALISMAN',
  description: 'AI-powered accounting automation for modern finance teams. Graph-native architecture processing millions of transactions.',
  stats: [
    { value: '2.4M', label: 'TRANSACTIONS' },
    { value: '98.7%', label: 'UPTIME' },
    { value: '<200ms', label: 'P95 LATENCY' },
    { value: '47', label: 'ML MODELS' },
  ],
  techStack: ['NEXT.JS', 'NEO4J', 'LLMs'],
  status: 'ACTIVE',
}

const CLIENT_PROJECTS = [
  { num: '02', name: 'OBWS', metric: 'MARKETPLACE' },
  { num: '03', name: 'HOMEMEDS', metric: 'HEALTHCARE' },
  { num: '04', name: 'OPTION ONE', metric: 'FIELD OPS' },
  { num: '05', name: 'SKY BOSS', metric: 'AVIATION' },
  { num: '06', name: 'NPS.TODAY', metric: 'ANALYTICS' },
]

export function BeatConstellation() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const opacity = getBeatOpacity('shuttleEarth', scrollProgress)
  if (opacity === 0) return null

  return (
    <div
      data-beat="4"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        opacity,
        transition: 'opacity 0.1s',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        color: '#FAFAFA',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(10,10,15,0.72) 0%, rgba(10,10,15,0.55) 60%, transparent 100%)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          height: '100%',
          maxWidth: '780px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 4vw, 3rem) 0',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              border: '2px solid #F59E0B',
              padding: '0.3rem 0.8rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
              letterSpacing: '0.25em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#F59E0B',
            }}
          >
            THE PROOF
          </span>
        </div>

        <div
          style={{
            padding: '0 clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 8vw, 8rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#FAFAFA',
              margin: 0,
            }}
          >
            MISSIONS
          </h2>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 8vw, 8rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#F59E0B',
              margin: 0,
            }}
          >
            COMPLETE
          </h2>
        </div>

        <div
          style={{
            margin: 'clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 4vw, 3rem)',
            padding: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            border: '3px solid #F59E0B',
            background: 'rgba(245, 158, 11, 0.05)',
            maxWidth: '900px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#FAFAFA',
              margin: '0 0 1rem 0',
            }}
          >
            {TALISMAN_PROJECT.name}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)',
              color: 'rgba(250, 250, 250, 0.7)',
              lineHeight: 1.6,
              maxWidth: '60ch',
              margin: '0 0 1.5rem 0',
            }}
          >
            {TALISMAN_PROJECT.description}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
              borderTop: '1px solid #1F2937',
              paddingTop: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            {TALISMAN_PROJECT.stats.map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    color: '#F59E0B',
                    display: 'block',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(250, 250, 250, 0.5)',
                    marginTop: '0.5rem',
                    display: 'block',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {TALISMAN_PROJECT.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    border: '1px solid #F59E0B',
                    color: '#F59E0B',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
                    letterSpacing: '0.15em',
                    padding: '0.25rem 0.6rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#FAFAFA',
                border: '2px solid #1F2937',
                padding: '0.25rem 0.7rem',
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: '#34D399',
                }}
              />
              {TALISMAN_PROJECT.status}
            </span>
          </div>
        </div>

        <div
          style={{
            padding: '0 clamp(1.5rem, 4vw, 3rem)',
            marginTop: '0.75rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#374151',
            }}
          >
            CLIENT WORK
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(0.5rem, 1vw, 1rem)',
            padding: '0 clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2rem)',
          }}
        >
          {CLIENT_PROJECTS.map((project) => (
            <div
              key={project.num}
              style={{
                border: '1px solid #F59E0B',
                padding: '0.4rem 0.8rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.6rem, 0.8vw, 0.75rem)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#F59E0B',
                opacity: 0.8,
              }}
            >
              {project.num} — {project.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
