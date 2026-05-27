'use client'

export default function MissionCards() {
  return (
    <section className="section-editorial" style={{ padding: '0', background: '#F5F0E8' }}>
      
      {/* Section header — full bleed thick rule */}
      <div style={{
        borderTop: '3px solid #0A0A0A',
        padding: 'clamp(4rem, 8vh, 7rem) 0 0',
        background: '#F5F0E8',
      }}>
        <div className="page">
          
          {/* Section label — ESPN style */}
          <p style={{
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
            color: '#888888',
            marginBottom: 'clamp(2rem, 4vh, 3rem)',
          }}>Work</p>

          {/* TIER 1 — Feature story, full spread */}
          <article style={{
            paddingBottom: 'clamp(4rem, 8vh, 6rem)',
            borderBottom: '1px solid #C8C0B0',
            marginBottom: 'clamp(4rem, 8vh, 6rem)',
          }}>
            {/* Number + status row */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
            }}>
              <span style={{
                fontSize: 'clamp(5rem, 14vw, 11rem)',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: '#D9D0C0',
                lineHeight: 1,
                letterSpacing: '-0.05em',
                userSelect: 'none',
              }}>01</span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.55rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
                background: '#C41E1E',
                color: '#FFFFFF',
                padding: '0.3rem 0.7rem',
                fontWeight: 600,
              }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFFFFF' }}></span>
                Active
              </span>
            </div>

            {/* Headline — ESPN oversized */}
            <h3 style={{
              fontSize: 'clamp(4.5rem, 13vw, 10rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              color: '#0A0A0A',
              letterSpacing: '-0.02em',
              lineHeight: 0.9,
              textTransform: 'uppercase',
              marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
              marginTop: '-0.5rem',
            }}>Talisman</h3>

            {/* Description + meta row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '3rem',
              alignItems: 'start',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                color: '#3D3D3D',
                lineHeight: 1.65,
                maxWidth: '520px',
              }}>
                AI-powered accounting automation for modern finance teams. Graph-native architecture processing millions of transactions.
              </p>
              {/* Stat block — right column */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                textAlign: 'right',
                minWidth: '120px',
              }}>
                {['Next.js', 'Neo4j', 'LLMs'].map(t => (
                  <span key={t} style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#888888',
                    fontFamily: 'var(--font-mono)',
                  }}>{t}</span>
                ))}
                <span style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  color: '#C8C0B0',
                  fontFamily: 'var(--font-mono)',
                  marginTop: '0.5rem',
                  borderTop: '1px solid #C8C0B0',
                  paddingTop: '0.4rem',
                }}>2024</span>
              </div>
            </div>
          </article>

          {/* TIER 2 — Two-up grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '0',
            paddingBottom: 'clamp(4rem, 8vh, 6rem)',
            borderBottom: '1px solid #C8C0B0',
            marginBottom: 'clamp(4rem, 8vh, 6rem)',
          }}>
            {[
              {
                num: '02',
                status: 'Active',
                name: 'Helios',
                desc: 'Autonomous AI agent runtime with multi-agent orchestration. Built for production workloads.',
                stack: ['TypeScript', 'Memgraph', 'R3F'],
              },
              {
                num: '03',
                status: 'Deployed',
                name: 'Launch Control Labs',
                desc: "This site. Built with basement.studio's baked-lighting approach. WebGL meets mission control.",
                stack: ['Next.js', 'Three.js', 'GSAP'],
              },
            ].map((project, i) => (
              <article key={project.num} style={{
                borderTop: '3px solid #0A0A0A',
                paddingTop: 'clamp(1.5rem, 3vh, 2.5rem)',
                paddingRight: i === 0 ? 'clamp(2rem, 4vw, 4rem)' : '0',
                paddingLeft: i === 1 ? 'clamp(2rem, 4vw, 4rem)' : '0',
                borderLeft: i === 1 ? '1px solid #C8C0B0' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{
                    fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: '#D9D0C0',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    userSelect: 'none',
                  }}>{project.num}</span>
                  <span style={{
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono)',
                    color: project.status === 'Active' ? '#C41E1E' : '#888888',
                    fontWeight: 600,
                  }}>{project.status}</span>
                </div>
                <h3 style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  color: '#0A0A0A',
                  letterSpacing: '-0.01em',
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                  marginTop: '-0.25rem',
                }}>{project.name}</h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                  color: '#3D3D3D',
                  lineHeight: 1.65,
                  marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                }}>{project.desc}</p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {project.stack.map(t => (
                    <span key={t} style={{
                      fontSize: '0.55rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#888888',
                      fontFamily: 'var(--font-mono)',
                    }}>{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* TIER 3 — Client work */}
          <div style={{ paddingBottom: 'clamp(4rem, 8vh, 6rem)' }}>
            <p style={{
              fontSize: '0.55rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
              color: '#888888',
              marginBottom: 'clamp(2rem, 4vh, 3rem)',
            }}>Client Work</p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0',
            }}>
              {[
                { num: '04', name: 'Option One', desc: 'Full-range plumbing services platform. CSR and field worker coordination.', stack: ['Next.js', 'Real-time', 'CRM'], year: '2025' },
                { num: '05', name: 'Sky Boss', desc: 'Aviation operations management. Fleet tracking, maintenance, crew coordination.', stack: ['React', 'Node.js', 'Real-time'], year: '2025' },
                { num: '06', name: 'NPS.today', desc: 'Net Promoter Score platform. Automated survey distribution and analytics.', stack: ['Next.js', 'Analytics'], year: '2024' },
              ].map((project, i) => (
                <article key={project.num} style={{
                  borderTop: '1px solid #0A0A0A',
                  paddingTop: 'clamp(1.5rem, 3vh, 2rem)',
                  paddingRight: i < 2 ? 'clamp(1.5rem, 3vw, 2.5rem)' : '0',
                  paddingLeft: i > 0 ? 'clamp(1.5rem, 3vw, 2.5rem)' : '0',
                  borderLeft: i > 0 ? '1px solid #C8C0B0' : 'none',
                }}>
                  <span style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: '#D9D0C0',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    display: 'block',
                    marginBottom: '0.25rem',
                    userSelect: 'none',
                  }}>{project.num}</span>
                  <h4 style={{
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                    fontWeight: 800,
                    fontFamily: 'var(--font-display)',
                    color: '#0A0A0A',
                    letterSpacing: '-0.01em',
                    lineHeight: 0.95,
                    textTransform: 'uppercase',
                    marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)',
                    marginTop: '-0.15rem',
                  }}>{project.name}</h4>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: '#3D3D3D',
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                  }}>{project.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {project.stack.map(t => (
                        <span key={t} style={{
                          fontSize: '0.5rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#888888',
                          fontFamily: 'var(--font-mono)',
                        }}>{t}</span>
                      ))}
                    </div>
                    <span style={{
                      fontSize: '0.5rem',
                      color: '#C8C0B0',
                      fontFamily: 'var(--font-mono)',
                    }}>{project.year}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
