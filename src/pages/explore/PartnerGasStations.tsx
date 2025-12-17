import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  MapPin,
  Clock,
  Fuel,
  Navigation,
  Star,
  Info,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

// Mock data for partner gas stations
const stations = [
  {
    id: 1,
    name: 'Posto Shell Select',
    region: 'Jardins',
    city: 'São Paulo, SP',
    address: 'Av. Paulista, 1230',
    hours: '24 Horas',
    rating: 4.8,
    imageQuery: 'shell',
    color: 'red',
    prices: [
      { type: 'Gasolina Comum', price: 5.89 },
      { type: 'Gasolina Aditivada', price: 6.09 },
      { type: 'Etanol', price: 3.99 },
    ],
  },
  {
    id: 2,
    name: 'Posto Ipiranga AMPM',
    region: 'Pinheiros',
    city: 'São Paulo, SP',
    address: 'Rua dos Pinheiros, 450',
    hours: '06:00 - 23:00',
    rating: 4.6,
    imageQuery: 'ipiranga',
    color: 'blue',
    prices: [
      { type: 'Gasolina Comum', price: 5.79 },
      { type: 'Etanol', price: 3.89 },
      { type: 'Diesel S10', price: 6.19 },
    ],
  },
  {
    id: 3,
    name: 'Posto Petrobras BR',
    region: 'Vila Olímpia',
    city: 'São Paulo, SP',
    address: 'Av. Brigadeiro Faria Lima, 3400',
    hours: '24 Horas',
    rating: 4.9,
    imageQuery: 'petrobras',
    color: 'green',
    prices: [
      { type: 'Gasolina Grid', price: 5.99 },
      { type: 'Etanol', price: 4.09 },
      { type: 'Podium', price: 7.49 },
    ],
  },
  {
    id: 4,
    name: 'Posto Ale',
    region: 'Moema',
    city: 'São Paulo, SP',
    address: 'Av. Ibirapuera, 2100',
    hours: '06:00 - 22:00',
    rating: 4.5,
    imageQuery: 'ale',
    color: 'cyan',
    prices: [
      { type: 'Gasolina Comum', price: 5.69 },
      { type: 'Etanol', price: 3.79 },
    ],
  },
]

export default function PartnerGasStations() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Fuel className="h-5 w-5 text-yellow-600" />
            Postos Parceiros
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Info Banner */}
        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-3 flex items-start gap-3">
          <Info className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-800 dark:text-yellow-200 leading-relaxed">
            Utilize seus créditos Goplay Fuel nestes estabelecimentos para
            abastecer com desconto. Os preços podem variar sem aviso prévio.
          </p>
        </div>

        {stations.map((station) => (
          <Card
            key={station.id}
            className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-0">
              <div className="p-4 flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-white shadow-sm border border-border flex items-center justify-center p-2 shrink-0">
                  <img
                    src={`https://img.usecurling.com/i?q=${station.imageQuery}&color=${station.color}`}
                    alt={station.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm truncate pr-2">
                        {station.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {station.region} • {station.city}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 h-5 px-1.5"
                    >
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-[10px]">{station.rating}</span>
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className="text-[10px] font-normal gap-1 h-5 px-2 bg-secondary/30"
                    >
                      <Clock className="h-3 w-3" />
                      {station.hours}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4">
                <div className="bg-secondary/20 rounded-lg p-3 space-y-2">
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Preços de Hoje
                  </h4>
                  {station.prices.map((price, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="font-medium">{price.type}</span>
                      <span className="font-bold text-primary">
                        R$ {price.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full mt-4 h-9 text-xs font-semibold gap-2"
                  variant="outline"
                >
                  <Navigation className="h-3 w-3" />
                  Traçar Rota
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
