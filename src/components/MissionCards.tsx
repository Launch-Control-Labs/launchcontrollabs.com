export default function MissionCards() {
  return (
    <div>
      <div style={{
        background: '#C41E1E',
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        padding: '4rem 0 5rem',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            borderBottom: '1px solid rgba(255,255,255,0.4)',
            paddingBottom: '0.2rem',
            marginBottom: '1rem',
          }}>FEATURE</span>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(8rem, 25vw, 18rem)',
            lineHeight: 0.82,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            margin: 0,
            padding: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}>TALISMAN</h3>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.5,
            maxWidth: '38ch',
            marginTop: '1.5rem',
            marginBottom: '2.5rem',
          }}>
            AI-powered accounting automation for modern finance teams. Graph-native architecture processing millions of transactions.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.25)',
            paddingTop: '2rem',
            marginBottom: '2rem',
          }}>
            {[
              { value: '2.4M', label: 'TRANSACTIONS' },
              { value: '98.7%', label: 'UPTIME' },
              { value: '<200ms', label: 'P95 LATENCY' },
              { value: '47', label: 'ML MODELS' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  color: '#FFFFFF',
                  display: 'block',
                  lineHeight: 1,
                }}>{stat.value}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  marginTop: '0.4rem',
                  display: 'block',
                }}>{stat.label}</span>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
            }}>NEXT.JS &middot; NEO4J &middot; LLMs</span>

            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.4)',
              padding: '0.25rem 0.6rem',
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34D399' }} />
              ACTIVE
            </span>
          </div>
        </div>
      </div>

      <div style={{
        background: '#F5F0E8',
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        padding: '0 0 0',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            background: '#0A0A0A',
            padding: '0.5rem 1rem',
            marginBottom: '0',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
            }}>ALSO SHIPPING</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            border: '3px solid #0A0A0A',
            borderTop: 'none',
          }}>
            <div style={{
              padding: '2rem',
              borderRight: '3px solid #0A0A0A',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '4rem',
                color: '#0A0A0A',
                lineHeight: 0.85,
                display: 'block',
                opacity: 0.15,
              }}>02</span>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                color: '#0A0A0A',
                lineHeight: 0.85,
                textTransform: 'uppercase',
                margin: '0.25rem 0 0.75rem',
              }}>HELIOS</h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: '#3D3D3D',
                lineHeight: 1.5,
                marginBottom: '1.5rem',
                maxWidth: '30ch',
              }}>Autonomous AI agent runtime with multi-agent orchestration. Built for production workloads.</p>

              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {[
                  { value: '12', label: 'AGENTS' },
                  { value: '50K', label: 'TASKS/DAY' },
                  { value: '99.2%', label: 'SLA' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.8rem',
                      color: '#0A0A0A',
                      display: 'block',
                      lineHeight: 1,
                    }}>{stat.value}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.45rem',
                      letterSpacing: '0.15em',
                      color: '#888888',
                      textTransform: 'uppercase',
                    }}>{stat.label}</span>
                  </div>
                ))}
              </div>

              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.45rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                background: '#0A0A0A',
                padding: '0.2rem 0.5rem',
                marginTop: '1rem',
              }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#34D399' }} />
                ACTIVE
              </span>
            </div>

            <div style={{ padding: '2rem' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '4rem',
                color: '#0A0A0A',
                lineHeight: 0.85,
                display: 'block',
                opacity: 0.15,
              }}>03</span>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 6vw, 4rem)',
                color: '#0A0A0A',
                lineHeight: 0.85,
                textTransform: 'uppercase',
                margin: '0.25rem 0 0.75rem',
              }}>LAUNCH CONTROL</h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: '#3D3D3D',
                lineHeight: 1.5,
                marginBottom: '1.5rem',
                maxWidth: '30ch',
              }}>This site. WebGL meets mission control. Baked-lighting, custom shaders, scroll-driven camera.</p>

              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {[
                  { value: '60fps', label: 'RENDER' },
                  { value: '1.5MB', label: 'TOTAL' },
                  { value: 'WebGL', label: 'ENGINE' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.8rem',
                      color: '#0A0A0A',
                      display: 'block',
                      lineHeight: 1,
                    }}>{stat.value}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.45rem',
                      letterSpacing: '0.15em',
                      color: '#888888',
                      textTransform: 'uppercase',
                    }}>{stat.label}</span>
                  </div>
                ))}
              </div>

              <span style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.45rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#0A0A0A',
                border: '1.5px solid #0A0A0A',
                padding: '0.2rem 0.5rem',
                marginTop: '1rem',
              }}>DEPLOYED</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            background: '#0A0A0A',
            padding: '0.5rem 1rem',
            marginTop: '3rem',
            marginBottom: '0',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
            }}>CLIENT WORK</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            border: '3px solid #0A0A0A',
            borderTop: 'none',
          }}>
            {[
              { num: '04', name: 'OBWS', desc: 'E-commerce marketplace connecting consumers with Black-owned businesses.', year: '2024' },
              { num: '05', name: 'HOMEMEDS', desc: 'Pharmacy medication management. Automated dose packaging.', year: '2024' },
              { num: '06', name: 'OPTION ONE', desc: 'Full-range plumbing services. CSR and field coordination.', year: '2025' },
            ].map((project, i) => (
              <div key={project.num} style={{
                padding: '1.5rem',
                borderRight: i < 2 ? '3px solid #0A0A0A' : 'none',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
                  color: '#0A0A0A',
                  lineHeight: 0.85,
                  display: 'block',
                  opacity: 0.15,
                }}>{project.num}</span>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  color: '#0A0A0A',
                  lineHeight: 0.9,
                  textTransform: 'uppercase',
                  margin: '0.2rem 0 0.5rem',
                }}>{project.name}</h4>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: '#3D3D3D',
                  lineHeight: 1.4,
                  marginBottom: '0.5rem',
                }}>{project.desc}</p>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.45rem',
                  letterSpacing: '0.1em',
                  color: '#888888',
                }}>{project.year}</span>
              </div>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            border: '3px solid #0A0A0A',
            borderTop: 'none',
            marginBottom: '3rem',
          }}>
            {[
              { num: '07', name: 'SKY BOSS', desc: 'Aviation operations management. Fleet tracking, maintenance.', year: '2025' },
              { num: '08', name: 'NPS.TODAY', desc: 'Net Promoter Score platform. Automated surveys and analytics.', year: '2024' },
            ].map((project) => (
              <div key={project.num} style={{
                padding: '1.5rem',
                borderRight: '3px solid #0A0A0A',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
                  color: '#0A0A0A',
                  lineHeight: 0.85,
                  display: 'block',
                  opacity: 0.15,
                }}>{project.num}</span>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  color: '#0A0A0A',
                  lineHeight: 0.9,
                  textTransform: 'uppercase',
                  margin: '0.2rem 0 0.5rem',
                }}>{project.name}</h4>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: '#3D3D3D',
                  lineHeight: 1.4,
                  marginBottom: '0.5rem',
                }}>{project.desc}</p>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.45rem',
                  letterSpacing: '0.1em',
                  color: '#888888',
                }}>{project.year}</span>
              </div>
            ))}
            <div style={{ padding: '1.5rem' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
