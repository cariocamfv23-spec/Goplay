import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  History,
  TrendingUp,
  Zap,
  Activity,
  Dumbbell,
  Sparkles,
  Layers,
  ChevronRight,
  Target,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock Data for demonstration
const COMPARISON_DATA = {
  current: {
    speed: 32.5,
    strength: 88,
    stamina: 92,
    technique: 85,
    overall: 89,
  },
  history: {
    '1m': {
      speed: 31.8,
      strength: 86,
      stamina: 90,
      technique: 84,
      overall: 87,
      date: 'Mês passado',
    },
    '3m': {
      speed: 30.2,
      strength: 82,
      stamina: 85,
      technique: 80,
      overall: 84,
      date: '3 Meses atrás',
    },
    '6m': {
      speed: 28.5,
      strength: 75,
      stamina: 78,
      technique: 72,
      overall: 78,
      date: '6 Meses atrás',
    },
    '1y': {
      speed: 25.0,
      strength: 65,
      stamina: 70,
      technique: 65,
      overall: 70,
      date: '1 Ano atrás',
    },
  },
}

type Timeframe = keyof typeof COMPARISON_DATA.history

export default function AiAvatar() {
  const navigate = useNavigate()
  const [compareMode, setCompareMode] = useState(false)
  const [timeframe, setTimeframe] = useState<Timeframe>('3m')

  const currentStats = COMPARISON_DATA.current
  const pastStats = COMPARISON_DATA.history[timeframe]

  const calculateGrowth = (current: number, past: number) => {
    const diff = current - past
    return diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1)
  }

  const StatRow = ({
    label,
    icon: Icon,
    current,
    past,
    unit = '',
  }: {
    label: string
    icon: any
    current: number
    past: number
    unit?: string
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/5 text-zinc-400">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-200">{label}</p>
          {compareMode && (
            <p className="text-[10px] text-zinc-500">
              Era {past}
              {unit}
            </p>
          )}
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center justify-end gap-2">
          <span className="text-lg font-bold text-white">
            {current}
            {unit}
          </span>
          {compareMode && (
            <Badge className="bg-green-500/20 text-green-400 border-0 text-[10px] px-1.5 py-0">
              {calculateGrowth(current, past)}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans animate-fade-in relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black to-black opacity-40 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-10" />

      {/* Header */}
      <div className="relative z-20 flex items-center justify-between p-4 pt-safe">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">
            <Sparkles className="h-4 w-4 text-cyan-400" /> AI Avatar
          </h1>
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
            Evolução Corporal
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'rounded-full transition-all duration-300',
            compareMode
              ? 'bg-primary text-white shadow-[0_0_15px_hsl(var(--primary)/0.5)]'
              : 'text-zinc-400 hover:bg-white/10',
          )}
          onClick={() => setCompareMode(!compareMode)}
        >
          <Layers className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Avatar Viewer */}
      <div className="flex-1 relative flex items-center justify-center -mt-10">
        {/* 3D Grid Floor */}
        <div className="absolute bottom-0 w-[200%] h-1/2 bg-[linear-gradient(transparent_0%,_rgba(0,255,255,0.1)_100%)] opacity-30 [transform:perspective(500px)_rotateX(60deg)] pointer-events-none" />

        <div className="relative w-full max-w-sm aspect-[3/4] flex items-center justify-center">
          {/* Past Avatar (Ghost) */}
          <div
            className={cn(
              'absolute inset-0 transition-all duration-700 ease-out transform',
              compareMode
                ? 'opacity-60 scale-95 translate-x-[-15%] filter grayscale contrast-125 brightness-50'
                : 'opacity-0 scale-90',
            )}
          >
            <img
              src="https://img.usecurling.com/p/600/800?q=wireframe%20human%20body%203d&color=red"
              alt="Past Avatar"
              className="w-full h-full object-contain mix-blend-screen"
            />
            <div className="absolute top-1/4 left-0 bg-red-500/20 text-red-300 text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md border border-red-500/30">
              {pastStats.date}
            </div>
          </div>

          {/* Current Avatar */}
          <div
            className={cn(
              'relative z-10 w-full h-full transition-all duration-700 transform',
              compareMode ? 'translate-x-[15%]' : 'translate-x-0',
            )}
          >
            <img
              src="https://img.usecurling.com/p/600/800?q=futuristic%20cyborg%20athlete%20full%20body&color=cyan"
              alt="Current Avatar"
              className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            />
            {compareMode && (
              <div className="absolute top-1/4 right-0 bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md border border-cyan-500/30">
                Atualmente
              </div>
            )}
          </div>
        </div>

        {/* Floating Metrics Tags on Avatar */}
        {!compareMode && (
          <>
            <div className="absolute top-[30%] left-[20%] animate-bounce [animation-duration:3s]">
              <Badge className="bg-black/50 backdrop-blur border-primary/50 text-primary hover:bg-black/60">
                VO2 Max {currentStats.stamina}
              </Badge>
            </div>
            <div className="absolute top-[50%] right-[15%] animate-bounce [animation-duration:4s]">
              <Badge className="bg-black/50 backdrop-blur border-gold/50 text-gold hover:bg-black/60">
                Força {currentStats.strength}
              </Badge>
            </div>
          </>
        )}
      </div>

      {/* Controls & Stats Panel */}
      <div className="bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 rounded-t-3xl relative z-20 pb-safe">
        {/* Timeframe Selector (Only visible in compare mode) */}
        {compareMode && (
          <div className="px-6 py-4 border-b border-white/5">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-medium">
              <span>Histórico de Comparação</span>
              <span className="text-primary">{pastStats.date}</span>
            </div>
            <div className="flex justify-between gap-2">
              {(['1m', '3m', '6m', '1y'] as Timeframe[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-xs font-bold transition-all',
                    timeframe === t
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10',
                  )}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 space-y-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Activity className="h-4 w-4" /> Métricas Corporais
            </h3>
            {compareMode && (
              <Badge
                variant="outline"
                className="border-green-500/30 text-green-400 bg-green-500/10 gap-1"
              >
                <TrendingUp className="h-3 w-3" /> Evolução Global
              </Badge>
            )}
          </div>

          <StatRow
            label="Velocidade"
            icon={Zap}
            current={currentStats.speed}
            past={pastStats.speed}
            unit="km/h"
          />
          <StatRow
            label="Força Muscular"
            icon={Dumbbell}
            current={currentStats.strength}
            past={pastStats.strength}
          />
          <StatRow
            label="Resistência"
            icon={History}
            current={currentStats.stamina}
            past={pastStats.stamina}
          />
          <StatRow
            label="Técnica"
            icon={Target}
            current={currentStats.technique}
            past={pastStats.technique}
          />

          {!compareMode && (
            <Button
              className="w-full mt-6 bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 text-white border-0 h-12 rounded-xl font-bold shadow-lg shadow-cyan-900/20"
              onClick={() => setCompareMode(true)}
            >
              Comparar Evolução <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
