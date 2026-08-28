import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useTrip } from '../context/TripContext'
import { generateItinerary } from '../lib/itinerary-engine'
import WizardProgress from '../components/WizardProgress'

// ── Step 1: Duration ──────────────────────────────────
const DURATIONS = [
  { id: '3days',  label: '3 Days',  sublabel: 'Weekend escape', emoji: '⚡', desc: 'Perfect for a taste of Tokyo\'s magic' },
  { id: '1week',  label: '1 Week',  sublabel: 'Classic trip', emoji: '🌸', desc: 'Tokyo, Kyoto & Osaka — the golden triangle' },
  { id: '2weeks', label: '2 Weeks', sublabel: 'Deep dive', emoji: '🏯', desc: 'Add Hiroshima, Hakone & Nara for depth' },
  { id: '1month', label: '1 Month', sublabel: 'Full adventure', emoji: '🗾', desc: 'Experience all of Japan — north to south' },
]

// ── Step 2: Interests ─────────────────────────────────
const INTERESTS = [
  { id: 'history',     emoji: '🏯', label: 'History & Temples' },
  { id: 'food',        emoji: '🍜', label: 'Food & Street Food' },
  { id: 'nature',      emoji: '🌸', label: 'Nature & Gardens' },
  { id: 'anime',       emoji: '🎮', label: 'Anime & Pop Culture' },
  { id: 'shopping',    emoji: '🛍️', label: 'Shopping & Fashion' },
  { id: 'traditional', emoji: '🎌', label: 'Traditional Arts' },
  { id: 'hiking',      emoji: '🏔️', label: 'Hiking & Adventure' },
  { id: 'nightlife',   emoji: '🌃', label: 'Nightlife' },
  { id: 'wellness',    emoji: '♨️', label: 'Wellness & Onsen' },
  { id: 'technology',  emoji: '🤖', label: 'Technology' },
]

// ── Step 3: Travel Style ──────────────────────────────
const TRAVEL_STYLES = [
  { id: 'budget',   emoji: '🎒', label: 'Budget Explorer', desc: 'Hostels, convenience store meals, local transport', price: '$50–80/day' },
  { id: 'midrange', emoji: '🏨', label: 'Comfortable Traveler', desc: 'Business hotels, local restaurants, JR Pass', price: '$120–200/day' },
  { id: 'luxury',   emoji: '👑', label: 'Luxury Experience', desc: 'Ryokan stays, fine dining, private tours', price: '$350+/day' },
]

const GROUP_TYPES = [
  { id: 'solo',   emoji: '🧳', label: 'Solo' },
  { id: 'couple', emoji: '💑', label: 'Couple' },
  { id: 'family', emoji: '👨‍👩‍👧', label: 'Family' },
  { id: 'group',  emoji: '👥', label: 'Group' },
]

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

export default function PlanPage() {
  const { tripData, updateTrip, setItinerary } = useTrip()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [loading, setLoading] = useState(false)

  const goTo = (nextStep) => {
    setDirection(nextStep > step ? 1 : -1)
    setStep(nextStep)
  }

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => {
      const result = generateItinerary(tripData)
      setItinerary(result)
      navigate('/itinerary')
    }, 1200)
  }

  const canProceed1 = !!tripData.duration
  const canProceed2 = tripData.interests.length > 0
  const canProceed3 = !!tripData.travelStyle && !!tripData.groupType

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream pt-24 pb-16 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-indigo-950 mb-2">
            Plan Your Japan Trip
          </h1>
          <p className="text-gray-500">Let's build your perfect itinerary</p>
        </div>

        <WizardProgress currentStep={step} />

        {/* Step panels */}
        <div className="relative overflow-hidden min-h-[420px]">
          <AnimatePresence custom={direction} mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <h2 className="font-serif text-2xl font-semibold text-indigo-950 mb-1">How long are you going?</h2>
                  <p className="text-gray-500 text-sm">Choose your trip duration</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {DURATIONS.map(({ id, label, sublabel, emoji, desc }) => (
                    <button
                      key={id}
                      onClick={() => updateTrip({ duration: id })}
                      className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                        tripData.duration === id
                          ? 'border-pink-500 bg-pink-50 shadow-lg shadow-pink-100'
                          : 'border-gray-200 bg-white hover:border-pink-200'
                      }`}
                    >
                      <div className="text-3xl mb-2">{emoji}</div>
                      <div className="font-bold text-indigo-900 text-lg">{label}</div>
                      <div className="text-pink-600 text-xs font-medium mb-2">{sublabel}</div>
                      <div className="text-gray-500 text-sm">{desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <h2 className="font-serif text-2xl font-semibold text-indigo-950 mb-1">What excites you?</h2>
                  <p className="text-gray-500 text-sm">Select all that interest you (pick at least one)</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {INTERESTS.map(({ id, emoji, label }) => {
                    const selected = tripData.interests.includes(id)
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          const current = tripData.interests
                          updateTrip({
                            interests: selected
                              ? current.filter(i => i !== id)
                              : [...current, id],
                          })
                        }}
                        className={`interest-card ${selected ? 'selected' : 'unselected'}`}
                      >
                        <div className="text-2xl mb-1">{emoji}</div>
                        <div className="text-xs font-medium text-gray-700 leading-tight">{label}</div>
                      </button>
                    )
                  })}
                </div>
                {tripData.interests.length > 0 && (
                  <p className="text-center text-pink-600 text-sm mt-3 font-medium">
                    ✓ {tripData.interests.length} interest{tripData.interests.length > 1 ? 's' : ''} selected
                  </p>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <h2 className="font-serif text-2xl font-semibold text-indigo-950 mb-1">Your travel style?</h2>
                  <p className="text-gray-500 text-sm">How do you like to travel?</p>
                </div>

                {/* Travel style */}
                <div className="space-y-3 mb-6">
                  {TRAVEL_STYLES.map(({ id, emoji, label, desc, price }) => (
                    <button
                      key={id}
                      onClick={() => updateTrip({ travelStyle: id })}
                      className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${
                        tripData.travelStyle === id
                          ? 'border-pink-500 bg-pink-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-pink-200'
                      }`}
                    >
                      <span className="text-3xl">{emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-indigo-900">{label}</p>
                        <p className="text-gray-500 text-xs">{desc}</p>
                      </div>
                      <span className={`text-sm font-semibold flex-shrink-0 ${
                        tripData.travelStyle === id ? 'text-pink-600' : 'text-gray-400'
                      }`}>{price}</span>
                    </button>
                  ))}
                </div>

                {/* Group type */}
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-3 text-center">Who's traveling?</p>
                  <div className="grid grid-cols-4 gap-2">
                    {GROUP_TYPES.map(({ id, emoji, label }) => (
                      <button
                        key={id}
                        onClick={() => updateTrip({ groupType: id })}
                        className={`py-3 rounded-xl border-2 text-center transition-all duration-200 ${
                          tripData.groupType === id
                            ? 'border-pink-500 bg-pink-50'
                            : 'border-gray-200 bg-white hover:border-pink-200'
                        }`}
                      >
                        <div className="text-xl">{emoji}</div>
                        <div className="text-xs text-gray-600 mt-1 font-medium">{label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 gap-4">
          {step > 1 ? (
            <button
              onClick={() => goTo(step - 1)}
              className="btn-outline flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => goTo(step + 1)}
              disabled={step === 1 ? !canProceed1 : !canProceed2}
              className={`btn-primary flex items-center gap-2 ml-auto ${
                (step === 1 ? !canProceed1 : !canProceed2) ? 'opacity-40 cursor-not-allowed hover:scale-100' : ''
              }`}
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={!canProceed3 || loading}
              className={`btn-primary flex items-center gap-2 ml-auto ${
                (!canProceed3 || loading) ? 'opacity-40 cursor-not-allowed hover:scale-100' : ''
              }`}
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span> Building your itinerary…
                </>
              ) : (
                <>🗾 Generate My Itinerary <ArrowRight size={16} /></>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
