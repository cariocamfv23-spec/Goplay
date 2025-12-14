import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Search, Filter, Trophy, Star, Users } from 'lucide-react'
import { mockTalents, ProfileData } from '@/lib/data'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { TalentUnlockDrawer } from '@/components/TalentUnlockDrawer'

export default function TalentsList() {
  const [search, setSearch] = useState('')
  const [selectedTalent, setSelectedTalent] = useState<ProfileData | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const filteredTalents = mockTalents.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.sport?.toLowerCase().includes(search.toLowerCase()) ||
      t.position?.toLowerCase().includes(search.toLowerCase()),
  )

  const handleTalentClick = (talent: ProfileData) => {
    setSelectedTalent(talent)
    setIsDrawerOpen(true)
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" /> Scouts & Talentos
          </h1>
          <Button variant="ghost" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, esporte ou posição..."
            className="pl-9 bg-secondary border-none rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Intro Banner */}
        <div className="bg-gradient-to-r from-indigo-900 to-primary rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-bold text-lg mb-1">Área do Recrutador</h2>
            <p className="text-xs text-white/80 max-w-[80%]">
              Encontre as próximas estrelas do esporte. Acesse relatórios
              detalhados e entre em contato direto.
            </p>
          </div>
          <Trophy className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">Atletas em Destaque</h2>
          <div className="space-y-3">
            {filteredTalents.map((talent) => (
              <Card
                key={talent.id}
                className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99]"
                onClick={() => handleTalentClick(talent)}
              >
                <CardContent className="p-0 flex">
                  {/* Left Side Image */}
                  <div className="w-28 relative">
                    <img
                      src={talent.avatar}
                      alt={talent.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-black/60 hover:bg-black/70 backdrop-blur-sm border-none text-[10px] h-5">
                        {talent.sport}
                      </Badge>
                    </div>
                  </div>

                  {/* Right Side Content */}
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm leading-tight">
                          {talent.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs font-bold text-gold">
                          <Star className="h-3 w-3 fill-current" />
                          {talent.rating}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {talent.position} • {talent.age} anos
                      </p>
                      <div className="flex gap-2 mt-2 text-[10px] text-muted-foreground">
                        <span className="bg-secondary px-1.5 py-0.5 rounded">
                          {talent.height}
                        </span>
                        <span className="bg-secondary px-1.5 py-0.5 rounded">
                          {talent.weight}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50">
                      <div className="text-[10px]">
                        <span className="font-bold">
                          {talent.stats?.matches}
                        </span>{' '}
                        Jogos
                      </div>
                      <Button
                        size="sm"
                        className="h-7 text-xs px-3 bg-indigo-600 hover:bg-indigo-700"
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <TalentUnlockDrawer
        athlete={selectedTalent}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  )
}
