'use client'

interface SectionSkeletonProps {
  sectionNumber?: number
  colorTheme?: string
}

export function SectionSkeleton({
  sectionNumber = 1,
  colorTheme = '#22D3EE',
}: SectionSkeletonProps) {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: `var(--section-bg, #060E1C)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle pulse overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, ${colorTheme}08 0%, transparent 70%)`,
          animation: 'skeletonPulse 2s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Section number placeholder */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '3rem',
            fontWeight: 300,
            letterSpacing: '0.1em',
            color: colorTheme,
            opacity: 0.3,
            marginBottom: '1rem',
            fontFamily: '"IBM Plex Mono", monospace',
          }}
        >
          SECTION {sectionNumber.toString().padStart(2, '0')}
        </div>

        {/* Skeleton bars */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '200px',
              height: '12px',
              background: colorTheme,
              opacity: 0.15,
              borderRadius: '2px',
              animation: 'skeletonPulse 2s ease-in-out infinite',
            }}
          />
          <div
            style={{
              width: '150px',
              height: '12px',
              background: colorTheme,
              opacity: 0.1,
              borderRadius: '2px',
              animation: 'skeletonPulse 2s ease-in-out infinite 0.2s',
            }}
          />
          <div
            style={{
              width: '180px',
              height: '12px',
              background: colorTheme,
              opacity: 0.12,
              borderRadius: '2px',
              animation: 'skeletonPulse 2s ease-in-out infinite 0.4s',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes skeletonPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
