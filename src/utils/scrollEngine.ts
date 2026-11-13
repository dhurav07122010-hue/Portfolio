import Lenis from 'lenis'

type ScrollCallback = (data: {
  scroll: number
  limit: number
  velocity: number
  progress: number
  direction: number
}) => void

class ScrollEngine {
  public lenis: Lenis | null = null
  private callbacks: Set<ScrollCallback> = new Set()
  public currentProgress: number = 0
  public currentVelocity: number = 0
  public currentScroll: number = 0

  public init() {
    if (this.lenis || typeof window === 'undefined') return

    this.lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.8,
    })

    this.lenis.on('scroll', (e: any) => {
      this.currentScroll = e.scroll
      this.currentProgress = e.progress
      this.currentVelocity = e.velocity

      // Dispatch to custom callbacks
      this.callbacks.forEach((cb) => cb(e))

      // Also dispatch custom window event for decoupled canvas / HUD
      window.dispatchEvent(
        new CustomEvent('hybridScroll', {
          detail: {
            scroll: e.scroll,
            limit: e.limit,
            velocity: e.velocity,
            progress: e.progress,
            direction: e.direction,
          },
        })
      )
    })

    const raf = (time: number) => {
      this.lenis?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }

  public subscribe(cb: ScrollCallback) {
    this.callbacks.add(cb)
    return () => {
      this.callbacks.delete(cb)
    }
  }

  public scrollTo(target: string | number | HTMLElement, options?: any) {
    this.lenis?.scrollTo(target, options)
  }
}

export const scrollEngine = new ScrollEngine()
