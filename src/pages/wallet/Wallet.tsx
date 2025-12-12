import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockTransactions } from '@/lib/data'
import {
  ArrowLeft,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Wallet as WalletIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Wallet() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b flex items-center gap-4 bg-background sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">Carteira Digital</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-primary to-purple-800 text-white border-none shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4 opacity-80">
              <WalletIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Saldo Disponível</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">R$ 1.250,00</h2>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                className="w-full text-primary font-bold"
                onClick={() => navigate('/wallet/withdraw')}
              >
                <ArrowUpRight className="h-4 w-4 mr-2" /> Sacar Pix
              </Button>
              <Button
                variant="outline"
                className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20"
                onClick={() => navigate('/wallet/cards')}
              >
                <CreditCard className="h-4 w-4 mr-2" /> Cartões
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions */}
        <div>
          <h3 className="font-bold text-lg mb-4">Histórico</h3>
          <div className="space-y-4">
            {mockTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      tx.type === 'received'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{tx.title}</h4>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <span
                  className={`font-bold text-sm ${
                    tx.type === 'received'
                      ? 'text-green-600'
                      : 'text-foreground'
                  }`}
                >
                  {tx.type === 'received' ? '+' : '-'} {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
