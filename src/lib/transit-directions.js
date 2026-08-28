// Transit & Directions calculator for interactive Japan map

const MAJOR_HUBS = {
  tokyo: [
    { id: 'hotel', label: '🏨 My Hotel / Stay', name: 'Hotel in Tokyo' },
    { id: 'tokyo-stn', label: '🗼 Tokyo Station', name: 'Tokyo Station', lat: 35.6812, lng: 139.7671 },
    { id: 'shinjuku-stn', label: '⚡ Shinjuku Station', name: 'Shinjuku Station', lat: 35.6896, lng: 139.7006 },
    { id: 'shibuya-stn', label: '🚦 Shibuya Station', name: 'Shibuya Station', lat: 35.6580, lng: 139.7016 },
    { id: 'haneda', label: '🛬 Haneda Airport (HND)', name: 'Haneda Airport', lat: 35.5494, lng: 139.7798 },
    { id: 'narita', label: '🛫 Narita Airport (NRT)', name: 'Narita Airport', lat: 35.7720, lng: 140.3929 },
  ],
  osaka: [
    { id: 'hotel', label: '🏨 My Hotel / Stay', name: 'Hotel in Osaka' },
    { id: 'osaka-stn', label: '🏢 Osaka / Umeda Station', name: 'Osaka Station', lat: 34.7025, lng: 135.4959 },
    { id: 'namba-stn', label: '🏮 Namba Station', name: 'Namba Station', lat: 34.6660, lng: 135.5000 },
    { id: 'kix', label: '🛬 Kansai Airport (KIX)', name: 'Kansai International Airport', lat: 34.4320, lng: 135.2304 },
  ],
  kyoto: [
    { id: 'hotel', label: '🏨 My Hotel / Stay', name: 'Hotel in Kyoto' },
    { id: 'kyoto-stn', label: '⛩️ Kyoto Station', name: 'Kyoto Station', lat: 34.9858, lng: 135.7588 },
    { id: 'gion', label: '🎎 Gion-Shijo', name: 'Gion-Shijo Station', lat: 35.0037, lng: 135.7728 },
  ],
  sapporo: [
    { id: 'hotel', label: '🏨 My Hotel / Stay', name: 'Hotel in Sapporo' },
    { id: 'sapporo-stn', label: '❄️ Sapporo Station', name: 'Sapporo Station', lat: 43.0687, lng: 141.3508 },
    { id: 'cts', label: '🛬 New Chitose Airport (CTS)', name: 'New Chitose Airport', lat: 42.7752, lng: 141.6923 },
  ],
  fukuoka: [
    { id: 'hotel', label: '🏨 My Hotel / Stay', name: 'Hotel in Fukuoka' },
    { id: 'hakata-stn', label: '🍜 Hakata Station', name: 'Hakata Station', lat: 33.5904, lng: 130.4206 },
    { id: 'fuk', label: '🛬 Fukuoka Airport (FUK)', name: 'Fukuoka Airport', lat: 33.5859, lng: 130.4507 },
  ],
  hiroshima: [
    { id: 'hotel', label: '🏨 My Hotel / Stay', name: 'Hotel in Hiroshima' },
    { id: 'hiroshima-stn', label: '🕊️ Hiroshima Station', name: 'Hiroshima Station', lat: 34.3977, lng: 132.4753 },
  ],
  okinawa: [
    { id: 'hotel', label: '🏨 My Hotel / Stay', name: 'Hotel in Okinawa' },
    { id: 'oka', label: '🛬 Naha Airport (OKA)', name: 'Naha Airport', lat: 26.1958, lng: 127.6459 },
    { id: 'naha-port', label: '🚢 Tomari Port (Naha)', name: 'Tomari Port', lat: 26.2250, lng: 127.6830 },
  ],
}

// Approximate distance in km
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 5
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c * 10) / 10
}

export function getHubsForCity(cityId) {
  return MAJOR_HUBS[cityId] || [
    { id: 'hotel', label: '🏨 My Hotel / Accommodation', name: 'My Accommodation' },
    { id: 'station', label: '🚉 Main Station', name: `${cityId} Main Station` },
  ]
}

export function getDirections({ origin, spot, cityId }) {
  if (!spot) return null

  const originLat = origin?.lat || (spot.lat ? spot.lat + 0.04 : 35.6812)
  const originLng = origin?.lng || (spot.lng ? spot.lng - 0.03 : 139.7671)
  const distKm = calculateDistance(originLat, originLng, spot.lat, spot.lng)

  const originName = origin?.name || origin?.label || 'Your Location'
  const isIntercity = distKm > 60

  // 1. Train / Subway option
  let trainOption = null
  if (isIntercity) {
    trainOption = {
      type: 'shinkansen',
      icon: '🚅',
      title: 'Shinkansen Bullet Train / Express',
      line: distKm > 300 ? 'Tokaido-Sanyo Shinkansen (Nozomi / Hikari)' : 'JR Limited Express',
      duration: `${Math.round(distKm / 3.5)} min`,
      costJPY: Math.round(distKm * 28 + 2000),
      costPHP: Math.round((distKm * 28 + 2000) * 0.37),
      instructions: `Board at ${originName} → Transfer at nearest central station → Arrive at ${spot.station || 'nearest station'}`,
      isJRPassCovered: true,
    }
  } else {
    const subwayLines = {
      tokyo: 'JR Yamanote Line / Tokyo Metro',
      osaka: 'Osaka Metro Midosuji Line / JR Osaka Loop',
      kyoto: 'Kyoto Subway Karasuma Line / City Bus 206',
      sapporo: 'Sapporo Subway Namboku / Tozai Line',
      fukuoka: 'Fukuoka City Subway Kuko Line',
      hiroshima: 'Hiroden City Tram Line',
      okinawa: 'Yui Rail Monorail / Yanbaru Express Bus',
    }
    const trainMin = Math.max(8, Math.round(distKm * 2.8 + 6))
    const trainFare = Math.min(650, Math.max(180, Math.round(distKm * 35 + 160)))
    trainOption = {
      type: 'train',
      icon: '🚆',
      title: 'Train & Subway',
      line: subwayLines[cityId] || 'Local JR Train / Subway',
      duration: `${trainMin} min`,
      costJPY: trainFare,
      costPHP: Math.round(trainFare * 0.37),
      instructions: `Direct or 1 transfer from ${originName} to ${spot.station || 'nearest station'}`,
      isJRPassCovered: true,
    }
  }

  // 2. Taxi / Cab option
  const taxiMin = Math.max(5, Math.round(distKm * 2.2 + 4))
  const taxiFare = isIntercity
    ? Math.round(distKm * 350 + 600)
    : Math.min(8000, Math.max(600, Math.round(distKm * 400 + 500)))
  const taxiOption = {
    type: 'taxi',
    icon: '🚕',
    title: 'Taxi / Rideshare (JapanTaxi / GO)',
    duration: `${taxiMin} min`,
    costJPY: taxiFare,
    costPHP: Math.round(taxiFare * 0.37),
    instructions: isIntercity
      ? 'Highway taxi available (costly for long distances; train recommended)'
      : `Hail on street or book via GO / Uber app from ${originName}`,
  }

  // 3. Flight Option (for far distances > 400km like Tokyo to Sapporo or Okinawa)
  let flightOption = null
  if (distKm > 400) {
    flightOption = {
      type: 'flight',
      icon: '✈️',
      title: 'Domestic Flight (ANA / JAL / Peach)',
      duration: '1h 35m flight (+ 1h airport check-in)',
      costJPY: 12500,
      costPHP: Math.round(12500 * 0.37),
      instructions: 'Fly between major regional airports with express airport rail connections',
    }
  }

  // 4. Walking option (if under 3km)
  let walkingOption = null
  if (distKm <= 3.5) {
    const walkMin = Math.round(distKm * 13)
    walkingOption = {
      type: 'walking',
      icon: '🚶',
      title: 'Walk',
      duration: `${walkMin} min`,
      costJPY: 0,
      costPHP: 0,
      instructions: `Pleasant stroll through local streets (${distKm} km)`,
    }
  }

  // Google Maps navigation link
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    originName
  )}&destination=${spot.lat},${spot.lng}&travelmode=transit`

  return {
    originName,
    destinationName: spot.name,
    distanceKm: distKm,
    nearestStation: spot.station,
    options: [trainOption, taxiOption, flightOption, walkingOption].filter(Boolean),
    googleMapsUrl,
  }
}
