import { motion } from 'framer-motion'

const shared = {
  initial: { scale: 0.7, opacity: 0, y: 24 },
  animate: { scale: 1, opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 220, damping: 16 },
}

function Face({ eyes = 'open', mouth = 'sad', blush = true }) {
  const eyeY = eyes === 'closed' ? null : 78
  return (
    <g>
      {blush && (
        <>
          <ellipse cx="78" cy="98" rx="10" ry="6" fill="#FFB6C1" opacity="0.7" />
          <ellipse cx="122" cy="98" rx="10" ry="6" fill="#FFB6C1" opacity="0.7" />
        </>
      )}
      {eyes === 'closed' ? (
        <>
          <path d="M70 80 Q78 74 86 80" stroke="#5A4060" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M114 80 Q122 74 130 80" stroke="#5A4060" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : eyes === 'sparkle' ? (
        <>
          <circle cx="78" cy={eyeY} r="7" fill="#5A4060" />
          <circle cx="122" cy={eyeY} r="7" fill="#5A4060" />
          <circle cx="75" cy="75" r="2.5" fill="white" />
          <circle cx="119" cy="75" r="2.5" fill="white" />
          <path d="M68 68 L72 72 M72 68 L68 72" stroke="#FFD700" strokeWidth="1.5" />
          <path d="M128 68 L132 72 M132 68 L128 72" stroke="#FFD700" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <circle cx="78" cy={eyeY} r="7" fill="#5A4060" />
          <circle cx="122" cy={eyeY} r="7" fill="#5A4060" />
          <circle cx="75" cy="75" r="2.5" fill="white" />
          <circle cx="119" cy="75" r="2.5" fill="white" />
        </>
      )}
      {mouth === 'sad' && (
        <path d="M88 112 Q100 104 112 112" stroke="#5A4060" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {mouth === 'plead' && (
        <ellipse cx="100" cy="112" rx="8" ry="10" fill="#FF8FAB" />
      )}
      {mouth === 'smile' && (
        <path d="M86 108 Q100 122 114 108" stroke="#5A4060" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {mouth === 'wobble' && (
        <path d="M90 110 Q96 118 100 110 Q104 118 110 110" stroke="#5A4060" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
      {mouth === 'grin' && (
        <path d="M84 106 Q100 128 116 106" fill="#5A4060" />
      )}
    </g>
  )
}

function CatBody({ color = '#F8C8A0' }) {
  return (
    <g>
      <ellipse cx="100" cy="118" rx="52" ry="48" fill={color} />
      <ellipse cx="62" cy="58" rx="16" ry="22" fill={color} />
      <ellipse cx="138" cy="58" rx="16" ry="22" fill={color} />
      <ellipse cx="62" cy="62" rx="8" ry="12" fill="#FFB6C1" />
      <ellipse cx="138" cy="62" rx="8" ry="12" fill="#FFB6C1" />
      <circle cx="48" cy="130" r="12" fill={color} />
      <circle cx="152" cy="130" r="12" fill={color} />
      <ellipse cx="100" cy="95" rx="28" ry="22" fill="#FFE4D0" opacity="0.5" />
    </g>
  )
}

function PuppyBody({ color = '#E8C49A' }) {
  return (
    <g>
      <ellipse cx="100" cy="120" rx="54" ry="50" fill={color} />
      <ellipse cx="48" cy="95" rx="22" ry="28" fill={color} transform="rotate(-20 48 95)" />
      <ellipse cx="152" cy="95" rx="22" ry="28" fill={color} transform="rotate(20 152 95)" />
      <ellipse cx="48" cy="95" rx="12" ry="16" fill="#D4A574" transform="rotate(-20 48 95)" />
      <ellipse cx="152" cy="95" rx="12" ry="16" fill="#D4A574" transform="rotate(20 152 95)" />
      <ellipse cx="100" cy="130" rx="18" ry="14" fill="#F5D5B8" />
      <ellipse cx="100" cy="128" rx="8" ry="6" fill="#FF8FAB" />
    </g>
  )
}

function BunnyBody({ color = '#F5E6D3' }) {
  return (
    <g>
      <ellipse cx="68" cy="40" rx="14" ry="36" fill={color} />
      <ellipse cx="132" cy="40" rx="14" ry="36" fill={color} />
      <ellipse cx="68" cy="40" rx="7" ry="24" fill="#FFB6C1" />
      <ellipse cx="132" cy="40" rx="7" ry="24" fill="#FFB6C1" />
      <ellipse cx="100" cy="118" rx="50" ry="48" fill={color} />
      <ellipse cx="100" cy="125" rx="16" ry="12" fill="#FFE4EC" />
    </g>
  )
}

function Flowers() {
  return (
    <g>
      <g transform="translate(28,150)">
        <circle cx="0" cy="0" r="10" fill="#FF8FAB" />
        <circle cx="-8" cy="-6" r="8" fill="#FFB6C1" />
        <circle cx="8" cy="-6" r="8" fill="#FFB6C1" />
        <circle cx="0" cy="-10" r="8" fill="#FFC2D1" />
        <circle cx="0" cy="0" r="4" fill="#FFD700" />
        <line x1="0" y1="10" x2="0" y2="28" stroke="#7CB342" strokeWidth="3" />
      </g>
      <g transform="translate(170,145)">
        <circle cx="0" cy="0" r="9" fill="#C9B8F0" />
        <circle cx="-7" cy="-5" r="7" fill="#E8DFF8" />
        <circle cx="7" cy="-5" r="7" fill="#E8DFF8" />
        <circle cx="0" cy="-9" r="7" fill="#D4C4F0" />
        <circle cx="0" cy="0" r="3.5" fill="#FFD700" />
        <line x1="0" y1="9" x2="0" y2="26" stroke="#7CB342" strokeWidth="3" />
      </g>
      <g transform="translate(100,168)">
        <circle cx="0" cy="0" r="8" fill="#FF8FAB" />
        <circle cx="-6" cy="-4" r="6" fill="#FFC2D1" />
        <circle cx="6" cy="-4" r="6" fill="#FFC2D1" />
        <circle cx="0" cy="0" r="3" fill="#FFD700" />
      </g>
    </g>
  )
}

function HeartBalloon() {
  return (
    <g transform="translate(155,35)">
      <path
        d="M0 8 C0 0 -10 -2 -10 6 C-10 12 0 20 0 20 C0 20 10 12 10 6 C10 -2 0 0 0 8Z"
        fill="#FF6B9D"
      />
      <line x1="0" y1="20" x2="0" y2="40" stroke="#C9B8F0" strokeWidth="1.5" strokeDasharray="2 2" />
    </g>
  )
}

const animals = {
  'sad-cat': (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <CatBody />
      <Face eyes="open" mouth="sad" />
      <path d="M155 100 Q175 90 168 120" stroke="#F8C8A0" strokeWidth="10" fill="none" strokeLinecap="round" />
    </svg>
  ),
  'pleading-puppy': (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <PuppyBody />
      <Face eyes="open" mouth="plead" />
      <ellipse cx="78" cy="92" rx="3" ry="5" fill="#5A4060" opacity="0.3" />
      <ellipse cx="122" cy="92" rx="3" ry="5" fill="#5A4060" opacity="0.3" />
    </svg>
  ),
  'worried-bunny': (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <BunnyBody />
      <Face eyes="open" mouth="wobble" />
    </svg>
  ),
  'flowers-cat': (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <CatBody color="#F5D0C0" />
      <Face eyes="sparkle" mouth="smile" />
      <Flowers />
    </svg>
  ),
  'leaving-puppy': (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <PuppyBody color="#DDB892" />
      <Face eyes="closed" mouth="sad" />
      <text x="160" y="50" fontSize="22">👋</text>
    </svg>
  ),
  'dramatic-bunny': (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <BunnyBody color="#F8E8D8" />
      <Face eyes="open" mouth="plead" />
      <HeartBalloon />
      <path d="M70 70 L74 78 L66 78 Z" fill="#7EC8E3" opacity="0.8" />
      <path d="M130 65 L134 73 L126 73 Z" fill="#7EC8E3" opacity="0.8" />
    </svg>
  ),
  'tired-cat': (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <CatBody color="#E8C4A8" />
      <Face eyes="closed" mouth="sad" />
      <text x="20" y="40" fontSize="18" opacity="0.6">z</text>
      <text x="32" y="28" fontSize="14" opacity="0.45">z</text>
    </svg>
  ),
  'hopeful-puppy': (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <PuppyBody color="#F0D0A8" />
      <Face eyes="sparkle" mouth="smile" />
      <text x="15" y="55" fontSize="20">🤞</text>
    </svg>
  ),
  'happy-party': (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <CatBody color="#FFD4B8" />
      <Face eyes="sparkle" mouth="grin" />
      <Flowers />
      <text x="10" y="40" fontSize="22">🎉</text>
      <text x="165" y="45" fontSize="22">💖</text>
      <text x="155" y="170" fontSize="20">✨</text>
    </svg>
  ),
}

const bounceByMood = {
  sad: { y: [0, -6, 0], transition: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' } },
  plead: { y: [0, -10, 0], scale: [1, 1.04, 1], transition: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' } },
  worried: { rotate: [-3, 3, -3], transition: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' } },
  gift: { y: [0, -8, 0], transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' } },
  leaving: { x: [0, 8, 0], transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' } },
  dramatic: { scale: [1, 1.06, 1], transition: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' } },
  tired: { y: [0, 4, 0], transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' } },
  hopeful: { y: [0, -12, 0], transition: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' } },
  celebrate: {
    y: [0, -14, 0],
    rotate: [-4, 4, -4],
    transition: { repeat: Infinity, duration: 1.3, ease: 'easeInOut' },
  },
}

export default function AnimalIllustration({ type, mood = 'sad', className = '' }) {
  const illustration = animals[type] || animals['sad-cat']
  const loop = bounceByMood[mood] || bounceByMood.sad

  return (
    <motion.div
      key={type}
      className={`relative mx-auto w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 ${className}`}
      {...shared}
    >
      <motion.div className="w-full h-full" animate={loop}>
        {illustration}
      </motion.div>
    </motion.div>
  )
}
