import React, { useEffect, useRef } from 'react'
import { scrollEngine } from '../utils/scrollEngine'

interface VelocityScrollContainerProps {
  children: React.ReactNode
  className?: string
}

export const VelocityScrollContainer: React.FC<VelocityScrollContainerProps> = ({
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const targetSkew = useRef(0)
  const currentSkew = useRef(0)

  useEffect(() => {
    const unsubscribe = scrollEngine.subscribe((data) => {
      // Gentle clamp on velocity skew between -1.2deg and +1.2deg to prevent visual distortion
      const clamped = Math.max(-1.2, Math.min(1.2, data.velocity * 0.035))
      targetSkew.current = clamped
    })

    let animId: number
    const smoothLoop = () => {
      currentSkew.current += (targetSkew.current - currentSkew.current) * 0.1
      targetSkew.current *= 0.92 // gentle dampening

      if (containerRef.current) {
        if (Math.abs(currentSkew.current) > 0.01) {
          containerRef.current.style.transform = `skewY(${currentSkew.current.toFixed(2)}deg)`
        } else {
          containerRef.current.style.transform = 'none'
        }
      }
      animId = requestAnimationFrame(smoothLoop)
    }
    animId = requestAnimationFrame(smoothLoop)

    return () => {
      unsubscribe()
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`will-change-transform ${className}`}
      style={{
        transformOrigin: '50% 50%',
      }}
    >
      {children}
    </div>
  )
}
