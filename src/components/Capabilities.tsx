import { COLORS, TYPOGRAPHY, SPACING, SECTION_FLAG, STAR_BG } from '@/styles/section-constants'

export default function Capabilities() {
  return (
    <section style={{ margin: 0, padding: 0, background: COLORS.navy }}>
      <div style={{
        background: COLORS.navy,
        padding: SPACING.sectionPad,
        color: COLORS.white,
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: STAR_BG,
      }}>
        <span style={{
          ...SECTION_FLAG,
        }}>STAT FACTORY</span>

         <h2 style={{
           fontFamily: 'var(--font-display)',
           fontSize: TYPOGRAPHY.display.size,
           lineHeight: TYPOGRAPHY.lineHeightTight,
           letterSpacing: '-0.02em',
           textTransform: 'uppercase' as const,
           color: COLORS.white,
           margin: 0,
         }}>WHAT WE BUILD</h2>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: TYPOGRAPHY.deck,
          color: COLORS.whiteDim,
          letterSpacing: TYPOGRAPHY.letterSpacingDeck,
          textTransform: 'uppercase' as const,
          maxWidth: '60ch',
          lineHeight: TYPOGRAPHY.lineHeightBody,
          margin: '1rem 0 2rem',
        }}>From AI agents to real-time platforms. Every engagement is full-stack, production-grade, and built to last.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid ' + COLORS.cyanDim }}>
          {[
            { num: '01', name: 'AI-POWERED PRODUCTS', desc: 'LLMs, agents, and automation systems built for production. Not prototypes—deployed systems.', label: 'CORE CAPABILITY' },
            { num: '02', name: 'FULL-STACK WEB APPS', desc: 'From architecture to deployment. React, Next.js, Node. Complete products, not partial commits.', label: 'CORE CAPABILITY' },
            { num: '03', name: 'DATA PIPELINES', desc: 'ETL, real-time processing, analytics. Systems that handle millions of events without breaking.', label: 'SUPPORTING CAPABILITY' },
            { num: '04', name: 'TECHNICAL OPERATIONS', desc: 'DevOps, monitoring, reliability engineering. We keep things running when it matters.', label: 'SUPPORTING CAPABILITY' },
          ].map((s, i) => (
            <div key={s.num} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid ' + COLORS.cyanDim,
              padding: '2rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: TYPOGRAPHY.stat.size,
                color: COLORS.cyanDim,
                lineHeight: 1,
                display: 'block',
              }}>{s.num}</span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: TYPOGRAPHY.sectionHeader.size,
                textTransform: 'uppercase' as const,
                color: COLORS.white,
                lineHeight: TYPOGRAPHY.lineHeightTight,
                margin: '0.5rem 0',
              }}>{s.name}</h3>
              <p style={{
                fontSize: TYPOGRAPHY.body,
                color: COLORS.whiteDim,
                lineHeight: TYPOGRAPHY.lineHeightBody,
                margin: '0.75rem 0',
              }}>{s.desc}</p>
              <span style={{
                fontSize: TYPOGRAPHY.label,
                color: COLORS.cyan,
                fontFamily: 'var(--font-mono)',
                letterSpacing: TYPOGRAPHY.letterSpacingLabel,
                marginTop: '0.5rem',
                display: 'block',
              }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
