'use client'

import { SectionThemeProvider } from '@/components/SectionThemeProvider'
import { SECTION_FLAG } from '@/styles/section-constants'

const COMPANIES = [
  'LINKEDIN',
  'PLURALSIGHT', 
  'PWC',
  'EXPEDIA',
  'DIGITAL TUTORS',
]

const AWARDS = [
  { achievement: 'WINNER', org: 'Webby Awards', year: '2023' },
  { achievement: 'BEST NEW STARTUP', org: 'TWIF', year: '2024' },
  { achievement: 'PRODUCT OF THE WEEK', org: 'Product Hunt', year: '2024' },
  { achievement: 'FEATURED', org: 'Awwwards', year: '2024' },
]

export function AuthoritySection() {
  return (
    <SectionThemeProvider sectionIndex={4}>
      <section
        data-section="authority"
        style={{
          width: '100%',
          minHeight: '100vh',
          background: 'var(--section-bg)',
          color: 'var(--section-text)',
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            flex: '0 0 40%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
        </div>

        <div
          style={{
            flex: '1 1 60%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <span style={{
            ...SECTION_FLAG,
            color: 'var(--section-text)',
            borderColor: 'var(--section-text)',
            opacity: 0.6,
          }}>
            THE AUTHORITY
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(5rem, 13vw, 16rem)',
              fontWeight: 400,
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'var(--section-text)',
              margin: '0 0 2rem 0',
            }}
          >
            PROVEN<br />CREW
          </h2>

          <div
            style={{
              marginBottom: '3rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--section-muted)',
                marginBottom: '1.5rem',
              }}
            >
              Flight History
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
            >
              {COMPANIES.map((company, i) => (
                <div
                  key={company}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 5vw, 5rem)',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    color: 'var(--section-text)',
                    borderBottom: i < COMPANIES.length - 1 ? '1px solid var(--section-border)' : 'none',
                    paddingBottom: '0.3rem',
                    paddingTop: '0.3rem',
                    opacity: 0.9,
                  }}
                >
                  {company}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--section-muted)',
                marginBottom: '1rem',
              }}
            >
              Recognition
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1px',
                background: 'var(--section-border)',
                maxWidth: '600px',
              }}
            >
              {AWARDS.map((award) => (
                <div
                  key={award.org}
                  style={{
                    background: 'var(--section-bg)',
                    padding: '1.5rem 1rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: '120px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
                      letterSpacing: '0.15em',
                      color: 'var(--section-muted)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {award.year}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.02em',
                      color: 'var(--section-text)',
                      lineHeight: 1.1,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {award.achievement}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(0.6rem, 0.8vw, 0.75rem)',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--section-muted)',
                    }}
                  >
                    {award.org}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionThemeProvider>
  )
}
