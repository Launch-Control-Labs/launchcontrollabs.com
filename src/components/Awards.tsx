import { COLORS, TYPOGRAPHY, SPACING, SECTION_FLAG, SECTION_BASE, STAR_BG } from '@/styles/section-constants'

export default function Awards() {
  return (
    <section style={{
      ...SECTION_BASE,
      backgroundImage: STAR_BG,
    }}>
      <span style={SECTION_FLAG}>HONORS</span>

      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: TYPOGRAPHY.headline,
        lineHeight: TYPOGRAPHY.lineHeightTight,
        letterSpacing: '-0.02em',
        textTransform: 'uppercase' as const,
        margin: '0 0 0.5rem',
        color: COLORS.white,
      }}>RECOGNITION</h2>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: TYPOGRAPHY.deck,
        color: COLORS.whiteDim,
        letterSpacing: TYPOGRAPHY.letterSpacingDeck,
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
            background: COLORS.navyLight,
            border: `1px solid ${COLORS.cyanDim}`,
            padding: '2rem 1.5rem',
            textAlign: 'center' as const,
            display: 'flex',
            flexDirection: 'column' as const,
            justifyContent: 'center',
            minHeight: '180px',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: TYPOGRAPHY.dataNum,
              color: COLORS.cyan,
              lineHeight: 1,
              display: 'block',
              marginBottom: '0.75rem',
            }}>{award.year}</span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: TYPOGRAPHY.headlineMd,
              textTransform: 'uppercase' as const,
              color: COLORS.white,
              lineHeight: TYPOGRAPHY.lineHeightTight,
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
