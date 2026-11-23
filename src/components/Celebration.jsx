import { motion } from 'framer-motion'
import { RotateCcw, Heart } from 'lucide-react'
import Confetti from './Confetti'
import AnimalIllustration from './AnimalIllustration'
import ChoiceButton from './ChoiceButton'

export default function Celebration({ positive, responseLabel, onRestart }) {
  return (
    <motion.div
      className="relative w-full max-w-lg mx-auto card-soft rounded-[2rem] sm:rounded-[2.5rem] px-5 py-8 sm:px-10 sm:py-12 overflow-hidden"
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {positive && <Confetti />}

      <div className="relative z-10 flex flex-col items-center text-center">
        {positive ? (
          <>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-blush">Yayyyyy!! ❤️</h2>
            <p className="mt-3 text-base sm:text-lg text-[#6b4a5a] max-w-sm">
              Thank you for giving us another chance.
            </p>
            <div className="mt-4">
              <AnimalIllustration type="happy-party" mood="celebrate" />
            </div>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-lavender-soft flex items-center justify-center mb-3">
              <Heart className="w-7 h-7 text-blush fill-pink-soft" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#6b4a5a]">
              Thank you for sharing 💗
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#8a7090] max-w-sm leading-relaxed">
              I hear you
              {responseLabel ? (
                <>
                  {' '}
                  — <span className="font-semibold text-[#6b4a5a]">{responseLabel}</span>
                </>
              ) : null}
              . Your feelings matter, and I&apos;ll respect whatever you need right now.
            </p>
            <div className="mt-4">
              <AnimalIllustration type="worried-bunny" mood="sad" />
            </div>
          </>
        )}

        <div className="mt-8">
          <ChoiceButton
            label={
              <span className="inline-flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Experience Again ❤️
              </span>
            }
            variant="no"
            onClick={onRestart}
          />
        </div>
      </div>
    </motion.div>
  )
}
