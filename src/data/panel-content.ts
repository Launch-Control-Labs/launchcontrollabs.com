import type { MeshGroup } from '@/components/3d/mesh-map'

export interface PanelContent {
  title: string
  subtitle: string
  items: { label: string; value: string }[]
  cta?: { text: string; href: string }
}

export const PANEL_CONTENT: Partial<Record<MeshGroup, PanelContent>> = {
  SCREENS: {
    title: 'SERVICES',
    subtitle: 'What we build',
    items: [
      { label: '01', value: 'AI-Powered Products' },
      { label: '02', value: 'Full-Stack Web Apps' },
      { label: '03', value: 'Automation Systems' },
      { label: '04', value: 'Data Pipelines' },
    ],
    cta: { text: 'START A MISSION', href: 'mailto:hello@launchcontrollabs.com' },
  },
  CONSOLES: {
    title: 'STACK',
    subtitle: 'Mission-critical tools',
    items: [
      { label: 'FRONTEND', value: 'Next.js · React · Three.js' },
      { label: 'BACKEND', value: 'Node · Python · Go' },
      { label: 'AI/ML', value: 'LLMs · RAG · Agents' },
      { label: 'INFRA', value: 'AWS · Vercel · Docker' },
    ],
  },
  STATIONS: {
    title: 'CONTACT',
    subtitle: 'Open a channel',
    items: [
      { label: 'EMAIL', value: 'hello@launchcontrollabs.com' },
      { label: 'GITHUB', value: 'Launch-Control-Labs' },
      { label: 'STATUS', value: 'ACCEPTING MISSIONS' },
    ],
    cta: { text: 'INITIATE CONTACT', href: 'mailto:hello@launchcontrollabs.com' },
  },
  KEYBOARDS: {
    title: 'PROCESS',
    subtitle: 'How we operate',
    items: [
      { label: 'PHASE 1', value: 'Mission Brief' },
      { label: 'PHASE 2', value: 'Architecture' },
      { label: 'PHASE 3', value: 'Build & Deploy' },
      { label: 'PHASE 4', value: 'Monitor & Iterate' },
    ],
  },
  LIGHTS: {
    title: 'SYSTEMS',
    subtitle: 'All systems nominal',
    items: [
       { label: 'UPTIME', value: 'Monitored · 30d' },
      { label: 'DEPLOYMENTS', value: '24/7 CI/CD' },
      { label: 'MONITORING', value: 'Real-time alerts' },
      { label: 'SECURITY', value: 'SOC2 practices' },
    ],
  },
}

export const PANEL_POSITIONS: Partial<Record<MeshGroup, [number, number, number]>> = {
  SCREENS: [0, 3, -1],
  CONSOLES: [-2, 2.5, 0],
  STATIONS: [2, 2.5, 0],
  KEYBOARDS: [0, 2, 1],
  LIGHTS: [0, 4, -2],
}
