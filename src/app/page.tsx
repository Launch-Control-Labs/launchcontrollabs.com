'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useIsMobile } from '@/hooks/useIsMobile'
import { SceneWrapper } from '@/components/3d/SceneWrapper'
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

const ControlRoomScene = dynamic(
  () => import('@/components/3d/ControlRoomScene'),
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
              <SceneWrapper>
                {(containerRef) => <ControlRoomScene containerRef={containerRef} />}
              </SceneWrapper>
            </Suspense>
          </SceneErrorBoundary>
        )}

        <section id="capabilities">
          <Capabilities />
        </section>

        <section id="projects">
          <MissionCards />
        </section>

        <section id="team">
          <TeamPedigree />
        </section>

        <section id="awards">
          <Awards />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: 'var(--space-5) 2rem',
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.6rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        <span>© 2026 Launch Control Labs</span>
        <span>Los Angeles, CA</span>
      </footer>
    </>
  )
}
