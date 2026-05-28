import { create } from 'zustand'

export const SECTION_COUNT = 6

interface SceneState {
  scrollProgress: number
  deviceTier: 1 | 2 | 3
  experienceMode: '3d' | '2d-parallax' | 'static'

  setScrollProgress: (progress: number) => void
  setDeviceTier: (tier: 1 | 2 | 3) => void
  setExperienceMode: (mode: '3d' | '2d-parallax' | 'static') => void
}

export const useSceneStore = create<SceneState>((set) => ({
  scrollProgress: 0,
  deviceTier: 2,
  experienceMode: '3d',

  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setDeviceTier: (tier) => set({ deviceTier: tier }),
  setExperienceMode: (mode) => set({ experienceMode: mode }),
}))
