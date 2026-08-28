import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Gift, RotateCw, Star } from 'lucide-react'
import { audioEngine } from '../lib/audio-engine'

const GACHA_ITEMS = [
  {
    name: 'Hidden Akihabara Underground Retro Arcade',
    city: 'Tokyo',
    rarity: '⭐⭐⭐⭐⭐ ULTRA RARE',
    color: 'from-amber-400 to-orange-500',
    emoji: '🕹️',
    desc: 'Tucked below Sotokanda alley, this legendary basement holds mint condition 1980s candy cab arcade machines and rare rhythm games.'
  },
  {
    name: 'Fushimi Inari Secret Twilight Fox Trail',
    city: 'Kyoto',
    rarity: '⭐⭐⭐⭐⭐ ULTRA RARE',
    color: 'from-purple-500 to-indigo-600',
    emoji: '🦊',
    desc: 'Hike past the main crowds at dusk to reach the quiet bamboo groves where red lanterns glow and mountain fox statues whisper.'
  },
  {
    name: 'Secret Kobe A5 Wagyu Skewer Master',
    city: 'Osaka',
    rarity: '⭐⭐⭐⭐ GOURMET GEM',
    color: 'from-rose-500 to-red-600',
    emoji: '🥩',
    desc: 'A tiny 4-seat standing stall near Kuromon serving blowtorch-seared A5 Miyazaki beef with wasabi sea salt for just ¥800 (₱296).'
  },
  {
    name: 'Ginza Rooftop Secret Inari Shrine',
    city: 'Tokyo',
    rarity: '⭐⭐⭐⭐ SPECIAL SPOT',
    color: 'from-pink-400 to-rose-500',
    emoji: '⛩️',
    desc: 'Hidden on the 13th floor rooftop garden of Ginza Six — serene stone foxes overlooking the glittering Tokyo skyline.'
  },
  {
    name: 'Dotonbori Midnight Takoyaki Master',
    city: 'Osaka',
    rarity: '⭐⭐⭐⭐ GOURMET GEM',
    color: 'from-amber-500 to-yellow-600',
    emoji: '🐙',
    desc: 'Secret recipe with dashi broth and giant octopus tentacles crispy on the outside, steaming molten center.'
  },
  {
    name: 'Uji Century-Old Matcha Parfait Haven',
    city: 'Kyoto',
    rarity: '⭐⭐⭐⭐ SPECIAL SPOT',
    color: 'from-emerald-400 to-teal-600',
    emoji: '🍵',
    desc: 'Tsuen Tea, the oldest tea shop in Japan established in 1160 AD, serving deep ceremonial matcha ice cream along the Uji River.'
  }
]

export default function GachaponModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [capsule, setCapsule] = useState(null)

  const spinGacha = () => {
    setIsSpinning(true)
    setCapsule(null)
    audioEngine.playCoinSFX()

    setTimeout(() => {
      const random = GACHA_ITEMS[Math.floor(Math.random() * GACHA_ITEMS.length)]
      setCapsule(random)
      setIsSpinning(false)
      audioEngine.playStationJingle()
    }, 1200)
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-indigo-950 text-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-pink-500/30 flex flex-col relative"
          >
            {/* Header */}
            <div className="p-5 bg-indigo-900/60 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">🎰</span>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    Japan Gachapon Mystery Machine
                  </h3>
                  <p className="text-[11px] text-pink-300">Spin to unlock secret hidden gems & foodie spots!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Gacha Content */}
            <div className="p-6 text-center flex flex-col items-center justify-center min-h-[300px]">
              {isSpinning ? (
                <div className="space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 p-1 mx-auto shadow-2xl flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-full bg-indigo-950 flex items-center justify-center text-4xl">
                      🔮
                    </div>
                  </motion.div>
                  <p className="font-bold text-sm text-pink-300 animate-pulse">
                    *Crank Turning* Dropping Capsule...
                  </p>
                </div>
              ) : capsule ? (
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-full"
                >
                  <div className="inline-block px-3 py-1 bg-amber-400/20 border border-amber-400 text-amber-300 rounded-full text-[11px] font-bold mb-3">
                    {capsule.rarity}
                  </div>

                  <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${capsule.color} flex items-center justify-center text-4xl shadow-xl shadow-pink-500/20 mb-3`}>
                    {capsule.emoji}
                  </div>

                  <h4 className="font-serif text-lg font-bold text-white mb-1">
                    {capsule.name}
                  </h4>
                  <p className="text-xs text-pink-300 font-semibold mb-3">
                    📍 {capsule.city}, Japan
                  </p>
                  <p className="text-xs text-white/80 leading-relaxed bg-white/5 p-3.5 rounded-2xl border border-white/10 text-left">
                    {capsule.desc}
                  </p>
                </motion.div>
              ) : null}
            </div>

            {/* Footer */}
            <div className="p-4 bg-indigo-900/60 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/40">Free unlimited spins</span>
              <button
                disabled={isSpinning}
                onClick={spinGacha}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-xl text-xs shadow-lg transition-all disabled:opacity-50"
              >
                <RotateCw size={14} className={isSpinning ? "animate-spin" : ""} />
                {isSpinning ? "Spinning..." : "Spin Again 🪙"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          setIsOpen(true)
          if (!capsule) spinGacha()
        }}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-700 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
      >
        <span className="text-sm">🎰</span>
        <span>Gachapon Lucky Spot</span>
      </motion.button>

      {/* Render modal with React Portal */}
      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  )
}
