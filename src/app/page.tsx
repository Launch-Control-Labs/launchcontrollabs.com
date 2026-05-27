'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useIsMobile } from '@/hooks/useIsMobile'
import { SceneErrorBoundary } from '@/components/3d/SceneErrorBoundary'
import { SceneLoadingState } from '@/components/3d/SceneLoadingState'
import { StaticHeroFallback } from '@/components/3d/StaticHeroFallback'
import StatusBar from '@/components/StatusBar'
import SectionNav from '@/components/SectionNav'
import CompanyTicker from '@/components/CompanyTicker'
import Capabilities from '@/components/Capabilities'
import MissionCards from '@/components/MissionCards'
import Awards from '@/components/Awards'
import TeamPedigree from '@/components/TeamPedigree'
import Contact from '@/components/Contact'
import { HeroOverlay } from '@/components/HeroOverlay'

const ScrollScene = dynamic(
  () => import('@/components/ScrollScene').then((m) => ({ default: m.ScrollScene })),
  { ssr: false, loading: () => <SceneLoadingState /> }
)

export default function Home() {
  const isMobile = useIsMobile()

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

      <main id="main-content">
        <div style={{ minHeight: '100vh', position: 'relative' }}>
          {isMobile ? (
            <StaticHeroFallback />
          ) : (
            <SceneErrorBoundary>
              <Suspense fallback={<SceneLoadingState />}>
                <ScrollScene>
                  <HeroOverlay />
                </ScrollScene>
              </Suspense>
            </SceneErrorBoundary>
          )}
        </div>

        <section id="capabilities" style={{ marginTop: 0 }}>
          <Capabilities />
        </section>

        <section id="projects" style={{ marginTop: 0 }}>
          <MissionCards />
        </section>

        <section id="team" style={{ marginTop: 0 }}>
          <TeamPedigree />
        </section>

        <section id="awards" style={{ marginTop: 0 }}>
          <Awards />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  )
}
