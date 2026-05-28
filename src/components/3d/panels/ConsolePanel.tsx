import { InfoPanel } from '../InfoPanel'
import type { MeshGroup } from '../mesh-map'

interface ConsolePanelProps {
  onClose: () => void
}

export function ConsolePanel({ onClose }: ConsolePanelProps) {
  return (
    <InfoPanel
      group={'CONSOLES' as MeshGroup}
      position={[-2, 2.5, 0]}
      onClose={onClose}
    />
  )
}
