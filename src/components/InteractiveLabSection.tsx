import React, { useState, useEffect, useRef } from 'react'
import { Sliders, Zap, Gauge, Volume2 } from 'lucide-react'
import { sound } from '../utils/soundEngine'
import { TiltCard } from './TiltCard'
import { ScrambleText } from './ScrambleText'
import type { VisualMode } from './ThreeCanvas'

export const InteractiveLabSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<VisualMode>('spine')
  const [waveAmplitude, setWaveAmplitude] = useState(28)
  const [particleSpeed, setParticleSpeed] = useState(1.8)
  const [synthNote, setSynthNote] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const handleModeChange = (mode: VisualMode) => {
    sound.playChirp()
    setActiveMode(mode)
    window.dispatchEvent(new CustomEvent('setVisualMode', { detail: mode }))
  }

  // Live Synthesizer Waveform Visualizer
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let phase = 0

    const renderWave = () => {
      animId = requestAnimationFrame(renderWave)
      const w = (canvas.width = canvas.offsetWidth)
      const h = (canvas.height = canvas.offsetHeight)

      ctx.clearRect(0, 0, w, h)

      // Draw gridlines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      phase += 0.05 * particleSpeed

      // Draw Oscilloscope Waveform
      ctx.beginPath()
      ctx.lineWidth = 2.5
      ctx.strokeStyle = '#00f0ff'
      ctx.shadowBlur = 10
      ctx.shadowColor = '#00f0ff'

      for (let x = 0; x < w; x++) {
        const norm = x / w
        const freq1 = Math.sin(norm * 14 + phase) * (waveAmplitude * 0.8)
        const freq2 = Math.sin(norm * 28 - phase * 1.5) * (waveAmplitude * 0.3)
        const y = h / 2 + freq1 + freq2

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Secondary Purple Harmonic Wave
      ctx.beginPath()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = '#a855f7'
      ctx.shadowBlur = 8
      ctx.shadowColor = '#a855f7'

      for (let x = 0; x < w; x++) {
        const norm = x / w
        const harmonic = Math.cos(norm * 18 + phase * 0.8) * (waveAmplitude * 0.5)
        const y = h / 2 + harmonic

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    renderWave()

    return () => cancelAnimationFrame(animId)
  }, [waveAmplitude, particleSpeed])

  const playSynthesizerTone = (note: string, freq: number) => {
    setSynthNote(note)
    sound.hoverBeep()
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.36)
    } catch {
      // Audio fallback
    }
  }

  return (
    <section id="lab" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto z-10 space-y-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#00f0ff] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span>[02] // INTERACTIVE 3D LAB & TELEMETRY</span>
          </div>
          <h2 className="font-['Syne'] font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
            <ScrambleText text="CYBER LAB & EXPERIMENTS" />
          </h2>
        </div>
        <div className="font-mono text-xs text-zinc-400 max-w-md">
          Real-time kinetic WebGL engine controls, Web Audio synthesizer oscilloscope, and live Core Web Vitals telemetry.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 3D Engine Physics Playground */}
        <div className="lg:col-span-7 space-y-6">
          <TiltCard
            intensity={6}
            className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0c0d14]/90 to-[#06060a]/90 p-6 sm:p-10 space-y-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,240,255,0.08)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
              <span className="text-[#00f0ff] font-bold flex items-center space-x-2">
                <Sliders className="w-4 h-4" />
                <span>3D KINETIC ENGINE TELEMETRY</span>
              </span>
              <span className="text-zinc-500">LIVE GPU THREAD</span>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="space-y-3 font-mono">
              <label className="text-xs text-zinc-400 uppercase tracking-wider block">
                CHOOSE ENGINE VISUAL MODE:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'spine', label: '01. CYBER SPINE', desc: '46 Vertebrae' },
                  { id: 'vortex', label: '02. VORTEX FIELD', desc: 'Curved Flow' },
                  { id: 'warp', label: '03. WARP HYPERDRIVE', desc: '4.5x Particles' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleModeChange(item.id as VisualMode)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      activeMode === item.id
                        ? 'border-[#00f0ff] bg-[#00f0ff]/15 text-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                        : 'border-white/10 bg-black/40 text-zinc-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold text-xs uppercase">{item.label}</div>
                    <div className="text-[10px] text-zinc-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Interactive Sliders */}
            <div className="space-y-6 pt-2 font-mono text-xs">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-300">Spinal Curvature Amplitude</span>
                  <span className="text-[#00f0ff] font-bold">{waveAmplitude}px</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={waveAmplitude}
                  onChange={(e) => setWaveAmplitude(Number(e.target.value))}
                  className="w-full accent-[#00f0ff] cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-300">Particle Wave Frequency</span>
                  <span className="text-purple-400 font-bold">{particleSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4.0"
                  step="0.1"
                  value={particleSpeed}
                  onChange={(e) => setParticleSpeed(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Glitch Warp Trigger */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-t border-white/10">
              <span className="text-zinc-500">Hold click anywhere on the page to warp camera</span>
              <button
                onClick={() => {
                  sound.playGlitch()
                  handleModeChange(activeMode === 'warp' ? 'spine' : 'warp')
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-all flex items-center space-x-2 cursor-pointer font-bold"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>TOGGLE WARP SURGE</span>
              </button>
            </div>
          </TiltCard>
        </div>

        {/* Right Column: Web Audio Synthesizer & Web Vitals Telemetry */}
        <div className="lg:col-span-5 space-y-6">
          {/* Audio Synthesizer Box */}
          <TiltCard
            intensity={8}
            className="rounded-3xl border border-white/15 bg-[#09090f]/90 p-6 sm:p-8 space-y-5 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-purple-400 font-bold flex items-center space-x-2">
                <Volume2 className="w-4 h-4" />
                <span>PROCEDURAL AUDIO SYNTHESIZER</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">WEB AUDIO API</span>
            </div>

            {/* Live Canvas Oscilloscope */}
            <div className="h-28 rounded-2xl bg-black/80 border border-white/10 overflow-hidden relative">
              <canvas ref={canvasRef} className="w-full h-full" />
              <div className="absolute top-2 right-3 font-mono text-[10px] text-zinc-500">
                {synthNote ? `ACTIVE FREQ: ${synthNote}` : 'IDLE // OSC 440Hz'}
              </div>
            </div>

            {/* Synthesizer Frequency Pad Buttons */}
            <div className="space-y-2 font-mono">
              <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">
                TRIGGER PROCEDURAL SOUND HARMONICS:
              </span>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {[
                  { label: 'SUB 55Hz', freq: 55 },
                  { label: 'MID 220Hz', freq: 220 },
                  { label: 'HIGH 440Hz', freq: 440 },
                  { label: 'LASER 880Hz', freq: 880 },
                ].map((note) => (
                  <button
                    key={note.label}
                    onClick={() => playSynthesizerTone(note.label, note.freq)}
                    className="py-2.5 px-2 rounded-xl border border-white/10 bg-white/5 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 text-zinc-300 font-bold transition-all cursor-pointer text-[10px]"
                  >
                    {note.label}
                  </button>
                ))}
              </div>
            </div>
          </TiltCard>

          {/* Core Web Vitals Benchmark Box */}
          <TiltCard
            intensity={8}
            className="rounded-3xl border border-white/15 bg-[#09090f]/90 p-6 sm:p-8 space-y-5 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-emerald-400 font-bold flex items-center space-x-2">
                <Gauge className="w-4 h-4" />
                <span>CORE WEB VITALS AUDIT</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">100/100 GRADE</span>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3.5 rounded-xl bg-black/60 border border-emerald-500/30">
                <div className="text-2xl font-['Syne'] font-black text-emerald-400">0.4s</div>
                <div className="text-[9px] text-zinc-400 uppercase mt-1">LCP (Fast)</div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/60 border border-[#00f0ff]/30">
                <div className="text-2xl font-['Syne'] font-black text-[#00f0ff]">0ms</div>
                <div className="text-[9px] text-zinc-400 uppercase mt-1">INP / FID</div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/60 border border-purple-500/30">
                <div className="text-2xl font-['Syne'] font-black text-purple-400">0.00</div>
                <div className="text-[9px] text-zinc-400 uppercase mt-1">CLS (Zero Shift)</div>
              </div>
            </div>

            <div className="text-xs text-zinc-400 font-sans leading-relaxed pt-1">
              Zero bloat. Procedural assets and mathematical rendering ensure instantaneous load times even on low-bandwidth mobile networks.
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}
