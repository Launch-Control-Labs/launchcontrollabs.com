'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ScrollCameraProps {
  containerRef: React.RefObject<HTMLElement | null>
}

export function ScrollCamera({ containerRef }: ScrollCameraProps) {
  const { camera } = useThree()
  
  const scrollProgress = useRef(0)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const targetRotX = useRef(0)
  const targetRotY = useRef(0)
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    camera.rotation.order = 'YXZ'
    camera.position.set(0, 3, 30)
    camera.lookAt(0, -2, -10)

    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const containerHeight = container.scrollHeight || window.innerHeight * 1.5
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / (containerHeight * 0.8)))
      scrollProgress.current = progress
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1
      mouseY.current = (e.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [camera, containerRef])

  useFrame(() => {
    const targetZ = 30 - scrollProgress.current * 10
    const targetY = 3 - scrollProgress.current * 2
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05)

    // Mouse parallax — subtle rotation (skip if prefers-reduced-motion)
    if (!prefersReducedMotion.current) {
      targetRotY.current = mouseX.current * 0.005
      targetRotX.current = -mouseY.current * 0.003
    } else {
      targetRotY.current = 0
      targetRotX.current = 0
    }

    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotY.current, 0.05)
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotX.current, 0.05)
  })

  return null
}
