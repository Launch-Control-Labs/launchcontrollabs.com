'use client'

// NO imports from @react-three/fiber, @react-three/drei, three, gsap
// Pure React + CSS only

// ============================================================================
// MOBILE HERO
// ============================================================================
function MobileHero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(34,211,238,0.15) 0%, #020914 60%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(2rem, 5vw, 3rem)',
        position: 'relative',
        backgroundAttachment: 'fixed',
      }}
    >
      <div style={{ marginBottom: 'clamp(1rem, 3vh, 2rem)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.55rem, 2vw, 0.75rem)',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
            }}
          >
            Product Studio · Dallas · Barcelona · Miami
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.55rem, 2vw, 0.75rem)',
              letterSpacing: '0.2em',
              color: 'rgba(34,211,238,0.6)',
              textTransform: 'uppercase',
            }}
          >
            Est. 2021
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 12vw, 6rem)',
            lineHeight: 0.82,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            margin: 0,
            opacity: 0.95,
          }}
        >
          LAUNCH CONTROL
        </h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginTop: '-0.05em',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.55rem, 2vw, 0.85rem)',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              margin: 0,
              maxWidth: '24ch',
              lineHeight: 1.4,
            }}
          >
            From idea to shipped product. No guessing.
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 12vw, 6rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.01em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              margin: 0,
              opacity: 0.95,
              textShadow: '0 0 40px rgba(34, 211, 238, 0.25)',
            }}
          >
            LABS
          </h2>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// MOBILE PROBLEM
// ============================================================================
const CALLOUTS = [
  { label: 'INDUSTRY AVERAGE', value: '90%', suffix: 'FAIL' },
  { label: 'TIME TO FAILURE', value: '18', suffix: 'MONTHS' },
  { label: 'CAPITAL BURNED', value: '$1.2M', suffix: 'WASTED' },
]

function MobileProblem() {
  return (
    <section
      id="problem"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 20% 50%, rgba(220,38,38,0.1) 0%, #020914 60%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(2rem, 5vw, 3rem)',
        position: 'relative',
        backgroundAttachment: 'fixed',
      }}
    >
      <div style={{ maxWidth: '560px' }}>
        <span
          style={{
            display: 'inline-block',
            border: '1px solid #DC2626',
            padding: '0.3rem 0.8rem',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.55rem, 2vw, 0.75rem)',
            letterSpacing: '0.2em',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#DC2626',
            marginBottom: '1.5rem',
          }}
        >
          THE PROBLEM
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 400,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            margin: '0 0 1.5rem 0',
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
          }}
        >
          LOST IN SPACE
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 3vw, 1.25rem)',
            lineHeight: 1.6,
            letterSpacing: '0.02em',
            color: '#FFFFFF',
            margin: '0 0 2rem 0',
            opacity: 0.85,
            maxWidth: '480px',
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
          }}
        >
          Most products don&apos;t fail because of bad ideas. They fail because the right team 
          wasn&apos;t there to navigate the unknown. Without experienced operators who&apos;ve 
          been to orbit and back, even the best missions drift into the void.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(0.75rem, 2vw, 1rem)',
          }}
        >
          {CALLOUTS.map((callout) => (
            <div
              key={callout.label}
              style={{
                border: '1px solid #DC2626',
                padding: 'clamp(10px, 3vw, 16px) clamp(12px, 3vw, 20px)',
                background: 'rgba(220, 38, 38, 0.05)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.5rem, 1.5vw, 0.65rem)',
                  display: 'block',
                  letterSpacing: '0.2em',
                  color: '#DC2626',
                  marginBottom: '0.4rem',
                  opacity: 0.8,
                }}
              >
                {callout.label}
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                  fontWeight: 400,
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                }}
              >
                {callout.value}
                <span
                  style={{
                    display: 'block',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.5rem)',
                    marginTop: '0.2rem',
                  }}
                >
                  {callout.suffix}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// MOBILE GUIDE
// ============================================================================
const STATS = [
  { stat: '12', label: 'SHIPPED' },
  { stat: '47', label: 'LAUNCHED' },
  { stat: '3.2B', label: 'EVENTS/DAY' },
  { stat: '99.97%', label: 'UPTIME' },
]

function MobileGuide() {
  return (
    <section
      id="guide"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 80% 50%, rgba(37,99,235,0.1) 0%, #020914 60%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(2rem, 5vw, 3rem)',
        position: 'relative',
        backgroundAttachment: 'fixed',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 'clamp(1.5rem, 4vw, 2.5rem)',
          left: 'clamp(1.5rem, 4vw, 2rem)',
          display: 'inline-block',
          border: '1px solid #2563EB',
          padding: '0.3rem 0.8rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
          letterSpacing: '0.2em',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#2563EB',
          background: 'rgba(10, 10, 15, 0.8)',
        }}
      >
        THE GUIDE
      </span>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 10vw, 6rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          margin: '0 0 0.75rem 0',
          textAlign: 'center',
          textShadow: '0 2px 20px rgba(0,0,0,0.8)',
        }}
      >
        MISSION CAPABLE
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.75rem, 2.5vw, 1rem)',
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textAlign: 'center',
          maxWidth: '40ch',
          margin: '0 auto 2rem',
          lineHeight: 1.6,
        }}
      >
        Systems engineered for production. Numbers that prove it.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(120px, 180px))',
          gap: 'clamp(0.75rem, 2vw, 1.25rem)',
          justifyContent: 'center',
          marginTop: '1.5rem',
        }}
      >
        {STATS.map((item) => (
          <div
            key={item.label}
            style={{
              border: '1px solid #2563EB',
              background: 'rgba(10, 10, 15, 0.75)',
              padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1.25rem, 3vw, 2rem)',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                display: 'block',
                lineHeight: 1,
                color: '#2563EB',
                letterSpacing: '-0.02em',
              }}
            >
              {item.stat}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.55rem, 1.5vw, 0.7rem)',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                display: 'block',
                marginTop: '0.4rem',
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================================
// MOBILE PROOF
// ============================================================================
const TALISMAN_PROJECT = {
  name: 'TALISMAN',
  description: 'AI-powered accounting automation for modern finance teams. Graph-native architecture processing millions of transactions.',
  stats: [
    { value: '2.4M', label: 'TRANSACTIONS' },
    { value: '98.7%', label: 'UPTIME' },
    { value: '<200ms', label: 'P95 LATENCY' },
    { value: '47', label: 'ML MODELS' },
  ],
  techStack: ['NEXT.JS', 'NEO4J', 'LLMs'],
  status: 'ACTIVE',
}

const CLIENT_PROJECTS = [
  { num: '02', name: 'OBWS', desc: 'E-commerce marketplace connecting consumers with Black-owned businesses.', year: '2024', metric: 'MARKETPLACE' },
  { num: '03', name: 'HOMEMEDS', desc: 'Pharmacy medication management. Automated dose packaging.', year: '2024', metric: 'HEALTHCARE' },
  { num: '04', name: 'OPTION ONE', desc: 'Full-range plumbing services. CSR and field coordination.', year: '2025', metric: 'FIELD OPS' },
  { num: '05', name: 'SKY BOSS', desc: 'Aviation operations management. Fleet tracking, maintenance.', year: '2025', metric: 'AVIATION' },
  { num: '06', name: 'NPS.TODAY', desc: 'Net Promoter Score platform. Automated surveys and analytics.', year: '2024', metric: 'ANALYTICS' },
]

function MobileProof() {
  return (
    <section
      id="proof"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 30% 70%, rgba(245,158,11,0.1) 0%, #020914 60%)',
        color: '#FAFAFA',
        padding: 'clamp(2rem, 5vw, 3rem)',
        position: 'relative',
        backgroundAttachment: 'fixed',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          border: '2px solid #F59E0B',
          padding: '0.3rem 0.8rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
          letterSpacing: '0.25em',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#F59E0B',
          marginBottom: '1.5rem',
        }}
      >
        THE PROOF
      </span>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 10vw, 6rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#FAFAFA',
          margin: 0,
        }}
      >
        MISSIONS
      </h2>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 10vw, 6rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#F59E0B',
          margin: '0 0 2rem 0',
        }}
      >
        COMPLETE
      </h2>

      {/* Talisman Card */}
      <div
        style={{
          margin: 'clamp(1.5rem, 4vw, 2.5rem) 0',
          padding: 'clamp(1.25rem, 4vw, 2rem)',
          border: '3px solid #F59E0B',
          background: 'rgba(245, 158, 11, 0.05)',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 5vw, 3rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#FAFAFA',
            margin: '0 0 0.75rem 0',
          }}
        >
          {TALISMAN_PROJECT.name}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
            color: 'rgba(250, 250, 250, 0.7)',
            lineHeight: 1.6,
            maxWidth: '50ch',
            margin: '0 0 1.25rem 0',
          }}
        >
          {TALISMAN_PROJECT.description}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
            borderTop: '1px solid rgba(245, 158, 11, 0.3)',
            paddingTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          {TALISMAN_PROJECT.stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 4vw, 2rem)',
                  color: '#F59E0B',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.5rem, 1.5vw, 0.6rem)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(250, 250, 250, 0.5)',
                  marginTop: '0.4rem',
                  display: 'block',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {TALISMAN_PROJECT.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  border: '1px solid #F59E0B',
                  color: '#F59E0B',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
                  letterSpacing: '0.15em',
                  padding: '0.2rem 0.5rem',
                  textTransform: 'uppercase',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.5rem, 1.5vw, 0.55rem)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#FAFAFA',
              border: '2px solid rgba(245, 158, 11, 0.3)',
              padding: '0.2rem 0.6rem',
              fontWeight: 700,
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#34D399',
              }}
            />
            {TALISMAN_PROJECT.status}
          </span>
        </div>
      </div>

      {/* Client Projects */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.5rem, 1.5vw, 0.55rem)',
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(250, 250, 250, 0.4)',
          display: 'block',
          marginBottom: '1rem',
        }}
      >
        CLIENT WORK
      </span>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(0.75rem, 2vw, 1rem)',
        }}
      >
        {CLIENT_PROJECTS.map((project) => (
          <div
            key={project.num}
            style={{
              border: '2px solid #F59E0B',
              borderRadius: '50%',
              width: 'clamp(80px, 22vw, 120px)',
              height: 'clamp(80px, 22vw, 120px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              background: 'rgba(245, 158, 11, 0.03)',
              position: 'relative',
              margin: '0 auto',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '12%',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.4rem, 1.2vw, 0.5rem)',
                letterSpacing: '0.2em',
                color: '#F59E0B',
                opacity: 0.6,
              }}
            >
              {project.num}
            </span>

            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.65rem, 2vw, 0.9rem)',
                color: '#FAFAFA',
                textAlign: 'center',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              {project.name}
            </span>

            <span
              style={{
                fontSize: 'clamp(0.4rem, 1.2vw, 0.55rem)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#F59E0B',
                marginTop: '0.15rem',
              }}
            >
              {project.metric}
            </span>

            <span
              style={{
                position: 'absolute',
                bottom: '12%',
                fontSize: 'clamp(0.35rem, 1vw, 0.45rem)',
                letterSpacing: '0.2em',
                color: 'rgba(250, 250, 250, 0.4)',
              }}
            >
              {project.year}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================================
// MOBILE AUTHORITY
// ============================================================================
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

function MobileAuthority() {
  return (
    <section
      id="authority"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #020914 0%, #0a0a1a 100%)',
        color: '#FFFFFF',
        padding: 'clamp(2rem, 5vw, 3rem)',
        position: 'relative',
        backgroundAttachment: 'fixed',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          border: '1px solid rgba(255,255,255,0.4)',
          padding: '0.3rem 0.8rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
          letterSpacing: '0.25em',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: '1.5rem',
        }}
      >
        THE AUTHORITY
      </span>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 12vw, 8rem)',
          fontWeight: 400,
          lineHeight: 0.85,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          margin: '0 0 2rem 0',
        }}
      >
        PROVEN<br />CREW
      </h2>

      <div style={{ marginBottom: '2.5rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '1rem',
          }}
        >
          Flight History
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {COMPANIES.map((company, i) => (
            <div
              key={company}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 6vw, 4rem)',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                borderBottom: i < COMPANIES.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                paddingBottom: '0.25rem',
                paddingTop: '0.25rem',
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
            fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '0.75rem',
          }}
        >
          Recognition
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.1)',
            maxWidth: '400px',
          }}
        >
          {AWARDS.map((award) => (
            <div
              key={award.org}
              style={{
                background: 'rgba(0,0,0,0.9)',
                padding: '1rem 0.75rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '90px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.6rem, 1.5vw, 0.85rem)',
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '0.4rem',
                }}
              >
                {award.year}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  marginBottom: '0.2rem',
                }}
              >
                {award.achievement}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.5rem, 1.2vw, 0.65rem)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {award.org}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// MOBILE CTA
// ============================================================================
function MobileCTA() {
  return (
    <section
      id="cta"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(74,222,128,0.1) 0%, #020914 60%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(2rem, 5vw, 3rem)',
        position: 'relative',
        backgroundAttachment: 'fixed',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          border: '1px solid #4ADE80',
          padding: '0.3rem 0.8rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)',
          letterSpacing: '0.25em',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#4ADE80',
          marginBottom: '1.5rem',
        }}
      >
        THE ORBIT
      </span>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 10vw, 6rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          margin: '0 0 1rem 0',
          textAlign: 'center',
        }}
      >
        READY FOR<br />LAUNCH?
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.75rem, 2.5vw, 1rem)',
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textAlign: 'center',
          maxWidth: '35ch',
          margin: '0 auto 2rem',
          lineHeight: 1.6,
        }}
      >
        Let&apos;s discuss your mission. No commitment required.
      </p>

      <a
        href="mailto:hello@launchcontrollabs.com"
        style={{
          display: 'inline-block',
          border: '2px solid #4ADE80',
          padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
          letterSpacing: '0.2em',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#4ADE80',
          textDecoration: 'none',
          background: 'rgba(74, 222, 128, 0.05)',
          transition: 'background 0.2s ease',
        }}
      >
        hello@launchcontrollabs.com
      </a>
    </section>
  )
}

// ============================================================================
// MOBILE EXPERIENCE (Main Export)
// ============================================================================
export function MobileExperience() {
  return (
    <main style={{ background: '#020914', color: '#FFFFFF' }}>
      <MobileHero />
      <MobileProblem />
      <MobileGuide />
      <MobileProof />
      <MobileAuthority />
      <MobileCTA />
    </main>
  )
}
