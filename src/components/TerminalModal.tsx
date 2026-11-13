import React, { useState, useEffect, useRef } from 'react'
import { X, Terminal as TermIcon, CornerDownLeft } from 'lucide-react'
import { sound } from '../utils/soundEngine'

interface TerminalModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectProject?: (slug: string) => void
}

interface CommandHistory {
  command: string
  output: React.ReactNode
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose, onSelectProject }) => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'sys.init',
      output: (
        <div className="text-zinc-400 space-y-1">
          <p className="text-[#00f0ff]">
            SYSTEM CORE INITIALIZED // DHURAV HYDRA ENGINE v2.6
          </p>
          <p>Operator: <span className="text-white font-bold">Dhurav</span> (Age: 16)</p>
          <p>Affiliation: <span className="text-white">IICS Yamuna Vihar</span> (Digital Marketing Specialization)</p>
          <p>Key Showcase: <span className="text-emerald-400 font-bold">paradisepublicschool.com</span></p>
          <p className="text-zinc-500 mt-2">
            Type <span className="text-[#00f0ff] font-bold">help</span> to view available system commands.
          </p>
        </div>
      ),
    },
  ])

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  if (!isOpen) return null

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    let output: React.ReactNode = null

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-[#00f0ff] font-bold">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div><span className="text-purple-400 font-semibold">dhruv</span> - Profile dossier & background</div>
              <div><span className="text-purple-400 font-semibold">iics</span> - IICS Yamuna Vihar course details</div>
              <div><span className="text-purple-400 font-semibold">paradise</span> - Inspect paradisepublicschool.com</div>
              <div><span className="text-purple-400 font-semibold">marketing</span> - Digital marketing skill breakdown</div>
              <div><span className="text-purple-400 font-semibold">sound</span> - Toggle audio synthesizer</div>
              <div><span className="text-purple-400 font-semibold">contact</span> - Contact & collaboration info</div>
              <div><span className="text-purple-400 font-semibold">clear</span> - Wipe terminal logs</div>
            </div>
          </div>
        )
        break

      case 'dhruv':
        output = (
          <div className="space-y-1.5 text-zinc-300 border-l-2 border-[#00f0ff] pl-3 py-1">
            <p className="text-white font-bold text-sm">DHRUV // DOSSIER</p>
            <p>• Age: <span className="text-[#00f0ff]">16 Years Old</span></p>
            <p>• Location: <span className="text-zinc-200">Yamuna Vihar, Delhi, India</span></p>
            <p>• Specialty: <span className="text-emerald-400 font-semibold">Growth Marketer, Performance Ads & Interactive Web Specialist</span></p>
            <p>• Currently Enrolled: <span className="text-purple-300 font-semibold">Digital Marketing Course @ IICS Yamuna Vihar</span></p>
            <p>• Flagship Production: <span className="text-[#00f0ff]">paradisepublicschool.com</span></p>
          </div>
        )
        break

      case 'iics':
        output = (
          <div className="space-y-1 text-zinc-300 border-l-2 border-purple-500 pl-3 py-1">
            <p className="text-purple-300 font-bold text-sm">IICS YAMUNA VIHAR // DIGITAL MARKETING PROGRAM</p>
            <p>Indian Institute of Computer Science (IICS), Yamuna Vihar Branch, Delhi.</p>
            <p>Focus Areas:</p>
            <p>→ Search Engine Optimization (SEO) & Technical On-Page/Off-Page Optimization</p>
            <p>→ Meta Ads Strategy (Targeting, Lookalike Audiences, CBO/ABO, Retargeting)</p>
            <p>→ Google Search, Display & Performance Max Ads</p>
            <p>→ Conversion Rate Optimization (CRO) & Funnel Architecture</p>
            <p>→ Web Analytics (Google Analytics 4 & Google Tag Manager)</p>
          </div>
        )
        break

      case 'paradise':
        output = (
          <div className="space-y-1.5 text-zinc-300 border-l-2 border-emerald-400 pl-3 py-1">
            <p className="text-emerald-400 font-bold text-sm">PROJECT: PARADISE PUBLIC SCHOOL</p>
            <p>Live Domain: <a href="https://paradisepublicschool.com" target="_blank" rel="noreferrer" className="text-[#00f0ff] underline">https://paradisepublicschool.com</a></p>
            <p>Role: Lead Digital Marketing Strategist & Web Architect</p>
            <p className="text-zinc-400">Achievements:</p>
            <p>✓ +340% increase in prospective admissions inquiries</p>
            <p>✓ #1 Local 3-Pack Ranking on Google Maps for regional searches</p>
            <p>✓ Enterprise ERP + Cross-platform Mobile Portal Integration</p>
            <p>✓ Sub-second load times & 100% Core Web Vitals score</p>
          </div>
        )
        if (onSelectProject) {
          onSelectProject('paradise')
        }
        break

      case 'marketing':
        output = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-[#00f0ff] font-bold">DIGITAL MARKETING COMPETENCIES:</p>
            <p>1. <span className="text-white font-medium">Performance Marketing:</span> Meta Ads, Google Ads (Search/PMax), ROAS optimization.</p>
            <p>2. <span className="text-white font-medium">Organic Growth & SEO:</span> Keyword clustering, programmatic landing pages, backlink velocity.</p>
            <p>3. <span className="text-white font-medium">Conversion Design:</span> Cinematic high-conversion UI/UX, micro-animations, fast checkout & inquiry flows.</p>
            <p>4. <span className="text-white font-medium">Data Tracking:</span> GA4 Custom Events, Meta Pixel Server-Side API, UTM attribution.</p>
          </div>
        )
        break

      case 'sound': {
        const active = sound.toggle()
        output = (
          <p className={active ? 'text-[#00f0ff]' : 'text-zinc-500'}>
            Sound Synthesizer is now: {active ? 'ONLINE (ACTIVE)' : 'MUTED (OFF)'}
          </p>
        )
        break
      }

      case 'contact':
        output = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-white font-bold">CONNECT WITH DHRUV:</p>
            <p>Email: <span className="text-[#00f0ff]">dhruv.marketing@gmail.com</span></p>
            <p>Location: Yamuna Vihar, Delhi 110053</p>
            <p>Status: Available for Digital Marketing campaigns & Web development</p>
          </div>
        )
        break

      case 'clear':
        setHistory([])
        return

      case '':
        return

      default:
        output = (
          <p className="text-red-400">
            Command not recognized: <span className="text-white">"{cmd}"</span>. Type <span className="text-[#00f0ff]">help</span> for valid commands.
          </p>
        )
    }

    setHistory((prev) => [...prev, { command: cmd, output }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sound.playTerminalKey()
    handleCommand(input)
    setInput('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
      <div className="relative w-full max-w-3xl bg-[#09090f] border border-[#00f0ff]/40 rounded-xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col h-[520px]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d16] border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <TermIcon className="w-4 h-4 text-[#00f0ff]" />
            <span className="font-mono text-xs font-bold text-white tracking-wider">
              DHRUV_CLI // ACTIVE_THEORY_EMULATOR_V2
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 border border-zinc-800 rounded">
              IICS YAMUNA VIHAR
            </span>
            <button
              onClick={() => {
                sound.hoverBeep()
                onClose()
              }}
              className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content Area */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-4">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center space-x-2 text-zinc-400">
                <span className="text-[#00f0ff]">dhruv@iics:~$</span>
                <span className="text-white font-medium">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <form onSubmit={handleSubmit} className="p-3 bg-[#0d0d16] border-t border-zinc-800 flex items-center space-x-2">
          <span className="text-[#00f0ff] font-mono text-xs">dhruv@iics:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              sound.playTerminalKey()
            }}
            placeholder="Type 'help', 'paradise', 'dhruv', 'iics', 'marketing'..."
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder-zinc-600 focus:outline-none"
          />
          <button
            type="submit"
            className="p-1.5 text-zinc-400 hover:text-[#00f0ff] transition-colors"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
