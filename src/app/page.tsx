'use client'

import { Suspense } from 'react'
import { useExperienceMode } from '@/hooks/useExperienceMode'
import { SceneErrorBoundary } from '@/components/3d/SceneErrorBoundary'
import { SceneLoadingState } from '@/components/3d/SceneLoadingState'
import StatusBar from '@/components/StatusBar'
import SectionNav from '@/components/SectionNav'
import CompanyTicker from '@/components/CompanyTicker'

import { ScrollJourney } from '@/components/ScrollJourney'
import { JourneyScene } from '@/components/journey/JourneyScene'
import { BeatOverlays } from '@/components/journey/BeatOverlays'
import { MobileExperience } from '@/components/MobileExperience'

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
      <CompanyTicker />

      <main id="main-content" data-experience-mode={experienceMode}>
        <div style={{ minHeight: '100vh', position: 'relative' }}>
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
            <div style={{ padding: '2rem', textAlign: 'center', color: '#22D3EE' }}>
              Static Content — Coming in Task 17
            </div>
          )}
        </div>
      </main>
    </>
  )
}
