import { createContext, useContext, useState } from 'react'

const TripContext = createContext(null)

export function TripProvider({ children }) {
  const [tripData, setTripData] = useState({
    duration: null,      // '1day' | '2days' | '3days' | '1week' | '2weeks' | '1month'
    destination: 'all',  // 'all' | 'tokyo' | 'osaka' | 'kyoto' | 'kansai' | 'sapporo' | 'okinawa' | 'hiroshima' | 'fukuoka' | 'kanazawa'
    interests: [],       // array of interest keys
    travelStyle: null,   // 'budget' | 'midrange' | 'luxury'
    groupType: null,     // 'solo' | 'couple' | 'family' | 'group'
  })

  const [itinerary, setItinerary] = useState(null)

  const updateTrip = (updates) => {
    setTripData(prev => ({ ...prev, ...updates }))
  }

  const clearItinerary = () => setItinerary(null)

  return (
    <TripContext.Provider value={{ tripData, updateTrip, itinerary, setItinerary, clearItinerary }}>
      {children}
    </TripContext.Provider>
  )
}

export function useTrip() {
  const ctx = useContext(TripContext)
  if (!ctx) throw new Error('useTrip must be used within TripProvider')
  return ctx
}

