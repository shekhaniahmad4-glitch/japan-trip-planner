import { motion } from 'framer-motion'

const steps = ['Duration', 'Destination', 'Interests', 'Style']

export default function WizardProgress({ currentStep }) {
  return (
    <div className="w-full max-w-md mx-auto mb-10">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200 z-0" />
        <motion.div
          className="absolute left-0 top-4 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 z-0"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {steps.map((label, idx) => {
          const stepNum = idx + 1
          const isComplete = stepNum < currentStep
          const isActive = stepNum === currentStep
          return (
            <div key={label} className="flex flex-col items-center z-10 relative">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  isComplete
                    ? 'bg-pink-500 border-pink-500 text-white'
                    : isActive
                    ? 'bg-white border-pink-500 text-pink-500 shadow-lg shadow-pink-100'
                    : 'bg-white border-gray-200 text-gray-400'
                }`}
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {isComplete ? '✓' : stepNum}
              </motion.div>
              <span className={`mt-2 text-xs font-medium ${
                isActive ? 'text-pink-600' : isComplete ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

