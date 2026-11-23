import { motion, useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { APOLOGY_LETTER_BODY, APOLOGY_LETTER_CLOSING } from '../data/apologyFlow'
import ChoiceButton from './ChoiceButton'

function BeatingHeart({ reduceMotion }) {
  return (
    <div className="relative flex items-center justify-center py-6 sm:py-8" aria-hidden>
      {/* Soft glow */}
      <motion.div
        className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-pink/25 blur-2xl"
        animate={
          reduceMotion
            ? { opacity: 0.45 }
            : { opacity: [0.35, 0.65, 0.35], scale: [0.9, 1.15, 0.9] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      {/* Tiny floating hearts */}
      {[
        { x: -42, y: -18, delay: 0, size: 'text-sm' },
        { x: 40, y: -22, delay: 0.35, size: 'text-xs' },
        { x: -36, y: 28, delay: 0.7, size: 'text-xs' },
        { x: 38, y: 24, delay: 0.2, size: 'text-sm' },
        { x: 0, y: -40, delay: 0.5, size: 'text-[10px]' },
      ].map((h, i) => (
        <motion.span
          key={i}
          className={`absolute text-blush/70 ${h.size}`}
          style={{ translateX: h.x, translateY: h.y }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            reduceMotion
              ? { opacity: 0.45, scale: 1 }
              : {
                  opacity: [0.25, 0.75, 0.25],
                  y: [0, -8, 0],
                  scale: [0.85, 1.05, 0.85],
                }
          }
          transition={
            reduceMotion
              ? { delay: 0.2 }
              : {
                  duration: 2.2,
                  delay: 0.4 + h.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        >
          ♥
        </motion.span>
      ))}

      {/* Main heartbeat heart */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={
          reduceMotion
            ? { opacity: 1, scale: 1 }
            : {
                opacity: 1,
                scale: [1, 1.14, 1, 1.08, 1],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0.4 }
            : {
                opacity: { duration: 0.5 },
                scale: {
                  duration: 1.35,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.35,
                },
              }
        }
      >
        <div
          className="
            flex items-center justify-center
            w-16 h-16 sm:w-20 sm:h-20
            rounded-full
            bg-gradient-to-br from-[#e8a0ae] to-[#c47888]
            shadow-[0_0_28px_rgba(196,120,136,0.45),0_8px_20px_rgba(180,100,120,0.25)]
          "
        >
          <Heart
            className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white drop-shadow-sm"
            strokeWidth={1.5}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function ApologyLetter({ onContinue }) {
  const reduceMotion = useReducedMotion()
  const paragraphs = APOLOGY_LETTER_BODY.split('\n\n').filter(Boolean)
  const bodyDelay = 0.15 + paragraphs.length * 0.08

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto px-1"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="absolute text-sm sm:text-base"
            style={{ left: `${8 + i * 18}%`, top: `${10 + (i % 3) * 25}%` }}
            animate={
              reduceMotion
                ? { opacity: 0.2 }
                : { y: [0, -10, 0], opacity: [0.15, 0.35, 0.15] }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }
            }
          >
            💗
          </motion.span>
        ))}
      </div>

      <div className="letter-paper relative z-10 rounded-[1.5rem] sm:rounded-[2rem] px-5 py-7 sm:px-10 sm:py-10">
        <div className="flex justify-center mb-4">
          <span className="text-3xl" aria-hidden>
            🌸
          </span>
        </div>

        <div className="space-y-4 max-h-[58vh] sm:max-h-[62vh] overflow-y-auto pr-1">
          {paragraphs.map((block, i) => (
            <motion.p
              key={i}
              className="font-hand text-[1.35rem] sm:text-[1.65rem] md:text-[1.85rem] leading-relaxed text-[#5a4d55] whitespace-pre-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.15 + i * 0.08 }}
            >
              {block}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduceMotion ? 0.1 : bodyDelay + 0.15 }}
          >
            <BeatingHeart reduceMotion={reduceMotion} />
          </motion.div>

          <motion.p
            className="font-hand text-center text-[1.4rem] sm:text-[1.75rem] md:text-[1.95rem] leading-snug text-blush font-semibold px-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduceMotion ? 0.15 : bodyDelay + 0.55,
              duration: 0.8,
              ease: 'easeOut',
            }}
          >
            One little wish… Can we write a happier chapter together, Komal? ❤️
          </motion.p>

          <motion.p
            className="font-hand text-[1.35rem] sm:text-[1.65rem] md:text-[1.85rem] leading-relaxed text-[#5a4d55] whitespace-pre-wrap pt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0.2 : bodyDelay + 0.9 }}
          >
            {APOLOGY_LETTER_CLOSING}
          </motion.p>
        </div>

        <div className="mt-8 flex justify-center">
          <ChoiceButton label="Continue ❤️" variant="yes" onClick={onContinue} />
        </div>
      </div>
    </motion.div>
  )
}
