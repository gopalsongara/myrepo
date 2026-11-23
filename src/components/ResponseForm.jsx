import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Heart, Loader2, Sparkles } from 'lucide-react'
import {
  responseOptions,
  feelingOptions,
  senderName,
} from '../data/apologyFlow'
import ChoiceButton from './ChoiceButton'

function ResponseHeartIntro({ reduceMotion }) {
  return (
    <div className="relative flex flex-col items-center justify-center pt-1 pb-2 sm:pb-3">
      <div className="relative flex items-center justify-center h-[7.5rem] sm:h-[9rem] w-full">
        {/* Soft glow */}
        <motion.div
          className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-pink/30 to-lavender/25 blur-2xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: reduceMotion ? 0.5 : [0.35, 0.6, 0.35], scale: 1 }}
          transition={
            reduceMotion
              ? { duration: 0.2 }
              : { opacity: { duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 1 }, duration: 1 }
          }
          aria-hidden
        />

        {/* Tiny floating hearts */}
        {[
          { x: '-2.8rem', y: '-1.2rem', delay: 1.1, size: 'text-sm' },
          { x: '2.9rem', y: '-1.4rem', delay: 1.25, size: 'text-xs' },
          { x: '-3rem', y: '1.6rem', delay: 1.35, size: 'text-xs' },
          { x: '2.7rem', y: '1.5rem', delay: 1.2, size: 'text-sm' },
        ].map((h, i) => (
          <motion.span
            key={`float-${i}`}
            className={`absolute text-blush/60 ${h.size} pointer-events-none`}
            style={{ left: '50%', top: '50%', marginLeft: h.x, marginTop: h.y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              reduceMotion
                ? { opacity: 0.4, scale: 1 }
                : { opacity: [0.2, 0.7, 0.2], y: [0, -6, 0], scale: [0.9, 1.05, 0.9] }
            }
            transition={
              reduceMotion
                ? { delay: 0.1 }
                : { duration: 2.2, delay: h.delay, repeat: Infinity, ease: 'easeInOut' }
            }
            aria-hidden
          >
            ♥
          </motion.span>
        ))}

        {/* Sparkles */}
        {[
          { x: '-1.2rem', y: '-2.6rem', delay: 1.3 },
          { x: '1.4rem', y: '-2.4rem', delay: 1.45 },
          { x: '0rem', y: '2.5rem', delay: 1.5 },
        ].map((s, i) => (
          <motion.span
            key={`spark-${i}`}
            className="absolute text-lavender pointer-events-none"
            style={{ left: '50%', top: '50%', marginLeft: s.x, marginTop: s.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              reduceMotion
                ? { opacity: 0.45, scale: 1 }
                : { opacity: [0, 0.8, 0], scale: [0.6, 1, 0.6], rotate: [0, 20, 0] }
            }
            transition={
              reduceMotion
                ? { delay: 0.1 }
                : { duration: 2, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }
            }
            aria-hidden
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.span>
        ))}

        {/* Growing 3D-style heart → heartbeat */}
        <motion.div
          className="relative z-10"
          initial={{ scale: 0.28, opacity: 0 }}
          animate={
            reduceMotion
              ? { scale: 1, opacity: 1 }
              : {
                  scale: [0.28, 1.05, 1, 1.1, 1, 1.08, 1],
                  opacity: 1,
                }
          }
          transition={
            reduceMotion
              ? { duration: 0.25 }
              : {
                  scale: {
                    duration: 2.6,
                    times: [0, 0.35, 0.45, 0.6, 0.75, 0.88, 1],
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 0.35,
                  },
                  opacity: { duration: 0.35 },
                }
          }
        >
          {/* Layered heart for soft 3D look */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
            <div
              className="
                absolute inset-0 rounded-[1.35rem] rotate-45
                bg-gradient-to-br from-[#f0b8c4] via-[#d4919e] to-[#b86b7e]
                shadow-[0_10px_28px_rgba(180,100,120,0.35),inset_0_2px_6px_rgba(255,255,255,0.35)]
              "
              style={{ borderRadius: '1.4rem 1.4rem 1.4rem 0.35rem' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart
                className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 text-white fill-white drop-shadow-md"
                strokeWidth={1.25}
              />
            </div>
            {/* Highlight for 3D feel */}
            <div
              className="absolute top-2 left-3 w-4 h-3 sm:w-5 sm:h-4 rounded-full bg-white/35 blur-[2px]"
              aria-hidden
            />
          </div>
        </motion.div>
      </div>

      {/* Sender name */}
      <motion.p
        className="mt-3 sm:mt-4 font-hand text-center text-2xl sm:text-3xl text-blush"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: reduceMotion ? 0.05 : 1.35,
          duration: reduceMotion ? 0.2 : 0.65,
          ease: 'easeOut',
        }}
      >
        With Love, {senderName} ❤️
      </motion.p>
    </div>
  )
}

export default function ResponseForm({
  initialResponseId,
  onSubmitSuccess,
}) {
  const reduceMotion = useReducedMotion()
  const [responseId, setResponseId] = useState(initialResponseId || '')
  const [feelings, setFeelings] = useState([])
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const headingDelay = reduceMotion ? 0.1 : 1.85

  const toggleFeeling = (id) => {
    setFeelings((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitted || loading) return

    if (!responseId) {
      setError('Please choose how you feel before sending ❤️')
      return
    }

    if (!message.trim()) {
      setError('Please write a personal message before sending 💌')
      return
    }

    setError('')
    setLoading(true)

    const selected = responseOptions.find((o) => o.id === responseId)
    const feelingLabels = feelingOptions
      .filter((f) => feelings.includes(f.id))
      .map((f) => f.label)

    const submissionId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`

    try {
      const res = await fetch('/api/send-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          responseId,
          responseLabel: selected?.label || responseId,
          responseTone: selected?.tone || 'gentle',
          feelings: feelingLabels,
          message: message.trim(),
          website: honeypot,
          submittedAt: new Date().toISOString(),
          submissionId,
        }),
      })

      let data = {}
      const contentType = res.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        try {
          data = await res.json()
        } catch {
          data = {}
        }
      }

      if (!res.ok || !data.success) {
        if (res.status === 404) {
          throw new Error(
            'API not reachable locally. Restart with npm run dev (Telegram API plugin) or use vercel dev.',
          )
        }
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setSubmitted(true)
      onSubmitSuccess({
        responseId,
        responseLabel: selected?.label,
        tone: selected?.tone || 'gentle',
        feelings: feelingLabels,
        message: message.trim(),
      })
    } catch (err) {
      setError(err.message || 'Could not send your response. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative w-full max-w-xl mx-auto card-soft rounded-[2rem] sm:rounded-[2.5rem] px-4 py-7 sm:px-8 sm:py-10"
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      noValidate
    >
      <ResponseHeartIntro reduceMotion={Boolean(reduceMotion)} />

      <motion.h2
        className="font-display text-center text-xl sm:text-2xl md:text-3xl font-bold text-blush"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: headingDelay,
          duration: reduceMotion ? 0.2 : 0.6,
          ease: 'easeOut',
        }}
      >
        Tell Me What&apos;s In Your Heart ❤️
      </motion.h2>

      <motion.p
        className="mt-2 text-center text-sm sm:text-base text-[#8a7a84]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: headingDelay + (reduceMotion ? 0.05 : 0.12),
          duration: reduceMotion ? 0.2 : 0.5,
        }}
      >
        Whatever you feel, I want to understand.
      </motion.p>

      {/* Honeypot — bots fill this; humans never see it */}
      <label className="honeypot" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </label>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: headingDelay + (reduceMotion ? 0.08 : 0.2),
          duration: reduceMotion ? 0.2 : 0.5,
        }}
      >
        <fieldset className="mt-6">
          <legend className="font-display font-semibold text-sm sm:text-base text-[#6b4a5a] mb-3">
            Your response
          </legend>
          <div className="grid grid-cols-1 gap-2.5">
            {responseOptions.map((opt, i) => (
              <ChoiceButton
                key={opt.id}
                label={opt.label}
                variant="soft"
                fullWidth
                index={i}
                selected={responseId === opt.id}
                onClick={() => setResponseId(opt.id)}
                disabled={loading || submitted}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="font-display font-semibold text-sm sm:text-base text-[#6b4a5a] mb-3">
            How are you feeling?{' '}
            <span className="font-normal text-[#8a7090]">(optional, pick any)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {feelingOptions.map((f) => {
              const active = feelings.includes(f.id)
              return (
                <button
                  key={f.id}
                  type="button"
                  disabled={loading || submitted}
                  onClick={() => toggleFeeling(f.id)}
                  className={`
                    px-3.5 py-2 rounded-full text-xs sm:text-sm font-display font-semibold
                    border-2 cursor-pointer transition-colors
                    ${
                      active
                        ? 'bg-pink text-white border-transparent'
                        : 'bg-white/70 text-[#7a4a62] border-pink-soft/50'
                    }
                  `}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
        </fieldset>

        <label className="block mt-6">
          <span className="font-display font-semibold text-sm sm:text-base text-[#6b4a5a]">
            A little message <span className="text-blush">*</span>
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading || submitted}
            required
            rows={4}
            maxLength={1000}
            placeholder="Anything you want to tell me... I'll listen ❤️"
            className="
              mt-2 w-full rounded-2xl border-2 border-pink-soft/50 bg-white/80
              px-4 py-3 text-sm sm:text-base text-[#5a4060]
              placeholder:text-[#b89aaa] resize-y min-h-[100px]
              focus:outline-none focus:ring-4 focus:ring-pink-soft/40 focus:border-pink
            "
          />
        </label>

        {error && (
          <p className="mt-4 text-center text-sm text-blush font-semibold" role="alert">
            {error}
          </p>
        )}

        <div className="mt-7 flex justify-center">
          <ChoiceButton
            type="submit"
            label={
              loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                </span>
              ) : submitted ? (
                'Sent 💌'
              ) : (
                'Send My Response 💌'
              )
            }
            variant="yes"
            disabled={loading || submitted || !responseId || !message.trim()}
          />
        </div>
      </motion.div>
    </motion.form>
  )
}
