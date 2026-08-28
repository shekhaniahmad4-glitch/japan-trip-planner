import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Plane, Sparkles } from 'lucide-react'
import JapanLiveTime from './JapanLiveTime'
import CurrencyConverterWidget from './CurrencyConverterWidget'

export default function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isHome
          ? 'bg-indigo-950/60 backdrop-blur-md border-b border-white/10'
          : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <span className="text-2xl group-hover:rotate-12 transition-transform">🗾</span>
          <div>
            <span className={`font-serif font-bold text-lg leading-none block transition-colors ${
              isHome ? 'text-white' : 'text-indigo-950'
            }`}>
              Japan Trip Planner
            </span>
            <span className={`text-[10px] tracking-widest uppercase font-semibold block ${
              isHome ? 'text-pink-300' : 'text-pink-600'
            }`}>
              AI Express Edition
            </span>
          </div>
        </Link>

        {/* Live Clock & Quick Tools */}
        <div className="hidden md:flex items-center gap-3">
          <JapanLiveTime />
          <CurrencyConverterWidget />
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <CurrencyConverterWidget />
          </div>
          <Link
            to="/plan"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/25 transition-all duration-200 hover:scale-105"
          >
            <Plane size={15} />
            <span>Plan My Trip</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
