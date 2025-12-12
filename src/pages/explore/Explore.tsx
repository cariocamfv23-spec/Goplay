import { Input } from '@/components/ui/input'
import { Search, MapPin, SlidersHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockEvents } from '@/lib/data'

const Explore = () => {
  const categories = [
    'Atletas',
    'Clubes',
    'Eventos',
    'Quadras',
    'Vagas',
    'Treinadores',
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Search Header */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar atletas, eventos..."
            className="pl-9 rounded-full bg-secondary border-none"
          />
        </div>
        <Button variant="outline" size="icon" className="rounded-full shrink-0">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant="outline"
            className="px-3 py-1.5 text-sm font-normal rounded-full cursor-pointer hover:bg-primary hover:text-white transition-colors"
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Featured Events */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Eventos em Destaque</h2>
          <Button variant="link" className="text-primary p-0 h-auto">
            Ver todos
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {mockEvents.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden border-none shadow-md"
            >
              <div className="relative h-32 bg-gray-200">
                <img
                  src={event.image}
                  className="w-full h-full object-cover"
                  alt={event.title}
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-primary">
                  {event.date}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold mb-1">{event.title}</h3>
                <div className="flex items-center text-muted-foreground text-xs gap-1 mb-3">
                  <MapPin className="h-3 w-3" /> {event.location}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gold">
                    {event.price}
                  </span>
                  <Button size="sm" className="rounded-full h-8">
                    Inscrever-se
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Explore
