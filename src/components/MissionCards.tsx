'use client'

import { useState } from 'react'

const PROJECTS = [
  {
    name: 'Talisman',
    status: 'ACTIVE',
    description: 'AI-powered accounting automation for modern finance teams. Graph-native architecture with Neo4j.',
    stack: ['Next.js', 'Neo4j', 'LLMs'],
    year: '2024',
  },
  {
    name: 'Helios',
    status: 'ACTIVE',
    description: 'Autonomous AI agent runtime with multi-agent orchestration. Built for production workloads.',
    stack: ['TypeScript', 'Memgraph', 'R3F'],
    year: '2025',
  },
  {
    name: 'Launch Control Labs',
    status: 'DEPLOYED',
    description: 'This site. Built with basement.studio\'s baked-lighting approach. WebGL meets mission control.',
    stack: ['Next.js', 'Three.js', 'GSAP'],
    year: '2026',
  },
]

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'var(--green)',
  DEPLOYED: 'var(--amber)',
  ARCHIVED: 'var(--text-dim)',
}

export default function MissionCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section style={{ paddingTop: 0 }}>
      <div className="page">
        <p className="section-label">ACTIVE MISSIONS</p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          {PROJECTS.map((project, index) => (
            <div
              key={project.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'relative',
                padding: 'clamp(1.5rem, 4vh, 2.5rem)',
                background: hoveredIndex === index ? 'var(--surface)' : 'var(--bg-deep)',
                border: '1px solid var(--border)',
                transition: 'background 150ms ease-out, border-color 150ms ease-out',
                cursor: 'default',
                maxWidth: '720px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 'var(--space-3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <h3
                    style={{
                      fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {project.name}
                  </h3>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.55rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: STATUS_COLORS[project.status],
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: STATUS_COLORS[project.status],
                        boxShadow: project.status === 'ACTIVE' ? '0 0 6px rgba(52, 211, 153, 0.5)' : 'none',
                      }}
                    />
                    {project.status}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {project.year}
                </span>
              </div>

              <p
                className="font-body"
                style={{
                  fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                  color: 'var(--text-dim)',
                  lineHeight: 1.65,
                  marginBottom: 'var(--space-4)',
                }}
              >
                {project.description}
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: '0.6rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-dim)',
                      border: '1px solid var(--border)',
                      padding: '0.25rem 0.6rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
