import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Scan,
  Zap,
  Shield,
  Info,
  Trophy,
  Play,
  RotateCcw,
  Timer,
  Maximize2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { AppIcon } from '@/components/AppIcon'
import { ArTarget, ArTargetData } from '@/components/ar/ArTarget'
import useSoundStore from '@/stores/useSoundStore'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function ArenaMode() {
  const navigate = useNavigate()
  const { playSound } = useSoundStore()

  // Game State
  const [gameState, setGameState] = useState<
    'scanning' | 'ready' | 'playing' | 'finished'
  >('scanning')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [targets, setTargets] = useState<ArTargetData[]>([])
  const [combo, setCombo] = useState(0)

  // Refs for loops
  const requestRef = useRef<number>(0)
  const lastSpawnTime = useRef<number>(0)

  // --- Lifecycle & Game Loop ---

  useEffect(() => {
    // Initial Scanning Phase
    const timer = setTimeout(() => {
      setGameState('ready')
      playSound('notification_store') // Ready sound
    }, 3000)
    return () => clearTimeout(timer)
  }, [playSound])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (gameState === 'playing') {
      // Timer Logic
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      // Start Game Loop for Spawning
      requestRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      clearInterval(interval)
      cancelAnimationFrame(requestRef.current)
    }
  }, [gameState])

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setTimeLeft(60)
    setTargets([])
    setCombo(0)
    playSound('like_generic')
  }

  const endGame = () => {
    setGameState('finished')
    playSound('notification_points')
    if (score > 0) {
      toast.success('Treino Finalizado!', {
        description: `Você fez ${score} pontos com um combo máximo de ${combo}x!`,
      })
    }
  }

  const gameLoop = (timestamp: number) => {
    if (!lastSpawnTime.current) lastSpawnTime.current = timestamp

    // Spawn target every 1.5 - 3 seconds depending on combo
    const spawnRate = Math.max(800, 2000 - combo * 100)

    if (timestamp - lastSpawnTime.current > spawnRate) {
      spawnTarget()
      lastSpawnTime.current = timestamp
    }

    // Clean up expired targets
    setTargets((prev) => prev.filter((t) => t.expiresAt > Date.now()))

    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(gameLoop)
    }
  }

  const spawnTarget = () => {
    const id = Math.random().toString(36).substr(2, 9)
    // Random position within safe area (10-90%)
    const x = 15 + Math.random() * 70
    const y = 20 + Math.random() * 60

    // Determine type based on RNG
    const rng = Math.random()
    let type: ArTargetData['type'] = 'standard'
    let value = 100
    let duration = 4000

    if (rng > 0.9) {
      type = 'bonus'
      value = 300
      duration = 2000 // Bonus expires faster
    } else if (rng < 0.1) {
      type = 'hazard'
      value = -150
      duration = 5000
    }

    const newTarget: ArTargetData = {
      id,
      x,
      y,
      type,
      value,
      expiresAt: Date.now() + duration,
    }

    setTargets((prev) => [...prev, newTarget])
  }

  const handleInteraction = (
    id: string,
    value: number,
    type: ArTargetData['type'],
  ) => {
    // Remove target immediately visually
    setTargets((prev) => prev.filter((t) => t.id !== id))

    if (type === 'hazard') {
      // Penalty
      setScore((prev) => Math.max(0, prev + value))
      setCombo(0)
      // @ts-expect-error - using valid sound key
      playSound('notification_store') // Using generic error-ish sound if available or fallback
      // Trigger visual shake?
      const body = document.querySelector('body')
      if (body) {
        body.classList.add('animate-shake')
        setTimeout(() => body.classList.remove('animate-shake'), 500)
      }
    } else {
      // Success
      const comboMultiplier = 1 + combo * 0.1
      const finalPoints = Math.round(value * comboMultiplier)

      setScore((prev) => prev + finalPoints)
      setCombo((prev) => Math.min(prev + 1, 10))

      if (type === 'bonus') {
        // @ts-expect-error - using valid sound key
        playSound('notification_points')
      } else {
        // @ts-expect-error - using valid sound key
        playSound('like_generic')
      }
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col font-sans touch-none select-none">
      {/* --- AR Layer: Camera Feed --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://img.usecurling.com/p/600/1000?q=soccer%20field%20pov&dpr=2"
          alt="AR View"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* AR Grid & Atmosphere */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary),0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary),0.15)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30 [transform:perspective(1000px)_rotateX(20deg)] pointer-events-none" />

        {/* Field Lines Augmentation */}
        {gameState !== 'scanning' && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden animate-pulse-slow">
            <div className="absolute top-[35%] left-[10%] w-[80%] h-[40%] border-2 border-primary/20 rounded-[40px] transform rotate-x-60"></div>
            <div className="absolute top-[25%] left-[40%] w-[20%] h-[10%] border border-gold/30 rounded-full"></div>
          </div>
        )}
      </div>

      {/* --- Gameplay Layer: Targets --- */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Interactive area needs pointer-events-auto */}
        <div className="w-full h-full pointer-events-auto">
          {targets.map((target) => (
            <ArTarget
              key={target.id}
              data={target}
              onInteract={handleInteraction}
            />
          ))}
        </div>
      </div>

      {/* --- HUD Layer: UI --- */}
      <div className="relative z-20 flex-1 flex flex-col p-4 pointer-events-none">
        {/* Top Bar */}
        <div className="flex justify-between items-start pointer-events-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10 rounded-full backdrop-blur-md bg-black/30 border border-white/10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>

          {/* Mode Badge */}
          <div className="flex flex-col items-center">
            <div className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary/30 text-xs text-white flex items-center gap-2 shadow-lg">
              <AppIcon className="w-4 h-4" />
              <span className="font-bold tracking-widest text-primary">
                ARENA MODE
              </span>
              <span
                className={cn(
                  'w-2 h-2 rounded-full ml-1',
                  gameState === 'playing'
                    ? 'bg-green-500 animate-pulse'
                    : 'bg-red-500',
                )}
              />
            </div>

            {/* Timer Display */}
            {gameState === 'playing' && (
              <div className="mt-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-white font-mono text-sm flex items-center gap-2">
                <Timer className="h-3 w-3 text-gold" />
                {timeLeft}s
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 rounded-full backdrop-blur-md bg-black/30 border border-white/10"
            onClick={() => {
              toast.info('Toque nos alvos para marcar pontos!', {
                description:
                  'Evite os alvos vermelhos. Alvos dourados valem mais!',
              })
            }}
          >
            <Info className="h-6 w-6" />
          </Button>
        </div>

        {/* Center Content based on State */}
        <div className="flex-1 flex items-center justify-center pointer-events-auto">
          {/* Scanning State */}
          {gameState === 'scanning' && (
            <div className="relative w-64 h-64 border border-white/10 rounded-2xl animate-pulse">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary shadow-[0_0_15px_hsl(var(--primary))]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary shadow-[0_0_15px_hsl(var(--primary))]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary shadow-[0_0_15px_hsl(var(--primary))]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary shadow-[0_0_15px_hsl(var(--primary))]" />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-primary/5 backdrop-blur-sm rounded-2xl">
                <Scan className="h-12 w-12 text-primary animate-spin-slow" />
                <p className="text-primary font-mono text-sm tracking-widest animate-pulse">
                  ESCANEANDO...
                </p>
              </div>

              {/* Scan Line */}
              <div className="absolute left-0 right-0 h-0.5 bg-primary/80 shadow-[0_0_10px_hsl(var(--primary))] animate-scan-down" />
            </div>
          )}

          {/* Ready State */}
          {gameState === 'ready' && (
            <div className="text-center animate-in zoom-in fade-in duration-500">
              <h1 className="text-4xl font-black text-white italic tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                ARENA <span className="text-primary">PRONTA</span>
              </h1>
              <Button
                size="lg"
                className="h-16 px-8 rounded-full text-lg font-bold bg-primary hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.4)] animate-bounce"
                onClick={startGame}
              >
                <Play className="mr-2 h-6 w-6 fill-current" /> COMEÇAR
              </Button>
            </div>
          )}

          {/* Finished State */}
          {gameState === 'finished' && (
            <div className="bg-black/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-center animate-in zoom-in fade-in duration-500 max-w-sm w-full mx-4 shadow-2xl">
              <Trophy className="h-16 w-16 text-gold mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-white mb-1">
                Fim de Treino!
              </h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Sua performance na Arena
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-2xl">
                  <p className="text-xs text-muted-foreground uppercase mb-1">
                    Pontuação
                  </p>
                  <p className="text-3xl font-black text-primary">{score}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl">
                  <p className="text-xs text-muted-foreground uppercase mb-1">
                    Max Combo
                  </p>
                  <p className="text-3xl font-black text-gold">{combo}x</p>
                </div>
              </div>

              <Button
                className="w-full h-12 rounded-xl text-base font-bold bg-white text-black hover:bg-white/90"
                onClick={startGame}
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Tentar Novamente
              </Button>
            </div>
          )}
        </div>

        {/* Bottom HUD - Always visible mostly */}
        <div className="mt-auto grid grid-cols-3 gap-4">
          {/* Score Card */}
          <div className="col-span-1 bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-primary mb-1">
              <Trophy className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Score
              </span>
            </div>
            <div className="text-2xl font-black text-white leading-none">
              {score}
            </div>
          </div>

          {/* Combo Indicator */}
          <div className="col-span-1 flex flex-col items-center justify-end pb-2">
            {combo > 1 && (
              <div className="animate-in slide-in-from-bottom-4 fade-in duration-300">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-t from-gold to-yellow-200 italic drop-shadow-lg">
                  {combo}x
                </span>
                <span className="block text-[10px] text-gold font-bold uppercase tracking-widest text-center -mt-1">
                  COMBO
                </span>
              </div>
            )}
          </div>

          {/* Stats Card */}
          <div className="col-span-1 bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-blue-400 mb-1">
              <Shield className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Defesa
              </span>
            </div>
            <div className="text-2xl font-black text-white leading-none">
              85%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
