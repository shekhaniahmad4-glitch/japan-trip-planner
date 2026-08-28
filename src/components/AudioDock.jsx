import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Music, CloudRain, Bell, Sparkles, Disc } from 'lucide-react'
import { audioEngine } from '../lib/audio-engine'

export default function AudioDock() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMode, setCurrentMode] = useState(null)
  const [isMuted, setIsMuted] = useState(false)
  const [jinglePlaying, setJinglePlaying] = useState(false)

  const handleToggle = (mode) => {
    if (currentMode === mode) {
      audioEngine.stopAmbience()
      setCurrentMode(null)
    } else {
      if (mode === 'zen') audioEngine.startZenChimes()
      if (mode === 'rain') audioEngine.startRainAmbience()
      setCurrentMode(mode)
      setIsMuted(false)
    }
  }

  const handleStationJingle = () => {
    setJinglePlaying(true)
    audioEngine.playStationJingle()
    setTimeout(() => setJinglePlaying(false), 2400)
  }

  const toggleMute = () => {
    if (isMuted) {
      audioEngine.setVolume(0.4)
      setIsMuted(false)
    } else {
      audioEngine.setVolume(0)
      setIsMuted(true)
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Expanded Audio Tray */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 p-4 rounded-2xl bg-indigo-950/90 backdrop-blur-xl border border-white/20 text-white shadow-2xl w-72"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
                <Disc size={13} className={currentMode ? "animate-spin" : ""} /> Japan Soundscape
              </span>
              <button
                onClick={toggleMute}
                className="text-white/60 hover:text-white transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={15} className="text-red-400" /> : <Volume2 size={15} />}
              </button>
            </div>

            {/* Sound options */}
            <div className="space-y-2">
              <button
                onClick={() => handleToggle('zen')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                  currentMode === 'zen'
                    ? 'bg-pink-600/40 border border-pink-400 text-pink-200'
                    : 'bg-white/5 hover:bg-white/10 text-white/80 border border-transparent'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className="text-pink-300" /> 🌸 Kyoto Zen Wind Chimes
                </span>
                {currentMode === 'zen' && (
                  <span className="flex gap-0.5">
                    <span className="w-1 h-3 bg-pink-400 animate-pulse rounded-full" />
                    <span className="w-1 h-4 bg-pink-300 animate-pulse delay-75 rounded-full" />
                    <span className="w-1 h-2 bg-pink-400 animate-pulse delay-150 rounded-full" />
                  </span>
                )}
              </button>

              <button
                onClick={() => handleToggle('rain')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                  currentMode === 'rain'
                    ? 'bg-indigo-600/50 border border-indigo-400 text-indigo-200'
                    : 'bg-white/5 hover:bg-white/10 text-white/80 border border-transparent'
                }`}
              >
                <span className="flex items-center gap-2">
                  <CloudRain size={14} className="text-cyan-300" /> 🌧️ Tokyo Rainy Cafe Lo-Fi
                </span>
                {currentMode === 'rain' && (
                  <span className="flex gap-0.5">
                    <span className="w-1 h-3 bg-cyan-400 animate-pulse rounded-full" />
                    <span className="w-1 h-4 bg-cyan-300 animate-pulse delay-75 rounded-full" />
                    <span className="w-1 h-2 bg-cyan-400 animate-pulse delay-150 rounded-full" />
                  </span>
                )}
              </button>

              {/* Station Departure Jingle button */}
              <button
                onClick={handleStationJingle}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                  jinglePlaying
                    ? 'bg-amber-500/40 border border-amber-300 text-amber-200 shadow-lg shadow-amber-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-white/80 border border-transparent'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Bell size={14} className="text-amber-300" /> 🚆 Yamanote Station Melody
                </span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md">
                  {jinglePlaying ? "Playing..." : "Play 🔔"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full backdrop-blur-xl shadow-xl border transition-all ${
          currentMode
            ? 'bg-pink-600 text-white border-pink-400 shadow-pink-500/30'
            : 'bg-indigo-950/80 text-white/90 border-white/20 hover:bg-indigo-900'
        }`}
      >
        <Music size={15} className={currentMode ? "animate-spin" : ""} />
        <span className="text-xs font-semibold hidden sm:inline">
          {currentMode ? "Soundscape: Active" : "Japan Ambience"}
        </span>
        {currentMode && (
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        )}
      </motion.button>
    </div>
  )
}
