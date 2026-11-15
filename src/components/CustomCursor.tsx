import React, { useEffect, useState, useRef } from 'react'

interface ClickRipple {
  id: number
  x: number
  y: number
}

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : false
  )
  const [ripples, setRipples] = useState<ClickRipple[]>([])

  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const badgeRef = useRef<HTMLDivElement | null>(null)
  const animRef = useRef<number | null>(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const trailingPos = useRef({ x: -100, y: -100 })
  const isHoveredRef = useRef(false)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    if (!media.matches) return

    let lastCheckTime = 0

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }

      // Throttle interactive check to every 60ms to avoid DOM traversal on every sub-pixel move
      const now = performance.now()
      if (now - lastCheckTime > 60) {
        lastCheckTime = now
        const target = e.target as HTMLElement | null
        const isInteractive = Boolean(
          target?.closest('button, a, input, textarea, select, [data-cursor-hover], .clickable, .cursor-pointer')
        )
        if (isInteractive !== isHoveredRef.current) {
          isHoveredRef.current = isInteractive
          setIsHovered(isInteractive)
        }
      }
    }

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      }
      setRipples((prev) => [...prev.slice(-3), newRipple])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 700)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('click', handleClick)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    const updateTrailing = () => {
      trailingPos.current.x += (mousePos.current.x - trailingPos.current.x) * 0.22
      trailingPos.current.y += (mousePos.current.y - trailingPos.current.y) * 0.22

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailingPos.current.x}px, ${trailingPos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate3d(${trailingPos.current.x}px, ${trailingPos.current.y}px, 0)`
      }

      animRef.current = requestAnimationFrame(updateTrailing)
    }
    animRef.current = requestAnimationFrame(updateTrailing)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Click Shockwave Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-50 rounded-full border border-[#00f0ff] animate-[ping_0.7s_cubic-bezier(0,0,0.2,1)_forwards]"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 20px #00f0ff',
          }}
        />
      ))}

      {/* Center Laser Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-[#00f0ff] will-change-transform"
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          width: isHovered ? '8px' : '4px',
          height: isHovered ? '8px' : '4px',
          boxShadow: '0 0 12px #00f0ff, 0 0 24px #00f0ff',
          transition: 'width 0.15s, height 0.15s',
        }}
      />

      {/* Outer Reticle with Crosshairs */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-[#00f0ff]/50 transition-[width,height,background-color,border-color] duration-200 ease-out flex items-center justify-center will-change-transform"
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          width: isHovered ? '58px' : '32px',
          height: isHovered ? '58px' : '32px',
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
          borderColor: isHovered ? '#00f0ff' : 'rgba(0, 240, 255, 0.4)',
        }}
      >
        {/* Subtle crosshair tick marks */}
        <span className="absolute -top-1 w-0.5 h-1.5 bg-[#00f0ff]/60" />
        <span className="absolute -bottom-1 w-0.5 h-1.5 bg-[#00f0ff]/60" />
        <span className="absolute -left-1 w-1.5 h-0.5 bg-[#00f0ff]/60" />
        <span className="absolute -right-1 w-1.5 h-0.5 bg-[#00f0ff]/60" />
      </div>

      {/* Floating HUD Coordinates Badge next to cursor */}
      {isHovered && (
        <div
          ref={badgeRef}
          className="fixed top-0 left-0 pointer-events-none z-50 font-mono text-[9px] text-[#00f0ff] tracking-widest pl-6 pt-3 select-none will-change-transform"
          style={{
            transform: 'translate3d(-100px, -100px, 0)',
          }}
        >
          <span>ENGAGE // ACTIVE</span>
        </div>
      )}
    </>
  )
}
