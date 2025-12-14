import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TrainingSuggestion } from '@/lib/data'
import { AlertCircle, Zap, CalendarPlus } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface TrainingSuggestionsProps {
  suggestions: TrainingSuggestion[]
}

export function TrainingSuggestions({ suggestions }: TrainingSuggestionsProps) {
  const handleAddToCalendar = (title: string) => {
    toast.success('Treino Agendado!', {
      description: `${title} foi adicionado ao seu calendário para amanhã.`,
      icon: <CalendarPlus className="h-4 w-4 text-primary" />,
    })
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <Card className="border-dashed border-2 bg-zinc-900/30 border-zinc-800">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Zap className="h-8 w-8 text-zinc-600 mb-2 opacity-50" />
          <p className="text-zinc-500 text-sm">
            Nenhuma sugestão disponível no momento.
            <br />
            Continue jogando para gerar dados!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg flex items-center gap-2 text-white">
          <Zap className="h-5 w-5 text-primary" />
          Sugestões do AI Coach
        </h3>
        <Badge variant="outline" className="border-primary/30 text-primary">
          Personalizado
        </Badge>
      </div>

      {suggestions.map((suggestion) => (
        <Card
          key={suggestion.id}
          className="overflow-hidden border-none shadow-md bg-zinc-900"
        >
          <div className="border-l-4 border-primary">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={suggestion.id} className="border-none">
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex flex-col items-start text-left gap-1 w-full">
                    <div className="flex items-center gap-2 w-full">
                      <span className="font-bold text-base text-zinc-100">
                        {suggestion.title}
                      </span>
                      <Badge
                        variant="secondary"
                        className={cn(
                          'ml-auto text-[10px]',
                          suggestion.difficulty === 'Avançado'
                            ? 'bg-red-900/30 text-red-400'
                            : suggestion.difficulty === 'Intermediário'
                              ? 'bg-yellow-900/30 text-yellow-400'
                              : 'bg-green-900/30 text-green-400',
                        )}
                      >
                        {suggestion.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <AlertCircle className="h-3 w-3 text-primary" />
                      <span>{suggestion.reason}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <p className="text-sm text-zinc-300 mb-3">
                    {suggestion.description}
                  </p>

                  <div className="space-y-2 bg-zinc-950/50 rounded-lg p-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                      Exercícios Recomendados
                    </h4>
                    {suggestion.exercises.map((exercise, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center text-sm border-b border-zinc-800 last:border-0 pb-2 last:pb-0"
                      >
                        <span className="font-medium flex items-center gap-2 text-zinc-200">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {exercise.name}
                        </span>
                        <span className="text-zinc-500 text-xs whitespace-nowrap">
                          {exercise.sets} x {exercise.reps}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs rounded-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      Ver Detalhes
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCalendar(suggestion.title)}
                      className="h-8 text-xs rounded-full bg-white text-black hover:bg-zinc-200"
                    >
                      <CalendarPlus className="h-3 w-3 mr-1" /> Agendar
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Card>
      ))}
    </div>
  )
}
