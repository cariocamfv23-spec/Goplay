import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet as WalletIcon,
  CreditCard,
  History,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

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
        <div className="bg-gradient-to-br from-primary to-purple-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-medium mb-1">
              Saldo Total
            </p>
            <h2 className="text-4xl font-bold mb-6">R$ 1.250,00</h2>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-none flex-1"
              >
                <Plus className="mr-2 h-4 w-4" /> Adicionar
              </Button>
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-none flex-1"
              >
                <ArrowUpRight className="mr-2 h-4 w-4" /> Sacar
              </Button>
            </div>
          </div>
          <WalletIcon className="absolute -right-6 -bottom-6 h-40 w-40 text-white/10" />
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="hover:bg-secondary/20 cursor-pointer transition-colors border-none shadow-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
              <CreditCard className="h-8 w-8 text-primary" />
              <span className="font-medium text-sm">Cartões</span>
            </CardContent>
          </Card>
          <Card className="hover:bg-secondary/20 cursor-pointer transition-colors border-none shadow-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
              <History className="h-8 w-8 text-primary" />
              <span className="font-medium text-sm">Extrato</span>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <div>
          <h3 className="font-bold text-lg mb-4">Transações Recentes</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-secondary/10 rounded-xl border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <ArrowDownLeft className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Uber Trip</p>
                    <p className="text-xs text-muted-foreground">Hoje, 14:30</p>
                  </div>
                </div>
                <span className="font-bold text-red-600">- R$ 24,90</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-xl border border-border/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Depósito Pix</p>
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
