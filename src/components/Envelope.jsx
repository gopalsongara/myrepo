import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import FloatingDecorations from './FloatingDecorations'

export default function Envelope({ onOpen }) {
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    window.setTimeout(() => onOpen(), 900)
  }

  return (
    <div className="relative w-full max-w-lg mx-auto px-2 text-center">
      <FloatingDecorations />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-blush mb-2">
          A Little Letter For You 💌
        </h1>
        <p className="text-sm sm:text-base text-[#8a7a84] mb-8 sm:mb-10">
          Someone has something to tell you...
        </p>

        <motion.button
          type="button"
          onClick={handleOpen}
          disabled={opening}
          className="relative mx-auto block cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-soft/70 rounded-2xl disabled:cursor-default"
          aria-label="Open my letter"
          animate={opening ? { y: 0, scale: 1.04 } : { y: [0, -10, 0] }}
          transition={
            opening
              ? { duration: 0.4 }
              : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
          }
          whileHover={opening ? undefined : { scale: 1.03 }}
          whileTap={opening ? undefined : { scale: 0.97 }}
        >
          <div className="relative w-[240px] sm:w-[280px] md:w-[320px] mx-auto">
            <div className="relative h-[160px] sm:h-[180px] md:h-[200px] rounded-2xl bg-gradient-to-br from-[#e8c9d1] to-[#d4919e] shadow-[0_16px_36px_rgba(180,120,140,0.22)] overflow-hidden border border-white/50">
              {/* Opening flap */}
              <motion.div
                className="absolute inset-x-0 top-0 h-[55%] origin-top z-20"
                style={{
                  background: 'linear-gradient(160deg, #f0d8de 0%, #dfa8b4 100%)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
                animate={opening ? { rotateX: -160, opacity: 0.85 } : { rotateX: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />

              {/* Letter sliding up */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-[70%] rounded-t-md bg-[#fffaf0] border border-pink-soft/40 z-10"
                initial={{ top: '38%', height: '48%' }}
                animate={
                  opening
                    ? { top: '8%', height: '78%', boxShadow: '0 -8px 24px rgba(255,107,157,0.25)' }
                    : { top: '38%', height: '48%' }
                }
                transition={{ duration: 0.75, ease: 'easeOut' }}
              >
                <div className="pt-3 flex justify-center gap-1 opacity-70">
                  <span>💕</span>
                  <span className="font-hand text-lg text-blush">For you</span>
                  <span>💕</span>
                </div>
              </motion.div>
            </div>

            <AnimatePresence>
              {!opening && (
                <motion.div
                  className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-30"
                  animate={{ scale: [1, 1.08, 1] }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blush to-pink flex items-center justify-center shadow-lg border-2 border-white/70">
                    <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="absolute text-lg sm:text-xl pointer-events-none"
                style={{
                  left: `${15 + i * 22}%`,
                  top: i % 2 === 0 ? '-8%' : 'auto',
                  bottom: i % 2 === 1 ? '-10%' : 'auto',
                }}
                animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
              >
                💕
              </motion.span>
            ))}
          </div>
        </motion.button>

        <motion.button
          type="button"
          onClick={handleOpen}
          disabled={opening}
          className="mt-10 sm:mt-12 btn-yes inline-flex items-center justify-center px-7 py-3.5 rounded-full font-display font-semibold text-base sm:text-lg cursor-pointer disabled:opacity-70"
          whileHover={opening ? undefined : { scale: 1.05 }}
          whileTap={opening ? undefined : { scale: 0.96 }}
        >
          {opening ? 'Opening…' : 'Open My Letter ❤️'}
        </motion.button>
      </motion.div>
    </div>
  )
}
