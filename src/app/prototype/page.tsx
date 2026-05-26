'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useIsMobile } from '@/hooks/useIsMobile'
import { StaticHeroFallback } from '@/components/3d/StaticHeroFallback'
import { SceneErrorBoundary } from '@/components/3d/SceneErrorBoundary'
import { SceneLoadingState } from '@/components/3d/SceneLoadingState'

const ControlRoomScene = dynamic(
  () => import('@/components/3d/ControlRoomScene'),
  { ssr: false }
)

export default function PrototypePage() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <StaticHeroFallback />
  }

  return (
    <SceneErrorBoundary>
      <Suspense fallback={<SceneLoadingState />}>
        <ControlRoomScene />
      </Suspense>
    </SceneErrorBoundary>
  )
}
