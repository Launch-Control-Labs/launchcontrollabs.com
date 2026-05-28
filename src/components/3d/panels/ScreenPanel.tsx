import { InfoPanel } from '../InfoPanel'
import type { MeshGroup } from '../mesh-map'

interface ScreenPanelProps {
  onClose: () => void
}

export function ScreenPanel({ onClose }: ScreenPanelProps) {
  return (
    <InfoPanel
      group={'SCREENS' as MeshGroup}
      position={[0, 3, -1]}
      onClose={onClose}
    />
  )
}
