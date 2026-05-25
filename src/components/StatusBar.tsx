'use client'

import { useEffect, useState } from 'react'

interface Telemetry {
  status: string
  activeMissions: number
  lastDeploy: string
  location: string
  responseTime: string
}

export default function StatusBar() {
  const [telemetry, setTelemetry] = useState<Telemetry | null>(null)

  useEffect(() => {
    fetch('/api/telemetry')
      .then((r) => r.json())
      .then(setTelemetry)
      .catch(() => {
        // Fail silently — static fallback shown
      })
  }, [])

  const location = telemetry?.location ?? 'LOS ANGELES · REMOTE'
  const missions = telemetry?.activeMissions ?? 3

  return (
    <header className="status-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span className="status-dot" aria-label="Systems nominal" />
        <span>SYSTEMS NOMINAL</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <span>{missions} ACTIVE MISSIONS</span>
        <span>{location.toUpperCase()}</span>
      </div>
    </header>
  )
}
