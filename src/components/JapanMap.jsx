import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import { Navigation, Train, Plane, Car, Footprints, ExternalLink, MapPin, Search, ArrowRight, X } from 'lucide-react'
import { getHubsForCity, getDirections } from '../lib/transit-directions'

// Custom colored city markers
function createCityIcon(emoji, color = '#FF3366', isSelected = false) {
  return L.divIcon({
    html: `<div style="
      background: ${isSelected ? '#FF3366' : color};
      border: ${isSelected ? '4px solid #FDE047' : '3px solid white'};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      width: ${isSelected ? '44px' : '36px'};
      height: ${isSelected ? '44px' : '36px'};
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 14px rgba(0,0,0,0.35);
      transition: all 0.3s ease;
    ">
      <span style="transform: rotate(45deg); font-size: ${isSelected ? '20px' : '16px'};">${emoji}</span>
    </div>`,
    className: '',
    iconSize: [isSelected ? 44 : 36, isSelected ? 44 : 36],
    iconAnchor: [isSelected ? 22 : 18, isSelected ? 44 : 36],
    popupAnchor: [0, -36],
  })
}

// Special pulsing pin for selected activity / spot
function createSpotIcon(emoji = '📍') {
  return L.divIcon({
    html: `<div style="position: relative; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px;">
      <div style="position: absolute; width: 42px; height: 42px; background: rgba(236, 72, 153, 0.4); border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
      <div style="position: relative; background: #EC4899; border: 3px solid white; border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(236, 72, 153, 0.5); z-index: 10;">
        <span style="font-size: 16px;">${emoji}</span>
      </div>
    </div>`,
    className: '',
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22],
  })
}

function MapController({ positions, selectedSpot }) {
  const map = useMap()

  useEffect(() => {
    if (selectedSpot && selectedSpot.lat && selectedSpot.lng) {
      map.flyTo([selectedSpot.lat, selectedSpot.lng], 13, { duration: 1.2 })
    } else if (positions.length > 0) {
      const bounds = L.latLngBounds(positions)
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [positions, selectedSpot, map])

  return null
}

const ROUTE_COLORS = ['#FF3366', '#FF6B8A', '#A855F7', '#3B82F6', '#10B981', '#F59E0B', '#EF4444']

export default function JapanMap({ cities, routes, selectedSpot, onClearSpot }) {
  if (!cities || cities.length === 0) return null

  const positions = cities.map(c => [c.lat, c.lng])
  const center = [36.2, 138.3]

  // City hubs for starting point selector
  const currentCityId = selectedSpot?.city || cities[0]?.id || 'tokyo'
  const availableHubs = getHubsForCity(currentCityId)

  const [selectedHub, setSelectedHub] = useState(availableHubs[0])
  const [customOrigin, setCustomOrigin] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  // Update selected origin when spot changes
  useEffect(() => {
    const hubs = getHubsForCity(selectedSpot?.city || 'tokyo')
    setSelectedHub(hubs[0])
    setCustomOrigin('')
    setShowCustomInput(false)
  }, [selectedSpot])

  const originObject = showCustomInput && customOrigin.trim()
    ? { name: customOrigin.trim() }
    : selectedHub

  const directionsData = selectedSpot
    ? getDirections({ origin: originObject, spot: selectedSpot, cityId: selectedSpot.city })
    : null

  // Build route polylines between consecutive cities
  const polylines = (routes || []).map((route, i) => {
    const fromCity = cities.find(c => c.id === route.from)
    const toCity = cities.find(c => c.id === route.to)
    if (!fromCity || !toCity) return null
    return {
      points: [[fromCity.lat, fromCity.lng], [toCity.lat, toCity.lng]],
      color: ROUTE_COLORS[i % ROUTE_COLORS.length],
      transport: route.transport,
    }
  }).filter(Boolean)

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: '100%', width: '100%', minHeight: '420px' }}
        className="z-10"
      >
        {/* Clean English Tile Layer (Esri World Street Map) */}
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; StreetMap Japan'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          maxZoom={18}
        />

        <MapController positions={positions} selectedSpot={selectedSpot} />

        {/* Route lines */}
        {polylines.map((pl, i) => (
          <Polyline
            key={i}
            positions={pl.points}
            pathOptions={{
              color: pl.color,
              weight: 3.5,
              opacity: 0.75,
              dashArray: pl.transport?.type === 'flight' ? '8, 8' : null,
            }}
          />
        ))}

        {/* City markers */}
        {cities.map((city, i) => (
          <Marker
            key={city.id}
            position={[city.lat, city.lng]}
            icon={createCityIcon(city.emoji, ROUTE_COLORS[i % ROUTE_COLORS.length], selectedSpot?.city === city.id)}
          >
            <Popup>
              <div className="p-1 min-w-[160px]">
                <div className="font-bold text-base text-indigo-900 mb-1">
                  {city.emoji} {city.name}
                </div>
                <div className="text-xs text-gray-500 mb-1.5">{city.region} Region</div>
                <div className="text-xs text-gray-700 leading-relaxed">
                  {city.description?.substring(0, 100)}…
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Active Spot Marker if selected */}
        {selectedSpot && selectedSpot.lat && selectedSpot.lng && (
          <Marker
            position={[selectedSpot.lat, selectedSpot.lng]}
            icon={createSpotIcon(selectedSpot.emoji || '📍')}
          >
            <Popup autoPan={true}>
              <div className="p-1 min-w-[180px]">
                <div className="font-bold text-sm text-pink-600 mb-1">
                  {selectedSpot.emoji} {selectedSpot.name}
                </div>
                <p className="text-xs text-gray-600">{selectedSpot.station || selectedSpot.description}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* ── Interactive Directions Overlay Panel ── */}
      {selectedSpot && directionsData && (
        <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-md bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-pink-100 z-20 max-h-[92%] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedSpot.emoji || '📍'}</span>
              <div>
                <h4 className="font-bold text-indigo-950 text-sm leading-tight">
                  {selectedSpot.name}
                </h4>
                <p className="text-[11px] text-pink-600 font-medium">
                  {selectedSpot.station || 'Nearest landmark in ' + selectedSpot.city}
                </p>
              </div>
            </div>
            {onClearSpot && (
              <button
                onClick={onClearSpot}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                title="Close directions"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Departure / Starting Point Selector */}
          <div className="mb-3">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1 mb-1.5">
              <Navigation size={12} className="text-indigo-600" />
              Where are you coming from?
            </label>

            {/* Quick Station Hub Chips */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {availableHubs.map(hub => (
                <button
                  key={hub.id}
                  onClick={() => {
                    setSelectedHub(hub)
                    setShowCustomInput(false)
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                    !showCustomInput && selectedHub.id === hub.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {hub.label}
                </button>
              ))}
              <button
                onClick={() => setShowCustomInput(true)}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                  showCustomInput
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🔍 Custom Place
              </button>
            </div>

            {/* Custom Input Field */}
            {showCustomInput && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <input
                  type="text"
                  placeholder="e.g. Asakusa, Roppongi, My Airbnb..."
                  value={customOrigin}
                  onChange={(e) => setCustomOrigin(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                />
              </div>
            )}
          </div>

          {/* Travel Options Grid */}
          <div className="space-y-2 mb-3">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
              Travel Options (~{directionsData.distanceKm} km away)
            </p>

            {directionsData.options.map((opt, idx) => (
              <div
                key={idx}
                className="bg-gray-50/90 rounded-xl p-2.5 border border-gray-100 hover:border-pink-200 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{opt.icon}</span>
                    <span className="font-bold text-xs text-indigo-950">{opt.title}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-pink-600">{opt.duration}</span>
                    {opt.costJPY > 0 && (
                      <span className="text-[10px] text-gray-500 ml-1.5 font-medium">
                        (¥{opt.costJPY.toLocaleString()} · ₱{opt.costPHP.toLocaleString()})
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-gray-600 leading-snug">{opt.instructions}</p>
                {opt.line && (
                  <p className="text-[10px] text-indigo-600 font-semibold mt-0.5">{opt.line}</p>
                )}
              </div>
            ))}
          </div>

          {/* External Google Maps Button */}
          <a
            href={directionsData.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md transition-all duration-200 hover:scale-[1.01]"
          >
            <span>🗺️ Open Turn-by-Turn Navigation</span>
            <ExternalLink size={13} />
          </a>
        </div>
      )}
    </div>
  )
}
