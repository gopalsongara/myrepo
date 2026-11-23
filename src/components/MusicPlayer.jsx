import { motion, AnimatePresence } from 'framer-motion'
import { Music, Pause, Play, Volume2, VolumeX, Disc3 } from 'lucide-react'

export default function MusicPlayer({
  visible,
  started,
  playing,
  muted,
  loading,
  error,
  onStart,
  onTogglePlay,
  onToggleMute,
}) {
  return (
    <>
      {/* Always mounted so the YouTube iframe survives screen changes */}
      <div className="yt-hidden-player" aria-hidden>
        <div id="yt-bg-player" />
      </div>

      {visible && (
        <div className="fixed bottom-3 right-3 z-50 sm:bottom-6 sm:right-6 max-w-[calc(100vw-1.5rem)]">
          <AnimatePresence mode="wait">
            {!started ? (
              <motion.button
                key="start"
                type="button"
                onClick={onStart}
                disabled={loading}
                className="
                  flex items-center gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3
                  rounded-full font-display font-semibold text-xs sm:text-base
                  text-white cursor-pointer
                  bg-gradient-to-r from-pink to-blush
                  shadow-[0_8px_22px_rgba(180,120,140,0.28)]
                  border border-white/40 disabled:opacity-70
                "
                initial={{ scale: 0.85, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {loading ? 'Loading…' : error ? 'Retry song 🎵' : 'Play our song 🎵'}
              </motion.button>
            ) : (
              <motion.div
                key="controls"
                className="
                  flex flex-col items-end gap-2 p-2.5 sm:p-3.5 rounded-3xl
                  bg-white/92 backdrop-blur-md
                  border border-pink-soft/50
                  shadow-[0_10px_28px_rgba(140,120,140,0.14)]
                  min-w-[160px] sm:min-w-[210px]
                "
                initial={{ scale: 0.85, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0 }}
              >
                <div className="flex items-center gap-2 w-full">
                  <motion.div
                    className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-pink to-lavender text-white shrink-0"
                    animate={playing ? { rotate: 360 } : { rotate: 0 }}
                    transition={
                      playing
                        ? { repeat: Infinity, duration: 3, ease: 'linear' }
                        : { duration: 0.3 }
                    }
                  >
                    <Disc3 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-[11px] sm:text-sm font-semibold text-blush truncate">
                      Our Special Song ❤️
                    </p>
                    <p className="text-[10px] sm:text-xs text-[#8a7090] truncate">Dagabaaz Re</p>
                  </div>
                </div>

                {error ? (
                  <p className="text-[11px] text-blush w-full text-center">{error}</p>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full">
                    <button
                      type="button"
                      onClick={onTogglePlay}
                      className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-pink text-white shadow-md cursor-pointer hover:brightness-105 active:scale-95"
                      aria-label={playing ? 'Pause' : 'Play'}
                    >
                      {playing ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={onToggleMute}
                      className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-lavender-soft text-[#6b5b8a] shadow-md cursor-pointer hover:brightness-105 active:scale-95"
                      aria-label={muted ? 'Unmute' : 'Mute'}
                    >
                      {muted ? (
                        <VolumeX className="w-3.5 h-3.5" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  )
}
