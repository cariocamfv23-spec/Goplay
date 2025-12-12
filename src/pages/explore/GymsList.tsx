import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Filter, Dumbbell, Star, MapPin } from 'lucide-react'
import { mockGyms } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function GymsList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  // Duplicating mock data
  const gyms = [...mockGyms, ...mockGyms, ...mockGyms].map((g, i) => ({
    ...g,
    id: `${g.id}-${i}`,
  }))

  const filteredGyms = gyms.filter((gym) =>
    gym.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar academias, box..."
              className="pl-9 bg-secondary border-none rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 rounded-xl">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant="default"
            size="sm"
            className="rounded-full px-4 shadow-sm"
          >
            Todos
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full px-4 shadow-sm"
          >
            Musculação
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full px-4 shadow-sm"
          >
            CrossFit
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full px-4 shadow-sm"
          >
            Artes Marciais
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-primary" />
          Academias Parceiras
        </h2>

        {filteredGyms.map((gym) => (
          <Card
            key={gym.id}
            className="overflow-hidden border-none shadow-md cursor-pointer active:scale-[0.99] transition-transform"
            onClick={() => navigate(`/gyms/${gym.id.split('-')[0]}`)}
          >
            <div className="flex h-32">
              <div className="w-32 shrink-0">
                <img
                  src={`https://img.usecurling.com/p/300/300?q=${gym.img}&dpr=2`}
                  className="w-full h-full object-cover"
                  alt={gym.name}
                />
              </div>
              <CardContent className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm line-clamp-1 mb-1">
                    {gym.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {gym.location}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {gym.amenities.slice(0, 2).map((item, i) => (
                      <span
                        key={i}
                        className="text-[9px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-primary font-bold text-xs bg-primary/10 px-2 py-0.5 rounded">
                    {gym.plans[0].split(' - ')[1]}
                  </span>
                  <div className="flex items-center text-[10px] font-bold">
                    <Star className="h-3 w-3 mr-1 fill-gold text-gold" />{' '}
                    {gym.rating}
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}

        {filteredGyms.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <Dumbbell className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Nenhuma academia encontrada.</p>
          </div>
        )}
      </div>
    </div>
  )
}
