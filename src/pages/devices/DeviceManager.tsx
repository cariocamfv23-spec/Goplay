import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AppIcon } from '@/components/AppIcon'
import {
  ArrowLeft,
  Watch,
  Activity,
  Bluetooth,
  RefreshCw,
  Battery,
  CheckCircle2,
  X,
  Smartphone,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useDeviceStore, { Device } from '@/stores/useDeviceStore'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const MOCK_FOUND_DEVICES: Device[] = [
  {
    id: '1',
    name: 'Goplay Band Pro',
    type: 'band',
    battery: 85,
    status: 'disconnected',
  },
  {
    id: '2',
    name: 'Apple Watch Ultra',
    type: 'watch',
    battery: 92,
    status: 'disconnected',
  },
  {
    id: '3',
    name: 'Garmin HRM',
    type: 'chest_strap',
    battery: 40,
    status: 'disconnected',
  },
]

export default function DeviceManager() {
  const navigate = useNavigate()
  const {
    connectedDevice,
    isScanning,
    startScan,
    connectDevice,
    disconnectDevice,
  } = useDeviceStore()
  const [foundDevices, setFoundDevices] = useState<Device[]>([])

  useEffect(() => {
    if (isScanning) {
      // Simulate finding devices after delay
      const timer = setTimeout(() => {
        setFoundDevices(MOCK_FOUND_DEVICES)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isScanning])

  const handleScan = () => {
    setFoundDevices([])
    startScan()
  }

  const handleConnect = (device: Device) => {
    connectDevice(device)
    toast.success(`${device.name} conectado com sucesso!`, {
      description:
        'Os dados biométricos agora estão sincronizados com o Coach IA.',
    })
  }

  const handleDisconnect = () => {
    if (connectedDevice) {
      toast.info(`${connectedDevice.name} desconectado.`)
      disconnectDevice()
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in flex flex-col">
      <div className="p-4 border-b border-border/50 flex items-center gap-4 bg-background sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-secondary/50 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Watch className="h-5 w-5 text-primary" /> Gerenciar Dispositivos
        </h1>
      </div>

      <div className="flex-1 p-4 space-y-6">
        {/* Connected Device Card */}
        {connectedDevice ? (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <AppIcon className="h-32 w-32" />
            </div>

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Watch className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none">
                    {connectedDevice.name}
                  </h3>
                  <span className="text-xs text-green-500 font-medium flex items-center gap-1 mt-1">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Conectado
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10 rounded-full"
                onClick={handleDisconnect}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-background/50 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Battery className="h-3 w-3" /> Bateria
                </div>
                <span className="text-xl font-bold">
                  {connectedDevice.battery}%
                </span>
              </div>
              <div className="bg-background/50 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Bluetooth className="h-3 w-3" /> Sinal
                </div>
                <span className="text-xl font-bold">Forte</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 px-4 border-2 border-dashed border-border rounded-2xl bg-secondary/10">
            <div className="mx-auto h-16 w-16 bg-background rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Smartphone className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-bold text-lg mb-2">
              Nenhum dispositivo conectado
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Conecte seu smartwatch ou smartband para sincronizar dados de
              saúde em tempo real com o Coach IA.
            </p>
            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="w-full max-w-xs gap-2 rounded-full shadow-lg bg-gradient-to-r from-primary to-purple-700"
            >
              {isScanning ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Bluetooth className="h-4 w-4" />
              )}
              {isScanning ? 'Procurando...' : 'Buscar Dispositivos'}
            </Button>
          </div>
        )}

        {/* Found Devices List */}
        {!connectedDevice && foundDevices.length > 0 && (
          <div className="space-y-3 animate-slide-up">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider ml-1">
              Dispositivos Encontrados
            </h3>
            {foundDevices.map((device) => (
              <Card
                key={device.id}
                className="border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => handleConnect(device)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center">
                      {device.type === 'chest_strap' ? (
                        <Activity className="h-5 w-5 text-primary" />
                      ) : (
                        <Watch className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{device.name}</h4>
                      <span className="text-xs text-muted-foreground capitalize">
                        {device.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-primary font-bold"
                  >
                    Conectar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
