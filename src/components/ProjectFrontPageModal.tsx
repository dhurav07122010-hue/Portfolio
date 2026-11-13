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
  Truck,
  ShoppingBag,
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
            ) : selectedProjectId === 'virgovisor' ? (
              /* High-Fidelity Front Page Simulator for virgovisor.com */
              <div className="text-white font-sans bg-[#090a0f] select-text">
                {/* 1. E-Commerce Free Delivery Announcement Ribbon */}
                <div className="bg-[#e11d48] text-white py-2 px-4 text-[11px] font-mono flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-bold tracking-wider">ALL-INDIA FREE COURIER DISPATCH:</span>
                    <span className="hidden sm:inline text-white/90">Orders dispatched in &lt;24 hours via BlueDart / Delhivery</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[10px]">
                    <span className="bg-black/30 px-2 py-0.5 rounded font-bold">COD AVAILABLE</span>
                    <span className="hidden md:inline bg-black/30 px-2 py-0.5 rounded">100% SCRATCH DEFENSE</span>
                  </div>
                </div>

                {/* 2. D2C Store Navigation */}
                <header className="bg-zinc-950/95 border-b border-zinc-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e11d48] to-[#9f1239] flex items-center justify-center font-black text-white text-base shadow-lg shadow-rose-900/40">
                      V
                    </div>
                    <div>
                      <div className="font-['Syne'] font-black text-lg text-white tracking-wider leading-tight flex items-center space-x-2">
                        <span>VIRGO VISOR</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#e11d48]/20 text-[#fb7185] border border-[#e11d48]/30 font-mono">
                          D2C
                        </span>
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono">
                        Official Store of Vishnu Enterprises • Delhi
                      </div>
                    </div>
                  </div>

                  <nav className="hidden lg:flex items-center space-x-6 text-xs font-mono font-medium text-zinc-400">
                    <span className="text-[#fb7185] font-bold border-b border-[#e11d48] pb-0.5">CATALOG</span>
                    <span className="hover:text-white cursor-pointer transition-colors">VEGA SERIES</span>
                    <span className="hover:text-white cursor-pointer transition-colors">STEELBIRD SBA</span>
                    <span className="hover:text-white cursor-pointer transition-colors">STUDDS NINJA</span>
                    <span className="hover:text-white cursor-pointer transition-colors">LS2 STREAM</span>
                    <span className="hover:text-white cursor-pointer transition-colors">PINLOCK ANTI-FOG</span>
                  </nav>

                  <div className="flex items-center space-x-3">
                    <a
                      href="https://virgovisor.com"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#e11d48] hover:bg-[#f43f5e] text-white text-xs font-bold font-mono transition-all flex items-center space-x-1.5 shadow-lg shadow-rose-900/40"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ORDER ONLINE</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                </header>

                {/* 3. Hero E-Commerce Showcase */}
                <section className="relative py-12 px-4 sm:px-8 border-b border-zinc-800 bg-gradient-to-b from-zinc-950 via-[#0d0f17] to-zinc-950 space-y-6">
                  <div className="max-w-4xl mx-auto text-center space-y-4">
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#e11d48]/15 border border-[#e11d48]/40 text-[#fb7185] text-xs font-mono">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>PRECISION OPTICAL HELMET VISORS // DISPATCH IN 24H</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-['Syne'] font-black text-white uppercase tracking-tight leading-tight">
                      Zero Distortion. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fb7185] to-[#f43f5e]">Hard-Coat Scratch Armor.</span>
                    </h1>

                    <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                      Upgrade your riding vision with optical-grade replacement helmet visors engineered for Vega, Steelbird, Studds, and LS2 helmets. Factory direct pricing from Vishnu Enterprises.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs">
                      <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Hard-Coat Polycarbonate</span>
                      </span>
                      <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-[#00f0ff]" />
                        <span>UV400 Optical Class 1</span>
                      </span>
                      <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center space-x-1.5">
                        <Truck className="w-4 h-4 text-[#fb7185]" />
                        <span>Fast Pan-India Express Delivery</span>
                      </span>
                    </div>
                  </div>

                  {/* 4. Product Catalog Grid */}
                  <div className="max-w-6xl mx-auto pt-8">
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-6">
                      <div className="font-['Syne'] font-black text-lg text-white uppercase tracking-wider flex items-center space-x-2">
                        <span>FEATURED BESTSELLERS</span>
                        <span className="text-xs font-mono text-zinc-500 font-normal">[4.9★ AVERAGE RATING]</span>
                      </div>
                      <div className="text-xs font-mono text-[#fb7185]">
                        SHOWING 4 OF 48 MODELS
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Product 1 */}
                      <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-[#e11d48] transition-all flex flex-col justify-between space-y-4 group">
                        <div className="space-y-3">
                          <div className="w-full h-36 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/60 flex flex-col items-center justify-center p-3 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              BESTSELLER
                            </span>
                            <div className="w-20 h-12 rounded-full border-2 border-white/40 flex items-center justify-center font-black text-zinc-400 text-xs tracking-wider">
                              CLEAR
                            </div>
                            <span className="text-[10px] text-zinc-400 font-mono mt-2">
                              99.2% Light Transmission
                            </span>
                          </div>

                          <div className="space-y-1">
                            <div className="text-[10px] font-mono text-[#fb7185] font-bold">VEGA COMPATIBLE</div>
                            <h3 className="font-bold text-white text-sm">Vega Bolt / Crux Clear Visor</h3>
                            <p className="text-xs text-zinc-400">Day & night crystal clarity with anti-glare multi-coat.</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                          <div>
                            <div className="text-base font-black text-[#fb7185] font-['Syne']">₹349</div>
                            <div className="text-[10px] text-zinc-500 line-through">MRP ₹599 (41% OFF)</div>
                          </div>
                          <a
                            href="https://virgovisor.com"
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-[#e11d48] text-white font-mono text-xs font-bold hover:bg-[#f43f5e] transition-colors"
                          >
                            Buy Now
                          </a>
                        </div>
                      </div>

                      {/* Product 2 */}
                      <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-[#e11d48] transition-all flex flex-col justify-between space-y-4 group">
                        <div className="space-y-3">
                          <div className="w-full h-36 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-700/60 flex flex-col items-center justify-center p-3 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-[#fb7185]/20 text-[#fb7185] border border-[#fb7185]/30">
                              HOT CHOICE
                            </span>
                            <div className="w-20 h-12 rounded-full bg-zinc-950 border-2 border-zinc-600 flex items-center justify-center font-black text-zinc-300 text-xs tracking-wider">
                              SMOKE
                            </div>
                            <span className="text-[10px] text-zinc-400 font-mono mt-2">
                              Sun-Glare Neutralizer
                            </span>
                          </div>

                          <div className="space-y-1">
                            <div className="text-[10px] font-mono text-[#fb7185] font-bold">STEELBIRD COMPATIBLE</div>
                            <h3 className="font-bold text-white text-sm">Steelbird SBA-2 Smoke Visor</h3>
                            <p className="text-xs text-zinc-400">Deep charcoal tint for harsh sunlight and highway glare.</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                          <div>
                            <div className="text-base font-black text-[#fb7185] font-['Syne']">₹429</div>
                            <div className="text-[10px] text-zinc-500 line-through">MRP ₹699 (38% OFF)</div>
                          </div>
                          <a
                            href="https://virgovisor.com"
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-[#e11d48] text-white font-mono text-xs font-bold hover:bg-[#f43f5e] transition-colors"
                          >
                            Buy Now
                          </a>
                        </div>
                      </div>

                      {/* Product 3 */}
                      <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-[#e11d48] transition-all flex flex-col justify-between space-y-4 group">
                        <div className="space-y-3">
                          <div className="w-full h-36 rounded-xl bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-rose-900/40 border border-zinc-700/60 flex flex-col items-center justify-center p-3 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              IRIDIUM
                            </span>
                            <div className="w-20 h-12 rounded-full bg-gradient-to-r from-cyan-500/60 via-purple-500/60 to-rose-500/60 border-2 border-white/50 flex items-center justify-center font-black text-white text-xs tracking-wider">
                              RAINBOW
                            </div>
                            <span className="text-[10px] text-zinc-300 font-mono mt-2">
                              Flash Mirror Coating
                            </span>
                          </div>

                          <div className="space-y-1">
                            <div className="text-[10px] font-mono text-[#fb7185] font-bold">STUDDS COMPATIBLE</div>
                            <h3 className="font-bold text-white text-sm">Studds Thunder Iridium Rainbow</h3>
                            <p className="text-xs text-zinc-400">High-reflective metallic rainbow mirror finish with UV400 block.</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                          <div>
                            <div className="text-base font-black text-[#fb7185] font-['Syne']">₹499</div>
                            <div className="text-[10px] text-zinc-500 line-through">MRP ₹899 (44% OFF)</div>
                          </div>
                          <a
                            href="https://virgovisor.com"
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-[#e11d48] text-white font-mono text-xs font-bold hover:bg-[#f43f5e] transition-colors"
                          >
                            Buy Now
                          </a>
                        </div>
                      </div>

                      {/* Product 4 */}
                      <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-[#e11d48] transition-all flex flex-col justify-between space-y-4 group">
                        <div className="space-y-3">
                          <div className="w-full h-36 rounded-xl bg-gradient-to-br from-cyan-950 to-zinc-900 border border-zinc-700/60 flex flex-col items-center justify-center p-3 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              UNIVERSAL
                            </span>
                            <div className="w-20 h-12 rounded-full border-2 border-dashed border-cyan-400 flex items-center justify-center font-black text-cyan-300 text-xs tracking-wider">
                              ANTI-FOG
                            </div>
                            <span className="text-[10px] text-zinc-400 font-mono mt-2">
                              Hydrophobic Nano Seal
                            </span>
                          </div>

                          <div className="space-y-1">
                            <div className="text-[10px] font-mono text-[#fb7185] font-bold">ALL HELMETS</div>
                            <h3 className="font-bold text-white text-sm">Universal Pinlock Anti-Fog Insert</h3>
                            <p className="text-xs text-zinc-400">Prevents morning condensation and breath fogging during winter rides.</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                          <div>
                            <div className="text-base font-black text-[#fb7185] font-['Syne']">₹299</div>
                            <div className="text-[10px] text-zinc-500 line-through">MRP ₹499 (40% OFF)</div>
                          </div>
                          <a
                            href="https://virgovisor.com"
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-[#e11d48] text-white font-mono text-xs font-bold hover:bg-[#f43f5e] transition-colors"
                          >
                            Buy Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 5. Vishnu Enterprises Engineering Standards */}
                <section className="py-10 px-4 sm:px-8 bg-zinc-950 border-b border-zinc-800">
                  <div className="max-w-6xl mx-auto space-y-6">
                    <div className="text-center space-y-2">
                      <div className="text-xs font-mono text-[#fb7185] uppercase tracking-widest">
                        MANUFACTURING EXCELLENCE // VISHNU ENTERPRISES
                      </div>
                      <h2 className="text-xl sm:text-3xl font-['Syne'] font-black text-white uppercase">
                        Why Riders Across India Choose Virgo Visor
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                        <div className="w-8 h-8 rounded-lg bg-[#e11d48]/20 text-[#fb7185] flex items-center justify-center font-bold">
                          01
                        </div>
                        <h3 className="font-bold text-white text-sm">Hard-Coat Scratch Resistance</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Treated with an ultra-durable polysiloxane surface shield that withstands high-speed road debris, dust, and wash micro-scratches.
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                        <div className="w-8 h-8 rounded-lg bg-[#e11d48]/20 text-[#fb7185] flex items-center justify-center font-bold">
                          02
                        </div>
                        <h3 className="font-bold text-white text-sm">Exact OEM Pivot Snap-Fit</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Engineered with laser precision to match factory pivot ratchets of Vega, Steelbird, Studds, and LS2 without loose play or wind flutter.
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                        <div className="w-8 h-8 rounded-lg bg-[#e11d48]/20 text-[#fb7185] flex items-center justify-center font-bold">
                          03
                        </div>
                        <h3 className="font-bold text-white text-sm">D2C Factory Price Advantage</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Shipped directly from Vishnu Enterprises manufacturing inventory to your doorstep, saving 40-50% over retail distributor markups.
                        </p>
                      </div>
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
