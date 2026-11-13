import React, { useState, useEffect, useRef, useCallback } from 'react'

interface ScrambleTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div' | 'p'
  triggerOnHover?: boolean
  speed?: number
}

const GLYPHS = '01#%&*+<>_/[{]}-~=§ØΔλЖ'

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  as: Component = 'span',
  triggerOnHover = true,
  speed = 28,
}) => {
  const [displayText, setDisplayText] = useState(text)
  const isScramblingRef = useRef(false)
  const intervalRef = useRef<number | null>(null)

  const scramble = useCallback(() => {
    if (isScramblingRef.current) return
    isScramblingRef.current = true

    let iteration = 0
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return text[index]
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')
      )

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        isScramblingRef.current = false
      }

      iteration += 1 / 2
    }, speed)
  }, [text, speed])

  useEffect(() => {
    scramble()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [scramble])

  return (
    <Component
      className={className}
      onMouseEnter={() => {
        if (triggerOnHover) scramble()
      }}
    >
      {displayText}
    </Component>
  )
}
