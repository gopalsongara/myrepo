import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/** Parametric heart curve (classic) */
function heartPoint(t, scale) {
  const x = 16 * Math.sin(t) ** 3
  const y =
    -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
  return { x: x * scale, y: y * scale }
}

function createParticles(count, scale) {
  const particles = []
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2
    const base = heartPoint(t, scale)
    const spread = (Math.random() - 0.5) * scale * 2.4
    const angle = Math.random() * Math.PI * 2
    particles.push({
      x: base.x + Math.cos(angle) * spread,
      y: base.y + Math.sin(angle) * spread,
      r: 0.6 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
      speed: 1.2 + Math.random() * 2.4,
      bright: Math.random(),
    })
  }
  for (let i = 0; i < count * 0.25; i++) {
    const t = Math.random() * Math.PI * 2
    const base = heartPoint(t, scale)
    const spread = scale * (1.2 + Math.random() * 2.2)
    const angle = Math.random() * Math.PI * 2
    particles.push({
      x: base.x + Math.cos(angle) * spread,
      y: base.y + Math.sin(angle) * spread,
      r: 0.4 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.8 + Math.random() * 1.6,
      bright: Math.random() * 0.7,
    })
  }
  return particles
}

/**
 * Sparkly particle heart outline — glitter silhouette like the reference.
 */
export default function SparkleHeart({
  reduceMotion = false,
  className = '',
  size = 220,
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const particles = useMemo(
    () => createParticles(reduceMotion ? 420 : 900, size * 0.028),
    [reduceMotion, size],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const cx = size / 2
    const cy = size / 2 + size * 0.02

    const drawFrame = (time) => {
      ctx.clearRect(0, 0, size, size)

      const bloom = ctx.createRadialGradient(cx, cy, size * 0.05, cx, cy, size * 0.42)
      bloom.addColorStop(0, 'rgba(255, 105, 180, 0.22)')
      bloom.addColorStop(0.55, 'rgba(255, 20, 147, 0.08)')
      bloom.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = bloom
      ctx.fillRect(0, 0, size, size)

      for (const p of particles) {
        const twinkle = reduceMotion
          ? 0.75
          : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(time * 0.004 * p.speed + p.phase))
        const alpha = Math.min(1, twinkle * (0.45 + p.bright * 0.55))
        const radius = p.r * (0.85 + twinkle * 0.35)

        const g = ctx.createRadialGradient(
          cx + p.x,
          cy + p.y,
          0,
          cx + p.x,
          cy + p.y,
          radius * 3,
        )
        if (p.bright > 0.72) {
          g.addColorStop(0, `rgba(255, 240, 250, ${alpha})`)
          g.addColorStop(0.35, `rgba(255, 120, 190, ${alpha * 0.9})`)
          g.addColorStop(1, 'rgba(255, 20, 147, 0)')
        } else {
          g.addColorStop(0, `rgba(255, 105, 180, ${alpha})`)
          g.addColorStop(0.45, `rgba(255, 20, 147, ${alpha * 0.75})`)
          g.addColorStop(1, 'rgba(199, 21, 133, 0)')
        }

        ctx.beginPath()
        ctx.fillStyle = g
        ctx.arc(cx + p.x, cy + p.y, radius * 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    if (reduceMotion) {
      drawFrame(0)
      return undefined
    }

    const loop = (t) => {
      drawFrame(t)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(rafRef.current)
  }, [particles, reduceMotion, size])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size }}
      aria-hidden
    />
  )
}

export function AnimatedSparkleHeart({ reduceMotion = false }) {
  const [size, setSize] = useState(200)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 380) setSize(168)
      else if (w < 640) setSize(196)
      else setSize(228)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ scale: 0.22, opacity: 0 }}
      animate={
        reduceMotion
          ? { scale: 1, opacity: 1 }
          : {
              scale: [0.22, 1.06, 1, 1.08, 1, 1.05, 1],
              opacity: 1,
            }
      }
      transition={
        reduceMotion
          ? { duration: 0.25 }
          : {
              scale: {
                duration: 2.8,
                times: [0, 0.32, 0.42, 0.58, 0.72, 0.86, 1],
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 0.4,
              },
              opacity: { duration: 0.4 },
            }
      }
    >
      <div
        className="
          relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]
          bg-[#050505]
          shadow-[0_12px_36px_rgba(0,0,0,0.35),inset_0_0_48px_rgba(255,20,147,0.1)]
          border border-pink/20
          px-1 py-1 sm:px-2 sm:py-2
        "
      >
        <SparkleHeart reduceMotion={reduceMotion} size={size} className="block" />
      </div>
    </motion.div>
  )
}
