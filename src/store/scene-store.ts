/**
 * scene-store.ts — Zustand store for 3D scene interaction state
 *
 * Manages:
 * - activePanel: which info panel is currently open (only one at a time)
 * - hoveredGroup: which mesh group is being hovered (for highlight effects)
 * - interactionEnabled: whether click events are active (disabled during scroll/camera animation)
 */

import { create } from 'zustand'
import type { MeshGroup } from '@/components/3d/mesh-map'

interface SceneState {
  activePanel: MeshGroup | null
  hoveredGroup: MeshGroup | null
  interactionEnabled: boolean
  setActivePanel: (group: MeshGroup | null) => void
  setHoveredGroup: (group: MeshGroup | null) => void
  setInteractionEnabled: (enabled: boolean) => void
}

export const useSceneStore = create<SceneState>((set) => ({
  activePanel: null,
  hoveredGroup: null,
  interactionEnabled: false,
  setActivePanel: (group) => set({ activePanel: group }),
  setHoveredGroup: (group) => set({ hoveredGroup: group }),
  setInteractionEnabled: (enabled) => set({ interactionEnabled: enabled }),
}))
