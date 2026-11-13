import React, { useState } from 'react'
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  Laptop,
  Tablet,
  Smartphone,
  Lock,
  RotateCw,
  Maximize2,
  ShoppingBag,
  Truck,
} from 'lucide-react'
import { sound } from '../utils/soundEngine'
import { TiltCard } from './TiltCard'
import { ScrambleText } from './ScrambleText'
import { ScrollReveal } from './ScrollReveal'
import { PROJECTS_DATA, type ProjectData } from '../data/projectsData'

interface WorkSectionProps {
  onOpenParadiseModal: () => void
  onOpenFrontPageModal?: (projectId: string) => void
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile'

export const WorkSection: React.FC<WorkSectionProps> = ({
  onOpenParadiseModal,
  onOpenFrontPageModal,
}) => {
  const [activeProjectId, setActiveProjectId] = useState<string>('paradise')
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const activeProject: ProjectData =
    PROJECTS_DATA.find((p) => p.id === activeProjectId) || PROJECTS_DATA[0]

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation()
    sound.hoverBeep()
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const triggerOpenFrontPage = (projectId: string = activeProjectId) => {
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
            <span>[01] // COMMERCIAL WORK & PLATFORMS</span>
          </div>
          <h2 className="font-['Syne'] font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
            <ScrambleText text="SELECTED WORK" />
          </h2>
        </div>
        <div className="font-mono text-xs text-zinc-400 max-w-md">
          Client deployments, D2C e-commerce stores, and high-converting marketing architectures engineered by{' '}
          <strong className="text-white">Dhurav (Age 16)</strong>.
        </div>
      </ScrollReveal>

      {/* Interactive Kinetic Project Navigator Bar */}
      <ScrollReveal parallaxSpeed={-0.04}>
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
          <div className="flex items-center space-x-2">
            {PROJECTS_DATA.map((proj, idx) => {
              const isSelected = proj.id === activeProjectId
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    sound.hoverBeep()
                    setActiveProjectId(proj.id)
                  }}
                  className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center space-x-2.5 ${
                    isSelected
                      ? 'bg-[#00f0ff] text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <span className="text-[10px] opacity-70">0{idx + 1}.</span>
                  <span className="tracking-wider uppercase">{proj.title}</span>
                </button>
              )
            })}
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-[11px] text-zinc-500">
            <span>ACTIVE STAGE:</span>
            <span className="text-[#00f0ff] font-bold uppercase">{activeProject.title}</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Interactive Stage: Kinetic Split View */}
      <ScrollReveal parallaxSpeed={0.06} tilt={true}>
        <TiltCard
          intensity={4}
          className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0e1017]/95 via-[#08080f]/98 to-[#040407]/98 overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.12)] group hover:border-[#00f0ff]/60 transition-all backdrop-blur-xl"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-[#00f0ff]/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div className="p-6 sm:p-10 md:p-12 flex flex-col xl:flex-row gap-10 xl:gap-12 items-stretch">
            {/* Left Details Column */}
            <div className="w-full xl:w-5/12 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                {/* Category & Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full text-[11px] font-mono bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 font-bold flex items-center space-x-1.5 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FEATURED PRODUCTION</span>
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-zinc-300">
                    {activeProject.category}
                  </span>
                </div>

                {/* Project Title with Kinetic Monolith Letter Spacing */}
                <div className="space-y-3">
                  <div className="text-xs font-mono text-zinc-500 tracking-widest uppercase">
                    DEPLOYMENT IDENTIFIER // {activeProject.displayUrl}
                  </div>

                  <h3 className="font-['Syne'] font-black text-3xl sm:text-5xl text-white group-hover:text-[#00f0ff] transition-colors tracking-tight leading-none uppercase">
                    {activeProject.title}
                  </h3>

                  <div className="font-mono text-xs text-zinc-400">
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        e.stopPropagation()
                        sound.playChirp()
                      }}
                      className="text-[#00f0ff] hover:underline inline-flex items-center space-x-1 tracking-wider"
                    >
                      <span>https://{activeProject.displayUrl}</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed pt-2">
                    {activeProject.description}
                  </p>
                </div>

                {/* Verified Performance Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-center pt-2">
                  {activeProject.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-black/60 border border-white/10 group-hover:border-[#00f0ff]/30 transition-all"
                    >
                      <div
                        className="text-xl sm:text-2xl font-['Syne'] font-black"
                        style={{ color: m.color }}
                      >
                        {m.value}
                      </div>
                      <div className="text-[9px] text-zinc-400 uppercase mt-1 truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                  {activeProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 font-mono text-xs">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    triggerOpenFrontPage(activeProjectId)
                  }}
                  onMouseEnter={() => sound.hoverBeep()}
                  className="px-5 py-3.5 rounded-2xl bg-[#00f0ff] text-black font-bold hover:bg-white transition-all flex items-center space-x-2 cursor-pointer shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>INSPECT FRONT PAGE</span>
                </button>

                {activeProjectId === 'paradise' ? (
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
                ) : null}

                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation()
                    sound.playChirp()
                  }}
                  onMouseEnter={() => sound.hoverBeep()}
                  className="px-4 py-3.5 rounded-2xl border border-white/10 hover:border-[#00f0ff] text-zinc-300 hover:text-[#00f0ff] transition-all flex items-center space-x-1.5"
                >
                  <span>LIVE DOMAIN</span>
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
                    <span className="text-zinc-500 text-[10px] ml-1">{activeProject.displayUrl}</span>
                  </div>

                  {/* URL Bar */}
                  <div className="flex-1 max-w-xs mx-auto flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-[11px] text-zinc-300">
                    <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">https://{activeProject.displayUrl}</span>
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
                        triggerOpenFrontPage(activeProjectId)
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
                  className="bg-black/95 p-2 sm:p-3 overflow-y-auto max-h-[480px] flex justify-center cursor-pointer relative group/preview"
                  onClick={() => triggerOpenFrontPage(activeProjectId)}
                >
                  <div
                    className={`${getDeviceWidthClass()} transition-all duration-300 rounded-lg overflow-hidden border border-white/10 bg-white text-zinc-900 shadow-xl`}
                  >
                    {activeProjectId === 'virgovisor' ? (
                      /* VIRGOVISOR.COM FRONT PAGE SIMULATOR */
                      <div className="font-sans text-xs bg-zinc-950 text-white select-text">
                        {/* 1. Free Shipping Bar */}
                        <div className="bg-[#e11d48] text-white py-1 px-3 flex items-center justify-between text-[10px] font-mono">
                          <div className="flex items-center space-x-1.5 truncate">
                            <Truck className="w-3 h-3 shrink-0" />
                            <span className="font-bold">FREE ALL-INDIA DELIVERY:</span>
                            <span className="truncate">Cash on Delivery & Instant UPI Available</span>
                          </div>
                          <span className="hidden sm:inline text-[9px] bg-black/40 px-2 py-0.5 rounded">
                            100% SCRATCH RESISTANT
                          </span>
                        </div>

                        {/* 2. E-Commerce Navigation */}
                        <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-lg bg-[#e11d48] flex items-center justify-center font-black text-white text-xs">
                              V
                            </div>
                            <div>
                              <div className="font-['Syne'] font-black text-sm text-white tracking-wider">
                                VIRGO VISOR
                              </div>
                              <div className="text-[9px] text-zinc-400">By Vishnu Enterprises • D2C Gear</div>
                            </div>
                          </div>

                          <div className="hidden sm:flex items-center space-x-4 text-[11px] text-zinc-300">
                            <span className="text-[#e11d48] font-bold">Visors</span>
                            <span>Vega</span>
                            <span>Steelbird</span>
                            <span>Studds</span>
                            <span>LS2</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="px-2.5 py-1 rounded bg-[#e11d48] text-white font-bold text-[10px] flex items-center space-x-1">
                              <ShoppingBag className="w-3 h-3" />
                              <span>Store</span>
                            </span>
                          </div>
                        </div>

                        {/* 3. Hero Banner */}
                        <div className="p-6 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-center space-y-3">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#e11d48]/15 border border-[#e11d48]/40 text-[#f43f5e] text-[10px] font-mono">
                            ✦ OPTICAL-GRADE POLYCARBONATE
                          </span>

                          <h4 className="text-base sm:text-xl font-['Syne'] font-black text-white leading-tight uppercase">
                            Crystal Clear Vision. Hard-Coat Scratch Defense.
                          </h4>

                          <p className="text-[11px] text-zinc-400 line-clamp-2 max-w-md mx-auto">
                            Replacement helmet visors for India’s top helmet brands with UV400 radiation shield and zero optical distortion.
                          </p>

                          {/* 4. Visor Product Catalog Grid */}
                          <div className="grid grid-cols-3 gap-2 pt-2 text-left">
                            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                              <div className="w-full h-14 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 text-[10px]">
                                CLEAR VISOR
                              </div>
                              <div className="font-bold text-white text-[11px]">Clear Optical</div>
                              <div className="text-[9px] text-zinc-400">Day & Night 99%</div>
                              <div className="text-[#e11d48] font-black text-xs">₹499</div>
                            </div>

                            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                              <div className="w-full h-14 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 text-[10px]">
                                SMOKE VISOR
                              </div>
                              <div className="font-bold text-white text-[11px]">Smoke Tinted</div>
                              <div className="text-[9px] text-zinc-400">Anti-Sun Glare</div>
                              <div className="text-[#e11d48] font-black text-xs">₹549</div>
                            </div>

                            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                              <div className="w-full h-14 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 text-[10px]">
                                RAINBOW VISOR
                              </div>
                              <div className="font-bold text-white text-[11px]">Iridium Mirror</div>
                              <div className="text-[9px] text-zinc-400">Flash Reflective</div>
                              <div className="text-[#e11d48] font-black text-xs">₹699</div>
                            </div>
                          </div>

                          {/* Helmet Compatibility Pills */}
                          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 text-[9px] font-mono text-zinc-400">
                            <span className="text-zinc-500">FITMENT:</span>
                            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">Vega Bolt/Crux</span>
                            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">Steelbird SBA</span>
                            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">Studds Ninja</span>
                            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">LS2 Rapid</span>
                          </div>
                        </div>
                      </div>
                    ) : activeProjectId === 'paradise' ? (
                      /* PARADISE PUBLIC SCHOOL FRONT PAGE SIMULATOR */
                      <div className="font-sans text-xs select-text">
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
                    ) : (
                      /* SIMULATOR FOR NEXUS & CYBERPULSE */
                      <div className="p-6 text-zinc-100 font-mono bg-zinc-950 space-y-4 select-text">
                        <div className="border-b border-zinc-800 pb-4 space-y-1">
                          <span className="text-[10px] text-[#00f0ff] uppercase">{activeProject.category}</span>
                          <h4 className="text-lg font-['Syne'] font-black text-white">{activeProject.heroTitle}</h4>
                        </div>
                        <p className="text-xs text-zinc-400 font-sans leading-relaxed">{activeProject.description}</p>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          {activeProject.metrics.map((m, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                              <div className="text-lg font-black" style={{ color: m.color }}>{m.value}</div>
                              <div className="text-[9px] text-zinc-500 uppercase">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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

      {/* Secondary Project Cards: Kinetic Grid */}
      <ScrollReveal parallaxSpeed={0.10} delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS_DATA.filter((p) => p.id !== activeProjectId).slice(0, 3).map((proj) => (
            <TiltCard
              key={proj.id}
              intensity={8}
              className="rounded-3xl border border-white/10 bg-[#09090f]/90 p-6 sm:p-8 space-y-4 hover:border-[#00f0ff]/50 transition-all group backdrop-blur-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#00f0ff] font-bold tracking-wider truncate">
                    {proj.category.split(' // ')[0]}
                  </span>
                  <span className="text-zinc-500 shrink-0">PRODUCTION</span>
                </div>

                <h4 className="font-['Syne'] font-black text-xl sm:text-2xl text-white group-hover:text-[#00f0ff] transition-colors uppercase">
                  {proj.title}
                </h4>

                <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] pt-1">
                  {proj.tags.slice(0, 3).map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                <button
                  onClick={() => {
                    sound.hoverBeep()
                    setActiveProjectId(proj.id)
                  }}
                  className="text-[#00f0ff] hover:text-white flex items-center space-x-1 cursor-pointer"
                >
                  <span>VIEW FRONT PAGE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={proj.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playChirp()}
                  className="text-zinc-500 hover:text-white"
                  title="Open live link"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
