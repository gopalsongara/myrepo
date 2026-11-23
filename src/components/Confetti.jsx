import { motion } from 'framer-motion'

const COLORS = ['#FF8FAB', '#C9B8F0', '#FFD700', '#FF6B9D', '#7EC8E3', '#FFB6C1', '#A8E6CF', '#FFD6A5']

export default function Confetti({ count = 28 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const left = `${(i * 17 + 7) % 100}%`
        const delay = (i % 10) * 0.12
        const duration = 2.4 + (i % 5) * 0.3
        const size = 6 + (i % 4) * 2
        const color = COLORS[i % COLORS.length]
        const isCircle = i % 3 === 0

        return (
          <motion.span
            key={i}
            className="absolute top-[-12px]"
            style={{
              left,
              width: size,
              height: isCircle ? size : size * 1.35,
              backgroundColor: color,
              borderRadius: isCircle ? '50%' : '2px',
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: ['0vh', '105vh'],
              opacity: [0, 1, 1, 0],
              rotate: [0, 200 + i * 15, 360],
              x: [0, ((i % 2) * 2 - 1) * (16 + (i % 7) * 5)],
            }}
            transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
          />
        )
      })}

      {Array.from({ length: 8 }, (_, i) => (
        <motion.span
          key={`heart-${i}`}
          className="absolute text-base sm:text-lg"
          style={{ left: `${12 + i * 10}%`, top: '42%' }}
          animate={{
            y: [0, -70 - (i % 3) * 16],
            opacity: [0, 1, 0],
            scale: [0.6, 1.15, 0.85],
          }}
          transition={{
            duration: 2.1,
            delay: 0.25 + i * 0.14,
            repeat: Infinity,
            repeatDelay: 1.1,
          }}
        >
          ❤️
        </motion.span>
      ))}
    </div>
  )
}
