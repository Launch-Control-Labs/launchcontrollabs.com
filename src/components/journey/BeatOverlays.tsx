'use client'

import { BeatPreLaunch } from './BeatPreLaunch'
import { BeatAscent } from './BeatAscent'
import { BeatOrbit } from './BeatOrbit'
import { BeatConstellation } from './BeatConstellation'
import { BeatAuthority } from './BeatAuthority'
import { BeatCTA } from './BeatCTA'

export function BeatOverlays() {
  return (
    <>
      <BeatPreLaunch />
      <BeatAscent />
      <BeatOrbit />
      <BeatConstellation />
      <BeatAuthority />
      <BeatCTA />
    </>
  )
}
