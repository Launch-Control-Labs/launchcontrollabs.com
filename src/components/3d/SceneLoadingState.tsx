'use client'
import { useEffect, useState } from 'react'

const BOOT_LINES = [
  'INITIALIZING CONTROL SYSTEMS...',
  'LOADING MISSION DATA...',
  'CALIBRATING DISPLAYS...',
  'SYSTEMS ONLINE',
]

export function SceneLoadingState() {
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((i) => Math.min(i + 1, BOOT_LINES.length - 1))
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#060E1C',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"IBM Plex Mono", monospace',
      }}
    >
      {/* Amber pulsing status bar */}
      <div
        style={{
          width: '2px',
          height: '40px',
          background: '#E5A832',
          marginBottom: '2rem',
          animation: 'pulse 1s ease-in-out infinite',
        }}
      />

      {/* Boot sequence lines */}
      <div style={{ textAlign: 'center' }}>
        {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
          <div
            key={i}
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              color: i === lineIndex ? '#E5A832' : '#8B9DB5',
              marginBottom: '0.4rem',
              opacity: i === lineIndex ? 1 : 0.5,
            }}
          >
            {line}
          </div>
        ))}
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
