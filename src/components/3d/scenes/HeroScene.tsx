'use client'

import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { InteractiveRoom } from '../InteractiveRoom'
import { Particles } from '../Particles'

/** Section 0 — Control room with falcon-9 + astronaut models */
export function HeroScene() {
  return (
    <group>
      <directionalLight position={[80, 40, 60]} intensity={1.8} color="#ffffff" />
      <hemisphereLight args={['#0d1a3a', '#020914', 0.2]} />
      <pointLight position={[-40, 20, 40]} intensity={0.7} color="#22d3ee" distance={120} />
      <pointLight position={[7, 3, -10]} intensity={1.2} color="#ffffff" distance={40} />

      <Suspense fallback={null}>
        <Environment preset="night" background={false} />
        <InteractiveRoom />
        <Particles />
      </Suspense>

      <fogExp2 attach="fog" args={['#020914', 0.003]} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.85} luminanceSmoothing={0.9} intensity={0.2} mipmapBlur />
      </EffectComposer>
    </group>
  )
}
