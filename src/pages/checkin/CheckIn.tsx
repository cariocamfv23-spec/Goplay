import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckInModal } from '@/components/CheckInModal'
import {
  MapPin,
  Search,
  Navigation,
  QrCode,
  Building2,
  Dumbbell,
  Trophy,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const nearbyVenues = [
  {
    id: '1',
    name: 'Arena Tatuapé',
    distance: '0.5km',
    type: 'Quadra',
    points: 150,
    address: 'R. Tuiuti, 123 - Tatuapé',
    image: 'https://img.usecurling.com/p/200/200?q=soccer%20field&color=green',
    icon: Trophy,
  },
  {
    id: '2',
    name: 'Smart Fit - Anália Franco',
    distance: '1.2km',
    type: 'Academia',
    points: 100,
    address: 'Av. Regente Feijó, 1230',
    image: 'https://img.usecurling.com/p/200/200?q=gym&color=black',
    icon: Dumbbell,
  },
  {
    id: '3',
    name: 'Complexo Esportivo Mooca',
    distance: '2.5km',
    type: 'Clube',
    points: 200,
    address: 'Rua Taquari, 635',
    image: 'https://img.usecurling.com/p/200/200?q=sports%20complex&color=blue',
    icon: Building2,
  },
]

export default function CheckIn() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVenue, setSelectedVenue] = useState<
    (typeof nearbyVenues)[0] | null
  >(null)
  const [showModal, setShowModal] = useState(false)

  const handleCheckIn = (venue: (typeof nearbyVenues)[0]) => {
    setSelectedVenue(venue)
    setShowModal(true)
  }

  const filteredVenues = nearbyVenues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/40 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Check-in
          </h1>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-primary font-medium"
            onClick={() => navigate('/explore')}
          >
            Ver Mapa
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar local..."
            className="pl-9 bg-secondary/50 border-transparent focus:bg-background transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Card
              className="bg-primary/5 border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => {
                // Mock QR Scan
                const mockVenue = nearbyVenues[0]
                handleCheckIn(mockVenue)
              }}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center gap-2 text-center">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <QrCode className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm">Ler QR Code</p>
                  <p className="text-[10px] text-muted-foreground">
                    Check-in instantâneo
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/30 border-border/50">
              <CardContent className="p-4 flex flex-col items-center justify-center gap-2 text-center">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  <Navigation className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="font-bold text-sm">Locais Próximos</p>
                  <p className="text-[10px] text-muted-foreground">
                    Baseado no GPS
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* List */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Disponíveis Agora
            </h2>
            {filteredVenues.map((venue) => (
              <Card key={venue.id} className="overflow-hidden group">
                <div className="p-3 flex items-center gap-3">
                  <div className="h-14 w-14 rounded-lg bg-secondary shrink-0 overflow-hidden">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm truncate">
                        {venue.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-mono shrink-0"
                      >
                        {venue.distance}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {venue.address}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className="text-[10px] h-4 px-1 border-primary/30 text-primary"
                      >
                        +{venue.points} pts
                      </Badge>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <venue.icon className="h-3 w-3" />
                        {venue.type}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="shrink-0 rounded-full h-8 w-8 p-0"
                    onClick={() => handleCheckIn(venue)}
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>

      {selectedVenue && (
        <CheckInModal
          open={showModal}
          onOpenChange={setShowModal}
          venueName={selectedVenue.name}
          points={selectedVenue.points}
        />
      )}
    </div>
  )
}
