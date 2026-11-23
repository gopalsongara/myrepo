import { useCallback, useEffect, useRef, useState } from 'react'
import { YOUTUBE_VIDEO_ID } from '../data/apologyFlow'

const YT_API_SRC = 'https://www.youtube.com/iframe_api'

function loadYouTubeAPI() {
  return new Promise((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT)
      return
    }

    const timeout = setTimeout(() => {
      if (window.YT?.Player) resolve(window.YT)
      else reject(new Error('YouTube API timed out'))
    }, 10000)

    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      clearTimeout(timeout)
      previous?.()
      resolve(window.YT)
    }

    if (!document.querySelector(`script[src="${YT_API_SRC}"]`)) {
      const tag = document.createElement('script')
      tag.src = YT_API_SRC
      tag.async = true
      tag.onerror = () => {
        clearTimeout(timeout)
        reject(new Error('Failed to load YouTube API'))
      }
      document.head.appendChild(tag)
    }
  })
}

/**
 * Persistent YouTube background music — create once, keep across screen changes.
 */
export function useMusicPlayer() {
  const playerRef = useRef(null)
  const creatingRef = useRef(false)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const start = useCallback(async () => {
    if (playerRef.current || creatingRef.current) {
      try {
        playerRef.current?.playVideo?.()
        setPlaying(true)
        setStarted(true)
      } catch {
        /* ignore */
      }
      return
    }

    creatingRef.current = true
    setLoading(true)
    setError(null)

    try {
      const YT = await loadYouTubeAPI()
      if (!YT?.Player) throw new Error('YouTube player unavailable')

      await new Promise((resolve, reject) => {
        const readyTimeout = setTimeout(() => {
          setError("Couldn't load the song. Try again!")
          setLoading(false)
          creatingRef.current = false
          reject(new Error('YouTube player ready timeout'))
        }, 12000)

        const el = document.getElementById('yt-bg-player')
        if (!el) {
          clearTimeout(readyTimeout)
          reject(new Error('Player container missing'))
          return
        }

        playerRef.current = new YT.Player('yt-bg-player', {
          videoId: YOUTUBE_VIDEO_ID,
          width: 1,
          height: 1,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
          },
          events: {
            onReady: (event) => {
              clearTimeout(readyTimeout)
              setReady(true)
              setLoading(false)
              setStarted(true)
              event.target.playVideo()
              setPlaying(true)
              resolve()
            },
            onStateChange: (event) => {
              if (event.data === YT.PlayerState.PLAYING) setPlaying(true)
              if (event.data === YT.PlayerState.PAUSED) setPlaying(false)
              if (event.data === YT.PlayerState.ENDED) {
                event.target.seekTo(0)
                event.target.playVideo()
              }
            },
            onError: () => {
              clearTimeout(readyTimeout)
              setError("Couldn't load the song. Try again!")
              setLoading(false)
              creatingRef.current = false
              playerRef.current = null
              reject(new Error('YouTube player error'))
            },
          },
        })
      })
    } catch {
      setError("Couldn't load the song. Check your connection.")
      setLoading(false)
      creatingRef.current = false
    }
  }, [])

  useEffect(() => {
    return () => {
      try {
        playerRef.current?.destroy?.()
      } catch {
        /* ignore */
      }
    }
  }, [])

  const togglePlay = useCallback(() => {
    const player = playerRef.current
    if (!player || !ready) return
    if (playing) {
      player.pauseVideo()
      setPlaying(false)
    } else {
      player.playVideo()
      setPlaying(true)
    }
  }, [playing, ready])

  const toggleMute = useCallback(() => {
    const player = playerRef.current
    if (!player || !ready) return
    if (muted) {
      player.unMute()
      setMuted(false)
    } else {
      player.mute()
      setMuted(true)
    }
  }, [muted, ready])

  return {
    started,
    playing,
    muted,
    ready,
    error,
    loading,
    start,
    togglePlay,
    toggleMute,
  }
}
