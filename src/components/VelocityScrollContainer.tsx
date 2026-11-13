import React, { useEffect, useRef, useState } from 'react'
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
  const [skew, setSkew] = useState(0)
  const targetSkew = useRef(0)

  useEffect(() => {
    const unsubscribe = scrollEngine.subscribe((data) => {
      // Clamp velocity skew between -2.2deg and +2.2deg
      const clamped = Math.max(-2.2, Math.min(2.2, data.velocity * 0.065))
      targetSkew.current = clamped
    })

    let animId: number
    const smoothLoop = () => {
      setSkew((prev) => prev + (targetSkew.current - prev) * 0.12)
      targetSkew.current *= 0.94 // gentle dampening
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
      className={`transition-transform duration-75 will-change-transform ${className}`}
      style={{
        transform: `skewY(${skew.toFixed(2)}deg)`,
        transformOrigin: '50% 50%',
      }}
    >
      {children}
    </div>
  )
}
