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
  CheckCircle2,
  Wallet,
  Lock,
  Trophy,
  AlertCircle,
  Coins,
} from 'lucide-react'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { mockFinancialSummary } from '@/lib/data'
import { toast } from 'sonner'

interface PaymentDialogProps {
  children: React.ReactNode
  title: string
  price: number
  pointsPrice?: number
  onSuccess?: () => void
}

export function PaymentDialog({
  children,
  title,
  price,
  pointsPrice,
  onSuccess,
}: PaymentDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form')
  const [paymentMethod, setPaymentMethod] = useState('credit-card')

  const userBalance = mockFinancialSummary.balance
  const userPoints = mockFinancialSummary.pointsBalance

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      paymentMethod === 'goplay-points' &&
      pointsPrice &&
      userPoints < pointsPrice
    ) {
      toast.error('Saldo de pontos insuficiente.')
      return
    }

    if (paymentMethod === 'balance' && userBalance < price) {
      toast.error('Saldo em carteira insuficiente.')
      return
    }

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
      <DialogContent className="sm:max-w-md bg-background border border-border">
        <DialogHeader>
          <DialogTitle className="text-center">
            {step === 'success' ? 'Compra Realizada!' : 'Pagamento Seguro'}
          </DialogTitle>
        </DialogHeader>

        {step === 'form' && (
          <div className="pt-2">
            <div className="bg-secondary/30 p-4 rounded-xl flex justify-between items-center mb-6 border border-border/50">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">{title}</span>
                <span className="font-bold text-2xl text-primary">
                  R$ {price.toFixed(2)}
                </span>
                {pointsPrice && (
                  <span className="text-xs text-gold font-bold">
                    ou {pointsPrice} pts
                  </span>
                )}
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
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="credit-card" className="text-xs">
                  Cartão
                </TabsTrigger>
                <TabsTrigger value="balance" className="text-xs">
                  Saldo
                </TabsTrigger>
                <TabsTrigger value="goplay-points" className="text-xs">
                  Pontos
                </TabsTrigger>
                <TabsTrigger value="mixed" className="text-xs">
                  Misto
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

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-bold mt-4"
                  >
                    Pagar R$ {price.toFixed(2)}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="balance">
                <form
                  onSubmit={handlePay}
                  className="space-y-6 animate-fade-in"
                >
                  <div className="bg-gradient-to-br from-[#6D28D9] via-[#4C1D95] to-[#B45309] rounded-xl p-5 text-white relative overflow-hidden shadow-md">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
                    <div className="flex justify-between items-center relative z-10 mb-2">
                      <span className="font-bold flex items-center gap-2">
                        <Wallet className="h-4 w-4" /> Carteira Goplay
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      R$ {userBalance.toFixed(2)}
                    </div>
                    <span className="text-xs opacity-80">
                      Disponível para uso
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {userBalance >= price ? (
                      <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-xs text-green-600 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Saldo suficiente.</span>
                      </div>
                    ) : (
                      <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-xs text-red-600 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>
                          Saldo insuficiente. Recarregue sua carteira.
                        </span>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-bold"
                    disabled={userBalance < price}
                  >
                    Pagar com Saldo
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="goplay-points">
                <form
                  onSubmit={handlePay}
                  className="space-y-6 animate-fade-in"
                >
                  <div className="bg-gradient-to-br from-yellow-500 to-amber-700 rounded-xl p-5 text-white relative overflow-hidden shadow-md">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
                    <div className="flex justify-between items-center relative z-10 mb-2">
                      <span className="font-bold flex items-center gap-2">
                        <Trophy className="h-4 w-4" /> Goplay Points
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      {userPoints} pts
                    </div>
                    <span className="text-xs opacity-80">
                      Disponível para troca
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {pointsPrice ? (
                      userPoints >= pointsPrice ? (
                        <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-xs text-green-600 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Pontos suficientes.</span>
                        </div>
                      ) : (
                        <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-xs text-red-600 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          <span>Pontos insuficientes.</span>
                        </div>
                      )
                    ) : (
                      <div className="bg-secondary/50 p-3 rounded-lg border border-border/50 text-xs text-muted-foreground flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>Este produto não aceita pontos.</span>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-bold bg-gold hover:bg-gold/90 text-black"
                    disabled={!pointsPrice || userPoints < pointsPrice}
                  >
                    Trocar por {pointsPrice || 0} pts
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="mixed">
                <div className="p-4 text-center text-muted-foreground space-y-2">
                  <Coins className="h-10 w-10 mx-auto opacity-50" />
                  <p>Pagamento Misto</p>
                  <p className="text-xs">
                    Combine Pontos e Saldo para completar o valor.
                  </p>
                  <div className="py-4">
                    <Button variant="outline" className="w-full" disabled>
                      Em breve
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div
              className={cn(
                'w-12 h-12 border-4 border-t-transparent rounded-full animate-spin border-primary',
              )}
            />
            <p className="text-muted-foreground animate-pulse">
              Processando transação...
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-4 space-y-4 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-lg">Sucesso!</h3>
              <p className="text-center text-muted-foreground px-4 text-sm">
                Sua compra foi confirmada e o histórico financeiro atualizado.
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
