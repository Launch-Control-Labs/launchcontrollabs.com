'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useSceneStore } from '@/store/scene-store'

// 3D world coordinates: establishing shot (outside) → operator seat (inside)
const CAMERA_PATH = {
  start: { x: 8, y: 5, z: 14, lookAtX: 0, lookAtY: 1.5, lookAtZ: 0 },
  end: { x: 0, y: 2.2, z: 3.5, lookAtX: 0, lookAtY: 1.8, lookAtZ: -2 },
}

interface ScrollCameraProps {
  containerRef: React.RefObject<HTMLElement | null>
}

export function ScrollCamera({ containerRef }: ScrollCameraProps) {
  const { camera } = useThree()
  const setInteractionEnabled = useSceneStore((s) => s.setInteractionEnabled)
  const progress = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const interactionEnabledRef = useRef(false)

  useEffect(() => {
    camera.position.set(CAMERA_PATH.start.x, CAMERA_PATH.start.y, CAMERA_PATH.start.z)
    camera.lookAt(CAMERA_PATH.start.lookAtX, CAMERA_PATH.start.lookAtY, CAMERA_PATH.start.lookAtZ)

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })

    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const proxy = { p: 0 }

        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 1.5,
            onUpdate: (self) => {
              progress.current = self.progress
              if (self.progress >= 0.9 && !interactionEnabledRef.current) {
                interactionEnabledRef.current = true
                setInteractionEnabled(true)
              }
            },
          },
        }).to(proxy, {
          p: 1,
          onUpdate: () => {
            progress.current = proxy.p
          },
        })
      })
    }

    init()

    return () => {
      ctx?.revert()
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [camera, containerRef, setInteractionEnabled])

  useFrame(() => {
    const t = progress.current

    const targetPos = new THREE.Vector3(
      THREE.MathUtils.lerp(CAMERA_PATH.start.x, CAMERA_PATH.end.x, t),
      THREE.MathUtils.lerp(CAMERA_PATH.start.y, CAMERA_PATH.end.y, t),
      THREE.MathUtils.lerp(CAMERA_PATH.start.z, CAMERA_PATH.end.z, t),
    )
    camera.position.lerp(targetPos, 0.1)

    const lookTarget = new THREE.Vector3(
      THREE.MathUtils.lerp(CAMERA_PATH.start.lookAtX, CAMERA_PATH.end.lookAtX, t),
      THREE.MathUtils.lerp(CAMERA_PATH.start.lookAtY, CAMERA_PATH.end.lookAtY, t),
      THREE.MathUtils.lerp(CAMERA_PATH.start.lookAtZ, CAMERA_PATH.end.lookAtZ, t),
    )
    camera.lookAt(lookTarget)

    // ±2° max parallax — only active after scroll begins (t > 0.1)
    if (t > 0.1) {
      camera.rotation.y += mouseRef.current.x * 0.02 * (Math.PI / 180)
      camera.rotation.x += mouseRef.current.y * 0.01 * (Math.PI / 180)
    }
  })

  return null
}
