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
  CONTROLS: {
    title: 'PROCESS',
    subtitle: 'How we operate',
    items: [
      { label: 'PHASE 1', value: 'Mission Brief' },
      { label: 'PHASE 2', value: 'Architecture' },
      { label: 'PHASE 3', value: 'Build & Deploy' },
      { label: 'PHASE 4', value: 'Monitor & Iterate' },
    ],
  },
}

export const PANEL_POSITIONS: Partial<Record<MeshGroup, [number, number, number]>> = {
  SCREENS:  [0, 300, 200],
  CONTROLS: [150, 200, 100],
}
