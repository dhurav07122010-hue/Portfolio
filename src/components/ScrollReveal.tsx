import React, { useEffect, useRef, useState } from 'react'
import { scrollEngine } from '../utils/scrollEngine'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  parallaxSpeed?: number // e.g. 0.15 for subtle float, -0.1 for drag
  scale?: boolean
  tilt?: boolean
  fade?: boolean
  delay?: number // ms delay
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  parallaxSpeed = 0,
  scale = true,
  tilt = false,
  fade = true,
  delay = 0,
}) => {
  const domRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<{
    opacity: number
    transform: string
  }>({
    opacity: fade ? 0 : 1,
    transform: 'translate3d(0, 30px, 0)',
  })

  useEffect(() => {
    const el = domRef.current
    if (!el) return

    let animId: number
    let currentY = 30
    let targetY = 30
    let currentOpacity = fade ? 0 : 1
    let targetOpacity = fade ? 0 : 1
    let currentScale = scale ? 0.94 : 1
    let targetScale = scale ? 0.94 : 1
    let currentTilt = 0
    let targetTilt = 0

    const updateFromScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Check if element is entering or in viewport
      const topOffset = rect.top
      const centerOffset = rect.top + rect.height / 2 - windowHeight / 2
      const progress = 1 - Math.max(0, Math.min(1, topOffset / (windowHeight * 0.9)))

      if (topOffset < windowHeight * 1.1 && rect.bottom > -windowHeight * 0.1) {
        // In view
        targetOpacity = fade ? Math.min(1, Math.max(0, progress * 1.4)) : 1
        targetScale = scale ? 0.94 + 0.06 * Math.min(1, progress * 1.2) : 1
        
        // Parallax offset based on distance from center
        const parallax = centerOffset * parallaxSpeed
        targetY = (1 - Math.min(1, progress)) * 35 + parallax

        // 3D tilt
        if (tilt) {
          const clampedTilt = Math.max(-6, Math.min(6, (centerOffset / windowHeight) * 10))
          targetTilt = clampedTilt
        }
      } else if (topOffset >= windowHeight * 1.1) {
        // Below view
        targetOpacity = fade ? 0 : 1
        targetScale = scale ? 0.94 : 1
        targetY = 40
        targetTilt = tilt ? 6 : 0
      }
    }

    const unsubscribe = scrollEngine.subscribe((data) => {
      updateFromScroll()
      // If high velocity, add slight momentary dynamic offset
      if (Math.abs(data.velocity) > 8) {
        targetY += data.velocity * 0.4
      }
    })

    // Smooth lerp loop
    const renderLoop = () => {
      currentY += (targetY - currentY) * 0.12
      currentOpacity += (targetOpacity - currentOpacity) * 0.12
      currentScale += (targetScale - currentScale) * 0.12
      currentTilt += (targetTilt - currentTilt) * 0.12

      const transformStr = [
        `translate3d(0, ${currentY.toFixed(2)}px, 0)`,
        scale ? `scale(${currentScale.toFixed(3)})` : '',
        tilt ? `perspective(1000px) rotateX(${currentTilt.toFixed(2)}deg)` : '',
      ]
        .filter(Boolean)
        .join(' ')

      setStyle({
        opacity: Number(currentOpacity.toFixed(3)),
        transform: transformStr,
      })

      animId = requestAnimationFrame(renderLoop)
    }

    // Initial trigger after delay
    const timer = setTimeout(() => {
      updateFromScroll()
      animId = requestAnimationFrame(renderLoop)
    }, delay)

    return () => {
      clearTimeout(timer)
      unsubscribe()
      cancelAnimationFrame(animId)
    }
  }, [parallaxSpeed, scale, tilt, fade, delay])

  return (
    <div
      ref={domRef}
      className={`will-change-transform ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
