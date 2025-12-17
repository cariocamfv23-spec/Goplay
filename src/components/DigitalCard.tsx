import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CardContent } from '@/components/ui/card'
import {
  QrCode,
  CreditCard,
  ShieldCheck,
  Wifi,
  Wallet,
  Fuel,
} from 'lucide-react'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { mockCurrentUser } from '@/lib/data'

interface DigitalCardProps {
  title?: string
  type?: 'fit' | 'market' | 'recovery' | 'goplay' | 'fuel'
  balance?: string
  logoUrl?: string
  children?: ReactNode
  triggerClassName?: string
}

export function DigitalCard({
  title = 'Goplay Card',
  type = 'goplay',
  balance = 'R$ 1.250,00',
  children,
  triggerClassName,
}: DigitalCardProps) {
  const getGradient = () => {
    switch (type) {
      case 'fit':
        return 'bg-gradient-to-br from-primary to-purple-900'
      case 'market':
        return 'bg-gradient-to-br from-emerald-600 to-teal-900'
      case 'recovery':
        return 'bg-gradient-to-br from-cyan-600 to-blue-900'
      case 'fuel':
        return 'bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-600'
      case 'goplay':
      default:
        return 'bg-gradient-to-br from-[#6D28D9] via-[#4C1D95] to-[#B45309]' // Deep Purple to Bronze/Gold
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'fit':
        return <CreditCard className="h-6 w-6 text-white/90" />
      case 'market':
        return <QrCode className="h-6 w-6 text-white/90" />
      case 'recovery':
        return <ShieldCheck className="h-6 w-6 text-white/90" />
      case 'fuel':
        return <Fuel className="h-6 w-6 text-white/90" />
      default:
        return <Wallet className="h-6 w-6 text-white/90" />
    }
  }

  const getTitle = () => {
    if (title !== 'Goplay Card') return title
    switch (type) {
      case 'fuel':
        return 'Goplay Fuel'
      default:
        return title
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <button
            className={cn(
              'flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors',
              triggerClassName,
            )}
          >
            <CreditCard className="w-4 h-4" />
            <span>Ver Cartão</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-transparent border-none shadow-none p-0 flex items-center justify-center">
        <div className="perspective-1000 group w-full max-w-[360px]">
          <div
            className={cn(
              'w-full aspect-[1.586/1] rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all duration-500 hover:rotate-y-3 hover:scale-105',
              getGradient(),
            )}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl mix-blend-screen"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[hsl(var(--gold)/0.2)] rounded-full blur-3xl mix-blend-screen"></div>

            <CardContent className="h-full flex flex-col justify-between p-6 relative z-10 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl tracking-tight drop-shadow-md">
                    {getTitle()}
                  </h3>
                  <p className="text-white/70 text-[10px] font-medium uppercase tracking-wider">
                    Virtual Member
                  </p>
                </div>
                {getIcon()}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-8 bg-gradient-to-tr from-yellow-600 to-yellow-300 rounded-md shadow-sm relative overflow-hidden opacity-90">
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
                <Wifi className="w-6 h-6 rotate-90 text-white/60" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-white/70 uppercase tracking-widest mb-0.5">
                      Saldo Disponível
                    </span>
                    <span className="font-bold text-2xl tracking-tight text-white drop-shadow-sm">
                      {balance}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-white/70 uppercase tracking-widest">
                      Titular
                    </span>
                    <span className="font-bold tracking-widest text-sm text-shadow uppercase">
                      {mockCurrentUser.name}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] text-white/70 uppercase">
                      Validade
                    </span>
                    <span className="font-mono text-sm tracking-wider">
                      12/30
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
          <div className="text-center mt-6 text-white font-medium animate-pulse drop-shadow-md flex items-center justify-center gap-2">
            <Wifi className="w-4 h-4" />
            Aproxime para pagar
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
