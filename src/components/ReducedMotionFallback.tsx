'use client'

import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ReducedMotionFallbackProps {
  sectionNumber?: number
  children?: React.ReactNode
}

export function ReducedMotionFallback({
  sectionNumber = 1,
  children,
}: ReducedMotionFallbackProps) {
  const prefersReduced = useReducedMotion()

  if (!prefersReduced) {
    return <>{children}</>
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'var(--section-bg, #060E1C)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Canvas wrapper hidden for reduced motion */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'none',
        }}
        aria-hidden="true"
      >
        {/* Canvas elements would be here */}
      </div>

      {/* Static fallback content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '90%',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 300,
            letterSpacing: '0.1em',
            color: '#22D3EE',
            marginBottom: '1rem',
            fontFamily: '"IBM Plex Sans", sans-serif',
          }}
        >
          Section {sectionNumber}
        </h2>

        {/* Placeholder for static WebP image */}
        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            aspectRatio: '16 / 9',
            background: 'rgba(34, 211, 238, 0.05)',
            border: '1px solid rgba(34, 211, 238, 0.1)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.875rem',
            color: 'rgba(34, 211, 238, 0.4)',
          }}
        >
          {/* Fallback image would load from /public/fallbacks/section-{n}.webp */}
          Static Content
        </div>

        {/* Text content remains accessible */}
        <div
          style={{
            color: '#8B9DB5',
            lineHeight: 1.6,
            fontSize: '0.95rem',
            fontFamily: '"IBM Plex Sans", sans-serif',
          }}
        >
          <p>All content is accessible without animations.</p>
        </div>
      </div>
    </div>
  )
}
