'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useSceneStore } from '@/store/scene-store'

// Cockpit geometry: screens at Y=607 center, walls at Y=364-827, X/Z within ±200
const CAMERA_PATH = {
  start: { x: 0, y: 500, z: 180, lookAtX: 0, lookAtY: 600, lookAtZ: 0 },
  end:   { x: 0, y: 580, z: 20, lookAtX: 0, lookAtY: 600, lookAtZ: -150 },
}

interface ScrollCameraProps {
  containerRef: React.RefObject<HTMLElement | null>
}

const _targetPos = new THREE.Vector3()
const _lookTarget = new THREE.Vector3()

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
    let cancelled = false

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
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
              } else if (self.progress < 0.85 && interactionEnabledRef.current) {
                interactionEnabledRef.current = false
                setInteractionEnabled(false)
                useSceneStore.getState().setActivePanel(null)
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
      cancelled = true
      ctx?.revert()
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [camera, containerRef, setInteractionEnabled])

  useFrame(() => {
    const t = progress.current

    _targetPos.set(
      THREE.MathUtils.lerp(CAMERA_PATH.start.x, CAMERA_PATH.end.x, t),
      THREE.MathUtils.lerp(CAMERA_PATH.start.y, CAMERA_PATH.end.y, t),
      THREE.MathUtils.lerp(CAMERA_PATH.start.z, CAMERA_PATH.end.z, t),
    )
    camera.position.lerp(_targetPos, 0.1)

    _lookTarget.set(
      THREE.MathUtils.lerp(CAMERA_PATH.start.lookAtX, CAMERA_PATH.end.lookAtX, t),
      THREE.MathUtils.lerp(CAMERA_PATH.start.lookAtY, CAMERA_PATH.end.lookAtY, t),
      THREE.MathUtils.lerp(CAMERA_PATH.start.lookAtZ, CAMERA_PATH.end.lookAtZ, t),
    )
    camera.lookAt(_lookTarget)

    // ±2° max parallax — only active after scroll begins (t > 0.1)
    if (t > 0.1) {
      camera.rotation.y += mouseRef.current.x * 0.02 * (Math.PI / 180)
      camera.rotation.x += mouseRef.current.y * 0.01 * (Math.PI / 180)
    }
  })

  return null
}
