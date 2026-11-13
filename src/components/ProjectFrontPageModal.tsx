import React, { useState } from 'react'
import {
  X,
  ExternalLink,
  Laptop,
  Tablet,
  Smartphone,
  RotateCw,
  Lock,
  Sparkles,
  BookOpen,
  Trophy,
  ShieldCheck,
  ArrowRight,
  Phone,
  MapPin,
  Cpu,
} from 'lucide-react'
import { sound } from '../utils/soundEngine'
import { PROJECTS_DATA } from '../data/projectsData'

interface ProjectFrontPageModalProps {
  isOpen: boolean
  onClose: () => void
  initialProjectId?: string
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile'

export const ProjectFrontPageModal: React.FC<ProjectFrontPageModalProps> = ({
  isOpen,
  onClose,
  initialProjectId = 'paradise',
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId)
  const [prevInitialId, setPrevInitialId] = useState(initialProjectId)
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [activeTab, setActiveTab] = useState<'simulator' | 'iframe'>('simulator')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Sync if prop changed
  if (initialProjectId !== prevInitialId) {
    setPrevInitialId(initialProjectId)
    setSelectedProjectId(initialProjectId)
  }

  if (!isOpen) return null

  const project =
    PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0]

  const handleRefresh = () => {
    sound.hoverBeep()
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const getDeviceWidthClass = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'max-w-[400px]'
      case 'tablet':
        return 'max-w-[768px]'
      case 'desktop':
      default:
        return 'max-w-full'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-6xl h-[92vh] bg-[#08080d] border border-[#00f0ff]/30 rounded-2xl shadow-[0_0_80px_rgba(0,240,255,0.2)] flex flex-col overflow-hidden">
        
        {/* TOP BAR: Browser Header Chrome */}
        <div className="px-4 py-3 bg-[#0d0f17] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Left: Window Controls & Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500 hover:brightness-125 transition-all cursor-pointer"
                title="Close"
              />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            <div className="hidden sm:flex items-center space-x-2 border-l border-white/10 pl-3">
              <span className="text-xs font-mono text-white font-bold">{project.title}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                FRONT PAGE PREVIEW
              </span>
            </div>
          </div>

          {/* Center: Real URL Bar with SSL Padlock */}
          <div className="flex-1 max-w-md mx-auto flex items-center space-x-2 bg-black/60 border border-white/15 px-3 py-1.5 rounded-xl font-mono text-xs text-zinc-300">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-zinc-500 shrink-0">https://</span>
            <span className="text-white font-medium truncate">{project.displayUrl}</span>
            <button
              onClick={handleRefresh}
              className={`ml-auto p-1 text-zinc-400 hover:text-white transition-transform ${
                isRefreshing ? 'animate-spin' : ''
              }`}
              title="Refresh Preview"
            >
              <RotateCw className="w-3 h-3" />
            </button>
          </div>

          {/* Right: Device Switcher & External Link */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center bg-black/50 p-1 rounded-lg border border-white/10 text-xs font-mono">
              <button
                onClick={() => {
                  sound.hoverBeep()
                  setDeviceMode('desktop')
                }}
                className={`p-1.5 rounded-md transition-all ${
                  deviceMode === 'desktop'
                    ? 'bg-[#00f0ff] text-black shadow-[0_0_8px_#00f0ff]'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Desktop View (Full Width)"
              >
                <Laptop className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  sound.hoverBeep()
                  setDeviceMode('tablet')
                }}
                className={`p-1.5 rounded-md transition-all ${
                  deviceMode === 'tablet'
                    ? 'bg-[#00f0ff] text-black shadow-[0_0_8px_#00f0ff]'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  sound.hoverBeep()
                  setDeviceMode('mobile')
                }}
                className={`p-1.5 rounded-md transition-all ${
                  deviceMode === 'mobile'
                    ? 'bg-[#00f0ff] text-black shadow-[0_0_8px_#00f0ff]'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Mobile View (390px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playChirp()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#00f0ff] text-black hover:bg-white hover:shadow-[0_0_15px_#00f0ff] transition-all cursor-pointer"
            >
              <span className="hidden sm:inline">VISIT LIVE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => {
                sound.hoverBeep()
                onClose()
              }}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PROJECT SELECTOR TABS */}
        <div className="px-4 py-2 bg-[#090b12] border-b border-white/10 flex items-center justify-between text-xs font-mono overflow-x-auto gap-4 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-zinc-500 text-[11px] hidden sm:inline">PROJECT:</span>
            {PROJECTS_DATA.map((p) => {
              const isSelected = p.id === selectedProjectId
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    sound.hoverBeep()
                    setSelectedProjectId(p.id)
                  }}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer flex items-center space-x-2 ${
                    isSelected
                      ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>{p.title}</span>
                </button>
              )
            })}
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center space-x-1 shrink-0">
            <button
              onClick={() => {
                sound.hoverBeep()
                setActiveTab('simulator')
              }}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-white/10 text-white font-medium border border-white/20'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Interactive Front Page
            </button>
            <button
              onClick={() => {
                sound.hoverBeep()
                setActiveTab('iframe')
              }}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                activeTab === 'iframe'
                  ? 'bg-white/10 text-white font-medium border border-white/20'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Live Iframe
            </button>
          </div>
        </div>

        {/* BROWSER VIEWPORT CONTAINER */}
        <div className="flex-1 overflow-y-auto bg-[#040407] p-2 sm:p-4 flex justify-center">
          <div
            className={`w-full ${getDeviceWidthClass()} transition-all duration-300 rounded-xl overflow-hidden border border-white/10 bg-white shadow-2xl flex flex-col`}
          >
            {activeTab === 'iframe' ? (
              <div className="w-full h-full min-h-[600px] bg-zinc-900 relative">
                <iframe
                  src={project.url}
                  title={`${project.title} Live Website`}
                  className="w-full h-full min-h-[600px] border-none"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            ) : selectedProjectId === 'paradise' ? (
              /* High-Fidelity Paradise Public School Front Page Simulator */
              <div className="text-zinc-900 font-sans bg-white select-text">
                {/* 1. School Top Notification Ticker */}
                <div className="bg-[#1e3a8a] text-white text-[11px] py-1.5 px-4 font-medium flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                    <span className="font-bold tracking-wide">
                      ADMISSIONS OPEN (2026-27):
                    </span>
                    <span>Nursery to Class 8 • CBSE English Medium</span>
                  </div>
                  <div className="hidden sm:flex items-center space-x-4 text-[10px] text-blue-200">
                    <span className="flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>Helpline: +91 98765 43210</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>Yamuna Vihar, Delhi</span>
                    </span>
                  </div>
                </div>

                {/* 2. School Navigation Header */}
                <header className="bg-white border-b border-zinc-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center p-1.5 shadow-xs">
                      <img
                        src="/paradise-logo.svg"
                        alt="Paradise School Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-['Syne'] font-black text-lg text-blue-950 tracking-tight leading-tight">
                        PARADISE PUBLIC SCHOOL
                      </div>
                      <div className="text-[10px] text-zinc-500 font-medium">
                        CBSE Affiliation #2130842 • Estd. 1994 • Nursery to 8th
                      </div>
                    </div>
                  </div>

                  <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-zinc-600">
                    <span className="text-blue-600 border-b-2 border-blue-600 pb-0.5">Home</span>
                    <span className="hover:text-blue-600 cursor-pointer">About School</span>
                    <span className="hover:text-blue-600 cursor-pointer">Academics</span>
                    <span className="hover:text-blue-600 cursor-pointer">Admissions</span>
                    <span className="hover:text-blue-600 cursor-pointer">Atal Lab</span>
                    <span className="hover:text-blue-600 cursor-pointer">Contact</span>
                  </nav>

                  <div className="flex items-center space-x-2">
                    <a
                      href="https://paradisepublicschool.com"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-xs transition-all flex items-center space-x-1"
                    >
                      <span>Apply Online</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </header>

                {/* 3. Hero Front Page Section */}
                <section className="relative bg-gradient-to-b from-blue-50/70 via-white to-white py-12 px-4 sm:px-8 text-center space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Session 2026-27 Registrations Live</span>
                  </div>

                  <div className="max-w-3xl mx-auto space-y-3">
                    <h1 className="text-3xl sm:text-5xl font-['Syne'] font-black text-zinc-900 tracking-tight leading-tight">
                      Empowering Young Minds With Holistic Excellence
                    </h1>
                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto">
                      At Paradise Public School, we blend experiential CBSE academics, Atal Tinkering Jr. STEM innovation, competitive sports facilities, and strong Indian values.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href="https://paradisepublicschool.com"
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-md transition-all flex items-center space-x-2"
                    >
                      <span>ADMISSION INQUIRY (2026-27)</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="https://paradisepublicschool.com"
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 rounded-xl border border-zinc-300 text-zinc-700 font-semibold text-xs hover:bg-zinc-50 transition-all"
                    >
                      EXPLORE CURRICULUM
                    </a>
                  </div>

                  {/* 4. Statistics Banner */}
                  <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8">
                    <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-xs text-center">
                      <div className="text-2xl sm:text-3xl font-['Syne'] font-black text-blue-600">32+</div>
                      <div className="text-[11px] text-zinc-500 font-medium uppercase mt-0.5">Years of Eminence</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-xs text-center">
                      <div className="text-2xl sm:text-3xl font-['Syne'] font-black text-emerald-600">100%</div>
                      <div className="text-[11px] text-zinc-500 font-medium uppercase mt-0.5">Class 8 Success</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-xs text-center">
                      <div className="text-2xl sm:text-3xl font-['Syne'] font-black text-purple-600">35+</div>
                      <div className="text-[11px] text-zinc-500 font-medium uppercase mt-0.5">STEM & Sports Clubs</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-xs text-center">
                      <div className="text-2xl sm:text-3xl font-['Syne'] font-black text-orange-600">15:1</div>
                      <div className="text-[11px] text-zinc-500 font-medium uppercase mt-0.5">Student Ratio</div>
                    </div>
                  </div>
                </section>

                {/* 5. Four Foundational Pillars */}
                <section className="py-10 px-4 sm:px-8 border-t border-zinc-100 bg-zinc-50/50 space-y-6">
                  <div className="text-center space-y-1">
                    <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest">
                      CORE CAPABILITIES
                    </span>
                    <h2 className="text-xl sm:text-2xl font-['Syne'] font-bold text-zinc-900">
                      Why Parents Choose Paradise Public School
                    </h2>
                  </div>

                  <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-zinc-900 text-sm">Elementary Eminence (Nursery - 8th)</h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        CBSE aligned NEP-2020 foundation focusing on experiential inquiry, reading fluency, and mathematics mastery.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-zinc-900 text-sm">Atal Tinkering Jr. Lab</h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Robotics kits, coding scratch classes, electronics tinkering, and hands-on science experiments.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-zinc-900 text-sm">Spacious Sports Grounds</h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Football turf, volleyball, table tennis, badminton court, and daily physical education drill.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-700 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-zinc-900 text-sm">Values & Indian Sanskar</h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Instilling discipline, mutual respect, civic integrity, and cultural consciousness from foundational years.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              /* High-Fidelity Front Page Simulator for Nexus & Cyberpulse */
              <div className="p-8 sm:p-12 text-zinc-100 font-mono bg-zinc-950 space-y-8 select-text">
                <div className="border-b border-zinc-800 pb-6 space-y-3">
                  <div className="inline-flex items-center space-x-2 text-xs text-[#00f0ff] uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                    <span>{project.category}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-['Syne'] font-black text-white">
                    {project.heroTitle}
                  </h2>
                  <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-3xl">
                    {project.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1"
                    >
                      <div
                        className="text-2xl sm:text-3xl font-['Syne'] font-black"
                        style={{ color: m.color }}
                      >
                        {m.value}
                      </div>
                      <div className="text-[11px] text-zinc-400 uppercase tracking-wider">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                  <div className="text-xs text-[#00f0ff] uppercase tracking-wider">
                    OPERATIONAL METHODOLOGY // ARCHITECTURE HIGHLIGHTS
                  </div>
                  <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                    {project.heroSubtitle}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM METRICS DOCK */}
        <div className="px-6 py-3 bg-[#0d0f17] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs shrink-0">
          <div className="flex items-center space-x-4 text-zinc-400">
            <span className="text-zinc-500">AUTHOR:</span>
            <span className="text-white font-bold">Dhurav (Age 16)</span>
            <span className="text-zinc-600">//</span>
            <span>IICS Yamuna Vihar</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            {project.metrics.slice(0, 3).map((m, idx) => (
              <div key={idx} className="flex items-center space-x-1.5">
                <span className="text-zinc-500">{m.label}:</span>
                <span className="font-bold" style={{ color: m.color }}>
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
