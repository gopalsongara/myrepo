import { motion } from 'framer-motion'
import SpeechBubble from './SpeechBubble'
import AnimalIllustration from './AnimalIllustration'
import ChoiceButton from './ChoiceButton'

export default function JourneyScreen({ screen, onChoice }) {
  return (
    <motion.div
      key={screen.id}
      className="relative w-full max-w-lg mx-auto card-soft rounded-[2rem] sm:rounded-[2.5rem] px-4 py-7 sm:px-10 sm:py-10"
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -14 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
    >
      <SpeechBubble message={screen.message} />
      <AnimalIllustration type={screen.animal} mood={screen.mood} />

      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
        {screen.buttons.map((btn, i) => (
          <ChoiceButton
            key={btn.id}
            label={btn.label}
            variant={btn.variant}
            index={i}
            onClick={() => onChoice(btn.next)}
          />
        ))}
      </div>
    </motion.div>
  )
}
