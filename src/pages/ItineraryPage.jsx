import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Share2, MapPin, Calendar, Users, Sparkles } from 'lucide-react'
import { useTrip } from '../context/TripContext'
import DayCard from '../components/DayCard'
import CostBreakdown from '../components/CostBreakdown'
import JapanMap from '../components/JapanMap'

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

  useEffect(() => {
    if (!itinerary) {
      navigate('/plan')
    }
    // Delay map render slightly so DOM is ready
    const t = setTimeout(() => setMapReady(true), 300)
    return () => clearTimeout(t)
  }, [itinerary, navigate])

  if (!itinerary) return null

  const { days, cities, costs, routes, totalDays } = itinerary

  const handlePrint = () => window.print()

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
          <Link
            to="/plan"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to planner
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={20} className="text-pink-400" />
                <span className="text-pink-300 text-sm font-medium">Your Personalized Itinerary</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {DURATION_LABELS[tripData.duration]} in Japan
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-sm">
                  <Calendar size={13} /> {totalDays} Days
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-sm">
                  <MapPin size={13} /> {cities.length} {cities.length === 1 ? 'City' : 'Cities'}
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
                  <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-sm font-medium">
                    {city.emoji} {city.name}
                  </span>
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
          <div className="flex gap-0">
            {[
              { id: 'itinerary', label: '📅 Day-by-Day' },
              { id: 'map', label: '🗺️ Map View' },
              { id: 'costs', label: '💴 Costs' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
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
                <h2 className="font-serif text-xl font-bold text-indigo-950">
                  {days.length} Days Planned
                </h2>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-900 transition-colors"
                >
                  <Download size={15} /> Print
                </button>
              </div>
              {days.map((day, i) => (
                <DayCard key={day.day} day={day} index={i} />
              ))}
            </div>

            {/* Sticky map sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <h3 className="font-serif text-lg font-bold text-indigo-950 mb-3">Your Route</h3>
                <div style={{ height: '450px' }}>
                  {mapReady && (
                    <JapanMap cities={cities} routes={routes} />
                  )}
                </div>

                {/* City list */}
                <div className="mt-4 space-y-2">
                  {cities.map((city, i) => (
                    <div key={city.id} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
                      <span className="text-xl">{city.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-indigo-900 text-sm">{city.name}</p>
                        <p className="text-xs text-gray-400 truncate">{city.region}</p>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                        Stop {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MAP TAB ── */}
        {activeTab === 'map' && (
          <div>
            <h2 className="font-serif text-xl font-bold text-indigo-950 mb-4">Your Japan Route</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2" style={{ height: '600px' }}>
                {mapReady && <JapanMap cities={cities} routes={routes} />}
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-indigo-900">City Stops</h3>
                {cities.map((city, i) => (
                  <motion.div
                    key={city.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{city.emoji}</span>
                      <div>
                        <p className="font-bold text-indigo-900">{city.name}</p>
                        <p className="text-xs text-gray-400">{city.region} Region</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{city.description}</p>
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-gray-400 mb-1">Highlights</p>
                      <div className="flex flex-wrap gap-1">
                        {city.highlights?.slice(0, 3).map(h => (
                          <span key={h} className="text-xs bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── COSTS TAB ── */}
        {activeTab === 'costs' && (
          <div>
            <h2 className="font-serif text-xl font-bold text-indigo-950 mb-6">Trip Cost Breakdown</h2>
            <CostBreakdown costs={costs} totalDays={totalDays} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-indigo-950 text-white/40 text-center py-8 px-6 text-sm">
        <p>🗾 Japan Trip Planner — <Link to="/" className="hover:text-white/70 underline">Start Over</Link></p>
      </footer>
    </motion.div>
  )
}

