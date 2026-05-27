'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { ThreeEvent } from '@react-three/fiber'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
import { getMeshGroup, INTERACTIVE_GROUPS, type MeshGroup } from './mesh-map'
import { createControlRoomShader, SCREEN_MATERIALS, LIGHT_MATERIALS } from '@/shaders/control-room-shader'
import { applyScreenTextures, disposeScreenTextures } from './screen-textures'

const MODEL_PATH = '/models/nasa-jsc-control-room.glb'
const LIGHTMAP_PATH = '/models/textures/bake-02-lightmap-5229a667.exr'

interface InteractiveRoomProps {
  onGroupClick?: (group: MeshGroup, event: ThreeEvent<MouseEvent>) => void
  onGroupHover?: (group: MeshGroup | null) => void
}

export function InteractiveRoom({ onGroupClick, onGroupHover }: InteractiveRoomProps) {
  const { scene } = useGLTF(MODEL_PATH)
  const [lightmap, setLightmap] = useState<THREE.Texture | null>(null)
  const [hoveredGroup, setHoveredGroup] = useState<MeshGroup | null>(null)
  const shadersApplied = useRef(false)
  const screenTextures = useRef<Map<string, THREE.CanvasTexture> | null>(null)

  useEffect(() => {
    let disposed = false
    const loader = new EXRLoader()
    loader.load(LIGHTMAP_PATH, (texture) => {
      if (disposed) { texture.dispose(); return }
      texture.minFilter = THREE.NearestFilter
      texture.magFilter = THREE.NearestFilter
      texture.colorSpace = THREE.NoColorSpace
      texture.generateMipmaps = false
      setLightmap(texture)
    })
    return () => { disposed = true }
  }, [])

  useEffect(() => {
    if (!scene || !lightmap || shadersApplied.current) return
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      if (!child.geometry || !child.geometry.getAttribute('position')) return
      if (!(child.material instanceof THREE.MeshStandardMaterial)) return
      
      const matName = child.material.name.toLowerCase()
      child.userData.materialName = matName
      
      // Ensure uv2 ALWAYS exists so shader attribute binding never crashes
      if (!child.geometry.hasAttribute('uv2')) {
        const uvAttr = child.geometry.getAttribute('uv')
        if (uvAttr) {
          child.geometry.setAttribute('uv2', uvAttr)
        } else {
          // No UVs at all — create zeroed dummy so shader can bind safely
          const count = child.geometry.getAttribute('position').count
          child.geometry.setAttribute(
            'uv2',
            new THREE.BufferAttribute(new Float32Array(count * 2), 2)
          )
        }
      }
      
      // Also ensure uv exists (shader reads it unconditionally)
      if (!child.geometry.hasAttribute('uv')) {
        const count = child.geometry.getAttribute('position').count
        child.geometry.setAttribute(
          'uv',
          new THREE.BufferAttribute(new Float32Array(count * 2), 2)
        )
      }
      
      child.material = createControlRoomShader(child.material, lightmap, {
        isScreen: SCREEN_MATERIALS.has(matName),
        isLight: LIGHT_MATERIALS.has(matName),
      })
      child.userData.hasCustomShader = true
    })
    
    screenTextures.current = applyScreenTextures(scene)
    shadersApplied.current = true
    
    return () => {
      if (screenTextures.current) {
        disposeScreenTextures(screenTextures.current)
      }
    }
  }, [scene, lightmap])

  useEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.userData.hasCustomShader) return
      const group = getMeshGroup(child.name)
      const mat = child.material as THREE.ShaderMaterial
      if (!mat.uniforms?.emissiveIntensity) return

      const matName: string = child.userData.materialName ?? ''
      const isScreen = SCREEN_MATERIALS.has(matName)
      const isLight = LIGHT_MATERIALS.has(matName)

      if (group && group === hoveredGroup) {
        if (isScreen) {
          mat.uniforms.emissiveIntensity.value = 5.0
        } else if (isLight) {
          mat.uniforms.emissiveIntensity.value = 8.0
        } else {
          mat.uniforms.emissiveIntensity.value = 1.5
        }
      } else {
        if (isScreen) {
          mat.uniforms.emissiveIntensity.value = 3.0
        } else if (isLight) {
          mat.uniforms.emissiveIntensity.value = 6.0
        } else {
          mat.uniforms.emissiveIntensity.value = 0
        }
      }
    })
  }, [scene, hoveredGroup])

  useEffect(() => {
    return () => { document.body.style.cursor = 'auto' }
  }, [])

  const resolveGroup = useCallback((object: THREE.Object3D): MeshGroup | null => {
    const group = getMeshGroup(object.name)
    if (group) return group
    const matName: string = (object as THREE.Mesh).userData?.materialName ?? ''
    if (SCREEN_MATERIALS.has(matName)) return 'SCREENS'
    if (LIGHT_MATERIALS.has(matName)) return 'LIGHTS'
    if (matName.startsWith('console')) return 'CONSOLES'
    if (['crstation_1', 'crstation_2'].includes(matName)) return 'STATIONS'
    if (['keyboards', 'keyboard_special'].includes(matName)) return 'KEYBOARDS'
    return null
  }, [])

  const handlePointerOver = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    const group = resolveGroup(e.object)
    if (group && INTERACTIVE_GROUPS.includes(group)) {
      setHoveredGroup(group)
      onGroupHover?.(group)
      document.body.style.cursor = 'pointer'
    }
  }, [onGroupHover, resolveGroup])

  const handlePointerOut = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHoveredGroup(null)
    onGroupHover?.(null)
    document.body.style.cursor = 'auto'
  }, [onGroupHover])

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    const group = resolveGroup(e.object)
    if (group && INTERACTIVE_GROUPS.includes(group)) {
      onGroupClick?.(group, e)
    }
  }, [onGroupClick, resolveGroup])

  return (
    <primitive
      object={scene}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    />
  )
}

useGLTF.preload(MODEL_PATH)
