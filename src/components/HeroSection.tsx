import React from 'react'
import { ArrowUpRight, Terminal, Zap, Activity, Eye } from 'lucide-react'
import { sound } from '../utils/soundEngine'
import { scrollEngine } from '../utils/scrollEngine'
import { ScrambleText } from './ScrambleText'
import { ScrollReveal } from './ScrollReveal'

interface HeroSectionProps {
  onOpenParadiseModal: () => void
  onOpenTerminal: () => void
  onCheckWork?: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenParadiseModal,
  onOpenTerminal,
  onCheckWork,
}) => {
  const handleScrollToWork = () => {
    sound.playChirp()
    if (onCheckWork) {
      onCheckWork()
    } else {
      const el = document.getElementById('work')
      if (el) scrollEngine.scrollTo(el, { offset: -40 })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 md:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Top Telemetry Tag */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-400">
        <div className="flex items-center space-x-2">
          <span className="text-[#00f0ff] font-bold">[00]</span>
          <span className="text-zinc-500">//</span>
          <span className="tracking-widest uppercase text-zinc-300">
            <ScrambleText text="CREATIVE DIGITAL MARKETER & WEB TECHNOLOGIST" />
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
            <span>AGE: <strong className="text-white">16</strong></span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
            STUDENT @ <strong className="text-white">IICS YAMUNA VIHAR</strong>
          </span>
          <span className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <span>CLIENT DEPLOYMENTS:</span>
            <strong className="text-white">PARADISEPUBLICSHOOL.COM</strong>
            <span className="text-zinc-500">•</span>
            <strong className="text-[#fb7185]">VIRGOVISOR.COM</strong>
          </span>
        </div>
      </div>

      {/* Main Massive Kinetic Title with Scroll-Driven Depth */}
      <ScrollReveal parallaxSpeed={-0.14} tilt={true} className="my-auto py-10 md:py-16 select-none relative">
        {/* Holographic Framing Brackets */}
        <div className="absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-[#00f0ff]/50 pointer-events-none" />
        <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b-2 border-r-2 border-[#00f0ff]/50 pointer-events-none" />

        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs md:text-sm font-mono text-[#00f0ff] tracking-widest uppercase bg-[#00f0ff]/10 px-3 py-1 rounded-full border border-[#00f0ff]/30 backdrop-blur-sm animate-pulse">
            <Activity className="w-3.5 h-3.5 animate-spin" />
            <span>CREATIVE DIGITAL ARCHITECTURE // HYDRA ENGINE</span>
          </div>

          <h1 className="font-['Syne'] font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] leading-[0.85] tracking-tighter text-white uppercase transition-all duration-300 glitch-hover">
            <span className="block hover:text-[#00f0ff] transition-all cursor-default tracking-tight">
              <ScrambleText text="DHURAV" triggerOnHover={true} speed={35} />
            </span>
          </h1>

          <div className="pt-2 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <h2 className="font-['Syne'] text-xl sm:text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight flex items-center gap-2">
                <span>Growth Marketing</span>
                <span className="text-[#00f0ff] animate-pulse">×</span>
                <span>Interactive WebGL</span>
              </h2>
              <p className="font-sans text-sm md:text-base text-zinc-400 leading-relaxed">
                At <span className="text-white font-semibold">16 years old</span>, advancing through rigorous professional training in <span className="text-purple-300 font-semibold">Digital Marketing at IICS Yamuna Vihar</span>. Architected client-facing platforms for <span className="text-[#00f0ff] font-semibold underline underline-offset-4 decoration-[#00f0ff]/40">paradisepublicschool.com</span> and <span className="text-[#fb7185] font-semibold underline underline-offset-4 decoration-[#fb7185]/40">virgovisor.com</span> (Vishnu Enterprises D2C), fusing algorithmic ROAS marketing with cinematic high-performance WebGL aesthetics.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs shrink-0">
              <button
                onClick={handleScrollToWork}
                onMouseEnter={() => sound.hoverBeep()}
                className="relative px-6 py-3.5 rounded-xl bg-[#00f0ff] text-black font-bold hover:bg-white hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all flex items-center space-x-2 cursor-pointer group overflow-hidden"
              >
                <Eye className="w-4 h-4 relative z-10" />
                <span className="relative z-10">CHECK MY WORK (FRONT PAGE)</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <button
                onClick={() => {
                  sound.playChirp()
                  onOpenParadiseModal()
                }}
                onMouseEnter={() => sound.hoverBeep()}
                className="px-4 py-3.5 rounded-xl border border-white/20 bg-black/40 text-zinc-300 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playChirp()
                  onOpenTerminal()
                }}
                onMouseEnter={() => sound.hoverBeep()}
                className="px-5 py-3.5 rounded-xl border border-zinc-700 bg-zinc-900/60 text-zinc-200 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-[#00f0ff]" />
                <span>LAUNCH_CLI</span>
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Bottom Live Metrics / HUD Bar with Pulsing Indicators */}
      <div className="pt-8 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="space-y-1 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:border-[#00f0ff]/40 transition-colors">
          <div className="text-zinc-500 text-[10px] flex items-center justify-between">
            <span>TRAINING HUB</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          </div>
          <div className="text-white font-semibold flex items-center space-x-1.5">
            <span>IICS Yamuna Vihar</span>
          </div>
          <div className="text-[11px] text-[#00f0ff]">Digital Marketing Specialization</div>
        </div>

        <div className="space-y-1 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:border-[#00f0ff]/40 transition-colors">
          <div className="text-zinc-500 text-[10px] flex items-center justify-between">
            <span>CLIENT PRODUCTIONS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="text-[#00f0ff] font-semibold truncate text-[11px]">
            paradise • virgovisor.com
          </div>
          <div className="text-[10px] text-zinc-400">School ERP & D2C E-Com</div>
        </div>

        <div className="space-y-1 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:border-[#00f0ff]/40 transition-colors">
          <div className="text-zinc-500 text-[10px] flex items-center justify-between">
            <span>VERIFIED RESULTS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
          </div>
          <div className="text-emerald-400 font-semibold">+340% Enq • 5.1x ROAS</div>
          <div className="text-[10px] text-zinc-400">#1 Local Pack & D2C Scale</div>
        </div>

        <div className="space-y-1 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:border-[#00f0ff]/40 transition-colors">
          <div className="text-zinc-500 text-[10px] flex items-center justify-between">
            <span>3D INTERACTIVITY</span>
            <Zap className="w-3 h-3 text-[#00f0ff]" />
          </div>
          <div className="text-purple-300 font-semibold">Hold Mouse To Warp</div>
          <div className="text-[11px] text-zinc-500">Kinetic Motion Engine</div>
        </div>
      </div>
    </section>
  )
}
