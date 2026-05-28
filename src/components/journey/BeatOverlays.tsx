'use client'

import { BeatPreLaunch } from './BeatPreLaunch'
import { BeatServices } from './BeatServices'
import { BeatAscent } from './BeatAscent'
import { BeatOrbit } from './BeatOrbit'
import { BeatConstellation } from './BeatConstellation'
import { BeatAuthority } from './BeatAuthority'
import { BeatCTA } from './BeatCTA'

export function BeatOverlays() {
  return (
    <>
      <BeatPreLaunch />
      <BeatServices />
      <BeatAscent />
      <BeatOrbit />
      <BeatConstellation />
      <BeatAuthority />
      <BeatCTA />
    </>
  )
}
