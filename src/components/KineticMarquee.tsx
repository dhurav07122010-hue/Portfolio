import React, { useEffect, useRef } from 'react'
import { scrollEngine } from '../utils/scrollEngine'

interface KineticMarqueeProps {
  items: string[]
  reverse?: boolean
  baseSpeed?: number
  className?: string
}

export const KineticMarquee: React.FC<KineticMarqueeProps> = ({
  items,
  reverse = false,
  baseSpeed = 1.2,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animId: number
    let currentX = 0
    let velocityOffset = 0
    let targetVelocity = 0

    const direction = reverse ? 1 : -1

    const unsubscribe = scrollEngine.subscribe((data) => {
      // Multiply scroll velocity into marquee boost
      targetVelocity = data.velocity * 0.85
    })

    const loop = () => {
      animId = requestAnimationFrame(loop)
      velocityOffset += (targetVelocity - velocityOffset) * 0.1
      targetVelocity *= 0.92 // dampen

      // Step position based on base speed + dynamic scroll velocity
      const step = (baseSpeed + Math.abs(velocityOffset) * 0.6) * direction
      currentX += step

      const track = trackRef.current
      if (track) {
        const halfWidth = track.scrollWidth / 2
        if (halfWidth > 0) {
          if (currentX < -halfWidth) {
            currentX += halfWidth
          } else if (currentX > 0) {
            currentX -= halfWidth
          }
        }
        track.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`
      }
    }

    animId = requestAnimationFrame(loop)

    return () => {
      unsubscribe()
      cancelAnimationFrame(animId)
    }
  }, [reverse, baseSpeed])

  // Create repeat sets for infinite loop
  const repeatSet = [...items, ...items, ...items]

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden select-none whitespace-nowrap py-4 border-y border-zinc-800/80 bg-black/40 backdrop-blur-sm relative ${className}`}
    >
      <div
        ref={trackRef}
        className="inline-flex items-center space-x-8 font-['Syne'] font-black text-2xl sm:text-4xl md:text-5xl tracking-tighter text-zinc-700/60 uppercase will-change-transform"
      >
        {repeatSet.map((item, idx) => (
          <div key={idx} className="inline-flex items-center space-x-8 shrink-0">
            <span className="hover:text-[#00f0ff] transition-colors cursor-default">
              {item}
            </span>
            <span className="text-[#00f0ff] text-xl sm:text-3xl font-mono">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
