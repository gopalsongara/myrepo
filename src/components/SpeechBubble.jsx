import { motion } from 'framer-motion'

export default function SpeechBubble({ message }) {
  return (
    <motion.div
      key={message}
      className="speech-bubble px-5 py-4 sm:px-8 sm:py-5 mx-auto max-w-[92%] sm:max-w-md mb-5 sm:mb-7"
      initial={{ opacity: 0, y: -14, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <p className="font-display text-center text-lg sm:text-2xl md:text-3xl font-semibold leading-snug">
        {message}
      </p>
    </motion.div>
  )
}
