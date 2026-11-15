import React, { useState, useEffect, useRef } from 'react'
import {
  ExternalLink,
  Laptop,
  Tablet,
  Smartphone,
  Lock,
  RotateCw,
  GraduationCap,
  Shield,
  ChevronDown,
  ChevronUp,
  Monitor,
  Cpu,
  Layers,
  Sparkles,
  Truck,
  ArrowRight,
} from 'lucide-react'
import { sound } from '../utils/soundEngine'
import { scrollEngine } from '../utils/scrollEngine'
import { ScrambleText } from './ScrambleText'
import { ScrollReveal } from './ScrollReveal'
import { PROJECTS_DATA, type ProjectData } from '../data/projectsData'

interface WorkSectionProps {
  onOpenParadiseModal?: () => void
  onOpenFrontPageModal?: (projectId: string) => void
  onOpenTerminal?: () => void
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile'
type CardViewMode = 'frontpage' | 'liveframe' | 'reticle'

export const WorkSection: React.FC<WorkSectionProps> = ({
  onOpenTerminal,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [cardViewMode, setCardViewMode] = useState<CardViewMode>('frontpage')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [showInlineBrowser, setShowInlineBrowser] = useState(true)
  const stageRef = useRef<HTMLDivElement>(null)

  const activeProject: ProjectData = PROJECTS_DATA[activeIndex] || PROJECTS_DATA[0]

  const openLiveWebsite = (url: string = activeProject.url) => {
    sound.playChirp()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleNext = () => {
    sound.hoverBeep()
    setActiveIndex((prev) => (prev + 1) % PROJECTS_DATA.length)
  }

  const handlePrev = () => {
    sound.hoverBeep()
    setActiveIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length)
  }

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation()
    sound.hoverBeep()
    setIsRefreshing(true)
    setRefreshKey((k) => k + 1)
    setTimeout(() => setIsRefreshing(false), 500)
  }

  // Keyboard navigation for 3D stage
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Mouse tilt on 3D active card via CSS Custom Properties (Zero React re-renders)
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    stageRef.current.style.setProperty('--tilt-x', `${(x * 10).toFixed(2)}deg`)
    stageRef.current.style.setProperty('--tilt-y', `${(-y * 10).toFixed(2)}deg`)
  }

  const handleStageMouseLeave = () => {
    if (!stageRef.current) return
    stageRef.current.style.setProperty('--tilt-x', '0deg')
    stageRef.current.style.setProperty('--tilt-y', '0deg')
  }

  const getDeviceWidthClass = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-[375px] max-w-[100%]'
      case 'tablet':
        return 'w-[768px] max-w-[100%]'
      case 'desktop':
      default:
        return 'w-full'
    }
  }

  // Distinct styling configurations for each project card
  const getCardTheme = (id: string) => {
    switch (id) {
      case 'paradise':
        return {
          accentColor: '#00f0ff',
          borderColor: 'border-[#00f0ff]/60',
          glowShadow: '0 0 60px rgba(0, 240, 255, 0.35)',
          glowBg: 'from-[#00f0ff]/15 via-blue-900/10 to-transparent',
          line1: '.PARADISE',
          line2: 'PUBLIC SCHOOL',
          icon: <GraduationCap className="w-8 h-8 text-[#00f0ff]" />,
          tagline: 'CBSE ADMISSIONS & ERP // ESTD. 1994',
          coords: '28.7041° N, 77.1025° E',
        }
      case 'virgovisor':
      default:
        return {
          accentColor: '#a855f7',
          borderColor: 'border-[#a855f7]/60',
          glowShadow: '0 0 60px rgba(168, 85, 247, 0.35)',
          glowBg: 'from-[#a855f7]/15 via-purple-950/20 to-transparent',
          line1: '.VIRGO',
          line2: 'VISOR',
          icon: <Shield className="w-8 h-8 text-[#c084fc]" />,
          tagline: 'OPTICAL HELMET VISORS // VISHNU ENTERPRISES',
          coords: 'PAN-INDIA D2C // DISPATCH <24H',
        }
    }
  }

  return (
    <section
      id="work"
      className="relative min-h-[92vh] flex flex-col justify-between py-10 px-4 sm:px-8 max-w-[1440px] mx-auto z-10 select-none overflow-hidden space-y-8"
    >
      {/* ======================================================== */}
      {/* TOP HUD BAR: Chapter Indicator + Top-Right Navigation Pills */}
      {/* ======================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 font-mono text-xs z-30">
        {/* Top-Left: Section Title & Chapter */}
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-[#00f0ff] uppercase tracking-widest text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span>[01] // SELECTED WORK &amp; PLATFORMS</span>
          </div>
          <h2 className="font-['Syne'] font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
            <ScrambleText text="FEATURED PRODUCTIONS" />
          </h2>
          <div className="text-[11px] text-zinc-400">
            Engineered by <strong className="text-white">Dhurav (Age 16)</strong> • Click any card or link to open live website
          </div>
        </div>

        {/* Top-Right: Pills matching screenshot [ WORK ~ CONTACT ] & << 01. PARADISE PUBLIC SCHOOL >> */}
        <div className="flex flex-col items-start sm:items-end space-y-2.5">
          {/* Pill 1: [ WORK ~ CONTACT ] with center wave */}
          <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full border border-white/20 bg-black/75 backdrop-blur-md shadow-xl text-xs font-mono">
            <button
              onClick={() => {
                sound.hoverBeep()
                const el = document.getElementById('work')
                if (el) scrollEngine.scrollTo(el, { offset: -40 })
              }}
              className="text-[#00f0ff] font-bold tracking-wider hover:text-white transition-colors cursor-pointer"
            >
              WORK
            </button>

            {/* Glowing Sine Wave Graphic */}
            <svg
              className="w-7 h-3 text-[#00f0ff] animate-pulse"
              viewBox="0 0 28 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 2 6 C 5 1, 9 11, 14 6 C 19 1, 23 11, 26 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>

            <button
              onClick={() => {
                sound.playChirp()
                const el = document.getElementById('contact')
                if (el) scrollEngine.scrollTo(el, { offset: -40 })
              }}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer tracking-wider"
            >
              CONTACT
            </button>
          </div>

          {/* Pill 2: Project Switcher */}
          <div className="inline-flex items-center justify-between space-x-2 px-3 py-1.5 rounded-full border border-white/15 bg-black/80 backdrop-blur-md shadow-lg text-[11px] font-mono text-zinc-300 min-w-[240px]">
            <button
              onClick={handlePrev}
              onMouseEnter={() => sound.hoverBeep()}
              className="px-2 py-0.5 rounded-full hover:bg-white/10 hover:text-[#00f0ff] transition-all cursor-pointer font-bold tracking-tighter"
              title="Previous Project (Arrow Left)"
            >
              &lt;&lt;
            </button>

            <div className="flex items-center space-x-1.5 truncate px-1">
              <span className="text-[#00f0ff] font-bold">0{activeIndex + 1}.</span>
              <span className="font-bold uppercase tracking-wider truncate max-w-[150px]">
                {activeProject.title}
              </span>
            </div>

            <button
              onClick={handleNext}
              onMouseEnter={() => sound.hoverBeep()}
              className="px-2 py-0.5 rounded-full hover:bg-white/10 hover:text-[#00f0ff] transition-all cursor-pointer font-bold tracking-tighter"
              title="Next Project (Arrow Right)"
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3D FLOATING CARDS STAGE CAROUSEL (CLEAN 2-CARD DISPLAY) */}
      {/* ======================================================== */}
      <div
        ref={stageRef}
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
        className="relative w-full h-[470px] sm:h-[500px] md:h-[530px] flex items-center justify-center my-4 perspective-[1400px] overflow-visible"
        style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
      >
        {PROJECTS_DATA.map((proj, idx) => {
          const isCenter = idx === activeIndex
          const theme = getCardTheme(proj.id)

          // 3D Matrix Transformations for 2-card showcase
          let transformStyle = ''
          let zIndex = 10
          let opacity = 0
          let pointerEvents: 'auto' | 'none' = 'none'

          if (isCenter) {
            transformStyle = `translate3d(0, 0, 0) rotateY(var(--tilt-x, 0deg)) rotateX(var(--tilt-y, 0deg)) scale(1)`
            zIndex = 30
            opacity = 1
            pointerEvents = 'auto'
          } else {
            const isSideRight = activeIndex === 0
            const tx = isSideRight ? 'calc(48% + 20px)' : 'calc(-48% - 20px)'
            const rotY = isSideRight ? -22 : 22
            transformStyle = `translate3d(${tx}, 14px, -180px) rotateY(${rotY}deg) scale(0.86)`
            zIndex = 15
            opacity = 0.7
            pointerEvents = 'auto'
          }

          return (
            <div
              key={proj.id}
              onClick={() => {
                if (!isCenter) {
                  sound.hoverBeep()
                  setActiveIndex(idx)
                }
              }}
              style={{
                transform: transformStyle,
                zIndex,
                opacity,
                pointerEvents,
                transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out',
                boxShadow: isCenter ? theme.glowShadow : 'none',
              }}
              className={`absolute w-[92vw] max-w-[540px] sm:max-w-[620px] md:max-w-[660px] h-[390px] sm:h-[420px] md:h-[450px] rounded-[30px] sm:rounded-[36px] border-2 ${
                theme.borderColor
              } bg-gradient-to-b from-black/95 via-[#080b14]/90 to-black/95 backdrop-blur-2xl p-5 sm:p-7 flex flex-col justify-between cursor-pointer group transition-shadow duration-500 overflow-hidden`}
            >
              {/* Radial Holographic Color Bloom inside Card */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${theme.glowBg} pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity`}
              />

              {/* High-Tech Grid Dots Texture */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

              {/* Fine Corner Holographic Brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/30 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/30 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/30 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/30 pointer-events-none" />

              {/* Top Card Telemetry Row + Front Page Mode Switcher */}
              <div className="flex items-center justify-between text-xs font-mono z-10">
                <div className="flex items-center space-x-2">
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                  <span className="text-zinc-400 text-[10px] sm:text-[11px] tracking-wider uppercase">
                    DEPLOYMENT IDENTIFIER // {proj.displayUrl}
                  </span>
                </div>

                {/* View Mode Toggle Pill on Center Card */}
                {isCenter && (
                  <div
                    className="flex items-center bg-black/80 rounded-full border border-white/15 p-0.5 space-x-0.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        sound.hoverBeep()
                        setCardViewMode('frontpage')
                      }}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                        cardViewMode === 'frontpage'
                          ? 'bg-[#00f0ff] text-black shadow-[0_0_8px_#00f0ff]'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      title="Show Authentic Front Page"
                    >
                      <Monitor className="w-2.5 h-2.5" />
                      <span>FRONT PAGE</span>
                    </button>
                    <button
                      onClick={() => {
                        sound.hoverBeep()
                        setCardViewMode('liveframe')
                      }}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                        cardViewMode === 'liveframe'
                          ? 'bg-[#00f0ff] text-black shadow-[0_0_8px_#00f0ff]'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      title="Show Live Web View"
                    >
                      <Layers className="w-2.5 h-2.5" />
                      <span>LIVE WEB</span>
                    </button>
                    <button
                      onClick={() => {
                        sound.hoverBeep()
                        setCardViewMode('reticle')
                      }}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                        cardViewMode === 'reticle'
                          ? 'bg-[#00f0ff] text-black shadow-[0_0_8px_#00f0ff]'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      title="Show 3D HUD Reticle"
                    >
                      <Cpu className="w-2.5 h-2.5" />
                      <span>HUD</span>
                    </button>
                  </div>
                )}
              </div>

              {/* ======================================================== */}
              {/* CENTER DISPLAY: AUTHENTIC FRONT PAGE, LIVE FRAME, OR HUD */}
              {/* ======================================================== */}
              {isCenter && cardViewMode === 'frontpage' ? (
                /* AUTHENTIC 100% VISIBLE INSTANT FRONT PAGE DISPLAY (OPENS WEBSITE ON CLICK) */
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playChirp()}
                  className="relative my-auto w-full rounded-2xl overflow-hidden border border-white/20 bg-zinc-950 shadow-2xl z-10 group/preview block text-left transition-transform duration-300 hover:scale-[1.01]"
                  title={`Click to open ${proj.url} in new tab`}
                >
                  {proj.id === 'paradise' ? (
                    /* PARADISE PUBLIC SCHOOL AUTHENTIC FRONT PAGE */
                    <div className="flex flex-col bg-slate-950 text-white font-sans text-xs select-none">
                      {/* Notice Ticker */}
                      <div className="bg-[#1e3a8a] px-3 py-1 text-[9px] sm:text-[10px] font-medium flex items-center justify-between border-b border-blue-900/60">
                        <div className="flex items-center space-x-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping shrink-0" />
                          <span className="font-bold tracking-wide text-yellow-300">ADMISSIONS OPEN (2026-27):</span>
                          <span className="truncate text-blue-100">Nursery to Class 8 • CBSE English Medium</span>
                        </div>
                        <span className="hidden sm:inline text-[9px] text-blue-200 font-mono">
                          Affiliation #2130842
                        </span>
                      </div>

                      {/* Header */}
                      <div className="bg-white px-3 py-2 flex items-center justify-between text-zinc-900 border-b border-zinc-200">
                        <div className="flex items-center space-x-2">
                          <img src="/paradise-logo.svg" alt="Paradise Logo" className="w-6 h-6 object-contain" />
                          <div>
                            <div className="font-['Syne'] font-black text-xs sm:text-sm text-blue-950 tracking-tight leading-none">
                              PARADISE PUBLIC SCHOOL
                            </div>
                            <div className="text-[8px] text-zinc-500 font-medium">Yamuna Vihar, Delhi • Estd. 1994</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-[10px] font-bold">
                          <span className="hidden sm:inline text-blue-900">ERP Portal</span>
                          <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[9px] font-mono">
                            APPLY NOW ↗
                          </span>
                        </div>
                      </div>

                      {/* Hero Campus Banner */}
                      <div className="relative h-[115px] sm:h-[130px] bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 overflow-hidden flex items-center p-3 sm:p-4">
                        <img
                          src="/paradise-hero.png"
                          alt="Campus"
                          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/70 to-transparent" />
                        <div className="relative z-10 space-y-1 max-w-[90%]">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-[9px] font-bold">
                            CBSE INSTITUTION // ESTD. 1994
                          </span>
                          <div className="font-['Syne'] font-black text-sm sm:text-base text-white tracking-tight leading-tight">
                            NURTURING MINDS, INSPIRING EXCELLENCE
                          </div>
                          <p className="text-[10px] text-zinc-300 line-clamp-1 font-sans">
                            Atal Tinkering STEM Labs • 100% Board Pass Rate • Sports Arena
                          </p>
                        </div>
                      </div>

                      {/* Stats Strip */}
                      <div className="grid grid-cols-3 bg-zinc-900 text-white text-[9px] font-mono py-2 px-3 border-t border-zinc-800 text-center">
                        <div>
                          <span className="text-[#00f0ff] font-bold block">32+ YEARS</span>
                          <span className="text-zinc-400 text-[8px]">Academic Rigor</span>
                        </div>
                        <div className="border-x border-zinc-800">
                          <span className="text-emerald-400 font-bold block">+340% SURGE</span>
                          <span className="text-zinc-400 text-[8px]">Online Inquiries</span>
                        </div>
                        <div>
                          <span className="text-[#00f0ff] font-bold block">#1 GOOGLE 3-PACK</span>
                          <span className="text-zinc-400 text-[8px]">Yamuna Vihar</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* VIRGO VISOR AUTHENTIC FRONT PAGE */
                    <div className="flex flex-col bg-zinc-950 text-white font-sans text-xs select-none">
                      {/* Shipping Banner */}
                      <div className="bg-[#a855f7] px-3 py-1 text-[9px] sm:text-[10px] font-mono font-bold flex items-center justify-between border-b border-purple-900">
                        <div className="flex items-center space-x-1.5 truncate">
                          <Truck className="w-3 h-3 shrink-0" />
                          <span>ALL-INDIA FREE DELIVERY:</span>
                          <span className="truncate font-normal">Instant UPI &amp; COD Available</span>
                        </div>
                        <span className="hidden sm:inline text-[9px] bg-black/30 px-1.5 py-0.5 rounded text-white">
                          DISPATCH &lt;24H
                        </span>
                      </div>

                      {/* Header */}
                      <div className="bg-zinc-900 px-3 py-2 flex items-center justify-between border-b border-zinc-800">
                        <div className="flex items-center space-x-2">
                          <img src="/virgovisor-favicon.png" alt="Virgo Visor Logo" className="w-5 h-5 rounded-full object-contain" />
                          <div>
                            <div className="font-['Syne'] font-black text-xs sm:text-sm tracking-tight leading-none text-white">
                              VIRGO VISOR
                            </div>
                            <div className="text-[8px] text-zinc-400 font-mono">By Vishnu Enterprises • D2C Gear</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-[10px] font-mono">
                          <span className="text-[#c084fc] font-bold hidden sm:inline">48+ Helmet Models</span>
                          <span className="px-2 py-0.5 rounded bg-[#a855f7] text-black font-bold text-[9px]">
                            STORE ↗
                          </span>
                        </div>
                      </div>

                      {/* Hero Showcase */}
                      <div className="relative h-[95px] sm:h-[105px] bg-gradient-to-r from-purple-950/80 via-zinc-950 to-purple-950/80 p-3 flex flex-col justify-center space-y-1 border-b border-zinc-800/80">
                        <div className="inline-flex items-center space-x-1.5 text-[9px] font-mono text-[#c084fc]">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>OPTICAL-GRADE POLYCARBONATE CLASS 1</span>
                        </div>
                        <div className="font-['Syne'] font-black text-xs sm:text-sm text-white uppercase tracking-tight">
                          Crystal Clear Vision. Hard-Coat Scratch Defense.
                        </div>
                        <p className="text-[9px] text-zinc-400 line-clamp-1 font-mono">
                          Vega Bolt • Steelbird SBA-2 • Studds Ninja • LS2 Rapid
                        </p>
                      </div>

                      {/* Product Catalog Cards */}
                      <div className="grid grid-cols-3 gap-1.5 p-2 bg-zinc-950 font-mono text-[9px]">
                        <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                          <div className="font-bold text-white text-[10px] truncate">Clear Optical</div>
                          <div className="text-zinc-400 text-[8px]">99% Day/Night</div>
                          <div className="text-[#a855f7] font-black text-[10px]">₹349</div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                          <div className="font-bold text-white text-[10px] truncate">Smoke Tint</div>
                          <div className="text-zinc-400 text-[8px]">Sun-Glare Shield</div>
                          <div className="text-[#a855f7] font-black text-[10px]">₹429</div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                          <div className="font-bold text-white text-[10px] truncate">Iridium Mirror</div>
                          <div className="text-zinc-400 text-[8px]">Flash Reflective</div>
                          <div className="text-[#a855f7] font-black text-[10px]">₹499</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay with Direct CTA */}
                  <div className="absolute inset-0 bg-black/0 group-hover/preview:bg-black/40 transition-colors flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover/preview:opacity-100 transition-opacity px-5 py-2 rounded-xl bg-black/90 border border-[#00f0ff] text-[#00f0ff] font-mono text-xs font-bold shadow-2xl flex items-center space-x-2">
                      <span>OPEN {proj.displayUrl.toUpperCase()} ↗</span>
                    </span>
                  </div>
                </a>
              ) : isCenter && cardViewMode === 'liveframe' ? (
                /* LIVE EMBEDDED IFRAME (DIRECT UNSANDBOXED WEB VIEW) */
                <div className="relative my-auto w-full h-[240px] sm:h-[270px] md:h-[290px] rounded-2xl overflow-hidden border border-white/20 bg-zinc-950 shadow-2xl z-10 group/preview">
                  <iframe
                    key={`card-iframe-${proj.id}-${refreshKey}`}
                    src={proj.url}
                    title={`${proj.title} Live Web View`}
                    allow="autoplay; fullscreen"
                    className="w-full h-full border-0 bg-zinc-950"
                    loading="eager"
                  />
                  {/* Clean native link overlay to open real live website */}
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation()
                      sound.playChirp()
                    }}
                    className="absolute inset-0 z-20 bg-transparent hover:bg-black/35 transition-all flex items-center justify-center cursor-pointer group-hover/preview:backdrop-blur-[1px]"
                    title={`Click to open ${proj.url} in new tab`}
                  >
                    <span className="opacity-0 group-hover/preview:opacity-100 transition-opacity px-5 py-2.5 rounded-xl bg-black/90 border border-[#00f0ff] text-[#00f0ff] font-mono text-xs font-bold shadow-2xl flex items-center space-x-2">
                      <span>OPEN {proj.displayUrl.toUpperCase()} ↗</span>
                    </span>
                  </a>
                </div>
              ) : (
                /* 3D HOLOGRAPHIC RETICLE DISPLAY */
                <div className="relative my-auto flex flex-col items-center justify-center text-center z-10 py-2">
                  {/* Outer Reticle Ring */}
                  <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-white/15 pointer-events-none flex items-center justify-center">
                    <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full border border-dashed border-white/20 animate-[spin_40s_linear_infinite]" />
                    <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="absolute h-[120%] w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                  </div>

                  {/* Brand Emblem / Icon */}
                  <div className="mb-2 relative z-10 transition-transform duration-300 group-hover:scale-110">
                    {theme.icon}
                  </div>

                  {/* Massive Display Title */}
                  <div className="space-y-0.5 relative z-10">
                    <h3 className="font-['Syne'] font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[0.9] uppercase drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                      {theme.line1}
                    </h3>
                    <h3
                      className="font-['Syne'] font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[0.9] uppercase transition-colors"
                      style={{ color: theme.accentColor }}
                    >
                      {theme.line2}
                    </h3>
                  </div>

                  {/* Subtitle / Category Ribbon */}
                  <div className="mt-3 text-[11px] sm:text-xs font-mono text-zinc-300 tracking-widest uppercase bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm relative z-10">
                    {theme.tagline}
                  </div>
                </div>
              )}

              {/* Bottom Card Action Bar */}
              <div className="flex items-center justify-between text-xs font-mono z-10 pt-2 border-t border-white/10">
                <div className="flex items-center space-x-3 text-[11px]">
                  <span className="text-zinc-400">IMPACT:</span>
                  <span className="font-bold text-white">
                    {proj.metrics[0].label}: {proj.metrics[0].value}
                  </span>
                </div>

                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation()
                    sound.playChirp()
                  }}
                  onMouseEnter={() => sound.hoverBeep()}
                  className="px-4 py-2 rounded-xl bg-[#00f0ff] hover:bg-white text-black font-bold text-[11px] transition-all flex items-center space-x-1.5 cursor-pointer shadow-md group/btn"
                >
                  <span>VISIT LIVE WEBSITE</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {/* ======================================================== */}
      {/* BOTTOM HUD: "WHAT ARE YOU LOOKING FOR?" & ACTION PILLS */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 z-30 pt-4 border-t border-white/10 font-mono text-xs">
        {/* Bottom-Left: "WHAT ARE YOU LOOKING FOR?" + Clean 2-Project Filters */}
        <div className="space-y-2">
          <div className="text-[11px] text-zinc-300 font-bold tracking-widest uppercase flex items-center space-x-2">
            <span>WHAT ARE YOU LOOKING FOR?</span>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 md:gap-1.5 text-xs">
            <button
              onClick={() => {
                sound.hoverBeep()
                setActiveIndex(0)
              }}
              className={`text-left flex items-center space-x-1.5 transition-colors cursor-pointer ${
                activeIndex === 0 ? 'text-[#00f0ff] font-bold' : 'text-purple-400 hover:text-white'
              }`}
            >
              <span>-&gt;</span>
              <span>WEBSITES &amp; ERP (PARADISE)</span>
            </button>

            <button
              onClick={() => {
                sound.hoverBeep()
                setActiveIndex(1)
              }}
              className={`text-left flex items-center space-x-1.5 transition-colors cursor-pointer ${
                activeIndex === 1 ? 'text-[#a855f7] font-bold' : 'text-purple-400 hover:text-white'
              }`}
            >
              <span>-&gt;</span>
              <span>D2C E-COMMERCE (VIRGO VISOR)</span>
            </button>

            <button
              onClick={() => {
                sound.playChirp()
                window.dispatchEvent(new CustomEvent('setVisualMode', { detail: 'vortex' }))
              }}
              className="text-left flex items-center space-x-1.5 text-purple-400 hover:text-[#00f0ff] transition-colors cursor-pointer"
            >
              <span>-&gt;</span>
              <span>3D WEBGL MOTION ENGINES</span>
            </button>
          </div>

          {/* Capsule Button: [ ASK ME ANYTHING... ] */}
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playChirp()
                if (onOpenTerminal) {
                  onOpenTerminal()
                } else {
                  const el = document.getElementById('contact')
                  if (el) scrollEngine.scrollTo(el, { offset: -40 })
                }
              }}
              onMouseEnter={() => sound.hoverBeep()}
              className="px-5 py-2.5 rounded-full border border-purple-500/40 bg-black/80 hover:border-[#00f0ff] hover:text-[#00f0ff] text-zinc-400 transition-all cursor-pointer text-xs flex items-center space-x-2 shadow-lg"
            >
              <span>ASK ME ANYTHING...</span>
            </button>
          </div>
        </div>

        {/* Bottom-Right: Live Domain & Inline Browser Simulator Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              sound.playChirp()
              setShowInlineBrowser(!showInlineBrowser)
            }}
            onMouseEnter={() => sound.hoverBeep()}
            className="px-4 py-2.5 rounded-2xl border border-white/20 bg-black/60 hover:border-[#00f0ff] text-zinc-300 hover:text-white transition-all flex items-center space-x-2 cursor-pointer text-xs shadow-md"
          >
            {showInlineBrowser ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{showInlineBrowser ? 'HIDE INTERACTIVE BROWSER' : 'SHOW INTERACTIVE BROWSER'}</span>
          </button>

          <a
            href={activeProject.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playChirp()}
            onMouseEnter={() => sound.hoverBeep()}
            className="px-5 py-2.5 rounded-2xl bg-[#00f0ff] text-black font-bold hover:bg-white transition-all flex items-center space-x-2 cursor-pointer shadow-[0_0_25px_rgba(0,240,255,0.4)] text-xs"
          >
            <span>VISIT {activeProject.displayUrl.toUpperCase()}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ======================================================== */}
      {/* EXPANDABLE INLINE BROWSER SIMULATOR (100% REAL LIVE WEBSITE) */}
      {/* ======================================================== */}
      {showInlineBrowser && (
        <ScrollReveal parallaxSpeed={0.04} className="pt-6">
          <div className="w-full rounded-2xl border border-white/20 bg-zinc-950 shadow-2xl overflow-hidden flex flex-col">
            {/* Chrome Bar */}
            <div className="px-4 py-2.5 bg-[#0b0d14] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="text-zinc-400 text-[10px] ml-1 uppercase font-bold tracking-wider">
                  LIVE FRONT PAGE // {activeProject.displayUrl}
                </span>
              </div>

              {/* URL Bar (Click to open website in new tab) */}
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playChirp()}
                className="flex-1 max-w-sm mx-auto flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-[11px] text-zinc-200 cursor-pointer hover:border-[#00f0ff]/50 transition-colors"
                title="Click to open website in new tab"
              >
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">{activeProject.url}</span>
                <ExternalLink className="w-3 h-3 text-zinc-500 ml-auto shrink-0" />
              </a>

              {/* Device Mode Switcher & Refresh */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRefresh}
                  className={`p-1.5 rounded-lg border border-white/10 bg-black/40 text-zinc-400 hover:text-white transition-colors cursor-pointer ${
                    isRefreshing ? 'animate-spin' : ''
                  }`}
                  title="Reload Live Frame"
                >
                  <RotateCw className="w-3 h-3" />
                </button>

                <div className="flex items-center bg-black/60 rounded-md border border-white/10 p-0.5 text-zinc-400">
                  <button
                    onClick={() => {
                      sound.hoverBeep()
                      setDeviceMode('desktop')
                    }}
                    className={`p-1 rounded cursor-pointer ${
                      deviceMode === 'desktop' ? 'bg-[#00f0ff] text-black' : 'hover:text-white'
                    }`}
                    title="Desktop Mode"
                  >
                    <Laptop className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => {
                      sound.hoverBeep()
                      setDeviceMode('tablet')
                    }}
                    className={`p-1 rounded cursor-pointer ${
                      deviceMode === 'tablet' ? 'bg-[#00f0ff] text-black' : 'hover:text-white'
                    }`}
                    title="Tablet Mode"
                  >
                    <Tablet className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => {
                      sound.hoverBeep()
                      setDeviceMode('mobile')
                    }}
                    className={`p-1 rounded cursor-pointer ${
                      deviceMode === 'mobile' ? 'bg-[#00f0ff] text-black' : 'hover:text-white'
                    }`}
                    title="Mobile Mode"
                  >
                    <Smartphone className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Browser Body Viewport (100% Real Live Website Frame) */}
            <div className="bg-zinc-950 p-2 sm:p-4 flex justify-center relative w-full overflow-x-auto min-h-[500px]">
              <div
                className={`${getDeviceWidthClass()} transition-all duration-300 rounded-lg overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl relative`}
              >
                <iframe
                  key={`full-frame-${activeProject.id}-${deviceMode}-${refreshKey}`}
                  src={activeProject.url}
                  title={`${activeProject.title} Live Website`}
                  allow="autoplay; fullscreen"
                  className="w-full h-[620px] border-0 bg-zinc-950"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}
    </section>
  )
}
