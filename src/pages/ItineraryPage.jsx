import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, MapPin, Calendar, Users, Sparkles, Navigation, X, Share2, Ticket } from 'lucide-react'
import { useTrip } from '../context/TripContext'
import DayCard from '../components/DayCard'
import CostBreakdown from '../components/CostBreakdown'
import JapanMap from '../components/JapanMap'
import BoardingPassModal from '../components/BoardingPassModal'
import GachaponModal from '../components/GachaponModal'

const DURATION_LABELS = {
  '1day':   '1 Day',
  '2days':  '2 Days',
  '3days':  '3 Days',
  '1week':  '1 Week',
  '2weeks': '2 Weeks',
  '1month': '1 Month',
}

const STYLE_LABELS = {
  budget:   '🎒 Budget',
  midrange: '🏨 Mid-range',
  luxury:   '👑 Luxury',
}

const GROUP_LABELS = {
  solo:   '🧳 Solo',
  couple: '💑 Couple',
  family: '👨‍👩‍👧 Family',
  group:  '👥 Group',
}

export default function ItineraryPage() {
  const { itinerary, tripData } = useTrip()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('itinerary')
  const [mapReady, setMapReady] = useState(false)
  const [selectedSpot, setSelectedSpot] = useState(null)

  useEffect(() => {
    if (!itinerary) {
      navigate('/plan')
      return
    }
    // Delay map render slightly so DOM is ready
    const t = setTimeout(() => setMapReady(true), 300)
    return () => clearTimeout(t)
  }, [itinerary, navigate])

  if (!itinerary) return null

  const { days, cities, costs, routes, totalDays } = itinerary

  const handlePrint = () => window.print()

  const handleSpotSelect = (spot) => {
    setSelectedSpot(spot)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream pt-20"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
            >
              <ArrowLeft size={16} /> Back to planner
            </Link>

            {/* Top right interactive actions */}
            <div className="flex items-center gap-2">
              <GachaponModal />
              <BoardingPassModal itinerary={itinerary} tripData={tripData} />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={20} className="text-pink-400" />
                <span className="text-pink-300 text-sm font-medium">Your Personalized Itinerary</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {DURATION_LABELS[tripData.duration] || 'Japan Trip'} Adventure
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-sm">
                  <Calendar size={13} /> {totalDays} Days
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-sm">
                  <MapPin size={13} /> {cities.length} {cities.length === 1 ? 'Destination' : 'Destinations'}
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-sm">
                  <Users size={13} /> {GROUP_LABELS[tripData.groupType]}
                </span>
                <span className="bg-white/10 px-3 py-1.5 rounded-full text-sm">
                  {STYLE_LABELS[tripData.travelStyle]}
                </span>
              </div>
            </div>

            {/* City route chips */}
            <div className="flex flex-wrap gap-2">
              {cities.map((city, i) => (
                <div key={city.id} className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      const firstDayCity = days.find(d => d.cityId === city.id)
                      if (firstDayCity && firstDayCity.activities[0]) {
                        setSelectedSpot(firstDayCity.activities[0])
                      }
                    }}
                    className="bg-white/10 border border-white/20 hover:bg-pink-600/30 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                  >
                    {city.emoji} {city.name}
                  </button>
                  {i < cities.length - 1 && (
                    <span className="text-white/40 text-xs">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-0">
              {[
                { id: 'itinerary', label: '📅 Day-by-Day & Map' },
                { id: 'map', label: '🗺️ Full Map & Transit' },
                { id: 'costs', label: '💴 Costs & Budget' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === id
                      ? 'border-pink-500 text-pink-600 font-bold'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-indigo-900 border border-gray-200 rounded-xl transition-all hover:bg-gray-50"
              >
                <Download size={13} /> Print Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── ITINERARY TAB ── */}
        {activeTab === 'itinerary' && (
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Day cards */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="font-serif text-xl font-bold text-indigo-950">
                    {days.length} Days Planned
                  </h2>
                  <p className="text-xs text-gray-400">
                    Click any activity to view its exact location, station, and transit directions
                  </p>
                </div>
              </div>

              {days.map((day, i) => (
                <DayCard
                  key={day.day}
                  day={day}
                  index={i}
                  selectedSpot={selectedSpot}
                  onSelectSpot={handleSpotSelect}
                />
              ))}
            </div>

            {/* Sticky map sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-32 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-indigo-950 flex items-center gap-2">
                    <Navigation size={16} className="text-pink-600" />
                    Interactive Map & Transit
                  </h3>
                  {selectedSpot && (
                    <button
                      onClick={() => setSelectedSpot(null)}
                      className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
                    >
                      <X size={12} /> Reset zoom
                    </button>
                  )}
                </div>

                <div style={{ height: '480px' }}>
                  {mapReady && (
                    <JapanMap
                      cities={cities}
                      routes={routes}
                      selectedSpot={selectedSpot}
                      onClearSpot={() => setSelectedSpot(null)}
                    />
                  )}
                </div>

                {/* Selected spot indicator */}
                {selectedSpot ? (
                  <div className="bg-pink-50 border border-pink-200 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{selectedSpot.emoji || '📍'}</span>
                      <div>
                        <p className="text-xs font-bold text-pink-900">{selectedSpot.name}</p>
                        <p className="text-[11px] text-pink-700">{selectedSpot.station || selectedSpot.city}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedSpot(null)}
                      className="text-xs text-pink-600 hover:text-pink-800 font-semibold"
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 text-center italic">
                    💡 Click on any activity in your day cards to pinpoint it and calculate train, taxi, or flight directions.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── MAP TAB ── */}
        {activeTab === 'map' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-indigo-950">Interactive Route & Spot Navigator</h2>
                <p className="text-xs text-gray-500">
                  Pinpoint activities and search departure points for subway lines, taxis, and flights
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2" style={{ height: '620px' }}>
                {mapReady && (
                  <JapanMap
                    cities={cities}
                    routes={routes}
                    selectedSpot={selectedSpot}
                    onClearSpot={() => setSelectedSpot(null)}
                  />
                )}
              </div>

              <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1">
                <h3 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
                  <MapPin size={15} className="text-pink-600" />
                  All Planned Places ({days.reduce((acc, d) => acc + d.activities.length, 0)} spots)
                </h3>

                {days.map(day => (
                  <div key={day.day} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-50">
                      <span className="font-bold text-xs text-indigo-950">Day {day.day} · {day.cityName}</span>
                      <span className="text-[11px] text-gray-400">{day.cityEmoji}</span>
                    </div>

                    <div className="space-y-2">
                      {day.activities.map((act, i) => (
                        <button
                          key={i}
                          onClick={() => handleSpotSelect({ ...act, city: day.cityId })}
                          className={`w-full text-left p-2 rounded-xl transition-all flex items-start gap-2 ${
                            selectedSpot?.id === act.id
                              ? 'bg-pink-50 border border-pink-300'
                              : 'hover:bg-gray-50 border border-transparent'
                          }`}
                        >
                          <span className="text-base mt-0.5">{act.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-xs text-gray-900 truncate">{act.name}</p>
                            <p className="text-[10px] text-gray-400 truncate">{act.station || act.category}</p>
                          </div>
                          <span className="text-[10px] text-pink-600 font-bold mt-0.5">
                            Directions →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── COSTS TAB ── */}
        {activeTab === 'costs' && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-indigo-950 mb-2">Cost Breakdown & Estimates</h2>
            <p className="text-gray-500 text-sm mb-6">
              Full transparency with itemized costs in Philippine Peso (₱) and Japanese Yen (¥).
            </p>
            <CostBreakdown costs={costs} totalDays={totalDays} />
          </div>
        )}

      </div>
    </motion.div>
  )
}
