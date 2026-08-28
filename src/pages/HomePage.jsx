import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Clock, DollarSign, Compass, ArrowRight, Star, Music, Sparkles, Ticket, Volume2 } from 'lucide-react'

const FEATURES = [
  { icon: Clock, title: 'Flexible Duration & Regions', desc: 'From 1-day express trips to a full month. Focus on Osaka, Tokyo, Kyoto, or explore all of Japan.' },
  { icon: Compass, title: 'Interest-Matched Activities', desc: 'Anime, temples, food, nature, technology — curated for you.' },
  { icon: MapPin, title: 'Interactive English Route Map', desc: 'Visualize your journey with English labels, train line routes, and live taxi estimates.' },
  { icon: DollarSign, title: 'Dual Currency Precision', desc: 'Transparent itemized breakdowns in Philippine Peso (₱ PHP) and Japanese Yen (¥ JPY).' },
]

const COOL_EXTRAS = [
  { emoji: '🦊', title: 'Kenji Sensei AI Concierge', desc: 'Interactive talking Japanese phrasebook with audio pronunciation + insider konbini hacks.' },
  { emoji: '🎵', title: 'Procedural Web Soundscapes', desc: 'Synthesized Kyoto wind chimes, Tokyo rainy cafe lo-fi, and authentic Yamanote departure jingles.' },
  { emoji: '🎟️', title: 'Digital JR Travel Pass', desc: 'Commemorative Shinkansen boarding pass generator with custom collectible passport stamps.' },
  { emoji: '🎰', title: 'Gachapon Lucky Capsule Machine', desc: 'Spin the retro capsule machine to discover rare hidden gems and Michelin street food stalls.' }
]

const HIGHLIGHTS = [
  { city: 'Tokyo', emoji: '🗼', desc: 'The electric capital · Akihabara & Shibuya', tag: 'Most Popular' },
  { city: 'Kyoto', emoji: '⛩️', desc: 'Ancient temples, bamboo & geisha quarters', tag: 'Cultural Heart' },
  { city: 'Osaka', emoji: '🦑', desc: 'Street food paradise & Super Nintendo World', tag: 'Foodie Heaven' },
  { city: 'Hakone', emoji: '🗻', desc: 'Mt. Fuji views, pirate cruises & hot springs', tag: 'Scenic Views' },
  { city: 'Hiroshima', emoji: '🕊️', desc: 'Peace memorial & floating Itsukushima Torii', tag: 'Must Visit' },
  { city: 'Okinawa', emoji: '🌊', desc: 'Tropical coral reefs, whale sharks & beaches', tag: 'Beach Life' },
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
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-28">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-pink-300 text-xs font-bold shadow-lg"
          >
            <Sparkles size={14} /> Next-Gen AI Travel Engine for Japan 🇯🇵
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            Plan Your Ultimate
            <br />
            <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 bg-clip-text text-transparent">
              Japan Adventure
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Personalized day-by-day itineraries, exact landmark photos, live multi-modal transit directions,
            and prices in both <strong className="text-amber-300">¥ Japanese Yen</strong> & <strong className="text-pink-300">₱ Philippine Peso</strong>.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/plan" className="btn-primary flex items-center gap-2 justify-center text-lg shadow-pink-500/30">
              Start Planning Now <ArrowRight size={20} />
            </Link>
            <a href="#features" className="btn-secondary flex items-center gap-2 justify-center text-lg">
              Explore Cool Features
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/60 text-xs font-semibold"
          >
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              🏯 55+ Verified Attractions
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              🗺️ 12 Japanese Regions
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              🦊 Talking AI Sensei
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              🎵 Ambient Soundscapes
            </span>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0,80 C360,20 1080,20 1440,80 L1440,80 L0,80 Z" fill="#FAFAF7" />
          </svg>
        </div>
      </section>

      {/* ── Interactive Cool Features ───────────── */}
      <section className="py-20 px-6 bg-cream border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-pink-600 font-bold uppercase tracking-widest text-xs">Unmatched Experience</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-indigo-950 mt-1 mb-3">
              Loaded With Super Cool Features
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Crafted with authentic soundscapes, digital boarding passes, and an interactive AI Sensei.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COOL_EXTRAS.map((extra, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-4xl mb-4">{extra.emoji}</div>
                <h3 className="font-bold text-sm text-indigo-950 mb-2">{extra.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{extra.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────── */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-indigo-950 mb-3">
              How The Engine Works
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Zero-repeat deduplication and instant transit calculations
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
                className="bg-cream rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
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
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-indigo-950 mb-3">
              Explore Japan's Icons
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Every landmark is backed by verified high-definition photos and exact transit routes
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-indigo-950 mb-3">
              Loved by Wanderers Worldwide
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
                className="bg-cream rounded-2xl p-6 shadow-sm border border-gray-100"
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
            Your personalized itinerary, live map, and digital JR pass are just a few clicks away.
          </p>
          <Link to="/plan" className="btn-primary inline-flex items-center gap-2 text-lg">
            Plan My Trip Now <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950 text-white/40 text-center py-8 px-6 text-sm">
        <p>🗾 Japan Trip Planner — Built with ❤️ for wanderers everywhere</p>
        <p className="mt-1">All currency displayed in Philippine Peso (₱ PHP) and Japanese Yen (¥ JPY).</p>
      </footer>
    </motion.div>
  )
}
