import cities from '../data/cities.json'
import activities from '../data/activities.json'
import transport from '../data/transport.json'

// ─────────────────────────────────────────────
// City routing by duration
// ─────────────────────────────────────────────
const CITY_ROUTES = {
  '3days':   ['tokyo'],
  '1week':   ['tokyo', 'kyoto', 'osaka'],
  '2weeks':  ['tokyo', 'hakone', 'kyoto', 'nara', 'osaka', 'hiroshima'],
  '1month':  ['tokyo', 'nikko', 'hakone', 'nagoya', 'kanazawa', 'kyoto', 'nara', 'osaka', 'hiroshima', 'fukuoka', 'sapporo', 'okinawa'],
}

const DAYS_PER_CITY = {
  '3days':  { tokyo: 3 },
  '1week':  { tokyo: 3, kyoto: 2, osaka: 2 },
  '2weeks': { tokyo: 3, hakone: 1, kyoto: 3, nara: 1, osaka: 2, hiroshima: 2 },
  '1month': { tokyo: 4, nikko: 1, hakone: 2, nagoya: 1, kanazawa: 2, kyoto: 4, nara: 1, osaka: 3, hiroshima: 2, fukuoka: 3, sapporo: 3, okinawa: 4 },
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
  return transport.find(t => t.from === from && t.to === to) ||
         transport.find(t => t.from === to && t.to === from) || null
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
  const cityActivities = activities.filter(a => a.city === cityId && !usedIds.has(a.id))
  
  // Sort by relevance to interests
  const scored = cityActivities.map(a => ({
    ...a,
    score: scoreActivity(a, interests) + (Math.random() * 0.5), // small jitter for variety
  })).sort((a, b) => b.score - a.score)

  // Pick 3 activities (morning, afternoon, evening) avoiding duplicates
  const morning = scored.find(a => a.timeOfDay.includes('morning'))
  const afternoon = scored.filter(a => a.timeOfDay.includes('afternoon') && a !== morning)[0]
  const evening = scored.filter(a => a.timeOfDay.includes('evening') && a !== morning && a !== afternoon)[0]

  const picked = [morning, afternoon, evening].filter(Boolean)
  picked.forEach(a => usedIds.add(a.id))
  return picked
}

// ─────────────────────────────────────────────
// Helper: accommodation name by style
// ─────────────────────────────────────────────
function getAccommodation(cityId, travelStyle) {
  const city = cities.find(c => c.id === cityId)
  const types = {
    budget:   [`Khaosan ${city?.name} Hostel`, `Tokyo Backpackers Inn`, `Budget Guesthouse ${city?.name}`],
    midrange: [`APA Hotel ${city?.name}`, `Dormy Inn ${city?.name}`, `Richmond Hotel ${city?.name}`],
    luxury:   [`Park Hyatt ${city?.name}`, `The Ritz-Carlton ${city?.name}`, `Four Seasons ${city?.name}`],
  }
  const options = types[travelStyle] || types.midrange
  return options[Math.floor(Math.random() * options.length)]
}

// ─────────────────────────────────────────────
// Main itinerary generator
// ─────────────────────────────────────────────
export function generateItinerary({ duration, interests, travelStyle, groupType }) {
  const style = travelStyle || 'midrange'
  const cityRoute = CITY_ROUTES[duration] || CITY_ROUTES['1week']
  const daysMap = DAYS_PER_CITY[duration] || DAYS_PER_CITY['1week']
  const totalDays = Object.values(daysMap).reduce((s, d) => s + d, 0)

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
      if (arrivalTransport) transportTotal += arrivalTransport.costJPY
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
  const grandTotalUSD = Math.round(grandTotalJPY / 155) // ~155 JPY per USD (2025 rate)

  const cityObjects = cityRoute.map(id => cities.find(c => c.id === id)).filter(Boolean)

  return {
    duration,
    interests,
    travelStyle: style,
    groupType,
    totalDays,
    cities: cityObjects,
    days,
    costs: {
      accommodation: accommodationTotal,
      food: foodTotal,
      activities: activitiesTotal,
      transport: effectiveTransportCost,
      grandTotalJPY,
      grandTotalUSD,
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
