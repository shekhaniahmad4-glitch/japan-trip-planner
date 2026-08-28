import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightLeft, X, Coins, Sparkles } from 'lucide-react'

const PRESETS = [
  { label: '🍙 Onigiri', jpy: 160 },
  { label: '🍜 Tonkotsu Ramen', jpy: 950 },
  { label: '🚇 Tokyo Subway', jpy: 210 },
  { label: '🚅 Bullet Train (Tokyo→Osaka)', jpy: 14500 },
  { label: '🎢 USJ / Disneyland Pass', jpy: 8600 },
  { label: '🏨 Hotel (1 Night)', jpy: 9000 }
]

export default function CurrencyConverterWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [jpy, setJpy] = useState(1000)
  const [php, setPhp] = useState(370)

  const handleJpyChange = (val) => {
    const num = parseFloat(val) || 0
    setJpy(val)
    setPhp((num * 0.37).toFixed(2))
  }

  const handlePhpChange = (val) => {
    const num = parseFloat(val) || 0
    setPhp(val)
    setJpy(Math.round(num / 0.37))
  }

  const applyPreset = (amount) => {
    setJpy(amount)
    setPhp((amount * 0.37).toFixed(2))
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold transition-all hover:scale-105"
        title="Live Currency Converter (¥ JPY ⇄ ₱ PHP)"
      >
        <Coins size={13} className="text-amber-400" />
        <span>¥ ⇄ ₱ Calculator</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-indigo-950 text-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-amber-400/30 flex flex-col"
            >
              {/* Header */}
              <div className="p-5 bg-indigo-900/50 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <ArrowRightLeft size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Live Currency Converter</h3>
                    <p className="text-[11px] text-amber-300">Conversion Rate: ¥1 ≈ ₱0.37 / ₱1 ≈ ¥2.70</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Conversion Form */}
              <div className="p-6 space-y-4">
                {/* JPY Input */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Japanese Yen (¥ JPY)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-amber-400 font-bold text-sm">¥</span>
                    <input
                      type="number"
                      value={jpy}
                      onChange={(e) => handleJpyChange(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 focus:border-amber-400 rounded-xl py-2.5 pl-8 pr-4 text-white font-mono font-bold text-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-center text-amber-400">
                  <ArrowRightLeft size={18} className="animate-pulse" />
                </div>

                {/* PHP Input */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Philippine Peso (₱ PHP)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-pink-400 font-bold text-sm">₱</span>
                    <input
                      type="number"
                      value={php}
                      onChange={(e) => handlePhpChange(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 focus:border-pink-400 rounded-xl py-2.5 pl-8 pr-4 text-white font-mono font-bold text-lg focus:outline-none"
                    />
                  </div>
                </div>

                {/* Quick Price Anchors */}
                <div className="pt-2">
                  <p className="text-[11px] text-gray-400 font-semibold mb-2 uppercase tracking-wider">
                    Quick Japan Travel Benchmarks:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESETS.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => applyPreset(p.jpy)}
                        className="text-left p-2 rounded-xl bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/50 transition-all text-xs"
                      >
                        <p className="text-white/90 font-medium truncate">{p.label}</p>
                        <p className="text-amber-300 font-mono font-bold text-[11px]">
                          ¥{p.jpy.toLocaleString()} ≈ ₱{(p.jpy * 0.37).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-indigo-900/50 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
