import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { X, Play, RotateCcw, Camera, Settings2 } from 'lucide-react'
import { MotionAnalysisOverlay } from '@/components/MotionAnalysisOverlay'
import {
  RealTimeFeedback,
  FeedbackMessage,
} from '@/components/RealTimeFeedback'
import { Progress } from '@/components/ui/progress'
import useSoundStore from '@/stores/useSoundStore'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Exercise {
  id: string
  name: string
  category: string
  difficulty: string
}

export default function MotionAnalysis() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isActive, setIsActive] = useState(false)
  const [reps, setReps] = useState(0)
  const [accuracy, setAccuracy] = useState(85)
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null)
  const { playSound } = useSoundStore()
  const videoRef = useRef<HTMLVideoElement>(null)

  const selectedExercise = (location.state as { exercise?: Exercise })
    ?.exercise || {
    name: 'Agachamento Livre', // Default fallback
    category: 'Fitness',
  }

  // Simulate analysis loop
  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      // Randomly update accuracy
      setAccuracy((prev) =>
        Math.min(100, Math.max(60, prev + (Math.random() * 10 - 5))),
      )

      // Randomly increment reps every few seconds
      if (Math.random() > 0.8) {
        setReps((prev) => {
          const newReps = prev + 1
          // @ts-expect-error
          playSound('notification_points')
          setFeedback({
            id: Date.now().toString(),
            type: 'success',
            text: 'Movimento Perfeito!',
          })
          return newReps
        })
      } else if (Math.random() > 0.9) {
        // Random corrective feedback
        setFeedback({
          id: Date.now().toString(),
          type: 'warning',
          text: 'Corrija a postura',
        })
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isActive, playSound])

  const handleToggle = () => {
    setIsActive(!isActive)
    if (!isActive) {
      setFeedback({
        id: 'start',
        type: 'info',
        text: 'Posicione-se para começar...',
      })
    }
  }

  const handleReset = () => {
    setReps(0)
    setAccuracy(100)
    setIsActive(false)
  }

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col">
      {/* Background / Camera Feed Simulation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
        <img
          src="https://img.usecurling.com/p/800/1200?q=fitness%20gym%20workout&color=blue"
          alt="Camera Feed"
          className="w-full h-full object-cover opacity-80"
        />
        <video ref={videoRef} className="hidden" />
      </div>

      {/* AI Overlay */}
      <MotionAnalysisOverlay active={isActive} />

      {/* Real-time Feedback */}
      <RealTimeFeedback message={feedback} />

      {/* Header */}
      <div className="relative z-20 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-black/40 text-white border-white/20 backdrop-blur-md"
          >
            <Camera className="w-3 h-3 mr-1 text-red-500 animate-pulse" />
            AI Vision
          </Badge>
          <Badge
            variant="outline"
            className="bg-primary/20 text-primary border-primary/20 backdrop-blur-md uppercase tracking-wider text-[10px]"
          >
            {selectedExercise.name}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/20 hover:bg-black/40 text-white"
          onClick={() => navigate(-1)}
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Main Stats Area - Center/Top */}
      <div className="relative z-20 flex-1 flex flex-col items-center pt-8">
        {isActive && (
          <div className="flex flex-col items-center gap-1 animate-in slide-in-from-top-4 fade-in duration-500">
            <span className="text-6xl font-black text-white drop-shadow-lg tracking-tighter">
              {reps}
            </span>
            <span className="text-sm uppercase tracking-widest text-white/80 font-medium">
              Repetições
            </span>
          </div>
        )}
      </div>

      {/* Bottom Controls & Metrics */}
      <div className="relative z-20 p-6 pb-8 space-y-6">
        {/* Accuracy Meter */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-white/90">
            <span>Precisão do Movimento</span>
            <span>{Math.round(accuracy)}%</span>
          </div>
          <Progress value={accuracy} className="h-2 bg-white/10" />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-white/20 bg-black/40 text-white hover:bg-black/60 hover:text-white"
            onClick={handleReset}
          >
            <RotateCcw className="w-5 h-5" />
          </Button>

          <Button
            size="lg"
            className={cn(
              'h-20 w-20 rounded-full shadow-2xl border-4 transition-all duration-300 transform hover:scale-105 active:scale-95',
              isActive
                ? 'bg-red-500 border-red-200 hover:bg-red-600'
                : 'bg-primary border-primary-foreground/20 hover:bg-primary/90',
            )}
            onClick={handleToggle}
          >
            {isActive ? (
              <div className="h-6 w-6 bg-white rounded-sm" />
            ) : (
              <Play className="h-8 w-8 text-white ml-1 fill-current" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-white/20 bg-black/40 text-white hover:bg-black/60 hover:text-white"
          >
            <Settings2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
