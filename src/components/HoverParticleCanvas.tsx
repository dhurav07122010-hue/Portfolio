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
    const MAX_PARTICLES = 160
    const AMBIENT_COUNT = 45

    // Initialize ambient floating particles across screen
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      ambientParticles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.15,
      })
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX
      const currentY = e.clientY

      mouse.vx = currentX - (mouse.lastX === -1000 ? currentX : mouse.lastX)
      mouse.vy = currentY - (mouse.lastY === -1000 ? currentY : mouse.lastY)
      mouse.x = currentX
      mouse.y = currentY
      mouse.lastX = currentX
      mouse.lastY = currentY

      // Check if mouse is hovering an interactive element
      const target = e.target as HTMLElement | null
      const isInteractive = Boolean(
        target?.closest(
          'button, a, input, select, textarea, [data-hover-particle], .cursor-pointer, .clickable, .group'
        )
      )
      mouse.isHovering = isInteractive

      // Emit trail particles on move
      const speed = Math.hypot(mouse.vx, mouse.vy)
      const count = isInteractive ? Math.min(6, Math.floor(speed * 0.4) + 2) : Math.min(3, Math.floor(speed * 0.2) + 1)

      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) {
          particles.shift()
        }
        const angle = Math.random() * Math.PI * 2
        const spreadSpeed = Math.random() * 1.5 + 0.5
        const pSize = isInteractive ? Math.random() * 3.5 + 2 : Math.random() * 2.5 + 1.2

        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 8,
          y: mouse.y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * spreadSpeed + mouse.vx * 0.08,
          vy: Math.sin(angle) * spreadSpeed + mouse.vy * 0.08,
          size: pSize,
          baseSize: pSize,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: isInteractive ? 0.95 : 0.8,
          life: 0,
          maxLife: isInteractive ? 45 + Math.random() * 25 : 30 + Math.random() * 20,
        })
      }
    }

    // Spawn explosive shockwave particles on click
    const handleClick = (e: MouseEvent) => {
      const burstCount = 28
      for (let i = 0; i < burstCount; i++) {
        if (particles.length >= MAX_PARTICLES) particles.shift()
        const angle = (i / burstCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
        const speed = Math.random() * 5 + 2.5

        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 2,
          baseSize: Math.random() * 4 + 2,
          color: i % 2 === 0 ? '#00f0ff' : '#a855f7',
          alpha: 1,
          life: 0,
          maxLife: 50 + Math.random() * 20,
        })
      }
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
      mouse.lastX = -1000
      mouse.lastY = -1000
      mouse.isHovering = false
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('click', handleClick)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Animation Loop
    let hoverAngle = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, width, height)

      hoverAngle += 0.06

      // If hovering over an interactive item, emit orbiting aura particles
      if (mouse.isHovering && mouse.x > 0 && mouse.y > 0) {
        if (particles.length < MAX_PARTICLES && Math.random() > 0.4) {
          const orbitR = Math.random() * 22 + 14
          const a = hoverAngle + Math.random() * 0.5
          particles.push({
            x: mouse.x + Math.cos(a) * orbitR,
            y: mouse.y + Math.sin(a) * orbitR,
            vx: -Math.sin(a) * 1.5,
            vy: Math.cos(a) * 1.5,
            size: Math.random() * 2.8 + 1.2,
            baseSize: Math.random() * 2.8 + 1.2,
            color: '#00f0ff',
            alpha: 0.9,
            life: 0,
            maxLife: 35,
          })
        }
      }

      // 1. Draw and update ambient floating dust (repelled gently by cursor)
      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i]
        p.x += p.vx
        p.y += p.vy

        // Wrap around viewport edges
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Repel from cursor
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          const maxDist = 130
          if (dist < maxDist && dist > 1) {
            const force = (1 - dist / maxDist) * 3
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
        }

        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // 2. Draw constellation connection lines between trailing particles
      ctx.lineWidth = 0.7
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.hypot(dx, dy)
          const connectDist = mouse.isHovering ? 65 : 45

          if (dist < connectDist) {
            const lineAlpha = (1 - dist / connectDist) * Math.min(p1.alpha, p2.alpha) * 0.4
            ctx.strokeStyle = '#00f0ff'
            ctx.globalAlpha = lineAlpha
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // 3. Draw and update active cursor trail particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96

        const progress = p.life / p.maxLife
        p.alpha = Math.max(0, 1 - progress)
        p.size = Math.max(0.2, p.baseSize * (1 - progress * 0.7))

        if (p.life >= p.maxLife || p.alpha <= 0.02) {
          particles.splice(i, 1)
          continue
        }

        // Render glowing particle
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.shadowBlur = mouse.isHovering ? 14 : 8
        ctx.shadowColor = p.color

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      ctx.globalAlpha = 1
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 w-full h-full"
    />
  )
}
