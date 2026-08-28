import { useEffect, useRef } from 'react'

const PETALS = ['🌸', '🌺', '🌸', '🌸', '🌸']

export default function PetalRain() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createPetal = () => {
      const petal = document.createElement('div')
      petal.className = 'petal'
      petal.textContent = PETALS[Math.floor(Math.random() * PETALS.length)]
      petal.style.left = `${Math.random() * 100}vw`
      petal.style.fontSize = `${12 + Math.random() * 16}px`
      petal.style.animationDuration = `${6 + Math.random() * 8}s`
      petal.style.animationDelay = `${Math.random() * 3}s`
      petal.style.opacity = `${0.4 + Math.random() * 0.4}`
      container.appendChild(petal)
      setTimeout(() => petal.remove(), 16000)
    }

    const interval = setInterval(createPetal, 1200)
    // Seed a few immediately
    for (let i = 0; i < 5; i++) setTimeout(createPetal, i * 300)

    return () => clearInterval(interval)
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden />
}

