'use client'

import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { InteractiveRoom } from '../InteractiveRoom'
import { Particles } from '../Particles'
import { useDeviceTier } from '@/hooks/useDeviceTier'

export function HeroScene() {
  const tier = useDeviceTier()

  return (
    <group>
      {/* Cinematic 3-light setup */}
      <directionalLight position={[80, 40, 60]} intensity={2.5} color="#ffffff" />
      <hemisphereLight args={['#1a1a3e', '#020914', 0.4]} />
      <pointLight position={[-40, 20, 40]} intensity={1.2} color="#22d3ee" distance={200} />
      {/* Back rim — separates shuttle from background */}
      <pointLight position={[0, -5, -25]} intensity={0.6} color="#22d3ee" distance={60} />

      <Suspense fallback={null}>
        <Environment preset="night" background={false} />
        <InteractiveRoom />
        <Particles />
      </Suspense>

      {/* Atmospheric depth fog */}
      <fogExp2 attach="fog" args={['#020914', 0.008]} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.4} mipmapBlur />
      </EffectComposer>
    </group>
  )
}
