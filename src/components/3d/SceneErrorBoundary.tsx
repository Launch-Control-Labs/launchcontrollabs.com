'use client'
import React from 'react'

interface State {
  hasError: boolean
  error?: Error
}

export class SceneErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  State
> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.warn('[LCL] WebGL scene failed:', error.message)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <WebGLFallback />
    }
    return this.props.children
  }
}

function WebGLFallback() {
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
        color: '#E5A832',
      }}
    >
      <div
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          opacity: 0.6,
          marginBottom: '1rem',
        }}
      >
        LAUNCH CONTROL LABS
      </div>
      <div style={{ fontSize: '1rem', color: '#D4DCE8' }}>
        3D SYSTEMS OFFLINE
      </div>
      <div
        style={{
          fontSize: '0.7rem',
          marginTop: '0.5rem',
          opacity: 0.5,
          color: '#8B9DB5',
        }}
      >
        WebGL unavailable — enable hardware acceleration
      </div>
    </div>
  )
}
