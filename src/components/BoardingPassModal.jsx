import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ticket, X, Download, Printer, Sparkles, QrCode, Train, ShieldCheck } from 'lucide-react'

export default function BoardingPassModal({ itinerary, tripData }) {
  const [isOpen, setIsOpen] = useState(false)
  const [passengerName, setPassengerName] = useState('TRAVELER / JAPAN EXPLORER')
  const ticketRef = useRef(null)

  if (!itinerary) return null

  const { cities, totalDays } = itinerary
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const ticketId = 'JR-JP' + Math.floor(100000 + Math.random() * 900000)

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
      >
        <Ticket size={15} />
        <span>🎟️ Digital JR Travel Pass</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 text-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-white/20 flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-950">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚅</span>
                  <div>
                    <h3 className="font-bold text-sm text-white tracking-wide flex items-center gap-2">
                      Official JR Neo-Pass Boarding Card
                    </h3>
                    <p className="text-[11px] text-amber-300">Commemorative Japan Express Digital Pass</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/15 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Passenger Name Editor */}
              <div className="px-6 pt-4 pb-2 flex items-center gap-3">
                <label className="text-xs text-gray-400 whitespace-nowrap">Passenger Name:</label>
                <input
                  type="text"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value.toUpperCase())}
                  placeholder="YOUR NAME"
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-xs font-mono font-bold text-amber-300 focus:outline-none focus:border-amber-400 w-full"
                />
              </div>

              {/* The Boarding Ticket Card */}
              <div className="p-6">
                <div
                  ref={ticketRef}
                  className="relative rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border-2 border-amber-400/40 p-6 shadow-2xl overflow-hidden"
                >
                  {/* Watermark Logo */}
                  <div className="absolute right-2 bottom-2 text-8xl opacity-5 pointer-events-none font-serif select-none">
                    日本
                  </div>

                  {/* Ticket Top Banner */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/15">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-xs text-white">
                        JR
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-amber-300">Japan Railway Group</p>
                        <p className="text-xs font-extrabold text-white">SHINKANSEN GRAN CLASS PASS</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-white/50">PASS NUMBER</p>
                      <p className="font-mono text-xs font-bold text-amber-400">{ticketId}</p>
                    </div>
                  </div>

                  {/* Route & Passenger */}
                  <div className="grid grid-cols-3 gap-4 py-5 border-b border-white/15">
                    <div>
                      <p className="text-[10px] text-white/50 uppercase font-semibold">Passenger</p>
                      <p className="font-mono font-bold text-sm text-white truncate">{passengerName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase font-semibold">Validity Duration</p>
                      <p className="font-bold text-sm text-amber-300">{totalDays} Days Express</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase font-semibold">Issue Date</p>
                      <p className="font-bold text-xs text-white/90">{dateStr}</p>
                    </div>
                  </div>

                  {/* Route Line */}
                  <div className="py-4 border-b border-white/15">
                    <p className="text-[10px] text-white/50 uppercase font-semibold mb-2">Destinations Included</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {cities.map((city, idx) => (
                        <div key={city.id} className="flex items-center gap-2">
                          <span className="bg-white/10 px-2.5 py-1 rounded-md text-xs font-bold text-white border border-white/15 flex items-center gap-1">
                            <span>{city.emoji}</span> {city.name.toUpperCase()}
                          </span>
                          {idx < cities.length - 1 && (
                            <span className="text-amber-400 font-bold text-xs">➔</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Collectible Passport Stamps */}
                  <div className="pt-4 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      {cities.slice(0, 3).map((c, i) => (
                        <div
                          key={i}
                          className="w-14 h-14 rounded-full border-2 border-dashed border-red-500/70 bg-red-500/10 flex flex-col items-center justify-center rotate-[-6deg] shadow-inner"
                        >
                          <span className="text-xs">{c.emoji}</span>
                          <span className="text-[8px] font-bold text-red-400 uppercase tracking-tighter">{c.name.slice(0, 5)}</span>
                          <span className="text-[7px] text-red-300/80">ENTRY</span>
                        </div>
                      ))}
                      <div className="w-14 h-14 rounded-full border-2 border-dashed border-amber-400/80 bg-amber-400/10 flex flex-col items-center justify-center rotate-[8deg]">
                        <span className="text-xs">🌸</span>
                        <span className="text-[8px] font-bold text-amber-300 uppercase">OFFICIAL</span>
                        <span className="text-[7px] text-amber-300/80">VERIFIED</span>
                      </div>
                    </div>

                    {/* Barcode representation */}
                    <div className="flex flex-col items-end">
                      <div className="flex gap-1 h-8 items-end mb-1">
                        {Array.from({ length: 32 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-white"
                            style={{
                              width: (i % 3 === 0 ? '3px' : '1.5px'),
                              height: (i % 2 === 0 ? '100%' : '75%'),
                              opacity: 0.85
                            }}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[9px] text-white/50 tracking-widest">
                        {ticketId}-JAPAN-2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-5 border-t border-white/10 bg-slate-950 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  🗾 Ready to save for your trip!
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    <Printer size={14} /> Print Pass
                  </button>
                  <button
                    onClick={() => {
                      alert("🎉 Your JR Digital Pass is ready! You can screenshot or print this ticket for your travel journal.")
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg transition-all hover:scale-105"
                  >
                    <ShieldCheck size={14} /> Save Boarding Card
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
