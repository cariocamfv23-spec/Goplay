import { mockRetrospective } from '@/lib/data'
import { Trophy, Clock, PlayCircle } from 'lucide-react'

export default function StatsSlide() {
  return (
    <div className="flex flex-col h-full w-full p-8 text-white">
      <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-12 animate-in slide-in-from-top-4 fade-in duration-700">
        Histórico
      </h3>

      <div className="flex-1 flex flex-col justify-center space-y-8">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-[2rem] border border-white/20 shadow-xl animate-in slide-in-from-right fade-in duration-700 delay-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm opacity-80 uppercase font-medium">
                Categoria Top
              </p>
              <h4 className="text-4xl font-black mt-1">
                {mockRetrospective.stats.topCategory}
              </h4>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary">
              <Trophy className="w-6 h-6 fill-current" />
            </div>
          </div>
          <p className="text-xs opacity-60">
            Você é fanático por {mockRetrospective.stats.topCategory}!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/20 backdrop-blur-sm p-5 rounded-3xl animate-in slide-in-from-bottom-8 fade-in duration-700 delay-400">
            <PlayCircle className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-3xl font-bold">
              {mockRetrospective.stats.videosWatched}
            </p>
            <p className="text-xs opacity-70 mt-1">Vídeos Assistidos</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-5 rounded-3xl animate-in slide-in-from-bottom-8 fade-in duration-700 delay-500">
            <Clock className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-3xl font-bold">
              {mockRetrospective.stats.hoursWatched}h
            </p>
            <p className="text-xs opacity-70 mt-1">Horas de Conteúdo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
