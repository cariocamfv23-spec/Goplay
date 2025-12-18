import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { mockRetrospective } from '@/lib/data'

import IntroSlide from './IntroSlide'
import StatsSlide from './StatsSlide'
import MilestonesSlide from './MilestonesSlide'
import AchievementsSlide from './AchievementsSlide'
import OutroSlide from './OutroSlide'

const SLIDES = [
  { id: 'intro', component: IntroSlide, theme: 'brand' },
  { id: 'stats', component: StatsSlide, theme: 'neon' },
  { id: 'milestones', component: MilestonesSlide, theme: 'nature' },
  { id: 'achievements', component: AchievementsSlide, theme: 'fire' },
  { id: 'outro', component: OutroSlide, theme: 'dark' },
]

export default function Retrospective() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const [progress, setProgress] = useState(0)
  const SLIDE_DURATION = 6000 // 6 seconds per slide

  // --- Audio Logic ---
  useEffect(() => {
    const audio = new Audio(
      'https://assets.mixkit.co/music/preview/mixkit-uplifting-strings-and-piano-1341.mp3',
    )
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio

    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {})
        .catch(() => {
          setIsMuted(true)
        })
    }

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
      if (!isMuted && isPlaying) {
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.pause()
      }
    }
  }, [isMuted, isPlaying])

  // --- Navigation Logic ---
  const handleNext = useCallback(() => {
    setProgress(0)
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide((prev) => prev + 1)
    } else {
      setIsPlaying(false)
    }
  }, [currentSlide])

  const handlePrev = useCallback(() => {
    setProgress(0)
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    }
  }, [currentSlide])

  // --- Progress Logic ---
  useEffect(() => {
    if (progress >= 100 && isPlaying) {
      handleNext()
    }
  }, [progress, isPlaying, handleNext])

  useEffect(() => {
    if (isPlaying) {
      setProgress(0)
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100
          return prev + 100 / (SLIDE_DURATION / 100)
        })
      }, 100)
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current)
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current)
    }
  }, [currentSlide, isPlaying])

  // --- Theme Logic ---
  const getThemeBackground = (theme: string) => {
    switch (theme) {
      case 'brand':
        return 'bg-gradient-to-br from-primary via-purple-900 to-black'
      case 'neon':
        return 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600'
      case 'nature':
        return 'bg-gradient-to-br from-teal-500 via-emerald-600 to-green-800'
      case 'fire':
        return 'bg-gradient-to-br from-orange-500 via-red-600 to-rose-700'
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'
      default:
        return 'bg-black'
    }
  }

  const restart = () => {
    setCurrentSlide(0)
    setIsPlaying(true)
    setProgress(0)
  }

  const toggleMute = () => setIsMuted(!isMuted)
  const togglePlay = () => setIsPlaying(!isPlaying)
  const handleClose = () => navigate('/')

  const ActiveComponent = SLIDES[currentSlide].component

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex items-center justify-center overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div
        className={cn(
          'absolute inset-0 transition-all duration-1000 ease-in-out',
          getThemeBackground(SLIDES[currentSlide].theme),
        )}
      />

      {/* Main Container */}
      <div className="relative z-20 w-full max-w-md h-full sm:h-[90vh] sm:rounded-3xl bg-black/10 backdrop-blur-sm shadow-2xl overflow-hidden flex flex-col border-x border-white/5 sm:border border-white/10">
        {/* Top Progress Bars */}
        <div className="absolute top-0 left-0 right-0 p-4 z-40 flex gap-2">
          {SLIDES.map((_, index) => (
            <div
              key={index}
              className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{
                  width:
                    index < currentSlide
                      ? '100%'
                      : index === currentSlide
                        ? `${progress}%`
                        : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* Top Controls */}
        <div className="absolute top-8 left-0 right-0 px-6 z-40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <span className="font-bold text-[10px] tracking-tighter">GP</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-90 drop-shadow-md">
              Retrospectiva {mockRetrospective.year}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-black/20 hover:bg-black/30 text-white backdrop-blur-md border border-white/10"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-black/20 hover:bg-black/30 text-white backdrop-blur-md border border-white/10"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Zones (Invisible Touch Areas) */}
        <div className="absolute inset-0 z-30 flex">
          <div
            className="w-1/3 h-full cursor-pointer active:bg-black/5 transition-colors"
            onClick={handlePrev}
            onMouseDown={() => setIsPlaying(false)}
            onMouseUp={() => setIsPlaying(true)}
            onTouchStart={() => setIsPlaying(false)}
            onTouchEnd={() => setIsPlaying(true)}
          />
          <div
            className="w-1/3 h-full cursor-pointer flex items-center justify-center"
            onClick={togglePlay}
          >
            {/* Play/Pause Indicator Overlay */}
            {!isPlaying && currentSlide < SLIDES.length - 1 && (
              <div className="bg-black/40 p-6 rounded-full backdrop-blur-md animate-in zoom-in fade-in">
                <ChevronRight className="h-10 w-10 fill-white text-white ml-1" />
              </div>
            )}
          </div>
          <div
            className="w-1/3 h-full cursor-pointer active:bg-black/5 transition-colors"
            onClick={handleNext}
            onMouseDown={() => setIsPlaying(false)}
            onMouseUp={() => setIsPlaying(true)}
            onTouchStart={() => setIsPlaying(false)}
            onTouchEnd={() => setIsPlaying(true)}
          />
        </div>

        {/* Slide Content */}
        <div className="flex-1 relative z-10 pt-20">
          {/* We use a key to force re-render animation on slide change */}
          <div key={currentSlide} className="h-full w-full">
            {currentSlide === 4 ? (
              <OutroSlide onRestart={restart} onClose={handleClose} />
            ) : (
              <ActiveComponent />
            )}
          </div>
        </div>

        {/* Desktop Hints */}
        <div className="hidden sm:flex absolute top-1/2 left-4 z-40 -translate-y-1/2 opacity-20 hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full text-white"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        </div>
        <div className="hidden sm:flex absolute top-1/2 right-4 z-40 -translate-y-1/2 opacity-20 hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full text-white"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </div>
  )
}
