import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Filter, Baby, MapPin, Check, Star } from 'lucide-react'
import { mockKidsVenues } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function KidsFriendlyList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filteredVenues = mockKidsVenues.filter((venue) =>
    venue.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4">
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="-ml-2"
          >
            <span className="sr-only">Voltar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left h-5 w-5"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </Button>
          <h1 className="text-lg font-bold truncate">
            Locais Esportivos com Recreação Infantil
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar locais kids..."
              className="pl-9 bg-secondary border-none rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 rounded-xl">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredVenues.map((venue) => (
          <Card
            key={venue.id}
            className="overflow-hidden border-none shadow-md cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="relative h-44">
              <img
                src={venue.image}
                className="w-full h-full object-cover"
                alt={venue.name}
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
                <Star className="h-3 w-3 fill-gold text-gold" /> {venue.rating}
              </div>
              <div className="absolute bottom-2 left-2 flex gap-2">
                <Badge
                  variant="secondary"
                  className={`backdrop-blur shadow-sm ${
                    venue.isFree
                      ? 'bg-green-500/90 text-white'
                      : 'bg-yellow-500/90 text-white'
                  }`}
                >
                  {venue.isFree ? 'Grátis' : 'Pago'}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`backdrop-blur shadow-sm ${
                    venue.hasMonitors
                      ? 'bg-blue-500/90 text-white'
                      : 'bg-gray-500/90 text-white'
                  }`}
                >
                  {venue.hasMonitors ? 'Com Monitores' : 'Sem Monitores'}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-1">{venue.name}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                <MapPin className="h-3 w-3" /> {venue.location}
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {venue.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                  <Baby className="h-3 w-3" /> Atividades para Crianças
                </h4>
                <div className="flex flex-wrap gap-2">
                  {venue.activities.map((activity, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-[10px] py-0 h-6 border-pink-200 bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:border-pink-800 dark:text-pink-300"
                    >
                      <Check className="h-2 w-2 mr-1" /> {activity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredVenues.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <Baby className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Nenhum local encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
