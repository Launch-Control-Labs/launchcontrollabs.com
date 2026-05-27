'use client'

import { useEffect, useRef } from 'react'
import { SectionThemeProvider } from '@/components/SectionThemeProvider'

function useFitty(deps: unknown[] = []) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    const fit = () => {
      el.style.fontSize = '999px'
      const ratio = el.parentElement!.clientWidth / el.scrollWidth
      el.style.fontSize = Math.floor(999 * ratio) + 'px'
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el.parentElement!)
    return () => ro.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

export function HeroOverlay() {
  const h1Ref = useFitty()
  const h2Ref = useFitty()

  return (
    <SectionThemeProvider sectionIndex={0}>
      <div
        data-section="hero"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div style={{ padding: '0', paddingBottom: 'clamp(0.5rem, 1.5vh, 1.2rem)' }}>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '0.3rem',
            paddingLeft: '0.1em',
            paddingRight: '0.1em',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6rem, 1vw, 0.85rem)',
              letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
            }}>
              Product Studio · Dallas · Barcelona · Miami
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6rem, 1vw, 0.85rem)',
              letterSpacing: '0.25em',
              color: 'rgba(34,211,238,0.6)',
              textTransform: 'uppercase',
            }}>
              Est. 2021
            </span>
          </div>

          <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0.82 }}>
            <h1
              ref={h1Ref as React.RefObject<HTMLHeadingElement>}
              style={{
                fontFamily: 'var(--font-display)',
                lineHeight: 0.82,
                letterSpacing: '-0.04em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                margin: 0,
                opacity: 0.95,
                whiteSpace: 'nowrap',
                display: 'inline-block',
              }}
            >
              LAUNCH CONTROL
            </h1>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginTop: '-0.06em',
            width: '100%',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6rem, 1.1vw, 1rem)',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              margin: 0,
              maxWidth: '28ch',
              lineHeight: 1.4,
            }}>
              From idea to shipped product. No guessing.
            </p>
            <div style={{ overflow: 'hidden', lineHeight: 0.82 }}>
              <h2
                ref={h2Ref as React.RefObject<HTMLHeadingElement>}
                style={{
                  fontFamily: 'var(--font-display)',
                  lineHeight: 0.82,
                  letterSpacing: '-0.01em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  margin: 0,
                  opacity: 0.95,
                  textShadow: '0 0 60px rgba(34, 211, 238, 0.25)',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                }}
              >
                LABS
              </h2>
            </div>
          </div>

        </div>
      </div>
    </SectionThemeProvider>
  )
}
