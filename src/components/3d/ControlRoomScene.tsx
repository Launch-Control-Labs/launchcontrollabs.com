'use client'

import { Suspense, useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { ScrollCamera } from './ScrollCamera'
import { InteractiveRoom } from './InteractiveRoom'
import { InfoPanel } from './InfoPanel'
import { useSceneStore } from '@/store/scene-store'
import { PANEL_POSITIONS } from '@/data/panel-content'
import type { MeshGroup } from './mesh-map'
import type { ThreeEvent } from '@react-three/fiber'

interface ControlRoomSceneProps {
  containerRef: React.RefObject<HTMLElement | null>
}

function SceneContent({ containerRef }: ControlRoomSceneProps) {
  const activePanel = useSceneStore((s) => s.activePanel)
  const interactionEnabled = useSceneStore((s) => s.interactionEnabled)
  const setActivePanel = useSceneStore((s) => s.setActivePanel)
  const setHoveredGroup = useSceneStore((s) => s.setHoveredGroup)
  const setInteractionEnabled = useSceneStore((s) => s.setInteractionEnabled)

  useEffect(() => {
    setActivePanel(null)
    setHoveredGroup(null)
    setInteractionEnabled(false)
    return () => {
      setActivePanel(null)
      setHoveredGroup(null)
      setInteractionEnabled(false)
    }
  }, [setActivePanel, setHoveredGroup, setInteractionEnabled])

  const handleClose = useCallback(() => setActivePanel(null), [setActivePanel])

  const handleGroupClick = (group: MeshGroup, _event: ThreeEvent<MouseEvent>) => {
    if (!interactionEnabled) return
    // Toggle: clicking active panel's group closes it
    setActivePanel(activePanel === group ? null : group)
  }

  const handleGroupHover = (group: MeshGroup | null) => {
    if (!interactionEnabled) return
    setHoveredGroup(group)
  }

  return (
    <>
      <ScrollCamera containerRef={containerRef} />

      <Suspense fallback={null}>
        <InteractiveRoom
          onGroupClick={handleGroupClick}
          onGroupHover={handleGroupHover}
        />

        {activePanel && PANEL_POSITIONS[activePanel] && (
          <InfoPanel
            group={activePanel}
            position={PANEL_POSITIONS[activePanel]!}
            onClose={handleClose}
          />
        )}
      </Suspense>

      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.8} luminanceSmoothing={0.9} mipmapBlur />
        <Noise opacity={0.015} />
        <Vignette darkness={0.4} offset={0.5} />
      </EffectComposer>
    </>
  )
}

export default function ControlRoomScene({ containerRef }: ControlRoomSceneProps) {
  const setActivePanel = useSceneStore((s) => s.setActivePanel)

  return (
    <div style={{ width: '100%', height: '100%', background: '#000000' }}>
      <Canvas
        onPointerMissed={() => setActivePanel(null)}
        gl={{
          antialias: false,
          alpha: false,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.NoToneMapping,
        }}
        camera={{ position: [6, 3, 8], fov: 50 }}
      >
        <SceneContent containerRef={containerRef} />
      </Canvas>
    </div>
  )
}
