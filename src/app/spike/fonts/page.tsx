'use client'

import { Space_Grotesk, Anton, Bebas_Neue } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-grotesk',
})

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-anton',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas-neue',
})

export default function FontComparison() {
  const testTexts = ['LAUNCH CONTROL', 'MISSION COMPLETE', 'FROM IDEA TO ORBIT']
  const displaySize = 'clamp(4.5rem, 13vw, 13rem)'

  return (
    <div
      style={{
        backgroundColor: '#080810',
        color: '#E5EBF2',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'IBM Plex Mono, monospace',
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 400 }}>
          Font Validation Spike
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#8BA0B5', marginBottom: '2rem' }}>
          Comparing Space Grotesk, Anton, and Bebas Neue at ESPN editorial scale (13vw)
        </p>
      </div>

      {/* Font Comparison Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Space Grotesk */}
        <div style={{ marginBottom: '6rem' }}>
          <div
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#4B5C6B',
              marginBottom: '1rem',
            }}
          >
            Space Grotesk (Bold 700)
          </div>
          <div
            className={spaceGrotesk.className}
            style={{
              fontSize: displaySize,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            {testTexts[0]}
          </div>
          <div
            className={spaceGrotesk.className}
            style={{
              fontSize: displaySize,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            {testTexts[1]}
          </div>
          <div
            className={spaceGrotesk.className}
            style={{
              fontSize: displaySize,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {testTexts[2]}
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#8BA0B5',
              marginTop: '1rem',
              fontStyle: 'italic',
            }}
          >
            Assessment: Geometric, space-themed DNA. Bold weight provides presence but may feel lighter than
            competitors at extreme scale.
          </div>
        </div>

        {/* Anton */}
        <div style={{ marginBottom: '6rem' }}>
          <div
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#4B5C6B',
              marginBottom: '1rem',
            }}
          >
            Anton (Regular 400)
          </div>
          <div
            className={anton.className}
            style={{
              fontSize: displaySize,
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            {testTexts[0]}
          </div>
          <div
            className={anton.className}
            style={{
              fontSize: displaySize,
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            {testTexts[1]}
          </div>
          <div
            className={anton.className}
            style={{
              fontSize: displaySize,
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {testTexts[2]}
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#8BA0B5',
              marginTop: '1rem',
              fontStyle: 'italic',
            }}
          >
            Assessment: Ultra-bold condensed. Maximum ESPN impact. Dominates screen at any scale. Single weight
            only.
          </div>
        </div>

        {/* Bebas Neue (Current) */}
        <div style={{ marginBottom: '6rem' }}>
          <div
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#4B5C6B',
              marginBottom: '1rem',
            }}
          >
            Bebas Neue (Current, Regular 400)
          </div>
          <div
            className={bebasNeue.className}
            style={{
              fontSize: displaySize,
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            {testTexts[0]}
          </div>
          <div
            className={bebasNeue.className}
            style={{
              fontSize: displaySize,
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            {testTexts[1]}
          </div>
          <div
            className={bebasNeue.className}
            style={{
              fontSize: displaySize,
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {testTexts[2]}
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#8BA0B5',
              marginTop: '1rem',
              fontStyle: 'italic',
            }}
          >
            Assessment: Current baseline. Strong presence. Dated feel. Single weight. Needs replacement.
          </div>
        </div>

        {/* Metadata */}
        <div
          style={{
            marginTop: '6rem',
            paddingTop: '2rem',
            borderTop: '1px solid #2A2A5A',
            fontSize: '0.75rem',
            color: '#4B5C6B',
          }}
        >
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Viewport Scale:</strong> clamp(4.5rem, 13vw, 13rem)
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>At 1440px:</strong> ~187px | <strong>At 768px:</strong> ~100px | <strong>At 375px:</strong> ~49px
          </p>
          <p>
            <strong>Background:</strong> #080810 (Alpine palette) | <strong>Text:</strong> #E5EBF2
          </p>
        </div>
      </div>
    </div>
  )
}
