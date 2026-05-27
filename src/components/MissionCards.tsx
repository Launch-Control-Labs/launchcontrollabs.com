export default function MissionCards() {
  return (
    <div style={{ margin: 0 }}>
      {/* RED FEATURED SECTION — Hero spread, vertically centered */}
      <div style={{
        background: '#C41E1E',
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
      }}>
        {/* Section flag */}
        <span style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase' as const,
          color: '#FFFFFF',
          border: '2px solid rgba(255,255,255,0.4)',
          padding: '0.25rem 0.7rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          alignSelf: 'flex-start',
        }}>FEATURE</span>

        {/* Hero headline — display-xl */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 18vw, 14rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase' as const,
          color: '#FFFFFF',
          margin: 0,
          padding: 0,
          whiteSpace: 'nowrap' as const,
          overflow: 'hidden',
        }}>TALISMAN</h3>

        {/* Body text */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.5,
          maxWidth: '38ch',
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
        }}>
          AI-powered accounting automation for modern finance teams. Graph-native architecture processing millions of transactions.
        </p>

        {/* Stat callouts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          borderTop: '3px solid rgba(255,255,255,0.2)',
          paddingTop: '1.5rem',
          marginBottom: '1.5rem',
        }}>
          {[
            { value: '2.4M', label: 'TRANSACTIONS' },
            { value: '98.7%', label: 'UPTIME' },
            { value: '<200ms', label: 'P95 LATENCY' },
            { value: '47', label: 'ML MODELS' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' as const }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                color: '#FFFFFF',
                display: 'block',
                lineHeight: 1,
              }}>{stat.value}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.45rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
                color: 'rgba(255,255,255,0.6)',
                marginTop: '0.5rem',
                display: 'block',
              }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Tech stack + status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap' as const,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.45rem',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase' as const,
          }}>NEXT.JS &middot; NEO4J &middot; LLMs</span>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase' as const,
            color: '#FFFFFF',
            border: '2px solid rgba(255,255,255,0.4)',
            padding: '0.25rem 0.7rem',
            fontWeight: 700,
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34D399' }} />
            ACTIVE
          </span>
        </div>
      </div>

      {/* CREAM SECTION — Secondary projects */}
      <div style={{
        background: '#F5F0E8',
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
      }}>
        {/* CLIENT WORK subheader bar */}
        <div style={{
          background: '#0A0A0A',
          padding: '0.5rem 1rem',
          marginTop: '1.5rem',
          marginBottom: 0,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase' as const,
            color: '#FFFFFF',
          }}>CLIENT WORK</span>
        </div>

        {/* Three-up grid — bordered */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          border: '3px solid #0A0A0A',
          borderTop: 'none',
        }}>
          {[
            { num: '02', name: 'OBWS', desc: 'E-commerce marketplace connecting consumers with Black-owned businesses.', year: '2024' },
            { num: '03', name: 'HOMEMEDS', desc: 'Pharmacy medication management. Automated dose packaging.', year: '2024' },
            { num: '04', name: 'OPTION ONE', desc: 'Full-range plumbing services. CSR and field coordination.', year: '2025' },
          ].map((project, i) => (
            <div key={project.num} style={{
              padding: '1.5rem',
              borderRight: i < 2 ? '3px solid #0A0A0A' : 'none',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                color: '#0A0A0A',
                lineHeight: 0.85,
                display: 'block',
                opacity: 0.15,
              }}>{project.num}</span>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#0A0A0A',
                lineHeight: 0.85,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase' as const,
                margin: '0.5rem 0 0.5rem',
              }}>{project.name}</h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#3D3D3D',
                lineHeight: 1.4,
                marginBottom: '0.5rem',
              }}>{project.desc}</p>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.45rem',
                letterSpacing: '0.2em',
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
        }}>
          {[
            { num: '05', name: 'SKY BOSS', desc: 'Aviation operations management. Fleet tracking, maintenance.', year: '2025' },
            { num: '06', name: 'NPS.TODAY', desc: 'Net Promoter Score platform. Automated surveys and analytics.', year: '2024' },
          ].map((project) => (
            <div key={project.num} style={{
              padding: '1.5rem',
              borderRight: '3px solid #0A0A0A',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                color: '#0A0A0A',
                lineHeight: 0.85,
                display: 'block',
                opacity: 0.15,
              }}>{project.num}</span>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#0A0A0A',
                lineHeight: 0.85,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase' as const,
                margin: '0.5rem 0 0.5rem',
              }}>{project.name}</h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#3D3D3D',
                lineHeight: 1.4,
                marginBottom: '0.5rem',
              }}>{project.desc}</p>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.45rem',
                letterSpacing: '0.2em',
                color: '#888888',
              }}>{project.year}</span>
            </div>
          ))}
          <div style={{ padding: '1.5rem' }} />
        </div>
      </div>
    </div>
  )
}
