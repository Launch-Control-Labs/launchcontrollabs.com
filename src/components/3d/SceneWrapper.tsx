'use client'

import { useRef } from 'react'

interface SceneWrapperProps {
  children: (containerRef: React.RefObject<HTMLDivElement | null>) => React.ReactNode
}

export function SceneWrapper({ children }: SceneWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100vh' }}
      >
        {children(containerRef)}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '0.65rem',
        letterSpacing: '0.25em',
        color: '#E5A832',
        opacity: 0.7,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        animation: 'fadeInOut 2s ease-in-out infinite',
        pointerEvents: 'none',
      }}>
        SCROLL TO ENTER
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="7" y="4" width="2" height="8" rx="1" fill="#E5A832" />
          <path d="M4 16L8 20L12 16" stroke="#E5A832" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) translateY(0); }
          50% { opacity: 0.8; transform: translateX(-50%) translateY(4px); }
        }
      `}</style>
    </div>
  )
}
