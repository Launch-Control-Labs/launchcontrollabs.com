export default function MissionCards() {
  // Tier 1: Featured
  const featured = {
    num: '01',
    status: 'Active',
    name: 'TALISMAN',
    desc: 'AI-powered accounting automation for modern finance teams. Graph-native architecture processing millions of transactions.',
    stack: ['Next.js', 'Neo4j', 'LLMs'],
  }

  // Tier 2: Two-up
  const tier2 = [
    {
      num: '02',
      status: 'Active',
      name: 'HELIOS',
      desc: 'Autonomous AI agent runtime with multi-agent orchestration. Built for production workloads.',
      stack: ['TypeScript', 'Memgraph', 'R3F'],
    },
    {
      num: '03',
      status: 'Deployed',
      name: 'LAUNCH CONTROL',
      desc: "This site. WebGL meets mission control. Baked-lighting, custom shaders, scroll-driven camera.",
      stack: ['Next.js', 'Three.js', 'GSAP'],
    },
  ]

  // Tier 3: Client work (FIVE projects including OBWS + HomeMeds)
  const clientWork = [
    { num: '04', name: 'OBWS', desc: 'Official Black Wall Street. E-commerce marketplace connecting consumers with Black-owned businesses nationwide.', stack: ['React', 'E-Commerce', 'Platform'], year: '2024' },
    { num: '05', name: 'HOMEMEDS', desc: 'Pharmacy medication management platform. Automated dose packaging and patient compliance tracking.', stack: ['Next.js', 'Healthcare', 'API'], year: '2024' },
    { num: '06', name: 'OPTION ONE', desc: 'Full-range plumbing services platform. CSR and field worker coordination.', stack: ['Next.js', 'Real-time', 'CRM'], year: '2025' },
    { num: '07', name: 'SKY BOSS', desc: 'Aviation operations management. Fleet tracking, maintenance, crew coordination.', stack: ['React', 'Node.js', 'Real-time'], year: '2025' },
    { num: '08', name: 'NPS.TODAY', desc: 'Net Promoter Score platform. Automated survey distribution and analytics.', stack: ['Next.js', 'Analytics'], year: '2024' },
  ]

  return (
    <section className="section-editorial" style={{ padding: '0', background: '#F5F0E8' }}>
      
      {/* Section header — full bleed THICK rule */}
      <div style={{
        borderTop: '4px solid #0A0A0A',
        padding: '1.5rem 0 0',
        background: '#F5F0E8',
      }}>
        <div className="page">
          
          {/* WORK flag — ESPN bordered box */}
          <span style={{
            display: 'inline-block',
            border: '2px solid #C41E1E',
            color: '#C41E1E',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
            padding: '0.2rem 0.6rem',
            fontWeight: 600,
            marginBottom: '1rem',
          }}>WORK</span>

          {/* TIER 1 — Feature story, full spread */}
          <article style={{
            paddingBottom: '1.5rem',
            borderBottom: '2px solid #0A0A0A',
            marginBottom: '0',
          }}>
            {/* RED number — ESPN style */}
            <span style={{
              fontSize: 'clamp(5rem, 14vw, 10rem)',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: '#C41E1E',
              lineHeight: 0.85,
              letterSpacing: '-0.05em',
              userSelect: 'none',
              display: 'block',
            }}>{featured.num}</span>

            {/* MASSIVE headline — fills the page */}
            <h3 style={{
              fontSize: 'clamp(5rem, 15vw, 12rem)',
              fontWeight: 400,
              fontFamily: 'var(--font-display)',
              color: '#0A0A0A',
              letterSpacing: '0.02em',
              lineHeight: 0.85,
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              marginTop: '-0.25rem',
            }}>{featured.name}</h3>

            {/* Description + STAT BOX row */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#3D3D3D',
                lineHeight: 1.5,
                maxWidth: '40ch',
                margin: '0',
              }}>
                {featured.desc}
              </p>
              
              {/* STAT BOX — bordered black box */}
              <div style={{
                border: '2px solid #0A0A0A',
                padding: '0.6rem 1rem',
                display: 'inline-flex',
                gap: '1.2rem',
                alignItems: 'center',
              }}>
                {featured.stack.map(t => (
                  <span key={t} style={{
                    fontSize: '0.55rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    color: '#0A0A0A',
                  }}>{t}</span>
                ))}
              </div>

              {/* Status badge — BLACK pill */}
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.5rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
                background: '#0A0A0A',
                color: '#FFFFFF',
                padding: '0.2rem 0.6rem',
                fontWeight: 600,
              }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34D399' }}></span>
                {featured.status.toUpperCase()}
              </span>
            </div>
          </article>

          {/* TIER 2 — Two-up grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0',
            borderBottom: '2px solid #0A0A0A',
          }}>
            {tier2.map((project, i) => (
              <article key={project.num} style={{
                borderTop: '2px solid #0A0A0A',
                padding: '1.2rem 1.5rem',
                borderLeft: i === 1 ? '2px solid #0A0A0A' : 'none',
              }}>
                {/* RED number */}
                <span style={{
                  fontSize: 'clamp(3rem, 8vw, 5rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: '#C41E1E',
                  lineHeight: 0.85,
                  letterSpacing: '-0.04em',
                  userSelect: 'none',
                  display: 'block',
                }}>{project.num}</span>

                {/* Headline */}
                <h3 style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 400,
                  fontFamily: 'var(--font-display)',
                  color: '#0A0A0A',
                  letterSpacing: '0.02em',
                  lineHeight: 0.9,
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                  marginTop: '-0.15rem',
                }}>{project.name}</h3>

                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: '#3D3D3D',
                  lineHeight: 1.5,
                  marginBottom: '0.5rem',
                  maxWidth: '35ch',
                }}>{project.desc}</p>

                {/* STAT BOX */}
                <div style={{
                  border: '2px solid #0A0A0A',
                  padding: '0.5rem 0.8rem',
                  display: 'inline-flex',
                  gap: '0.8rem',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}>
                  {project.stack.map(t => (
                    <span key={t} style={{
                      fontSize: '0.55rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      color: '#0A0A0A',
                    }}>{t}</span>
                  ))}
                </div>

                {/* Status badge */}
                <div>
                  {project.status === 'Active' ? (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.5rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-mono)',
                      background: '#0A0A0A',
                      color: '#FFFFFF',
                      padding: '0.2rem 0.6rem',
                      fontWeight: 600,
                    }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#34D399' }}></span>
                      ACTIVE
                    </span>
                  ) : (
                    <span style={{
                      display: 'inline-block',
                      border: '1.5px solid #0A0A0A',
                      color: '#0A0A0A',
                      fontSize: '0.5rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.2rem 0.6rem',
                      fontWeight: 600,
                    }}>DEPLOYED</span>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* TIER 3 — Client work */}
          <div style={{ paddingBottom: '2rem' }}>
            {/* CLIENT WORK flag */}
            <span style={{
              display: 'inline-block',
              border: '2px solid #C41E1E',
              color: '#C41E1E',
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
              padding: '0.2rem 0.6rem',
              fontWeight: 600,
              marginTop: '1rem',
              marginBottom: '1rem',
            }}>CLIENT WORK</span>

            {/* First row: 04, 05, 06 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0',
            }}>
              {clientWork.slice(0, 3).map((project, i) => (
                <article key={project.num} style={{
                  borderTop: '2px solid #0A0A0A',
                  padding: '1.2rem 1.5rem',
                  borderLeft: i > 0 ? '2px solid #0A0A0A' : 'none',
                }}>
                  {/* RED number */}
                  <span style={{
                    fontSize: '3rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: '#C41E1E',
                    lineHeight: 0.85,
                    letterSpacing: '-0.04em',
                    display: 'block',
                    marginBottom: '0.1rem',
                    userSelect: 'none',
                  }}>{project.num}</span>

                  {/* Headline */}
                  <h4 style={{
                    fontSize: '2rem',
                    fontWeight: 400,
                    fontFamily: 'var(--font-display)',
                    color: '#0A0A0A',
                    letterSpacing: '0.02em',
                    lineHeight: 0.9,
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    marginTop: '-0.1rem',
                  }}>{project.name}</h4>

                  {/* Description */}
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: '#3D3D3D',
                    lineHeight: 1.5,
                    marginBottom: '0.5rem',
                    maxWidth: '28ch',
                  }}>{project.desc}</p>

                  {/* STAT BOX */}
                  <div style={{
                    border: '2px solid #0A0A0A',
                    padding: '0.4rem 0.6rem',
                    display: 'inline-flex',
                    gap: '0.6rem',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}>
                    {project.stack.map(t => (
                      <span key={t} style={{
                        fontSize: '0.55rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        color: '#0A0A0A',
                      }}>{t}</span>
                    ))}
                  </div>

                  {/* Year */}
                  <span style={{
                    display: 'block',
                    fontSize: '0.55rem',
                    color: '#888888',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.1em',
                  }}>{project.year}</span>
                </article>
              ))}
            </div>

            {/* Second row: 07, 08, empty */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0',
            }}>
              {clientWork.slice(3, 5).map((project, i) => (
                <article key={project.num} style={{
                  borderTop: '2px solid #0A0A0A',
                  padding: '1.2rem 1.5rem',
                  borderLeft: i > 0 ? '2px solid #0A0A0A' : 'none',
                }}>
                  {/* RED number */}
                  <span style={{
                    fontSize: '3rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: '#C41E1E',
                    lineHeight: 0.85,
                    letterSpacing: '-0.04em',
                    display: 'block',
                    marginBottom: '0.1rem',
                    userSelect: 'none',
                  }}>{project.num}</span>

                  {/* Headline */}
                  <h4 style={{
                    fontSize: '2rem',
                    fontWeight: 400,
                    fontFamily: 'var(--font-display)',
                    color: '#0A0A0A',
                    letterSpacing: '0.02em',
                    lineHeight: 0.9,
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    marginTop: '-0.1rem',
                  }}>{project.name}</h4>

                  {/* Description */}
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: '#3D3D3D',
                    lineHeight: 1.5,
                    marginBottom: '0.5rem',
                    maxWidth: '28ch',
                  }}>{project.desc}</p>

                  {/* STAT BOX */}
                  <div style={{
                    border: '2px solid #0A0A0A',
                    padding: '0.4rem 0.6rem',
                    display: 'inline-flex',
                    gap: '0.6rem',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}>
                    {project.stack.map(t => (
                      <span key={t} style={{
                        fontSize: '0.55rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        color: '#0A0A0A',
                      }}>{t}</span>
                    ))}
                  </div>

                  {/* Year */}
                  <span style={{
                    display: 'block',
                    fontSize: '0.55rem',
                    color: '#888888',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.1em',
                  }}>{project.year}</span>
                </article>
              ))}
              {/* Empty cell to complete the grid */}
              <div style={{
                borderTop: '2px solid #0A0A0A',
                borderLeft: '2px solid #0A0A0A',
                padding: '1.2rem 1.5rem',
              }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
