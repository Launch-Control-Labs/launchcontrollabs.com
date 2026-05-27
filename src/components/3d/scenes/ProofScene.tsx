'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function ProofScene() {
  const groupRef = useRef<THREE.Group>(null)
  
  const { scene } = useGLTF('/models/optimized/various-planets.glb')
  
  const planets = useMemo(() => {
    const clonedScene = scene.clone(true)
    const planetMeshes: THREE.Object3D[] = []
    
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child.clone() as THREE.Mesh
        mesh.scale.setScalar(0.3)
        mesh.position.set(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 6 - 3
        )
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        )
        planetMeshes.push(mesh)
      }
    })
    
    return planetMeshes.slice(0, 5)
  }, [scene])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02
    }
    
    planets.forEach((planet, i) => {
      if (planet instanceof THREE.Mesh) {
        planet.rotation.y += delta * (0.05 + i * 0.01)
        planet.rotation.x += delta * 0.02
      }
    })
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 3, 5]} intensity={0.8} color="#F59E0B" />
      <pointLight position={[-3, -2, 3]} intensity={0.4} color="#FCD34D" />
      
      {planets.map((planet, i) => (
        <primitive key={i} object={planet} />
      ))}
    </group>
  )
}

useGLTF.preload('/models/optimized/various-planets.glb')
