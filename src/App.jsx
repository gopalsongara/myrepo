import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  PHASES,
  JOURNEY_START,
  journeyScreens,
  POSITIVE_TONES,
} from './data/apologyFlow'
import { useMusicPlayer } from './hooks/useMusicPlayer'
import FloatingDecorations from './components/FloatingDecorations'
import Envelope from './components/Envelope'
import ApologyLetter from './components/ApologyLetter'
import JourneyScreen from './components/JourneyScreen'
import SecondChance from './components/SecondChance'
import ResponseForm from './components/ResponseForm'
import Celebration from './components/Celebration'
import MusicPlayer from './components/MusicPlayer'

const SECOND_CHANCE_TO_RESPONSE = {
  'start-again': 'forgive',
  'second-chance': 'second-chance',
  'talk-first': 'lets-talk',
  'need-time': 'need-time',
  'still-hurt': 'still-hurt',
  'need-space': 'need-space',
}

const initialState = {
  phase: PHASES.ENVELOPE,
  journeyId: JOURNEY_START,
  secondChanceId: '',
  result: null,
}

export default function App() {
  const [state, setState] = useState(initialState)
  const {
    started,
    playing,
    muted,
    loading,
    error,
    start,
    togglePlay,
    toggleMute,
  } = useMusicPlayer()

  const openLetter = useCallback(() => {
    start()
    setState((s) => ({ ...s, phase: PHASES.LETTER }))
  }, [start])

  const goJourney = useCallback(() => {
    setState((s) => ({ ...s, phase: PHASES.JOURNEY, journeyId: JOURNEY_START }))
  }, [])

  const handleJourneyChoice = useCallback((next) => {
    if (next === 'secondChance') {
      setState((s) => ({ ...s, phase: PHASES.SECOND_CHANCE }))
      return
    }
    if (journeyScreens[next]) {
      setState((s) => ({ ...s, journeyId: next }))
    }
  }, [])

  const handleSecondChanceSelect = useCallback((opt) => {
    setState((s) => ({ ...s, secondChanceId: opt.id }))
  }, [])

  const goResponse = useCallback(() => {
    setState((s) => ({ ...s, phase: PHASES.RESPONSE }))
  }, [])

  const handleSubmitSuccess = useCallback((payload) => {
    setState((s) => ({
      ...s,
      phase: PHASES.RESULT,
      result: payload,
    }))
  }, [])

  const restart = useCallback(() => {
    setState({ ...initialState })
  }, [])

  const showMusic = state.phase !== PHASES.ENVELOPE
  const journeyScreen = journeyScreens[state.journeyId] || journeyScreens[JOURNEY_START]
  const isPositiveResult = state.result && POSITIVE_TONES.has(state.result.tone)
  const matchedResponseId = SECOND_CHANCE_TO_RESPONSE[state.secondChanceId] || ''

  return (
    <div className="bg-stripes relative min-h-dvh flex flex-col overflow-x-hidden">
      <FloatingDecorations />

      <main className="relative z-10 flex-1 flex items-center justify-center px-3 sm:px-4 py-8 sm:py-10 pb-28 sm:pb-32">
        <AnimatePresence mode="wait">
          {state.phase === PHASES.ENVELOPE && (
            <motion.div
              key="envelope"
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
            >
              <Envelope onOpen={openLetter} />
            </motion.div>
          )}

          {state.phase === PHASES.LETTER && (
            <ApologyLetter key="letter" onContinue={goJourney} />
          )}

          {state.phase === PHASES.JOURNEY && (
            <JourneyScreen
              key={journeyScreen.id}
              screen={journeyScreen}
              onChoice={handleJourneyChoice}
            />
          )}

          {state.phase === PHASES.SECOND_CHANCE && (
            <SecondChance
              key="second-chance"
              selectedId={state.secondChanceId}
              onSelect={handleSecondChanceSelect}
              onContinue={goResponse}
            />
          )}

          {state.phase === PHASES.RESPONSE && (
            <ResponseForm
              key="response"
              initialResponseId={matchedResponseId}
              onSubmitSuccess={handleSubmitSuccess}
            />
          )}

          {state.phase === PHASES.RESULT && (
            <Celebration
              key="result"
              positive={Boolean(isPositiveResult)}
              responseLabel={state.result?.responseLabel}
              onRestart={restart}
            />
          )}
        </AnimatePresence>
      </main>

      <MusicPlayer
        visible={showMusic}
        started={started}
        playing={playing}
        muted={muted}
        loading={loading}
        error={error}
        onStart={start}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
      />
    </div>
  )
}
