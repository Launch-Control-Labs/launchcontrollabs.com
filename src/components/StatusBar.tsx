'use client'

import { useSceneStore } from '@/store/scene-store'
import { Logo } from '@/components/Logo'

const SECTION_NAMES = ['THE PROMISE', 'SERVICES', 'THE PROBLEM', 'THE GUIDE', 'THE PROOF', 'THE AUTHORITY', 'THE ORBIT']

function getBeatIndex(progress: number): number {
  if (progress < 0.12) return 0
  if (progress < 0.26) return 1
  if (progress < 0.40) return 2
  if (progress < 0.56) return 3
  if (progress < 0.72) return 4
  if (progress < 0.88) return 5
  return 6
}

export default function StatusBar() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress)
  const activeSection = getBeatIndex(scrollProgress)
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Logo size={32} />
        <span style={{ fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.3em' }}>LAUNCH CONTROL</span>
      </div>
      <span style={{ fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.3em', fontSize: '0.7rem' }}>
        {currentSectionName}
      </span>
      <span style={{ fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.3em' }}>LABS</span>
    </header>
  )
}
