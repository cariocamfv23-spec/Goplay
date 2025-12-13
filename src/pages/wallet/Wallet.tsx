import { mockTransactionHistory, mockCurrentUser } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet as WalletIcon,
  CreditCard,
} from 'lucide-react'

export default function Wallet() {
  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="p-6 bg-gradient-to-br from-zinc-900 to-black text-white rounded-b-3xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <WalletIcon className="h-5 w-5" /> Minha Carteira
          </h1>
        </div>

        <div className="mb-8">
          <p className="text-zinc-400 text-sm mb-1">Saldo disponível</p>
          <h2 className="text-4xl font-bold">
            R$ {mockCurrentUser.walletBalance.toFixed(2)}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button className="bg-green-600 hover:bg-green-700 border-none h-12 rounded-xl text-white font-bold">
            <ArrowDownLeft className="mr-2 h-4 w-4" /> Adicionar
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 hover:bg-white/20 border-white/20 h-12 rounded-xl text-white font-bold"
          >
            <ArrowUpRight className="mr-2 h-4 w-4" /> Sacar
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-4 px-1">Histórico</h3>
        <div className="space-y-3">
          {mockTransactionHistory.map((t) => (
            <Card key={t.id} className="border-none shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${t.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                  >
                    {t.type === 'credit' ? (
                      <ArrowDownLeft className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.description}</p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                </div>
                <span
                  className={`font-bold ${t.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {t.type === 'credit' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
