import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { TripProvider } from './context/TripContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import PlanPage from './pages/PlanPage'
import ItineraryPage from './pages/ItineraryPage'
import PetalRain from './components/PetalRain'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/japan-trip-planner">
      <TripProvider>
        <PetalRain />
        <Navbar />
        <AnimatedRoutes />
      </TripProvider>
    </BrowserRouter>
  )
}

