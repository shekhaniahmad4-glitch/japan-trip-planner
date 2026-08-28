import cities from '../data/cities.json'
import activities from '../data/activities.json'
import transport from '../data/transport.json'

// ─────────────────────────────────────────────
// Total days by duration key
// ─────────────────────────────────────────────
const DURATION_DAYS = {
  '1day':   1,
  '2days':  2,
  '3days':  3,
  '1week':  7,
  '2weeks': 14,
  '1month': 30,
}

// ─────────────────────────────────────────────
// Predefined curated single/all routes
// ─────────────────────────────────────────────
const ROUTE_CONFIGS = {
  all: {
    '1day':   { route: ['tokyo'], days: { tokyo: 1 } },
    '2days':  { route: ['tokyo'], days: { tokyo: 2 } },
    '3days':  { route: ['tokyo'], days: { tokyo: 3 } },
    '1week':  { route: ['tokyo', 'kyoto', 'osaka'], days: { tokyo: 3, kyoto: 2, osaka: 2 } },
    '2weeks': { route: ['tokyo', 'hakone', 'kyoto', 'nara', 'osaka', 'hiroshima'], days: { tokyo: 3, hakone: 1, kyoto: 3, nara: 1, osaka: 3, hiroshima: 3 } },
    '1month': { route: ['tokyo', 'nikko', 'hakone', 'nagoya', 'kanazawa', 'kyoto', 'nara', 'osaka', 'hiroshima', 'fukuoka', 'sapporo', 'okinawa'], days: { tokyo: 4, nikko: 1, hakone: 2, nagoya: 1, kanazawa: 2, kyoto: 4, nara: 1, osaka: 3, hiroshima: 2, fukuoka: 3, sapporo: 3, okinawa: 4 } },
  },
  osaka: {
    '1day':   { route: ['osaka'], days: { osaka: 1 } },
    '2days':  { route: ['osaka'], days: { osaka: 2 } },
    '3days':  { route: ['osaka'], days: { osaka: 3 } },
    '1week':  { route: ['osaka', 'kyoto', 'nara'], days: { osaka: 3, kyoto: 3, nara: 1 } },
    '2weeks': { route: ['osaka', 'kyoto', 'nara', 'hiroshima'], days: { osaka: 5, kyoto: 4, nara: 2, hiroshima: 3 } },
    '1month': { route: ['osaka', 'kyoto', 'nara', 'hiroshima', 'fukuoka'], days: { osaka: 9, kyoto: 8, nara: 3, hiroshima: 5, fukuoka: 5 } },
  },
  kyoto: {
    '1day':   { route: ['kyoto'], days: { kyoto: 1 } },
    '2days':  { route: ['kyoto'], days: { kyoto: 2 } },
    '3days':  { route: ['kyoto'], days: { kyoto: 3 } },
    '1week':  { route: ['kyoto', 'nara', 'osaka'], days: { kyoto: 4, nara: 1, osaka: 2 } },
    '2weeks': { route: ['kyoto', 'nara', 'osaka', 'kanazawa'], days: { kyoto: 6, nara: 2, osaka: 3, kanazawa: 3 } },
    '1month': { route: ['kyoto', 'nara', 'osaka', 'kanazawa', 'hiroshima', 'tokyo'], days: { kyoto: 10, nara: 3, osaka: 6, kanazawa: 4, hiroshima: 3, tokyo: 4 } },
  },
  kansai: {
    '1day':   { route: ['osaka'], days: { osaka: 1 } },
    '2days':  { route: ['osaka', 'kyoto'], days: { osaka: 1, kyoto: 1 } },
    '3days':  { route: ['osaka', 'kyoto', 'nara'], days: { osaka: 1, kyoto: 1, nara: 1 } },
    '1week':  { route: ['osaka', 'kyoto', 'nara'], days: { osaka: 3, kyoto: 3, nara: 1 } },
    '2weeks': { route: ['osaka', 'kyoto', 'nara', 'hiroshima'], days: { osaka: 5, kyoto: 4, nara: 2, hiroshima: 3 } },
    '1month': { route: ['osaka', 'kyoto', 'nara', 'hiroshima', 'fukuoka'], days: { osaka: 9, kyoto: 8, nara: 3, hiroshima: 5, fukuoka: 5 } },
  },
  tokyo: {
    '1day':   { route: ['tokyo'], days: { tokyo: 1 } },
    '2days':  { route: ['tokyo'], days: { tokyo: 2 } },
    '3days':  { route: ['tokyo'], days: { tokyo: 3 } },
    '1week':  { route: ['tokyo', 'hakone', 'nikko'], days: { tokyo: 4, hakone: 2, nikko: 1 } },
    '2weeks': { route: ['tokyo', 'hakone', 'nikko', 'nagoya'], days: { tokyo: 7, hakone: 3, nikko: 2, nagoya: 2 } },
    '1month': { route: ['tokyo', 'hakone', 'nikko', 'nagoya', 'kanazawa'], days: { tokyo: 14, hakone: 5, nikko: 4, nagoya: 3, kanazawa: 4 } },
  },
  sapporo: {
    '1day':   { route: ['sapporo'], days: { sapporo: 1 } },
    '2days':  { route: ['sapporo'], days: { sapporo: 2 } },
    '3days':  { route: ['sapporo'], days: { sapporo: 3 } },
    '1week':  { route: ['sapporo', 'tokyo'], days: { sapporo: 4, tokyo: 3 } },
    '2weeks': { route: ['sapporo', 'tokyo', 'hakone'], days: { sapporo: 7, tokyo: 5, hakone: 2 } },
    '1month': { route: ['sapporo', 'tokyo', 'kanazawa', 'kyoto'], days: { sapporo: 10, tokyo: 8, kanazawa: 4, kyoto: 8 } },
  },
  okinawa: {
    '1day':   { route: ['okinawa'], days: { okinawa: 1 } },
    '2days':  { route: ['okinawa'], days: { okinawa: 2 } },
    '3days':  { route: ['okinawa'], days: { okinawa: 3 } },
    '1week':  { route: ['okinawa'], days: { okinawa: 7 } },
    '2weeks': { route: ['okinawa', 'fukuoka'], days: { okinawa: 9, fukuoka: 5 } },
    '1month': { route: ['okinawa', 'fukuoka', 'osaka', 'tokyo'], days: { okinawa: 12, fukuoka: 6, osaka: 6, tokyo: 6 } },
  },
  hiroshima: {
    '1day':   { route: ['hiroshima'], days: { hiroshima: 1 } },
    '2days':  { route: ['hiroshima'], days: { hiroshima: 2 } },
    '3days':  { route: ['hiroshima'], days: { hiroshima: 3 } },
    '1week':  { route: ['hiroshima', 'osaka', 'kyoto'], days: { hiroshima: 3, osaka: 2, kyoto: 2 } },
    '2weeks': { route: ['hiroshima', 'fukuoka', 'osaka', 'kyoto'], days: { hiroshima: 4, fukuoka: 3, osaka: 4, kyoto: 3 } },
    '1month': { route: ['hiroshima', 'fukuoka', 'osaka', 'kyoto', 'tokyo'], days: { hiroshima: 6, fukuoka: 6, osaka: 6, kyoto: 6, tokyo: 6 } },
  },
  fukuoka: {
    '1day':   { route: ['fukuoka'], days: { fukuoka: 1 } },
    '2days':  { route: ['fukuoka'], days: { fukuoka: 2 } },
    '3days':  { route: ['fukuoka'], days: { fukuoka: 3 } },
    '1week':  { route: ['fukuoka', 'hiroshima', 'osaka'], days: { fukuoka: 3, hiroshima: 2, osaka: 2 } },
    '2weeks': { route: ['fukuoka', 'hiroshima', 'osaka', 'kyoto'], days: { fukuoka: 5, hiroshima: 3, osaka: 3, kyoto: 3 } },
    '1month': { route: ['fukuoka', 'okinawa', 'hiroshima', 'osaka', 'tokyo'], days: { fukuoka: 8, okinawa: 6, hiroshima: 4, osaka: 6, tokyo: 6 } },
  },
  kanazawa: {
    '1day':   { route: ['kanazawa'], days: { kanazawa: 1 } },
    '2days':  { route: ['kanazawa'], days: { kanazawa: 2 } },
    '3days':  { route: ['kanazawa'], days: { kanazawa: 3 } },
    '1week':  { route: ['kanazawa', 'kyoto', 'tokyo'], days: { kanazawa: 3, kyoto: 2, tokyo: 2 } },
    '2weeks': { route: ['kanazawa', 'kyoto', 'osaka', 'tokyo'], days: { kanazawa: 4, kyoto: 4, osaka: 3, tokyo: 3 } },
    '1month': { route: ['kanazawa', 'kyoto', 'osaka', 'nagoya', 'tokyo'], days: { kanazawa: 6, kyoto: 8, osaka: 6, nagoya: 4, tokyo: 6 } },
  },
}

// ─────────────────────────────────────────────
// Cost data (JPY estimates per person per day)
// ─────────────────────────────────────────────
const ACCOMMODATION_COST = {
  budget:   { min: 3500,  max: 6000  },
  midrange: { min: 12000, max: 25000 },
  luxury:   { min: 40000, max: 120000 },
}

const FOOD_COST_PER_DAY = {
  budget:   3000,
  midrange: 8000,
  luxury:   20000,
}

const JR_PASS_COST = {
  '7day':  { usd: 323, jpy: 50000 },
  '14day': { usd: 515, jpy: 80000 },
  '21day': { usd: 649, jpy: 100000 },
}

// ─────────────────────────────────────────────
// Helper: find transport between two cities
// ─────────────────────────────────────────────
function findTransport(from, to) {
  if (from === to) return null
  return transport.find(t => t.from === from && t.to === to) ||
         transport.find(t => t.from === to && t.to === from) || {
           id: `custom-${from}-${to}`,
           from,
           to,
           type: 'train',
           line: 'JR Limited Express / Shinkansen',
           durationMin: 75,
           costBudget: 4200,
           costJPY: 4200,
           notes: 'Scenic connecting train route',
         }
}

// ─────────────────────────────────────────────
// Helper: score activities for given interests
// ─────────────────────────────────────────────
function scoreActivity(activity, interests) {
  if (!interests || interests.length === 0) return 1
  const matches = activity.interests.filter(i => interests.includes(i))
  return matches.length
}

// ─────────────────────────────────────────────
// Helper: pick best activities for a city/day
// ─────────────────────────────────────────────
function pickActivities(cityId, interests, travelStyle, dayIndex, usedIds) {
  let cityActivities = activities.filter(a => a.city === cityId && !usedIds.has(a.id))
  
  if (cityActivities.length < 3) {
    cityActivities = activities.filter(a => a.city === cityId)
  }
  if (cityActivities.length === 0) {
    cityActivities = activities
  }

  // Sort by relevance to interests
  const scored = cityActivities.map(a => ({
    ...a,
    score: scoreActivity(a, interests) + (Math.random() * 0.5),
  })).sort((a, b) => b.score - a.score)

  const morning = scored.find(a => a.timeOfDay.includes('morning')) || scored[0]
  const afternoon = scored.filter(a => a.timeOfDay.includes('afternoon') && a.id !== morning?.id)[0] || scored.filter(a => a.id !== morning?.id)[0] || scored[0]
  const evening = scored.filter(a => a.timeOfDay.includes('evening') && a.id !== morning?.id && a.id !== afternoon?.id)[0] || scored.filter(a => a.id !== morning?.id && a.id !== afternoon?.id)[0] || scored[0]

  const picked = [morning, afternoon, evening].filter(Boolean)
  picked.forEach(a => usedIds.add(a.id))
  return picked
}

// ─────────────────────────────────────────────
// Helper: accommodation name by style
// ─────────────────────────────────────────────
function getAccommodation(cityId, travelStyle) {
  const city = cities.find(c => c.id === cityId)
  const cityName = city?.name || 'Japan'
  const types = {
    budget:   [`Khaosan ${cityName} Guesthouse`, `${cityName} Backpackers Hostel`, `Capsule Hotel ${cityName}`],
    midrange: [`APA Hotel ${cityName}`, `Dormy Inn Premium ${cityName}`, `Daiwa Roynet Hotel ${cityName}`],
    luxury:   [`Park Hyatt ${cityName}`, `The Ritz-Carlton ${cityName}`, `Traditional Ryokan ${cityName}`],
  }
  const options = types[travelStyle] || types.midrange
  return options[Math.floor(Math.random() * options.length)]
}

// ─────────────────────────────────────────────
// Map destination selection to city IDs
// ─────────────────────────────────────────────
function resolveCityIds(destList) {
  const mapping = {
    all: null,
    tokyo: 'tokyo',
    osaka: 'osaka',
    kyoto: 'kyoto',
    kansai: 'osaka',
    sapporo: 'sapporo',
    okinawa: 'okinawa',
    hiroshima: 'hiroshima',
    fukuoka: 'fukuoka',
    kanazawa: 'kanazawa',
  }
  const resolved = []
  for (const d of destList) {
    if (d === 'all') return null
    const mapped = mapping[d] || d
    if (mapped && !resolved.includes(mapped)) {
      resolved.push(mapped)
    }
  }
  return resolved.length ? resolved : null
}

// ─────────────────────────────────────────────
// Main itinerary generator
// ─────────────────────────────────────────────
export function generateItinerary({ duration, destination, destinations, interests, travelStyle, groupType }) {
  const style = travelStyle || 'midrange'
  const dur = duration || '1week'
  const totalDays = DURATION_DAYS[dur] || 7

  // Normalize destinations list (up to 3)
  let destList = []
  if (Array.isArray(destinations) && destinations.length > 0) {
    destList = destinations.slice(0, 3)
  } else if (typeof destination === 'string') {
    destList = [destination]
  } else {
    destList = ['all']
  }

  let cityRoute = []
  let daysMap = {}

  const specificCities = resolveCityIds(destList)

  if (!specificCities || destList.includes('all')) {
    // Curated route for "Entire Japan"
    const config = ROUTE_CONFIGS['all'][dur] || ROUTE_CONFIGS['all']['1week']
    cityRoute = config.route
    daysMap = { ...config.days }
  } else if (specificCities.length === 1) {
    // Single selected destination
    const destKey = destList[0]
    const destConfig = ROUTE_CONFIGS[destKey] || ROUTE_CONFIGS['all']
    const config = destConfig[dur] || ROUTE_CONFIGS['all'][dur] || { route: [specificCities[0]], days: { [specificCities[0]]: totalDays } }
    cityRoute = config.route
    daysMap = { ...config.days }
  } else {
    // Multi-destination selection (2 or 3 places)
    cityRoute = specificCities
    const n = cityRoute.length

    if (totalDays === 1) {
      daysMap = { [cityRoute[0]]: 1 }
      cityRoute = [cityRoute[0]]
    } else if (totalDays === 2) {
      if (n === 2) {
        daysMap = { [cityRoute[0]]: 1, [cityRoute[1]]: 1 }
      } else {
        daysMap = { [cityRoute[0]]: 1, [cityRoute[1]]: 1 }
        cityRoute = [cityRoute[0], cityRoute[1]]
      }
    } else if (totalDays === 3) {
      if (n === 2) {
        daysMap = { [cityRoute[0]]: 2, [cityRoute[1]]: 1 }
      } else {
        daysMap = { [cityRoute[0]]: 1, [cityRoute[1]]: 1, [cityRoute[2]]: 1 }
      }
    } else if (totalDays === 7) {
      if (n === 2) {
        daysMap = { [cityRoute[0]]: 4, [cityRoute[1]]: 3 }
      } else {
        daysMap = { [cityRoute[0]]: 3, [cityRoute[1]]: 2, [cityRoute[2]]: 2 }
      }
    } else if (totalDays === 14) {
      if (n === 2) {
        daysMap = { [cityRoute[0]]: 7, [cityRoute[1]]: 7 }
      } else {
        daysMap = { [cityRoute[0]]: 5, [cityRoute[1]]: 5, [cityRoute[2]]: 4 }
      }
    } else if (totalDays === 30) {
      if (n === 2) {
        daysMap = { [cityRoute[0]]: 15, [cityRoute[1]]: 15 }
      } else {
        daysMap = { [cityRoute[0]]: 10, [cityRoute[1]]: 10, [cityRoute[2]]: 10 }
      }
    } else {
      const base = Math.floor(totalDays / n)
      const rem = totalDays % n
      cityRoute.forEach((c, idx) => {
        daysMap[c] = base + (idx < rem ? 1 : 0)
      })
    }
  }

  const usedActivityIds = new Set()
  const days = []
  let dayNumber = 1
  let transportTotal = 0

  for (let ci = 0; ci < cityRoute.length; ci++) {
    const cityId = cityRoute[ci]
    const city = cities.find(c => c.id === cityId)
    const numDays = daysMap[cityId] || 1

    // Travel day from previous city
    let arrivalTransport = null
    if (ci > 0) {
      const fromCity = cityRoute[ci - 1]
      arrivalTransport = findTransport(fromCity, cityId)
      if (arrivalTransport) transportTotal += (arrivalTransport.costJPY || 0)
    }

    for (let d = 0; d < numDays; d++) {
      const isFirstDayInCity = d === 0
      const picked = pickActivities(cityId, interests, style, d, usedActivityIds)
      
      const accommodationName = getAccommodation(cityId, style)
      const accommodationCost = Math.round(
        (ACCOMMODATION_COST[style].min + ACCOMMODATION_COST[style].max) / 2
      )
      const foodCost = FOOD_COST_PER_DAY[style]
      const activitiesCost = picked.reduce((sum, a) => sum + (a.costJPY || 0), 0)

      days.push({
        day: dayNumber,
        cityId,
        cityName: city?.name || cityId,
        cityEmoji: city?.emoji || '🗺️',
        isFirstDayInCity,
        arrivalTransport: isFirstDayInCity ? arrivalTransport : null,
        activities: picked,
        accommodation: {
          name: accommodationName,
          costJPY: accommodationCost,
        },
        costs: {
          accommodation: accommodationCost,
          food: foodCost,
          activities: activitiesCost,
          total: accommodationCost + foodCost + activitiesCost,
        },
      })

      dayNumber++
    }
  }

  // ── Cost Summary ──────────────────────────────
  const accommodationTotal = days.reduce((s, d) => s + d.costs.accommodation, 0)
  const foodTotal = days.reduce((s, d) => s + d.costs.food, 0)
  const activitiesTotal = days.reduce((s, d) => s + d.costs.activities, 0)

  // JR Pass recommendation
  let jrPassRecommended = null
  let jrPassCostJPY = 0
  if (totalDays >= 7 && cityRoute.length > 1) {
    const passType = totalDays <= 7 ? '7day' : totalDays <= 14 ? '14day' : '21day'
    jrPassRecommended = passType
    jrPassCostJPY = JR_PASS_COST[passType]?.jpy || 0
  }

  const effectiveTransportCost = jrPassRecommended
    ? Math.min(transportTotal, jrPassCostJPY)
    : transportTotal

  const grandTotalJPY = accommodationTotal + foodTotal + activitiesTotal + effectiveTransportCost
  const grandTotalPHP = Math.round(grandTotalJPY * 0.37) // ~¥1 = ₱0.37 (2025 rate)

  const cityObjects = cityRoute.map(id => cities.find(c => c.id === id)).filter(Boolean)

  return {
    duration: dur,
    destinations: destList,
    interests,
    travelStyle: style,
    groupType,
    totalDays: days.length,
    cities: cityObjects,
    days,
    costs: {
      accommodation: accommodationTotal,
      food: foodTotal,
      activities: activitiesTotal,
      transport: effectiveTransportCost,
      grandTotalJPY,
      grandTotalPHP,
      jrPassRecommended,
      jrPassCostJPY,
    },
    routes: cityRoute.slice(1).map((toId, i) => ({
      from: cityRoute[i],
      to: toId,
      transport: findTransport(cityRoute[i], toId),
    })).filter(r => r.transport),
  }
}
