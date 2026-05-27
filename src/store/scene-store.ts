import { create } from 'zustand'
import type { MeshGroup } from '@/components/3d/mesh-map'

export const SECTION_COUNT = 6
export const MAX_LOADED_SCENES = 2

interface SceneState {
  activePanel: MeshGroup | null
  hoveredGroup: MeshGroup | null
  interactionEnabled: boolean
  deviceTier: 1 | 2 | 3

  activeSection: number
  scrollProgress: number
  loadingSection: number | null
  loadedSections: number[]

  setActivePanel: (group: MeshGroup | null) => void
  setHoveredGroup: (group: MeshGroup | null) => void
  setInteractionEnabled: (enabled: boolean) => void
  setDeviceTier: (tier: 1 | 2 | 3) => void
  setActiveSection: (section: number) => void
  setScrollProgress: (progress: number) => void
  setLoadingSection: (section: number | null) => void
  markSectionLoaded: (section: number) => void
  setLoadedSections: (sections: number[]) => void
}

export const useSceneStore = create<SceneState>((set, get) => ({
  activePanel: null,
  hoveredGroup: null,
  interactionEnabled: false,
  deviceTier: 2,

  activeSection: 0,
  scrollProgress: 0,
  loadingSection: null,
  loadedSections: [0],

  setActivePanel: (group) => set({ activePanel: group }),
  setHoveredGroup: (group) => set({ hoveredGroup: group }),
  setInteractionEnabled: (enabled) => set({ interactionEnabled: enabled }),
  setDeviceTier: (tier) => set({ deviceTier: tier }),
  setActiveSection: (section) => set({ activeSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setLoadingSection: (section) => set({ loadingSection: section }),
  markSectionLoaded: (section) => {
    const { loadedSections } = get()
    if (loadedSections.includes(section)) return
    const next = [...loadedSections, section]
    if (next.length > MAX_LOADED_SCENES) {
      next.shift()
    }
    set({ loadedSections: next, loadingSection: null })
  },
  setLoadedSections: (sections) => set({ loadedSections: sections, loadingSection: null }),
}))
