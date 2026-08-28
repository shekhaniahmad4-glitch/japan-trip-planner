import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Plane } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isHome
          ? 'bg-transparent'
          : 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🗾</span>
          <span className={`font-serif font-bold text-xl transition-colors ${
            isHome ? 'text-white' : 'text-indigo-950'
          }`}>
            Japan Trip Planner
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/plan"
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 hover:scale-105 ${
              isHome
                ? 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                : 'bg-pink-500 text-white hover:bg-pink-600 shadow-md'
            }`}
          >
            <Plane size={15} />
            Plan My Trip
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

