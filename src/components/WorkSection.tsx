import React, { useState } from 'react'
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Cpu,
  Laptop,
  Tablet,
  Smartphone,
  Lock,
  RotateCw,
  Maximize2,
} from 'lucide-react'
import { sound } from '../utils/soundEngine'
import { TiltCard } from './TiltCard'
import { ScrambleText } from './ScrambleText'
import { ScrollReveal } from './ScrollReveal'

interface WorkSectionProps {
  onOpenParadiseModal: () => void
  onOpenFrontPageModal?: (projectId: string) => void
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile'

export const WorkSection: React.FC<WorkSectionProps> = ({
  onOpenParadiseModal,
  onOpenFrontPageModal,
}) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation()
    sound.hoverBeep()
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const triggerOpenFrontPage = (projectId: string = 'paradise') => {
    sound.playChirp()
    if (onOpenFrontPageModal) {
      onOpenFrontPageModal(projectId)
    } else {
      onOpenParadiseModal()
    }
  }

  const getDeviceWidthClass = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'max-w-[340px]'
      case 'tablet':
        return 'max-w-[480px]'
      case 'desktop':
      default:
        return 'w-full'
    }
  }

  return (
    <section id="work" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto z-10 space-y-16">
      {/* Section Header */}
      <ScrollReveal parallaxSpeed={-0.08} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#00f0ff] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span>[01] // FEATURED CLIENT PRODUCTION</span>
          </div>
          <h2 className="font-['Syne'] font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
            <ScrambleText text="CHECK MY WORK" />
          </h2>
        </div>
        <div className="font-mono text-xs text-zinc-400 max-w-md">
          Commercial institutional deployments and high-converting marketing ecosystems engineered by{' '}
          <strong className="text-white">Dhurav (Age 16)</strong>.
        </div>
      </ScrollReveal>

      {/* Flagship Project: Paradise Public School with Live Front Page Showcase */}
      <ScrollReveal parallaxSpeed={0.06} tilt={true}>
        <TiltCard
          intensity={4}
          className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0e1017]/95 via-[#08080f]/98 to-[#040407]/98 overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.12)] group hover:border-[#00f0ff]/60 transition-all backdrop-blur-xl"
        >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#00f0ff]/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        <div className="p-6 sm:p-10 md:p-12 flex flex-col xl:flex-row gap-10 xl:gap-12 items-stretch">
          {/* Left Details Column */}
          <div className="w-full xl:w-5/12 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-mono bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 font-bold flex items-center space-x-1.5 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>FLAGSHIP PRODUCTION</span>
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-zinc-300">
                  CBSE #2130842
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  GROWTH MARKETING + WEB PLATFORM
                </span>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-mono text-zinc-500 tracking-widest uppercase">
                  CLIENT PRODUCTION // ESTD. 1994
                </div>
                <h3 className="font-['Syne'] font-black text-3xl sm:text-5xl text-white group-hover:text-[#00f0ff] transition-colors tracking-tight leading-none">
                  Paradise Public School
                </h3>
                <div className="font-mono text-xs text-zinc-400">
                  <a
                    href="https://paradisepublicschool.com"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.stopPropagation()
                      sound.playChirp()
                    }}
                    className="text-[#00f0ff] hover:underline inline-flex items-center space-x-1 tracking-wider"
                  >
                    <span>https://paradisepublicschool.com</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
                <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed pt-2">
                  Engineered from scratch by <strong className="text-white">Dhurav</strong> while pursuing professional Digital Marketing at <strong className="text-purple-300">IICS Yamuna Vihar</strong>. Transformed the institution’s operations into a unified high-converting digital platform: local SEO dominance, digital admissions funnel, automated fee collection, and cross-platform apps.
                </p>
              </div>

              {/* Performance Metrics Trio */}
              <div className="grid grid-cols-3 gap-3 font-mono text-center pt-2">
                <div className="p-4 rounded-2xl bg-black/60 border border-[#00f0ff]/30 group-hover:border-[#00f0ff] transition-all">
                  <div className="text-2xl sm:text-3xl font-['Syne'] font-black text-[#00f0ff]">+340%</div>
                  <div className="text-[10px] text-zinc-400 uppercase mt-1">Admissions Surge</div>
                </div>
                <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 group-hover:border-emerald-400 transition-all">
                  <div className="text-2xl sm:text-3xl font-['Syne'] font-black text-emerald-400">#1</div>
                  <div className="text-[10px] text-zinc-400 uppercase mt-1">Google 3-Pack</div>
                </div>
                <div className="p-4 rounded-2xl bg-black/60 border border-purple-500/30 group-hover:border-purple-400 transition-all">
                  <div className="text-2xl sm:text-4xl font-['Syne'] font-black text-purple-400">100</div>
                  <div className="text-[10px] text-zinc-400 uppercase mt-1">Core Web Vitals</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 font-mono text-xs">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  triggerOpenFrontPage('paradise')
                }}
                onMouseEnter={() => sound.hoverBeep()}
                className="px-5 py-3.5 rounded-2xl bg-[#00f0ff] text-black font-bold hover:bg-white transition-all flex items-center space-x-2 cursor-pointer shadow-[0_0_30px_rgba(0,240,255,0.4)]"
              >
                <Maximize2 className="w-4 h-4" />
                <span>INSPECT FRONT PAGE</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  sound.playChirp()
                  onOpenParadiseModal()
                }}
                onMouseEnter={() => sound.hoverBeep()}
                className="px-5 py-3.5 rounded-2xl border border-white/20 hover:border-[#00f0ff] text-zinc-200 hover:text-[#00f0ff] transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>FULL CASE STUDY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://paradisepublicschool.com"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.stopPropagation()
                  sound.playChirp()
                }}
                onMouseEnter={() => sound.hoverBeep()}
                className="p-3.5 rounded-2xl border border-white/10 hover:border-[#00f0ff] text-zinc-400 hover:text-[#00f0ff] transition-all flex items-center justify-center"
                title="Visit Live Domain"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Visual: INTERACTIVE FRONT PAGE BROWSER WINDOW */}
          <div className="w-full xl:w-7/12 flex flex-col items-center">
            <div className="w-full rounded-2xl border border-white/20 bg-zinc-950 shadow-2xl overflow-hidden flex flex-col">
              
              {/* Browser Window Chrome */}
              <div className="px-4 py-2.5 bg-[#0b0d14] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                {/* Traffic Lights */}
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-zinc-500 text-[10px] ml-1">paradisepublicschool.com</span>
                </div>

                {/* URL Bar */}
                <div className="flex-1 max-w-xs mx-auto flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-[11px] text-zinc-300">
                  <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">https://paradisepublicschool.com</span>
                  <button
                    onClick={handleRefresh}
                    className={`ml-auto text-zinc-500 hover:text-zinc-300 ${
                      isRefreshing ? 'animate-spin' : ''
                    }`}
                  >
                    <RotateCw className="w-3 h-3" />
                  </button>
                </div>

                {/* Device Mode Switcher */}
                <div className="flex items-center space-x-1">
                  <div className="flex items-center bg-black/60 rounded-md border border-white/10 p-0.5 text-zinc-400">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        sound.hoverBeep()
                        setDeviceMode('desktop')
                      }}
                      className={`p-1 rounded ${
                        deviceMode === 'desktop' ? 'bg-[#00f0ff] text-black' : 'hover:text-white'
                      }`}
                      title="Desktop Mode"
                    >
                      <Laptop className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        sound.hoverBeep()
                        setDeviceMode('tablet')
                      }}
                      className={`p-1 rounded ${
                        deviceMode === 'tablet' ? 'bg-[#00f0ff] text-black' : 'hover:text-white'
                      }`}
                      title="Tablet Mode"
                    >
                      <Tablet className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        sound.hoverBeep()
                        setDeviceMode('mobile')
                      }}
                      className={`p-1 rounded ${
                        deviceMode === 'mobile' ? 'bg-[#00f0ff] text-black' : 'hover:text-white'
                      }`}
                      title="Mobile Mode"
                    >
                      <Smartphone className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      triggerOpenFrontPage('paradise')
                    }}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 transition-colors cursor-pointer"
                    title="Expand Fullscreen Front Page"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Browser Body Viewport */}
              <div
                className="bg-black/95 p-2 sm:p-3 overflow-y-auto max-h-[460px] flex justify-center cursor-pointer relative group/preview"
                onClick={() => triggerOpenFrontPage('paradise')}
              >
                <div
                  className={`${getDeviceWidthClass()} transition-all duration-300 rounded-lg overflow-hidden border border-white/10 bg-white text-zinc-900 shadow-xl`}
                >
                  {/* Front Page Simulator Content */}
                  <div className="font-sans text-xs">
                    {/* 1. Ticker */}
                    <div className="bg-[#1e3a8a] text-white py-1 px-3 flex items-center justify-between text-[10px]">
                      <div className="flex items-center space-x-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
                        <span className="font-bold">ADMISSIONS OPEN (2026-27):</span>
                        <span className="truncate">Nursery to Class 8 • CBSE English Medium</span>
                      </div>
                      <span className="hidden sm:inline font-mono text-[9px] text-blue-200">
                        CBSE #2130842
                      </span>
                    </div>

                    {/* 2. Header */}
                    <div className="p-3 bg-white border-b border-zinc-200 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src="/paradise-logo.svg"
                          alt="Paradise Logo"
                          className="w-7 h-7 object-contain"
                        />
                        <div>
                          <div className="font-['Syne'] font-black text-xs sm:text-sm text-blue-950">
                            PARADISE PUBLIC SCHOOL
                          </div>
                          <div className="text-[9px] text-zinc-500">Yamuna Vihar, Delhi</div>
                        </div>
                      </div>
                      <div className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold text-[10px]">
                        Apply 2026-27
                      </div>
                    </div>

                    {/* 3. Hero Visual Front Page Banner */}
                    <div className="p-5 bg-gradient-to-b from-blue-50/60 to-white text-center space-y-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-semibold">
                        Foundational Eminence
                      </span>
                      <h4 className="text-base sm:text-xl font-['Syne'] font-black text-zinc-900 leading-tight">
                        Nurturing Tomorrow’s Leaders Through Foundational Rigor
                      </h4>
                      <p className="text-[11px] text-zinc-600 line-clamp-2 max-w-md mx-auto">
                        32+ Years of Academic Rigor, Atal Tinkering Jr. Innovation Labs, World-Class Sports Turf, and Deeply Rooted Indian Values.
                      </p>

                      <div className="flex items-center justify-center gap-2 pt-1">
                        <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-[10px] shadow-xs">
                          Admission Inquiry
                        </span>
                        <span className="px-2.5 py-1.5 rounded-lg border border-zinc-300 text-zinc-700 text-[10px]">
                          Curriculum
                        </span>
                      </div>

                      {/* Stats row */}
                      <div className="grid grid-cols-4 gap-2 pt-3">
                        <div className="p-2 rounded-lg bg-white border border-blue-100 text-center shadow-xs">
                          <div className="font-bold text-blue-600 text-sm">32+</div>
                          <div className="text-[8px] text-zinc-500 uppercase">Years</div>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-blue-100 text-center shadow-xs">
                          <div className="font-bold text-emerald-600 text-sm">100%</div>
                          <div className="text-[8px] text-zinc-500 uppercase">Pass Rate</div>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-blue-100 text-center shadow-xs">
                          <div className="font-bold text-purple-600 text-sm">35+</div>
                          <div className="text-[8px] text-zinc-500 uppercase">Clubs</div>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-blue-100 text-center shadow-xs">
                          <div className="font-bold text-orange-600 text-sm">15:1</div>
                          <div className="text-[8px] text-zinc-500 uppercase">Ratio</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Reveal Fullscreen Badge */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 rounded-xl bg-[#00f0ff] text-black font-mono font-bold text-xs flex items-center space-x-2 shadow-[0_0_20px_#00f0ff]">
                    <Maximize2 className="w-4 h-4" />
                    <span>CLICK TO INSPECT FULL FRONT PAGE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
      </ScrollReveal>

      {/* Secondary Project Cards: Nexus Performance & CyberPulse SEO */}
      <ScrollReveal parallaxSpeed={0.10} delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 2: Performance Ad Suite */}
          <TiltCard
            intensity={8}
            className="rounded-3xl border border-white/10 bg-[#09090f]/90 p-8 sm:p-10 space-y-5 hover:border-purple-500/50 transition-all group backdrop-blur-xl"
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-purple-400 font-bold flex items-center space-x-1.5 tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>[02] PERFORMANCE AD ARCHITECTURE</span>
              </span>
              <span className="text-zinc-500">IICS LAB</span>
            </div>

            <h4 className="font-['Syne'] font-black text-2xl sm:text-3xl text-white group-hover:text-purple-300 transition-colors uppercase">
              Nexus Performance & Meta Ads Funnel
            </h4>

            <p className="text-sm text-zinc-400 font-sans leading-relaxed">
              Engineered full-funnel paid acquisition architecture utilizing Meta Advantage+ Campaigns, CBO budgeting, programmatic video creative hooks, and server-side Conversions API (CAPI) to eliminate attribution loss.
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-[11px] pt-2">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">Meta Ads Manager</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">Google Ads Search</span>
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">ROAS 4.2x Benchmark</span>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
              <button
                onClick={() => triggerOpenFrontPage('nexus')}
                className="text-purple-400 hover:text-white flex items-center space-x-1 cursor-pointer"
              >
                <span>INSPECT ARCHITECTURE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-purple-400 font-medium">Verified CBO Framework</span>
            </div>
          </TiltCard>

          {/* Project 3: Cyberpulse SEO Engine */}
          <TiltCard
            intensity={8}
            className="rounded-3xl border border-white/10 bg-[#09090f]/90 p-8 sm:p-10 space-y-5 hover:border-emerald-500/50 transition-all group backdrop-blur-xl"
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-emerald-400 font-bold flex items-center space-x-1.5 tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>[03] PROGRAMMATIC ORGANIC SEO</span>
              </span>
              <span className="text-zinc-500">IICS LAB</span>
            </div>

            <h4 className="font-['Syne'] font-black text-2xl sm:text-3xl text-white group-hover:text-emerald-300 transition-colors uppercase">
              CyberPulse SEO & Keyword Dominance
            </h4>

            <p className="text-sm text-zinc-400 font-sans leading-relaxed">
              Automated organic ranking system developed during Dhurav's training at IICS Yamuna Vihar. Focuses on entity SEO, structured JSON-LD schemas, high-intent localized search queries, and content clusters that capture zero-click Google snippets.
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-[11px] pt-2">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">Semrush Auditing</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">Google Search Console</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Local 3-Pack</span>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
              <button
                onClick={() => triggerOpenFrontPage('cyberpulse')}
                className="text-emerald-400 hover:text-white flex items-center space-x-1 cursor-pointer"
              >
                <span>INSPECT ARCHITECTURE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-emerald-400 font-medium">+280% Impressions</span>
            </div>
          </TiltCard>
        </div>
      </ScrollReveal>
    </section>
  )
}
