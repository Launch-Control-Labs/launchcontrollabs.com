'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { ThreeEvent } from '@react-three/fiber'
import { getMeshGroup, INTERACTIVE_GROUPS, type MeshGroup } from './mesh-map'
import { createControlRoomShader, SCREEN_MATERIALS } from '@/shaders/control-room-shader'

useGLTF.setDecoderPath('/draco/')

const MODEL_PATH = '/models/soma04-interior.glb'

interface InteractiveRoomProps {
  onGroupClick?: (group: MeshGroup, event: ThreeEvent<MouseEvent>) => void
  onGroupHover?: (group: MeshGroup | null) => void
}

export function InteractiveRoom({ onGroupClick, onGroupHover }: InteractiveRoomProps) {
  const { scene } = useGLTF(MODEL_PATH)
  const [hoveredGroup, setHoveredGroup] = useState<MeshGroup | null>(null)
  const shadersApplied = useRef(false)

  useEffect(() => {
    if (!scene || shadersApplied.current) return
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      if (!child.geometry || !child.geometry.getAttribute('position')) return
      if (!(child.material instanceof THREE.MeshStandardMaterial)) return

      const matName = child.material.name.toLowerCase()
      child.userData.materialName = matName

      child.material = createControlRoomShader(child.material, {
        isScreen: SCREEN_MATERIALS.has(matName),
      })
      child.userData.hasCustomShader = true
    })
    shadersApplied.current = true
  }, [scene])

  useEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.userData.hasCustomShader) return
      const mat = child.material as THREE.ShaderMaterial
      if (!mat.uniforms?.emissiveIntensity) return

      const matName: string = child.userData.materialName ?? ''
      const isScreen = SCREEN_MATERIALS.has(matName)

      if (hoveredGroup && getMeshGroup(child.name) === hoveredGroup) {
        mat.uniforms.emissiveIntensity.value = isScreen ? 6.0 : 1.0
      } else {
        mat.uniforms.emissiveIntensity.value = isScreen ? 3.0 : 0.0
      }
    })
  }, [scene, hoveredGroup])

  useEffect(() => {
    return () => { document.body.style.cursor = 'auto' }
  }, [])

  const resolveGroup = useCallback((object: THREE.Object3D): MeshGroup | null => {
    return getMeshGroup(object.name)
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
