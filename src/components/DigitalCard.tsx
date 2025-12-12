import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { QrCode, CreditCard, ShieldCheck } from 'lucide-react'
import { ReactNode } from 'react'

interface DigitalCardProps {
  title: string
  type: 'fit' | 'market' | 'recovery'
  logoUrl?: string
  children?: ReactNode
}

export function DigitalCard({
  title,
  type,
  logoUrl,
  children,
}: DigitalCardProps) {
  const getGradient = () => {
    switch (type) {
      case 'fit':
        return 'bg-gradient-to-br from-primary to-purple-800'
      case 'market':
        return 'bg-gradient-to-br from-green-600 to-emerald-800'
      case 'recovery':
        return 'bg-gradient-to-br from-blue-600 to-indigo-800'
      default:
        return 'bg-gradient-to-br from-gray-800 to-black'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'fit':
        return <CreditCard className="h-6 w-6 text-white/80" />
      case 'market':
        return <QrCode className="h-6 w-6 text-white/80" />
      case 'recovery':
        return <ShieldCheck className="h-6 w-6 text-white/80" />
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-transparent border-none shadow-none p-0">
        <div className="perspective-1000 group">
          <Card
            className={`w-full aspect-[1.586/1] rounded-2xl border-none shadow-2xl relative overflow-hidden ${getGradient()}`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

            <CardContent className="h-full flex flex-col justify-between p-6 relative z-10 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-2xl tracking-tight">{title}</h3>
                  <p className="text-white/70 text-sm font-medium">
                    Membro Goplay
                  </p>
                </div>
                {getIcon()}
              </div>

              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-white/60 uppercase tracking-wider">
                    Titular
                  </span>
                  <span className="font-bold tracking-wide">
                    LUCAS OLIVEIRA
                  </span>
                </div>
                <div className="h-16 w-16 bg-white rounded-lg p-1">
                  <img
                    src="https://img.usecurling.com/i?q=qr%20code&color=black"
                    className="w-full h-full object-contain"
                    alt="QR Code"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="text-center mt-4 text-white/90 font-medium animate-pulse">
            Apresente este cartão no check-in
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
