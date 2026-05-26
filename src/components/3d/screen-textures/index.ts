import * as THREE from 'three'
import { createDataVizTexture } from './DataVizScreen'
import { createCodeTexture } from './CodeScreen'
import { createStatusTexture } from './StatusScreen'

export { createDataVizTexture, createCodeTexture, createStatusTexture }

export type ScreenTextureType = 'data' | 'code' | 'status'

/**
 * Factory function to create screen textures
 * @param type - 'data' for telemetry, 'code' for terminal, 'status' for dashboard
 * @returns THREE.CanvasTexture with animated content
 */
export function createScreenTexture(type: ScreenTextureType): THREE.CanvasTexture {
  switch (type) {
    case 'data':
      return createDataVizTexture()
    case 'code':
      return createCodeTexture()
    case 'status':
      return createStatusTexture()
    default:
      return createDataVizTexture()
  }
}

/**
 * Apply screen textures to scene materials
 * Call this after shader materials are created
 */
export function applyScreenTextures(
  scene: THREE.Object3D,
  textureMap?: Record<string, ScreenTextureType>
): Map<string, THREE.CanvasTexture> {
  const textures = new Map<string, THREE.CanvasTexture>()
  
  // Default mapping: screen=data, screens=code, wall_screen=status
  const defaultMap: Record<string, ScreenTextureType> = {
    screen: 'data',
    screens: 'code',
    wall_screen: 'status',
  }
  
  const mapping = textureMap || defaultMap
  
  scene.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    
    const mat = child.material as THREE.ShaderMaterial
    if (!mat.uniforms?.map) return
    
    const matName = (child.userData.materialName as string)?.toLowerCase() ?? ''
    
    if (matName in mapping) {
      const textureType = mapping[matName]
      const texture = createScreenTexture(textureType)
      mat.uniforms.map.value = texture
      textures.set(matName, texture)
    }
  })
  
  return textures
}

/**
 * Dispose all screen textures
 */
export function disposeScreenTextures(textures: Map<string, THREE.CanvasTexture>): void {
  textures.forEach((texture) => {
    texture.dispose()
  })
  textures.clear()
}
