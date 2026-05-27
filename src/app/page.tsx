'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useIsMobile } from '@/hooks/useIsMobile'
import { SceneErrorBoundary } from '@/components/3d/SceneErrorBoundary'
import { SceneLoadingState } from '@/components/3d/SceneLoadingState'
import { StaticHeroFallback } from '@/components/3d/StaticHeroFallback'
import StatusBar from '@/components/StatusBar'
import CompanyTicker from '@/components/CompanyTicker'
import Capabilities from '@/components/Capabilities'
import MissionCards from '@/components/MissionCards'
import Awards from '@/components/Awards'
import TeamPedigree from '@/components/TeamPedigree'
import Contact from '@/components/Contact'
import { HeroOverlay } from '@/components/HeroOverlay'

const ScrollScene = dynamic(
  () => import('@/components/ScrollScene').then((m) => ({ default: m.ScrollScene })),
  { ssr: false }
)

export default function Home() {
  const isMobile = useIsMobile()

  return (
    <>
      <StatusBar />
      <CompanyTicker />

      <main>
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
