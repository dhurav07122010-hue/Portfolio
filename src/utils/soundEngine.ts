// Futuristic Web Audio Synthesizer Engine
class SoundEngine {
  private ctx: AudioContext | null = null
  private ambientOsc: OscillatorNode | null = null
  private ambientGain: GainNode | null = null
  private lfo: OscillatorNode | null = null
  public enabled: boolean = false

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public toggle(): boolean {
    this.initCtx()
    this.enabled = !this.enabled
    if (this.enabled) {
      this.startAmbient()
      this.playChirp()
    } else {
      this.stopAmbient()
    }
    return this.enabled
  }

  public hoverBeep() {
    if (!this.enabled || !this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const now = this.ctx.currentTime

      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, now)
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04)

      gain.gain.setValueAtTime(0.03, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.04)
    } catch {
      // AudioContext interrupted
    }
  }

  public playChirp() {
    if (!this.enabled || !this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const now = this.ctx.currentTime

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(420, now)
      osc.frequency.exponentialRampToValueAtTime(1260, now + 0.12)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.14)
    } catch {
      // AudioContext interrupted
    }
  }

  public playGlitch() {
    if (!this.enabled || !this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const now = this.ctx.currentTime

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(180, now)
      osc.frequency.linearRampToValueAtTime(900, now + 0.03)
      osc.frequency.linearRampToValueAtTime(320, now + 0.07)
      osc.frequency.linearRampToValueAtTime(1500, now + 0.12)

      gain.gain.setValueAtTime(0.05, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.15)
    } catch {
      // AudioContext interrupted
    }
  }

  public playTerminalKey() {
    if (!this.enabled || !this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const now = this.ctx.currentTime

      osc.type = 'sine'
      const freq = 600 + Math.random() * 400
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0.02, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.025)
    } catch {
      // AudioContext interrupted
    }
  }

  private startAmbient() {
    if (!this.ctx) return
    try {
      const now = this.ctx.currentTime
      this.ambientOsc = this.ctx.createOscillator()
      this.ambientGain = this.ctx.createGain()
      this.lfo = this.ctx.createOscillator()
      const lfoGain = this.ctx.createGain()

      // Base atmospheric chord
      this.ambientOsc.type = 'sine'
      this.ambientOsc.frequency.setValueAtTime(65.41, now) // C2 low hum

      // LFO for subtle breathing
      this.lfo.type = 'sine'
      this.lfo.frequency.setValueAtTime(0.2, now) // 0.2Hz slow drift
      lfoGain.gain.setValueAtTime(8, now)

      this.lfo.connect(this.ambientOsc.frequency)

      this.ambientGain.gain.setValueAtTime(0.001, now)
      this.ambientGain.gain.exponentialRampToValueAtTime(0.02, now + 2)

      this.ambientOsc.connect(this.ambientGain)
      this.ambientGain.connect(this.ctx.destination)

      this.ambientOsc.start(now)
      this.lfo.start(now)
    } catch {
      // AudioContext interrupted
    }
  }

  private stopAmbient() {
    if (!this.ctx) return
    try {
      const now = this.ctx.currentTime
      if (this.ambientGain) {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.5)
        setTimeout(() => {
          this.ambientOsc?.stop()
          this.lfo?.stop()
          this.ambientOsc?.disconnect()
          this.lfo?.disconnect()
          this.ambientOsc = null
          this.lfo = null
        }, 500)
      }
    } catch {
      // AudioContext interrupted
    }
  }
}

export const sound = new SoundEngine()
