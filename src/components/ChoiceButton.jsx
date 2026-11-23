import { motion } from 'framer-motion'

export default function ChoiceButton({
  label,
  variant = 'yes',
  onClick,
  index = 0,
  selected = false,
  fullWidth = false,
  type = 'button',
  disabled = false,
}) {
  const isYes = variant === 'yes'
  const isSoft = variant === 'soft'

  let className = isYes ? 'btn-yes' : isSoft ? 'btn-soft' : 'btn-no'
  if (isSoft && selected) className += ' selected'

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative ${fullWidth ? 'w-full' : 'w-full sm:w-auto min-w-[150px]'}
        px-5 py-3 sm:px-6 sm:py-3.5 rounded-full
        font-display font-semibold text-sm sm:text-base
        transition-[filter,transform] active:scale-95 cursor-pointer
        focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-soft/60
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.05, type: 'spring', stiffness: 300, damping: 18 }}
      whileHover={disabled ? undefined : { scale: 1.04, y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
    >
      {label}
    </motion.button>
  )
}
