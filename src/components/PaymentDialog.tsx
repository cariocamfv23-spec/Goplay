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
import {
  CreditCard,
  CheckCircle2,
  Wallet,
  Lock,
  Smartphone,
} from 'lucide-react'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  const [paymentMethod, setPaymentMethod] = useState('credit-card')

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

  const isGoplayCard = paymentMethod === 'goplay-card'

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
          <div className="pt-2">
            <div className="bg-secondary/30 p-4 rounded-xl flex justify-between items-center mb-6 border border-border/50">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">{title}</span>
                <span className="font-bold text-2xl text-primary">{price}</span>
              </div>
              <div className="bg-background p-2 rounded-full shadow-sm">
                <Lock className="h-5 w-5 text-primary" />
              </div>
            </div>

            <Tabs
              defaultValue="credit-card"
              onValueChange={setPaymentMethod}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="credit-card">Cartão de Crédito</TabsTrigger>
                <TabsTrigger value="goplay-card">
                  <span className="text-primary font-bold mr-1">Goplay</span>{' '}
                  Card
                </TabsTrigger>
              </TabsList>

              <TabsContent value="credit-card">
                <form
                  onSubmit={handlePay}
                  className="space-y-4 animate-fade-in"
                >
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
                    <Input
                      id="name"
                      placeholder="NOME COMO NO CARTAO"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-bold mt-4"
                  >
                    Pagar {price}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="goplay-card">
                <form
                  onSubmit={handlePay}
                  className="space-y-6 animate-fade-in"
                >
                  {/* Visual Card Simulation */}
                  <div className="w-full aspect-[1.586/1] rounded-xl bg-gradient-to-br from-[#6D28D9] via-[#4C1D95] to-[#B45309] relative overflow-hidden shadow-lg p-5 flex flex-col justify-between text-white group cursor-pointer">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

                    <div className="flex justify-between items-start relative z-10">
                      <span className="font-bold italic text-lg tracking-tighter">
                        Goplay
                      </span>
                      <Wallet className="h-5 w-5 text-white/90" />
                    </div>

                    <div className="relative z-10">
                      <span className="text-[10px] text-white/70 uppercase">
                        Saldo Disponível
                      </span>
                      <div className="text-2xl font-bold tracking-tight">
                        R$ 1.250,00
                      </div>
                    </div>

                    <div className="flex justify-between items-end relative z-10">
                      <div className="text-xs tracking-widest font-medium">
                        ALEX SILVA
                      </div>
                      <div className="flex items-center gap-1">
                        <Smartphone className="h-3 w-3" />
                        <span className="text-[10px]">NFC Ativo</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/20 p-3 rounded-lg border border-border/50 text-xs text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Saldo suficiente para esta transação.</span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/20"
                  >
                    Usar Saldo Goplay
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div
              className={cn(
                'w-12 h-12 border-4 border-t-transparent rounded-full animate-spin',
                isGoplayCard ? 'border-primary' : 'border-primary',
              )}
            />
            <p className="text-muted-foreground animate-pulse">
              {isGoplayCard
                ? 'Autorizando com Goplay Card...'
                : 'Processando pagamento...'}
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-4 space-y-4 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-lg">Pagamento Confirmado!</h3>
              <p className="text-center text-muted-foreground px-4 text-sm">
                {isGoplayCard
                  ? 'Seu saldo foi atualizado e o comprovante está disponível na sua carteira.'
                  : 'Seu pagamento foi confirmado. Você receberá o comprovante por e-mail.'}
              </p>
            </div>
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
