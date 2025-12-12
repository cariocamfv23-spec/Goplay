import { Button } from '@/components/ui/button'
import { ArrowLeft, History, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockEvolution } from '@/lib/data'

export default function EvolutionMode() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="p-4 border-b flex items-center gap-4 bg-background sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">Modo Evolução</h1>
      </div>

      <div className="p-4">
        <div className="relative border-l-2 border-primary/30 ml-4 space-y-10 my-6">
          {mockEvolution.map((event, index) => (
            <div key={index} className="relative pl-8">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-background" />
              <span className="text-sm font-bold text-primary mb-1 block">
                {event.year}
              </span>
              <div className="bg-card shadow-sm border border-border/50 rounded-xl p-4">
                <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {event.description}
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center bg-secondary/30 rounded p-2">
                    <div className="text-xs text-muted-foreground">Vel</div>
                    <div className="font-bold">{event.stats.speed}</div>
                  </div>
                  <div className="text-center bg-secondary/30 rounded p-2">
                    <div className="text-xs text-muted-foreground">Força</div>
                    <div className="font-bold">{event.stats.power}</div>
                  </div>
                  <div className="text-center bg-secondary/30 rounded p-2">
                    <div className="text-xs text-muted-foreground">Téc</div>
                    <div className="font-bold">{event.stats.technique}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-primary to-purple-800 rounded-2xl p-6 text-white text-center">
          <Trophy className="h-12 w-12 mx-auto mb-2 text-gold" />
          <h2 className="text-2xl font-bold mb-2">Meu Ano no Goplay</h2>
          <p className="text-white/80 mb-4 text-sm">
            Veja seu relatório completo de performance anual.
          </p>
          <Button variant="secondary" className="rounded-full w-full">
            <History className="mr-2 h-4 w-4" /> Gerar Retrospectiva
          </Button>
        </div>
      </div>
    </div>
  )
}
