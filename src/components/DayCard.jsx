import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Clock, Train, Plane, Bus, ChevronDown, ChevronUp, Bed, Coffee, Sun, Moon, MapPin, Navigation } from 'lucide-react'

const TRANSPORT_ICONS = {
  shinkansen: Train,
  train: Train,
  flight: Plane,
  bus: Bus,
}

const TRANSPORT_COLORS = {
  shinkansen: 'bg-blue-100 text-blue-700',
  train: 'bg-indigo-100 text-indigo-700',
  flight: 'bg-sky-100 text-sky-700',
  bus: 'bg-green-100 text-green-700',
}

const TIME_ICONS = { morning: Coffee, afternoon: Sun, evening: Moon }
const TIME_COLORS = {
  morning: 'text-amber-500',
  afternoon: 'text-orange-500',
  evening: 'text-indigo-500',
}

const COST_TIER_BADGE = {
  free:     'bg-green-100 text-green-700',
  budget:   'bg-blue-100 text-blue-700',
  midrange: 'bg-purple-100 text-purple-700',
  luxury:   'bg-amber-100 text-amber-700',
}

function formatMinutes(mins) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}h ${m > 0 ? m + 'm' : ''}`.trim() : `${m}m`
}

function TransitCard({ transport }) {
  if (!transport) return null
  const Icon = TRANSPORT_ICONS[transport.type] || Train
  const colorClass = TRANSPORT_COLORS[transport.type] || 'bg-gray-100 text-gray-700'

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${colorClass} mb-3`}>
      <Icon size={18} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{transport.line}</p>
        <p className="text-xs opacity-75">{transport.notes}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-xs font-bold">{formatMinutes(transport.durationMin)}</p>
        <p className="text-xs opacity-75">¥{transport.costJPY?.toLocaleString()} (₱{Math.round((transport.costJPY || 0) * 0.37).toLocaleString()})</p>
      </div>
    </div>
  )
}

function ActivityRow({ activity, slot, day, onSelectSpot, isSelected }) {
  const TimeIcon = TIME_ICONS[slot] || Sun
  const timeColor = TIME_COLORS[slot] || 'text-gray-400'
  if (!activity) return null

  const handleSpotClick = () => {
    if (onSelectSpot) {
      onSelectSpot({ ...activity, city: activity.city || day.cityId })
    }
  }

  return (
    <div
      onClick={handleSpotClick}
      className={`group flex gap-3 py-3 px-2.5 rounded-xl border transition-all cursor-pointer ${
        isSelected
          ? 'bg-pink-50/90 border-pink-400 shadow-sm ring-1 ring-pink-400'
          : 'border-transparent hover:bg-gray-100/80 hover:border-gray-200'
      }`}
    >
      <div className={`mt-0.5 ${timeColor} flex-shrink-0`}>
        <TimeIcon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium text-sm text-gray-800 leading-tight group-hover:text-pink-600 transition-colors">
            {activity.emoji} {activity.name}
          </p>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${COST_TIER_BADGE[activity.costTier]}`}>
            {activity.costTier === 'free' ? 'Free' : `¥${activity.costJPY?.toLocaleString()} (₱${Math.round((activity.costJPY || 0) * 0.37).toLocaleString()})`}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{activity.description}</p>
        
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100/60">
          <p className="text-[11px] text-gray-400 flex items-center gap-1">
            <Clock size={11} /> ~{activity.durationHrs}h
            {activity.station && (
              <span className="text-indigo-600 ml-2 truncate max-w-[200px]">
                🚇 {activity.station.split('(')[0]}
              </span>
            )}
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleSpotClick()
            }}
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg transition-all ${
              isSelected
                ? 'bg-pink-500 text-white shadow-sm'
                : 'bg-pink-50 text-pink-600 hover:bg-pink-100 group-hover:bg-pink-500 group-hover:text-white'
            }`}
          >
            <Navigation size={10} />
            <span>{isSelected ? 'Viewing on Map' : 'Map & Directions'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DayCard({ day, index, selectedSpot, onSelectSpot }) {
  const [expanded, setExpanded] = useState(index < 2)

  const [morning, afternoon, evening] = day.activities

  const dayBgColors = [
    'from-pink-500 to-rose-600',
    'from-purple-500 to-indigo-600',
    'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-indigo-500 to-purple-600',
  ]

  const gradient = dayBgColors[index % dayBgColors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="day-card"
    >
      {/* Card header */}
      <div
        className={`bg-gradient-to-r ${gradient} p-4 flex items-center justify-between cursor-pointer`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-xl px-3 py-1">
            <span className="text-white font-bold text-sm">Day {day.day}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{day.cityEmoji}</span>
              <span className="text-white font-semibold">{day.cityName}</span>
              {day.isFirstDayInCity && day.day > 1 && (
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">Arrival</span>
              )}
            </div>
            <p className="text-white/80 text-xs mt-0.5 font-medium">
              ¥{day.costs.total.toLocaleString()} · ₱{Math.round(day.costs.total * 0.37).toLocaleString()} estimated
            </p>
          </div>
        </div>
        <div className="text-white/80">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* Card body */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-3">
              {/* Arrival transport */}
              {day.arrivalTransport && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Getting Here</p>
                  <TransitCard transport={day.arrivalTransport} />
                </div>
              )}

              {/* Activities */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 flex items-center justify-between">
                  <span>Today's Plan</span>
                  <span className="text-[10px] text-pink-600 font-normal">Click any spot to view on map & directions</span>
                </p>
                <div className="bg-gray-50 rounded-xl px-2 py-1 space-y-1">
                  <ActivityRow
                    activity={morning}
                    slot="morning"
                    day={day}
                    onSelectSpot={onSelectSpot}
                    isSelected={selectedSpot?.id === morning?.id}
                  />
                  <ActivityRow
                    activity={afternoon}
                    slot="afternoon"
                    day={day}
                    onSelectSpot={onSelectSpot}
                    isSelected={selectedSpot?.id === afternoon?.id}
                  />
                  <ActivityRow
                    activity={evening}
                    slot="evening"
                    day={day}
                    onSelectSpot={onSelectSpot}
                    isSelected={selectedSpot?.id === evening?.id}
                  />
                </div>
              </div>

              {/* Accommodation */}
              <div className="flex items-center gap-3 bg-indigo-50 rounded-xl px-4 py-3">
                <Bed size={16} className="text-indigo-500" />
                <div>
                  <p className="text-xs text-indigo-400 font-medium">Staying at</p>
                  <p className="text-sm font-semibold text-indigo-800">{day.accommodation.name}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-indigo-400">Per night</p>
                  <p className="text-sm font-bold text-indigo-700">¥{day.accommodation.costJPY.toLocaleString()}</p>
                  <p className="text-[10px] text-indigo-400">₱{Math.round(day.accommodation.costJPY * 0.37).toLocaleString()}</p>
                </div>
              </div>

              {/* Day cost summary */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { label: 'Stay', value: day.costs.accommodation, color: 'text-pink-600' },
                  { label: 'Food', value: day.costs.food, color: 'text-emerald-600' },
                  { label: 'Activities', value: day.costs.activities, color: 'text-blue-600' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="text-center bg-gray-50 rounded-xl py-2">
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className={`text-sm font-bold ${color}`}>¥{value.toLocaleString()}</p>
                    <p className="text-[11px] text-gray-500">₱{Math.round(value * 0.37).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
