'use client'

import { Html } from '@react-three/drei'
import { useEffect, useState } from 'react'
import type { MeshGroup } from './mesh-map'
import { PANEL_CONTENT } from '@/data/panel-content'

interface InfoPanelProps {
  group: MeshGroup
  position: [number, number, number]
  onClose: () => void
}

export function InfoPanel({ group, position, onClose }: InfoPanelProps) {
  const [visible, setVisible] = useState(false)
  const content = PANEL_CONTENT[group]

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey, { passive: true })
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!content) return null

  return (
    <Html
      position={position}
      center
      distanceFactor={8}
      zIndexRange={[100, 0]}
      style={{ pointerEvents: 'auto' }}
    >
      <div
        data-testid="info-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '280px',
          background: 'rgba(6, 14, 28, 0.95)',
          border: `1px solid rgba(229, 168, 50, ${visible ? '0.6' : '0'})`,
          borderRadius: '4px',
          padding: '1.5rem',
          fontFamily: '"IBM Plex Mono", monospace',
          color: '#D4DCE8',
          transform: `scale(${visible ? 1 : 0.9})`,
          opacity: visible ? 1 : 0,
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 0 40px rgba(229, 168, 50, 0.08), inset 0 1px 0 rgba(229, 168, 50, 0.1)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: '#E5A832', marginBottom: '0.25rem' }}>
              {content.subtitle.toUpperCase()}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.1em', color: '#D4DCE8' }}>
              {content.title}
            </div>
          </div>
          <button
            onClick={onClose}
            title="Close"
            style={{
              background: 'none',
              border: '1px solid rgba(229, 168, 50, 0.3)',
              color: '#8B9DB5',
              cursor: 'pointer',
              padding: '0.2rem 0.5rem',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              borderRadius: '2px',
              transition: 'all 0.15s',
            }}
          >
            ESC
          </button>
        </div>

        <div style={{ height: '1px', background: 'rgba(229, 168, 50, 0.15)', marginBottom: '1rem' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {content.items.map((item) => (
            <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
              <span style={{ fontSize: '0.6rem', color: '#E5A832', letterSpacing: '0.15em', minWidth: '60px', flexShrink: 0 }}>
                {item.label}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#D4DCE8', letterSpacing: '0.05em' }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {content.cta && (
          <a
            href={content.cta.href}
            style={{
              display: 'block',
              marginTop: '1.25rem',
              padding: '0.6rem 1rem',
              background: 'rgba(229, 168, 50, 0.1)',
              border: '1px solid rgba(229, 168, 50, 0.4)',
              color: '#E5A832',
              textDecoration: 'none',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textAlign: 'center',
              borderRadius: '2px',
              transition: 'all 0.15s',
            }}
          >
            {content.cta.text} →
          </a>
        )}
      </div>
    </Html>
  )
}
