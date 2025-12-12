import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, MapPin, User, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockRideHistory } from '@/lib/data'

export default function DriverHistory() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 p-4 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Histórico de Corridas</h1>
      </div>

      <div className="space-y-4">
        {mockRideHistory.map((ride) => (
          <Card
            key={ride.id}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {ride.date}
                </div>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200 bg-green-50"
                >
                  Concluída
                </Badge>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-bold">{ride.passenger}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">
                      Avaliação: {ride.rating} ★
                    </span>
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="font-bold text-lg">{ride.price}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm pl-2 border-l-2 border-muted ml-2">
                <div className="relative">
                  <span className="text-xs text-muted-foreground block">
                    De
                  </span>
                  <span className="font-medium">{ride.pickup}</span>
                </div>
                <div className="relative">
                  <span className="text-xs text-muted-foreground block">
                    Para
                  </span>
                  <span className="font-medium">{ride.dropoff}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
