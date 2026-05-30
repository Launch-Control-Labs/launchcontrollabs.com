'use client'

import { Suspense } from 'react'
import { useExperienceMode } from '@/hooks/useExperienceMode'
import { SceneErrorBoundary } from '@/components/3d/SceneErrorBoundary'
import { SceneLoadingState } from '@/components/3d/SceneLoadingState'
import StatusBar from '@/components/StatusBar'
import SectionNav from '@/components/SectionNav'
import { ScrollJourney } from '@/components/ScrollJourney'
import { JourneyScene } from '@/components/journey/JourneyScene'
import { BeatOverlays } from '@/components/journey/BeatOverlays'
import { Logo } from '@/components/Logo'
import { MobileExperience } from '@/components/MobileExperience'
import { StaticContent } from '@/components/StaticContent'
import { SmoothScrollProvider } from '@/components/SmoothScroll'

export default function Home() {
  const experienceMode = useExperienceMode()

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-[#080810] focus:text-[#22D3EE] focus:px-4 focus:py-2 focus:border focus:border-[#22D3EE] focus:rounded focus:text-sm focus:no-underline"
      >
        Skip to content
      </a>
      <StatusBar />
      <SectionNav />

      <SmoothScrollProvider>
        <main id="main-content" data-experience-mode={experienceMode}>
          <div
            className={experienceMode === '2d-parallax' ? 'mobile-journey-shell' : undefined}
            style={
              experienceMode === '2d-parallax'
                ? { position: 'relative' }
                : { minHeight: '100vh', position: 'relative' }
            }
          >
            {experienceMode === '3d' ? (
              <SceneErrorBoundary>
                <Suspense fallback={<SceneLoadingState />}>
                  <ScrollJourney scene={<JourneyScene />}>
                    <BeatOverlays />
                  </ScrollJourney>
                </Suspense>
              </SceneErrorBoundary>
            ) : experienceMode === '2d-parallax' ? (
              <MobileExperience />
            ) : (
              <StaticContent />
            )}
          </div>

          {experienceMode !== '2d-parallax' ? (
          <section
            style={{
              minHeight: '100vh',
              background: '#020914',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(3rem, 6vw, 5rem)',
            }}
          >
            <div style={{ opacity: 0.7, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Logo size={160} />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  letterSpacing: '0.1em',
                  color: '#FFFFFF',
                  marginTop: '1.5rem',
                  textTransform: 'uppercase',
                }}
              >
                LAUNCH CONTROL LABS
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)',
                  letterSpacing: '0.25em',
                  color: 'rgba(255,255,255,0.4)',
                  marginTop: '0.5rem',
                  textTransform: 'uppercase',
                }}
              >
                Dallas, TX · Est. 2021
              </span>
            </div>
          </section>
          ) : null}
        </main>
      </SmoothScrollProvider>
    </>
  )
}
