import { mockRetrospectiveHistory } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useRetrospectiveStore } from '@/stores/useRetrospectiveStore'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { EvolutionChart } from '@/components/EvolutionChart'

export default function EvolutionSlide() {
  const { getTheme } = useRetrospectiveStore()
  const currentTheme = getTheme()

  const currentYear = mockRetrospectiveHistory[0]
  const previousYear = mockRetrospectiveHistory[1]

  const growthMatches =
    ((currentYear.stats.matches - previousYear.stats.matches) /
      previousYear.stats.matches) *
    100
  const growthRating =
    ((currentYear.stats.rating - previousYear.stats.rating) /
      previousYear.stats.rating) *
    100

  const renderTrend = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
    if (value < 0) return <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
    return <Minus className="w-4 h-4 text-gray-400 mr-1" />
  }

  return (
    <div className="flex flex-col h-full w-full p-6 text-white overflow-hidden">
      <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-6 animate-in slide-in-from-top-4 fade-in duration-700">
        Sua Evolução
      </h3>

      <div className="flex-1 flex flex-col space-y-6">
        {/* Main Stats Comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 animate-in slide-in-from-left fade-in duration-700 delay-200">
            <span className="text-xs opacity-60 uppercase font-bold">
              Partidas
            </span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-3xl font-black">
                {currentYear.stats.matches}
              </span>
              <div className="flex items-center text-xs font-bold mb-1.5">
                {renderTrend(growthMatches)}
                <span
                  className={
                    growthMatches > 0
                      ? 'text-green-400'
                      : growthMatches < 0
                        ? 'text-red-400'
                        : 'text-gray-400'
                  }
                >
                  {Math.abs(growthMatches).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 animate-in slide-in-from-right fade-in duration-700 delay-300">
            <span className="text-xs opacity-60 uppercase font-bold">
              Rating
            </span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-3xl font-black">
                {currentYear.stats.rating}
              </span>
              <div className="flex items-center text-xs font-bold mb-1.5">
                {renderTrend(growthRating)}
                <span
                  className={
                    growthRating > 0
                      ? 'text-green-400'
                      : growthRating < 0
                        ? 'text-red-400'
                        : 'text-gray-400'
                  }
                >
                  {Math.abs(growthRating).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <p className="text-lg leading-relaxed font-light opacity-90">
            Você jogou <span className="font-bold text-gold">mais</span> e com{' '}
            <span className="font-bold text-primary">melhor qualidade</span>{' '}
            comparado a 2023. O esforço valeu a pena!
          </p>
        </div>

        {/* Chart */}
        <div className="flex-1 animate-in fade-in zoom-in duration-700 delay-700 relative">
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0 rounded-2xl',
            )}
          />
          <EvolutionChart data={mockRetrospectiveHistory} />
        </div>
      </div>
    </div>
  )
}
