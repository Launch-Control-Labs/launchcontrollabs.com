import { COLORS, TYPOGRAPHY, SPACING, SECTION_FLAG, STAR_BG } from '@/styles/section-constants'

export default function MissionCards() {
  return (
    <div style={{ margin: 0, overflow: 'hidden' }}>
      {/* SPACE FEATURED SECTION — Hero spread, vertically centered */}
      <div style={{
        background: COLORS.navy,
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        padding: SPACING.sectionPad,
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        color: COLORS.white,
        overflow: 'hidden',
        backgroundImage: STAR_BG,
      }}>
        {/* Section flag */}
        <span style={{
          ...SECTION_FLAG,
        }}>FEATURE</span>

         {/* Hero headline — display-xl */}
         <h3 style={{
           fontFamily: 'var(--font-display)',
           fontSize: TYPOGRAPHY.display.size,
           lineHeight: TYPOGRAPHY.lineHeightTight,
           letterSpacing: '-0.02em',
           textTransform: 'uppercase' as const,
           color: COLORS.white,
           margin: 0,
           padding: 0,
           whiteSpace: 'nowrap' as const,
           overflow: 'hidden',
         }}>TALISMAN</h3>

        {/* Body text */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: TYPOGRAPHY.deck,
          color: COLORS.whiteDim,
          letterSpacing: TYPOGRAPHY.letterSpacingDeck,
          lineHeight: TYPOGRAPHY.lineHeightBody,
          maxWidth: '60ch',
          margin: '1.5rem 0',
        }}>
          AI-powered accounting automation for modern finance teams. Graph-native architecture processing millions of transactions.
        </p>

        {/* Stat callouts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          borderTop: '3px solid ' + COLORS.whiteFaint,
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
                color: COLORS.white,
                display: 'block',
                lineHeight: 1,
              }}>{stat.value}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.45rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
                color: COLORS.whiteDim,
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
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap' as const,
          }}>
            {['NEXT.JS', 'NEO4J', 'LLMs'].map((tech) => (
              <span key={tech} style={{
                border: '1px solid ' + COLORS.cyanDim,
                color: COLORS.cyan,
                fontFamily: 'var(--font-mono)',
                fontSize: TYPOGRAPHY.label,
                letterSpacing: TYPOGRAPHY.letterSpacingLabel,
                padding: '0.25rem 0.6rem',
                textTransform: 'uppercase' as const,
              }}>{tech}</span>
            ))}
          </div>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase' as const,
            color: COLORS.white,
            border: '2px solid ' + COLORS.whiteFaint,
            padding: '0.25rem 0.7rem',
            fontWeight: 700,
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: COLORS.cyan }} />
            ACTIVE
          </span>
        </div>
      </div>

      {/* SECONDARY SECTION — Client work grid */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        padding: SPACING.sectionPad,
      }}>
        {/* CLIENT WORK subheader bar */}
        <div style={{
          background: COLORS.navy,
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
            color: COLORS.white,
          }}>CLIENT WORK</span>
        </div>

        {/* Three-up grid — bordered */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          border: '1px solid ' + COLORS.cyanDim,
          borderTop: 'none',
        }}>
           {[
             { num: '02', name: 'OBWS', desc: 'E-commerce marketplace connecting consumers with Black-owned businesses.', year: '2024' },
             { num: '03', name: 'HOMEMEDS', desc: 'Pharmacy medication management. Automated dose packaging.', year: '2024' },
             { num: '04', name: 'OPTION ONE', desc: 'Full-range plumbing services. CSR and field coordination.', year: '2025' },
           ].map((project, i) => (
             <div key={project.num} style={{
               padding: '2rem',
               borderRight: i < 2 ? '1px solid ' + COLORS.cyanDim : 'none',
             }}>
               <span style={{
                 fontFamily: 'var(--font-display)',
                 fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                 color: COLORS.cyan,
                 lineHeight: 0.85,
                 display: 'block',
                 opacity: 0.15,
               }}>{project.num}</span>
               <h4 style={{
                 fontFamily: 'var(--font-display)',
                 fontSize: TYPOGRAPHY.sectionHeader.size,
                 color: COLORS.white,
                 lineHeight: 0.85,
                 letterSpacing: '-0.02em',
                 textTransform: 'uppercase' as const,
                 margin: '0.5rem 0 0.5rem',
               }}>{project.name}</h4>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: TYPOGRAPHY.body,
                color: COLORS.whiteDim,
                lineHeight: 1.4,
                marginBottom: '0.5rem',
              }}>{project.desc}</p>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.45rem',
                letterSpacing: '0.2em',
                color: COLORS.cyanDim,
              }}>{project.year}</span>
            </div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          border: '1px solid ' + COLORS.cyanDim,
          borderTop: 'none',
        }}>
           {[
             { num: '05', name: 'SKY BOSS', desc: 'Aviation operations management. Fleet tracking, maintenance.', year: '2025' },
             { num: '06', name: 'NPS.TODAY', desc: 'Net Promoter Score platform. Automated surveys and analytics.', year: '2024' },
           ].map((project) => (
             <div key={project.num} style={{
               padding: '2rem',
               borderRight: '1px solid ' + COLORS.cyanDim,
             }}>
               <span style={{
                 fontFamily: 'var(--font-display)',
                 fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                 color: COLORS.cyan,
                 lineHeight: 0.85,
                 display: 'block',
                 opacity: 0.15,
               }}>{project.num}</span>
               <h4 style={{
                 fontFamily: 'var(--font-display)',
                 fontSize: TYPOGRAPHY.sectionHeader.size,
                 color: COLORS.white,
                 lineHeight: 0.85,
                 letterSpacing: '-0.02em',
                 textTransform: 'uppercase' as const,
                 margin: '0.5rem 0 0.5rem',
               }}>{project.name}</h4>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: TYPOGRAPHY.body,
                color: COLORS.whiteDim,
                lineHeight: 1.4,
                marginBottom: '0.5rem',
              }}>{project.desc}</p>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.45rem',
                letterSpacing: '0.2em',
                color: COLORS.cyanDim,
              }}>{project.year}</span>
            </div>
          ))}
          <div style={{ padding: '2rem' }} />
        </div>
      </div>
    </div>
  )
}
