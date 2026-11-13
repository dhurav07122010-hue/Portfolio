import React from 'react'

interface KineticMarqueeProps {
  items: string[]
  reverse?: boolean
  speed?: number
  className?: string
}

export const KineticMarquee: React.FC<KineticMarqueeProps> = ({
  items,
  reverse = false,
  className = '',
}) => {
  return (
    <div className={`overflow-hidden select-none whitespace-nowrap py-4 border-y border-zinc-800/80 bg-black/40 backdrop-blur-sm ${className}`}>
      <div
        className={`inline-flex items-center space-x-8 font-['Syne'] font-black text-2xl sm:text-4xl md:text-5xl tracking-tighter text-zinc-700/60 uppercase ${
          reverse ? 'animate-[marqueeReverse_28s_linear_infinite]' : 'animate-[marquee_28s_linear_infinite]'
        } hover:[animation-play-state:paused]`}
      >
        {Array.from({ length: 4 }).flatMap(() => items).map((item, idx) => (
          <div key={idx} className="inline-flex items-center space-x-8">
            <span className="hover:text-[#00f0ff] transition-colors cursor-default">
              {item}
            </span>
            <span className="text-[#00f0ff] text-xl sm:text-3xl font-mono">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
