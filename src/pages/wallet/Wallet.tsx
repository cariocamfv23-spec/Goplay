import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  History,
  QrCode,
  Wallet as WalletIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { DigitalCard } from '@/components/DigitalCard'

export default function Wallet() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Carteira</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[#6D28D9] via-[#4C1D95] to-[#B45309] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <p className="text-white/80 text-sm font-medium">Saldo Total</p>
              <DigitalCard balance="R$ 1.250,00">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/10 hover:bg-white/20 text-white h-8 px-3 rounded-full border border-white/10 backdrop-blur-md"
                >
                  <CreditCard className="w-3.5 h-3.5 mr-2" /> Ver Cartão
                </Button>
              </DigitalCard>
            </div>

            <h2 className="text-4xl font-bold mb-8 tracking-tight">
              R$ 1.250,00
            </h2>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-none flex-1 backdrop-blur-sm"
              >
                <Plus className="mr-2 h-4 w-4" /> Adicionar
              </Button>
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-none flex-1 backdrop-blur-sm"
              >
                <ArrowUpRight className="mr-2 h-4 w-4" /> Sacar
              </Button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-3">
          <DigitalCard>
            <Card className="hover:bg-secondary/20 cursor-pointer transition-colors border-none shadow-sm group active:scale-95 duration-200">
              <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <CreditCard className="h-6 w-6" />
                </div>
                <span className="font-medium text-xs">Meu Cartão</span>
              </CardContent>
            </Card>
          </DigitalCard>

          <Card className="hover:bg-secondary/20 cursor-pointer transition-colors border-none shadow-sm group active:scale-95 duration-200">
            <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
              <div className="p-3 rounded-full bg-green-500/10 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <QrCode className="h-6 w-6" />
              </div>
              <span className="font-medium text-xs">Pagar QR</span>
            </CardContent>
          </Card>

          <Card
            className="hover:bg-secondary/20 cursor-pointer transition-colors border-none shadow-sm group active:scale-95 duration-200"
            onClick={() => navigate('/financials/transactions')}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
              <div className="p-3 rounded-full bg-orange-500/10 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <History className="h-6 w-6" />
              </div>
              <span className="font-medium text-xs">Extrato</span>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Transações Recentes</h3>
            <Button
              variant="link"
              className="text-xs text-muted-foreground p-0 h-auto"
            >
              Ver tudo
            </Button>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-secondary/10 rounded-xl border border-border/50 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600">
                    <ArrowDownLeft className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Goplay Card</p>
                    <p className="text-xs text-muted-foreground">Hoje, 14:30</p>
                  </div>
                </div>
                <span className="font-bold text-red-600">- R$ 24,90</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-xl border border-border/50 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Recarga Pix</p>
                  <p className="text-xs text-muted-foreground">Ontem</p>
                </div>
              </div>
              <span className="font-bold text-green-600">+ R$ 500,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
