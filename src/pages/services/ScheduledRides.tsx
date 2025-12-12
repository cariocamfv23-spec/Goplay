import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockScheduledRides } from '@/lib/data'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'
import { useState } from 'react'

export default function ScheduledRides() {
  const navigate = useNavigate()
  const [rides, setRides] = useState(mockScheduledRides)

  const handleCancel = (id: string) => {
    setRides((prev) => prev.filter((r) => r.id !== id))
    toast.success('Agendamento cancelado com sucesso.')
  }

  return (
    <div className="min-h-screen bg-background pb-20 p-4 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Corridas Agendadas</h1>
      </div>

      <div className="space-y-4">
        {rides.length > 0 ? (
          rides.map((ride) => (
            <Card
              key={ride.id}
              className="shadow-md border-l-4 border-l-primary"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(ride.date), "dd 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                  <span className="text-sm font-bold bg-muted px-2 py-1 rounded">
                    {format(new Date(ride.date), 'HH:mm')}
                  </span>
                </div>

                <div className="space-y-3 relative pl-4 border-l-2 border-dashed border-muted ml-1 mb-4">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 h-3 w-3 bg-blue-500 rounded-full ring-2 ring-background" />
                    <p className="text-xs text-muted-foreground">Embarque</p>
                    <p className="text-sm font-medium line-clamp-1">
                      {ride.pickup}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 h-3 w-3 bg-red-500 rounded-square ring-2 ring-background" />
                    <p className="text-xs text-muted-foreground">Destino</p>
                    <p className="text-sm font-medium line-clamp-1">
                      {ride.dropoff}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t mt-2">
                  <span className="font-bold text-lg">{ride.price}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleCancel(ride.id)}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Clock className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-bold mb-2">Nenhum agendamento</h3>
            <p className="text-muted-foreground text-sm max-w-[200px]">
              Você não possui corridas agendadas no momento.
            </p>
          </div>
        )}

        <Button
          className="w-full mt-4 border-dashed"
          variant="outline"
          onClick={() => navigate('/home')}
        >
          Voltar para Home
        </Button>
      </div>
    </div>
  )
}
