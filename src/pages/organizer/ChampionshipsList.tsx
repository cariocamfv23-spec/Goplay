import { useChampionshipStore } from '@/stores/useChampionshipStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Trophy, ArrowRight, Calendar, Users, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function ChampionshipsList() {
  const { championships } = useChampionshipStore()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = championships.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600'
      case 'completed':
        return 'bg-zinc-500 hover:bg-zinc-600'
      case 'open':
        return 'bg-blue-500 hover:bg-blue-600'
      default:
        return 'bg-yellow-500 hover:bg-yellow-600'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Em Andamento'
      case 'completed':
        return 'Finalizado'
      case 'open':
        return 'Inscrições'
      default:
        return 'Rascunho'
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Meus Torneios
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie suas competições
          </p>
        </div>
        <Button
          onClick={() => navigate('/organizer/create')}
          className="rounded-full h-10 w-10 p-0 shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar campeonato..."
          className="pl-9 bg-secondary border-none rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-10 opacity-60">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground">
              Nenhum campeonato encontrado.
            </p>
            <Button
              variant="link"
              onClick={() => navigate('/organizer/create')}
              className="mt-2 text-primary"
            >
              Criar o primeiro
            </Button>
          </div>
        ) : (
          filtered.map((champ) => (
            <Card
              key={champ.id}
              className="border-none shadow-md cursor-pointer hover:scale-[1.01] transition-transform overflow-hidden"
              onClick={() => navigate(`/organizer/${champ.id}`)}
            >
              <div className="h-2 bg-gradient-to-r from-primary to-purple-600" />
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg leading-tight">
                    {champ.name}
                  </h3>
                  <Badge
                    className={`${getStatusColor(champ.status)} text-white border-none`}
                  >
                    {getStatusLabel(champ.status)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {champ.description}
                </p>
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Trophy className="h-3.5 w-3.5" />
                    {champ.modality}
                  </span>
                  {champ.startDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(champ.startDate).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
