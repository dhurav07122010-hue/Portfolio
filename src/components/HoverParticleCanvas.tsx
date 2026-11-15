import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseSize: number
  color: string
  alpha: number
  life: number
  maxLife: number
  isOrbiting?: boolean
  angle?: number
  distance?: number
}

interface AmbientParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  baseX: number
  baseY: number
}

export const HoverParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const colors = ['#00f0ff', '#38bdf8', '#a855f7', '#c084fc', '#ffffff']

    const mouse = {
      x: -1000,
      y: -1000,
      lastX: -1000,
      lastY: -1000,
      vx: 0,
      vy: 0,
      isHovering: false,
      isDown: false,
    }

    const particles: Particle[] = []
    const ambientParticles: AmbientParticle[] = []
    const MAX_PARTICLES = 90
    const AMBIENT_COUNT = 30

    // Initialize ambient floating particles across screen
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      ambientParticles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.35 + 0.15,
      })
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    let lastCheckTime = 0
    let cachedIsInteractive = false

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX
      const currentY = e.clientY

      mouse.vx = currentX - (mouse.lastX === -1000 ? currentX : mouse.lastX)
      mouse.vy = currentY - (mouse.lastY === -1000 ? currentY : mouse.lastY)
      mouse.x = currentX
      mouse.y = currentY
      mouse.lastX = currentX
      mouse.lastY = currentY

      // Throttle interactive element check
      const now = performance.now()
      if (now - lastCheckTime > 75) {
        lastCheckTime = now
        const target = e.target as HTMLElement | null
        cachedIsInteractive = Boolean(
          target?.closest(
            'button, a, input, select, textarea, [data-hover-particle], .cursor-pointer, .clickable, .group'
          )
        )
      }
      mouse.isHovering = cachedIsInteractive

      // Emit trail particles on move
      const speed = Math.hypot(mouse.vx, mouse.vy)
      if (speed > 1.5) {
        const count = cachedIsInteractive ? Math.min(4, Math.floor(speed * 0.3) + 1) : Math.min(2, Math.floor(speed * 0.15) + 1)

        for (let i = 0; i < count; i++) {
          if (particles.length >= MAX_PARTICLES) {
            particles.shift()
          }
          const angle = Math.random() * Math.PI * 2
          const spreadSpeed = Math.random() * 1.5 + 0.5
          const pSize = cachedIsInteractive ? Math.random() * 3 + 1.8 : Math.random() * 2 + 1

          particles.push({
            x: mouse.x + (Math.random() - 0.5) * 6,
            y: mouse.y + (Math.random() - 0.5) * 6,
            vx: Math.cos(angle) * spreadSpeed + mouse.vx * 0.08,
            vy: Math.sin(angle) * spreadSpeed + mouse.vy * 0.08,
            size: pSize,
            baseSize: pSize,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: cachedIsInteractive ? 0.9 : 0.75,
            life: 0,
            maxLife: cachedIsInteractive ? 40 + Math.random() * 20 : 25 + Math.random() * 15,
          })
        }
      }
    }

    // Spawn shockwave particles on click
    const handleClick = (e: MouseEvent) => {
      const burstCount = 18
      for (let i = 0; i < burstCount; i++) {
        if (particles.length >= MAX_PARTICLES) particles.shift()
        const angle = (i / burstCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
        const speed = Math.random() * 4 + 2

        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.5 + 1.5,
          baseSize: Math.random() * 3.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 0,
          maxLife: 40 + Math.random() * 20,
        })
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('click', handleClick)

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Render ambient floating particles
      for (let i = 0; i < ambientParticles.length; i++) {
        const ap = ambientParticles[i]
        ap.x += ap.vx
        ap.y += ap.vy

        if (ap.x < 0) ap.x = width
        if (ap.x > width) ap.x = 0
        if (ap.y < 0) ap.y = height
        if (ap.y > height) ap.y = 0

        // Repel from cursor
        const dx = ap.x - mouse.x
        const dy = ap.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 100 && dist > 0) {
          const force = (1 - dist / 100) * 2.5
          ap.x += (dx / dist) * force
          ap.y += (dy / dist) * force
        }

        ctx.save()
        ctx.fillStyle = ap.color
        ctx.globalAlpha = ap.alpha
        ctx.beginPath()
        ctx.arc(ap.x, ap.y, ap.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // 2. Render dynamic cursor trail and burst particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++

        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.94
        p.vy *= 0.94

        const progress = p.life / p.maxLife
        const currentAlpha = p.alpha * (1 - progress)
        const currentSize = p.baseSize * (1 - progress * 0.6)

        ctx.save()
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, currentAlpha)
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ opacity: 0.85 }}
    />
  )
}
