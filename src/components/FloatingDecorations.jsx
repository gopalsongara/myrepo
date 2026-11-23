import { motion } from 'framer-motion'
import { Heart, Sparkles, Star } from 'lucide-react'

const items = [
  { Icon: Heart, x: '8%', y: '12%', size: 22, color: '#FF8FAB', delay: 0, dur: 5 },
  { Icon: Star, x: '88%', y: '18%', size: 20, color: '#C9B8F0', delay: 0.8, dur: 4.5 },
  { Icon: Sparkles, x: '15%', y: '72%', size: 18, color: '#FFD700', delay: 1.2, dur: 5.5 },
  { Icon: Heart, x: '82%', y: '65%', size: 16, color: '#FF6B9D', delay: 0.4, dur: 4.8 },
  { Icon: Star, x: '5%', y: '45%', size: 14, color: '#FFB6C1', delay: 1.6, dur: 6 },
  { Icon: Heart, x: '92%', y: '40%', size: 18, color: '#E8DFF8', delay: 0.2, dur: 5.2 },
  { Icon: Sparkles, x: '70%', y: '8%', size: 16, color: '#FFC2D1', delay: 1, dur: 4.2 },
  { Icon: Star, x: '25%', y: '88%', size: 15, color: '#C9B8F0', delay: 0.6, dur: 5.8 },
]

function Flower({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="12" r="7" fill="#FFB6C1" />
      <circle cx="12" cy="20" r="7" fill="#FFC2D1" />
      <circle cx="28" cy="20" r="7" fill="#FFC2D1" />
      <circle cx="16" cy="28" r="7" fill="#FFE4EC" />
      <circle cx="24" cy="28" r="7" fill="#FFE4EC" />
      <circle cx="20" cy="20" r="5" fill="#FFD700" />
    </svg>
  )
}

export default function FloatingDecorations({ dense = false }) {
  const list = dense ? items : items.slice(0, 6)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {list.map(({ Icon, x, y, size, color, delay, dur }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, top: y, color }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 8, -4, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
          <Icon style={{ width: size, height: size }} fill={color} strokeWidth={1.5} />
        </motion.div>
      ))}

      <motion.div
        className="absolute left-[12%] top-[28%] w-7 h-7 sm:w-8 sm:h-8 opacity-30"
        animate={{ y: [0, -12, 0], rotate: [0, 18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Flower className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute right-[10%] bottom-[22%] w-6 h-6 sm:w-7 sm:h-7 opacity-28"
        animate={{ y: [0, -10, 0], rotate: [0, -14, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
      >
        <Flower className="w-full h-full" />
      </motion.div>
    </div>
  )
}
