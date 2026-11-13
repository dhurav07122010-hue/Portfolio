import React, { useEffect, useState, useRef } from 'react'
import { scrollEngine } from '../utils/scrollEngine'
import { sound } from '../utils/soundEngine'

const SECTIONS = [
  { id: 'hero', label: '00 // HERO', min: 0, max: 0.22 },
  { id: 'work', label: '01 // WORK', min: 0.22, max: 0.52 },
  { id: 'marketing', label: '02 // MARKETING', min: 0.52, max: 0.74 },
  { id: 'about', label: '03 // ABOUT', min: 0.74, max: 0.88 },
  { id: 'contact', label: '04 // CONTACT', min: 0.88, max: 1.0 },
]

export const ScrollHUD: React.FC = () => {
  const [progress, setProgress] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [activeStage, setActiveStage] = useState('00 // HERO')
  const lastStageRef = useRef('00 // HERO')

  useEffect(() => {
    const unsubscribe = scrollEngine.subscribe((data) => {
      setProgress(data.progress)
      setVelocity(Math.abs(data.velocity))

      // Identify active section stage
      const current = SECTIONS.find(
        (s) => data.progress >= s.min && data.progress <= s.max
      ) || SECTIONS[0]

      if (current.label !== lastStageRef.current) {
        lastStageRef.current = current.label
        setActiveStage(current.label)
        sound.hoverBeep()
      }
    })

    return () => unsubscribe()
  }, [])

  const handleStageClick = (id: string) => {
    sound.playChirp()
    const target = document.getElementById(id)
    if (target) {
      scrollEngine.scrollTo(target, { offset: -60 })
    }
  }

  return (
    <aside className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-35 hidden lg:flex flex-col items-end space-y-4 font-mono select-none pointer-events-auto">
      {/* Telemetry Capsule */}
      <div className="p-2.5 rounded-xl border border-zinc-800/80 bg-[#09090f]/80 backdrop-blur-md text-[10px] space-y-1.5 shadow-[0_0_20px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between space-x-3 text-zinc-400">
          <span className="text-zinc-500">STAGE:</span>
          <span className="text-[#00f0ff] font-bold">{activeStage.split(' // ')[0]}</span>
        </div>
        <div className="flex items-center justify-between space-x-3 text-zinc-400">
          <span className="text-zinc-500">DEPTH:</span>
          <span className="text-white font-medium">{(progress * 100).toFixed(0)}%</span>
        </div>
        <div className="flex items-center justify-between space-x-3 text-zinc-400">
          <span className="text-zinc-500">SPINE:</span>
          <span className="text-purple-400 font-medium">46 VERTEBRAE</span>
        </div>
        <div className="flex items-center justify-between space-x-3 text-zinc-400">
          <span className="text-zinc-500">VELOCITY:</span>
          <span className="text-emerald-400 tabular-nums">{velocity.toFixed(0)}</span>
        </div>

        {/* Dynamic Velocity Meter */}
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-gradient-to-r from-[#00f0ff] to-purple-500 transition-all duration-75"
            style={{ width: `${Math.min(100, velocity * 4)}%` }}
          />
        </div>
      </div>

      {/* Vertical Interactive Scroll Track & Stage Dots */}
      <div className="relative flex flex-col items-end space-y-5 pr-1 py-2">
        {/* Continuous Background Rail */}
        <div className="absolute right-[5px] top-0 bottom-0 w-[2px] bg-zinc-800/80" />

        {/* Active Scroll Fill Bar */}
        <div
          className="absolute right-[5px] top-0 w-[2px] bg-gradient-to-b from-[#00f0ff] via-purple-500 to-[#00f0ff] shadow-[0_0_8px_#00f0ff] transition-all duration-75"
          style={{ height: `${progress * 100}%` }}
        />

        {/* Stage Nodes */}
        {SECTIONS.map((section) => {
          const isActive = activeStage === section.label
          return (
            <button
              key={section.id}
              onClick={() => handleStageClick(section.id)}
              onMouseEnter={() => sound.hoverBeep()}
              className="group flex items-center space-x-3 text-right cursor-pointer"
            >
              {/* Tooltip Label */}
              <span
                className={`text-[10px] tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-[#00f0ff] font-bold opacity-100 translate-x-0'
                    : 'text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:text-zinc-300 translate-x-2 group-hover:translate-x-0'
                }`}
              >
                {section.label}
              </span>

              {/* Dot Reticle */}
              <div
                className={`relative z-10 w-3 h-3 rounded-full border transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'border-[#00f0ff] bg-[#00f0ff] shadow-[0_0_12px_#00f0ff] scale-125'
                    : 'border-zinc-700 bg-zinc-950 group-hover:border-zinc-400 group-hover:scale-110'
                }`}
              >
                {isActive && <div className="w-1 h-1 rounded-full bg-black animate-ping" />}
              </div>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
