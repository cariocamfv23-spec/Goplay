import { Championship } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChampionshipStore } from '@/stores/useChampionshipStore'
import { Trophy, Check } from 'lucide-react'
import { useState } from 'react'

interface ResultsTabProps {
  championship: Championship
}

export function ResultsTab({ championship }: ResultsTabProps) {
  const { matches, updateMatch } = useChampionshipStore()
  const champMatches = matches.filter(
    (m) => m.championshipId === championship.id,
  )
  const [editingId, setEditingId] = useState<string | null>(null)
  const [scores, setScores] = useState<{ a: string; b: string }>({
    a: '',
    b: '',
  })

  const startEdit = (match: any) => {
    setEditingId(match.id)
    setScores({
      a: match.scoreA?.toString() || '',
      b: match.scoreB?.toString() || '',
    })
  }

  const saveScore = (matchId: string) => {
    updateMatch(matchId, {
      scoreA: parseInt(scores.a) || 0,
      scoreB: parseInt(scores.b) || 0,
      status: 'completed',
    })
    setEditingId(null)
  }

  return (
    <div className="space-y-4">
      <h3 className="font-bold">Resultados</h3>
      <div className="space-y-3">
        {champMatches.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
            Nenhuma partida encontrada. Agende jogos no calendário.
          </div>
        ) : (
          champMatches.map((match) => (
            <Card key={match.id} className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="text-xs text-center text-muted-foreground mb-2 uppercase">
                  {match.round || 'Partida'} - {match.date}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 text-right font-bold truncate">
                    {match.teamA}
                  </div>
                  <div className="flex items-center gap-2 min-w-[100px] justify-center">
                    {editingId === match.id ? (
                      <>
                        <Input
                          className="w-10 h-8 p-1 text-center"
                          value={scores.a}
                          onChange={(e) =>
                            setScores({ ...scores, a: e.target.value })
                          }
                          type="number"
                        />
                        <span className="text-xs">x</span>
                        <Input
                          className="w-10 h-8 p-1 text-center"
                          value={scores.b}
                          onChange={(e) =>
                            setScores({ ...scores, b: e.target.value })
                          }
                          type="number"
                        />
                        <Button
                          size="icon"
                          className="h-8 w-8 ml-1"
                          onClick={() => saveScore(match.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <span className="text-xl font-black">
                          {match.scoreA ?? '-'}
                        </span>
                        <span className="text-xs text-muted-foreground">x</span>
                        <span className="text-xl font-black">
                          {match.scoreB ?? '-'}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex-1 text-left font-bold truncate">
                    {match.teamB}
                  </div>
                </div>
                {editingId !== match.id && (
                  <div className="mt-2 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-6"
                      onClick={() => startEdit(match)}
                    >
                      Atualizar Placar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
