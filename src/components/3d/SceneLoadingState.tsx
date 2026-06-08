'use client'
import { useEffect, useState } from 'react'
import { useSceneStore } from '@/store/scene-store'

interface SceneLoadingStateProps {
  onComplete?: () => void
}

export function SceneLoadingState({ onComplete }: SceneLoadingStateProps) {
  const [step, setStep] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const shuttleLoaded = useSceneStore((s) => s.shuttleLoaded)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((curr) => {
        if (curr < 2) {
          return curr + 1
        }
        if (curr === 2) {
          return 3
        }
        if (curr === 3 && shuttleLoaded) {
          return 4
        }
        return curr
      })
    }, 400)
    return () => clearInterval(interval)
  }, [shuttleLoaded])

  // React immediately to shuttle loaded state if we're already at step 3
  useEffect(() => {
    if (shuttleLoaded && step === 3) {
      setStep(4)
    }
  }, [shuttleLoaded, step])

  // Handle completion and fade out
  useEffect(() => {
    if (step === 4) {
      const fadeTimeout = setTimeout(() => {
        setIsFadingOut(true)
      }, 800) // Let the user read "SYSTEMS ONLINE"

      const completeTimeout = setTimeout(() => {
        onComplete?.()
      }, 1300) // fadeTimeout + 500ms css transition time

      return () => {
        clearTimeout(fadeTimeout)
        clearTimeout(completeTimeout)
      }
    }
  }, [step, onComplete])

  const visibleLines = [
    'INITIALIZING CONTROL SYSTEMS...',
    'LOADING MISSION DATA...',
    'CALIBRATING DISPLAYS...',
    step >= 3 ? (shuttleLoaded ? 'TELEMETRY LINK ACQUIRED' : 'ACQUIRING TELEMETRY LINK...') : null,
    step === 4 ? 'SYSTEMS ONLINE' : null,
  ].filter(Boolean) as string[]

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: '#060E1C',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"IBM Plex Mono", monospace',
        zIndex: 9999,
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isFadingOut ? 'none' : 'auto',
      }}
    >
      {/* Amber pulsing status bar */}
      <div
        style={{
          width: '2px',
          height: '40px',
          background: step === 4 ? '#22D3EE' : '#E5A832', // cyan when online, amber when loading
          marginBottom: '2rem',
          animation: step === 4 ? 'none' : 'pulse 1s ease-in-out infinite',
          transition: 'background-color 0.3s ease',
        }}
      />

      {/* Boot sequence lines */}
      <div style={{ textAlign: 'center', minHeight: '120px' }}>
        {visibleLines.map((line, i) => {
          const isLast = i === visibleLines.length - 1
          const isSystemOnline = line === 'SYSTEMS ONLINE'
          
          let color = '#8B9DB5'
          if (isLast) {
            color = isSystemOnline ? '#22D3EE' : '#E5A832'
          }

          return (
            <div
              key={i}
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: color,
                marginBottom: '0.6rem',
                opacity: isLast ? 1 : 0.5,
                transition: 'color 0.3s ease',
              }}
            >
              {line}
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
