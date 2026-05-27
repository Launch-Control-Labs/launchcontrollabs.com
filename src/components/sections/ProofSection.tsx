'use client'

import { SectionThemeProvider } from '@/components/SectionThemeProvider'
import { SECTION_THEMES, STAR_BG } from '@/styles/section-constants'

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
  { num: '02', name: 'OBWS', desc: 'E-commerce marketplace connecting consumers with Black-owned businesses.', year: '2024', metric: 'MARKETPLACE' },
  { num: '03', name: 'HOMEMEDS', desc: 'Pharmacy medication management. Automated dose packaging.', year: '2024', metric: 'HEALTHCARE' },
  { num: '04', name: 'OPTION ONE', desc: 'Full-range plumbing services. CSR and field coordination.', year: '2025', metric: 'FIELD OPS' },
  { num: '05', name: 'SKY BOSS', desc: 'Aviation operations management. Fleet tracking, maintenance.', year: '2025', metric: 'AVIATION' },
  { num: '06', name: 'NPS.TODAY', desc: 'Net Promoter Score platform. Automated surveys and analytics.', year: '2024', metric: 'ANALYTICS' },
]

export function ProofSection() {
  const theme = SECTION_THEMES.proof

  return (
    <SectionThemeProvider sectionIndex={3}>
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          background: 'transparent',
          color: theme.text,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.75) 60%, transparent 100%)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            minHeight: '100vh',
            maxWidth: '780px',
          }}
        >
        <div
          style={{
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem) 0',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              border: `2px solid ${theme.accent}`,
              padding: '0.3rem 0.8rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
              letterSpacing: '0.25em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: theme.accent,
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
              color: theme.text,
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
              color: theme.accent,
              margin: 0,
            }}
          >
            COMPLETE
          </h2>
        </div>

        <div
          style={{
            margin: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            border: `3px solid ${theme.accent}`,
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
              color: theme.text,
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
            className="proof-stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
              borderTop: `1px solid ${theme.border}`,
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
                    color: theme.accent,
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
                    border: `1px solid ${theme.accent}`,
                    color: theme.accent,
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
                color: theme.text,
                border: `2px solid ${theme.border}`,
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
            marginTop: '2rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: theme.muted,
            }}
          >
            CLIENT WORK
          </span>
        </div>

        <div
          className="proof-projects-wrap"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            padding: 'clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 4vw, 3rem) clamp(3rem, 6vw, 5rem)',
            justifyContent: 'flex-start',
          }}
        >
          {CLIENT_PROJECTS.map((project) => (
            <div
              key={project.num}
              style={{
                border: `2px solid ${theme.accent}`,
                borderRadius: '50%',
                width: 'clamp(140px, 15vw, 180px)',
                height: 'clamp(140px, 15vw, 180px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                background: 'rgba(245, 158, 11, 0.03)',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '15%',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.2em',
                  color: theme.accent,
                  opacity: 0.6,
                }}
              >
                {project.num}
              </span>

              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.25rem)',
                  color: theme.text,
                  textAlign: 'center',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                {project.name}
              </span>

              <span
                style={{
                  fontSize: 'clamp(0.5rem, 0.7vw, 0.65rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: theme.accent,
                  marginTop: '0.25rem',
                }}
              >
                {project.metric}
              </span>

              <span
                style={{
                  position: 'absolute',
                  bottom: '15%',
                  fontSize: '0.45rem',
                  letterSpacing: '0.2em',
                  color: theme.muted,
                }}
              >
                {project.year}
              </span>
            </div>
          ))}
        </div>
        </div>
      </div>
    </SectionThemeProvider>
  )
}
