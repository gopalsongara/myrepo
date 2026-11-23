import { motion } from 'framer-motion'
import { secondChanceOptions } from '../data/apologyFlow'
import ChoiceButton from './ChoiceButton'

export default function SecondChance({ selectedId, onSelect, onContinue }) {
  return (
    <motion.div
      className="relative w-full max-w-xl mx-auto card-soft rounded-[2rem] sm:rounded-[2.5rem] px-4 py-7 sm:px-8 sm:py-10"
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
    >
      <h2 className="font-display text-center text-xl sm:text-2xl md:text-3xl font-bold text-blush leading-snug px-1">
        Can We Give Our Story Another Chance? ❤️
      </h2>
      <p className="mt-3 text-center text-sm sm:text-base text-[#8a7a84] px-2">
        I know things haven&apos;t been perfect, but I genuinely want to make things better.
      </p>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-2.5 sm:gap-3">
        {secondChanceOptions.map((opt, i) => (
          <ChoiceButton
            key={opt.id}
            label={opt.label}
            variant="soft"
            fullWidth
            index={i}
            selected={selectedId === opt.id}
            onClick={() => onSelect(opt)}
          />
        ))}
      </div>

      <div className="mt-7 flex justify-center">
        <ChoiceButton
          label="Continue 💌"
          variant="yes"
          disabled={!selectedId}
          onClick={onContinue}
        />
      </div>
    </motion.div>
  )
}
