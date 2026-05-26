import { InfoPanel } from '../InfoPanel'
import type { MeshGroup } from '../mesh-map'

interface StationPanelProps {
  onClose: () => void
}

export function StationPanel({ onClose }: StationPanelProps) {
  return (
    <InfoPanel
      group={'STATIONS' as MeshGroup}
      position={[2, 2.5, 0]}
      onClose={onClose}
    />
  )
}
