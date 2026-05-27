import { COLORS, TYPOGRAPHY, SPACING, SECTION_FLAG, SECTION_BASE, STAR_BG } from '@/styles/section-constants'

export default function Awards() {
  return (
    <section style={{
      ...SECTION_BASE,
      backgroundImage: STAR_BG,
    }}>
      <span style={SECTION_FLAG}>HONORS</span>

      <h2 style={{
        fontFamily: TYPOGRAPHY.display.font,
        fontSize: TYPOGRAPHY.display.size,
        lineHeight: TYPOGRAPHY.display.lineHeight,
        letterSpacing: TYPOGRAPHY.display.letterSpacing,
        textTransform: 'uppercase' as const,
        margin: '0 0 0.5rem',
        color: COLORS.white,
      }}>RECOGNITION</h2>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: TYPOGRAPHY.body,
        color: COLORS.whiteDim,
        letterSpacing: TYPOGRAPHY.letterSpacingLabel,
        textTransform: 'uppercase' as const,
        marginBottom: '1.5rem',
      }}>Awards and features earned since launch</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        border: `1px solid ${COLORS.cyanDim}`,
        marginTop: '2rem',
      }}>
        {[
          { achievement: 'WINNER', org: 'Webby Awards', year: '2023' },
          { achievement: 'BEST NEW STARTUP', org: 'TWIF', year: '2024' },
          { achievement: 'PRODUCT OF THE WEEK', org: 'Product Hunt', year: '2024' },
          { achievement: 'FEATURED', org: 'Awwwards', year: '2024' },
        ].map((award, i) => (
          <div key={award.org} style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${COLORS.cyanDim}`,
            padding: '2rem 1.5rem',
            textAlign: 'center' as const,
            display: 'flex',
            flexDirection: 'column' as const,
            justifyContent: 'center',
            minHeight: '180px',
          }}>
            <span style={{
              fontFamily: TYPOGRAPHY.stat.font,
              fontSize: TYPOGRAPHY.stat.size,
              color: COLORS.cyan,
              lineHeight: 1,
              display: 'block',
              marginBottom: '0.75rem',
            }}>{award.year}</span>
            <span style={{
              fontFamily: TYPOGRAPHY.sectionHeader.font,
              fontSize: TYPOGRAPHY.sectionHeader.size,
              textTransform: 'uppercase' as const,
              color: COLORS.white,
              lineHeight: TYPOGRAPHY.sectionHeader.lineHeight,
              display: 'block',
              marginBottom: '0.5rem',
            }}>{award.achievement}</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: TYPOGRAPHY.label,
              color: COLORS.whiteDim,
              letterSpacing: TYPOGRAPHY.letterSpacingLabel,
              textTransform: 'uppercase' as const,
            }}>{award.org}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
