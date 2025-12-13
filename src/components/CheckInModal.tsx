import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MapPin, Loader2, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface CheckInModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  venueName: string
  points: number
}

export function CheckInModal({
  open,
  onOpenChange,
  venueName,
  points,
}: CheckInModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleCheckIn = () => {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  const handleClose = () => {
    setStatus('idle')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xs text-center">
        <DialogHeader>
          <DialogTitle className="text-center">Check-in</DialogTitle>
          <DialogDescription className="text-center">
            Confirme sua presença para ganhar pontos.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 flex flex-col items-center gap-4">
          <div
            className={`h-20 w-20 rounded-full flex items-center justify-center transition-all ${status === 'success' ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}
          >
            {status === 'loading' ? (
              <Loader2 className="h-10 w-10 animate-spin" />
            ) : status === 'success' ? (
              <CheckCircle className="h-10 w-10 animate-in zoom-in" />
            ) : (
              <MapPin className="h-10 w-10" />
            )}
          </div>

          <div>
            <h3 className="font-bold text-lg">{venueName}</h3>
            {status === 'success' ? (
              <p className="text-green-600 font-medium">
                Check-in realizado! +{points} pts
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Você está neste local?
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          {status === 'success' ? (
            <Button
              onClick={handleClose}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Fechar
            </Button>
          ) : (
            <Button
              onClick={handleCheckIn}
              disabled={status === 'loading'}
              className="w-full gap-2"
            >
              Confirmar Check-in
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
