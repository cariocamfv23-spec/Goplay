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
import { AlertCircle, Dumbbell, Zap, CalendarPlus } from 'lucide-react'
import { toast } from 'sonner'

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
      <Card className="border-dashed border-2 bg-muted/30">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Dumbbell className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
          <p className="text-muted-foreground text-sm">
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
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Zap className="h-5 w-5 text-gold" />
          Sugestões do AI Coach
        </h3>
        <Badge variant="outline" className="border-gold/30 text-yellow-700">
          Personalizado
        </Badge>
      </div>

      {suggestions.map((suggestion) => (
        <Card
          key={suggestion.id}
          className="overflow-hidden border-none shadow-md bg-card"
        >
          <div className="border-l-4 border-primary">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={suggestion.id} className="border-none">
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex flex-col items-start text-left gap-1 w-full">
                    <div className="flex items-center gap-2 w-full">
                      <span className="font-bold text-base">
                        {suggestion.title}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`ml-auto text-[10px] ${
                          suggestion.difficulty === 'Avançado'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : suggestion.difficulty === 'Intermediário'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        }`}
                      >
                        {suggestion.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <AlertCircle className="h-3 w-3 text-primary" />
                      <span>{suggestion.reason}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <p className="text-sm text-foreground/80 mb-3">
                    {suggestion.description}
                  </p>

                  <div className="space-y-2 bg-secondary/30 rounded-lg p-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Exercícios Recomendados
                    </h4>
                    {suggestion.exercises.map((exercise, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center text-sm border-b border-border/50 last:border-0 pb-2 last:pb-0"
                      >
                        <span className="font-medium flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {exercise.name}
                        </span>
                        <span className="text-muted-foreground text-xs whitespace-nowrap">
                          {exercise.sets} x {exercise.reps}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <Button className="h-8 text-xs rounded-full bg-primary/10 text-primary hover:bg-primary/20 shadow-none border border-primary/20">
                      Ver Detalhes
                    </Button>
                    <Button
                      onClick={() => handleAddToCalendar(suggestion.title)}
                      className="h-8 text-xs rounded-full"
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
