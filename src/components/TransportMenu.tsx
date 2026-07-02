import { useState } from 'react'
import { Navigation, MapPin, Car, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import {
  getTransportUrl,
  type FieldLocation,
  type TransportApp,
} from '@/lib/navigation-links'
import { toast } from 'sonner'

interface TransportOption {
  id: TransportApp
  label: string
  description: string
  icon: typeof Navigation
  color: string
}

const TRANSPORT_OPTIONS: TransportOption[] = [
  {
    id: 'google-maps',
    label: 'Google Maps',
    description: 'Navegação completa com trânsito',
    icon: MapPin,
    color: 'text-blue-500',
  },
  {
    id: 'waze',
    label: 'Waze',
    description: 'Melhor rota em tempo real',
    icon: Navigation,
    color: 'text-cyan-500',
  },
  {
    id: 'uber',
    label: 'Uber',
    description: 'Estimativa de preço e corrida',
    icon: Car,
    color: 'text-gray-900 dark:text-white',
  },
  {
    id: '99-taxi',
    label: '99 Taxi',
    description: 'Compare preços de corrida',
    icon: Car,
    color: 'text-orange-500',
  },
]

interface TransportMenuProps {
  location: FieldLocation
  label?: string
  className?: string
}

export function TransportMenu({
  location,
  label = 'Como Chegar',
  className,
}: TransportMenuProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (app: TransportApp) => {
    const url = getTransportUrl(app, location)
    window.open(url, '_blank', 'noopener,noreferrer')
    setOpen(false)
    const option = TRANSPORT_OPTIONS.find((o) => o.id === app)
    toast.success(`Abrindo ${option?.label}...`, {
      description: location.address,
    })
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={cn(
          'w-full h-9 text-xs font-black uppercase tracking-widest',
          className,
        )}
        size="sm"
        variant="default"
      >
        <Navigation className="w-3.5 h-3.5 mr-1" />
        {label}
      </Button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-w-2xl mx-auto">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-base font-black uppercase tracking-wider">
              Como Chegar ao Local
            </DrawerTitle>
            <DrawerDescription className="text-xs">
              {location.name && (
                <span className="font-bold text-foreground">
                  {location.name}
                </span>
              )}
              {' — '}
              {location.address}
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6 grid grid-cols-2 gap-3">
            {TRANSPORT_OPTIONS.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/30 bg-secondary/20 hover:bg-secondary/40 hover:border-primary/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className={cn('w-6 h-6', option.color)} />
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {option.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground text-center leading-tight">
                    {option.description}
                  </span>
                  <span className="flex items-center gap-0.5 text-[9px] text-primary font-bold uppercase mt-1">
                    Abrir <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </button>
              )
            })}
          </div>

          <div className="px-4 pb-4">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground bg-background/30 rounded-lg p-2.5 border border-border/20">
              <MapPin className="w-3 h-3 text-primary shrink-0" />
              <span className="truncate font-medium">
                {location.address}
                {location.lat != null && location.lng != null && (
                  <span className="text-muted-foreground/70 ml-1">
                    ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})
                  </span>
                )}
              </span>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
