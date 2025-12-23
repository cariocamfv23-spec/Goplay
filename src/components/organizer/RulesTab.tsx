import { Championship } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useChampionshipStore } from '@/stores/useChampionshipStore'
import { Save } from 'lucide-react'
import { useState } from 'react'

interface RulesTabProps {
  championship: Championship
}

export function RulesTab({ championship }: RulesTabProps) {
  const { updateChampionship } = useChampionshipStore()
  const [rules, setRules] = useState(championship.rules || '')

  const handleSave = () => {
    updateChampionship(championship.id, { rules })
  }

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-bold">Regulamento e Informações</h3>
            <p className="text-xs text-muted-foreground">
              Descreva as regras, formato de disputa e premiação.
            </p>
            <Textarea
              className="min-h-[200px]"
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              placeholder="Digite aqui o regulamento do campeonato..."
            />
          </div>
          <Button onClick={handleSave} className="w-full gap-2">
            <Save className="h-4 w-4" /> Salvar Regulamento
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
