import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  X,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Play,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { mockRetrospective, mockCurrentUser } from '@/lib/data'

export default function Retrospective() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const [progress, setProgress] = useState(0)
  const SLIDE_DURATION = 6000 // 6 seconds per slide

  const slides = [
    { id: 'intro', type: 'intro' },
    { id: 'stats', type: 'stats' },
    { id: 'milestones', type: 'milestones' },
    { id: 'achievements', type: 'achievements' },
    { id: 'outro', type: 'outro' },
  ]

  useEffect(() => {
    // Initialize Audio
    const audio = new Audio(
      'https://assets.mixkit.co/music/preview/mixkit-uplifting-strings-and-piano-1341.mp3',
    )
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio

    // Try to play audio automatically
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Automatic playback started!
        })
        .catch(() => {
          // Auto-play was prevented
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
      }
    }
  }, [isMuted, isPlaying])

  useEffect(() => {
    if (isPlaying) {
      setProgress(0)
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext()
            return 0
          }
          return prev + 100 / (SLIDE_DURATION / 100) // Update every 100ms
        })
      }, 100)
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current)
    }

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current)
    }
  }, [currentSlide, isPlaying])

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1)
    } else {
      setIsPlaying(false) // Stop at the end
    }
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  const toggleMute = () => setIsMuted(!isMuted)
  const togglePlay = () => setIsPlaying(!isPlaying)
  const handleClose = () => navigate('/')

  const restart = () => {
    setCurrentSlide(0)
    setIsPlaying(true)
    setProgress(0)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-black z-10 opacity-60" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm scale-110"
          style={{
            backgroundImage:
              currentSlide === 0
                ? "url('https://img.usecurling.com/p/800/1200?q=celebration%20confetti')"
                : currentSlide === 1
                  ? "url('https://img.usecurling.com/p/800/1200?q=soccer%20stadium%20lights')"
                  : currentSlide === 2
                    ? "url('https://img.usecurling.com/p/800/1200?q=trophy%20shelf')"
                    : currentSlide === 3
                      ? "url('https://img.usecurling.com/p/800/1200?q=mountain%20top')"
                      : "url('https://img.usecurling.com/p/800/1200?q=fireworks%20night')",
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-20 w-full max-w-md h-full sm:h-[90vh] sm:rounded-3xl bg-black/40 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col">
        {/* Progress Bars */}
        <div className="absolute top-0 left-0 right-0 p-3 z-30 flex gap-1.5">
          {slides.map((_, index) => (
            <div
              key={index}
              className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
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
        <div className="absolute top-6 left-0 right-0 px-4 z-30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center">
              <span className="font-bold text-xs">GP</span>
            </div>
            <span className="text-xs font-medium opacity-80 uppercase tracking-widest">
              Retrospectiva {mockRetrospective.year}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-white"
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
              className="h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-white"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Zones (Invisible) */}
        <div className="absolute inset-0 z-10 flex">
          <div
            className="w-1/3 h-full cursor-pointer"
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
            {!isPlaying && currentSlide < slides.length - 1 && (
              <div className="bg-black/40 p-4 rounded-full backdrop-blur-sm animate-in zoom-in fade-in">
                <Play className="h-8 w-8 fill-white" />
              </div>
            )}
          </div>
          <div
            className="w-1/3 h-full cursor-pointer"
            onClick={handleNext}
            onMouseDown={() => setIsPlaying(false)}
            onMouseUp={() => setIsPlaying(true)}
            onTouchStart={() => setIsPlaying(false)}
            onTouchEnd={() => setIsPlaying(true)}
          />
        </div>

        {/* Slide Content */}
        <div className="flex-1 relative z-0 flex items-center justify-center p-6 text-center">
          {slides[currentSlide].type === 'intro' && (
            <div className="animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-8">
              <h2 className="text-4xl font-black mb-2 tracking-tighter">
                Seu ano no
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold">
                  Goplay
                </span>
              </h2>
              <p className="text-xl font-light opacity-90">
                Foi uma jornada e tanto!
              </p>
              <div className="mt-8 animate-bounce">
                <div className="w-16 h-1 bg-white/50 mx-auto rounded-full" />
              </div>
            </div>
          )}

          {slides[currentSlide].type === 'stats' && (
            <div className="space-y-8 w-full animate-in fade-in slide-in-from-right duration-700">
              <h3 className="text-2xl font-bold uppercase tracking-widest text-gold mb-8">
                Histórico
              </h3>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="mb-4">
                  <mockRetrospective.stats.topCategoryIcon className="w-12 h-12 mx-auto text-gold" />
                </div>
                <h4 className="text-4xl font-black mb-1">
                  {mockRetrospective.stats.topCategory}
                </h4>
                <p className="text-sm opacity-80 uppercase tracking-wide">
                  Sua paixão principal
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                  <p className="text-3xl font-bold">
                    {mockRetrospective.stats.videosWatched}
                  </p>
                  <p className="text-xs opacity-70">Vídeos Assistidos</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                  <p className="text-3xl font-bold">
                    {mockRetrospective.stats.hoursWatched}h
                  </p>
                  <p className="text-xs opacity-70">Horas de Conteúdo</p>
                </div>
              </div>
            </div>
          )}

          {slides[currentSlide].type === 'milestones' && (
            <div className="w-full animate-in fade-in slide-in-from-bottom duration-700">
              <h3 className="text-2xl font-bold uppercase tracking-widest text-primary mb-8">
                Marcos do Ano
              </h3>

              <div className="space-y-4">
                {mockRetrospective.milestones.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 animate-in slide-in-from-left"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <item.icon className={cn('w-6 h-6', item.color)} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-lg leading-none mb-1">
                        {item.label}
                      </p>
                      <p className="text-xs opacity-70 font-mono">
                        {item.date} • {mockRetrospective.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slides[currentSlide].type === 'achievements' && (
            <div className="w-full animate-in fade-in zoom-in duration-700">
              <h3 className="text-2xl font-bold uppercase tracking-widest text-green-400 mb-8">
                Conquistas
              </h3>

              <div className="grid gap-4">
                {mockRetrospective.achievements.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center animate-in scale-90 fade-in"
                    style={{ animationDelay: `${index * 300}ms` }}
                  >
                    <item.icon
                      className={cn('w-10 h-10 mx-auto mb-3', item.color)}
                    />
                    <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                    <p className="text-sm opacity-70">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slides[currentSlide].type === 'outro' && (
            <div className="animate-in fade-in slide-in-from-bottom duration-1000 text-center w-full">
              <div className="w-24 h-24 rounded-full border-4 border-gold mx-auto mb-6 shadow-2xl overflow-hidden">
                <img
                  src={mockCurrentUser.avatar}
                  className="w-full h-full object-cover"
                  alt="Avatar"
                />
              </div>

              <h2 className="text-3xl font-bold mb-4">
                Obrigado, <br />
                <span className="text-gold">
                  {mockCurrentUser.name.split(' ')[0]}!
                </span>
              </h2>

              <p className="text-lg opacity-90 font-light italic max-w-xs mx-auto mb-8">
                "{mockRetrospective.summary.message}"
              </p>

              <div className="flex gap-3 justify-center">
                <Button
                  className="bg-white text-black hover:bg-white/90 font-bold rounded-full px-8"
                  onClick={handleClose}
                >
                  Continuar
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/30 hover:bg-white/10 text-white"
                  onClick={restart}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Nav Hint (Only for desktop feel or large screens) */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-between px-8 opacity-0 sm:opacity-50 pointer-events-none">
          <ChevronLeft className="h-6 w-6" />
          <ChevronRight className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}
