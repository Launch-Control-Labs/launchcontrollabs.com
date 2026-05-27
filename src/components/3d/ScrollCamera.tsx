'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useSceneStore } from '@/store/scene-store'

const POSITION_KEYFRAMES = [
  new THREE.Vector3(0, 35, 130),
  new THREE.Vector3(30, 50, 70),
  new THREE.Vector3(15, 75, 30),
  new THREE.Vector3(2, 90, 5),
]

const LOOKAT_KEYFRAMES = [
  new THREE.Vector3(-7, 45, -8),
  new THREE.Vector3(-7, 55, -8),
  new THREE.Vector3(-7, 80, -8),
  new THREE.Vector3(-7, 91, -8),
]

const positionCurve = new THREE.CatmullRomCurve3(POSITION_KEYFRAMES, false, 'centripetal', 0.5)
const lookAtCurve = new THREE.CatmullRomCurve3(LOOKAT_KEYFRAMES, false, 'centripetal', 0.5)

interface ScrollCameraProps {
  containerRef: React.RefObject<HTMLElement | null>
}

const _targetPos = new THREE.Vector3()
const _lookTarget = new THREE.Vector3()
const _currentLook = new THREE.Vector3()

export function ScrollCamera({ containerRef }: ScrollCameraProps) {
  const { camera } = useThree()
  const setInteractionEnabled = useSceneStore((s) => s.setInteractionEnabled)
  const progress = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const interactionEnabledRef = useRef(false)

  useEffect(() => {
    const startPos = positionCurve.getPoint(0)
    const startLook = lookAtCurve.getPoint(0)
    camera.position.copy(startPos)
    camera.lookAt(startLook)
    _currentLook.copy(startLook)

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
            end: '+=150%',
            pin: true,
            scrub: 2.5,
            onUpdate: (self) => {
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
          ease: 'power2.inOut',
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

    positionCurve.getPoint(t, _targetPos)
    lookAtCurve.getPoint(t, _lookTarget)

    camera.position.lerp(_targetPos, 0.06)
    _currentLook.lerp(_lookTarget, 0.06)
    camera.lookAt(_currentLook)

    if (t > 0.05) {
      camera.rotation.y += mouseRef.current.x * 0.008 * (Math.PI / 180)
      camera.rotation.x += mouseRef.current.y * 0.004 * (Math.PI / 180)
    }
  })

  return null
}
