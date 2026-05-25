import { NextResponse } from 'next/server'

export interface TelemetryResponse {
  status: 'nominal' | 'degraded' | 'offline'
  activeMissions: number
  lastDeploy: string
  location: string
  responseTime: string
}

export async function GET() {
  const data: TelemetryResponse = {
    status: 'nominal',
    activeMissions: 3,
    lastDeploy: '2 hours ago',
    location: 'Los Angeles · Remote',
    responseTime: '< 4 hours',
  }

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}
