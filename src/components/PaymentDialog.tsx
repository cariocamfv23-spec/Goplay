import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreditCard, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface PaymentDialogProps {
  children: React.ReactNode
  title: string
  price: string
  onSuccess?: () => void
}

export function PaymentDialog({
  children,
  title,
  price,
  onSuccess,
}: PaymentDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form')

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('processing')
    setTimeout(() => {
      setStep('success')
      if (onSuccess) onSuccess()
    }, 2000)
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setStep('form')
    }, 300)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {step === 'success' ? 'Pagamento Aprovado!' : 'Pagamento Seguro'}
          </DialogTitle>
        </DialogHeader>

        {step === 'form' && (
          <form onSubmit={handlePay} className="space-y-4 pt-2">
            <div className="bg-secondary/30 p-4 rounded-xl flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">{title}</span>
                <span className="font-bold text-lg">{price}</span>
              </div>
              <CreditCard className="h-6 w-6 text-primary" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="card">Número do Cartão</Label>
              <Input
                id="card"
                placeholder="0000 0000 0000 0000"
                required
                className="font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Validade</Label>
                <Input id="expiry" placeholder="MM/AA" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome no Cartão</Label>
              <Input id="name" placeholder="NOME COMO NO CARTAO" required />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-bold">
              Pagar {price}
            </Button>
          </form>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground animate-pulse">
              Processando pagamento...
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-4 space-y-4 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <p className="text-center text-muted-foreground px-4">
              Seu pagamento foi confirmado. Você receberá o comprovante por
              e-mail.
            </p>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 mt-4"
              onClick={handleClose}
            >
              Concluir
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
