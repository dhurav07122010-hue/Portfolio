import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX, Terminal as TerminalIcon } from 'lucide-react'
import { sound } from '../utils/soundEngine'
import { scrollEngine } from '../utils/scrollEngine'
import { ScrambleText } from './ScrambleText'
import type { VisualMode } from './ThreeCanvas'

interface PortfolioFrameProps {
  onOpenMenu: () => void
  onOpenTerminal: () => void
}

export const PortfolioFrame: React.FC<PortfolioFrameProps> = ({
  onOpenMenu,
  onOpenTerminal,
}) => {
  const [soundActive, setSoundActive] = useState(false)
  const [time, setTime] = useState('')
  const [activeVisualMode, setActiveVisualMode] = useState<VisualMode>('spine')
  const [depth, setDepth] = useState(0)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)

    const unsubscribe = scrollEngine.subscribe((data) => {
      setDepth(Math.round(data.progress * 100))
    })

    return () => {
      clearInterval(interval)
      unsubscribe()
    }
  }, [])

  const handleSoundToggle = () => {
    const active = sound.toggle()
    setSoundActive(active)
  }

  const handleNavClick = (id: string) => {
    sound.hoverBeep()
    const el = document.getElementById(id)
    if (el) {
      scrollEngine.scrollTo(el, { offset: -40 })
    }
  }

  const handleVisualModeChange = (mode: VisualMode) => {
    sound.playChirp()
    setActiveVisualMode(mode)
    window.dispatchEvent(new CustomEvent('setVisualMode', { detail: mode }))
  }

  return (
    <>
      {/* 4 Corner Crosshairs */}
      <div className="fixed top-3 left-3 z-40 pointer-events-none font-mono text-[12px] text-zinc-600 select-none">
        +
      </div>
      <div className="fixed top-3 right-3 z-40 pointer-events-none font-mono text-[12px] text-zinc-600 select-none">
        +
      </div>
      <div className="fixed bottom-3 left-3 z-40 pointer-events-none font-mono text-[12px] text-zinc-600 select-none">
        +
      </div>
      <div className="fixed bottom-3 right-3 z-40 pointer-events-none font-mono text-[12px] text-zinc-600 select-none">
        +
      </div>

      {/* TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-10 py-4 flex items-center justify-between font-mono text-xs text-[#a1a1aa] bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none">
        {/* Top-Left: Personal Identity Wordmark */}
        <div className="flex items-center space-x-3 pointer-events-auto">
          <a
            href="#hero"
            onClick={() => handleNavClick('hero')}
            onMouseEnter={() => sound.hoverBeep()}
            className="flex items-center space-x-2 text-white font-bold tracking-wider hover:text-[#00f0ff] transition-colors"
          >
            <div className="w-2.5 h-2.5 bg-[#00f0ff] rotate-45 animate-pulse shadow-[0_0_8px_#00f0ff]" />
            <ScrambleText
              text="DHURAV"
              as="span"
              className="font-['Syne'] tracking-[0.25em] text-sm text-white"
            />
          </a>

          <div className="hidden sm:flex items-center space-x-2 text-[10px] pl-3 border-l border-white/10 text-zinc-400">
            <span className="text-[#00f0ff]">16 Y/O</span>
            <span className="text-zinc-600">//</span>
            <span>IICS YAMUNA VIHAR</span>
          </div>
        </div>

        {/* Center: 3D Engine Mode Pills */}
        <div className="hidden lg:flex items-center space-x-1 px-2.5 py-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[10px] tracking-wider pointer-events-auto">
          <span className="text-zinc-500 mr-1.5">3D ENGINE:</span>
          {(['spine', 'vortex', 'warp'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => handleVisualModeChange(mode)}
              onMouseEnter={() => sound.hoverBeep()}
              className={`px-2.5 py-0.5 rounded-full uppercase font-semibold transition-all cursor-pointer ${
                activeVisualMode === mode
                  ? 'bg-[#00f0ff] text-black shadow-[0_0_12px_rgba(0,240,255,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Top-Right: Minimal Navigation & Menu Trigger */}
        <div className="flex items-center space-x-4 md:space-x-6 pointer-events-auto">
          <nav className="hidden md:flex items-center space-x-5 text-[11px] tracking-widest uppercase">
            <button
              onClick={() => handleNavClick('work')}
              onMouseEnter={() => sound.hoverBeep()}
              className="hover:text-[#00f0ff] transition-colors cursor-pointer"
            >
              WORK
            </button>
            <button
              onClick={() => handleNavClick('marketing')}
              onMouseEnter={() => sound.hoverBeep()}
              className="hover:text-[#00f0ff] transition-colors cursor-pointer"
            >
              MARKETING
            </button>
            <button
              onClick={() => handleNavClick('about')}
              onMouseEnter={() => sound.hoverBeep()}
              className="hover:text-[#00f0ff] transition-colors cursor-pointer"
            >
              ABOUT
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              onMouseEnter={() => sound.hoverBeep()}
              className="hover:text-[#00f0ff] transition-colors cursor-pointer"
            >
              CONTACT
            </button>
          </nav>

          {/* Terminal Shortcut */}
          <button
            onClick={() => {
              sound.playChirp()
              onOpenTerminal()
            }}
            onMouseEnter={() => sound.hoverBeep()}
            className="p-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all cursor-pointer"
            title="Open CLI Terminal"
          >
            <TerminalIcon className="w-3.5 h-3.5" />
          </button>

          {/* Menu Trigger Button */}
          <button
            onClick={() => {
              sound.playChirp()
              onOpenMenu()
            }}
            onMouseEnter={() => sound.hoverBeep()}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/60 hover:border-[#00f0ff] hover:text-[#00f0ff] text-zinc-200 transition-all cursor-pointer"
          >
            <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
              <span className="w-1 h-1 bg-current rounded-full" />
              <span className="w-1 h-1 bg-current rounded-full" />
              <span className="w-1 h-1 bg-current rounded-full" />
              <span className="w-1 h-1 bg-current rounded-full" />
            </div>
            <span className="text-[11px] font-bold tracking-wider">MENU</span>
          </button>
        </div>
      </header>

      {/* BOTTOM BAR */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 px-6 md:px-10 py-4 flex items-center justify-between font-mono text-[11px] text-zinc-500 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none select-none">
        {/* Bottom-Left: Audio Controller */}
        <div className="flex items-center space-x-3 pointer-events-auto">
          <button
            onClick={handleSoundToggle}
            onMouseEnter={() => sound.hoverBeep()}
            className={`flex items-center space-x-2 px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
              soundActive
                ? 'border-[#00f0ff]/50 bg-[#00f0ff]/10 text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'border-zinc-800 bg-zinc-900/60 text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {soundActive ? (
              <>
                <Volume2 className="w-3 h-3" />
                <div className="flex items-end space-x-0.5 h-2.5 w-3.5">
                  <span className="w-0.5 bg-[#00f0ff] h-full animate-[pulse_0.5s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-[#00f0ff] h-2/3 animate-[pulse_0.8s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-[#00f0ff] h-4/5 animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-[#00f0ff] h-1/2 animate-[pulse_1.0s_ease-in-out_infinite]" />
                </div>
                <span>AUDIO: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3" />
                <span>AUDIO: OFF</span>
              </>
            )}
          </button>

          <span className="hidden sm:inline-block text-zinc-600">//</span>
          <span className="hidden sm:inline-block text-[10px] text-zinc-400">
            HOLD CLICK TO WARP
          </span>
        </div>

        {/* Bottom-Right: Live Coordinates, Depth & Time */}
        <div className="flex items-center space-x-4 pointer-events-auto">
          <div className="hidden md:flex items-center space-x-2 text-[10px] text-zinc-400">
            <span className="text-zinc-600">LOC:</span>
            <span>DELHI [28.69° N, 77.27° E]</span>
          </div>

          <div className="flex items-center space-x-2 text-[10px]">
            <span className="text-zinc-600">DEPTH:</span>
            <span className="text-emerald-400 font-bold tabular-nums">{depth}%</span>
          </div>

          <div className="flex items-center space-x-2 text-[10px]">
            <span className="text-zinc-600">TIME:</span>
            <span className="text-[#00f0ff] font-medium tabular-nums">{time} IST</span>
          </div>
        </div>
      </footer>
    </>
  )
}
