import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Search, Car, Star, Navigation, ShieldCheck } from 'lucide-react'
import { mockDrivers, mockCurrentUser } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

export default function DriversList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filteredDrivers = mockDrivers.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4">
        <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" /> Motoristas Goplay
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar motorista..."
            className="pl-9 bg-secondary border-none rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* User Passenger Profile Preview */}
        <Card className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white border-none shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <Avatar className="h-14 w-14 border-2 border-white/20">
              <AvatarImage src={mockCurrentUser.avatar} />
              <AvatarFallback>{mockCurrentUser.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{mockCurrentUser.name}</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <Star className="h-4 w-4 text-gold fill-gold" />
                <span>4.9 Passageiro VIP</span>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white"
            >
              Histórico
            </Button>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Navigation className="h-5 w-5 text-green-500" />
            Disponíveis Próximos
          </h2>

          <div className="space-y-3">
            {filteredDrivers.map((driver) => (
              <Card
                key={driver.id}
                className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigate(`/profile/${driver.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-background">
                        <AvatarImage src={driver.avatar} />
                        <AvatarFallback>{driver.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold">{driver.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Car className="h-3 w-3" /> {driver.car?.model}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 bg-secondary/50 px-1.5 py-0.5 rounded text-xs font-bold">
                        <Star className="h-3 w-3 fill-gold text-gold" />
                        {driver.rating}
                      </div>
                      <span className="text-xs text-primary font-medium mt-1">
                        {driver.distance || '0.5 km'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <Badge
                      variant="outline"
                      className="text-[10px] text-green-600 border-green-200 bg-green-50"
                    >
                      <ShieldCheck className="h-3 w-3 mr-1" /> Verificado
                    </Badge>
                    <Button
                      size="sm"
                      className="rounded-full h-8 px-4"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/ride/request/${driver.id}`)
                      }}
                    >
                      Solicitar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
