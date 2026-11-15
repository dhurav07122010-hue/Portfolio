import React, { useState, useEffect, useRef } from 'react'
import {
  ExternalLink,
  Maximize2,
  Laptop,
  Tablet,
  Smartphone,
  Lock,
  RotateCw,
  ShoppingBag,
  Truck,
  ArrowRight,
  GraduationCap,
  Shield,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { sound } from '../utils/soundEngine'
import { scrollEngine } from '../utils/scrollEngine'
import { ScrambleText } from './ScrambleText'
import { ScrollReveal } from './ScrollReveal'
import { PROJECTS_DATA, type ProjectData } from '../data/projectsData'

interface WorkSectionProps {
  onOpenParadiseModal: () => void
  onOpenFrontPageModal?: (projectId: string) => void
  onOpenTerminal?: () => void
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile'

export const WorkSection: React.FC<WorkSectionProps> = ({
  onOpenParadiseModal,
  onOpenFrontPageModal,
  onOpenTerminal,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showInlineBrowser, setShowInlineBrowser] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const stageRef = useRef<HTMLDivElement>(null)

  const activeProject: ProjectData = PROJECTS_DATA[activeIndex] || PROJECTS_DATA[0]

  const handleNext = () => {
    sound.hoverBeep()
    setActiveIndex((prev) => (prev + 1) % PROJECTS_DATA.length)
  }

  const handlePrev = () => {
    sound.hoverBeep()
    setActiveIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length)
  }

  const triggerOpenFrontPage = (projectId: string = activeProject.id) => {
    sound.playChirp()
    if (onOpenFrontPageModal) {
      onOpenFrontPageModal(projectId)
    } else {
      onOpenParadiseModal()
    }
  }

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation()
    sound.hoverBeep()
    setIsRefreshing(true)
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

  // Mouse tilt on 3D active card
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 10, y: -y * 10 })
  }

  const handleStageMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
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
            <span>[01] // SELECTED WORK & PLATFORMS</span>
          </div>
          <h2 className="font-['Syne'] font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
            <ScrambleText text="FEATURED PRODUCTIONS" />
          </h2>
          <div className="text-[11px] text-zinc-400">
            Engineered by <strong className="text-white">Dhurav (Age 16)</strong> • Click any card to inspect front page
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
        className="relative w-full h-[440px] sm:h-[480px] md:h-[500px] flex items-center justify-center my-4 perspective-[1400px] overflow-visible"
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
            transformStyle = `translate3d(0, 0, 0) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1)`
            zIndex = 30
            opacity = 1
            pointerEvents = 'auto'
          } else {
            // When activeIndex is 0 (Paradise), Virgo Visor sits on the right
            // When activeIndex is 1 (Virgo Visor), Paradise sits on the left
            const isSideRight = activeIndex === 0
            const tx = isSideRight ? 'calc(48% + 20px)' : 'calc(-48% - 20px)'
            const rotY = isSideRight ? -22 : 22
            // 14px down ensures the top of the side card never creeps into FEATURED PRODUCTIONS header
            transformStyle = `translate3d(${tx}, 14px, -180px) rotateY(${rotY}deg) scale(0.86)`
            zIndex = 15
            opacity = 0.7
            pointerEvents = 'auto'
          }

          return (
            <div
              key={proj.id}
              onClick={() => {
                if (isCenter) {
                  triggerOpenFrontPage(proj.id)
                } else {
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
              className={`absolute w-[90vw] max-w-[520px] sm:max-w-[590px] md:max-w-[640px] h-[360px] sm:h-[390px] md:h-[420px] rounded-[30px] sm:rounded-[36px] border-2 ${
                theme.borderColor
              } bg-gradient-to-b from-black/90 via-[#080b14]/85 to-black/95 backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer group transition-shadow duration-500 overflow-hidden`}
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

              {/* Top Card Telemetry Row */}
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
                <div className="text-[10px] text-zinc-500 font-mono tracking-widest hidden sm:block">
                  [{theme.coords}]
                </div>
              </div>

              {/* ======================================================== */}
              {/* CENTER CIRCULAR RETICLE TARGET */}
              {/* ======================================================== */}
              <div className="relative my-auto flex flex-col items-center justify-center text-center z-10 py-2">
                {/* Outer Reticle Ring */}
                <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-white/15 pointer-events-none flex items-center justify-center">
                  {/* Concentric Dashed Ring with Slow Rotation */}
                  <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-dashed border-white/20 animate-[spin_40s_linear_infinite]" />
                  {/* Horizontal Reticle Crosshair Line */}
                  <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  {/* Vertical Reticle Crosshair Line */}
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

              {/* Bottom Card Action Bar */}
              <div className="flex items-center justify-between text-xs font-mono z-10 pt-2 border-t border-white/10">
                <div className="flex items-center space-x-3 text-[11px]">
                  <span className="text-zinc-400">IMPACT:</span>
                  <span className="font-bold text-white">
                    {proj.metrics[0].label}: {proj.metrics[0].value}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    triggerOpenFrontPage(proj.id)
                  }}
                  onMouseEnter={() => sound.hoverBeep()}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black font-bold text-[11px] transition-all flex items-center space-x-1.5 cursor-pointer shadow-md group/btn"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>INSPECT FRONT PAGE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
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
            <span>{showInlineBrowser ? 'HIDE INLINE SIMULATOR' : 'PREVIEW INLINE BROWSER'}</span>
          </button>

          <a
            href={activeProject.url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              e.stopPropagation()
              sound.playChirp()
            }}
            onMouseEnter={() => sound.hoverBeep()}
            className="px-4 py-2.5 rounded-2xl border border-white/15 bg-white/5 hover:border-[#00f0ff] text-zinc-300 hover:text-[#00f0ff] transition-all flex items-center space-x-1.5 text-xs shadow-md"
          >
            <span>LIVE DOMAIN</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => triggerOpenFrontPage(activeProject.id)}
            onMouseEnter={() => sound.hoverBeep()}
            className="px-5 py-2.5 rounded-2xl bg-[#00f0ff] text-black font-bold hover:bg-white transition-all flex items-center space-x-2 cursor-pointer shadow-[0_0_25px_rgba(0,240,255,0.4)] text-xs"
          >
            <Maximize2 className="w-4 h-4" />
            <span>FULLSCREEN FRONT PAGE</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* EXPANDABLE INLINE BROWSER SIMULATOR (DOCK BELOW 3D STAGE) */}
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
                    onClick={() => {
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
                    onClick={() => {
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
                    onClick={() => {
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
              </div>
            </div>

            {/* Browser Body Viewport */}
            <div
              className="bg-black/95 p-3 overflow-y-auto max-h-[500px] flex justify-center cursor-pointer relative"
              onClick={() => triggerOpenFrontPage(activeProject.id)}
            >
              <div
                className={`${getDeviceWidthClass()} transition-all duration-300 rounded-lg overflow-hidden border border-white/10 bg-white text-zinc-900 shadow-xl`}
              >
                {activeProject.id === 'virgovisor' ? (
                  /* VIRGOVISOR.COM SIMULATOR */
                  <div className="font-sans text-xs bg-zinc-950 text-white select-text">
                    <div className="bg-[#a855f7] text-white py-1 px-3 flex items-center justify-between text-[10px] font-mono">
                      <div className="flex items-center space-x-1.5 truncate">
                        <Truck className="w-3 h-3 shrink-0" />
                        <span className="font-bold">FREE ALL-INDIA DELIVERY:</span>
                        <span className="truncate">Cash on Delivery & Instant UPI Available</span>
                      </div>
                      <span className="hidden sm:inline text-[9px] bg-black/40 px-2 py-0.5 rounded">
                        100% SCRATCH RESISTANT
                      </span>
                    </div>

                    <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-[#a855f7] flex items-center justify-center font-black text-white text-xs">
                          V
                        </div>
                        <div>
                          <div className="font-['Syne'] font-black text-sm text-white tracking-wider">
                            VIRGO VISOR
                          </div>
                          <div className="text-[9px] text-zinc-400">By Vishnu Enterprises • D2C Gear</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 rounded bg-[#a855f7] text-white font-bold text-[10px] flex items-center space-x-1">
                          <ShoppingBag className="w-3 h-3" />
                          <span>Store</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-center space-y-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#a855f7]/15 border border-[#a855f7]/40 text-[#c084fc] text-[10px] font-mono">
                        ✦ OPTICAL-GRADE POLYCARBONATE
                      </span>

                      <h4 className="text-base sm:text-xl font-['Syne'] font-black text-white leading-tight uppercase">
                        Crystal Clear Vision. Hard-Coat Scratch Defense.
                      </h4>

                      <div className="grid grid-cols-3 gap-2 pt-2 text-left">
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                          <div className="font-bold text-white text-[11px]">Clear Optical</div>
                          <div className="text-[9px] text-zinc-400">Day & Night 99%</div>
                          <div className="text-[#a855f7] font-black text-xs">₹499</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                          <div className="font-bold text-white text-[11px]">Smoke Tinted</div>
                          <div className="text-[9px] text-zinc-400">Anti-Sun Glare</div>
                          <div className="text-[#a855f7] font-black text-xs">₹549</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                          <div className="font-bold text-white text-[11px]">Iridium Mirror</div>
                          <div className="text-[9px] text-zinc-400">Flash Reflective</div>
                          <div className="text-[#a855f7] font-black text-xs">₹699</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* PARADISE PUBLIC SCHOOL SIMULATOR */
                  <div className="font-sans text-xs bg-white text-zinc-900 select-text">
                    <div className="bg-[#1e3a8a] text-white py-1 px-3 flex items-center justify-between text-[10px] font-mono">
                      <span>ADMISSIONS OPEN 2026-27: NURSERY TO CLASS 8</span>
                      <span>CBSE ENGLISH MEDIUM</span>
                    </div>

                    <div className="p-3 bg-white border-b border-zinc-200 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-900 text-white flex items-center justify-center font-black text-xs">
                          P
                        </div>
                        <div>
                          <div className="font-['Syne'] font-black text-sm text-zinc-900 tracking-wider">
                            PARADISE PUBLIC SCHOOL
                          </div>
                          <div className="text-[9px] text-zinc-500">Affiliated to CBSE • Estd. 1994</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 rounded bg-[#1e3a8a] text-white font-bold text-[10px] flex items-center space-x-1">
                          <GraduationCap className="w-3 h-3" />
                          <span>Admissions</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-b from-blue-50/50 via-white to-white text-center space-y-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-mono">
                        ✦ ATAL INNOVATION &amp; SPORTS TURF
                      </span>

                      <h4 className="text-base sm:text-xl font-['Syne'] font-black text-zinc-900 leading-tight">
                        Nurturing Tomorrow's Leaders Through Foundational Eminence
                      </h4>

                      <p className="text-[11px] text-zinc-600 line-clamp-2 max-w-md mx-auto">
                        32+ Years of Academic Rigor, Atal Tinkering Jr. Labs, World-Class Sports Turf, and Deeply Rooted Indian Values.
                      </p>

                      <div className="grid grid-cols-3 gap-2 pt-2 text-left">
                        <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 space-y-1">
                          <div className="font-bold text-zinc-900 text-[11px]">Admissions</div>
                          <div className="text-[9px] text-zinc-500">Nur to Class 8</div>
                          <div className="text-[#00f0ff] font-black text-xs">OPEN</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 space-y-1">
                          <div className="font-bold text-zinc-900 text-[11px]">Google 3-Pack</div>
                          <div className="text-[9px] text-zinc-500">Local Area</div>
                          <div className="text-blue-900 font-black text-xs">#1 RANK</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 space-y-1">
                          <div className="font-bold text-zinc-900 text-[11px]">Student App</div>
                          <div className="text-[9px] text-zinc-500">Live Portal</div>
                          <div className="text-blue-900 font-black text-xs">ACTIVE</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}
    </section>
  )
}
