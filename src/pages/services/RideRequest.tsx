import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, MapPin, Navigation, Car } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'sonner'
import { mockProfiles } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function RideRequest() {
  const navigate = useNavigate()
  const { driverId } = useParams()
  const driver = mockProfiles.find(
    (p) => p.id === driverId && p.type === 'driver',
  )
  const [step, setStep] = useState<'location' | 'confirm' | 'searching'>(
    'location',
  )

  if (!driver) return <div>Motorista não encontrado</div>

  const handleRequest = () => {
    setStep('searching')
    setTimeout(() => {
      toast.success('Motorista a caminho!')
      navigate('/home')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4 border-b flex items-center gap-4 sticky top-0 bg-background z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">Solicitar Corrida</h1>
      </div>

      <div className="flex-1 relative">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1000/1000?q=map&color=gray')] bg-cover bg-center opacity-50 grayscale" />

        <div className="absolute inset-x-4 top-4 space-y-2">
          <div className="bg-background p-3 rounded-xl shadow-md flex items-center gap-3">
            <div className="h-2 w-2 bg-blue-500 rounded-full" />
            <Input
              placeholder="Local de partida"
              className="border-none h-auto p-0 focus-visible:ring-0"
              defaultValue="Minha localização atual"
            />
          </div>
          <div className="bg-background p-3 rounded-xl shadow-md flex items-center gap-3">
            <div className="h-2 w-2 bg-red-500 rounded-square" />
            <Input
              placeholder="Para onde vamos?"
              className="border-none h-auto p-0 focus-visible:ring-0"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-background rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-10">
        {step === 'location' && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-14 w-14">
                <AvatarImage src={driver.avatar} />
                <AvatarFallback>{driver.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold">{driver.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {driver.car?.model} • {driver.car?.plate}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-bold text-lg">R$ 24,90</p>
                <p className="text-xs text-muted-foreground">Est. 15 min</p>
              </div>
            </div>
            <Button
              className="w-full h-14 rounded-full font-bold text-lg"
              onClick={handleRequest}
            >
              Confirmar Goplay Driver
            </Button>
          </>
        )}

        {step === 'searching' && (
          <div className="flex flex-col items-center py-6 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            <p className="font-medium text-lg">Conectando com o motorista...</p>
          </div>
        )}
      </div>
    </div>
  )
}
