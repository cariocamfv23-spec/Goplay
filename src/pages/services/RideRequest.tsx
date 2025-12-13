import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ArrowLeft,
  MapPin,
  Car,
  Lock,
  Calendar as CalendarIcon,
  UserPlus,
  Search,
  CheckCircle2,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { mockProfiles } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import useSoundStore from '@/stores/useSoundStore'

export default function RideRequest() {
  const navigate = useNavigate()
  const { driverId } = useParams()
  const driver = mockProfiles.find(
    (p) => p.id === driverId && p.type === 'driver',
  )
  const [step, setStep] = useState<'location' | 'confirm' | 'searching'>(
    'location',
  )
  const [canRequest, setCanRequest] = useState(true)
  const [permissionReason, setPermissionReason] = useState('')
  const [isSimulatedFollower, setIsSimulatedFollower] = useState(false)
  const [requestType, setRequestType] = useState<'now' | 'schedule'>('now')
  const [rideFor, setRideFor] = useState<'me' | 'guest'>('me')
  const [guestName, setGuestName] = useState('')
  const [isGuestDialogOpen, setIsGuestDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const { playSound } = useSoundStore()

  // Determine permissions
  useEffect(() => {
    if (!driverId) return

    const permission =
      localStorage.getItem(`driver_permission_${driverId}`) || 'everyone'

    if (permission === 'everyone') {
      setCanRequest(true)
      setPermissionReason('')
    } else if (permission === 'verified') {
      setCanRequest(true)
      setPermissionReason('')
    } else if (permission === 'followers') {
      if (isSimulatedFollower) {
        setCanRequest(true)
        setPermissionReason('')
      } else {
        setCanRequest(false)
        setPermissionReason(
          'Este motorista aceita corridas apenas de seguidores.',
        )
      }
    }
  }, [driverId, isSimulatedFollower])

  if (!driver) return <div>Motorista não encontrado</div>

  const handleRequest = () => {
    if (requestType === 'schedule') {
      if (!date || !time) {
        toast.error('Selecione data e hora para agendar.')
        return
      }
      toast.success('Corrida Agendada!', {
        description: `Agendado para ${format(date, 'dd/MM', { locale: ptBR })} às ${time}. O motorista será notificado.`,
      })
      navigate('/services/scheduled-rides')
    } else {
      if (rideFor === 'guest' && !guestName) {
        toast.error('Selecione um convidado.')
        return
      }

      setStep('searching')
      setTimeout(() => {
        if (rideFor === 'guest') {
          playSound('notification_uber')
          setIsSuccessDialogOpen(true)
        } else {
          playSound('notification_uber')
          toast.success('Motorista a caminho!')
          navigate('/home')
        }
      }, 2000)
    }
  }

  const handleSelectGuest = (name: string) => {
    setGuestName(name)
    setIsGuestDialogOpen(false)
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

        {/* Demo Control for Testing Permissions */}
        <div className="absolute top-32 right-4 bg-background/90 p-2 rounded-lg shadow text-xs">
          <div className="flex items-center gap-2">
            <Label htmlFor="sim-follower">Simular Seguidor</Label>
            <Switch
              id="sim-follower"
              checked={isSimulatedFollower}
              onCheckedChange={setIsSimulatedFollower}
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-background rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-10">
        {step === 'location' && (
          <>
            <Tabs
              defaultValue="now"
              value={requestType}
              onValueChange={(v) => setRequestType(v as 'now' | 'schedule')}
              className="w-full mb-4"
            >
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="now">Agora</TabsTrigger>
                <TabsTrigger value="schedule">Agendar</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Ride For Selection */}
            <div className="flex items-center gap-2 mb-4 bg-secondary/30 p-2 rounded-lg">
              <Button
                variant={rideFor === 'me' ? 'default' : 'ghost'}
                size="sm"
                className="flex-1 rounded-md"
                onClick={() => setRideFor('me')}
              >
                Para Mim
              </Button>
              <Button
                variant={rideFor === 'guest' ? 'default' : 'ghost'}
                size="sm"
                className="flex-1 rounded-md"
                onClick={() => setRideFor('guest')}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Para Atleta
              </Button>
            </div>

            {rideFor === 'guest' && (
              <div
                className="flex items-center justify-between p-3 border rounded-xl mb-4 cursor-pointer hover:bg-secondary/50 transition-colors border-primary/20"
                onClick={() => setIsGuestDialogOpen(true)}
              >
                <span
                  className={guestName ? 'font-bold' : 'text-muted-foreground'}
                >
                  {guestName || 'Selecionar Atleta Convidado'}
                </span>
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
            )}

            {requestType === 'schedule' && (
              <div className="grid grid-cols-2 gap-4 mb-4 animate-in slide-in-from-top-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, 'PPP', { locale: ptBR })
                      ) : (
                        <span>Data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>

                <Select onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <SelectItem
                        key={i}
                        value={`${i.toString().padStart(2, '0')}:00`}
                      >
                        {i.toString().padStart(2, '0')}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

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

            {canRequest ? (
              <Button
                className="w-full h-14 rounded-full font-bold text-lg bg-gradient-to-r from-primary to-purple-800 shadow-lg"
                onClick={handleRequest}
              >
                {requestType === 'schedule'
                  ? 'Agendar Corrida'
                  : rideFor === 'guest'
                    ? 'Enviar Uber com Convite'
                    : 'Confirmar Goplay Driver'}
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  {permissionReason}
                </div>
                <Button
                  className="w-full h-14 rounded-full font-bold text-lg"
                  disabled
                >
                  Solicitação Indisponível
                </Button>
              </div>
            )}

            <div className="mt-4 text-center">
              <Button
                variant="link"
                className="text-muted-foreground text-xs"
                onClick={() => navigate('/services/scheduled-rides')}
              >
                Ver meus agendamentos
              </Button>
            </div>
          </>
        )}

        {step === 'searching' && (
          <div className="flex flex-col items-center py-6 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            <p className="font-medium text-lg">
              {rideFor === 'guest'
                ? 'Processando convite de corrida...'
                : 'Conectando com o motorista...'}
            </p>
          </div>
        )}
      </div>

      {/* Guest Selection Dialog */}
      <Dialog open={isGuestDialogOpen} onOpenChange={setIsGuestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecionar Atleta</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            {mockProfiles
              .filter((p) => p.type === 'athlete')
              .map((athlete) => (
                <div
                  key={athlete.id}
                  className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg cursor-pointer transition-colors"
                  onClick={() => handleSelectGuest(athlete.name)}
                >
                  <Avatar>
                    <AvatarImage src={athlete.avatar} />
                    <AvatarFallback>{athlete.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{athlete.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {athlete.sport}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog for Guest Invite */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Convite Enviado!
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground mb-4">
            O motorista {driver.name} foi notificado e o convite da corrida foi
            enviado para {guestName}.
          </p>
          <DialogFooter>
            <Button className="w-full" onClick={() => navigate('/home')}>
              Voltar ao Início
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
