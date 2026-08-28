import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Clock, DollarSign, Compass, ArrowRight, Star } from 'lucide-react'

const FEATURES = [
  { icon: Clock, title: 'Personalized Duration', desc: 'From a quick 3-day getaway to a full month-long journey across Japan.' },
  { icon: Compass, title: 'Interest-Matched Activities', desc: 'Anime, temples, food, nature, technology — curated for you.' },
  { icon: MapPin, title: 'Interactive Route Map', desc: 'Visualize your journey across Japan\'s iconic regions.' },
  { icon: DollarSign, title: 'Real Cost Estimates', desc: 'Transparent breakdowns in Philippine Peso (PHP) and Japanese Yen (JPY).' },
]

const HIGHLIGHTS = [
  { city: 'Tokyo', emoji: '🗼', desc: 'The electric capital', tag: 'Most Popular' },
  { city: 'Kyoto', emoji: '⛩️', desc: 'Ancient temples & geisha', tag: 'Cultural Heart' },
  { city: 'Osaka', emoji: '🦑', desc: 'Street food paradise', tag: 'Foodie Heaven' },
  { city: 'Hakone', emoji: '🗻', desc: 'Mt. Fuji & hot springs', tag: 'Scenic Views' },
  { city: 'Hiroshima', emoji: '🕊️', desc: 'Peace & history', tag: 'Must Visit' },
  { city: 'Okinawa', emoji: '🌊', desc: 'Tropical island vibes', tag: 'Beach Life' },
]

const TESTIMONIALS = [
  { name: 'Sarah K.', flag: '🇺🇸', text: 'Used this for my 2-week Japan trip. The itinerary was perfect — hit all the spots I cared about!', rating: 5 },
  { name: 'Marco L.', flag: '🇮🇹', text: 'The cost estimates were spot-on. The JR Pass tip alone saved me ¥20,000!', rating: 5 },
  { name: 'Yuki T.', flag: '🇦🇺', text: 'Beautiful interface. Loved how the map showed the whole route at a glance.', rating: 5 },
]

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero-gradient">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-7xl md:text-8xl" role="img" aria-label="Japan map">🗾</span>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-pink-300 font-medium tracking-widest uppercase text-sm mb-4"
          >
            Your Personal Japan Adventure
          </motion.p>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            Plan Your Dream
            <br />
            <span className="bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
              Japan Journey
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/70 text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Answer a few questions, and we'll craft a personalized day-by-day itinerary —
            complete with travel routes, cost estimates, and an interactive map.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/plan" className="btn-primary flex items-center gap-2 justify-center text-lg">
              Start Planning <ArrowRight size={20} />
            </Link>
            <a href="#features" className="btn-secondary flex items-center gap-2 justify-center text-lg">
              See How It Works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex items-center justify-center gap-8 text-white/40 text-sm"
          >
            <span>🏯 100+ Activities</span>
            <span>🗺️ 12+ Cities</span>
            <span>✈️ All Budgets</span>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0,80 C360,20 1080,20 1440,80 L1440,80 L0,80 Z" fill="#FAFAF7" />
          </svg>
        </div>
      </section>

      {/* ── Features ─────────────────────────── */}
      <section id="features" className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-indigo-950 mb-4">
              How It Works
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Three simple steps to your perfect Japan itinerary
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-600 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-semibold text-indigo-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Destination Highlights ────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-indigo-950 mb-4">
              Explore Japan's Icons
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From electric Tokyo to serene Kyoto — every destination tells a story
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HIGHLIGHTS.map(({ city, emoji, desc, tag }, i) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-900 p-6 hover:shadow-2xl transition-all duration-300 cursor-default"
              >
                <div className="absolute top-4 right-4 bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full">
                  {tag}
                </div>
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {emoji}
                </div>
                <h3 className="font-serif font-bold text-white text-xl mb-1">{city}</h3>
                <p className="text-white/60 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────── */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-indigo-950 mb-4">
              Travelers Love It
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, flag, text, rating }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex mb-3">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{text}"</p>
                <p className="font-semibold text-indigo-900 text-sm">{flag} {name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="py-24 px-6 bg-japan-gradient text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-6xl mb-6">✈️</div>
          <h2 className="font-serif text-4xl font-bold mb-4">
            Ready for Your Adventure?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Your perfect Japan itinerary is just 3 questions away.
          </p>
          <Link to="/plan" className="btn-primary inline-flex items-center gap-2 text-lg">
            Plan My Trip Now <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950 text-white/40 text-center py-8 px-6 text-sm">
        <p>🗾 Japan Trip Planner — Built with ❤️ for wanderers everywhere</p>
        <p className="mt-1">Data based on 2025 averages. Always verify current prices before travel.</p>
      </footer>
    </motion.div>
  )
}

