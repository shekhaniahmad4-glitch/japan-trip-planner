import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Sparkles, MessageCircle, X, Compass, Utensils, Train, HelpCircle, Check, Play } from 'lucide-react'
import { speakJapanese } from '../lib/tts-engine'

const PHRASES = [
  { jp: 'すみません', romaji: 'Sumimasen', en: 'Excuse me / Sorry / Thank you', category: 'Essential' },
  { jp: 'これをお願いします', romaji: 'Kore o onegaishimasu', en: 'I will take this please (pointing)', category: 'Ordering' },
  { jp: 'お会計をお願いします', romaji: 'O-kaikei onegaishimasu', en: 'Check / Bill please', category: 'Dining' },
  { jp: '美味しいです！', romaji: 'Oishii desu!', en: 'This is delicious!', category: 'Dining' },
  { jp: '英語のメニューはありますか？', romaji: 'Eigo no menyū wa arimasu ka?', en: 'Do you have an English menu?', category: 'Dining' },
  { jp: 'トイレはどこですか？', romaji: 'Toire wa doko desu ka?', en: 'Where is the restroom?', category: 'Direction' },
  { jp: '写真を撮ってもいいですか？', romaji: 'Shashin o totte mo ii desu ka?', en: 'May I take a photo here?', category: 'Etiquette' },
  { jp: 'いくらですか？', romaji: 'Ikura desu ka?', en: 'How much is this?', category: 'Shopping' },
  { jp: '免税できますか？', romaji: 'Menzei dekimasu ka?', en: 'Can I get tax-free shopping?', category: 'Shopping' },
  { jp: 'ありがとうございます！', romaji: 'Arigatou gozaimasu!', en: 'Thank you very much!', category: 'Essential' }
]

const HACKS = [
  {
    icon: '🍱',
    title: 'Konbini Gourmet Hacks',
    points: [
      '7-Eleven Egg Salad Sandwich: Legendary fluffy milk bread with rich yolk filling.',
      'FamilyMart Famichiki: Crispy boneless fried chicken kept under the hot counter glass.',
      'Lawson Karaage-kun: Red-hot spice nuggets & Premium Uchi Cafe Roll Cake.'
    ]
  },
  {
    icon: '🚆',
    title: 'IC Card & Train Pro-Tips',
    points: [
      'Digital Suica / Pasmo: Add directly to Apple Wallet (Express Transit mode works even when phone battery is empty!).',
      'Bullet Train Luggage: Bags exceeding 160cm total dimensions require reserved oversized luggage seats.',
      'Takkyubin: Forward heavy suitcases from hotel to hotel for just ~¥2,000 (₱740).'
    ]
  },
  {
    icon: '♨️',
    title: 'Onsen & Ryokan Etiquette',
    points: [
      'Wash thoroughly with soap on the small stools BEFORE entering any bath water.',
      'Never put your modesty towel into the onsen bath — balance it on your head!',
      'Tattoos: Cover with waterproof patches or book a private "Kashikiri" bath.'
    ]
  },
  {
    icon: '🛍️',
    title: 'Tax-Free 10% Savings',
    points: [
      'Carry your physical passport with tourist visa sticker at all times.',
      'Purchases over ¥5,500 (₱2,035) in Don Quijote, Bic Camera, Uniqlo qualify for instant 10% tax refund.'
    ]
  }
]

export default function JapanSenseiModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [tab, setTab] = useState('phrasebook')
  const [speakingIndex, setSpeakingIndex] = useState(null)

  const handleSpeak = (text, index) => {
    speakJapanese(
      text,
      () => setSpeakingIndex(index),
      () => setSpeakingIndex(null)
    )
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden border border-gray-100 relative"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-900 text-white p-6 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
              >
                <X size={18} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-2xl shadow-lg">
                  🦊
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                    Kenji Sensei · AI Travel Concierge
                  </h3>
                  <p className="text-xs text-pink-300">
                    Talking Japanese phrasebook, insider foodie hacks & etiquette guide
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => setTab('phrasebook')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    tab === 'phrasebook'
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  🗣️ Talking Phrasebook
                </button>
                <button
                  onClick={() => setTab('hacks')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    tab === 'hacks'
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  💡 Insider Travel Hacks
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-gray-50/50">
              {/* ── TALKING PHRASEBOOK TAB ── */}
              {tab === 'phrasebook' && (
                <div className="space-y-3">
                  <div className="bg-pink-50 border border-pink-200 rounded-xl p-3 flex items-center gap-2 text-xs text-pink-900">
                    <Volume2 size={16} className="text-pink-600 flex-shrink-0" />
                    <span>Click the <strong>Play 🔊</strong> button on any phrase to hear real authentic native Japanese pronunciation!</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {PHRASES.map((item, idx) => (
                      <div
                        key={idx}
                        className={`bg-white p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 group ${
                          speakingIndex === idx
                            ? 'border-pink-500 bg-pink-50/40 shadow-md ring-2 ring-pink-400/20'
                            : 'border-gray-100 shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                              {item.category}
                            </span>
                            {speakingIndex === idx && (
                              <span className="text-[10px] text-pink-600 font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                                Speaking...
                              </span>
                            )}
                          </div>
                          <p className="font-bold text-base text-indigo-950 leading-tight">
                            {item.jp}
                          </p>
                          <p className="text-xs font-medium text-pink-600 mb-1">
                            {item.romaji}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.en}
                          </p>
                        </div>

                        <button
                          onClick={() => handleSpeak(item.jp, idx)}
                          className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${
                            speakingIndex === idx
                              ? 'bg-pink-500 text-white scale-110 shadow-lg shadow-pink-500/30'
                              : 'bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600 group-hover:scale-105'
                          }`}
                          title="Listen to Japanese pronunciation"
                        >
                          <Volume2 size={18} className={speakingIndex === idx ? "animate-pulse" : ""} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── INSIDER HACKS TAB ── */}
              {tab === 'hacks' && (
                <div className="space-y-4">
                  {HACKS.map((hack, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                      <h4 className="font-bold text-sm text-indigo-950 flex items-center gap-2 mb-3">
                        <span className="text-xl">{hack.icon}</span> {hack.title}
                      </h4>
                      <ul className="space-y-2">
                        {hack.points.map((pt, j) => (
                          <li key={j} className="text-xs text-gray-600 flex items-start gap-2 leading-relaxed">
                            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                🇯🇵 Powered by Japan Web Travel Engine
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-indigo-950 text-white hover:bg-indigo-900 rounded-xl text-xs font-bold transition-all"
              >
                Got It, Sensei! 👍
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {/* Floating Sensei Mascot Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-pink-500/40 border border-white/30"
      >
        <span className="text-xl">🦊</span>
        <span className="text-xs font-bold tracking-wide">Japan Sensei & Audio</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </motion.button>

      {/* Render modal directly into document.body to prevent any container clipping */}
      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  )
}
