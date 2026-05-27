import { COLORS, TYPOGRAPHY, SPACING, SECTION_FLAG, STAR_BG } from '@/styles/section-constants'

export default function TeamPedigree() {
  const companies = ['LINKEDIN', 'PLURALSIGHT', 'PWC', 'EXPEDIA', 'DIGITAL TUTORS']

  return (
    <section style={{
      background: COLORS.navy,
      color: COLORS.white,
      padding: SPACING.sectionPad,
      minHeight: '70vh',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: STAR_BG,
    }}>
      <span style={{
        ...SECTION_FLAG,
      }}>CREW MANIFEST</span>

      <div>
        {companies.map((company, i) => (
          <h3 key={company} style={{
            fontFamily: 'var(--font-display)',
            fontSize: TYPOGRAPHY.headline,
            textTransform: 'uppercase',
            lineHeight: TYPOGRAPHY.lineHeightTight,
            letterSpacing: '-0.02em',
            color: COLORS.white,
            borderBottom: i < companies.length - 1 ? '1px solid ' + COLORS.cyanDim : 'none',
            paddingBottom: '0.3rem',
            paddingTop: '0.3rem',
            margin: 0,
          }}>{company}</h3>
        ))}
      </div>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: TYPOGRAPHY.deck,
        color: COLORS.whiteDim,
        letterSpacing: TYPOGRAPHY.letterSpacingDeck,
        textTransform: 'uppercase',
        marginTop: '2rem',
      }}>Flight history of the Launch Control crew</p>
    </section>
  )
}
