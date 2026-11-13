import React from 'react'
import { X, ArrowRight, ExternalLink } from 'lucide-react'
import { sound } from '../utils/soundEngine'
import { scrollEngine } from '../utils/scrollEngine'
import { ScrambleText } from './ScrambleText'

interface PortfolioMenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  onOpenParadiseModal: () => void
  onOpenTerminal: () => void
}

export const PortfolioMenuOverlay: React.FC<PortfolioMenuOverlayProps> = ({
  isOpen,
  onClose,
  onOpenParadiseModal,
  onOpenTerminal,
}) => {
  if (!isOpen) return null

  const handleNav = (id: string) => {
    sound.playChirp()
    onClose()
    const el = document.getElementById(id)
    if (el) {
      scrollEngine.scrollTo(el, { offset: -40 })
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12 animate-[fadeIn_0.25s_ease-out] font-mono select-none overflow-y-auto">
      {/* Top Header of Overlay */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 bg-[#00f0ff] rotate-45 animate-pulse shadow-[0_0_10px_#00f0ff]" />
          <span className="font-['Syne'] font-black text-xl tracking-widest text-white">
            DHURAV
          </span>
          <span className="text-[11px] text-[#00f0ff] px-2 py-0.5 border border-[#00f0ff]/40 rounded-full bg-[#00f0ff]/10">
            AGE 16 // IICS YAMUNA VIHAR
          </span>
        </div>

        <button
          onClick={() => {
            sound.hoverBeep()
            onClose()
          }}
          className="p-2 rounded-full border border-white/20 text-zinc-400 hover:text-white hover:border-[#00f0ff] hover:bg-white/5 transition-all cursor-pointer flex items-center space-x-2 text-xs"
        >
          <span>CLOSE [ESC]</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Center Giant Menu Links */}
      <div className="my-auto py-8 space-y-4 md:space-y-6">
        <div className="text-xs text-zinc-500 tracking-widest uppercase">
          DIRECTORY // PORTFOLIO NAVIGATION
        </div>

        <nav className="flex flex-col space-y-2">
          {/* Item 1 */}
          <div className="group flex items-center justify-between border-b border-white/5 py-3 md:py-5 cursor-pointer">
            <button
              onClick={() => handleNav('work')}
              onMouseEnter={() => sound.hoverBeep()}
              className="text-left flex items-baseline space-x-4 md:space-x-8"
            >
              <span className="text-xs md:text-sm text-[#00f0ff] font-bold">[01]</span>
              <span className="font-['Syne'] font-black text-3xl sm:text-5xl md:text-7xl text-white group-hover:text-[#00f0ff] group-hover:translate-x-3 transition-all tracking-tight uppercase">
                <ScrambleText text="CHECK WORK" />
              </span>
            </button>
            <div className="hidden sm:flex items-center space-x-3 text-xs text-zinc-400">
              <span className="text-emerald-400 font-semibold">paradisepublicschool.com</span>
              <ArrowRight className="w-4 h-4 text-[#00f0ff] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Item 2 */}
          <div className="group flex items-center justify-between border-b border-white/5 py-3 md:py-5 cursor-pointer">
            <button
              onClick={() => handleNav('marketing')}
              onMouseEnter={() => sound.hoverBeep()}
              className="text-left flex items-baseline space-x-4 md:space-x-8"
            >
              <span className="text-xs md:text-sm text-purple-400 font-bold">[02]</span>
              <span className="font-['Syne'] font-black text-3xl sm:text-5xl md:text-7xl text-white group-hover:text-purple-300 group-hover:translate-x-3 transition-all tracking-tight uppercase">
                <ScrambleText text="DIGITAL MARKETING" />
              </span>
            </button>
            <div className="hidden sm:flex items-center space-x-3 text-xs text-zinc-400">
              <span>IICS Yamuna Vihar Specialization</span>
              <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Item 3 */}
          <div className="group flex items-center justify-between border-b border-white/5 py-3 md:py-5 cursor-pointer">
            <button
              onClick={() => handleNav('about')}
              onMouseEnter={() => sound.hoverBeep()}
              className="text-left flex items-baseline space-x-4 md:space-x-8"
            >
              <span className="text-xs md:text-sm text-yellow-400 font-bold">[03]</span>
              <span className="font-['Syne'] font-black text-3xl sm:text-5xl md:text-7xl text-white group-hover:text-yellow-300 group-hover:translate-x-3 transition-all tracking-tight uppercase">
                <ScrambleText text="PROFILE & DOSSIER" />
              </span>
            </button>
            <div className="hidden sm:flex items-center space-x-3 text-xs text-zinc-400">
              <span>Age 16 // Operator Dossier</span>
              <ArrowRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Item 4 */}
          <div className="group flex items-center justify-between border-b border-white/5 py-3 md:py-5 cursor-pointer">
            <button
              onClick={() => handleNav('contact')}
              onMouseEnter={() => sound.hoverBeep()}
              className="text-left flex items-baseline space-x-4 md:space-x-8"
            >
              <span className="text-xs md:text-sm text-emerald-400 font-bold">[04]</span>
              <span className="font-['Syne'] font-black text-3xl sm:text-5xl md:text-7xl text-white group-hover:text-emerald-300 group-hover:translate-x-3 transition-all tracking-tight uppercase">
                <ScrambleText text="COMMISSION WORK" />
              </span>
            </button>
            <div className="hidden sm:flex items-center space-x-3 text-xs text-zinc-400">
              <span>Fast WhatsApp & Email Response</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom Footer Info */}
      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-zinc-400">
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="https://paradisepublicschool.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#00f0ff] transition-colors flex items-center space-x-1.5"
          >
            <span>paradisepublicschool.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => {
              onClose()
              onOpenParadiseModal()
            }}
            className="hover:text-white transition-colors cursor-pointer text-left"
          >
            PARADISE CASE STUDY
          </button>

          <button
            onClick={() => {
              onClose()
              onOpenTerminal()
            }}
            className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
          >
            LAUNCH_TERMINAL_CLI
          </button>
        </div>

        <div className="text-[11px] text-zinc-500">
          OPERATOR: DHURAV GUPTA // DELHI, INDIA // 2026
        </div>
      </div>
    </div>
  )
}
