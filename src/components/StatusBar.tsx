'use client'

import { useSceneStore } from '@/store/scene-store'
import { getBeatForProgress, type BeatName } from '@/config/camera-path'

const SECTION_NAMES = ['THE PROMISE', 'THE PROBLEM', 'THE GUIDE', 'THE PROOF', 'THE AUTHORITY', 'THE ORBIT']

const BEAT_TO_INDEX: Record<BeatName, number> = {
  preLaunch: 0,
  ascent: 1,
  orbit: 2,
  constellation: 3,
  deepSpace: 4,
  cta: 5,
}

export default function StatusBar() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const activeSection = BEAT_TO_INDEX[getBeatForProgress(scrollProgress)]
  const currentSectionName = SECTION_NAMES[activeSection] || 'THE PROMISE'

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem clamp(1rem, 3vw, 2rem)',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.75rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.6)',
    }}>
      <span style={{ fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.3em' }}>LAUNCH CONTROL</span>
      <span style={{ fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.3em', fontSize: '0.7rem' }}>
        {currentSectionName}
      </span>
      <span style={{ fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.3em' }}>LABS</span>
    </header>
  )
}
