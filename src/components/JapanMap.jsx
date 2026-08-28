import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet'

// Custom colored markers
function createIcon(emoji, color = '#FF3366') {
  return L.divIcon({
    html: `<div style="
      background: ${color};
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    ">
      <span style="transform: rotate(45deg); font-size: 16px;">${emoji}</span>
    </div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  })
}

function FitBounds({ positions }) {
  const map = useMap()
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions)
      map.fitBounds(bounds, { padding: [60, 60] })
    }
  }, [positions, map])
  return null
}

const ROUTE_COLORS = ['#FF3366', '#FF6B8A', '#A855F7', '#3B82F6', '#10B981', '#F59E0B', '#EF4444']

export default function JapanMap({ cities, routes }) {
  if (!cities || cities.length === 0) return null

  const positions = cities.map(c => [c.lat, c.lng])
  const center = [36.2, 138.3]

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
    <MapContainer
      center={center}
      zoom={5}
      style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
      className="z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds positions={positions} />

      {/* Route lines */}
      {polylines.map((pl, i) => (
        <Polyline
          key={i}
          positions={pl.points}
          pathOptions={{
            color: pl.color,
            weight: 3,
            opacity: 0.7,
            dashArray: pl.transport?.type === 'flight' ? '8, 8' : null,
          }}
        />
      ))}

      {/* City markers */}
      {cities.map((city, i) => (
        <Marker
          key={city.id}
          position={[city.lat, city.lng]}
          icon={createIcon(city.emoji, ROUTE_COLORS[i % ROUTE_COLORS.length])}
        >
          <Popup>
            <div className="p-1 min-w-[160px]">
              <div className="font-bold text-base text-indigo-900 mb-1">
                {city.emoji} {city.name}
              </div>
              <div className="text-xs text-gray-500 mb-2">{city.region} Region</div>
              <div className="text-xs text-gray-700 leading-relaxed">
                {city.description?.substring(0, 100)}…
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
